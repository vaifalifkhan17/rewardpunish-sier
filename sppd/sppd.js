/* Travel Request (SPPD) module */

function isSppdSection(section) {
  return ["sppdDashboard", "sppdRequestList", "sppdCompletedList", "sppdRequest", "sppdVerification", "sppdApproval", "sppdPayment", "sppdOtherAllowance", "sppdMaster", "sppdMasterJenis", "sppdMasterRegion", "sppdMasterArea", "sppdMasterEmployee", "sppdMasterDurasi"].includes(section);
}

function isSppdMasterSection(section) {
  return ["sppdMaster", "sppdMasterJenis", "sppdMasterRegion", "sppdMasterArea", "sppdMasterEmployee", "sppdMasterDurasi"].includes(section);
}

function getSppdStatus(item) {
  if (item.status === "Rejected") return "Rejected";
  if (item.paymentStatus === "Paid") return "Completed";
  if (item.status === "Approved") return "Waiting Payment";
  if (item.status === "Verified") return "Waiting Head Approval";
  if (item.status === "In Verification") return "In Verification";
  if (item.status === "Submitted") return "Submitted";
  if (item.status === "Draft") return "Draft";
  return item.status || "Submitted";
}

function getSppdProcess(item) {
  const status = getSppdStatus(item);
  if (status === "Completed") return "Completed";
  if (status === "Waiting Payment") return "Payment";
  if (status.includes("Approval")) return "Approval";
  if (status === "In Verification") return "Verification";
  return "Request";
}

function getSppdDisplayStatus(item) {
  if (item.status === "Rejected") return "Rejected";
  if (item.paymentStatus === "Paid") return "Completed";
  if (item.status === "Approved") return "Payment";
  if (item.status === "Verified") return "Approval";
  if (item.status === "In Verification") return "Verification";
  if (item.status === "Submitted") return "Submitted";
  if (item.status === "Draft") return "Draft";
  return item.status || "Submitted";
}

function getSppdParticipantCount(item) {
  return item.employees?.length || item.participants?.length || 0;
}

function getSppdMainDestination(item) {
  const destinations = [...new Set((item.employees || []).map((employee) => employee.destination || item.agendaLocation).filter(Boolean))];
  return destinations.length > 1 ? `${destinations[0]} +${destinations.length - 1}` : destinations[0] || item.agendaLocation || "-";
}

function titleForView(view) {
  return { add: "Add", edit: "Edit", verify: "Verify", detail: "Detail", employee: "Edit Employee", employeeDetail: "View Employee", approvalSetting: "Setting Approval", document: "Detail", form: "Form", period: "Data", list: "List" }[view] || view;
}

function renderSppdSection() {
  if (appState.section === "sppdRequestList" && appState.view === "add") return renderSppdCreatePage();
  if (["sppdDashboard", "sppdRequestList", "sppdCompletedList"].includes(appState.section) && ["document", "employee", "employeeDetail", "addEmployee", "approvalSetting"].includes(appState.view)) {
    return renderSppdDocumentPage();
  }
  if (["sppdVerification", "sppdApproval", "sppdPayment"].includes(appState.section) && ["document", "employee", "employeeDetail", "addEmployee", "approvalSetting"].includes(appState.view)) return renderSppdDocumentPage();
  if (appState.section === "sppdDashboard") return renderSppdDashboard();
  if (appState.section === "sppdRequestList") return renderSppdTransactions(false);
  if (appState.section === "sppdCompletedList") return renderSppdTransactions(true);
  if (["sppdVerification", "sppdApproval", "sppdPayment"].includes(appState.section)) {
    appState.section = "sppdRequestList";
    return renderSppdTransactions(false);
  }
  if (appState.section === "sppdOtherAllowance") return renderSppdOtherAllowance();
  if (isSppdMasterSection(appState.section)) return renderSppdMaster();
  return renderSppdRequestList(appState.section);
}

function renderSppdTransactions(completed = false) {
  const source = completed ? getSppdRowsForSection("sppdCompletedList") : getSppdAllRequestRows();
  const request = source.filter((item) => item.status === "Draft").length;
  const submitted = source.filter((item) => item.status === "Submitted").length;
  const verified = source.filter((item) => item.status === "Verified").length;
  const approved = source.filter((item) => item.status === "Approved").length;
  const payment = source.filter((item) => item.status === "Approved" && item.paymentStatus !== "Paid").length;

  return `
    <div class="page-grid sppd-page">
      <div class="panel sppd-hero">
        <div>
          <h2>${completed ? "Travel Request (SPPD) - Completed" : "Travel Request (SPPD) - All Request"}</h2>
          <small class="panel-kicker">${completed ? "Arsip dokumen SPPD yang sudah completed." : "Pusat monitoring seluruh dokumen perjalanan dinas."}</small>
        </div>
        ${completed ? "" : `<button class="btn success" type="button" data-action="sppd-new">${icon("plus")} Create SPPD</button>`}
      </div>
      <div class="sppd-metric-grid">
        ${sppdMetricCard("Request", request, "Draft aktif")}
        ${sppdMetricCard("Submitted", submitted, "Menunggu verification")}
        ${sppdMetricCard("Verification", verified, "Siap approval")}
        ${sppdMetricCard("Approval", approved, "Approved")}
        ${sppdMetricCard("Payment", payment, "Menunggu payment")}
      </div>
      ${renderSppdRequestList(completed ? "sppdCompletedList" : "sppdRequestList")}
    </div>
  `;
}

function sppdMetricCard(label, value, note) {
  const metricIcons = {
    Request: "clipboard",
    Submitted: "send",
    Verification: "eye",
    Approval: "check",
    Payment: "download"
  };

  return `
    <div class="sppd-metric-card metric-${escapeHtml(label.toLowerCase())}">
      <div class="sppd-metric-card-head">
        <span>${escapeHtml(label)}</span>
        <span class="sppd-metric-icon" aria-hidden="true">${icon(metricIcons[label] || "clipboard")}</span>
      </div>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(note)}</small>
    </div>
  `;
}

function renderSppdDocumentPage() {
  const docId = String(appState.selectedId || "").split("::")[0];
  const item = findSppdRequest(docId);
  if (!item) return renderNotFound("SPPD");
  normalizeSppdRequest(item);
  const completed = item.paymentStatus === "Paid";
  const activeStage = getSppdEmployeeTab(item);
  const footerAction = completed ? "" : renderSppdDrawerAction(activeStage, item, ["Verifikasi", "Payment"].includes(activeStage));
  const detailTabs = getSppdDetailTabs(item);
  const activeTab = detailTabs.includes(appState.sppdDetailTab[item.id]) ? appState.sppdDetailTab[item.id] : "Overview";

  return `
    <div class="page-grid sppd-document-page">
      <div class="panel sppd-document-summary">
        <div class="sppd-document-page-head">
          <div>
            <small>Dokumen SPPD</small>
            <h2>${escapeHtml(item.docNo)}</h2>
            <p>${escapeHtml(item.agendaName)} - ${escapeHtml(getSppdMainDestination(item))}</p>
          </div>
          <div class="sppd-document-status">
            ${sppdStagePill(item)}
            ${statusPill(getSppdStatus(item))}
          </div>
        </div>
        <div class="sppd-document-progress">
          ${renderSppdEmployeeStepper(item)}
        </div>
        ${renderSppdDetailTabs(item, activeTab)}
      </div>
      ${renderSppdDetailTabContent(item, activeTab)}
      ${footerAction ? `<div class="sppd-document-footer">${footerAction}</div>` : ""}
    </div>
  `;
}

function normalizeSppdRequest(item) {
  item.employees = item.employees || [];
  item.employees.forEach((employee, index) => {
    employee.destination = employee.destination || item.agendaLocation || "-";
    employee.assignmentStartDate = employee.assignmentStartDate || item.assignmentStartDate || item.sppdDate || item.agendaDate || "";
    employee.assignmentEndDate = employee.assignmentEndDate || item.assignmentEndDate || employee.assignmentStartDate;
    employee.duration = Number(employee.duration || item.duration || getSppdEffectiveDuration(item) || 1);
    employee.agendas = employee.agendas?.length ? employee.agendas : [{
      id: `${employee.id || index}-AGENDA-1`,
      name: item.agendaName || "Agenda Perjalanan",
      type: item.agendaType || "Meeting",
      date: item.agendaDate || employee.assignmentStartDate,
      startTime: item.agendaTime || "09:00",
      endTime: item.agendaEndTime || "17:00",
      location: item.agendaLocation || employee.destination,
      remark: item.remark || ""
    }];
    employee.calculatedAllowance = Number(employee.calculatedAllowance || Number(employee.dailyAllowance || 0) * Number(employee.duration || 0));
    employee.verifiedAllowance = Number(employee.verifiedAllowance || employee.calculatedAllowance || 0);
    employee.paymentStatus = employee.paymentStatus || (item.paymentStatus === "Paid" ? "Paid" : "Pending");
    employee.bankAccount = employee.bankAccount || getEmployeeReferenceBankAccount(employee);
  });
}

function formatSppdEmployeeAssignmentPeriod(employee, item) {
  const start = employee.assignmentStartDate || item.assignmentStartDate || item.sppdDate || "";
  const end = employee.assignmentEndDate || item.assignmentEndDate || start;
  if (!start && !end) return "-";
  return start === end ? start : `${start} s/d ${end}`;
}

function daysBetweenInclusive(start, end) {
  if (!start || !end) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 1;
  const diff = Math.round((endDate - startDate) / 86400000) + 1;
  return diff > 0 ? diff : 1;
}

function renderSppdDetailTabs(item, activeTab) {
  const tabs = getSppdDetailTabs(item);
  return `<div class="sppd-detail-tab-panel"><div class="sppd-detail-tabs">${tabs.map((tab) => `<button class="${tab === activeTab ? "active" : ""}" type="button" data-action="sppd-detail-tab" data-id="${escapeHtml(item.id)}" data-tab="${escapeHtml(tab)}">${icon(getSppdDetailTabIcon(tab))}<span>${escapeHtml(tab)}</span>${getSppdDetailTabDone(item, tab) ? `<b class="sppd-tab-done">${icon("check")}</b>` : ""}</button>`).join("")}</div></div>`;
}

function getSppdDetailTabIcon(tab) {
  return {
    Overview: "file-text",
    Employee: "user",
    Verifikasi: "check",
    Approval: "clipboard",
    Payment: "upload",
    "Letter Assignment": "file-text",
    Documents: "file-text",
    "Other Allowance": "plus",
    History: "clock"
  }[tab] || "file-text";
}

function getSppdDetailTabDone(item, tab) {
  if (tab === "Approval") return item.status === "Approved" || item.paymentStatus === "Paid" || getSppdStatus(item) === "Completed";
  if (tab === "Payment") return item.employees?.length && item.employees.every((employee) => employee.paymentStatus === "Paid");
  if (tab === "Letter Assignment") return item.employees?.length && item.employees.every((employee) => employee.assignmentLetter === "Created");
  return false;
}

function getSppdDetailTabs(item) {
  const tabs = ["Overview"];
  const status = getSppdStatus(item);

  if (status === "In Verification") tabs.push("Verifikasi");
  if (["Waiting Head Approval", "Waiting BOD Approval", "Waiting Payment", "Completed"].includes(status)) tabs.push("Verifikasi", "Approval");
  if (["Waiting Payment", "Completed"].includes(status)) tabs.push("Payment", "Letter Assignment");
  if (status === "Completed") return ["Overview", "Employee", "Verifikasi", "Approval", "Payment", "Letter Assignment", "Documents", "Other Allowance", "History"];

  return [...new Set(tabs)];
}

function renderSppdDetailTabContent(item, activeTab) {
  if (activeTab === "Overview") return getSppdStatus(item) === "Completed" ? renderSppdCompletedOverviewView(item) : renderSppdOverviewStageView(item);
  if (activeTab === "Verifikasi") return renderSppdVerificationTabView(item);
  if (activeTab === "Approval") return renderSppdApprovalTabView(item);
  if (activeTab === "Payment") return renderSppdPaymentTabView(item);
  if (activeTab === "Letter Assignment") return renderSppdLetterAssignmentTabView(item);
  if (activeTab === "Employee") return getSppdStatus(item) === "Completed" ? renderSppdCompletedEmployeePanel(item) : renderSppdEmployeeTablePanel(item);
  if (activeTab === "Other Allowance") return renderSppdOtherAllowanceTabView(item);
  if (activeTab === "Documents") return renderSppdDocumentsPanel(item);
  if (activeTab === "History") return renderSppdHistoryPanel(item);
  return renderSppdOverviewStageView(item);
}

function renderSppdOverviewPanel(item) {
  return `<div class="panel sppd-summary-panel"><div class="panel-header"><div><h2>Overview</h2><small class="panel-kicker">${escapeHtml(item.docNo)} - ${escapeHtml(item.requesterName)}</small></div></div><div class="panel-body"><div class="sppd-summary-modern"><div class="sppd-summary-main"><span class="sppd-summary-label">Request Information</span><h3>${escapeHtml(item.agendaName || "-")}</h3><p>${escapeHtml(item.requesterName || "-")} - ${escapeHtml(item.requesterDivision || "-")}</p><div class="sppd-summary-chips"><span>${escapeHtml(getSppdProcess(item))}</span><span>${escapeHtml(getSppdStatus(item))}</span><span>${escapeHtml(item.sppdDate || "-")}</span></div></div><div class="sppd-summary-total"><span>Participants</span><strong>${escapeHtml(getSppdParticipantCount(item))}</strong><small>${escapeHtml(getSppdMainDestination(item))}</small></div><div class="sppd-summary-details">${sppdSummaryItem("SPPD Number", item.docNo)}${sppdSummaryItem("PIC / Division", `${item.requesterName} - ${item.requesterDivision}`)}${sppdSummaryItem("Purpose", item.agendaName || "-")}${sppdSummaryItem("Destination Summary", getSppdMainDestination(item))}${sppdSummaryItem("Overall Assignment", formatSppdAssignmentPeriod(item))}${sppdSummaryItem("Attachment", item.attachment || "-")}${sppdSummaryItem("Remark", item.remark || "-")}${sppdSummaryItem("Last Updated", item.updatedAt || item.sppdDate || "-")}</div></div></div></div>`;
}

function renderSppdOverviewStageView(item) {
  const sections = [
    renderSppdRequestInfoText(item),
    renderSppdParticipantReviewTable(item)
  ];

  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header">
        <div>
          <h2>Overview</h2>
          <small class="panel-kicker">Ringkasan dokumen mengikuti current stage SPPD.</small>
        </div>
      </div>
      <div class="panel-body sppd-stage-view">
        ${sections.join("")}
      </div>
    </div>
  `;
}

function renderSppdCompletedOverviewView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header">
        <div>
          <h2>Completed Overview</h2>
          <small class="panel-kicker">Ringkasan akhir dari Request, Verification, Approval, Payment, dan Letter Assignment.</small>
        </div>
      </div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdRequestInfoText(item)}
        ${renderSppdCompletedVerificationSummary(item)}
        ${renderSppdApprovalTrackTable(item)}
        ${renderSppdPaymentSummaryText(item)}
        ${renderSppdCompletedLetterSummary(item)}
      </div>
    </div>
  `;
}

function renderSppdCompletedVerificationSummary(item) {
  const totalCalculated = item.employees.reduce((sum, employee) => {
    const days = Number(employee.duration || item.duration || 1);
    const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
    return sum + Number(employee.calculatedAllowance || rate * days);
  }, 0);
  const totalVerified = item.employees.reduce((sum, employee) => {
    const days = Number(employee.duration || item.duration || 1);
    const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
    const calculated = Number(employee.calculatedAllowance || rate * days);
    return sum + Number(employee.verifiedAllowance || calculated);
  }, 0);
  const verifiedCount = item.employees.filter((employee) => employee.verificationStatus === "Verified" || item.status === "Approved" || item.paymentStatus === "Paid").length;
  return `
    <div class="sppd-review-section">
      <h4>Verification Summary</h4>
      <div class="sppd-review-pairs">
        ${sppdReviewPair("Verified Employee", `${verifiedCount} / ${item.employees.length} employee`)}
        ${sppdReviewPair("Calculated Allowance", formatRupiah(totalCalculated))}
        ${sppdReviewPair("Verified Allowance", formatRupiah(totalVerified))}
        ${sppdReviewPair("Verification Remark", item.remark || "-")}
      </div>
    </div>
  `;
}

function renderSppdCompletedLetterSummary(item) {
  const created = item.employees.filter((employee) => employee.assignmentLetter === "Created").length;
  return `
    <div class="sppd-review-section">
      <h4>Letter Assignment Summary</h4>
      <div class="sppd-review-pairs">
        ${sppdReviewPair("Letter Status", `${created} / ${item.employees.length} created`)}
        ${sppdReviewPair("Surat Tugas", item.assignmentLetterFile || (created ? `Surat Tugas ${item.docNo}` : "-"))}
        ${sppdReviewPair("Attachment Awal", item.attachment || "-")}
        ${sppdReviewPair("Completed Date", item.updatedAt || item.transferDate || "-")}
      </div>
    </div>
  `;
}

function renderSppdStageRequestView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Request</h2><small class="panel-kicker">Ringkasan dokumen request dan participant perjalanan.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdRequestInfoText(item)}
        ${renderSppdParticipantReviewTable(item)}
      </div>
    </div>
  `;
}

function renderSppdStageVerificationView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Verification</h2><small class="panel-kicker">Hasil verifikasi assignment, effective days, dan allowance per employee.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdRequestInfoText(item)}
        ${renderSppdVerificationResultTable(item)}
      </div>
    </div>
  `;
}

function renderSppdVerificationTabView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Verification</h2><small class="panel-kicker">Klik detail employee untuk verifikasi assignment, durasi, dan allowance.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdRequestInfoText(item)}
        ${renderSppdParticipantReviewTable(item, { mode: "verification" })}
      </div>
    </div>
  `;
}

function renderSppdApprovalTabView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header">
        <div><h2>Approval</h2><small class="panel-kicker">Approval berurutan dari level rendah sampai atasan terakhir.</small></div>
        <div class="panel-actions">
          <button class="btn neutral" type="button" data-action="sppd-approval-setting" data-id="${escapeHtml(item.id)}">${icon("settings")} Setting Approval</button>
        </div>
      </div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdApprovalTrackTable(item)}
      </div>
    </div>
  `;
}

function renderSppdPaymentTabView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Payment</h2><small class="panel-kicker">Proses payment allowance masing-masing employee.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdPaymentSummaryText(item)}
        ${renderSppdParticipantReviewTable(item, { mode: "payment" })}
      </div>
    </div>
  `;
}

function renderSppdLetterAssignmentTabView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header">
        <div><h2>Letter Assignment</h2><small class="panel-kicker">Generate, upload, preview, dan download surat tugas.</small></div>
        <button class="btn primary" type="button" data-action="sppd-letter-edit" data-id="${escapeHtml(item.id)}">${icon("file-text")} Buat Surat</button>
      </div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdLetterAssignmentTable(item)}
      </div>
    </div>
  `;
}

function renderSppdStageApprovalView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Approval</h2><small class="panel-kicker">Track approval Head of Division dan BOD.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdApprovalTrackTable(item)}
      </div>
    </div>
  `;
}

function renderSppdStagePaymentView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Payment</h2><small class="panel-kicker">Daftar payment allowance masing-masing employee.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdPaymentSummaryText(item)}
        ${renderSppdPaymentEmployeeTable(item)}
      </div>
    </div>
  `;
}

function renderSppdStageCompletedView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Completed</h2><small class="panel-kicker">Ringkasan keseluruhan proses SPPD.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdRequestInfoText(item)}
        ${renderSppdVerificationResultTable(item)}
        ${renderSppdApprovalTrackTable(item)}
        ${renderSppdPaymentEmployeeTable(item)}
        ${renderSppdOtherAllowanceTab(item)}
      </div>
    </div>
  `;
}

function renderSppdRequestInfoText(item) {
  return `
    <div class="sppd-review-section">
      <h4>Request Information</h4>
      <div class="sppd-review-pairs">
        ${sppdReviewPair("Doc No", item.docNo || "-")}
        ${sppdReviewPair("Request Title", item.agendaName || "-")}
        ${sppdReviewPair("Request Date", item.sppdDate || "-")}
        ${sppdReviewPair("Attachment", item.attachment || "-")}
        ${sppdReviewPair("PIC", item.requesterName || "-")}
        ${sppdReviewPair("Division", item.requesterDivision || "-")}
        ${sppdReviewPair("Participants", `${item.employees.length} employee`)}
        ${sppdReviewPair("General Remark", item.remark || "-")}
      </div>
    </div>
  `;
}

function renderSppdParticipantReviewTable(item, options = {}) {
  const mode = options.mode || "overview";
  const isVerification = mode === "verification";
  const isPayment = mode === "payment";
  return `
    <div class="sppd-review-section">
      <h4>${isPayment ? "Employee Payment" : "Participant Breakdown"}</h4>
      <div class="table-wrap">
        <table class="sppd-data-table sppd-review-participant-table ${isPayment ? "sppd-review-payment-table" : ""} ${isVerification ? "sppd-review-verification-table" : ""}">
          <thead><tr><th>Employee</th><th>Destination</th><th>Assignment</th><th class="center">Agenda</th>${isVerification ? `<th>Bank Account</th><th class="money-col">Calculated</th><th class="money-col">Verified</th><th class="center">Verification</th>` : ""}${isPayment ? `<th>Bank Account</th><th class="money-col">Verified Allowance</th><th class="center">Payment Status</th><th>Payment Date</th><th>Transfer Proof</th>` : `<th class="center">Status</th>`}<th class="center">Action</th></tr></thead>
          <tbody>${item.employees.map((employee) => {
            const days = Number(employee.duration || item.duration || 1);
            const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
            const calculated = Number(employee.calculatedAllowance || rate * days);
            const verified = Number(employee.verifiedAllowance || calculated);
            const isPaid = employee.paymentStatus === "Paid";
            const action = isPayment
              ? `<button class="action-icon ${item.status === "Approved" && item.paymentStatus !== "Paid" ? "action-edit" : "action-view"}" type="button" title="${isPaid ? "View Payment" : "Process Payment"}" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon(isPaid ? "eye" : "upload")}</button>`
              : `<button class="action-icon ${isVerification ? "action-edit" : "action-view"}" type="button" title="${isVerification ? "Verify Employee" : "View Employee"}" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="${isVerification ? "employee" : "detail"}">${icon(isVerification ? "edit" : "eye")}</button>`;
            return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td><td>${escapeHtml(employee.destination || "-")}</td><td>${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} hari</small></td><td class="center">${escapeHtml(employee.agendas?.length || 0)} agenda</td>${isVerification ? `<td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="money-col">${formatRupiah(calculated)}</td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td class="center">${statusPill(employee.verificationStatus || "Pending")}</td>` : ""}${isPayment ? `<td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td class="center">${statusPill(isPaid ? "Sudah Menerima" : "Pending")}</td><td>${escapeHtml(employee.paymentDate || "-")}</td><td>${escapeHtml(employee.transferProof || "-")}</td>` : `<td class="center">${sppdEmployeeDetailPill(employee.detailStatus || "Confirmed")}</td>`}<td class="center"><span class="table-actions">${action}</span></td></tr>`;
          }).join("") || emptyRow(isPayment ? 10 : isVerification ? 10 : 6, "Belum ada employee.")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSppdVerificationResultTable(item) {
  return `
    <div class="sppd-review-section">
      <h4>Verification Result</h4>
      <div class="table-wrap">
        <table class="sppd-data-table sppd-verification-result-table">
          <thead><tr><th>Employee</th><th>Level</th><th>Destination</th><th>Bank Account</th><th class="center">Effective Days</th><th class="money-col">Master Rate</th><th class="money-col">Calculated</th><th class="money-col">Verified</th><th>Remark</th></tr></thead>
          <tbody>${item.employees.map((employee) => {
            const days = Number(employee.duration || item.duration || 1);
            const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
            const calculated = Number(employee.calculatedAllowance || rate * days);
            const verified = Number(employee.verifiedAllowance || calculated);
            return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td><td>${escapeHtml(employee.level || "-")}</td><td>${escapeHtml(employee.destination || "-")}</td><td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="center">${escapeHtml(days)} hari</td><td class="money-col">${formatRupiah(rate)}</td><td class="money-col">${formatRupiah(calculated)}</td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td>${escapeHtml(employee.verificationRemark || item.remark || "-")}</td></tr>`;
          }).join("") || emptyRow(9, "Belum ada hasil verifikasi.")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function getSppdApprovalFlow(item) {
  if (!item.approvalFlow) {
    item.approvalFlow = [
      { role: "Kepala Unit", approver: "Kepala Unit Terkait", active: true },
      { role: "Kepala Departemen", approver: "Kepala Departemen Terkait", active: true },
      { role: "Kepala Divisi", approver: `Kepala Divisi ${item.requesterDivision || "Terkait"}`, active: true },
      { role: "BOD", approver: "BOD Terkait", active: true }
    ];
  }
  return item.approvalFlow;
}

function renderSppdApprovalSettingTable(item) {
  const rows = getSppdApprovalFlow(item);
  return `
    <div class="sppd-review-section">
      <h4>Approval Setting</h4>
      <div class="table-wrap"><table class="sppd-data-table sppd-approval-setting-table">
        <thead><tr><th class="center">No</th><th>Approval Role</th><th>Approver</th><th class="center">Active</th></tr></thead>
        <tbody>${rows.map((row, index) => `<tr><td class="center">${escapeHtml(index + 1)}</td><td><strong>${escapeHtml(row.role)}</strong></td><td>${escapeHtml(row.approver)}</td><td class="center">${statusPill(row.active ? "Active" : "Inactive")}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
  `;
}

function openSppdApprovalSettingModal(id) {
  setSection(appState.section, "approvalSetting", id);
}

function renderSppdApprovalSettingDrawer() {
  const item = findSppdRequest(appState.selectedId);
  if (!item) return renderNotFound("SPPD");
  const rows = getSppdApprovalFlow(item);
  return `
    <form class="drawer-form sppd-approval-setting-drawer" id="sppdApprovalSettingForm">
      <div class="sppd-document-head">
        <div>
          <h3>Setting Approval</h3>
          <p>${escapeHtml(item.docNo)} - ${escapeHtml(item.agendaName || "-")}</p>
        </div>
      </div>

      <div class="sppd-drawer-section">
        <h3>Approval Sequence</h3>
        <div class="sppd-approval-setting-head">
          <span></span>
          <span>No</span>
          <span>Approval Role</span>
          <span>Approver</span>
          <span class="center">Action</span>
        </div>
        <div class="sppd-approval-setting-list">
          ${rows.map((row, index) => {
            const approver = row.approverId ? db.employees.find((employee) => employee.id === row.approverId) : null;
            const hasApprover = Boolean(approver || row.approverId);
            return `
              <div class="sppd-approval-setting-row">
              <label class="sppd-check">
                <input type="checkbox" name="approvalActive_${index}" ${row.active ? "checked" : ""}>
                <span></span>
              </label>
              <span class="sppd-approval-no">${escapeHtml(index + 1)}</span>
              <input type="hidden" name="approvalRole_${index}" value="${escapeHtml(row.role)}">
              <input type="hidden" name="approvalApprover_${index}" value="${escapeHtml(row.approver)}">
              <input type="hidden" name="approvalApproverId_${index}" value="${escapeHtml(row.approverId || "")}">
              <div class="sppd-approval-role">
                <small>${escapeHtml(index + 1)}</small>
                <strong>${escapeHtml(row.role)}</strong>
              </div>
              <div class="sppd-approver-picker">
                <div>
                  <div class="sppd-approver-line">
                    <strong class="${hasApprover ? "" : "is-empty"}">${escapeHtml(approver?.name || row.approver || "Belum pilih approver")}</strong>
                    ${statusPill(hasApprover ? "Selected" : "Not Selected")}
                  </div>
                  <small>${escapeHtml(approver ? `${approver.nik} - ${approver.position} / ${approver.division}` : "Approver belum dipilih")}</small>
                </div>
              </div>
              <button class="action-icon action-view" type="button" title="${approver ? "Ubah Approver" : "Pilih Approver"}" aria-label="${approver ? "Ubah Approver" : "Pilih Approver"}" data-action="sppd-pick-approver" data-id="${escapeHtml(item.id)}" data-index="${escapeHtml(index)}">${icon("search")}</button>
            </div>`;
          }).join("")}
        </div>
      </div>

      <div class="drawer-actions">
        <button class="btn neutral" type="button" data-action="close-drawer">Cancel</button>
        <button class="btn success" type="submit" data-action="save-sppd-approval-setting" data-id="${escapeHtml(item.id)}">Save Setting</button>
      </div>
    </form>
  `;
}

function openSppdApproverPickerModal(id, index) {
  appState.modal = { type: "sppdApproverPicker", id, index: Number(index || 0) };
  renderModal();
}

function renderSppdApproverPickerModal() {
  const item = findSppdRequest(appState.modal?.id);
  if (!item) return "";
  const index = Number(appState.modal?.index || 0);
  const flow = getSppdApprovalFlow(item);
  const row = flow[index] || flow[0];
  const candidates = getSppdApproverCandidates(row?.role || "");
  return `
    <div class="modal sppd-employee-picker" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Pilih Approver</h3>
          <small class="modal-kicker">${escapeHtml(row?.role || "-")}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <label class="searchbox sppd-picker-search">
          <span data-icon="search"></span>
          <input type="search" placeholder="Search nama, NIK, position..." data-action="sppd-picker-search">
        </label>
        <div class="sppd-picker-list table-wrap">
          <table class="sppd-data-table sppd-picker-table sppd-approver-picker-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIK</th>
                <th>Posisi</th>
                <th>Divisi</th>
                <th class="center">Status</th>
              </tr>
            </thead>
            <tbody>
          ${candidates.map((employee) => {
            const searchText = `${employee.name} ${employee.nik} ${employee.position} ${employee.division} ${employee.status}`.toLowerCase();
            return `
              <tr class="sppd-picker-row sppd-approver-row" data-search-text="${escapeHtml(searchText)}" data-action="sppd-select-approver" data-id="${escapeHtml(item.id)}" data-index="${escapeHtml(index)}" data-employee-id="${escapeHtml(employee.id)}">
                <td><strong>${escapeHtml(employee.name)}</strong></td>
                <td>${escapeHtml(employee.nik)}</td>
                <td>${escapeHtml(employee.position || "-")}</td>
                <td>${escapeHtml(employee.division || "-")}</td>
                <td class="center">${statusPill(employee.status)}</td>
              </tr>
            `;
          }).join("") || `<tr><td colspan="5"><div class="empty-state compact">Tidak ada employee aktif.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function getSppdApproverCandidates(role = "") {
  const keywordMap = {
    "Kepala Unit": ["unit", "supervisor", "fungsional", "spesialis"],
    "Kepala Departemen": ["departemen", "department", "manager", "coordinator"],
    "Kepala Divisi": ["divisi", "division", "supervisor", "manager"],
    BOD: ["direktur", "director", "bod"]
  };
  const keywords = keywordMap[role] || [];
  const rows = db.employees.filter((employee) => employee.status === "Active");
  const matched = rows.filter((employee) => keywords.some((keyword) => `${employee.position} ${employee.division}`.toLowerCase().includes(keyword)));
  return matched.length ? matched : rows;
}

function selectSppdApprover(id, index, employeeId) {
  const item = findSppdRequest(id);
  const employee = db.employees.find((row) => row.id === employeeId);
  if (!item || !employee) return;
  const flow = getSppdApprovalFlow(item);
  if (!flow[index]) return;
  flow[index].approverId = employee.id;
  flow[index].approver = employee.name;
  appState.modal = null;
  renderModal();
  render();
  showToast("Approver dipilih.");
}

function saveSppdApprovalSetting(id) {
  const item = findSppdRequest(id);
  const form = document.getElementById("sppdApprovalSettingForm");
  if (!item || !form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const current = getSppdApprovalFlow(item);
  item.approvalFlow = current.map((row, index) => ({
    role: data[`approvalRole_${index}`] || row.role,
    approver: data[`approvalApprover_${index}`] || row.approver,
    approverId: data[`approvalApproverId_${index}`] || row.approverId || "",
    active: data[`approvalActive_${index}`] === "on"
  }));
  appState.modal = null;
  renderModal();
  showToast("Approval setting updated.");
  render();
}

function renderSppdApprovalTrackTable(item) {
  const approved = item.status === "Approved" || item.paymentStatus === "Paid";
  const activeRows = getSppdApprovalFlow(item).filter((row) => row.active);
  const rows = activeRows.map((row, index) => [
    row.role,
    row.approver,
    approved ? "Approved" : index === 0 && item.status === "Verified" ? "Waiting" : "Queue",
    approved ? item.updatedAt || todayIso() : "-",
    approved ? "Disetujui." : "-"
  ]);
  return `
    <div class="sppd-review-section">
      <h4>Approval Track</h4>
      <div class="table-wrap"><table class="sppd-data-table sppd-approval-track-table">
        <thead><tr><th>Stage</th><th>Approver</th><th class="center">Status</th><th>Date</th><th>Remark</th></tr></thead>
        <tbody>${rows.map(([stage, approver, status, date, remark]) => `<tr><td><strong>${escapeHtml(stage)}</strong></td><td>${escapeHtml(approver)}</td><td class="center">${statusPill(status)}</td><td>${escapeHtml(date)}</td><td>${escapeHtml(remark)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
  `;
}

function renderSppdPaymentSummaryText(item) {
  const total = getSppdTotal(item);
  const paid = item.employees.filter((employee) => employee.paymentStatus === "Paid").reduce((sum, employee) => sum + Number(employee.verifiedAllowance || employee.calculatedAllowance || 0), 0);
  return `<div class="sppd-review-section"><h4>Payment Summary</h4><div class="sppd-review-pairs">${sppdReviewPair("Total Allowance", formatRupiah(total))}${sppdReviewPair("Paid", formatRupiah(paid))}${sppdReviewPair("Unpaid", formatRupiah(Math.max(total - paid, 0)))}${sppdReviewPair("Transfer Proof", item.transferProof || "-")}</div></div>`;
}

function renderSppdPaymentEmployeeTable(item) {
  const canProcessPayment = item.status === "Approved" && item.paymentStatus !== "Paid";
  return `
    <div class="sppd-review-section">
      <h4>Employee Payment</h4>
      <div class="table-wrap"><table class="sppd-data-table sppd-payment-table">
        <thead><tr><th>Employee</th><th>Bank Account</th><th class="money-col">Verified Allowance</th><th class="center">Payment Status</th><th>Payment Date</th><th>Transfer Proof</th><th class="center">Action</th></tr></thead>
        <tbody>${item.employees.map((employee) => {
          const isPaid = employee.paymentStatus === "Paid";
          return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.level || "-")}</small></td><td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="money-col"><strong>${formatRupiah(employee.verifiedAllowance || employee.calculatedAllowance || 0)}</strong></td><td class="center">${statusPill(isPaid ? "Sudah Menerima" : "Pending")}</td><td>${escapeHtml(employee.paymentDate || "-")}</td><td>${escapeHtml(employee.transferProof || "-")}</td><td class="center"><span class="table-actions">${canProcessPayment ? `<button class="action-icon action-edit" type="button" title="${isPaid ? "Edit Payment" : "Process Payment"}" aria-label="${isPaid ? "Edit Payment" : "Process Payment"}" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon(isPaid ? "edit" : "upload")}</button>` : `<button class="action-icon action-view" type="button" title="View Payment" aria-label="View Payment" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("eye")}</button>`}</span></td></tr>`;
        }).join("") || emptyRow(7, "Belum ada payment.")}</tbody>
      </table></div>
    </div>
  `;
}

function renderSppdCompletedEmployeePanel(item) {
  return `
    <div class="panel sppd-employee-table-panel">
      <div class="panel-header"><div><h2>Employee</h2><small class="panel-kicker">Final participant, allowance, payment, dan surat tugas.</small></div></div>
      <div class="panel-body">
        <div class="table-wrap">
          <table class="sppd-data-table sppd-employee-table">
            <thead><tr><th>Employee</th><th>Destination</th><th>Assignment</th><th class="money-col">Verified Allowance</th><th class="center">Payment</th><th class="center">Letter</th><th class="center">Action</th></tr></thead>
            <tbody>${item.employees.map((employee) => {
              const days = Number(employee.duration || item.duration || 1);
              const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
              const calculated = Number(employee.calculatedAllowance || rate * days);
              const verified = Number(employee.verifiedAllowance || calculated);
              return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td><td>${escapeHtml(employee.destination || "-")}</td><td>${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} hari</small></td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td class="center">${statusPill(employee.paymentStatus === "Paid" ? "Sudah Menerima" : "Pending")}</td><td class="center">${statusPill(employee.assignmentLetter === "Created" ? "Created" : "Draft")}</td><td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="View Employee" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="detail">${icon("eye")}</button></span></td></tr>`;
            }).join("") || emptyRow(7, "Belum ada employee.")}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderSppdLetterAssignmentTable(item) {
  const generated = item.employees.some((employee) => employee.assignmentLetter === "Created");
  return `
    <div class="sppd-review-section">
      <h4>Letter Assignment</h4>
      <div class="sppd-letter-upload">
        <input type="file" name="assignmentLetterFile" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx">
        <button class="btn success" type="button" data-action="sppd-letter-upload" data-id="${escapeHtml(item.id)}">${icon("upload")} Upload Surat Tugas</button>
      </div>
      <div class="table-wrap"><table class="sppd-data-table sppd-letter-assignment-table">
        <thead><tr><th>Document</th><th>Scope</th><th class="center">Letter Status</th><th class="center">Action</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Surat Tugas ${escapeHtml(item.docNo)}</strong><small>${escapeHtml(item.assignmentLetterFile || item.attachment || "Belum ada surat tugas uploaded")}</small></td>
            <td>${escapeHtml(item.employees.length)} employee</td>
            <td class="center">${statusPill(generated ? "Created" : "Draft")}</td>
            <td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="Preview" data-action="sppd-letter-preview" data-id="${escapeHtml(item.id)}">${icon("eye")}</button><button class="action-icon action-view" type="button" title="Download" data-action="sppd-letter-download" data-id="${escapeHtml(item.id)}">${icon("download")}</button></span></td>
          </tr>
        </tbody>
      </table></div>
    </div>
  `;
}

function renderSppdEmployeeTablePanel(item, editable = false) {
  return `<div class="panel sppd-employee-table-panel"><div class="panel-header"><div><h2>Employee</h2><small class="panel-kicker">Participant, assignment period, agenda, allowance, dan payment per employee.</small></div></div><div class="panel-body"><div class="table-wrap"><table class="sppd-data-table sppd-employee-table"><thead><tr><th class="person-col">Employee</th><th>Position</th><th>Division</th><th>Destination</th><th class="date-col">Assignment Period</th><th class="date-col">Duration</th><th>Agenda</th><th class="money-col">Allowance</th><th>Status</th><th class="center">Action</th></tr></thead><tbody>${item.employees.map((employee) => { const duration = employee.duration || item.duration || 1; const allowance = Number(employee.verifiedAllowance || employee.calculatedAllowance || Number(employee.dailyAllowance || 0) * Number(duration || 0)); return `<tr><td><strong>${escapeHtml(employee.name)}</strong><br><small>${escapeHtml(employee.nik)}</small></td><td>${escapeHtml(employee.position || "-")}</td><td>${escapeHtml(employee.division || "-")}</td><td>${escapeHtml(employee.destination || item.agendaLocation || "-")}</td><td>${escapeHtml(formatSppdEmployeeAssignmentPeriod(employee, item))}</td><td>${escapeHtml(duration)} hari</td><td>${escapeHtml(employee.agendas?.length || 0)} agenda</td><td>${formatRupiah(allowance)}</td><td>${statusPill(employee.paymentStatus || employee.assignmentLetter || "Pending")}</td><td class="center"><span class="table-actions"><button class="action-icon ${editable ? "action-edit" : "action-view"}" type="button" title="${editable ? "Edit Detail" : "View Detail"}" aria-label="${editable ? "Edit Detail" : "View Detail"}" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="${editable ? "employee" : "detail"}">${icon(editable ? "edit" : "eye")}</button></span></td></tr>`; }).join("") || emptyRow(10, "Belum ada employee.")}</tbody></table></div></div></div>`;
}

function renderSppdDocumentsPanel(item) {
  const generated = item.employees.some((employee) => employee.assignmentLetter === "Created");
  const requestDocuments = item.attachment
    ? [{ name: item.attachment, type: "Undangan / Dokumen Pendukung", owner: item.requesterName, status: item.status === "Draft" ? "Draft" : "Submitted" }]
    : [];
  const paymentDocuments = item.employees
    .filter((employee) => employee.transferProof)
    .map((employee) => ({
      name: employee.transferProof,
      type: "Bukti Transfer",
      owner: employee.name,
      status: employee.paymentStatus === "Paid" ? "Sudah Menerima" : "Pending"
    }));
  const letterDocuments = (generated || item.assignmentLetterFile)
    ? [{ name: item.assignmentLetterFile || `Surat Tugas ${item.docNo}.pdf`, type: "Surat Tugas", owner: `${item.employees.length} employee`, status: "Created" }]
    : [];
  return `<div class="panel sppd-documents-panel"><div class="panel-header"><div><h2>Documents</h2><small class="panel-kicker">Arsip dokumen request, payment, dan surat tugas.</small></div></div><div class="panel-body">${renderSppdDocumentSection("Dokumen Attached Awal Request", requestDocuments, "Belum ada attachment awal request.")}${renderSppdDocumentSection("Dokumen Payment", paymentDocuments, "Belum ada bukti transfer payment.")}${renderSppdDocumentSection("Dokumen Surat Tugas", letterDocuments, "Belum ada surat tugas yang diupload.")}</div></div>`;
}

function renderSppdDocumentSection(title, rows, emptyText) {
  return `<div class="sppd-document-section"><h4>${escapeHtml(title)}</h4><div class="table-wrap"><table class="sppd-data-table"><thead><tr><th>Document</th><th>Type</th><th>Owner / Scope</th><th>Status</th><th class="center">Action</th></tr></thead><tbody>${rows.map((row) => `<tr><td><strong>${escapeHtml(row.name)}</strong></td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.owner)}</td><td>${statusPill(row.status)}</td><td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="Preview" aria-label="Preview" data-action="sppd-doc-preview" data-file="${escapeHtml(row.name)}">${icon("eye")}</button><button class="action-icon action-view" type="button" title="Download" aria-label="Download" data-action="sppd-doc-download" data-file="${escapeHtml(row.name)}">${icon("download")}</button></span></td></tr>`).join("") || emptyRow(5, emptyText)}</tbody></table></div></div>`;
}

function renderSppdHistoryPanel(item) {
  const rows = item.history || [["Request Created", item.requesterName, item.sppdDate || "-"], [item.status === "Draft" ? "Saved as Draft" : "Request Submitted", item.requesterName, item.sppdDate || "-"], ...(["Verified", "Approved"].includes(item.status) || item.paymentStatus === "Paid" ? [["Verification Completed", "Super Admin", item.updatedAt || "-"]] : []), ...(item.status === "Approved" || item.paymentStatus === "Paid" ? [["Approval Completed", "Super Admin", item.updatedAt || "-"]] : []), ...(item.paymentStatus === "Paid" ? [["Payment Processed", "Super Admin", item.transferDate || "-"]] : [])];
  return `<div class="panel"><div class="panel-header"><div><h2>History</h2><small class="panel-kicker">Audit trail perubahan penting dokumen SPPD.</small></div></div><div class="panel-body"><div class="timeline-list">${rows.map(([title, actor, date]) => `<div class="timeline-item"><span></span><div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(actor)} - ${escapeHtml(date)}</small></div></div>`).join("")}</div></div></div>`;
}
function renderSppdDashboard() {
  return `
    <div class="page-grid sppd-page">
      <div class="panel sppd-hero">
        <div>
          <h2>SPPD Dashboard</h2>
          <small class="panel-kicker">Dashboard monitoring SPPD belum diaktifkan pada tahap ini.</small>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="empty-state">Dashboard SPPD belum tersedia.</div>
        </div>
      </div>
    </div>
  `;
}

function renderSppdQueue(section) {
  const rows = getSppdRowsForSection(section);
  const filtered = filterRows(rows, section, tableSearchKeys(section));
  const sorted = sortSppdTableRows(filtered, section);
  const page = getPaged(sorted, section);
  const actionLabel = section === "sppdVerification" ? "Start Verification" : section === "sppdApproval" ? "Review Approval" : "Process Payment";

  return `
    <div class="page-grid sppd-page">
      <div class="panel sppd-hero">
        <div>
          <h2>${escapeHtml(titleForSection(section))}</h2>
          <small class="panel-kicker">${escapeHtml(sppdSubtitle(section))}</small>
        </div>
      </div>
      <div class="panel sppd-table-panel">
        <div class="panel-body">
          ${renderToolbar(section, rows)}
          ${renderSppdMonitoringTable(page.rows, section, false, actionLabel, page.start)}
          ${renderPagination(page, section)}
        </div>
      </div>
    </div>
  `;
}

function renderSppdMonitoringTable(rows, section, compact = false, actionLabel = "View Detail", rowOffset = 0) {
  if (["sppdRequestList", "sppdCompletedList"].includes(section)) return renderSppdAllRequestTable(rows, actionLabel, rowOffset, section);
  return `
    <div class="table-wrap">
      <table class="sppd-data-table sppd-document-table">
        <thead>
          <tr>
            <th class="doc-col">SPPD Number</th>
            <th class="date-col">Request Date</th>
            <th class="person-col">PIC</th>
            <th>Division</th>
            <th class="participant-col">Participants</th>
            <th class="agenda-col">Destination</th>
            <th class="date-col">Assignment Period</th>
            <th class="stage-col">Current Process</th>
            <th class="stage-col">Status</th>
            <th class="center">Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((item) => `
            <tr>
              <td><strong>${escapeHtml(item.docNo)}</strong></td>
              <td>${escapeHtml(item.sppdDate || "-")}</td>
              <td>${escapeHtml(item.requesterName)}<br><small>${escapeHtml(item.requesterDivision)}</small></td>
              <td>${escapeHtml(item.requesterDivision || "-")}</td>
              <td>${escapeHtml(getSppdParticipantCount(item))}</td>
              <td>${escapeHtml(getSppdMainDestination(item))}</td>
              <td>${formatSppdPeriodCell(formatSppdAssignmentPeriod(item))}</td>
              <td>${statusPill(getSppdProcess(item))}</td>
              <td>${statusPill(getSppdStatus(item))}</td>
              <td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="${escapeHtml(actionLabel)}" aria-label="${escapeHtml(actionLabel)}" data-action="detail" data-section="${escapeHtml(section)}" data-id="${escapeHtml(item.id)}">${icon("eye")}</button></span></td>
            </tr>
          `).join("") || emptyRow(10, "Tidak ada data SPPD.")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSppdAllRequestTable(rows, actionLabel = "View Detail", rowOffset = 0, section = "sppdRequestList") {
  const columns = [
    { key: "docNo", label: "No & Request Date" },
    { key: "requesterName", label: "PIC" },
    { key: "division", label: "Division" },
    { key: "participants", label: "Participants" },
    { key: "destination", label: "Destination" },
    { key: "assignmentPeriod", label: "Assignment Period" },
    { key: "status", label: "Status" }
  ];
  return `
    <div class="table-wrap">
      <table class="sppd-data-table sppd-document-table sppd-all-request-table">
        <thead>
          <tr>
            <th class="center no-col">No.</th>
            ${columns.map((column) => renderSppdSortHeader(column.key, column.label, section)).join("")}
            <th class="center">Action</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((item, index) => `
            <tr>
              <td class="center no-col">${rowOffset + index + 1}</td>
              <td><strong>${escapeHtml(item.docNo)}</strong><small>${escapeHtml(item.requestDate || item.sppdDate || "-")}</small></td>
              <td><strong>${escapeHtml(item.requesterName || "-")}</strong><small>${escapeHtml(item.requesterPosition || "PIC / Requester")}</small></td>
              <td>${escapeHtml(item.division || item.requesterDivision || "-")}</td>
              <td>${escapeHtml(item.participantsText || getSppdParticipantCount(item))}</td>
              <td>${escapeHtml(item.destinationText || getSppdMainDestination(item))}</td>
              <td>${formatSppdPeriodCell(item.assignmentPeriodText || formatSppdAssignmentPeriod(item))}</td>
              <td>${sppdStatusPill(item.readableStatus || getSppdStatus(item))}</td>
              <td class="center">
                <span class="table-actions">
                  <button class="action-icon action-view" type="button" title="${escapeHtml(actionLabel)}" aria-label="${escapeHtml(actionLabel)}" data-action="detail" data-section="${escapeHtml(section)}" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
                  ${section === "sppdRequestList" && (item.readableStatus || item.status) === "Draft" ? `<button class="action-icon action-edit" type="button" title="Edit Draft" aria-label="Edit Draft" data-action="edit" data-section="sppdRequestList" data-id="${escapeHtml(item.id)}">${icon("edit")}</button>` : ""}
                </span>
              </td>
            </tr>
          `).join("") || emptyRow(9, "Tidak ada data SPPD.")}
        </tbody>
      </table>
    </div>
  `;
}

function sppdSummaryItem(label, value) {
  return `
    <div class="sppd-summary-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function formatSppdAssignmentPeriod(item) {
  const start = item.assignmentStartDate || item.sppdDate || "";
  const end = item.assignmentEndDate || start;
  if (!start && !end) return "-";
  const startText = [start, item.assignmentStartTime].filter(Boolean).join(" ");
  const endText = [end, item.assignmentEndTime].filter(Boolean).join(" ");
  return start === end && item.assignmentStartTime === item.assignmentEndTime ? startText : `${startText} s/d ${endText}`;
}

function formatSppdPeriodCell(value) {
  const text = String(value || "-");
  if (text === "-") return "-";
  const parts = text.split(" s/d ");
  if (parts.length < 2) return escapeHtml(text);
  return `${escapeHtml(parts[0])}<br><small>s/d ${escapeHtml(parts.slice(1).join(" s/d "))}</small>`;
}

function renderSppdDocumentStagePanel(item) {
  const active = getSppdEmployeeTab(item);
  const editable = active === "Verifikasi" || active === "Payment";

  return `
    <div class="panel sppd-stage-panel">
      <div class="panel-header">
        <div>
          <h2>${escapeHtml(active)}</h2>
          <small class="panel-kicker">${escapeHtml(sppdStageDescription(active))}</small>
        </div>
      </div>
      <div class="panel-body">
        ${renderSppdActiveTabContent(item, editable, active)}
      </div>
    </div>
  `;
}

function sppdStageDescription(stage) {
  return {
    Request: "Form pemohon, agenda, peserta perjalanan, attachment, dan remark request.",
    Verifikasi: "Review durasi, tanggal, kesesuaian peserta, level, dan uang harian.",
    Approval: "Status approval dokumen dari approval terkait.",
    Payment: "Ringkasan allowance, tanggal transfer, bukti transfer, dan konfirmasi paid.",
    Completed: "Dokumen completed dan arsip perjalanan.",
    "Other Allowance": "Biaya tambahan setelah proses utama, dicatat sebagai dokumen pendukung."
  }[stage] || "Detail proses SPPD.";
}

function renderSppdFlowPanel(activeStage = "Request") {
  const steps = [
    ["Request", "Draft atau submitted oleh pemohon/PIC"],
    ["Verifikasi", "Validasi detail employee, durasi, dan allowance"],
    ["Approval", "Keputusan atas dokumen SPPD"],
    ["Payment", "Tanggal transfer dan bukti transfer allowance"],
    ["Other Allowance", "Payment tambahan sesuai SKD yang terkait SPPD"]
  ];

  return `
    <div class="panel sppd-flow-panel">
      <div class="panel-header">
        <div>
          <h2>Flow Process SPPD</h2>
          <small class="panel-kicker">Satu dokumen request berjalan dari request sampai payment.</small>
        </div>
      </div>
      <div class="sppd-flow">
        ${steps.map(([label, note], index) => `
          <div class="sppd-flow-step ${label === activeStage ? "active" : ""}">
            <span>${escapeHtml(index + 1)}</span>
            <strong>${escapeHtml(label)}</strong>
            <small>${escapeHtml(note)}</small>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderSppdRequestList(section, compact = false) {
  const baseRows = section === "sppdRequestList" ? getSppdAllRequestRows() : getSppdRowsForSection(section);
  const rows = baseRows;
  const filtered = filterRows(rows, section, tableSearchKeys(section));
  const sorted = sortSppdTableRows(filtered, section);
  const page = getPaged(sorted, section, compact ? 5 : null);

  return `
    <div class="panel sppd-table-panel">
      ${["sppdRequestList", "sppdCompletedList"].includes(section) ? "" : `<div class="panel-header">
        <div>
          <h2>${["sppdDashboard"].includes(section) ? "List Travel Request" : escapeHtml(titleForSection(section))}</h2>
          <small class="panel-kicker">${escapeHtml(sppdSubtitle(section))}</small>
        </div>
      </div>`}
      <div class="panel-body">
        ${renderToolbar(section, rows)}
        ${renderSppdMonitoringTable(page.rows, section, false, "View Detail", page.start)}
        ${renderPagination(page, section)}
      </div>
    </div>
  `;
}

function renderSppdOtherAllowance() {
  const rows = db.sppdOtherAllowances;
  const filtered = filterRows(rows, "sppdOtherAllowance", tableSearchKeys("sppdOtherAllowance"));
  const page = getPaged(filtered, "sppdOtherAllowance");

  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Other Allowance</h2>
          <small class="panel-kicker">Payment tambahan sesuai SKD yang bisa berjalan paralel setelah request approved.</small>
        </div>
        <button class="btn success" type="button" data-action="sppd-other-new">${icon("plus")} New Allowance</button>
      </div>
      <div class="panel-body">
        ${renderToolbar("sppdOtherAllowance", rows)}
        <div class="table-wrap">
          <table class="sppd-data-table">
            <thead><tr><th>ID</th><th>SPPD</th><th>Pemohon</th><th>Type</th><th>Amount</th><th>Status</th><th>Transfer</th><th>Proof</th></tr></thead>
            <tbody>${page.rows.map((item) => `<tr><td>${escapeHtml(item.id)}</td><td>${escapeHtml(item.sppdId)}</td><td>${escapeHtml(item.requesterName)}</td><td>${escapeHtml(item.type)}</td><td>${formatRupiah(item.amount)}</td><td>${statusPill(item.status)}</td><td>${escapeHtml(item.transferDate || "-")}</td><td>${escapeHtml(item.proof || "-")}</td></tr>`).join("") || emptyRow(8, "Tidak ada other allowance.")}</tbody>
          </table>
        </div>
        ${renderPagination(page, "sppdOtherAllowance")}
      </div>
    </div>
  `;
}

function renderSppdMaster() {
  const sectionType = {
    sppdMasterJenis: "Agenda Type",
    sppdMasterRegion: "Region",
    sppdMasterArea: "Area / Cluster",
    sppdMasterEmployee: "Level",
    sppdMasterDurasi: "Allowance Rate"
  }[appState.section];
  const activeType = sectionType || appState.filters.sppdMaster.type || "Agenda Type";
  appState.filters.sppdMaster.type = activeType;
  const sourceTypes = getSppdMasterSourceTypes(activeType);
  const rows = getSppdMasterRows(activeType, sourceTypes);
  const tableSection = appState.search[appState.section] !== undefined ? appState.section : "sppdMaster";
  const filtered = filterRows(rows, tableSection, tableSearchKeys("sppdMaster"));
  const page = getPaged(filtered, tableSection);

  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Master SPPD</h2>
          <small class="panel-kicker">Konfigurasi ${escapeHtml(activeType.toLowerCase())} untuk request dan verifikasi SPPD.</small>
        </div>
        <button class="btn success" type="button" data-action="sppd-master-new">${icon("plus")} New Master</button>
      </div>
      <div class="panel-body">
        ${renderToolbar(tableSection, rows)}
        ${renderSppdMasterTable(activeType, page.rows)}
        ${renderPagination(page, tableSection)}
      </div>
    </div>
  `;
}

function getSppdMasterRows(activeType, sourceTypes) {
  return db.sppdMaster
    .filter((item) => sourceTypes.includes(item.type))
    .map((item) => {
      if (activeType === "Area / Cluster") {
        const scope = item.name.startsWith("Kluster") ? "International" : "Domestic";
        return {
          ...item,
          masterType: activeType,
          scope,
          destinationGroup: item.name,
          mapping: item.value
        };
      }

      if (activeType === "Allowance Rate") {
        const values = String(item.value || "").split("|");
        const scope = item.type === "Allowance LN" ? "International" : "Domestic";
        return {
          ...item,
          masterType: activeType,
          scope,
          level: item.name,
          rateOne: Number(values[0] || 0),
          rateTwo: Number(values[1] || 0),
          rateThree: Number(values[2] || 0)
        };
      }

      if (activeType === "Duration Rule") {
        const [scope = "-", areaCluster = "-", additionalDay = "0"] = String(item.name || "").split("|").map((part) => part.trim());
        return {
          ...item,
          masterType: activeType,
          scope,
          areaCluster,
          additionalDay,
          description: item.value
        };
      }

      return {
        ...item,
        masterType: activeType,
        description: item.value === "-" ? `${item.name} perjalanan dinas` : item.value
      };
    });
}

function renderSppdMasterTable(activeType, rows) {
  if (activeType === "Area / Cluster") {
    return `
      <div class="table-wrap">
        <table class="sppd-data-table sppd-master-table">
          <thead><tr><th>Scope</th><th>Area / Cluster</th><th>Description / Mapping</th><th>Status</th><th class="center">Action</th></tr></thead>
          <tbody>${rows.map((item) => `<tr><td>${escapeHtml(item.scope)}</td><td><strong>${escapeHtml(item.destinationGroup || "-")}</strong></td><td>${escapeHtml(item.mapping || "-")}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(5, "Tidak ada area / cluster.")}</tbody>
        </table>
      </div>
    `;
  }

  if (activeType === "Allowance Rate") {
    return `
      <div class="table-wrap">
        <table class="sppd-data-table sppd-master-rate-table">
          <thead><tr><th>Scope</th><th>Employee Level</th><th>Area 1 / Cluster 1</th><th>Area 2 / Cluster 2</th><th>Area 3</th><th>Status</th><th class="center">Action</th></tr></thead>
          <tbody>${rows.map((item) => `<tr><td>${escapeHtml(item.scope)}</td><td><strong>${escapeHtml(item.level || "-")}</strong></td><td>${formatSppdRate(item.rateOne, item.scope)}</td><td>${formatSppdRate(item.rateTwo, item.scope)}</td><td>${item.scope === "Domestic" ? formatSppdRate(item.rateThree, item.scope) : "-"}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(7, "Tidak ada allowance rate.")}</tbody>
        </table>
      </div>
    `;
  }

  if (activeType === "Duration Rule") {
    return `
      <div class="table-wrap">
        <table class="sppd-data-table sppd-master-duration-table">
          <thead><tr><th>Scope</th><th>Area / Cluster</th><th>Additional Day</th><th>Description</th><th>Status</th><th class="center">Action</th></tr></thead>
          <tbody>${rows.map((item) => `<tr><td>${escapeHtml(item.scope)}</td><td><strong>${escapeHtml(item.areaCluster || "-")}</strong></td><td>${escapeHtml(item.additionalDay || "0")} hari</td><td>${escapeHtml(item.description || "-")}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(6, "Tidak ada duration rule.")}</tbody>
        </table>
      </div>
    `;
  }

  const label = activeType === "Agenda Type" ? "Agenda Type" : activeType;
  return `
    <div class="table-wrap">
      <table class="sppd-data-table sppd-master-table">
        <thead><tr><th>${escapeHtml(label)}</th><th>Description</th><th>Status</th><th class="center">Action</th></tr></thead>
        <tbody>${rows.map((item) => `<tr><td><strong>${escapeHtml(item.name)}</strong></td><td>${escapeHtml(item.description || "-")}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(4, `Tidak ada ${label.toLowerCase()}.`)}</tbody>
      </table>
    </div>
  `;
}

function formatSppdRate(value, scope) {
  const numeric = Number(value || 0);
  if (!numeric) return "-";
  return scope === "International" ? `$${numeric}` : formatRupiah(numeric);
}

function getSppdRowsForSection(section) {
  if (section === "sppdRequestList") return db.sppdRequests;
  if (section === "sppdCompletedList") return db.sppdRequests.filter((item) => item.paymentStatus === "Paid");
  if (section === "sppdDashboard") return db.sppdRequests;
  if (section === "sppdVerification") return db.sppdRequests.filter((item) => item.status === "In Verification");
  if (section === "sppdApproval") return db.sppdRequests.filter((item) => item.status === "Verified");
  if (section === "sppdPayment") return db.sppdRequests.filter((item) => item.status === "Approved" && item.paymentStatus !== "Paid");
  return db.sppdRequests;
}

function getSppdAllRequestRows() {
  return db.sppdRequests.map((item) => {
    normalizeSppdRequest(item);
    return {
      ...item,
      requestDate: item.requestDate || item.sppdDate || item.agendaDate || "-",
      division: item.requesterDivision || "-",
      participantsText: String(getSppdParticipantCount(item)),
      destinationText: getSppdMainDestination(item),
      assignmentPeriodText: formatSppdAssignmentPeriod(item),
      currentProcess: getSppdProcess(item),
      readableStatus: getSppdDisplayStatus(item)
    };
  });
}

function getSppdMasterSourceTypes(type) {
  return {
    "Agenda Type": ["Jenis Agenda"],
    Region: ["Region"],
    "Area / Cluster": ["Area / Cluster"],
    Level: ["Level"],
    "Allowance Rate": ["Allowance DN", "Allowance LN"],
    "Duration Rule": ["Durasi Rules"]
  }[type] || ["Jenis Agenda"];
}

function sppdSubtitle(section) {
  return {
    sppdDashboard: "Kelola dokumen SPPD dalam satu list. Prosesnya dibaca dari step di detail.",
    sppdRequest: "Create dokumen SPPD dari pemohon/PIC, agenda, employee travel detail, dan allowance.",
    sppdVerification: "Review detail request secara editable sebelum masuk approval.",
    sppdApproval: "Review dokumen SPPD yang sudah verified untuk keputusan approval.",
    sppdPayment: "Upload tanggal transfer dan bukti transfer allowance.",
    sppdOtherAllowance: "Expense tambahan yang terkait dokumen SPPD setelah proses utama berjalan."
  }[section] || "Ringkasan SPPD Perjalanan Dinas.";
}

function sppdStagePill(item) {
  if (item.paymentStatus === "Paid") return statusPill("Paid");
  return statusPill(item.status);
}

function sppdActions(section, item) {
  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View" aria-label="View" data-action="detail" data-section="${escapeHtml(section)}" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
      ${item.status === "Draft" && item.paymentStatus !== "Paid" ? `<button class="action-icon action-edit" type="button" title="Edit Draft" aria-label="Edit Draft" data-action="edit" data-section="${escapeHtml(section)}" data-id="${escapeHtml(item.id)}">${icon("edit")}</button>` : ""}
      ${section === "sppdVerification" ? `<button class="action-icon action-edit" type="button" title="Verify" aria-label="Verify" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Verified">${icon("check")}</button>` : ""}
      ${section === "sppdApproval" ? `<button class="action-icon action-edit" type="button" title="Approve" aria-label="Approve" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Approved">${icon("check")}</button>` : ""}
      ${section === "sppdPayment" ? `<button class="action-icon action-edit" type="button" title="Mark Paid" aria-label="Mark Paid" data-action="sppd-paid" data-id="${escapeHtml(item.id)}">${icon("upload")}</button>` : ""}
    </span>
  `;
}

function getSppdTotal(item) {
  return item.employees.reduce((sum, employee) => sum + Number(employee.dailyAllowance || 0) * Number(item.duration || 0), 0);
}

function renderSppdCreatePage() {
  const activeStep = appState.sppdCreateStep || 1;
  return `
    <div class="page-grid sppd-page sppd-create-page">
      <div class="panel sppd-hero">
        <div>
          <h2>Create SPPD</h2>
          <small class="panel-kicker">Buat satu dokumen perjalanan dinas dengan beberapa participant dan agenda.</small>
        </div>
      </div>
      <div class="sppd-create-step-strip">
        <div class="sppd-create-steps">
          ${renderSppdCreateStepButton(1, "Request Information", activeStep)}
          ${renderSppdCreateStepButton(2, "Employee & Agenda", activeStep)}
          ${renderSppdCreateStepButton(3, "Review & Submit", activeStep)}
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          ${renderSppdCreateForm("sppd-create-form")}
        </div>
      </div>
    </div>
  `;
}

function renderSppdDrawer() {
  return renderSppdCreateForm("drawer-form");
}

function renderSppdCreateForm(formClass = "drawer-form") {
  const item = getSppdCreateRequestItem();
  if (!item) return renderNotFound("SPPD");
  normalizeSppdRequest(item);
  const selectedEmployees = getSppdDrawerEmployees(item);
  const firstEmployee = selectedEmployees[0] || item.employees[0] || {};
  const selectedPic = getSppdSelectedPic(item);
  const activeStep = appState.sppdCreateStep || 1;
  const showInlineSteps = formClass !== "sppd-create-form";
  const requestDateValue = item.sppdDate || todayIso();

  return `
    <form class="${escapeHtml(formClass)}" id="sppdForm" novalidate>
      <div class="sppd-document-head">
        <div>
          <small>Dokumen SPPD</small>
          <h3>${escapeHtml(item.docNo)}</h3>
        </div>
        <div class="sppd-document-status">
          ${sppdStagePill(item)}
          ${statusPill(item.paymentStatus)}
        </div>
      </div>

      ${showInlineSteps ? `<div class="sppd-create-steps">
        ${renderSppdCreateStepButton(1, "Request Information", activeStep)}
        ${renderSppdCreateStepButton(2, "Employee & Agenda", activeStep)}
        ${renderSppdCreateStepButton(3, "Review & Submit", activeStep)}
      </div>` : ""}

      <div class="sppd-drawer-section ${activeStep === 1 ? "" : "is-hidden"}">
        <h3>Step 1 - Request Information</h3>
        <div class="form-grid sppd-request-info-grid">
          ${field("Doc No", `<input name="docNo" value="${escapeHtml(item.docNo)}" readonly>`, false)}
          ${field("Request Title", `<input name="agendaName" value="${escapeHtml(item.agendaName)}" placeholder="Contoh: Workshop HCMS Jakarta" required>`, true)}
          ${field("Request Date", `<input type="date" name="sppdDate" value="${escapeHtml(requestDateValue)}" required>`, true)}
          ${field("Attachment Pendukung", `<input type="file" name="attachmentFile" accept=".pdf,.png,.jpg,.jpeg">`, false)}
          ${item.attachment ? `<div class="form-hint">Current: ${escapeHtml(item.attachment)}</div>` : ""}
          ${field("PIC / Requester", renderSppdPicPickerField(selectedPic, item), true)}
          ${field("General Remark", `<textarea name="remark">${escapeHtml(item.remark)}</textarea>`, false)}
          ${field("Nama PIC", `<input name="requesterName" value="${escapeHtml(selectedPic?.name || item.requesterName)}" readonly required>`, true)}
          ${field("Divisi", `<input name="requesterDivision" value="${escapeHtml(selectedPic?.division || item.requesterDivision)}" readonly required>`, true)}
        </div>
      </div>

      <div class="sppd-drawer-section ${activeStep === 2 ? "" : "is-hidden"}">
        <div class="sppd-section-head">
          <h3>Step 2 - Employee & Agenda</h3>
          <button class="btn neutral" type="button" data-action="sppd-add-employee" data-id="${escapeHtml(item.id || "draft")}">${icon("user-plus")} Add Employee</button>
        </div>
        ${renderSppdCreateEmployeeList(selectedEmployees)}
      </div>

      <div class="sppd-drawer-section ${activeStep === 3 ? "" : "is-hidden"}">
        <h3>Step 3 - Review & Submit</h3>
        ${renderSppdCreateReview(item, selectedEmployees, selectedPic)}
      </div>

      <div class="drawer-actions sppd-form-actions">
        <div class="sppd-form-actions-left">
          <button class="btn neutral" type="button" data-action="sppd-create-cancel">Cancel</button>
        </div>
        <div class="sppd-form-actions-right">
          ${activeStep > 1 ? `<button class="btn neutral" type="button" data-action="sppd-create-prev">Previous</button>` : ""}
          ${activeStep === 3 ? `<button class="btn neutral" type="submit" data-action="save-sppd" data-status="Draft">Save Draft</button>` : ""}
          ${activeStep < 3 ? `<button class="btn success" type="button" data-action="sppd-create-next">Next</button>` : `<button class="btn success" type="submit" data-action="save-sppd" data-status="Submitted">Submit</button>`}
        </div>
      </div>
    </form>
  `;
}

function getSppdDrawerEmployees(item) {
  if (item.id) return item.employees || [];
  return appState.sppdDraftEmployeeIds
    .map((id) => {
      const employeeId = getSppdDraftRowEmployeeId(id);
      const employee = db.employees.find((row) => row.id === employeeId);
      return employee ? { rowId: id, employee } : null;
    })
    .filter(Boolean)
    .map(({ rowId, employee }) => ({
      rowId,
      id: employee.id,
      name: employee.name,
      nik: employee.nik,
      position: employee.position,
      division: employee.division,
      level: "Pelaksana",
      ...getSppdDraftEmployeeDetail(rowId)
    }));
}

function getSppdDraftRowEmployeeId(rowId) {
  return appState.sppdDraftEmployeeDetails?.[rowId]?.employeeId || rowId;
}

function getSppdDraftRowEmployee(rowId) {
  return db.employees.find((employee) => employee.id === getSppdDraftRowEmployeeId(rowId));
}

function getSppdDraftEmployeeDetail(rowId) {
  return appState.sppdDraftEmployeeDetails?.[rowId] || {
    employeeId: rowId,
    destination: "",
    assignmentStartDate: "",
    assignmentEndDate: "",
    duration: 1,
    agendas: []
  };
}

function validateSppdCreateStep(step) {
  const form = document.getElementById("sppdForm");
  if (!form) return true;
  const data = Object.fromEntries(new FormData(form).entries());

  if (Number(step) === 1) {
    if (!data.agendaName || !data.sppdDate || !data.requesterName || !data.requesterDivision) {
      showToast("Lengkapi Request Title, Request Date, dan PIC terlebih dahulu.");
      return false;
    }
  }

  if (Number(step) === 2 && appState.view === "add" && !appState.selectedId && !appState.sppdDraftEmployeeIds.length) {
    showToast("Tambahkan minimal satu employee terlebih dahulu.");
    return false;
  }

  return true;
}

function getSppdCreateRequestItem() {
  if (appState.view === "add" && !appState.selectedId) {
    if (!appState.sppdDraftRequest) appState.sppdDraftRequest = makeEmptySppdRequest();
    return appState.sppdDraftRequest;
  }
  return findSppdRequest(appState.selectedId);
}

function syncSppdCreateDraftFromForm() {
  const form = document.getElementById("sppdForm");
  if (!form) return;
  const item = getSppdCreateRequestItem();
  if (!item) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const attachmentFile = form.querySelector('[name="attachmentFile"]')?.files?.[0];
  const requester = db.employees.find((employee) => employee.id === data.requesterEmployeeId || employee.nik === data.requesterEmployeeId);

  Object.assign(item, {
    requesterEmployeeId: requester?.id || data.requesterEmployeeId || item.requesterEmployeeId || "",
    requesterName: data.requesterName || requester?.name || item.requesterName || "",
    requesterDivision: data.requesterDivision || requester?.division || item.requesterDivision || "",
    requesterPosition: requester?.position || item.requesterPosition || "",
    agendaName: data.agendaName || item.agendaName || "",
    sppdDate: data.sppdDate || item.sppdDate || todayIso(),
    attachment: attachmentFile?.name || item.attachment || "",
    remark: data.remark || item.remark || ""
  });
}

function getSppdSelectedPic(item) {
  const selectedId = appState.sppdDraftPicEmployeeId || item.requesterEmployeeId || "";
  return db.employees.find((employee) => employee.id === selectedId || employee.nik === selectedId || employee.name === item.requesterName)
    || db.employees.find((employee) => employee.name === item.requesterName && employee.division === item.requesterDivision)
    || null;
}

function renderSppdPicPickerField(employee, item) {
  const value = employee?.id || item.requesterEmployeeId || "";
  const subtitle = employee
    ? `${employee.nik} - ${employee.position} / ${employee.division}`
    : "PIC otomatis mengikuti user yang sedang login";
  return `
    <input type="hidden" name="requesterEmployeeId" value="${escapeHtml(value)}">
    <div class="sppd-reference-picker sppd-reference-picker-auto">
      <div>
        <strong>${escapeHtml(employee?.name || item.requesterName || "PIC tidak ditemukan")}</strong>
        <small>${escapeHtml(subtitle)}</small>
      </div>
      ${statusPill("Auto")}
    </div>
  `;
}

function renderSppdCreateStepButton(step, label, activeStep) {
  return `
    <button class="${step === activeStep ? "active" : ""}" type="button" data-action="sppd-create-step" data-step="${escapeHtml(step)}">
      <b>${escapeHtml(step)}</b>
      <span>${escapeHtml(label)}</span>
    </button>
  `;
}

function renderSppdCreateEmployeeList(employees) {
  return `
    <div class="sppd-create-employee-list">
      ${employees.length ? `
        <div class="table-wrap">
          <table class="sppd-data-table sppd-create-participant-table">
            <thead>
              <tr>
                <th class="center">No</th>
                <th>Employee</th>
                <th>Destination</th>
                <th>Assignment Period</th>
                <th class="center">Duration</th>
                <th class="center">Agenda</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map((employee, index) => {
                const period = employee.assignmentStartDate || employee.assignmentEndDate
                  ? `${employee.assignmentStartDate || "-"} s/d ${employee.assignmentEndDate || employee.assignmentStartDate || "-"}`
                  : "-";
                return `
                  <tr>
                    <td class="center">${escapeHtml(index + 1)}</td>
                    <td>
                      <div class="sppd-employee-cell">
                        <div>
                          <strong>${escapeHtml(employee.name)}</strong>
                          <small>${escapeHtml(employee.nik)} - ${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small>
                        </div>
                        <button class="btn tiny neutral" type="button" data-action="sppd-edit-draft-row-employee" data-employee-id="${escapeHtml(employee.rowId || employee.id)}">${icon("edit")} Edit</button>
                      </div>
                    </td>
                    <td>${escapeHtml(employee.destination || "-")}</td>
                    <td>${formatSppdPeriodCell(period)}</td>
                    <td class="center">${escapeHtml(employee.duration || 1)} hari</td>
                    <td class="center">${escapeHtml(employee.agendas?.length || 0)}</td>
                    <td class="center">
                      <span class="table-actions">
                        <button class="action-icon action-edit" type="button" title="Edit Assignment" aria-label="Edit Assignment" data-action="sppd-edit-draft-employee" data-employee-id="${escapeHtml(employee.rowId || employee.id)}">${icon("edit")}</button>
                        <button class="action-icon action-duplicate" type="button" title="Duplicate Row" aria-label="Duplicate Row" data-action="sppd-duplicate-draft-employee" data-employee-id="${escapeHtml(employee.rowId || employee.id)}">${icon("copy")}</button>
                        <button class="action-icon action-delete danger" type="button" title="Remove Employee" aria-label="Remove Employee" data-action="sppd-remove-draft-employee" data-employee-id="${escapeHtml(employee.rowId || employee.id)}">${icon("trash")}</button>
                      </span>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      ` : `<div class="empty-state compact">Belum ada employee. Klik Add Employee untuk memilih peserta perjalanan.</div>`}
    </div>
  `;
}

function renderSppdCreateReview(item, employees, selectedPic) {
  const participantCount = employees.length || item.employees?.length || 0;
  return `
    <div class="sppd-review-text">
      <div class="sppd-review-section">
        <h4>Request Information</h4>
        <div class="sppd-review-pairs">
          ${sppdReviewPair("Doc No", item.docNo || "Auto")}
          ${sppdReviewPair("Request Title", item.agendaName || "-")}
          ${sppdReviewPair("Request Date", item.sppdDate || "-")}
          ${sppdReviewPair("Attachment", item.attachment || "-")}
          ${sppdReviewPair("PIC", selectedPic?.name || item.requesterName || "-")}
          ${sppdReviewPair("Division", selectedPic?.division || item.requesterDivision || "-")}
          ${sppdReviewPair("Participants", `${participantCount} employee`)}
          ${sppdReviewPair("General Remark", item.remark || "-")}
        </div>
      </div>
      <div class="sppd-review-section">
        <h4>Participant Breakdown</h4>
        <div class="table-wrap">
          <table class="sppd-data-table sppd-review-participant-table">
            <thead>
              <tr>
                <th class="center">No</th>
                <th>Employee</th>
                <th>Destination</th>
                <th>Assignment</th>
                <th class="center">Agenda</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map((employee, index) => {
                const detail = getSppdDraftEmployeeDetail(employee.id);
                const period = detail.assignmentStartDate || detail.assignmentEndDate
                  ? `${detail.assignmentStartDate || "-"} s/d ${detail.assignmentEndDate || detail.assignmentStartDate || "-"}`
                  : "-";
                return `
                  <tr>
                    <td class="center">${escapeHtml(index + 1)}</td>
                    <td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td>
                    <td>${escapeHtml(detail.destination || "-")}</td>
                    <td>${formatSppdPeriodCell(period)}<small>${escapeHtml(detail.duration || 1)} hari</small></td>
                    <td class="center">${escapeHtml(detail.agendas?.length || 0)} agenda</td>
                    <td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="View Employee Detail" aria-label="View Employee Detail" data-action="sppd-view-draft-employee" data-employee-id="${escapeHtml(employee.id)}">${icon("eye")}</button></span></td>
                  </tr>
                `;
              }).join("") || emptyRow(6, "Belum ada employee untuk direview.")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function sppdReviewPair(label, value) {
  return `
    <div class="sppd-review-pair">
      <b>${escapeHtml(label)}</b>
      <span>${escapeHtml(value)}</span>
    </div>
  `;
}

function openSppdMasterModal(id = "") {
  appState.modal = { type: "sppdMaster", id };
  renderModal();
}

function renderSppdCancelCreateModal() {
  return `
    <div class="modal small-modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>Keluar dari Create SPPD?</h3>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <p class="modal-copy">Perubahan yang sudah diisi bisa disimpan sebagai draft atau dibuang.</p>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Continue Editing</button>
        <button class="btn neutral" type="button" data-action="sppd-discard-create">Discard</button>
        <button class="btn success" type="button" data-action="sppd-save-draft-exit">Save Draft</button>
      </div>
    </div>
  `;
}

function renderSppdMasterModal() {
  const viewType = getSppdMasterViewType(appState.filters.sppdMaster.type || "Agenda Type");
  const defaultType = getDefaultSppdMasterType(viewType);
  const item = db.sppdMaster.find((row) => row.id === appState.modal.id) || {
    id: "",
    type: defaultType,
    name: "",
    value: "",
    status: "Active"
  };
  return `
    <form class="modal" id="sppdMasterForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>${item.id ? "Edit" : "Add"} ${escapeHtml(viewType)}</h3>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body form-grid">
        <input type="hidden" name="masterViewType" value="${escapeHtml(viewType)}">
        ${renderSppdMasterModalFields(viewType, item)}
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="submit" data-action="save-sppd-master">${icon("save")} Save</button>
      </div>
    </form>
  `;
}

function renderSppdMasterModalFields(viewType, item) {
  if (viewType === "Region") {
    return `
      ${field("Region Name", `<input name="masterName" value="${escapeHtml(item.name || "")}" placeholder="Contoh: Dalam Negeri / Luar Negeri" required>`, true)}
      ${field("Description", `<textarea name="description" placeholder="Keterangan region">${escapeHtml(item.value === "-" ? "" : item.value || "")}</textarea>`, false)}
      ${field("Status", renderSppdMasterStatusSelect(item.status), true)}
    `;
  }

  if (viewType === "Level") {
    return `
      ${field("Level Name", `<input name="masterName" value="${escapeHtml(item.name || "")}" placeholder="Contoh: Pelaksana" required>`, true)}
      ${field("Description", `<textarea name="description" placeholder="Keterangan level">${escapeHtml(item.value === "-" ? "" : item.value || "")}</textarea>`, false)}
      ${field("Status", renderSppdMasterStatusSelect(item.status), true)}
    `;
  }

  if (viewType === "Area / Cluster") {
    const scope = item.name?.startsWith("Kluster") ? "International" : "Domestic";
    const domesticOptions = ["Area 1", "Area 2", "Area 3"];
    const internationalOptions = ["Kluster 1", "Kluster 2"];
    return `
      ${field("Scope", `<select name="scope"><option value="Domestic" ${scope === "Domestic" ? "selected" : ""}>Domestic</option><option value="International" ${scope === "International" ? "selected" : ""}>International</option></select>`, true)}
      ${field("Domestic Area", `<select name="domesticArea">${domesticOptions.map((area) => `<option value="${escapeHtml(area)}" ${item.name === area ? "selected" : ""}>${escapeHtml(area)}</option>`).join("")}</select>`, true)}
      ${field("International Cluster", `<select name="internationalCluster">${internationalOptions.map((cluster) => `<option value="${escapeHtml(cluster)}" ${item.name === cluster ? "selected" : ""}>${escapeHtml(cluster)}</option>`).join("")}</select>`, true)}
      ${field("Destination Mapping", `<textarea name="mapping" required placeholder="Contoh: Jawa Timur termasuk Madura / Pulau Jawa selain Jawa Timur / Diluar Pulau Jawa">${escapeHtml(item.value || "")}</textarea>`, true)}
      ${field("Status", renderSppdMasterStatusSelect(item.status), true)}
    `;
  }

  if (viewType === "Allowance Rate") {
    const scope = item.type === "Allowance LN" ? "International" : "Domestic";
    const values = String(item.value || "").split("|");
    return `
      ${field("Scope", `<select name="scope"><option value="Domestic" ${scope === "Domestic" ? "selected" : ""}>Domestic</option><option value="International" ${scope === "International" ? "selected" : ""}>International</option></select>`, true)}
      ${field("Employee Level", `<input name="levelName" value="${escapeHtml(item.name || "")}" placeholder="Contoh: Kepala Divisi" required>`, true)}
      ${field("Area 1 / Cluster 1", `<input type="number" min="0" name="rateOne" value="${escapeHtml(values[0] || "")}" required>`, true)}
      ${field("Area 2 / Cluster 2", `<input type="number" min="0" name="rateTwo" value="${escapeHtml(values[1] || "")}" required>`, true)}
      ${field("Area 3", `<input type="number" min="0" name="rateThree" value="${escapeHtml(values[2] || "")}" placeholder="Domestic only">`, false)}
      ${field("Status", renderSppdMasterStatusSelect(item.status), true)}
    `;
  }

  if (viewType === "Duration Rule") {
    const [scope = "Domestic", areaCluster = "All", additionalDay = "0"] = String(item.name || "").split("|").map((part) => part.trim());
    return `
      ${field("Scope", `<select name="scope"><option value="Domestic" ${scope === "Domestic" ? "selected" : ""}>Domestic</option><option value="International" ${scope === "International" ? "selected" : ""}>International</option></select>`, true)}
      ${field("Area / Cluster", `<select name="areaCluster"><option value="All" ${areaCluster === "All" ? "selected" : ""}>All</option><option value="Area 1" ${areaCluster === "Area 1" ? "selected" : ""}>Area 1</option><option value="Area 2" ${areaCluster === "Area 2" ? "selected" : ""}>Area 2</option><option value="Area 3" ${areaCluster === "Area 3" ? "selected" : ""}>Area 3</option><option value="Area 2 / Area 3" ${areaCluster === "Area 2 / Area 3" ? "selected" : ""}>Area 2 / Area 3</option><option value="Kluster 1" ${areaCluster === "Kluster 1" ? "selected" : ""}>Kluster 1</option><option value="Kluster 2" ${areaCluster === "Kluster 2" ? "selected" : ""}>Kluster 2</option></select>`, true)}
      ${field("Additional Day", `<input type="number" min="0" name="additionalDay" value="${escapeHtml(additionalDay || "0")}" required>`, true)}
      ${field("Description", `<textarea name="description" required placeholder="Contoh: Tambahan 1 hari untuk perjalanan area tertentu">${escapeHtml(item.value || "")}</textarea>`, true)}
      ${field("Status", renderSppdMasterStatusSelect(item.status), true)}
    `;
  }

  return `
    ${field("Agenda Type Name", `<input name="agendaTypeName" value="${escapeHtml(item.name || "")}" placeholder="Contoh: Meeting" required>`, true)}
    ${field("Description", `<textarea name="description" required>${escapeHtml(item.value === "-" ? "" : item.value || "")}</textarea>`, true)}
    ${field("Status", renderSppdMasterStatusSelect(item.status), true)}
  `;
}

function renderSppdMasterStatusSelect(status = "Active") {
  return `<select name="status"><option value="Active" ${status === "Active" ? "selected" : ""}>Active</option><option value="Inactive" ${status === "Inactive" ? "selected" : ""}>Inactive</option></select>`;
}

function getDefaultSppdMasterType(viewType) {
  return {
    "Agenda Type": "Jenis Agenda",
    Region: "Region",
    "Area / Cluster": "Area / Cluster",
    Level: "Level",
    "Allowance Rate": "Allowance DN",
    "Duration Rule": "Durasi Rules"
  }[viewType] || "Jenis Agenda";
}

function openSppdOtherAllowanceModal(sppdId = "") {
  const docId = sppdId || String(appState.selectedId || "").split("::")[0];
  appState.modal = { type: "sppdOtherAllowance", sppdId: docId };
  renderModal();
}

function renderSppdOtherAllowanceModal() {
  const item = findSppdRequest(appState.modal.sppdId);
  return `
    <form class="modal" id="sppdOtherAllowanceForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>Add Other Allowance</h3>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body form-grid">
        ${field("SPPD", `<input name="sppdId" value="${escapeHtml(item?.id || appState.modal.sppdId || "")}" readonly>`, false)}
        ${field("Requester", `<input name="requesterName" value="${escapeHtml(item?.requesterName || "")}" required>`, true)}
        ${field("Jenis Allowance", `<select name="type"><option>Transport</option><option>Hotel</option><option>Meals / Client Dinner</option><option>Akomodasi / Hotel</option><option>Lainnya</option></select>`, true)}
        ${field("Nominal", `<input type="number" min="0" name="amount" required>`, true)}
        ${field("Bukti Kwitansi", `<input type="file" name="proofFile" accept=".pdf,.png,.jpg,.jpeg">`, false)}
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="submit" data-action="save-sppd-other">${icon("send")} Submit</button>
      </div>
    </form>
  `;
}

function openSppdEmployeePaymentModal(sppdId, employeeId) {
  appState.modal = { type: "sppdEmployeePayment", sppdId, employeeId };
  renderModal();
}

function renderSppdEmployeePaymentModal() {
  const item = findSppdRequest(appState.modal?.sppdId);
  const employee = item?.employees?.find((row) => row.id === appState.modal?.employeeId);
  if (!item || !employee) return "";
  const amount = Number(employee.verifiedAllowance || employee.calculatedAllowance || 0);
  const bankAccount = getSppdEmployeeBankAccount(employee);
  const readOnly = item.status !== "Approved" || item.paymentStatus === "Paid";
  return `
    <form class="modal ${readOnly ? "is-readonly" : ""}" id="sppdEmployeePaymentForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Payment Allowance</h3>
          <small class="modal-kicker">${escapeHtml(employee.name)} - ${escapeHtml(bankAccount)}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body form-grid">
        ${field("Employee", `<input value="${escapeHtml(employee.name)}" readonly>`, false)}
        ${field("Bank Account", `<input value="${escapeHtml(bankAccount)}" readonly>`, false)}
        ${field("Amount", `<input value="${escapeHtml(formatRupiah(amount))}" readonly>`, false)}
        ${field("Payment Status", `<input value="${escapeHtml(employee.paymentStatus === "Paid" ? "Sudah Menerima" : "Pending")}" readonly>`, false)}
        ${field("Payment Date", `<input type="date" name="paymentDate" value="${escapeHtml(employee.paymentDate || todayIso())}" required>`, true)}
        ${field("Transfer Reference", `<input name="transferReference" value="${escapeHtml(employee.transferReference || "")}" placeholder="No. referensi transfer">`, false)}
        ${field("Transfer Proof", `<input type="file" name="transferProofFile" accept=".pdf,.png,.jpg,.jpeg" ${readOnly ? "disabled" : ""}>`, false)}
        ${employee.transferProof ? `<div class="form-hint">Current: ${escapeHtml(employee.transferProof)}</div>` : ""}
        ${field("Remark", `<textarea name="paymentRemark">${escapeHtml(employee.paymentRemark || "")}</textarea>`, false)}
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        ${readOnly ? "" : `<button class="btn success" type="submit" data-action="save-sppd-employee-payment" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">Confirm Paid</button>`}
      </div>
    </form>
  `;
}

function openSppdCopyAssignmentModal(sourceEmployeeId) {
  appState.modal = { type: "sppdCopyAssignment", sourceEmployeeId };
  renderModal();
}

function renderSppdCopyAssignmentModal() {
  const sourceId = appState.modal?.sourceEmployeeId;
  const sourceEmployee = db.employees.find((employee) => employee.id === sourceId);
  const targets = appState.sppdDraftEmployeeIds
    .filter((employeeId) => employeeId !== sourceId)
    .map((employeeId) => db.employees.find((employee) => employee.id === employeeId))
    .filter(Boolean);
  return `
    <div class="modal sppd-copy-assignment-modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Copy Assignment</h3>
          <small class="modal-kicker">Source: ${escapeHtml(sourceEmployee?.name || "-")}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <label class="searchbox sppd-picker-search">
          <span data-icon="search"></span>
          <input type="search" placeholder="Search target employee..." data-action="sppd-picker-search">
        </label>
        <div class="sppd-picker-list">
          ${targets.map((employee) => {
            const searchText = `${employee.name} ${employee.nik} ${employee.position} ${employee.division}`.toLowerCase();
            return `
              <label class="sppd-picker-row" data-search-text="${escapeHtml(searchText)}">
                <input type="checkbox" name="copyTargetEmployee" value="${escapeHtml(employee.id)}">
                <span>
                  <strong>${escapeHtml(employee.name)}</strong>
                  <small>${escapeHtml(employee.nik)} - ${escapeHtml(employee.position)} / ${escapeHtml(employee.division)}</small>
                </span>
                ${sppdEmployeeDetailPill(getSppdDraftEmployeeDetail(employee.id).detailStatus || "Draft")}
              </label>
            `;
          }).join("") || `<div class="empty-state compact">Tambahkan employee lain terlebih dahulu.</div>`}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="button" data-action="sppd-apply-copy-assignment">Copy Assignment</button>
      </div>
    </div>
  `;
}

function openSppdEmployeePickerModal(id = "draft", mode = "participants", rowId = "") {
  const item = id && id !== "draft" ? findSppdRequest(id) : null;
  if (mode === "pic") {
    const selectedPic = getSppdSelectedPic(item || makeEmptySppdRequest());
    appState.sppdEmployeePickerIds = selectedPic ? [selectedPic.id] : [];
  } else if (mode === "draftRowEmployee") {
    const employeeId = getSppdDraftRowEmployeeId(rowId);
    appState.sppdEmployeePickerIds = employeeId ? [employeeId] : [];
  } else {
    appState.sppdEmployeePickerIds = item
      ? item.employees.map((employee) => db.employees.find((source) => source.nik === employee.nik)?.id).filter(Boolean)
      : appState.sppdDraftEmployeeIds.map((draftRowId) => getSppdDraftRowEmployeeId(draftRowId));
  }
  appState.modal = { type: "sppdEmployeePicker", id, mode, rowId };
  renderModal();
}

function renderSppdEmployeePickerModal() {
  const id = appState.modal?.id || "draft";
  const mode = appState.modal?.mode || "participants";
  const isPicMode = mode === "pic";
  const isSingleEmployeeMode = isPicMode || mode === "draftRowEmployee";
  const item = id !== "draft" ? findSppdRequest(id) : null;
  const selectedNiks = new Set(item?.employees.map((employee) => employee.nik) || []);
  const selectedIds = new Set(appState.sppdEmployeePickerIds || []);
  return `
    <div class="modal sppd-employee-picker" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>${isPicMode ? "Pilih PIC / Requester" : mode === "draftRowEmployee" ? "Edit Employee" : "Add Employee"}</h3>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <div class="sppd-picker-tools">
          <label class="searchbox sppd-picker-search">
            <span data-icon="search"></span>
            <input type="search" placeholder="Search nama, NIK, position..." data-action="sppd-picker-search">
          </label>
          ${isSingleEmployeeMode ? "" : `<div class="sppd-picker-bulk-actions">
            <button class="btn primary sppd-picker-tool-button" type="button" data-action="sppd-picker-search-button">${icon("search")} Search</button>
            <button class="btn neutral sppd-picker-tool-button" type="button" data-action="sppd-picker-select-all">${icon("check")} Select All</button>
            <button class="btn neutral sppd-picker-tool-button" type="button" data-action="sppd-picker-unselect-all">${icon("x")} Unselect All</button>
          </div>`}
        </div>
        <div class="sppd-picker-list table-wrap">
          <table class="sppd-data-table sppd-picker-table">
            <thead>
              <tr>
                <th class="center"></th>
                <th>Nama</th>
                <th>NIK</th>
                <th>Posisi</th>
                <th>Divisi</th>
                <th class="center">Status</th>
              </tr>
            </thead>
            <tbody>
          ${db.employees.filter((employee) => employee.status === "Active").map((employee) => {
            const disabled = !item && false;
            const checked = selectedIds.has(employee.id) || selectedNiks.has(employee.nik);
            const searchText = `${employee.name} ${employee.nik} ${employee.position} ${employee.division} ${employee.status}`.toLowerCase();
            return `
              <tr class="sppd-picker-row" data-search-text="${escapeHtml(searchText)}" data-action="sppd-toggle-picker-row">
                <td class="center"><input type="${isSingleEmployeeMode ? "radio" : "checkbox"}" name="${isSingleEmployeeMode ? "sppdSingleEmployeePicker" : ""}" data-action="sppd-toggle-picker-employee" data-employee-id="${escapeHtml(employee.id)}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}></td>
                <td><strong>${escapeHtml(employee.name)}</strong></td>
                <td>${escapeHtml(employee.nik)}</td>
                <td>${escapeHtml(employee.position || "-")}</td>
                <td>${escapeHtml(employee.division || "-")}</td>
                <td class="center">${statusPill(employee.status)}</td>
              </tr>
            `;
          }).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="button" data-action="sppd-apply-employee-picker" data-id="${escapeHtml(id)}">${icon("check")} ${isPicMode ? "Pilih PIC" : mode === "draftRowEmployee" ? "Simpan Employee" : "Add Selected"}</button>
      </div>
    </div>
  `;
}

function renderSppdMasterSelect(name, type, selected = "", placeholder = "Pilih data") {
  const rows = db.sppdMaster.filter((item) => item.type === type && item.status === "Active");
  return `
    <select name="${escapeHtml(name)}">
      <option value="">${escapeHtml(placeholder)}</option>
      ${rows.map((item) => `<option value="${escapeHtml(item.name)}" ${item.name === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
    </select>
  `;
}

function renderSppdAgendaTypeSelect(name, selected = "") {
  const rows = db.sppdMaster.filter((item) => item.type === "Jenis Agenda" && item.status === "Active");
  const isOther = selected && !rows.some((item) => item.name === selected);
  return `
    <select name="${escapeHtml(name)}">
      <option value="">Pilih Agenda Type</option>
      ${rows.map((item) => `<option value="${escapeHtml(item.name)}" ${item.name === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
      <option value="Lainnya" ${isOther || selected === "Lainnya" ? "selected" : ""}>Lainnya</option>
    </select>
  `;
}

function renderSppdAreaSelect(name, selectedArea = "", selectedCluster = "") {
  const rows = db.sppdMaster.filter((item) => item.type === "Area / Cluster" && item.status === "Active");
  return `
    <select name="${escapeHtml(name)}">
      <option value="">Pilih Area / Cluster</option>
      ${rows.map((item) => {
        const value = `${item.name}::${item.value}`;
        const selected = item.name === selectedArea || item.value === selectedCluster || value === selectedArea;
        return `<option value="${escapeHtml(value)}" ${selected ? "selected" : ""}>${escapeHtml(item.name)} - ${escapeHtml(item.value)}</option>`;
      }).join("")}
    </select>
  `;
}

function renderSppdEmployeeSelect(name, selectedNik = "", placeholder = "Pilih Employee") {
  return `
    <select name="${escapeHtml(name)}">
      <option value="">${escapeHtml(placeholder)}</option>
      ${db.employees.filter((employee) => employee.status === "Active").map((employee) => `<option value="${escapeHtml(employee.id)}" ${employee.nik === selectedNik || employee.id === selectedNik ? "selected" : ""}>${escapeHtml(employee.name)} - ${escapeHtml(employee.position)} / ${escapeHtml(employee.division)}</option>`).join("")}
    </select>
  `;
}

function renderSppdLevelSelect(name, selected = "Staff") {
  const rows = db.sppdMaster.filter((item) => item.type === "Level" && item.status === "Active");
  return `
    <select name="${escapeHtml(name)}">
      ${rows.map((item) => `<option value="${escapeHtml(item.name)}" ${item.name === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
    </select>
  `;
}

function getSppdLevelAllowance(level, item = null) {
  if (item) {
    const type = item.region === "Luar Negeri" ? "Allowance LN" : "Allowance DN";
    const row = db.sppdMaster.find((master) => master.type === type && master.name === level);
    if (row) {
      const values = String(row.value).split("|").map((value) => Number(value || 0));
      if (type === "Allowance LN") return values[item.area === "Kluster 2" ? 1 : 0] || values[0] || 0;
      const areaIndex = item.area === "Area 3" ? 2 : item.area === "Area 2" ? 1 : 0;
      return values[areaIndex] || values[0] || 0;
    }
  }
  return 0;
}

function getSppdDurationRule(region) {
  const scope = region === "Luar Negeri" ? "International" : "Domestic";
  const row = db.sppdMaster.find((master) => master.type === "Durasi Rules" && String(master.name || "").startsWith(scope));
  return row?.value || "Sesuai undangan/pelatihan/kegiatan.";
}

function getSppdEffectiveDuration(item) {
  const baseDays = getSppdAssignmentBaseDays(item);
  if (!baseDays) return Number(item.duration || 1);
  return baseDays + getSppdTravelExtraDays(item);
}

function getSppdEmployeeEffectiveDuration(item, employee = {}) {
  const context = {
    ...item,
    region: employee.region || item.region,
    area: employee.area || item.area,
    cluster: employee.cluster || item.cluster,
    assignmentStartDate: employee.assignmentStartDate || item.assignmentStartDate || item.sppdDate,
    assignmentEndDate: employee.assignmentEndDate || item.assignmentEndDate || employee.assignmentStartDate || item.assignmentStartDate || item.sppdDate,
    assignmentStartTime: employee.assignmentStartTime || item.assignmentStartTime || "08:00",
    assignmentEndTime: employee.assignmentEndTime || item.assignmentEndTime || "18:00"
  };
  return getSppdEffectiveDuration(context) || Number(employee.duration || item.duration || 1);
}

function getSppdAssignmentBaseDays(item) {
  const startDate = item.assignmentStartDate || item.sppdDate;
  const endDate = item.assignmentEndDate || startDate;
  if (!startDate || !endDate) return 0;
  const start = new Date(`${startDate}T${item.assignmentStartTime || "08:00"}`);
  const end = new Date(`${endDate}T${item.assignmentEndTime || "18:00"}`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 0;
  const hours = Math.max((end - start) / 36e5, 1);
  return Math.max(1, Math.ceil(hours / 24));
}

function getSppdTravelExtraDays(item) {
  const scope = item.region === "Luar Negeri" ? "International" : "Domestic";
  const area = item.area || item.cluster || "";
  const rules = db.sppdMaster
    .filter((master) => master.type === "Durasi Rules" && master.status === "Active")
    .map((master) => {
      const [ruleScope = "", ruleArea = "All", additionalDay = "0"] = String(master.name || "").split("|").map((part) => part.trim());
      return { scope: ruleScope, area: ruleArea, additionalDay: Number(additionalDay || 0) };
    })
    .filter((rule) => rule.scope === scope)
    .filter((rule) => rule.area === "All" || rule.area === area || rule.area.split("/").map((part) => part.trim()).includes(area));
  const configuredExtra = rules.reduce((max, rule) => Math.max(max, rule.additionalDay), 0);
  if (configuredExtra) return configuredExtra;
  if (item.region === "Luar Negeri") return 2;
  const areaNeedsExtra = ["Area 2", "Area 3"].includes(item.area);
  const locationNeedsExtra = /pacitan|banyuwangi|sumenep/i.test(item.agendaLocation || "");
  return areaNeedsExtra || locationNeedsExtra ? 1 : 0;
}

function getSppdDurationCalculationNote(item) {
  const base = getSppdAssignmentBaseDays(item) || Number(item.duration || 1);
  const extra = getSppdTravelExtraDays(item);
  const total = base + extra;
  const rule = item.region === "Luar Negeri"
    ? "LN +2 hari PP"
    : extra
      ? "DN +1 hari area/lokasi khusus"
      : "DN sesuai jam penugasan";
  return `${base} hari efektif + ${extra} hari perjalanan = ${total} hari (${rule})`;
}

function calculateSppdLiveDuration(startDate, endDate, region = "", area = "", cluster = "") {
  const context = {
    region,
    area,
    cluster,
    assignmentStartDate: startDate,
    assignmentEndDate: endDate || startDate,
    assignmentStartTime: "08:00",
    assignmentEndTime: "18:00"
  };
  return getSppdEffectiveDuration(context) || calculateDateDuration(startDate, endDate);
}

function renderSppdEmployeeDrawer() {
  const [docId, employeeId] = String(appState.selectedId || "").split("::");
  const item = findSppdRequest(docId);
  const employee = item?.employees.find((row) => row.id === employeeId);
  if (!item || !employee) return renderNotFound("Employee");
  normalizeSppdRequest(item);
  const editable = appState.view === "employee";
  const stage = titleForSection(appState.section);

  return `
    <form class="drawer-form" id="sppdForm" data-sppd-region="${escapeHtml(employee.region || item.region || "")}" data-sppd-area="${escapeHtml(employee.area || item.area || "")}" data-sppd-cluster="${escapeHtml(employee.cluster || item.cluster || "")}" data-daily-rate="${escapeHtml(employee.dailyAllowance || 0)}">
      <div class="sppd-document-head">
        <div>
          <small>${escapeHtml(item.docNo)}</small>
          <h3>${escapeHtml(employee.name)}</h3>
          <p>${escapeHtml(`${employee.nik} - ${employee.position} / ${employee.division}`)}</p>
        </div>
        <div class="sppd-document-status">
          ${statusPill(employee.verificationStatus || employee.detailStatus || "Draft")}
        </div>
      </div>

      <div class="sppd-tab-body">
        ${renderSppdEmployeeDrawerDetail(item, employee, editable, stage)}
      </div>

      ${editable ? `<div class="drawer-actions"><button class="btn success" type="button" data-action="sppd-save-employee">${icon("save")} Save Employee</button></div>` : ""}
    </form>
  `;
}

function renderSppdEmployeeDrawerDetail(item, employee, editable, stage) {
  const duration = getSppdEmployeeEffectiveDuration(item, employee);
  const calculated = Number(employee.dailyAllowance || 0) * Number(duration || 0);
  const verified = employee.verifiedAllowance || calculated;
  const bankAccount = getSppdEmployeeBankAccount(employee);
  const showFinance = ["sppdVerification", "sppdApproval", "sppdPayment"].includes(appState.section) || item.status !== "Draft";

  return `
    <div class="sppd-drawer-section">
      <h3>Employee Information</h3>
      <div class="detail-grid">
        ${detailItem("NIK", employee.nik || "-")}
        ${detailItem("Position", employee.position || "-")}
        ${detailItem("Division", employee.division || "-")}
        ${detailItem("Level", employee.level || "-")}
      </div>
    </div>
    <div class="sppd-drawer-section">
      <h3>Assignment</h3>
      <div class="form-grid">
        ${field("Destination", `<input name="employeeDestination" value="${escapeHtml(employee.destination || "")}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Start Date", `<input type="date" name="employeeStartDate" value="${escapeHtml(employee.assignmentStartDate || "")}" ${editable ? "" : "disabled"}>`, false)}
        ${field("End Date", `<input type="date" name="employeeEndDate" value="${escapeHtml(employee.assignmentEndDate || "")}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Duration", `<input name="employeeDuration" data-role="employee-duration" value="${escapeHtml(duration)} hari" disabled>`, false)}
      </div>
    </div>
    <div class="sppd-drawer-section">
      <div class="sppd-section-head">
        <h3>Agenda</h3>
      </div>
      <div class="table-wrap">
        <table class="sppd-data-table">
          <thead><tr><th>Agenda</th><th>Type</th><th>Date</th><th>Time</th><th>Location</th></tr></thead>
          <tbody>
            ${employee.agendas.map((agenda) => `<tr><td><strong>${escapeHtml(agenda.name)}</strong><br><small>${escapeHtml(agenda.remark || "-")}</small></td><td>${escapeHtml(agenda.type || "-")}</td><td>${escapeHtml(agenda.date || "-")}</td><td>${escapeHtml(`${agenda.startTime || "-"} - ${agenda.endTime || "-"}`)}</td><td>${escapeHtml(agenda.location || "-")}</td></tr>`).join("") || emptyRow(5, "Belum ada agenda.")}
          </tbody>
        </table>
      </div>
    </div>
    ${showFinance ? `
      <div class="sppd-drawer-section">
        <h3>Allowance Verification</h3>
        ${editable ? `
          <div class="form-grid">
            ${field("Master Rate", `<input value="${escapeHtml(`${formatRupiah(employee.dailyAllowance || 0)} / day`)}" disabled>`, false)}
            ${field("Effective Days", `<input data-role="employee-effective-days" value="${escapeHtml(`${duration} hari`)}" disabled>`, false)}
            ${field("Calculated", `<input data-role="employee-calculated-allowance" value="${escapeHtml(formatRupiah(calculated))}" disabled>`, false)}
            ${field("Verified Allowance", `<input type="number" min="0" name="employeeVerifiedAllowance" data-role="employee-verified-allowance" value="${escapeHtml(verified)}">`, false)}
            ${field("Verified Bank Account", `<input name="employeeVerifiedBankAccount" value="${escapeHtml(bankAccount)}" placeholder="Contoh: BCA ****1234">`, false)}
            ${field("Verification Remark", `<textarea name="employeeVerificationRemark">${escapeHtml(employee.verificationRemark || "")}</textarea>`, false)}
          </div>
        ` : `
          <div class="detail-grid">
            ${detailItem("Master Rate", `${formatRupiah(employee.dailyAllowance || 0)} / day`)}
            ${detailItem("Effective Days", `${duration} hari`)}
            ${detailItem("Calculated", formatRupiah(calculated))}
            ${detailItem("Verified", formatRupiah(verified))}
            ${detailItem("Verified Bank Account", bankAccount)}
          </div>
        `}
      </div>
    ` : ""}
    ${appState.section === "sppdPayment" || item.paymentStatus === "Paid" ? `
      <div class="sppd-drawer-section">
        <h3>Payment Information</h3>
        <div class="detail-grid">
          ${detailItem("Bank Account", bankAccount)}
          ${detailItem("Amount", formatRupiah(verified))}
          ${detailItem("Payment Status", employee.paymentStatus || "Pending")}
          ${detailItem("Payment Date", employee.paymentDate || item.transferDate || "-")}
        </div>
      </div>
    ` : ""}
  `;
}

function renderSppdAddEmployeeDrawer() {
  const item = findSppdRequest(appState.selectedId);
  if (!item) return renderNotFound("SPPD");
  const existingNiks = item.employees.map((employee) => employee.nik);
  const rows = db.employees.filter((employee) => !existingNiks.includes(employee.nik));

  return `
    <div class="drawer-form">
      <div class="sppd-document-head">
        <div>
          <small>${escapeHtml(item.docNo)}</small>
          <h3>Add Employee</h3>
          <p>Pilih karyawan yang akan ditambahkan ke dokumen SPPD.</p>
        </div>
      </div>
      <div class="sppd-add-employee-list">
        ${rows.map((employee) => `
          <button type="button" data-action="sppd-pick-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">
            <span>
              <strong>${escapeHtml(employee.name)}</strong>
              <small>${escapeHtml(`${employee.nik} - ${employee.position} / ${employee.division}`)}</small>
            </span>
            ${statusPill(employee.status)}
          </button>
        `).join("") || `<div class="empty-state">Semua employee sudah masuk dokumen ini.</div>`}
      </div>
    </div>
  `;
}

function renderSppdBottomAction(stage, item, editable) {
  if (item.paymentStatus === "Paid") return "";
  return renderSppdDrawerAction(stage, item, editable);
}

function renderSppdSupportingSection(item, editable) {
  const isPaymentStage = item.status === "Approved" || item.paymentStatus === "Paid";

  return `
    <div class="sppd-drawer-section">
      <h3>${isPaymentStage ? "Allowance Payment" : "Attachment & Remark"}</h3>
      ${isPaymentStage ? `
        <div class="detail-grid">
          ${detailItem("Total Allowance", formatRupiah(getSppdTotal(item)))}
          ${detailItem("Transfer Date", item.transferDate || "-")}
          ${detailItem("Transfer Proof", item.transferProof || "-")}
        </div>
      ` : ""}
      <div class="form-grid">
        ${field("Attachment", `<input name="attachment" value="${escapeHtml(item.attachment)}" ${editable ? "" : "disabled"} placeholder="undangan.pdf / surat-tugas.pdf">`, false)}
        ${field("Remark", `<textarea name="remark" ${editable ? "" : "disabled"}>${escapeHtml(item.remark)}</textarea>`, false)}
      </div>
    </div>
  `;
}

function renderSppdActiveTabContent(item, editable, stage) {
  const active = getSppdEmployeeTab(item);
  if (active === "Verifikasi") return renderSppdVerificationTab(item, editable, stage);
  if (active === "Approval") return renderSppdApprovalTab(item);
  if (active === "Payment") return renderSppdPaymentTab(item, editable);
  if (active === "Completed") return renderSppdCompletedTab(item);
  if (active === "Other Allowance") return renderSppdOtherAllowanceTab(item);
  return renderSppdRequestTab(item, editable, stage);
}

function renderSppdRequestTab(item, editable, stage) {
  return `
    <div class="sppd-tab-body">
      <div class="sppd-stage-content">
        <h4>Request Document</h4>
        <div>
          <span><small>Pemohon/PIC</small><strong>${escapeHtml(item.requesterName)} - ${escapeHtml(item.requesterDivision)}</strong></span>
          <span><small>Agenda</small><strong>${escapeHtml(item.agendaName)} / ${escapeHtml(item.agendaDate)}</strong></span>
          <span><small>Peserta</small><strong>${escapeHtml(item.employees.length)} employee</strong></span>
        </div>
      </div>
      <div class="sppd-stage-grid">
        ${sppdMetaTile("Lokasi / Jam", `${item.agendaLocation} / ${item.agendaTime || "-"}`)}
        ${sppdMetaTile("Jenis / Region", `${item.agendaType || "-"} / ${item.region || "-"}`)}
        ${sppdMetaTile("Tanggal SPPD", item.sppdDate || "-")}
        ${sppdMetaTile("Attachment", item.attachment || "-")}
      </div>
    </div>
  `;
}

function renderSppdVerificationTab(item, editable, stage) {
  return `
    <div class="sppd-tab-body">
      <div class="sppd-stage-content">
        <h4>Verifikasi Request</h4>
        <div>
          <span><small>Fokus Verifikasi</small><strong>Durasi, remark, peserta, area, level, dan total uang harian</strong></span>
          <span><small>Dokumen Sumber</small><strong>${escapeHtml(item.docNo)}</strong></span>
          <span><small>Status</small><strong>${escapeHtml(item.status)}</strong></span>
        </div>
      </div>
      <div class="form-grid">
        ${field("Tanggal Agenda", `<input type="date" name="agendaDate" value="${escapeHtml(item.agendaDate)}">`, false)}
        ${field("Tanggal SPPD", `<input type="date" name="sppdDate" value="${escapeHtml(item.sppdDate)}">`, false)}
        ${field("Mulai Penugasan", `<input type="date" name="assignmentStartDate" value="${escapeHtml(item.assignmentStartDate || item.sppdDate || "")}">`, false)}
        ${field("Jam Mulai", `<input type="time" name="assignmentStartTime" value="${escapeHtml(item.assignmentStartTime || item.agendaTime || "08:00")}">`, false)}
        ${field("Selesai Penugasan", `<input type="date" name="assignmentEndDate" value="${escapeHtml(item.assignmentEndDate || item.sppdDate || "")}">`, false)}
        ${field("Jam Selesai", `<input type="time" name="assignmentEndTime" value="${escapeHtml(item.assignmentEndTime || "18:00")}">`, false)}
        ${field("Durasi Sistem", `<input name="duration" value="${escapeHtml(getSppdEffectiveDuration(item))}" readonly>`, false)}
        ${field("Override Durasi", `<input type="number" min="1" name="durationOverride" value="" placeholder="${escapeHtml(item.duration)}">`, false)}
        ${field("Region", renderSppdMasterSelect("region", "Region", item.region, "Pilih Region"), false)}
        ${field("Area / Cluster", renderSppdAreaSelect("area", item.area, item.cluster), false)}
        ${field("Rule Durasi", `<input value="${escapeHtml(getSppdDurationCalculationNote(item))}" readonly>`, false)}
        ${field("Remark Verifikasi", `<textarea name="remark">${escapeHtml(item.remark)}</textarea>`, false)}
      </div>
      ${renderSppdVerificationAllowanceTable(item)}
    </div>
  `;
}

function renderSppdVerificationAllowanceTable(item) {
  return `
    <div class="sppd-drawer-section compact">
      <h3>Uang Saku Employee Verification</h3>
      <div class="table-wrap">
        <table class="sppd-data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jabatan / Divisi</th>
              <th>Level</th>
              <th>Durasi</th>
              <th>Uang Saku Harian</th>
              <th class="money-col">Total</th>
            </tr>
          </thead>
          <tbody>
            ${item.employees.map((employee) => {
              const allowance = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
              return `
                <tr>
                  <td><strong>${escapeHtml(employee.name)}</strong></td>
                  <td>${escapeHtml(employee.position)}<br><small>${escapeHtml(employee.division)}</small></td>
                  <td>${renderSppdLevelSelect(`employeeLevel_${employee.id}`, employee.level)}</td>
                  <td>${escapeHtml(item.duration)} hari</td>
                  <td><input name="dailyAllowance_${escapeHtml(employee.id)}" value="${escapeHtml(allowance)}"></td>
                  <td class="money-col"><strong>${formatRupiah(allowance * Number(item.duration || 0))}</strong></td>
                </tr>
              `;
            }).join("") || emptyRow(6, "Belum ada employee.")}
            <tr class="sppd-total-row">
              <td colspan="5"><strong>Total Keseluruhan Uang Saku</strong></td>
              <td class="money-col"><strong>${formatRupiah(getSppdTotal(item))}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSppdApprovalTab(item) {
  return `
    <div class="sppd-tab-body">
      ${renderSppdApprovalTrackTable(item)}
    </div>
  `;
}

function renderSppdApprovalCard(label, approver, status) {
  return `
    <div class="sppd-approval-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(approver)}</strong>
      ${statusPill(status)}
    </div>
  `;
}

function renderSppdPaymentTab(item, editable) {
  return `
    <div class="sppd-tab-body">
      <div class="detail-grid">
        ${detailItem("Total Allowance", formatRupiah(getSppdTotal(item)))}
        ${detailItem("Transfer Date", item.transferDate || "-")}
        ${detailItem("Transfer Proof", item.transferProof || "-")}
      </div>
      <div class="form-grid">
        ${field("Tanggal Transfer", `<input type="date" name="transferDate" value="${escapeHtml(item.transferDate)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Bukti Transfer", `<input type="file" name="transferProofFile" accept=".pdf,.png,.jpg,.jpeg" ${editable ? "" : "disabled"}>`, false)}
        ${item.transferProof ? `<div class="form-hint">Current: ${escapeHtml(item.transferProof)}</div>` : ""}
      </div>
    </div>
  `;
}

function renderSppdCompletedTab(item) {
  return `
    <div class="sppd-tab-body">
      <div class="sppd-stage-content">
        <h4>Completed</h4>
        <div>
          <span><small>Status Dokumen</small><strong>${item.paymentStatus === "Paid" ? "Completed" : "Belum completed"}</strong></span>
          <span><small>Total Allowance</small><strong>${formatRupiah(getSppdTotal(item))}</strong></span>
          <span><small>Bukti Transfer</small><strong>${escapeHtml(item.transferProof || "-")}</strong></span>
        </div>
      </div>
      ${renderSppdOtherAllowanceTab(item)}
    </div>
  `;
}

function renderSppdOtherAllowanceTab(item) {
  const rows = db.sppdOtherAllowances.filter((row) => row.sppdId === item.id);
  return `
    <div class="sppd-tab-body">
      <div class="sppd-section-head">
        <h3>Other Allowance</h3>
        <button class="btn neutral" type="button" data-action="sppd-other-new">${icon("plus")} Add Allowance</button>
      </div>
      ${renderSppdOtherAllowanceTable(rows)}
    </div>
  `;
}

function renderSppdOtherAllowanceTabView(item) {
  const rows = db.sppdOtherAllowances.filter((row) => row.sppdId === item.id);
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header">
        <div><h2>Other Allowance</h2><small class="panel-kicker">Biaya tambahan perjalanan di luar allowance utama.</small></div>
        <button class="btn primary" type="button" data-action="sppd-other-new">${icon("plus")} Add Allowance</button>
      </div>
      <div class="panel-body sppd-stage-view">
        <div class="sppd-review-section">
          <h4>Allowance List</h4>
          ${renderSppdOtherAllowanceTable(rows)}
        </div>
      </div>
    </div>
  `;
}

function renderSppdOtherAllowanceTable(rows) {
  return `
    <div class="table-wrap">
      <table class="sppd-data-table sppd-other-allowance-table">
        <thead><tr><th>Type</th><th>Requester</th><th class="money-col">Amount</th><th>Status</th><th>Transfer Date</th><th>Proof</th></tr></thead>
        <tbody>
          ${rows.map((row) => `<tr><td><strong>${escapeHtml(row.type)}</strong></td><td>${escapeHtml(row.requesterName)}</td><td class="money-col">${formatRupiah(row.amount)}</td><td class="center">${statusPill(row.status)}</td><td>${escapeHtml(row.transferDate || "-")}</td><td>${escapeHtml(row.proof || "-")}</td></tr>`).join("") || emptyRow(6, "Belum ada other allowance.")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSppdTravelEmployeeSection(item, editable, stage) {
  return `
    <div class="sppd-drawer-section">
      <div class="sppd-section-head">
        <h3>Peserta Perjalanan</h3>
      </div>
      <div class="form-grid sppd-travel-grid">
        ${field("Jenis Agenda", `<input name="agendaType" value="${escapeHtml(item.agendaType)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Region", `<input name="region" value="${escapeHtml(item.region)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Area", `<input name="area" value="${escapeHtml(item.area)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Cluster", `<input name="cluster" value="${escapeHtml(item.cluster)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Tanggal SPPD", `<input type="date" name="sppdDate" value="${escapeHtml(item.sppdDate)}" ${editable ? "" : "disabled"} required>`, true)}
        ${field("Durasi", `<input type="number" min="1" name="duration" value="${escapeHtml(item.duration)}" ${editable ? "" : "disabled"} required>`, true)}
      </div>
      ${renderSppdEmployeeWorkspace(item, editable, stage)}
    </div>
  `;
}

function renderSppdAttachmentRemark(item, editable) {
  return `
    <div class="sppd-drawer-section">
      <h3>Attachment & Remark</h3>
      <div class="form-grid">
        ${field("Attachment", `<input type="file" name="attachmentFile" accept=".pdf,.png,.jpg,.jpeg" ${editable ? "" : "disabled"}>`, false)}
        ${item.attachment ? `<div class="form-hint">Current: ${escapeHtml(item.attachment)}</div>` : ""}
        ${field("Remark", `<textarea name="remark" ${editable ? "" : "disabled"}>${escapeHtml(item.remark)}</textarea>`, false)}
      </div>
    </div>
  `;
}

function renderSppdTransactionTabs() {
  const tabs = [
    ["all", "All"],
    ["draft", "Draft"],
    ["submitted", "Submitted"],
    ["verification", "Verification"],
    ["approval", "Approval"],
    ["payment", "Payment"],
    ["completed", "Completed"]
  ];

  return `
    <div class="sppd-transaction-tabs">
      ${tabs.map(([key, label]) => `
        <button class="${appState.sppdTab === key ? "active" : ""}" type="button" data-action="sppd-tab" data-tab="${escapeHtml(key)}">
          ${escapeHtml(label)}
          <span>${escapeHtml(getSppdTabCount(key))}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function getSppdTabbedRows(rows, section) {
  if (!["sppdDashboard", "sppdRequestList"].includes(section)) return rows;
  const tab = appState.sppdTab || "all";
  if (tab === "all") return rows;
  if (tab === "draft") return rows.filter((item) => item.status === "Draft");
  if (tab === "submitted") return rows.filter((item) => item.status === "Submitted");
  if (tab === "verification") return rows.filter((item) => item.status === "In Verification");
  if (tab === "approval") return rows.filter((item) => item.status === "Verified");
  if (tab === "payment") return rows.filter((item) => item.status === "Approved" && item.paymentStatus !== "Paid");
  if (tab === "completed") return rows.filter((item) => item.paymentStatus === "Paid");
  return rows;
}

function getSppdTabCount(tab) {
  return db.sppdRequests.filter((item) => {
    if (tab === "all") return true;
    if (tab === "draft") return item.status === "Draft";
    if (tab === "submitted") return item.status === "Submitted";
    if (tab === "verification") return item.status === "In Verification";
    if (tab === "approval") return item.status === "Verified";
    if (tab === "payment") return item.status === "Approved" && item.paymentStatus !== "Paid";
    if (tab === "completed") return item.paymentStatus === "Paid";
    return false;
  }).length;
}

function renderSppdEmployeeWorkspace(item, editable, stage) {
  const focusedId = appState.sppdEmployeeFocus[item.id] || item.employees[0]?.id;
  const focused = item.employees.find((employee) => employee.id === focusedId) || item.employees[0];
  if (!focused) return `<div class="empty-state">Belum ada peserta perjalanan.</div>`;

  return `
    <div class="sppd-employee-workspace">
      <div class="sppd-employee-list">
        ${item.employees.map((employee, index) => `
          <button class="${employee.id === focused.id ? "active" : ""}" type="button" data-action="sppd-focus-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">
            <b>${escapeHtml(index + 1)}</b>
            <span>
              <strong>${escapeHtml(employee.name)}</strong>
              <small>${escapeHtml(`${employee.position} / ${employee.division}`)}</small>
            </span>
            <em>${formatRupiah(Number(employee.dailyAllowance || 0) * Number(item.duration || 0))}</em>
          </button>
        `).join("")}
      </div>
      ${renderSppdEmployeeCard(item, focused, editable, stage)}
    </div>
  `;
}

function renderSppdEmployeeCard(item, employee, editable, stage) {
  return `
    <div class="sppd-employee-card">
      <div class="sppd-employee-head">
        <div>
          <strong>${escapeHtml(employee.name)}</strong>
          <small>${escapeHtml(`${employee.nik} - ${employee.position} / ${employee.division}`)}</small>
        </div>
        <div class="sppd-document-status">
          ${statusPill(employee.level)}
          ${statusPill(employee.assignmentLetter)}
        </div>
      </div>
      <div class="sppd-employee-summary">
        <div>
          <span>Allowance / Hari</span>
          <strong>${formatRupiah(employee.dailyAllowance)}</strong>
        </div>
        <div>
          <span>Durasi</span>
          <strong>${escapeHtml(item.duration)} hari</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>${formatRupiah(Number(employee.dailyAllowance || 0) * Number(item.duration || 0))}</strong>
        </div>
      </div>
      <div class="sppd-employee-meta">
        ${sppdMetaTile("Jabatan", employee.position)}
        ${sppdMetaTile("Divisi", employee.division)}
        ${sppdMetaTile("Level", employee.level)}
        ${sppdMetaTile("Tanggal SPPD", item.sppdDate)}
      </div>
      <div class="sppd-letter-actions">
        <button class="action-icon action-view" type="button" title="Preview Surat Tugas" aria-label="Preview Surat Tugas" data-action="sppd-letter-preview" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("eye")}</button>
        <button class="action-icon action-edit" type="button" title="Generate Surat Tugas" aria-label="Generate Surat Tugas" data-action="sppd-letter-generate" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("file-text")}</button>
        <button class="action-icon action-view" type="button" title="Download Surat Tugas" aria-label="Download Surat Tugas" data-action="sppd-letter-download" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("download")}</button>
      </div>
    </div>
  `;
}

function renderSppdStageContent(item, employee) {
  const active = getSppdEmployeeTab(item);
  const total = formatRupiah(Number(employee.dailyAllowance || 0) * Number(item.duration || 0));
  const content = {
    Request: [
      ["Pemohon/PIC", `${item.requesterName} - ${item.requesterDivision}`],
      ["Agenda", `${item.agendaName}, ${item.agendaDate} ${item.agendaTime}`],
      ["Peserta", `${employee.name} / ${employee.position}`]
    ],
    Verifikasi: [
      ["Durasi", `${item.duration} hari`],
      ["Kesesuaian", "Agenda, area, level, dan uang harian dapat direview"],
      ["Remark", item.remark || "-"]
    ],
    Approval: [
      ["Approval 1", "Kepala Divisi terkait"],
      ["Approval 2", "Direksi terkait"],
      ["Status", item.status === "Verified" ? "Menunggu approval" : item.status]
    ],
    Payment: [
      ["Total Allowance", total],
      ["Tanggal Transfer", item.transferDate || "-"],
      ["Bukti Transfer", item.transferProof || "Belum upload"]
    ],
    Completed: [
      ["Status", item.paymentStatus === "Paid" ? "Completed" : "Belum completed"],
      ["Surat Tugas", employee.assignmentLetter],
      ["Total Dibayarkan", total]
    ],
    "Other Allowance": [
      ["Transport / Expense", "Dapat dibuat paralel setelah approved"],
      ["Multi Request", "Didukung berdasarkan dokumen SPPD terkait"],
      ["Status", "Input dan transfer oleh PIC terkait"]
    ]
  }[active] || [];

  return `
    <div class="sppd-stage-content">
      <h4>${escapeHtml(active)}</h4>
      <div>
        ${content.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <strong>${escapeHtml(value)}</strong>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function sppdMetaTile(label, value) {
  return `
    <div class="sppd-meta-tile">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderSppdEmployeeTabs(item) {
  const active = getSppdEmployeeTab(item);
  const tabs = ["Request", "Verifikasi", "Approval", "Payment", "Completed", "Other Allowance"];

  return `
    <div class="sppd-detail-tabs">
      ${tabs.map((tab) => `
        <button class="${tab === active ? "active" : ""}" type="button" data-action="sppd-detail-tab" data-id="${escapeHtml(item.id)}" data-tab="${escapeHtml(tab)}">
          ${escapeHtml(tab)}
        </button>
      `).join("")}
    </div>
  `;
}

function getSppdEmployeeTab(item) {
  if (item.paymentStatus === "Paid") return "Completed";
  if (item.status === "Approved") return "Payment";
  if (item.status === "Verified") return "Approval";
  if (item.status === "In Verification") return "Verifikasi";
  return "Request";
}

function renderSppdEmployeeStepper(item) {
  const steps = ["Request", "Verifikasi", "Approval", "Payment", "Completed"];
  const activeIndex = getSppdStepIndex(item);

  return `
    <div class="sppd-stepper">
      ${steps.map((step, index) => `
        <div class="sppd-step ${index < activeIndex ? "done" : ""} ${index === activeIndex ? "active" : ""}">
          <span>${index < activeIndex ? icon("check") : escapeHtml(index + 1)}</span>
          <strong>${escapeHtml(step)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderSppdDrawerStepper(item) {
  const steps = ["Request", "Verifikasi", "Approval", "Payment", "Completed"];
  const activeIndex = getSppdStepIndex(item);

  return `
    <div class="sppd-stepper">
      ${steps.map((step, index) => `
        <div class="sppd-step ${index < activeIndex ? "done" : ""} ${index === activeIndex ? "active" : ""}">
          <span>${index < activeIndex ? icon("check") : escapeHtml(index + 1)}</span>
          <strong>${escapeHtml(step)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function getSppdStepIndex(item) {
  if (item.paymentStatus === "Paid") return 4;
  if (item.status === "Approved") return 3;
  if (item.status === "Verified") return 2;
  if (item.status === "In Verification") return 1;
  if (item.status === "Submitted") return 0;
  return 0;
}

function renderSppdDrawerAction(stage, item, editable) {
  if (["sppdDashboard", "sppdRequestList", "sppdCompletedList"].includes(appState.section)) {
    if (item.status === "Draft") {
      if (appState.view === "document") {
        return `
          <div class="drawer-actions">
            <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Submitted">Submit Request</button>
          </div>
        `;
      }
      return `
        <div class="drawer-actions">
          <button class="btn neutral" type="submit" data-action="save-sppd" data-status="Draft">Save Draft</button>
          <button class="btn success" type="submit" data-action="save-sppd" data-status="Submitted">Submit</button>
        </div>
      `;
    }
    if (item.status === "Submitted") {
      return `
        <div class="drawer-actions">
          <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="In Verification">Start Verification</button>
        </div>
      `;
    }
    if (item.status === "In Verification") {
      return `
        <div class="drawer-actions">
          <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Verified">Submit Verifikasi</button>
        </div>
      `;
    }
    if (item.status === "Verified") {
      return `
        <div class="drawer-actions">
          <button class="btn neutral" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Submitted">Revise</button>
          <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Approved">Approve</button>
        </div>
      `;
    }
    if (item.status === "Approved" && item.paymentStatus !== "Paid") {
      return `
        <div class="drawer-actions">
          <button class="btn success" type="button" data-action="sppd-paid" data-id="${escapeHtml(item.id)}">Confirm All Paid</button>
        </div>
      `;
    }
    return `<div class="process-modal-note">Dokumen SPPD sudah completed.</div>`;
  }

  if (appState.section === "sppdRequest" && editable) {
    return `
      <div class="drawer-actions">
        <button class="btn neutral" type="submit" data-action="save-sppd" data-status="Draft">Save Draft</button>
        <button class="btn success" type="submit" data-action="save-sppd" data-status="Submitted">Submit</button>
      </div>
    `;
  }

  if (appState.section === "sppdVerification") {
    return `
      <div class="drawer-actions">
        <button class="btn neutral" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Submitted">Return</button>
        <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Verified">Submit Verifikasi</button>
      </div>
    `;
  }

  if (appState.section === "sppdApproval") {
    return `
      <div class="drawer-actions">
        <button class="btn neutral" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Submitted">Revise</button>
        <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Approved">Approve</button>
      </div>
    `;
  }

  if (appState.section === "sppdPayment") {
    return `
      <div class="drawer-actions">
        <button class="btn success" type="button" data-action="sppd-paid" data-id="${escapeHtml(item.id)}">Confirm All Paid</button>
      </div>
    `;
  }

  return `<div class="process-modal-note">${escapeHtml(stage)} menggunakan dokumen SPPD yang sama dari proses request.</div>`;
}

function makeEmptySppdRequest() {
  const requester = getCurrentEmployee();
  return {
    id: "",
    docNo: "Auto",
    requesterEmployeeId: requester?.id || "",
    requesterName: requester?.name || "",
    requesterDivision: requester?.division || "",
    requesterPosition: requester?.position || "",
    agendaName: "",
    agendaDate: "",
    agendaTime: "",
    agendaLocation: "",
    agendaType: "",
    region: "",
    area: "",
    cluster: "",
    sppdDate: todayIso(),
    assignmentStartDate: "",
    assignmentEndDate: "",
    duration: 1,
    remark: "",
    attachment: "",
    status: "Draft",
    paymentStatus: "Unpaid",
    transferDate: "",
    transferProof: "",
    employees: []
  };
}

function findSppdRequest(id) {
  return db.sppdRequests.find((item) => item.id === id);
}

function saveSppdRequest(status) {
  const form = document.getElementById("sppdForm");
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const attachmentFile = form.querySelector('[name="attachmentFile"]')?.files?.[0];
  const isAdd = appState.view === "add" && !appState.selectedId;
  const item = isAdd ? getSppdCreateRequestItem() : findSppdRequest(appState.selectedId);
  if (!item) return;
  if (status === "Submitted" && !validateSppdCreateStep(1)) {
    appState.sppdCreateStep = 1;
    render();
    return;
  }
  if (status === "Submitted") {
    const employeeRowIds = isAdd ? appState.sppdDraftEmployeeIds : (item.employees || []).map((employee) => employee.id);
    const invalidEmployee = employeeRowIds.find((employeeId) => {
      const detail = appState.sppdDraftEmployeeDetails[employeeId] || {};
      return !hasCompleteSppdDraftEmployeeDetail(detail);
    });
    if (!employeeRowIds.length || invalidEmployee) {
      appState.sppdCreateStep = 2;
      showToast(!employeeRowIds.length ? "Tambahkan employee terlebih dahulu." : "Lengkapi assignment dan agenda employee sebelum submit.");
      render();
      return;
    }
  }
  const [area, cluster] = String(data.area || "").split("::");
  const requester = db.employees.find((employee) => employee.id === data.requesterEmployeeId || employee.nik === data.requesterEmployeeId);

  Object.assign(item, {
    requesterEmployeeId: requester?.id || data.requesterEmployeeId || item.requesterEmployeeId || "",
    requesterName: data.requesterName || requester?.name || "",
    requesterDivision: data.requesterDivision || requester?.division || "",
    requesterPosition: requester?.position || item.requesterPosition || "",
    agendaName: data.agendaName || data.agendaItemName || "",
    agendaDate: data.agendaDate || "",
    agendaTime: data.agendaTime || "",
    agendaEndTime: data.agendaEndTime || item.agendaEndTime || "",
    agendaLocation: data.agendaLocation || "",
    agendaType: data.agendaType || item.agendaType || "",
    region: data.region || item.region || "",
    area: area || item.area || "",
    cluster: cluster || item.cluster || "",
    sppdDate: data.sppdDate || item.sppdDate || todayIso(),
    assignmentStartDate: data.assignmentStartDate || data.sppdDate || "",
    assignmentStartTime: data.assignmentStartTime || data.agendaTime || "08:00",
    assignmentEndDate: data.assignmentEndDate || data.assignmentStartDate || data.sppdDate || "",
    assignmentEndTime: data.assignmentEndTime || "18:00",
    duration: Number(data.durationOverride || data.duration || item.duration || 1),
    attachment: attachmentFile?.name || item.attachment || "",
    remark: data.remark || item.remark || "",
    status
  });

  if (isAdd) {
    item.id = `SPPD-2026-${String(db.sppdRequests.length + 1).padStart(3, "0")}`;
    item.docNo = `${String(db.sppdRequests.length + 1).padStart(3, "0")}/SPPD/08/2026`;
    item.employees = [];
    db.sppdRequests.unshift(item);
  }

  item.duration = Number(data.durationOverride || getSppdEffectiveDuration(item) || item.duration || 1);
  if (isAdd) {
    item.employees = [];
    appState.sppdDraftEmployeeIds.forEach((rowId) => {
      const detail = getSppdDraftEmployeeDetail(rowId);
      const employeeId = detail.employeeId || getSppdDraftRowEmployeeId(rowId);
      appendSppdEmployeeFromReference(item, employeeId, detail.level || data.employeeLevel || "Pelaksana", detail);
    });
  } else if (!item.employees.length && data.employeeId) {
    upsertSppdPrimaryEmployee(item, data.employeeId, data.employeeLevel);
  }
  item.employees.forEach((employee) => {
    const draftDetail = appState.sppdDraftEmployeeDetails[employee.id] || {};
    employee.destination = employee.destination || draftDetail.destination || item.agendaLocation;
    employee.assignmentStartDate = employee.assignmentStartDate || draftDetail.assignmentStartDate || item.assignmentStartDate;
    employee.assignmentEndDate = employee.assignmentEndDate || draftDetail.assignmentEndDate || item.assignmentEndDate;
    employee.duration = employee.duration || draftDetail.duration || item.duration;
    employee.agendas = employee.agendas?.length ? employee.agendas : (draftDetail.agendas?.length ? draftDetail.agendas : [{
      id: `${employee.id}-AGENDA-1`,
      name: data.agendaItemName || item.agendaName,
      type: item.agendaType,
      date: item.agendaDate,
      startTime: item.agendaTime || "09:00",
      endTime: item.agendaEndTime || "17:00",
      location: item.agendaLocation,
      remark: item.remark
    }]);
  });
  const firstTravelEmployee = item.employees[0];
  if (firstTravelEmployee) {
    item.agendaLocation = item.agendaLocation || firstTravelEmployee.destination || "";
    item.assignmentStartDate = item.assignmentStartDate || firstTravelEmployee.assignmentStartDate || "";
    item.assignmentEndDate = item.assignmentEndDate || firstTravelEmployee.assignmentEndDate || "";
    item.duration = item.duration || firstTravelEmployee.duration || 1;
    const firstAgenda = firstTravelEmployee.agendas?.[0];
    if (firstAgenda) {
      item.agendaName = item.agendaName || firstAgenda.name || "";
      item.agendaDate = item.agendaDate || firstAgenda.date || "";
      item.agendaTime = item.agendaTime || firstAgenda.startTime || "";
      item.agendaEndTime = item.agendaEndTime || firstAgenda.endTime || "";
      item.agendaType = item.agendaType || firstAgenda.type || "";
    }
  }
  appState.sppdDraftEmployeeIds = [];
  appState.sppdDraftEmployeeDetails = {};
  appState.sppdDraftPicEmployeeId = "";
  appState.sppdDraftRequest = null;
  appState.sppdCreateStep = 1;

  showToast(status === "Submitted" ? "SPPD submitted." : "SPPD draft saved.");
  setSection("sppdRequestList", "dashboard");
}

function renderSppdDraftEmployeeModal() {
  const employeeId = appState.modal?.employeeId;
  const readOnly = appState.modal?.mode === "view";
  const employee = getSppdDraftRowEmployee(employeeId);
  if (!employee) return "";
  const detail = getSppdDraftEmployeeDetail(employeeId);
  const agendaRows = detail.agendas || [];
  const selectedLevel = detail.level || "Pelaksana";
  const selectedRegion = detail.region || "";
  return `
    <form class="modal sppd-employee-assignment-modal ${readOnly ? "is-readonly" : ""}" id="sppdDraftEmployeeForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>${readOnly ? "View Employee Assignment" : "Edit Employee Assignment"}</h3>
          <small class="modal-kicker">${escapeHtml(employee.name)} - ${escapeHtml(employee.position)} / ${escapeHtml(employee.division)}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        ${readOnly ? "" : `
          <div class="sppd-modal-section">
            <div class="sppd-reference-picker">
              <div>
                <strong>${escapeHtml(employee.name)}</strong>
                <small>${escapeHtml(`${employee.nik} - ${employee.position} / ${employee.division}`)}</small>
              </div>
              <button class="btn neutral" type="button" data-action="sppd-edit-draft-row-employee" data-employee-id="${escapeHtml(employeeId)}">${icon("search")} Edit Employee</button>
            </div>
          </div>
        `}
        <div class="sppd-modal-section">
          <h4>Assignment</h4>
          <div class="form-grid sppd-assignment-grid">
            ${field("Destination", `<input name="destination" value="${escapeHtml(detail.destination || "")}" placeholder="Contoh: Kantor Jakarta / Hotel Bandung / Venue Training" required>`, true)}
            ${field("Region", renderSppdMasterSelect("region", "Region", selectedRegion, "Pilih Region"), true)}
            ${field("Area / Cluster", renderSppdAreaSelect("areaCluster", detail.area || "", detail.cluster || ""), true)}
            ${field("Level", renderSppdLevelSelect("level", selectedLevel), true)}
            ${field("Start Date", `<input type="date" name="assignmentStartDate" value="${escapeHtml(detail.assignmentStartDate || "")}" required>`, true)}
            ${field("End Date", `<input type="date" name="assignmentEndDate" value="${escapeHtml(detail.assignmentEndDate || detail.assignmentStartDate || "")}" required>`, true)}
          </div>
        </div>
        <div class="sppd-modal-section">
          <div class="sppd-modal-section-head">
            <h4>Agenda List</h4>
            ${readOnly ? "" : `<button class="btn neutral" type="button" data-action="sppd-add-agenda-row">${icon("plus")} Add Agenda</button>`}
          </div>
          <div class="sppd-agenda-list">
            ${agendaRows.map((agenda, index) => renderSppdAgendaDraftRow(agenda, index, detail.destination || "")).join("") || `<div class="empty-state compact">${readOnly ? "Belum ada agenda." : "Belum ada agenda. Klik Add Agenda untuk menambahkan agenda perjalanan."}</div>`}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        ${readOnly ? "" : `<button class="btn success" type="submit" data-action="save-sppd-draft-employee" data-employee-id="${escapeHtml(employeeId)}" data-detail-status="Draft">${icon("save")} Save Draft</button>`}
      </div>
    </form>
  `;
}

function renderSppdAgendaDraftRow(agenda, index, fallbackLocation = "") {
  const typeIsOther = agenda.type === "Lainnya" || agenda.typeOther || (agenda.type && !db.sppdMaster.some((item) => item.type === "Jenis Agenda" && item.name === agenda.type));
  return `
    <div class="sppd-agenda-row" data-agenda-index="${escapeHtml(index)}">
      <div class="sppd-agenda-row-head">
        <strong>Agenda ${index + 1}</strong>
      </div>
      <div class="sppd-agenda-row-grid">
        ${field("Agenda Date", `<input type="date" name="agendaDate_${index}" value="${escapeHtml(agenda.date || "")}">`, false)}
        ${field("Agenda Type", renderSppdAgendaTypeSelect(`agendaType_${index}`, typeIsOther ? "Lainnya" : agenda.type || ""), false)}
        <div class="form-field sppd-agenda-type-other ${typeIsOther ? "" : "is-hidden"}">
          <label>Type Lainnya</label>
          <div><input name="agendaTypeOther_${index}" value="${escapeHtml(agenda.typeOther || (typeIsOther ? agenda.type || "" : ""))}" placeholder="Isi type lainnya"></div>
        </div>
        ${field("Agenda Name", `<input name="agendaName_${index}" value="${escapeHtml(agenda.name || "")}" placeholder="Nama agenda">`, false)}
        ${field("Location", `<input name="agendaLocation_${index}" value="${escapeHtml(agenda.location || fallbackLocation)}" placeholder="Lokasi agenda">`, false)}
        ${field("Time", `<div class="sppd-time-stack"><label><span>Start Time</span><input type="time" name="agendaStartTime_${index}" value="${escapeHtml(agenda.startTime || "09:00")}"></label><label><span>Finish Time</span><input type="time" name="agendaEndTime_${index}" value="${escapeHtml(agenda.endTime || "17:00")}"></label></div>`, false)}
        ${field("Remark", `<textarea name="agendaRemark_${index}" placeholder="Catatan agenda">${escapeHtml(agenda.remark || "")}</textarea>`, false)}
      </div>
    </div>
  `;
}

function addSppdAgendaDraftRow() {
  const list = document.querySelector("#sppdDraftEmployeeForm .sppd-agenda-list");
  if (!list) return;
  const empty = list.querySelector(".empty-state");
  if (empty) empty.remove();
  const index = list.querySelectorAll(".sppd-agenda-row").length;
  const fallbackLocation = document.querySelector('#sppdDraftEmployeeForm [name="destination"]')?.value || "";
  list.insertAdjacentHTML("beforeend", renderSppdAgendaDraftRow({}, index, fallbackLocation));
  renderIcons(list);
  const addedRow = list.lastElementChild;
  addedRow?.scrollIntoView({ behavior: "smooth", block: "start" });
  addedRow?.querySelector("input, select, textarea")?.focus({ preventScroll: true });
}

function upsertSppdPrimaryEmployee(item, employeeId, level = "Pelaksana") {
  if (!employeeId) return;
  const source = db.employees.find((employee) => employee.id === employeeId);
  if (!source) return;
  const allowance = getSppdLevelAllowance(level, item) || 350000;
  const existing = item.employees.find((employee) => employee.nik === source.nik) || item.employees[0];
  const payload = {
    name: source.name,
    nik: source.nik,
    division: source.division,
    position: source.position,
    level,
    dailyAllowance: allowance,
    assignmentLetter: existing?.assignmentLetter || "Not Created"
  };
  if (existing) Object.assign(existing, payload);
  else item.employees.push({ id: `SPPD-EMP-${Date.now()}`, ...payload });
}

function updateSppdStatus(id, status) {
  const item = findSppdRequest(id);
  if (!item) return;
  item.status = status;
  item.updatedAt = "2026-08-24";
  appState.sppdDetailTab[id] = getDefaultSppdDetailTabForStatus(item);
  showToast(`SPPD ${status}.`);
  render();
}

function getDefaultSppdDetailTabForStatus(item) {
  const status = getSppdStatus(item);
  if (status === "In Verification") return "Verifikasi";
  if (status.includes("Approval")) return "Approval";
  if (status === "Waiting Payment") return "Payment";
  return "Overview";
}

function collectSppdStageFields(id) {
  const item = findSppdRequest(id);
  if (!item) return;
  const panel = document.querySelector(".sppd-stage-panel");
  if (!panel) return;
  const data = Object.fromEntries(new FormData(panel.querySelector("form") || document.createElement("form")).entries());
  panel.querySelectorAll("input[name], textarea[name], select[name]").forEach((input) => {
    data[input.name] = input.type === "file" ? input.files?.[0]?.name || "" : input.value;
  });

  ["agendaDate", "sppdDate", "assignmentStartDate", "assignmentStartTime", "assignmentEndDate", "assignmentEndTime", "remark", "transferDate", "transferProof", "region"].forEach((key) => {
    if (data[key] !== undefined) item[key] = data[key];
  });
  if (data.attachmentFile) item.attachment = data.attachmentFile;
  if (data.transferProofFile) item.transferProof = data.transferProofFile;
  if (data.area !== undefined) {
    const [area, cluster] = String(data.area || "").split("::");
    item.area = area || item.area;
    item.cluster = cluster || item.cluster;
  }
  if (data.durationOverride) item.duration = Number(data.durationOverride || item.duration || 1);
  else if (data.duration !== undefined || data.assignmentStartDate || data.assignmentEndDate) item.duration = Number(getSppdEffectiveDuration(item) || item.duration || 1);
  item.employees.forEach((employee) => {
    const level = data[`employeeLevel_${employee.id}`];
    const dailyAllowance = data[`dailyAllowance_${employee.id}`];
    if (level) employee.level = level;
    if (dailyAllowance !== undefined) employee.dailyAllowance = Number(String(dailyAllowance).replace(/[^\d]/g, "") || getSppdLevelAllowance(employee.level, item) || employee.dailyAllowance || 0);
  });
}

function markSppdPaid(id) {
  const item = findSppdRequest(id);
  if (!item) return;
  item.paymentStatus = "Paid";
  item.employees?.forEach((employee) => {
    employee.paymentStatus = "Paid";
    employee.paymentDate = employee.paymentDate || todayIso();
    employee.transferProof = employee.transferProof || item.transferProof || `bukti-transfer-${item.docNo.split("/")[0]}-${employee.name.replace(/\s+/g, "-")}.pdf`;
  });
  item.transferDate = item.transferDate || todayIso();
  item.transferProof = item.transferProof || `bukti-transfer-${item.docNo.split("/")[0]}.pdf`;
  appState.sppdDetailTab[id] = "Overview";
  showToast("Allowance payment marked as paid.");
  render();
}

function saveSppdEmployeePayment(id, employeeId) {
  const item = findSppdRequest(id);
  const employee = item?.employees?.find((row) => row.id === employeeId);
  const form = document.getElementById("sppdEmployeePaymentForm");
  if (!item || !employee || !form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const proofFile = form.querySelector('[name="transferProofFile"]')?.files?.[0];
  if (!proofFile && !employee.transferProof) {
    showToast("Upload bukti transfer terlebih dahulu.");
    return;
  }

  employee.paymentStatus = "Paid";
  employee.paymentDate = data.paymentDate || todayIso();
  employee.transferReference = data.transferReference || employee.transferReference || "";
  employee.transferProof = proofFile?.name || employee.transferProof || "";
  employee.paymentRemark = data.paymentRemark || employee.paymentRemark || "";

  const allPaid = item.employees.every((row) => row.paymentStatus === "Paid");
  const letterDone = item.employees.every((row) => row.assignmentLetter === "Created");
  item.transferDate = employee.paymentDate;
  item.transferProof = employee.transferProof || item.transferProof || "";
  item.paymentStatus = allPaid && letterDone ? "Paid" : "Unpaid";
  item.updatedAt = todayIso();
  appState.modal = null;
  renderModal();
  showToast(allPaid ? "Semua employee sudah menerima allowance. Menunggu surat tugas SDM jika belum selesai." : "Payment employee tersimpan.");
  render();
}

function addSppdEmployee(id, employeeId = null) {
  const item = findSppdRequest(id);
  if (!item) return;
  const existingNiks = item.employees.map((employee) => employee.nik);
  const source = employeeId
    ? db.employees.find((employee) => employee.id === employeeId)
    : db.employees.find((employee) => !existingNiks.includes(employee.nik));
  if (!source || existingNiks.includes(source.nik)) {
    showToast("Employee sudah ada di dokumen ini.");
    return;
  }
  item.employees.push({
    id: `SPPD-EMP-${Date.now()}`,
    name: source.name,
    nik: source.nik,
    division: source.division,
    position: source.position,
    level: "Staff",
    dailyAllowance: getSppdLevelAllowance("Pelaksana", item) || 350000,
    assignmentLetter: "Not Created"
  });
  showToast("Employee added to SPPD.");
  setSection(appState.section, "document", id);
}

function applySppdEmployeePicker(id = "draft") {
  const selectedIds = appState.sppdEmployeePickerIds || [];
  if (appState.modal?.mode === "pic") {
    const employee = db.employees.find((row) => row.id === selectedIds[0]);
    if (!employee) {
      showToast("Pilih PIC terlebih dahulu.");
      return;
    }
    if (id && id !== "draft") {
      const item = findSppdRequest(id);
      if (item) {
        item.requesterEmployeeId = employee.id;
        item.requesterName = employee.name;
        item.requesterDivision = employee.division;
        item.requesterPosition = employee.position;
      }
    } else {
      appState.sppdDraftPicEmployeeId = employee.id;
      if (appState.sppdDraftRequest) {
        appState.sppdDraftRequest.requesterEmployeeId = employee.id;
        appState.sppdDraftRequest.requesterName = employee.name;
        appState.sppdDraftRequest.requesterDivision = employee.division;
        appState.sppdDraftRequest.requesterPosition = employee.position;
      }
    }
    appState.modal = null;
    renderModal();
    render();
    return;
  }
  if (appState.modal?.mode === "draftRowEmployee") {
    const rowId = appState.modal.rowId;
    const employee = db.employees.find((row) => row.id === selectedIds[0]);
    if (!rowId || !employee) {
      showToast("Pilih employee terlebih dahulu.");
      return;
    }
    const detail = getSppdDraftEmployeeDetail(rowId);
    appState.sppdDraftEmployeeDetails[rowId] = {
      ...detail,
      employeeId: employee.id
    };
    appState.modal = { type: "sppdDraftEmployee", employeeId: rowId, mode: "edit" };
    renderModal();
    render();
    return;
  }
  if (id === "draft" || !id) {
    appState.sppdDraftEmployeeIds = selectedIds;
    Object.keys(appState.sppdDraftEmployeeDetails).forEach((employeeId) => {
      if (!selectedIds.includes(employeeId)) delete appState.sppdDraftEmployeeDetails[employeeId];
    });
    appState.modal = null;
    renderModal();
    render();
    return;
  }
  const item = findSppdRequest(id);
  if (!item) return;
  item.employees = [];
  selectedIds.forEach((employeeId) => appendSppdEmployeeFromReference(item, employeeId));
  normalizeSppdRequest(item);
  appState.modal = null;
  renderModal();
  render();
}

function saveSppdDraftEmployeeAssignment(employeeId, detailStatus = "Draft", options = {}) {
  const form = document.getElementById("sppdDraftEmployeeForm");
  if (!form || !employeeId) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const duration = calculateDateDuration(data.assignmentStartDate, data.assignmentEndDate);
  const [area, cluster] = String(data.areaCluster || "").split("::");
  const agendaIndexes = [...form.querySelectorAll(".sppd-agenda-row")]
    .map((row) => Number(row.dataset.agendaIndex))
    .filter((index) => Number.isFinite(index));
  const agendas = agendaIndexes.map((index) => {
    const agendaType = data[`agendaType_${index}`] === "Lainnya" ? data[`agendaTypeOther_${index}`] || "Lainnya" : data[`agendaType_${index}`] || "";
    return {
      id: `${employeeId}-AGENDA-${index + 1}`,
      name: data[`agendaName_${index}`] || "",
      type: agendaType,
      typeOther: data[`agendaType_${index}`] === "Lainnya" ? data[`agendaTypeOther_${index}`] || "" : "",
      date: data[`agendaDate_${index}`] || "",
      startTime: data[`agendaStartTime_${index}`] || "09:00",
      endTime: data[`agendaEndTime_${index}`] || "17:00",
      location: data[`agendaLocation_${index}`] || data.destination || "",
      remark: data[`agendaRemark_${index}`] || ""
    };
  }).filter((agenda) => agenda.name || agenda.date || agenda.type || agenda.location);
  appState.sppdDraftEmployeeDetails[employeeId] = {
    employeeId: getSppdDraftRowEmployeeId(employeeId),
    destination: data.destination || "",
    level: data.level || "Pelaksana",
    region: data.region || "",
    area: area || "",
    cluster: cluster || "",
    assignmentStartDate: data.assignmentStartDate || "",
    assignmentEndDate: data.assignmentEndDate || data.assignmentStartDate || "",
    duration,
    detailStatus,
    agendas
  };
  if (options.keepModalOpen) return;
  appState.modal = null;
  renderModal();
  if (!options.silent) showToast("Assignment employee tersimpan.");
  render();
}

function confirmSppdDraftEmployee(employeeId) {
  const detail = getSppdDraftEmployeeDetail(employeeId);
  if (!hasCompleteSppdDraftEmployeeDetail(detail)) {
    showToast("Lengkapi assignment dan agenda employee sebelum confirm.");
    appState.modal = { type: "sppdDraftEmployee", employeeId, mode: "edit" };
    renderModal();
    return;
  }
  appState.sppdDraftEmployeeDetails[employeeId] = { ...detail, detailStatus: "Confirmed" };
  showToast("Employee confirmed.");
  render();
}

function copySppdDraftEmployeeAssignment(sourceEmployeeId, targetEmployeeIds = []) {
  const sourceDetail = appState.sppdDraftEmployeeDetails[sourceEmployeeId];
  if (!sourceDetail || !hasCompleteSppdDraftEmployeeDetail(sourceDetail)) {
    showToast("Lengkapi assignment source employee sebelum copy.");
    return false;
  }
  const targets = targetEmployeeIds.filter((id) => id !== sourceEmployeeId && appState.sppdDraftEmployeeIds.includes(id));
  if (!targets.length) {
    showToast("Pilih target employee untuk menerima copy assignment.");
    return false;
  }
  targets.forEach((employeeId) => {
    appState.sppdDraftEmployeeDetails[employeeId] = {
      ...JSON.parse(JSON.stringify(sourceDetail)),
      detailStatus: "Draft"
    };
  });
  showToast(`Assignment copied to ${targets.length} employee.`);
  render();
  return true;
}

function duplicateSppdDraftEmployeeRow(sourceEmployeeId) {
  const sourceDetail = appState.sppdDraftEmployeeDetails[sourceEmployeeId] || getSppdDraftEmployeeDetail(sourceEmployeeId);
  const sourceEmployeeIdValue = getSppdDraftRowEmployeeId(sourceEmployeeId);
  const rowId = `draft-row-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  appState.sppdDraftEmployeeIds.push(rowId);
  appState.sppdDraftEmployeeDetails[rowId] = {
    ...JSON.parse(JSON.stringify(sourceDetail)),
    employeeId: sourceEmployeeIdValue,
    detailStatus: "Draft"
  };
  showToast("Row duplicated. Klik edit lalu ganti employee jika diperlukan.");
  render();
}

function applySppdCopyAssignment() {
  const sourceEmployeeId = appState.modal?.sourceEmployeeId;
  const targetIds = [...modalHost.querySelectorAll('[name="copyTargetEmployee"]:checked')].map((input) => input.value);
  if (!targetIds.length) {
    showToast("Pilih minimal satu target employee.");
    return;
  }
  if (!copySppdDraftEmployeeAssignment(sourceEmployeeId, targetIds)) return;
  appState.modal = null;
  renderModal();
}

function canSubmitSppdVerification(id) {
  const item = findSppdRequest(id);
  if (!item) return false;
  const invalidEmployee = item.employees.find((employee) => employee.verificationStatus !== "Verified");
  if (invalidEmployee) {
    showToast("Verifikasi semua employee terlebih dahulu dari detail employee.");
    appState.sppdDetailTab[id] = "Verifikasi";
    render();
    return false;
  }
  return true;
}

function calculateDateDuration(start, end) {
  if (!start) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end || start);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 1;
  const days = Math.round((endDate - startDate) / 86400000) + 1;
  return Math.max(1, days);
}

function updateSppdEmployeeLiveCalculation(form, verifiedWasEdited = false) {
  if (!form) return;
  const start = form.querySelector('[name="employeeStartDate"]')?.value || "";
  const end = form.querySelector('[name="employeeEndDate"]')?.value || start;
  const rate = Number(form.dataset.dailyRate || 0);
  const duration = calculateSppdLiveDuration(start, end, form.dataset.sppdRegion || "", form.dataset.sppdArea || "", form.dataset.sppdCluster || "");
  const calculated = rate * duration;
  const durationInput = form.querySelector('[data-role="employee-duration"]');
  const effectiveInput = form.querySelector('[data-role="employee-effective-days"]');
  const calculatedInput = form.querySelector('[data-role="employee-calculated-allowance"]');
  const verifiedInput = form.querySelector('[data-role="employee-verified-allowance"]');
  if (durationInput) durationInput.value = `${duration} hari`;
  if (effectiveInput) effectiveInput.value = `${duration} hari`;
  if (calculatedInput) calculatedInput.value = formatRupiah(calculated);
  if (verifiedInput && !verifiedWasEdited) verifiedInput.value = calculated;
}

function hasCompleteSppdDraftEmployeeDetail(detail = {}) {
  return Boolean(
    detail.destination &&
    detail.assignmentStartDate &&
    detail.assignmentEndDate &&
    Array.isArray(detail.agendas) &&
    detail.agendas.length &&
    detail.agendas.every((agenda) => agenda.name && agenda.date && agenda.location)
  );
}

function appendSppdEmployeeFromReference(item, employeeId, level = "Pelaksana", detail = {}) {
  const source = db.employees.find((employee) => employee.id === employeeId);
  if (!source) return null;
  const allowance = getSppdLevelAllowance(level, item) || 350000;
  const employee = {
    id: `SPPD-EMP-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: source.name,
    nik: source.nik,
    division: source.division,
    position: source.position,
    level,
    destination: detail.destination || item.agendaLocation || "",
    region: detail.region || item.region || "",
    area: detail.area || item.area || "",
    cluster: detail.cluster || item.cluster || "",
    assignmentStartDate: detail.assignmentStartDate || item.assignmentStartDate || "",
    assignmentEndDate: detail.assignmentEndDate || item.assignmentEndDate || "",
    duration: detail.duration || item.duration || 1,
    detailStatus: detail.detailStatus || "Draft",
    agendas: detail.agendas || [],
    dailyAllowance: allowance,
    bankAccount: source.bankAccount || getEmployeeReferenceBankAccount(source),
    assignmentLetter: "Not Created"
  };
  item.employees.push(employee);
  return employee;
}

function deleteSppdEmployee(id, employeeId) {
  const item = findSppdRequest(id);
  if (!item) return;
  item.employees = item.employees.filter((employee) => employee.id !== employeeId);
  showToast("Employee removed from SPPD.");
  render();
}

function saveSppdEmployeeDetail() {
  const [docId, employeeId] = String(appState.selectedId || "").split("::");
  const item = findSppdRequest(docId);
  const employee = item?.employees.find((row) => row.id === employeeId);
  const form = document.getElementById("sppdForm");
  if (!employee || !form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  if (data.employeeDestination !== undefined) employee.destination = data.employeeDestination;
  if (data.employeeStartDate !== undefined) employee.assignmentStartDate = data.employeeStartDate;
  if (data.employeeEndDate !== undefined) employee.assignmentEndDate = data.employeeEndDate;
  employee.duration = getSppdEmployeeEffectiveDuration(item, employee);
  const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
  employee.calculatedAllowance = rate * Number(employee.duration || item.duration || 1);
  if (data.employeeVerifiedAllowance !== undefined) employee.verifiedAllowance = Number(String(data.employeeVerifiedAllowance).replace(/[^\d]/g, "") || employee.calculatedAllowance || 0);
  if (data.employeeVerifiedBankAccount !== undefined) employee.verifiedBankAccount = data.employeeVerifiedBankAccount || getEmployeeReferenceBankAccount(employee);
  if (data.employeeVerificationRemark !== undefined) employee.verificationRemark = data.employeeVerificationRemark;
  if (appState.section === "sppdVerification" || item.status === "In Verification") {
    employee.verificationStatus = "Verified";
    if (!employee.verifiedAllowance) employee.verifiedAllowance = employee.calculatedAllowance;
  }
  if (data.remark !== undefined) item.remark = data.remark;
  const attachmentFile = form.querySelector('[name="attachmentFile"]')?.files?.[0];
  if (attachmentFile) item.attachment = attachmentFile.name;
  showToast("Employee detail saved.");
}

function updateSppdLetter(id, employeeId, status, message) {
  const item = findSppdRequest(id);
  if (item && !employeeId && status) item.employees.forEach((row) => {
    row.assignmentLetter = status;
  });
  const employee = item?.employees.find((row) => row.id === employeeId) || item?.employees[0];
  if (!employee) return;
  if (status) employee.assignmentLetter = status;
  if (message.includes("Preview")) {
    const win = window.open("", "_blank");
    win?.document.write(`<pre>${escapeHtml(item.assignmentLetterContent || buildSppdLetterText(item, employee))}</pre>`);
    win?.document.close();
  }
  if (message.includes("download")) {
    downloadTextFile(`surat-tugas-${employee.nik}.txt`, item.assignmentLetterContent || buildSppdLetterText(item, employee));
  }
  if (status === "Created" && item.employees.every((row) => row.paymentStatus === "Paid") && item.employees.every((row) => row.assignmentLetter === "Created")) {
    item.paymentStatus = "Paid";
    item.updatedAt = todayIso();
  }
  showToast(message);
  render();
}

function uploadSppdAssignmentLetter(id) {
  const item = findSppdRequest(id);
  if (!item) return;
  const input = document.querySelector('[name="assignmentLetterFile"]');
  const file = input?.files?.[0];
  if (!file) {
    showToast("Upload file surat tugas terlebih dahulu.");
    return;
  }
  item.assignmentLetterFile = file.name;
  item.employees.forEach((employee) => {
    employee.assignmentLetter = "Created";
  });
  if (item.employees.every((row) => row.paymentStatus === "Paid")) {
    item.paymentStatus = "Paid";
    item.updatedAt = todayIso();
  }
  showToast("Surat tugas uploaded.");
  render();
}

function openSppdLetterEditor(id) {
  const item = findSppdRequest(id);
  if (!item) return;
  appState.modal = { type: "sppdLetterEditor", id };
  renderModal();
}

function renderSppdLetterEditorModal() {
  const item = findSppdRequest(appState.modal?.id);
  if (!item) return "";
  const content = item.assignmentLetterContent || buildSppdAssignmentDocument(item);
  return `
    <form class="modal sppd-letter-editor-modal" id="sppdLetterEditorForm" role="dialog" aria-modal="true">
      <div class="modal-header sppd-letter-editor-header">
        <div>
          <h3>OnlyOffice Document Editor</h3>
          <small class="modal-kicker">Surat Tugas ${escapeHtml(item.docNo)}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="sppd-document-toolbar" aria-label="Document toolbar">
        <button type="button" title="Undo" disabled>${icon("undo")}</button>
        <button type="button" title="Redo" disabled>${icon("redo")}</button>
        <span></span>
        <button type="button" title="Bold" disabled><strong>B</strong></button>
        <button type="button" title="Italic" disabled><em>I</em></button>
        <div class="sppd-editor-mode">Editing</div>
      </div>
      <div class="modal-body sppd-letter-editor-body">
        <textarea name="letterContent" class="sppd-letter-page" aria-label="Isi surat tugas">${escapeHtml(content)}</textarea>
      </div>
      <div class="modal-footer">
        <small class="sppd-editor-save-note">Dokumen tersimpan pada data SPPD saat ini.</small>
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="submit" data-action="save-sppd-letter" data-id="${escapeHtml(item.id)}">${icon("save")} Save Document</button>
      </div>
    </form>
  `;
}

function saveSppdLetterDocument(id) {
  const item = findSppdRequest(id);
  const form = document.getElementById("sppdLetterEditorForm");
  if (!item || !form) return;
  const content = String(new FormData(form).get("letterContent") || "").trim();
  if (!content) {
    showToast("Isi surat tugas tidak boleh kosong.");
    return;
  }
  item.assignmentLetterContent = content;
  item.assignmentLetterFile = `Surat Tugas ${item.docNo.replace(/[\\/:*?"<>|]/g, "-")}.docx`;
  item.employees.forEach((employee) => {
    employee.assignmentLetter = "Created";
  });
  appState.modal = null;
  renderModal();
  render();
  showToast("Surat tugas berhasil disimpan.");
}

function buildSppdAssignmentDocument(item) {
  const employees = item.employees.map((employee, index) => [
    `${index + 1}. ${employee.name} (${employee.nik})`,
    `   ${employee.position || "-"} / ${employee.division || "-"}`,
    `   Tujuan: ${employee.destination || item.agendaLocation || "-"}`,
    `   Periode: ${formatSppdEmployeeAssignmentPeriod(employee, item)}`
  ].join("\n")).join("\n\n");
  return [
    "SURAT TUGAS PERJALANAN DINAS",
    `Nomor: ${item.docNo}`,
    "",
    "Yang bertanda tangan di bawah ini menugaskan:",
    "",
    employees || "Belum ada employee yang ditugaskan.",
    "",
    `Untuk melaksanakan agenda: ${item.agendaName || "-"}`,
    `Lokasi: ${item.agendaLocation || "-"}`,
    `PIC / Requester: ${item.requesterName || "-"} - ${item.requesterDivision || "-"}`,
    "",
    "Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.",
    "",
    `${todayLabel()}`,
    "Pejabat Berwenang",
    "",
    "",
    "(____________________________)"
  ].join("\n");
}

function previewSppdDocument(fileName) {
  if (!fileName) {
    showToast("Dokumen belum tersedia.");
    return;
  }
  const win = window.open("", "_blank");
  win?.document.write(`<pre>Preview dokumen: ${escapeHtml(fileName)}</pre>`);
  win?.document.close();
  showToast("Preview dokumen dibuka.");
}

function downloadSppdDocument(fileName) {
  if (!fileName) {
    showToast("Dokumen belum tersedia.");
    return;
  }
  const safeName = fileName.replace(/[\\/:*?"<>|]/g, "-");
  downloadTextFile(safeName.endsWith(".txt") ? safeName : `${safeName}.txt`, `Dokumen SPPD\n${fileName}`);
  showToast("Dokumen didownload.");
}

function buildSppdLetterText(item, employee) {
  return [
    "SURAT TUGAS PERJALANAN DINAS",
    `No. SPPD: ${item.docNo}`,
    "",
    `Nama: ${employee.name}`,
    `NIK: ${employee.nik}`,
    `Jabatan/Divisi: ${employee.position} / ${employee.division}`,
    `Agenda: ${item.agendaName}`,
    `Lokasi: ${item.agendaLocation}`,
    `Lama Penugasan: ${formatSppdAssignmentPeriod(item)}`,
    "",
    "Dokumen ini dibuat otomatis dari sistem SPPD."
  ].join("\n");
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function saveSppdMaster() {
  const form = document.getElementById("sppdMasterForm");
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const payload = buildSppdMasterPayload(data);
  const existing = db.sppdMaster.find((item) => item.id === appState.modal?.id);
  if (existing) Object.assign(existing, payload);
  else db.sppdMaster.push({ id: `MST-${String(Date.now()).slice(-6)}`, ...payload });
  appState.filters.sppdMaster.type = getSppdMasterViewType(payload.type || appState.filters.sppdMaster.type);
  appState.modal = null;
  showToast("Master SPPD saved.");
  render();
}

function buildSppdMasterPayload(data) {
  const viewType = getSppdMasterViewType(data.masterViewType || appState.filters.sppdMaster.type);

  if (viewType === "Region" || viewType === "Level") {
    return {
      type: viewType,
      name: data.masterName || "-",
      value: data.description || "-",
      status: data.status || "Active"
    };
  }

  if (viewType === "Area / Cluster") {
    const scope = data.scope || "Domestic";
    return {
      type: "Area / Cluster",
      name: scope === "International" ? data.internationalCluster || "Kluster 1" : data.domesticArea || "Area 1",
      value: data.mapping || "-",
      status: data.status || "Active"
    };
  }

  if (viewType === "Allowance Rate") {
    const scope = data.scope || "Domestic";
    const rates = scope === "International"
      ? [data.rateOne || 0, data.rateTwo || 0]
      : [data.rateOne || 0, data.rateTwo || 0, data.rateThree || 0];
    return {
      type: scope === "International" ? "Allowance LN" : "Allowance DN",
      name: data.levelName || "-",
      value: rates.join("|"),
      status: data.status || "Active"
    };
  }

  if (viewType === "Duration Rule") {
    return {
      type: "Durasi Rules",
      name: `${data.scope || "Domestic"} | ${data.areaCluster || "All"} | ${data.additionalDay || 0}`,
      value: data.description || "-",
      status: data.status || "Active"
    };
  }

  return {
    type: "Jenis Agenda",
    name: data.agendaTypeName || "-",
    value: data.description || "-",
    status: data.status || "Active"
  };
}

function getSppdMasterViewType(type) {
  if (type === "Jenis Agenda" || type === "Agenda Type") return "Agenda Type";
  if (type === "Region") return "Region";
  if (type === "Level") return "Level";
  if (type === "Area / Cluster" || type === "Destination") return "Area / Cluster";
  if (["Allowance DN", "Allowance LN", "Allowance Rate", "Allowance"].includes(type)) return "Allowance Rate";
  if (type === "Durasi Rules" || type === "Duration Rule") return "Duration Rule";
  return "Agenda Type";
}

function saveSppdOtherAllowance() {
  const form = document.getElementById("sppdOtherAllowanceForm");
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const proof = form.querySelector('[name="proofFile"]')?.files?.[0]?.name || "";
  db.sppdOtherAllowances.unshift({
    id: `OA-${String(db.sppdOtherAllowances.length + 1).padStart(3, "0")}`,
    sppdId: data.sppdId || "",
    requesterName: data.requesterName || "",
    type: data.type || "Lainnya",
    amount: Number(data.amount || 0),
    status: "Submitted",
    transferDate: "",
    proof
  });
  appState.modal = null;
  showToast("Other allowance submitted.");
  render();
}
