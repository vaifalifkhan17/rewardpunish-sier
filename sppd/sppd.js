/* Travel Request (SPPD) module */

const sppdFileUrls = new Map();

function registerSppdFile(file) {
  if (!file) return;
  const existingUrl = sppdFileUrls.get(file.name);
  if (existingUrl) URL.revokeObjectURL(existingUrl);
  sppdFileUrls.set(file.name, URL.createObjectURL(file));
}

function isSppdSection(section) {
  return ["sppdDashboard", "sppdRequestList", "sppdCompletedList", "sppdRequest", "sppdVerification", "sppdApproval", "sppdPayment", "sppdOtherAllowance", "sppdMaster", "sppdMasterJenis", "sppdMasterRegion", "sppdMasterArea", "sppdMasterEmployee", "sppdMasterDurasi"].includes(section);
}

function isSppdMasterSection(section) {
  return ["sppdMaster", "sppdMasterJenis", "sppdMasterRegion", "sppdMasterArea", "sppdMasterEmployee", "sppdMasterDurasi"].includes(section);
}

function getSppdWorkflowStage(item) {
  if (item.workflowStage) return item.workflowStage;
  if (item.paymentStatus === "Paid") return "Complete";
  if (item.status === "Verified") return "Payment";
  if (["Approved", "In Verification"].includes(item.status)) return "Verification";
  if (item.status === "Submitted") return "Approval";
  return "Request";
}

function getSppdStatus(item) {
  if (item.status === "Rejected") return "Rejected";
  const stage = getSppdWorkflowStage(item);
  if (stage === "Complete") return "Completed";
  if (stage === "Add Cost") return "Add Cost";
  if (stage === "Payment") return "Waiting Payment";
  if (stage === "Verification") return item.status === "In Verification" ? "In Verification" : "Waiting Verification";
  if (stage === "Approval") return "Waiting Approval";
  return item.status || "Draft";
}

function getSppdProcess(item) {
  return getSppdWorkflowStage(item);
}

function getSppdDisplayStatus(item) {
  if (item.status === "Rejected") return "Rejected";
  if (item.status === "Draft") return "Draft";
  if (item.status === "Request") return "Request";
  const stage = getSppdWorkflowStage(item);
  return stage === "Complete" ? "Completed" : stage;
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
  const request = source.filter((item) => ["Draft", "Request"].includes(item.status)).length;
  const approval = source.filter((item) => getSppdWorkflowStage(item) === "Approval").length;
  const verification = source.filter((item) => getSppdWorkflowStage(item) === "Verification").length;
  const payment = source.filter((item) => getSppdWorkflowStage(item) === "Payment").length;
  const addCost = source.filter((item) => getSppdWorkflowStage(item) === "Add Cost").length;
  const completedCount = source.filter((item) => getSppdWorkflowStage(item) === "Complete").length;

  return `
    <div class="page-grid sppd-page">
      <div class="panel sppd-hero">
        <div>
          <h2>${completed ? "Travel Request (SPPD) - Completed" : "Travel Request (SPPD) - All Request"}</h2>
          <small class="panel-kicker">${completed ? "Archive of completed SPPD documents." : "Central monitoring for all official travel documents."}</small>
        </div>
        ${completed ? "" : `<button class="btn success" type="button" data-action="sppd-new">${icon("plus")} Create SPPD</button>`}
      </div>
      <div class="sppd-metric-grid">
        ${sppdMetricCard("Request", request, "Active drafts and requests")}
        ${sppdMetricCard("Approval", approval, "Waiting for approval")}
        ${sppdMetricCard("Verification", verification, "Waiting for verification")}
        ${sppdMetricCard("Payment", payment, "Waiting for payment")}
        ${sppdMetricCard("Add Cost", addCost, "Additional cost entry")}
        ${sppdMetricCard("Completed", completedCount, "Completed documents")}
      </div>
      ${renderSppdRequestList(completed ? "sppdCompletedList" : "sppdRequestList")}
    </div>
  `;
}

function sppdMetricCard(label, value, note) {
  const metricIcons = {
    Request: "clipboard",
    Verification: "eye",
    Approval: "check",
    Payment: "download",
    "Add Cost": "plus",
    Completed: "check"
  };

  const metricClass = label.toLowerCase().replace(/\s+/g, "-");
  return `
    <div class="sppd-metric-card metric-${escapeHtml(metricClass)}">
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
  const completed = getSppdWorkflowStage(item) === "Complete";
  const activeStage = getSppdEmployeeTab(item);
  const footerAction = completed ? "" : renderSppdDrawerAction(activeStage, item, ["Verification", "Payment"].includes(activeStage));
  const detailTabs = getSppdDetailTabs(item);
  const activeTab = detailTabs.includes(appState.sppdDetailTab[item.id]) ? appState.sppdDetailTab[item.id] : "Request";

  return `
    <div class="page-grid sppd-document-page">
      <div class="panel sppd-document-summary">
        <div class="sppd-document-page-head">
          <div>
            <small>SPPD Document</small>
            <h2>${escapeHtml(item.docNo)}</h2>
            <p>${escapeHtml(item.agendaName)} - ${escapeHtml(getSppdMainDestination(item))}</p>
          </div>
          <div class="sppd-document-status">
            ${sppdStagePill(item)}
            ${sppdStatusPill(getSppdStatus(item))}
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
      name: item.agendaName || "Travel Agenda",
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
    Request: "file-text",
    Verification: "check",
    Approval: "clipboard",
    Payment: "upload",
    "Add Cost": "plus",
    Complete: "check"
  }[tab] || "file-text";
}

function getSppdDetailTabDone(item, tab) {
  const tabs = ["Request", "Approval", "Verification", "Payment", "Add Cost", "Complete"];
  const currentIndex = tabs.indexOf(getSppdWorkflowStage(item));
  const tabIndex = tabs.indexOf(tab);
  return tabIndex >= 0 && (tabIndex < currentIndex || (tab === "Complete" && currentIndex === tabIndex));
}

function getSppdDetailTabs(item) {
  const tabs = ["Request", "Approval", "Verification", "Payment", "Add Cost", "Complete"];
  const currentIndex = tabs.indexOf(getSppdWorkflowStage(item));
  return tabs.slice(0, Math.max(currentIndex, 0) + 1);
}

function renderSppdDetailTabContent(item, activeTab) {
  if (activeTab === "Request") return renderSppdOverviewStageView(item);
  if (activeTab === "Verification") return renderSppdVerificationTabView(item);
  if (activeTab === "Approval") return renderSppdApprovalTabView(item);
  if (activeTab === "Payment") return renderSppdPaymentTabView(item);
  if (activeTab === "Add Cost") return renderSppdOtherAllowanceTabView(item);
  if (activeTab === "Complete") return renderSppdCompletedOverviewView(item);
  return renderSppdOverviewStageView(item);
}

function renderSppdOverviewPanel(item) {
  return `<div class="panel sppd-summary-panel"><div class="panel-header"><div><h2>Request</h2><small class="panel-kicker">${escapeHtml(item.docNo)} - ${escapeHtml(item.requesterName)}</small></div></div><div class="panel-body"><div class="sppd-summary-modern"><div class="sppd-summary-main"><span class="sppd-summary-label">Request Information</span><h3>${escapeHtml(item.agendaName || "-")}</h3><p>${escapeHtml(item.requesterName || "-")} - ${escapeHtml(item.requesterDivision || "-")}</p><div class="sppd-summary-chips"><span>${escapeHtml(getSppdProcess(item))}</span><span>${escapeHtml(getSppdStatus(item))}</span><span>${escapeHtml(item.sppdDate || "-")}</span></div></div><div class="sppd-summary-total"><span>Participants</span><strong>${escapeHtml(getSppdParticipantCount(item))}</strong><small>${escapeHtml(getSppdMainDestination(item))}</small></div><div class="sppd-summary-details">${sppdSummaryItem("SPPD Number", item.docNo)}${sppdSummaryItem("PIC / Division", `${item.requesterName} - ${item.requesterDivision}`)}${sppdSummaryItem("Purpose", item.agendaName || "-")}${sppdSummaryItem("Destination Summary", getSppdMainDestination(item))}${sppdSummaryItem("Overall Assignment", formatSppdAssignmentPeriod(item))}${sppdSummaryFileItem("Attachment", getSppdAttachmentNames(item))}${sppdSummaryItem("Remark", item.remark || "-")}${sppdSummaryItem("Last Updated", item.updatedAt || item.sppdDate || "-")}</div></div></div></div>`;
}

function renderSppdOverviewStageView(item) {
  const sections = [
    renderSppdRequestInfoText(item),
    renderSppdParticipantReviewTable(item)
  ];

  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-body sppd-stage-view">
        ${sections.join("")}
      </div>
    </div>
  `;
}

function renderSppdCompletedOverviewView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
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
        ${sppdReviewFilePair("Assignment Letter", item.assignmentLetterFile || (created ? `Assignment Letter ${item.docNo}.pdf` : ""))}
        ${sppdReviewFilePair("Attachment Awal", item.attachment)}
        ${sppdReviewPair("Completed Date", item.updatedAt || item.transferDate || "-")}
      </div>
    </div>
  `;
}

function renderSppdStageRequestView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Request</h2><small class="panel-kicker">Request document and travel participant summary.</small></div></div>
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
      <div class="panel-body sppd-stage-view">
        ${renderSppdApprovalTrackTable(item)}
      </div>
    </div>
  `;
}

function renderSppdPaymentTabView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
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
        <button class="btn primary" type="button" data-action="sppd-letter-edit" data-id="${escapeHtml(item.id)}">${icon("file-text")} Create Letter</button>
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
      <div class="panel-header"><div><h2>Approval</h2><small class="panel-kicker">Track approvals from the Head of Division and BOD.</small></div></div>
      <div class="panel-body sppd-stage-view">
        ${renderSppdApprovalTrackTable(item)}
      </div>
    </div>
  `;
}

function renderSppdStagePaymentView(item) {
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-header"><div><h2>Payment</h2><small class="panel-kicker">Employee allowance payment list.</small></div></div>
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
      <div class="panel-header"><div><h2>Completed</h2><small class="panel-kicker">Complete SPPD process summary.</small></div></div>
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
  const startDate = item.assignmentStartDate || item.sppdDate || "-";
  const endDate = item.assignmentEndDate || startDate;
  const duration = daysBetweenInclusive(startDate, endDate);
  const area = [item.area, item.cluster].filter(Boolean).join(" - ") || "-";
  const pic = `${item.requesterName || "-"}${item.requesterPosition ? ` [${item.requesterPosition}]` : ""}`;
  return `
    <div class="sppd-review-section sppd-detail-information-preview">
      <h4>Detail Information</h4>
      <div class="sppd-detail-information-grid">
        <div class="sppd-detail-information-column">
          <div class="sppd-detail-information-row">
            <span>Request Date</span>
            <div class="sppd-request-preview-control">
              <strong>${escapeHtml(formatDate(item.sppdDate) || "-")}</strong>
              <span class="sppd-doc-number-label">${escapeHtml(item.docNo || "-")}</span>
            </div>
          </div>
          <div class="sppd-detail-information-row sppd-agenda-field">
            <span>Agenda</span>
            <div class="sppd-detail-preview-value multiline">${escapeHtml(item.agendaName || "-")}</div>
          </div>
          <div class="sppd-detail-information-row">
            <span>Date</span>
            <div class="sppd-date-preview-control">
              <strong>${escapeHtml(formatDate(startDate))}</strong><span>to</span><strong>${escapeHtml(formatDate(endDate))}</strong><b>${escapeHtml(duration)} Day(s)</b>
            </div>
          </div>
          <div class="sppd-detail-information-row">
            <span>Place</span>
            <div class="sppd-detail-preview-value">${escapeHtml(item.agendaLocation || getSppdMainDestination(item) || "-")}</div>
          </div>
          <div class="sppd-detail-information-row sppd-remark-field">
            <span>Remark</span>
            <div class="sppd-detail-preview-value multiline">${escapeHtml(item.remark || "-")}</div>
          </div>
        </div>
        <div class="sppd-detail-information-column">
          <div class="sppd-detail-information-row">
            <span>Agenda Type</span>
            <div class="sppd-agenda-preview-control"><strong>${escapeHtml(item.agendaType || "-")}</strong><b>(${escapeHtml(item.employees.length)} Participants)</b></div>
          </div>
          <div class="sppd-detail-information-row"><span>Region</span><div class="sppd-detail-preview-value">${escapeHtml(item.region || "-")}</div></div>
          <div class="sppd-detail-information-row"><span>Area</span><div class="sppd-detail-preview-value">${escapeHtml(area)}</div></div>
          <div class="sppd-detail-information-row"><span>PIC / Requester</span><div class="sppd-detail-preview-value">${escapeHtml(pic)}</div></div>
          <div class="sppd-detail-information-row"><span>Division</span><div class="sppd-detail-preview-value">${escapeHtml(item.requesterDivision || "-")}</div></div>
          <div class="sppd-detail-information-row sppd-attachment-field"><span>Attachment</span>${renderSppdFileList(getSppdAttachmentNames(item))}</div>
        </div>
      </div>
    </div>
  `;
}

function renderSppdParticipantReviewTable(item, options = {}) {
  const mode = options.mode || "overview";
  const isVerification = mode === "verification";
  const isPayment = mode === "payment";
  if (!isVerification && !isPayment) {
    return `
      <div class="sppd-review-section">
        <h4>Participant Breakdown</h4>
        <div class="table-wrap">
          <table class="sppd-data-table sppd-review-participant-table sppd-review-overview-table">
            <colgroup>
              <col class="employee-col">
              <col class="division-col">
              <col class="agenda-col">
              <col class="period-col">
              <col class="level-col">
              <col class="action-col">
            </colgroup>
            <thead><tr><th>Employee</th><th>Division</th><th class="center">Agenda</th><th class="center">Period</th><th class="center">Level</th><th class="center">Action</th></tr></thead>
            <tbody>${item.employees.map((employee) => {
              const days = Number(employee.duration || item.duration || 1);
              const agendaNames = (employee.agendas || []).map((agenda) => agenda.name).filter(Boolean);
              const agendas = agendaNames.length ? agendaNames : [item.agendaName || "-"];
              const action = item.status === "Draft"
                ? `<button class="action-icon action-edit" type="button" title="Edit Employee" aria-label="Edit Employee" data-action="edit" data-section="sppdRequestList" data-id="${escapeHtml(item.id)}">${icon("edit")}</button>`
                : `<button class="action-icon action-view" type="button" title="View Employee" aria-label="View Employee" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="detail">${icon("eye")}</button>`;
              return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.nik || employee.employeeId || "-")}</small></td><td><strong>${escapeHtml(employee.division || "-")}</strong><small>${escapeHtml(employee.position || "-")}</small></td><td><div class="sppd-agenda-name-list">${agendas.map((agenda) => `<span>${escapeHtml(agenda)}</span>`).join("")}</div></td><td class="center">${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} Days</small></td><td class="center"><strong>${escapeHtml(employee.level || "-")}</strong></td><td class="center"><span class="table-actions">${action}</span></td></tr>`;
            }).join("") || emptyRow(6, "No employees added yet.")}</tbody>
          </table>
        </div>
      </div>
    `;
  }
  if (isVerification) {
    return `
      <div class="sppd-review-section">
        <h4>Participant Breakdown</h4>
        <div class="table-wrap sppd-verification-table-wrap">
          <table class="sppd-data-table sppd-review-participant-table sppd-verification-participant-table">
            <colgroup><col class="employee-col"><col class="division-col"><col class="agenda-col"><col class="period-col"><col class="level-col"><col class="allowance-col"><col class="verification-col"><col class="action-col"></colgroup>
            <thead><tr><th>Employee</th><th>Division</th><th class="center">Agenda</th><th class="center">Period</th><th class="center">Level</th><th class="money-col">Allowance</th><th class="center">Verification</th><th class="center">Action</th></tr></thead>
            <tbody>${item.employees.map((employee) => {
              const days = Number(employee.duration || item.duration || 1);
              const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
              const allowance = Number(employee.calculatedAllowance || rate * days);
              const agendaNames = (employee.agendas || []).map((agenda) => agenda.name).filter(Boolean);
              const agendas = agendaNames.length ? agendaNames : [item.agendaName || "-"];
              const action = `<button class="action-icon action-edit" type="button" title="Verify Employee" aria-label="Verify Employee" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="employee">${icon("edit")}</button>`;
              return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.nik || "-")}</small></td><td><strong>${escapeHtml(employee.division || "-")}</strong><small>${escapeHtml(employee.position || "-")}</small></td><td><div class="sppd-agenda-name-list">${agendas.map((agenda) => `<span>${escapeHtml(agenda)}</span>`).join("")}</div></td><td class="center">${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} Days</small></td><td class="center"><strong>${escapeHtml(employee.level || "-")}</strong></td><td class="money-col"><strong>${formatRupiah(allowance)}</strong></td><td class="center">${statusPill(employee.verificationStatus || "Pending")}</td><td class="center"><span class="table-actions">${action}</span></td></tr>`;
            }).join("") || emptyRow(8, "No employees added yet.")}</tbody>
          </table>
        </div>
      </div>
    `;
  }
  if (isPayment) {
    return `
      <div class="sppd-review-section">
        <h4>Employee Payment</h4>
        <div class="table-wrap sppd-payment-table-wrap">
          <table class="sppd-data-table sppd-review-participant-table sppd-payment-participant-table">
            <colgroup><col class="employee-col"><col class="division-col"><col class="agenda-col"><col class="period-col"><col class="level-col"><col class="allowance-col"><col class="status-col"><col class="date-col"><col class="proof-col"><col class="remark-col"><col class="action-col"></colgroup>
            <thead><tr><th>Employee</th><th>Division</th><th class="center">Agenda</th><th class="center">Period</th><th class="center">Level</th><th class="money-col">Allowance</th><th class="center">Payment Status</th><th class="center">Payment Date</th><th class="center">Transfer Proof</th><th>Payment Remark</th><th class="center">Action</th></tr></thead>
            <tbody>${item.employees.map((employee) => {
              const days = Number(employee.duration || item.duration || 1);
              const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
              const allowance = Number(employee.verifiedAllowance || employee.calculatedAllowance || rate * days);
              const isPaid = employee.paymentStatus === "Paid";
              const agendaNames = (employee.agendas || []).map((agenda) => agenda.name).filter(Boolean);
              const agendas = agendaNames.length ? agendaNames : [item.agendaName || "-"];
              const action = `<button class="action-icon action-edit" type="button" title="Edit Payment" aria-label="Edit Payment" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("edit")}</button>`;
              return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.nik || "-")}</small></td><td><strong>${escapeHtml(employee.division || "-")}</strong><small>${escapeHtml(employee.position || "-")}</small></td><td><div class="sppd-agenda-name-list">${agendas.map((agenda) => `<span>${escapeHtml(agenda)}</span>`).join("")}</div></td><td class="center">${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} Days</small></td><td class="center"><strong>${escapeHtml(employee.level || "-")}</strong></td><td class="money-col"><strong>${formatRupiah(allowance)}</strong></td><td class="center">${statusPill(isPaid ? "Paid" : "Pending")}</td><td class="center">${escapeHtml(employee.paymentDate || "-")}</td><td class="center">${renderSppdFileLink(employee.transferProof)}</td><td>${escapeHtml(employee.paymentRemark || "-")}</td><td class="center"><span class="table-actions">${action}</span></td></tr>`;
            }).join("") || emptyRow(11, "No employees added yet.")}</tbody>
          </table>
        </div>
      </div>
    `;
  }
  return `
    <div class="sppd-review-section">
      <h4>${isPayment ? "Employee Payment" : "Participant Breakdown"}</h4>
      <div class="table-wrap">
        <table class="sppd-data-table sppd-review-participant-table ${isPayment ? "sppd-review-payment-table" : ""} ${isVerification ? "sppd-review-verification-table" : ""}">
          <thead><tr><th>Employee</th><th class="center">Destination</th><th class="center">Assignment</th><th class="center">Agenda</th>${isVerification ? `<th>Bank Account</th><th class="money-col">Calculated</th><th class="money-col">Verified</th><th class="center">Verification</th>` : ""}${isPayment ? `<th>Bank Account</th><th class="money-col">Verified Allowance</th><th class="center">Payment Status</th><th>Payment Date</th><th>Transfer Proof</th>` : `<th class="center">Status</th>`}<th class="center">Action</th></tr></thead>
          <tbody>${item.employees.map((employee) => {
            const days = Number(employee.duration || item.duration || 1);
            const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
            const calculated = Number(employee.calculatedAllowance || rate * days);
            const verified = Number(employee.verifiedAllowance || calculated);
            const isPaid = employee.paymentStatus === "Paid";
            const action = isPayment
              ? `<button class="action-icon ${item.status === "Approved" && item.paymentStatus !== "Paid" ? "action-edit" : "action-view"}" type="button" title="${isPaid ? "View Payment" : "Process Payment"}" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon(isPaid ? "eye" : "upload")}</button>`
              : `<button class="action-icon ${isVerification ? "action-edit" : "action-view"}" type="button" title="${isVerification ? "Verify Employee" : "View Employee"}" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="${isVerification ? "employee" : "detail"}">${icon(isVerification ? "edit" : "eye")}</button>`;
            return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td><td class="center">${escapeHtml(employee.destination || "-")}</td><td class="center">${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} days</small></td><td class="center">${escapeHtml(employee.agendas?.length || 0)} agenda</td>${isVerification ? `<td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="money-col">${formatRupiah(calculated)}</td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td class="center">${statusPill(employee.verificationStatus || "Pending")}</td>` : ""}${isPayment ? `<td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td class="center">${statusPill(isPaid ? "Received" : "Pending")}</td><td>${escapeHtml(employee.paymentDate || "-")}</td><td>${renderSppdFileLink(employee.transferProof)}</td>` : `<td class="center">${sppdEmployeeDetailPill(employee.detailStatus || "Confirmed")}</td>`}<td class="center"><span class="table-actions">${action}</span></td></tr>`;
          }).join("") || emptyRow(isPayment ? 10 : isVerification ? 10 : 6, "No employees added yet.")}</tbody>
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
            return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td><td>${escapeHtml(employee.level || "-")}</td><td>${escapeHtml(employee.destination || "-")}</td><td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="center">${escapeHtml(days)} days</td><td class="money-col">${formatRupiah(rate)}</td><td class="money-col">${formatRupiah(calculated)}</td><td class="money-col"><strong>${formatRupiah(verified)}</strong></td><td>${escapeHtml(employee.verificationRemark || item.remark || "-")}</td></tr>`;
          }).join("") || emptyRow(9, "No verification results yet.")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function getSppdApprovalFlow(item) {
  const current = Array.isArray(item.approvalFlow) ? item.approvalFlow : [];
  const definitions = [
    { role: "BOQ", approver: "Andi Pratama" },
    { role: "Kepala Divisi", approver: "Sinta Maharani" },
    { role: "Kepala Departemen", approver: "Dedi Kurniawan" }
  ];
  item.approvalFlow = definitions.map((definition) => ({
    ...(current.find((row) => row.role === definition.role) || {}),
    ...definition,
    active: true
  }));
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
                    <strong class="${hasApprover ? "" : "is-empty"}">${escapeHtml(approver?.name || row.approver || "No approver selected")}</strong>
                    ${statusPill(hasApprover ? "Selected" : "Not Selected")}
                  </div>
                  <small>${escapeHtml(approver ? `${approver.nik} - ${approver.position} / ${approver.division}` : "Approver belum dipilih")}</small>
                </div>
              </div>
              <button class="action-icon action-view" type="button" title="${approver ? "Change Approver" : "Select Approver"}" aria-label="${approver ? "Change Approver" : "Select Approver"}" data-action="sppd-pick-approver" data-id="${escapeHtml(item.id)}" data-index="${escapeHtml(index)}">${icon("search")}</button>
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
          <h3>Select Approver</h3>
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
                <th>Name</th>
                <th>NIK</th>
                <th>Division</th>
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
                <td><strong>${escapeHtml(employee.division || "-")}</strong><small class="sppd-cell-subtitle">${escapeHtml(employee.position || "-")}</small></td>
                <td class="center">${statusPill(employee.status)}</td>
              </tr>
            `;
          }).join("") || `<tr><td colspan="4"><div class="empty-state compact">No active employees found.</div></td></tr>`}
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
  const approvalDate = item.updatedAt || item.sppdDate || todayIso();
  const rows = activeRows.map((row, index) => [
    row.role,
    row.approver,
    approved ? "Approved" : index === 0 && item.status === "Verified" ? "Waiting" : "Queue",
    approvalDate
  ]);
  return `
    <div class="sppd-review-section">
      <h4>Approval Track</h4>
      <div class="table-wrap"><table class="sppd-data-table sppd-approval-track-table">
        <thead><tr><th>Stage</th><th>Approver</th><th class="center">Status</th><th class="center">Date</th></tr></thead>
        <tbody>${rows.map(([stage, approver, status, date]) => `<tr><td><strong>${escapeHtml(stage)}</strong></td><td><strong>${escapeHtml(approver)}</strong></td><td class="center">${statusPill(status)}</td><td class="center">${escapeHtml(date)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
  `;
}

function renderSppdPaymentSummaryText(item) {
  const total = getSppdTotal(item);
  const paid = item.employees.filter((employee) => employee.paymentStatus === "Paid").reduce((sum, employee) => sum + Number(employee.verifiedAllowance || employee.calculatedAllowance || 0), 0);
  return `<div class="sppd-review-section"><h4>Payment Summary</h4><div class="sppd-review-pairs">${sppdReviewPair("Total Allowance", formatRupiah(total))}${sppdReviewPair("Paid", formatRupiah(paid))}${sppdReviewPair("Unpaid", formatRupiah(Math.max(total - paid, 0)))}${sppdReviewFilePair("Transfer Proof", item.transferProof)}</div></div>`;
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
          return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.level || "-")}</small></td><td>${escapeHtml(getSppdEmployeeBankAccount(employee))}</td><td class="money-col"><strong>${formatRupiah(employee.verifiedAllowance || employee.calculatedAllowance || 0)}</strong></td><td class="center">${statusPill(isPaid ? "Received" : "Pending")}</td><td>${escapeHtml(employee.paymentDate || "-")}</td><td>${renderSppdFileLink(employee.transferProof)}</td><td class="center"><span class="table-actions">${canProcessPayment ? `<button class="action-icon action-edit" type="button" title="${isPaid ? "Edit Payment" : "Process Payment"}" aria-label="${isPaid ? "Edit Payment" : "Process Payment"}" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon(isPaid ? "edit" : "upload")}</button>` : `<button class="action-icon action-view" type="button" title="View Payment" aria-label="View Payment" data-action="sppd-payment-employee" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("eye")}</button>`}</span></td></tr>`;
        }).join("") || emptyRow(7, "No payment records yet.")}</tbody>
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
            <thead><tr><th class="center no-col">No.</th><th>Employee</th><th class="center">Destination</th><th class="center">Assignment</th><th class="center">Verified Allowance</th><th class="center">Payment</th><th class="center">Letter</th><th class="center">Action</th></tr></thead>
            <tbody>${item.employees.map((employee, index) => {
              const days = Number(employee.duration || item.duration || 1);
              const rate = Number(employee.dailyAllowance || getSppdLevelAllowance(employee.level, item) || 0);
              const calculated = Number(employee.calculatedAllowance || rate * days);
              const verified = Number(employee.verifiedAllowance || calculated);
              return `<tr><td class="center no-col">${escapeHtml(index + 1)}</td><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.position || "-")} / ${escapeHtml(employee.division || "-")}</small></td><td class="center">${escapeHtml(employee.destination || "-")}</td><td class="center">${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(days)} days</small></td><td class="center"><strong>${formatRupiah(verified)}</strong></td><td class="center">${statusPill(employee.paymentStatus === "Paid" ? "Received" : "Pending")}</td><td class="center">${statusPill(employee.assignmentLetter === "Created" ? "Created" : "Draft")}</td><td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="View Employee" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="detail">${icon("eye")}</button></span></td></tr>`;
            }).join("") || emptyRow(8, "No employees added yet.")}</tbody>
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
        <button class="btn success" type="button" data-action="sppd-letter-upload" data-id="${escapeHtml(item.id)}">${icon("upload")} Upload Assignment Letter</button>
      </div>
      <div class="table-wrap"><table class="sppd-data-table sppd-letter-assignment-table">
        <thead><tr><th>Document</th><th>Scope</th><th class="center">Letter Status</th><th class="center">Action</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Assignment Letter ${escapeHtml(item.docNo)}</strong><small>${item.assignmentLetterFile || item.attachment ? renderSppdFileLink(item.assignmentLetterFile || item.attachment) : "No assignment letter uploaded"}</small></td>
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
  return `
    <div class="panel sppd-employee-table-panel">
      <div class="panel-header"><div><h2>Employee</h2><small class="panel-kicker">Participant, division, agenda, period, dan level per employee.</small></div></div>
      <div class="panel-body"><div class="table-wrap">
        <table class="sppd-data-table sppd-employee-table sppd-employee-request-table">
          <colgroup><col class="employee-col"><col class="division-col"><col class="agenda-col"><col class="period-col"><col class="level-col"><col class="action-col"></colgroup>
          <thead><tr><th>Employee</th><th>Division</th><th class="center">Agenda</th><th class="center">Period</th><th class="center">Level</th><th class="center">Action</th></tr></thead>
          <tbody>${item.employees.map((employee) => {
            const duration = employee.duration || item.duration || 1;
            const agendaNames = (employee.agendas || []).map((agenda) => agenda.name).filter(Boolean);
            const agendas = agendaNames.length ? agendaNames : [item.agendaName || "-"];
            return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.nik || "-")}</small></td><td><strong>${escapeHtml(employee.division || "-")}</strong><small>${escapeHtml(employee.position || "-")}</small></td><td><div class="sppd-agenda-name-list">${agendas.map((agenda) => `<span>${escapeHtml(agenda)}</span>`).join("")}</div></td><td class="center">${formatSppdPeriodCell(formatSppdEmployeeAssignmentPeriod(employee, item))}<small>${escapeHtml(duration)} Days</small></td><td class="center"><strong>${escapeHtml(employee.level || "-")}</strong></td><td class="center"><span class="table-actions"><button class="action-icon ${editable ? "action-edit" : "action-view"}" type="button" title="${editable ? "Edit Detail" : "View Detail"}" aria-label="${editable ? "Edit Detail" : "View Detail"}" data-action="sppd-employee-drawer" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}" data-mode="${editable ? "employee" : "detail"}">${icon(editable ? "edit" : "eye")}</button></span></td></tr>`;
          }).join("") || emptyRow(6, "No employees added yet.")}</tbody>
        </table>
      </div></div>
    </div>
  `;
}

function renderSppdDocumentsPanel(item) {
  const generated = item.employees.some((employee) => employee.assignmentLetter === "Created");
  const requestDocuments = getSppdAttachmentNames(item).map((name) => ({
    name,
    type: "Invitation / Supporting Document",
    owner: item.requesterName,
    status: item.status === "Draft" ? "Draft" : "Submitted"
  }));
  const paymentDocuments = item.employees
    .filter((employee) => employee.transferProof)
    .map((employee) => ({
      name: employee.transferProof,
      type: "Transfer Proof",
      owner: employee.name,
      status: employee.paymentStatus === "Paid" ? "Received" : "Pending"
    }));
  const letterDocuments = (generated || item.assignmentLetterFile)
    ? [{ name: item.assignmentLetterFile || `Assignment Letter ${item.docNo}.pdf`, type: "Assignment Letter", owner: `${item.employees.length} employee`, status: "Created" }]
    : [];
  return `<div class="panel sppd-documents-panel"><div class="panel-header"><div><h2>Documents</h2><small class="panel-kicker">Request, payment, and assignment letter archive.</small></div></div><div class="panel-body">${renderSppdDocumentSection("Initial Request Documents", requestDocuments, "No initial request attachments.")}${renderSppdDocumentSection("Payment Documents", paymentDocuments, "No payment transfer proof.")}${renderSppdDocumentSection("Assignment Letter Documents", letterDocuments, "No assignment letter uploaded.")}</div></div>`;
}

function renderSppdDocumentSection(title, rows, emptyText) {
  return `<div class="sppd-document-section"><h4>${escapeHtml(title)}</h4><div class="table-wrap"><table class="sppd-data-table"><thead><tr><th>Document</th><th>Type</th><th>Owner / Scope</th><th>Status</th><th class="center">Action</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${renderSppdFileLink(row.name)}</td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.owner)}</td><td>${statusPill(row.status)}</td><td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="Preview" aria-label="Preview" data-action="sppd-doc-preview" data-file="${escapeHtml(row.name)}">${icon("eye")}</button><button class="action-icon action-view" type="button" title="Download" aria-label="Download" data-action="sppd-doc-download" data-file="${escapeHtml(row.name)}">${icon("download")}</button></span></td></tr>`).join("") || emptyRow(5, emptyText)}</tbody></table></div></div>`;
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
          <div class="empty-state">The SPPD dashboard is not available yet.</div>
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
              <td>${sppdStatusPill(getSppdProcess(item))}</td>
              <td>${sppdStatusPill(getSppdStatus(item))}</td>
              <td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="${escapeHtml(actionLabel)}" aria-label="${escapeHtml(actionLabel)}" data-action="detail" data-section="${escapeHtml(section)}" data-id="${escapeHtml(item.id)}">${icon("eye")}</button></span></td>
            </tr>
          `).join("") || emptyRow(10, "No SPPD data found.")}
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
    { key: "assignmentLetter", label: "Assignment Letter" },
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
          ${rows.map((item, index) => {
            const requester = db.employees.find((employee) => employee.id === item.requesterEmployeeId || employee.nik === item.requesterEmployeeId)
              || db.employees.find((employee) => employee.name === item.requesterName);
            const requesterNik = requester?.nik || item.requesterNik || "-";
            const requesterPosition = requester?.position || item.requesterPosition || "-";
            const letterCreated = Boolean(item.employees?.length) && item.employees.every((employee) => employee.assignmentLetter === "Created");
            const letterFile = item.assignmentLetterFile || (letterCreated ? `Assignment Letter ${item.docNo}.pdf` : "");
            const letterContent = letterFile
              ? `<button class="sppd-request-letter-icon is-available" type="button" data-action="sppd-doc-preview" data-file="${escapeHtml(letterFile)}" title="View Assignment Letter" aria-label="View Assignment Letter">${icon("file-text")}</button>`
              : `<span class="sppd-request-letter-icon is-unavailable" title="Assignment letter unavailable" aria-label="Assignment letter unavailable">${icon("file-text")}</span>`;
            return `
            <tr>
              <td class="center no-col">${rowOffset + index + 1}</td>
              <td><strong>${escapeHtml(item.docNo)}</strong><small>${escapeHtml(item.requestDate || item.sppdDate || "-")}</small></td>
              <td><strong>${escapeHtml(item.requesterName || "-")}</strong><small>${escapeHtml(requesterNik)}</small></td>
              <td><strong>${escapeHtml(item.division || item.requesterDivision || requester?.division || "-")}</strong><small>${escapeHtml(requesterPosition)}</small></td>
              <td class="center">${escapeHtml(item.participantsText || getSppdParticipantCount(item))}</td>
              <td class="center sppd-request-letter-cell">${letterContent}</td>
              <td class="center">${sppdStatusPill(item.readableStatus || getSppdStatus(item))}</td>
              <td class="center">
                <span class="table-actions">
                  <button class="action-icon action-view" type="button" title="${escapeHtml(actionLabel)}" aria-label="${escapeHtml(actionLabel)}" data-action="detail" data-section="${escapeHtml(section)}" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
                  ${section === "sppdRequestList" && (item.readableStatus || item.status) === "Draft" ? `<button class="action-icon action-edit" type="button" title="Edit Draft" aria-label="Edit Draft" data-action="edit" data-section="sppdRequestList" data-id="${escapeHtml(item.id)}">${icon("edit")}</button>` : ""}
                </span>
              </td>
            </tr>
          `;
          }).join("") || emptyRow(8, "No SPPD data found.")}
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
  const formatPeriodDate = (date) => {
    const match = String(date).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? `${match[3]} - ${match[2]} - ${match[1]}` : String(date).trim();
  };
  return `<span class="sppd-period-range">${escapeHtml(formatPeriodDate(parts[0]))} s/d ${escapeHtml(formatPeriodDate(parts.slice(1).join(" s/d ")))}</span>`;
}

function formatSppdCompactPeriodCell(value) {
  const text = String(value || "-");
  if (text === "-") return "-";
  const parts = text.split(" s/d ");
  if (parts.length < 2) return escapeHtml(text);
  const getIsoDate = (part) => String(part).trim().match(/\d{4}-\d{2}-\d{2}/)?.[0] || "";
  const startDate = getIsoDate(parts[0]);
  const endDate = getIsoDate(parts.slice(1).join(" s/d "));
  const formatDatePart = (date) => date ? date.split("-").reverse().join(" - ") : "-";
  const days = startDate && endDate ? daysBetweenInclusive(startDate, endDate) : 0;
  return `<span class="sppd-table-period-range"><strong>${escapeHtml(formatDatePart(startDate))} s/d ${escapeHtml(formatDatePart(endDate))}</strong><small>${escapeHtml(days)} Days</small></span>`;
}

function renderSppdDocumentStagePanel(item) {
  const active = getSppdEmployeeTab(item);
  const editable = active === "Verification" || active === "Payment";

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
    Approval: "Status approval dokumen dari approval terkait.",
    Verification: "Review duration, dates, participants, level, and daily allowance.",
    Payment: "Allowance, transfer date, transfer proof, and payment confirmation summary.",
    "Add Cost": "Additional costs recorded after payment as supporting documents.",
    Complete: "Completed document stored in the travel archive."
  }[stage] || "Detail proses SPPD.";
}

function renderSppdFlowPanel(activeStage = "Request") {
  const steps = [
    ["Request", "Draft atau submitted oleh pemohon/PIC"],
    ["Approval", "Keputusan atas dokumen SPPD"],
    ["Verification", "Validasi detail employee, durasi, dan allowance"],
    ["Payment", "Allowance transfer date and transfer proof"],
    ["Add Cost", "Additional travel costs"],
    ["Complete", "Document completed and archived"]
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
          <h2>Add Cost</h2>
          <small class="panel-kicker">Additional travel costs after payment.</small>
        </div>
        <button class="btn success" type="button" data-action="sppd-other-new">${icon("plus")} New Allowance</button>
      </div>
      <div class="panel-body">
        ${renderToolbar("sppdOtherAllowance", rows)}
        <div class="table-wrap">
          <table class="sppd-data-table">
            <thead><tr><th>ID</th><th>SPPD</th><th>Requester</th><th>Type</th><th>Amount</th><th>Status</th><th>Transfer</th><th>Proof</th></tr></thead>
            <tbody>${page.rows.map((item) => `<tr><td>${escapeHtml(item.id)}</td><td>${escapeHtml(item.sppdId)}</td><td>${escapeHtml(item.requesterName)}</td><td>${escapeHtml(item.type)}</td><td>${formatRupiah(item.amount)}</td><td>${statusPill(item.status)}</td><td>${escapeHtml(item.transferDate || "-")}</td><td>${renderSppdFileLink(item.proof)}</td></tr>`).join("") || emptyRow(8, "No additional costs found.")}</tbody>
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
          <tbody>${rows.map((item) => `<tr><td>${escapeHtml(item.scope)}</td><td><strong>${escapeHtml(item.destinationGroup || "-")}</strong></td><td>${escapeHtml(item.mapping || "-")}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(5, "No area / cluster data found.")}</tbody>
        </table>
      </div>
    `;
  }

  if (activeType === "Allowance Rate") {
    return `
      <div class="table-wrap">
        <table class="sppd-data-table sppd-master-rate-table">
          <thead><tr><th>Scope</th><th>Employee Level</th><th>Area 1 / Cluster 1</th><th>Area 2 / Cluster 2</th><th>Area 3</th><th>Status</th><th class="center">Action</th></tr></thead>
          <tbody>${rows.map((item) => `<tr><td>${escapeHtml(item.scope)}</td><td><strong>${escapeHtml(item.level || "-")}</strong></td><td>${formatSppdRate(item.rateOne, item.scope)}</td><td>${formatSppdRate(item.rateTwo, item.scope)}</td><td>${item.scope === "Domestic" ? formatSppdRate(item.rateThree, item.scope) : "-"}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(7, "No allowance rate data found.")}</tbody>
        </table>
      </div>
    `;
  }

  if (activeType === "Duration Rule") {
    return `
      <div class="table-wrap">
        <table class="sppd-data-table sppd-master-duration-table">
          <thead><tr><th>Scope</th><th>Area / Cluster</th><th>Additional Day</th><th>Description</th><th>Status</th><th class="center">Action</th></tr></thead>
          <tbody>${rows.map((item) => `<tr><td>${escapeHtml(item.scope)}</td><td><strong>${escapeHtml(item.areaCluster || "-")}</strong></td><td>${escapeHtml(item.additionalDay || "0")} days</td><td>${escapeHtml(item.description || "-")}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(6, "No duration rules found.")}</tbody>
        </table>
      </div>
    `;
  }

  const label = activeType === "Agenda Type" ? "Agenda Type" : activeType;
  return `
    <div class="table-wrap">
      <table class="sppd-data-table sppd-master-table">
        <thead><tr><th>${escapeHtml(label)}</th><th>Description</th><th>Status</th><th class="center">Action</th></tr></thead>
        <tbody>${rows.map((item) => `<tr><td><strong>${escapeHtml(item.name)}</strong></td><td>${escapeHtml(item.description || "-")}</td><td>${statusPill(item.status)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit" data-action="sppd-master-edit" data-id="${escapeHtml(item.id)}">${icon("edit")}</button></td></tr>`).join("") || emptyRow(4, `No ${label.toLowerCase()} data found.`)}</tbody>
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
  if (section === "sppdCompletedList") return db.sppdRequests.filter((item) => getSppdWorkflowStage(item) === "Complete");
  if (section === "sppdDashboard") return db.sppdRequests;
  if (section === "sppdVerification") return db.sppdRequests.filter((item) => getSppdWorkflowStage(item) === "Verification");
  if (section === "sppdApproval") return db.sppdRequests.filter((item) => getSppdWorkflowStage(item) === "Approval");
  if (section === "sppdPayment") return db.sppdRequests.filter((item) => getSppdWorkflowStage(item) === "Payment");
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
    sppdDashboard: "Manage all SPPD documents in one list and track each workflow stage.",
    sppdRequest: "Create an SPPD document with requester, agenda, employee travel details, and allowance.",
    sppdVerification: "Review and adjust request details before approval.",
    sppdApproval: "Review verified SPPD documents for approval decisions.",
    sppdPayment: "Upload the allowance transfer date and transfer proof.",
    sppdOtherAllowance: "Manage additional expenses related to an SPPD document."
  }[section] || "Official travel SPPD summary.";
}

function sppdStagePill(item) {
  const stage = getSppdWorkflowStage(item);
  return sppdStatusPill(stage === "Complete" ? "Completed" : stage);
}

function renderSppdFileLink(fileName) {
  if (!fileName || fileName === "-") return `<span class="sppd-file-empty">-</span>`;
  return `<span class="sppd-file-link"><button type="button" data-action="sppd-doc-preview" data-file="${escapeHtml(fileName)}" title="Preview ${escapeHtml(fileName)}">${icon("file-text")}<span>${escapeHtml(fileName)}</span></button><button class="sppd-file-download" type="button" data-action="sppd-doc-download" data-file="${escapeHtml(fileName)}" title="Download ${escapeHtml(fileName)}" aria-label="Download ${escapeHtml(fileName)}">${icon("download")}</button></span>`;
}

function getSppdAttachmentNames(item) {
  if (Array.isArray(item?.attachments) && item.attachments.length) return item.attachments.filter(Boolean);
  return item?.attachment ? [item.attachment] : [];
}

function renderSppdFileList(fileNames = []) {
  const names = [...new Set(fileNames.filter(Boolean))];
  if (!names.length) return `<span class="sppd-file-empty">-</span>`;
  return `<div class="sppd-file-list">${names.map((fileName) => renderSppdFileLink(fileName)).join("")}</div>`;
}

function sppdSummaryFileItem(label, fileNames) {
  const names = Array.isArray(fileNames) ? fileNames : [fileNames];
  return `<div class="sppd-summary-item"><span>${escapeHtml(label)}</span>${renderSppdFileList(names)}</div>`;
}

function sppdReviewFilePair(label, fileName) {
  return `<div class="sppd-review-pair"><b>${escapeHtml(label)}</b><span>${renderSppdFileLink(fileName)}</span></div>`;
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
  return `
    <div class="page-grid sppd-page sppd-create-page">
      <div class="panel sppd-hero">
        <div>
          <h2>Create SPPD</h2>
          <small class="panel-kicker">Buat satu dokumen perjalanan dinas dengan beberapa participant dan agenda.</small>
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
  const selectedPic = getSppdSelectedPic(item);
  const requestDateValue = item.sppdDate || todayIso();
  const startDateValue = item.assignmentStartDate || requestDateValue;
  const endDateValue = item.assignmentEndDate || startDateValue;
  const durationValue = daysBetweenInclusive(startDateValue, endDateValue);
  const picDisplay = `${selectedPic?.name || item.requesterName || "-"}${selectedPic?.position || item.requesterPosition ? ` [${selectedPic?.position || item.requesterPosition}]` : ""}`;
  const documentNumberValue = item.docNo && item.docNo !== "Auto" ? item.docNo : getNextSppdDocNo(requestDateValue, item.id);

  return `
    <form class="${escapeHtml(formClass)}" id="sppdForm" novalidate>
      <div class="sppd-document-head">
        <div>
          <small>SPPD Document</small>
          <h3>${escapeHtml(item.docNo)}</h3>
        </div>
        <div class="sppd-document-status">
          ${sppdStagePill(item)}
          ${statusPill(item.paymentStatus)}
        </div>
      </div>

      <div class="sppd-drawer-section sppd-create-detail-section">
        <div class="sppd-section-title"><h3>Detail Information</h3></div>
        <div class="sppd-detail-information-grid">
          <div class="sppd-detail-information-column">
            <label class="sppd-detail-information-row sppd-request-date-row">
              <span>Request Date <b>*</b></span>
              <div class="sppd-request-date-control">
                <input type="date" name="sppdDate" value="${escapeHtml(requestDateValue)}" readonly required>
                <span class="sppd-doc-number-label">${escapeHtml(documentNumberValue)}</span>
                <input type="hidden" name="docNo" value="${escapeHtml(documentNumberValue)}">
              </div>
            </label>
            <label class="sppd-detail-information-row sppd-agenda-field">
              <span>Agenda <b>*</b></span>
              <textarea name="agendaName" placeholder="Tuliskan agenda perjalanan" required>${escapeHtml(item.agendaName)}</textarea>
            </label>
            <div class="sppd-detail-information-row">
              <span>Date <b>*</b></span>
              <div class="sppd-date-range-control">
                <input type="date" name="assignmentStartDate" value="${escapeHtml(startDateValue)}" required>
                <span>to</span>
                <input type="date" name="assignmentEndDate" value="${escapeHtml(endDateValue)}" required>
                <strong data-sppd-duration>${escapeHtml(durationValue)} Day(s)</strong>
              </div>
            </div>
            <label class="sppd-detail-information-row">
              <span>Place <b>*</b></span>
              <input name="agendaLocation" value="${escapeHtml(item.agendaLocation)}" placeholder="Contoh: Medan, Sumatera Utara" required>
            </label>
            <label class="sppd-detail-information-row sppd-remark-field">
              <span>Remark</span>
              <textarea name="remark" placeholder="Travel notes">${escapeHtml(item.remark)}</textarea>
            </label>
          </div>
          <div class="sppd-detail-information-column">
            <div class="sppd-detail-information-row">
              <span>Agenda Type <b>*</b></span>
              <div class="sppd-agenda-type-control">
                ${renderSppdAgendaTypeSelect("agendaType", item.agendaType)}
                <strong>(${escapeHtml(selectedEmployees.length)} Participants)</strong>
              </div>
            </div>
            <div class="sppd-detail-information-row">
              <span>Region <b>*</b></span>
              ${renderSppdMasterSelect("region", "Region", item.region, "Select Region")}
            </div>
            <div class="sppd-detail-information-row">
              <span>Area <b>*</b></span>
              ${renderSppdAreaSelect("area", item.area, item.cluster)}
            </div>
            <label class="sppd-detail-information-row">
              <span>PIC / Requester <b>*</b></span>
              <input value="${escapeHtml(picDisplay)}" readonly>
            </label>
            <label class="sppd-detail-information-row">
              <span>Division <b>*</b></span>
              <input name="requesterDivision" value="${escapeHtml(selectedPic?.division || item.requesterDivision)}" readonly required>
            </label>
            <label class="sppd-detail-information-row sppd-attachment-field">
              <span>Attachment</span>
              <div>
                <input type="file" name="attachmentFile" accept=".pdf,.png,.jpg,.jpeg" multiple>
                ${getSppdAttachmentNames(item).length ? `<div class="form-hint sppd-current-files"><span>Current:</span>${renderSppdFileList(getSppdAttachmentNames(item))}</div>` : ""}
              </div>
            </label>
          </div>
          <input type="hidden" name="requesterEmployeeId" value="${escapeHtml(selectedPic?.id || item.requesterEmployeeId || "")}">
          <input type="hidden" name="requesterName" value="${escapeHtml(selectedPic?.name || item.requesterName)}">
        </div>
      </div>

      <div class="sppd-drawer-section sppd-create-participant-section">
        <div class="sppd-section-head">
          <div class="sppd-section-title"><h3>Participant</h3><small>${escapeHtml(selectedEmployees.length)} participant dipilih</small></div>
          <button class="btn primary" type="button" data-action="sppd-add-employee" data-id="${escapeHtml(item.id || "draft")}">${icon("user-plus")} Add Employee</button>
        </div>
        ${renderSppdCreateEmployeeList(selectedEmployees)}
      </div>

      <div class="drawer-actions sppd-form-actions">
        <div class="sppd-form-actions-left">
          <button class="btn neutral" type="button" data-action="sppd-create-cancel">Cancel</button>
        </div>
        <div class="sppd-form-actions-right">
          <button class="btn draft" type="submit" data-action="save-sppd" data-status="Draft">Save Draft</button>
          <button class="btn success" type="submit" data-action="save-sppd" data-status="Submitted">Submit</button>
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

  form.querySelectorAll("[aria-invalid='true']").forEach((input) => input.removeAttribute("aria-invalid"));
  form.querySelectorAll(".sppd-field-error").forEach((message) => message.remove());

  if (Number(step) === 1) {
    const requiredFields = ["agendaName", "sppdDate", "agendaType", "region", "area", "requesterDivision", "assignmentStartDate", "assignmentEndDate", "agendaLocation"];
    const invalidFields = requiredFields.filter((name) => !String(data[name] || "").trim());
    invalidFields.forEach((name) => markSppdFieldInvalid(form.querySelector(`[name="${name}"]`), "Field ini wajib diisi."));
    if (!data.requesterName || invalidFields.length) {
      showToast("Complete all required fields in Detail Information.");
      form.querySelector("[aria-invalid='true']")?.focus();
      return false;
    }
    if (data.assignmentEndDate < data.assignmentStartDate) {
      markSppdFieldInvalid(form.querySelector('[name="assignmentEndDate"]'), "End Date tidak boleh lebih awal dari Start Date.");
      showToast("End Date tidak boleh lebih awal dari Start Date.");
      return false;
    }
  }

  if (Number(step) === 2 && appState.view === "add" && !appState.selectedId && !appState.sppdDraftEmployeeIds.length) {
    showToast("Add at least one employee first.");
    return false;
  }

  return true;
}

function markSppdFieldInvalid(input, message) {
  if (!input) return;
  input.setAttribute("aria-invalid", "true");
  const error = document.createElement("small");
  error.className = "sppd-field-error";
  error.textContent = message;
  const host = input.closest(".sppd-detail-information-row") || input.parentElement;
  host?.appendChild(error);
}

function validateSppdParticipantSection() {
  const item = getSppdCreateRequestItem();
  const employees = getSppdDrawerEmployees(item || { employees: [] });
  if (!employees.length) {
    showToast("Add at least one participant before submitting.");
    document.querySelector(".sppd-create-participant-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  const invalid = employees.some((employee) => !hasCompleteSppdDraftEmployeeDetail(getSppdDraftEmployeeDetail(employee.rowId || employee.id)));
  if (appState.view === "add" && invalid) {
    showToast("Complete the assignment and agenda for every participant.");
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
  const attachmentFiles = [...(form.querySelector('[name="attachmentFile"]')?.files || [])];
  attachmentFiles.forEach(registerSppdFile);
  const requester = db.employees.find((employee) => employee.id === data.requesterEmployeeId || employee.nik === data.requesterEmployeeId);
  const [area, cluster] = String(data.area || "").split("::");

  Object.assign(item, {
    requesterEmployeeId: requester?.id || data.requesterEmployeeId || item.requesterEmployeeId || "",
    requesterName: data.requesterName || requester?.name || item.requesterName || "",
    requesterDivision: data.requesterDivision || requester?.division || item.requesterDivision || "",
    requesterPosition: requester?.position || item.requesterPosition || "",
    agendaName: data.agendaName || item.agendaName || "",
    agendaType: data.agendaType || item.agendaType || "",
    region: data.region || item.region || "",
    area: area || item.area || "",
    cluster: cluster || item.cluster || "",
    agendaLocation: data.agendaLocation || item.agendaLocation || "",
    sppdDate: data.sppdDate || item.sppdDate || todayIso(),
    assignmentStartDate: data.assignmentStartDate || item.assignmentStartDate || "",
    assignmentEndDate: data.assignmentEndDate || item.assignmentEndDate || "",
    attachments: attachmentFiles.length ? attachmentFiles.map((file) => file.name) : getSppdAttachmentNames(item),
    attachment: attachmentFiles[0]?.name || item.attachment || "",
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
                <th>Division</th>
                <th>Date</th>
                <th>Remark</th>
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
                    <td><strong>${escapeHtml(employee.name)}</strong><small class="sppd-cell-subtitle">${escapeHtml(employee.nik || "-")}</small></td>
                    <td><strong>${escapeHtml(employee.division || "-")}</strong><small class="sppd-cell-subtitle">${escapeHtml(employee.position || "-")}</small></td>
                    <td>${formatSppdPeriodCell(period)}<small class="sppd-cell-subtitle">${escapeHtml(employee.duration || 1)} day(s)</small></td>
                    <td>${escapeHtml(employee.agendas?.[0]?.remark || employee.agendas?.[0]?.name || "-")}</td>
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
      ` : `<div class="empty-state compact">No employees added. Click Add Employee to select travel participants.</div>`}
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
          ${sppdReviewFilePair("Attachment", item.attachment)}
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
                    <td>${formatSppdPeriodCell(period)}<small>${escapeHtml(detail.duration || 1)} days</small></td>
                    <td class="center">${escapeHtml(detail.agendas?.length || 0)} agenda</td>
                    <td class="center"><span class="table-actions"><button class="action-icon action-view" type="button" title="View Employee Detail" aria-label="View Employee Detail" data-action="sppd-view-draft-employee" data-employee-id="${escapeHtml(employee.id)}">${icon("eye")}</button></span></td>
                  </tr>
                `;
              }).join("") || emptyRow(6, "No employees available for review.")}
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
      ${field("Employee Level", `<input name="levelName" value="${escapeHtml(item.name || "")}" placeholder="Example: Head of Division" required>`, true)}
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
      ${field("Description", `<textarea name="description" required placeholder="Example: Add 1 day for travel to a specific area">${escapeHtml(item.value || "")}</textarea>`, true)}
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

function openSppdOtherAllowanceModal(sppdId = "", employeeId = "") {
  const docId = sppdId || String(appState.selectedId || "").split("::")[0];
  appState.modal = { type: "sppdOtherAllowance", sppdId: docId, employeeId };
  renderModal();
}

function renderSppdOtherAllowanceModal() {
  const item = findSppdRequest(appState.modal.sppdId);
  const employee = item?.employees.find((row) => row.id === appState.modal.employeeId);
  return `
    <form class="modal" id="sppdOtherAllowanceForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div><h3>Add Cost</h3><small class="modal-kicker">${escapeHtml(employee ? `${employee.name} - ${employee.nik}` : item?.docNo || "")}</small></div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body sppd-add-cost-modal-body">
        <input type="hidden" name="sppdId" value="${escapeHtml(item?.id || appState.modal.sppdId || "")}">
        <input type="hidden" name="employeeId" value="${escapeHtml(employee?.id || "")}">
        <div class="sppd-add-cost-total" aria-live="polite">
          <span>Total Cost</span>
          <strong data-role="sppd-add-cost-total">Rp 0</strong>
        </div>
        <div class="table-wrap sppd-add-cost-entry-table-wrap">
          <table class="sppd-data-table sppd-add-cost-entry-table">
            <thead><tr><th>Type</th><th>Amount</th><th>Receipt</th><th>Remark</th><th class="center">Action</th></tr></thead>
            <tbody class="sppd-add-cost-entry-list">${renderSppdAddCostEntry(0)}</tbody>
          </table>
        </div>
        <button class="btn neutral sppd-add-cost-row-button" type="button" data-action="sppd-add-cost-row">${icon("plus")} Add Type</button>
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
  return `
    <form class="modal sppd-payment-action-modal" id="sppdEmployeePaymentForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Payment Allowance</h3>
          <small class="modal-kicker">${escapeHtml(employee.name)} - ${escapeHtml(employee.nik || "-")}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body form-grid sppd-payment-action-fields">
        ${field("Payment Date", `<input type="date" name="paymentDate" value="${escapeHtml(employee.paymentDate || todayIso())}" required>`, true)}
        ${field("Transfer Proof", `<input type="file" name="transferProofFile" accept=".pdf,.png,.jpg,.jpeg">`, true)}
        ${employee.transferProof ? `<div class="form-hint">Current: ${renderSppdFileLink(employee.transferProof)}</div>` : ""}
        ${field("Payment Remark", `<textarea name="paymentRemark" placeholder="Enter payment notes">${escapeHtml(employee.paymentRemark || "")}</textarea>`, false)}
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="submit" data-action="save-sppd-employee-payment" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">Save Payment</button>
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
          }).join("") || `<div class="empty-state compact">Add another employee first.</div>`}
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
  syncSppdPickerSelectAllState();
}

function renderSppdEmployeePickerModal() {
  const id = appState.modal?.id || "draft";
  const mode = appState.modal?.mode || "participants";
  const isPicMode = mode === "pic";
  const isSingleEmployeeMode = isPicMode || mode === "draftRowEmployee";
  const item = id !== "draft" ? findSppdRequest(id) : null;
  const selectedNiks = new Set(item?.employees.map((employee) => employee.nik) || []);
  const selectedIds = new Set(appState.sppdEmployeePickerIds || []);
  const activeEmployees = db.employees.filter((employee) => employee.status === "Active");
  const allEmployeesSelected = !isSingleEmployeeMode && activeEmployees.length > 0 && activeEmployees.every((employee) => selectedIds.has(employee.id) || selectedNiks.has(employee.nik));
  return `
    <div class="modal sppd-employee-picker" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>${isPicMode ? "Select PIC / Requester" : mode === "draftRowEmployee" ? "Edit Employee" : "Add Employee"}</h3>
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
          </div>`}
        </div>
        <div class="sppd-picker-list table-wrap">
          <table class="sppd-data-table sppd-picker-table">
            <thead>
              <tr>
                <th class="center">${isSingleEmployeeMode ? "" : `<input type="checkbox" data-action="sppd-picker-toggle-all" aria-label="Select all employees" title="Select / unselect all" ${allEmployeesSelected ? "checked" : ""}>`}</th>
                <th>Name</th>
                <th>NIK</th>
                <th>Division</th>
                <th class="center">Status</th>
              </tr>
            </thead>
            <tbody>
          ${activeEmployees.map((employee) => {
            const disabled = !item && false;
            const checked = selectedIds.has(employee.id) || selectedNiks.has(employee.nik);
            const searchText = `${employee.name} ${employee.nik} ${employee.position} ${employee.division} ${employee.status}`.toLowerCase();
            return `
              <tr class="sppd-picker-row" data-search-text="${escapeHtml(searchText)}" data-action="sppd-toggle-picker-row">
                <td class="center"><input type="${isSingleEmployeeMode ? "radio" : "checkbox"}" name="${isSingleEmployeeMode ? "sppdSingleEmployeePicker" : ""}" data-action="sppd-toggle-picker-employee" data-employee-id="${escapeHtml(employee.id)}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}></td>
                <td><strong>${escapeHtml(employee.name)}</strong></td>
                <td>${escapeHtml(employee.nik)}</td>
                <td><strong>${escapeHtml(employee.division || "-")}</strong><small class="sppd-cell-subtitle">${escapeHtml(employee.position || "-")}</small></td>
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
        <button class="btn success" type="button" data-action="sppd-apply-employee-picker" data-id="${escapeHtml(id)}">${icon("check")} ${isPicMode ? "Select PIC" : mode === "draftRowEmployee" ? "Save Employee" : "Add Selected"}</button>
      </div>
    </div>
  `;
}

function renderSppdMasterSelect(name, type, selected = "", placeholder = "Select data") {
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
      <option value="">Select Agenda Type</option>
      ${rows.map((item) => `<option value="${escapeHtml(item.name)}" ${item.name === selected ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
      <option value="Lainnya" ${isOther || selected === "Lainnya" ? "selected" : ""}>Lainnya</option>
    </select>
  `;
}

function renderSppdAreaSelect(name, selectedArea = "", selectedCluster = "") {
  const rows = db.sppdMaster.filter((item) => item.type === "Area / Cluster" && item.status === "Active");
  return `
    <select name="${escapeHtml(name)}">
      <option value="">Select Area / Cluster</option>
      ${rows.map((item) => {
        const value = `${item.name}::${item.value}`;
        const selected = item.name === selectedArea || item.value === selectedCluster || value === selectedArea;
        return `<option value="${escapeHtml(value)}" ${selected ? "selected" : ""}>${escapeHtml(item.name)} - ${escapeHtml(item.value)}</option>`;
      }).join("")}
    </select>
  `;
}

function renderSppdEmployeeSelect(name, selectedNik = "", placeholder = "Select Employee") {
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
    const type = ["Luar Negeri", "International"].includes(item.region) ? "Allowance LN" : "Allowance DN";
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
  const scope = ["Luar Negeri", "International"].includes(region) ? "International" : "Domestic";
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
  const scope = ["Luar Negeri", "International"].includes(item.region) ? "International" : "Domestic";
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
  if (["Luar Negeri", "International"].includes(item.region)) return 2;
  const areaNeedsExtra = ["Area 2", "Area 3"].includes(item.area);
  const locationNeedsExtra = /pacitan|banyuwangi|sumenep/i.test(item.agendaLocation || "");
  return areaNeedsExtra || locationNeedsExtra ? 1 : 0;
}

function getSppdDurationCalculationNote(item) {
  const base = getSppdAssignmentBaseDays(item) || Number(item.duration || 1);
  const extra = getSppdTravelExtraDays(item);
  const total = base + extra;
  const rule = ["Luar Negeri", "International"].includes(item.region)
    ? "International +2 travel days"
    : extra
      ? "Domestic +1 day for a special area/location"
      : "Domestic based on assignment hours";
  return `${base} effective days + ${extra} travel days = ${total} days (${rule})`;
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
  const isVerification = appState.section === "sppdVerification" || item.status === "In Verification" || appState.sppdDetailTab[item.id] === "Verification";

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

      ${editable ? `<div class="drawer-actions"><button class="btn success" type="button" data-action="sppd-save-employee">${icon(isVerification ? "check" : "save")} ${isVerification ? "Verify" : "Save Employee"}</button></div>` : ""}
    </form>
  `;
}

function renderSppdEmployeeDrawerDetail(item, employee, editable, stage) {
  const duration = getSppdEmployeeEffectiveDuration(item, employee);
  const calculated = Number(employee.dailyAllowance || 0) * Number(duration || 0);
  const verified = employee.verifiedAllowance || calculated;
  const bankAccount = getSppdEmployeeBankAccount(employee);
  const showFinance = ["sppdVerification", "sppdApproval", "sppdPayment"].includes(appState.section) || item.status !== "Draft";
  const startDate = employee.assignmentStartDate || item.assignmentStartDate || item.sppdDate || "-";
  const endDate = employee.assignmentEndDate || item.assignmentEndDate || startDate;
  const agendas = (employee.agendas || []).map((agenda) => agenda.name).filter(Boolean);
  const agendaNames = agendas.length ? agendas : [item.agendaName || "-"];
  const agendaType = employee.agendas?.[0]?.type || item.agendaType || "-";
  const region = employee.region || item.region || "-";
  const area = [employee.area || item.area, employee.cluster || item.cluster].filter(Boolean).join(" - ") || "-";
  const assignmentInformation = editable ? `
    <div class="sppd-drawer-section">
      <h3>Assignment Information</h3>
      <div class="form-grid sppd-verification-assignment-form">
        ${field("Date", `<div class="sppd-assignment-date-range"><input type="date" name="employeeStartDate" value="${escapeHtml(startDate)}"><span>to</span><input type="date" name="employeeEndDate" value="${escapeHtml(endDate)}"><small data-role="employee-duration-label">${escapeHtml(duration)} Day(s)</small></div>`, false)}
        ${field("Agenda", `<textarea name="employeeAgendaName">${escapeHtml(agendaNames.join("\n"))}</textarea>`, false)}
        ${field("Agenda Type", renderSppdAgendaTypeSelect("employeeAgendaType", agendaType), false)}
        ${field("Region", renderSppdMasterSelect("employeeRegion", "Region", region === "-" ? "" : region, "Select Region"), false)}
        ${field("Area", renderSppdAreaSelect("employeeAreaCluster", employee.area || item.area || "", employee.cluster || item.cluster || ""), false)}
        ${field("Level", renderSppdLevelSelect("employeeLevel", employee.level || "Pelaksana"), false)}
      </div>
    </div>
  ` : `
    <div class="sppd-drawer-section sppd-employee-view-section">
      <h3>Assignment Information</h3>
      <div class="sppd-employee-view-summary">
        <div class="sppd-employee-view-row sppd-employee-date-row"><span>Date</span><div><strong>${escapeHtml(formatDate(startDate))}</strong><b>to</b><strong>${escapeHtml(formatDate(endDate))}</strong><small>${escapeHtml(duration)} Day(s)</small></div></div>
        <div class="sppd-employee-view-row sppd-employee-agenda-row"><span>Agenda</span><div class="sppd-employee-view-agendas">${agendaNames.map((agenda) => `<em>${escapeHtml(agenda)}</em>`).join("")}</div></div>
        <div class="sppd-employee-view-row"><span>Agenda Type</span><strong>${escapeHtml(agendaType)}</strong></div>
        <div class="sppd-employee-view-row"><span>Region</span><strong>${escapeHtml(region)}</strong></div>
        <div class="sppd-employee-view-row"><span>Area</span><strong>${escapeHtml(area)}</strong></div>
        <div class="sppd-employee-view-row"><span>Level</span><strong>${escapeHtml(employee.level || "-")}</strong></div>
      </div>
    </div>
  `;

  if (!editable) return assignmentInformation;

  return `
    ${assignmentInformation}
    ${showFinance ? `
      <div class="sppd-drawer-section">
        <h3>Allowance Verification</h3>
        ${editable ? `
          <div class="form-grid">
            ${field("Master Rate", `<input data-role="employee-master-rate" value="${escapeHtml(`${formatRupiah(employee.dailyAllowance || 0)} / day`)}" disabled>`, false)}
            ${field("Effective Days", `<input data-role="employee-effective-days" value="${escapeHtml(`${duration} days`)}" disabled>`, false)}
            ${field("Calculated", `<input data-role="employee-calculated-allowance" value="${escapeHtml(formatRupiah(calculated))}" disabled>`, false)}
            ${field("Verified Allowance", `<input type="number" min="0" name="employeeVerifiedAllowance" data-role="employee-verified-allowance" value="${escapeHtml(verified)}">`, false)}
            ${field("Verified Bank Account", `<input name="employeeVerifiedBankAccount" value="${escapeHtml(bankAccount)}" placeholder="Contoh: BCA ****1234">`, false)}
            ${field("Verification Remark", `<textarea name="employeeVerificationRemark">${escapeHtml(employee.verificationRemark || "")}</textarea>`, false)}
          </div>
        ` : `
          <div class="detail-grid">
            ${detailItem("Master Rate", `${formatRupiah(employee.dailyAllowance || 0)} / day`)}
            ${detailItem("Effective Days", `${duration} days`)}
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
          <p>Select employees to add to the SPPD document.</p>
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
        `).join("") || `<div class="empty-state">All employees have already been added to this document.</div>`}
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
          ${detailItem("Transfer Proof", renderSppdFileLink(item.transferProof))}
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
  if (active === "Verification") return renderSppdVerificationTab(item, editable, stage);
  if (active === "Approval") return renderSppdApprovalTab(item);
  if (active === "Payment") return renderSppdPaymentTab(item, editable);
  if (active === "Complete") return renderSppdCompletedTab(item);
  if (active === "Add Cost") return renderSppdOtherAllowanceTab(item);
  return renderSppdRequestTab(item, editable, stage);
}

function renderSppdRequestTab(item, editable, stage) {
  return `
    <div class="sppd-tab-body">
      <div class="sppd-stage-content">
        <h4>Request Document</h4>
        <div>
          <span><small>Requester/PIC</small><strong>${escapeHtml(item.requesterName)} - ${escapeHtml(item.requesterDivision)}</strong></span>
          <span><small>Agenda</small><strong>${escapeHtml(item.agendaName)} / ${escapeHtml(item.agendaDate)}</strong></span>
          <span><small>Peserta</small><strong>${escapeHtml(item.employees.length)} employee</strong></span>
        </div>
      </div>
      <div class="sppd-stage-grid">
        ${sppdMetaTile("Lokasi / Jam", `${item.agendaLocation} / ${item.agendaTime || "-"}`)}
        ${sppdMetaTile("Type / Region", `${item.agendaType || "-"} / ${item.region || "-"}`)}
        ${sppdMetaTile("SPPD Date", item.sppdDate || "-")}
        ${sppdMetaFileTile("Attachment", item.attachment)}
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
          <span><small>Verification Focus</small><strong>Duration, remarks, participants, area, level, and total daily allowance</strong></span>
          <span><small>Source Document</small><strong>${escapeHtml(item.docNo)}</strong></span>
          <span><small>Status</small><strong>${escapeHtml(item.status)}</strong></span>
        </div>
      </div>
      <div class="form-grid">
        ${field("Agenda Date", `<input type="date" name="agendaDate" value="${escapeHtml(item.agendaDate)}">`, false)}
        ${field("SPPD Date", `<input type="date" name="sppdDate" value="${escapeHtml(item.sppdDate)}">`, false)}
        ${field("Mulai Penugasan", `<input type="date" name="assignmentStartDate" value="${escapeHtml(item.assignmentStartDate || item.sppdDate || "")}">`, false)}
        ${field("Jam Mulai", `<input type="time" name="assignmentStartTime" value="${escapeHtml(item.assignmentStartTime || item.agendaTime || "08:00")}">`, false)}
        ${field("Selesai Penugasan", `<input type="date" name="assignmentEndDate" value="${escapeHtml(item.assignmentEndDate || item.sppdDate || "")}">`, false)}
        ${field("Jam Selesai", `<input type="time" name="assignmentEndTime" value="${escapeHtml(item.assignmentEndTime || "18:00")}">`, false)}
        ${field("Durasi Sistem", `<input name="duration" value="${escapeHtml(getSppdEffectiveDuration(item))}" readonly>`, false)}
        ${field("Override Durasi", `<input type="number" min="1" name="durationOverride" value="" placeholder="${escapeHtml(item.duration)}">`, false)}
        ${field("Region", renderSppdMasterSelect("region", "Region", item.region, "Select Region"), false)}
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
              <th>Name</th>
              <th>Position / Division</th>
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
                  <td>${escapeHtml(item.duration)} days</td>
                  <td><input name="dailyAllowance_${escapeHtml(employee.id)}" value="${escapeHtml(allowance)}"></td>
                  <td class="money-col"><strong>${formatRupiah(allowance * Number(item.duration || 0))}</strong></td>
                </tr>
              `;
            }).join("") || emptyRow(6, "No employees added yet.")}
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
        ${detailItem("Transfer Proof", renderSppdFileLink(item.transferProof))}
      </div>
      <div class="form-grid">
        ${field("Transfer Date", `<input type="date" name="transferDate" value="${escapeHtml(item.transferDate)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Transfer Proof", `<input type="file" name="transferProofFile" accept=".pdf,.png,.jpg,.jpeg" ${editable ? "" : "disabled"}>`, false)}
        ${item.transferProof ? `<div class="form-hint">Current: ${renderSppdFileLink(item.transferProof)}</div>` : ""}
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
          <span><small>Document Status</small><strong>${item.paymentStatus === "Paid" ? "Completed" : "Not completed"}</strong></span>
          <span><small>Total Allowance</small><strong>${formatRupiah(getSppdTotal(item))}</strong></span>
          <span><small>Transfer Proof</small><strong>${renderSppdFileLink(item.transferProof)}</strong></span>
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
        <h3>Add Cost</h3>
        <button class="btn neutral" type="button" data-action="sppd-other-new">${icon("plus")} Add Allowance</button>
      </div>
      ${renderSppdOtherAllowanceTable(rows)}
    </div>
  `;
}

function renderSppdAddCostEntry(index) {
  return `
    <tr class="sppd-add-cost-entry" data-cost-index="${escapeHtml(index)}">
      <td><select name="type_${index}" aria-label="Type"><option>Transport</option><option>Hotel</option><option>Meals / Client Dinner</option><option>Akomodasi / Hotel</option><option>Lainnya</option></select></td>
      <td><input type="number" min="0" name="amount_${index}" placeholder="0" aria-label="Amount" data-action="sppd-cost-amount" required></td>
      <td><input type="file" name="proofFile_${index}" accept=".pdf,.png,.jpg,.jpeg" aria-label="Receipt" required></td>
      <td><input name="remark_${index}" placeholder="Notes" aria-label="Remark"></td>
      <td class="center">${index ? `<button class="action-icon danger" type="button" title="Remove" aria-label="Remove" data-action="sppd-remove-cost-row">${icon("trash")}</button>` : `<span class="sppd-add-cost-action-placeholder" aria-hidden="true"></span>`}</td>
    </tr>
  `;
}

function addSppdCostEntry() {
  const list = document.querySelector("#sppdOtherAllowanceForm .sppd-add-cost-entry-list");
  if (!list) return;
  const indexes = [...list.querySelectorAll(".sppd-add-cost-entry")].map((row) => Number(row.dataset.costIndex) || 0);
  const index = indexes.length ? Math.max(...indexes) + 1 : 0;
  list.insertAdjacentHTML("beforeend", renderSppdAddCostEntry(index));
  renderIcons(list.lastElementChild);
  updateSppdAddCostTotal();
}

function removeSppdCostEntry(button) {
  button?.closest(".sppd-add-cost-entry")?.remove();
  updateSppdAddCostTotal();
}

function updateSppdAddCostTotal() {
  const form = document.querySelector("#sppdOtherAllowanceForm");
  const totalElement = form?.querySelector('[data-role="sppd-add-cost-total"]');
  if (!form || !totalElement) return;
  const total = [...form.querySelectorAll('.sppd-add-cost-entry input[name^="amount_"]')]
    .reduce((sum, input) => sum + Number(input.value || 0), 0);
  totalElement.textContent = formatRupiah(total);
}

function openSppdConfirmAction(payload) {
  appState.modal = { type: "sppdConfirmAction", ...payload };
  renderModal();
}

function renderSppdConfirmActionModal() {
  const action = appState.modal?.action;
  const status = appState.modal?.status;
  const content = {
    submitRequest: ["Submit SPPD?", "Make sure Detail Information and all participants are correct.", "Submit", "success"],
    paid: ["Confirm payment?", "All participants will be marked as having received their allowance.", "Confirm Paid", "success"],
    complete: ["Complete SPPD?", "The document will be moved to Completed and can no longer be edited.", "Complete", "success"],
    removeParticipant: ["Remove participant?", "Assignment dan agenda participant ini akan dihapus dari draft.", "Remove", "danger"],
    status: status === "Approved"
      ? ["Approve SPPD?", "The document will proceed to Verification.", "Approve", "success"]
      : status === "Verified"
        ? ["Submit Verification?", "Hasil verification akan diteruskan ke tahap Payment.", "Submit", "success"]
        : status === "Draft" || status === "Submitted"
          ? ["Return for revision?", "The document will return to the previous stage for revision.", "Return", "danger"]
          : ["Continue process?", "Status dokumen akan diperbarui.", "Continue", "success"]
  }[action] || ["Confirm action?", "Periksa kembali data sebelum melanjutkan.", "Continue", "success"];
  return `<div class="modal small sppd-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="sppdConfirmTitle"><div class="modal-header"><h3 id="sppdConfirmTitle">${escapeHtml(content[0])}</h3><button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button></div><div class="modal-body"><div class="sppd-confirm-content"><span>${icon("alert-circle")}</span><p>${escapeHtml(content[1])}</p></div></div><div class="modal-footer"><button class="btn neutral" type="button" data-action="close-modal">Cancel</button><button class="btn ${escapeHtml(content[3])}" type="button" data-action="sppd-confirm-action">${escapeHtml(content[2])}</button></div></div>`;
}

function executeSppdConfirmedAction() {
  const modal = { ...appState.modal };
  appState.modal = null;
  renderModal();
  if (modal.action === "submitRequest") {
    const button = document.querySelector('[data-action="save-sppd"][data-status="Submitted"]');
    setSppdButtonBusy(button, "Submitting...");
    saveSppdRequest("Submitted");
  } else if (modal.action === "status") {
    collectSppdStageFields(modal.id);
    updateSppdStatus(modal.id, modal.status);
  } else if (modal.action === "paid") {
    collectSppdStageFields(modal.id);
    markSppdPaid(modal.id);
  } else if (modal.action === "complete") {
    completeSppdRequest(modal.id);
  } else if (modal.action === "removeParticipant") {
    appState.sppdDraftEmployeeIds = appState.sppdDraftEmployeeIds.filter((id) => id !== modal.employeeId);
    delete appState.sppdDraftEmployeeDetails[modal.employeeId];
    render();
  }
}

function setSppdButtonBusy(button, label = "Processing...") {
  if (!button || button.disabled) return;
  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  button.innerHTML = `${icon("clock")} ${escapeHtml(label)}`;
}

function renderSppdOtherAllowanceTabView(item) {
  const rows = db.sppdOtherAllowances.filter((row) => row.sppdId === item.id);
  return `
    <div class="panel sppd-stage-view-panel">
      <div class="panel-body sppd-stage-view">
        <div class="sppd-review-section">
          <div class="sppd-section-head">
            <h4>Employee Add Cost</h4>
          </div>
          ${renderSppdEmployeeAddCostTable(item, rows)}
        </div>
      </div>
    </div>
  `;
}

function renderSppdEmployeeAddCostTable(item, rows) {
  return `
    <div class="table-wrap sppd-add-cost-table-wrap">
      <table class="sppd-data-table sppd-employee-add-cost-table">
        <colgroup><col class="employee-col"><col class="division-col"><col class="agenda-col"><col class="amount-col"><col class="status-col"><col class="proof-col"><col class="remark-col"><col class="action-col"></colgroup>
        <thead><tr><th>Employee</th><th>Division</th><th>Agenda</th><th class="center">Total Amount</th><th class="center">Payment Status</th><th class="center">Transfer Proof</th><th>Payment Remark</th><th class="center">Action</th></tr></thead>
        <tbody>${item.employees.map((employee) => {
          const employeeRows = rows.filter((row) => row.employeeId === employee.id || (!row.employeeId && row.requesterName === employee.name));
          const totalCost = employeeRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
          const agendaNames = (employee.agendas || []).map((agenda) => agenda.name).filter(Boolean);
          const renderCostValues = (renderer) => employeeRows.length ? `<div class="sppd-cost-value-list">${employeeRows.map(renderer).join("")}</div>` : `<span class="sppd-file-empty">-</span>`;
          const nominalContent = employeeRows.length
            ? `<strong class="sppd-cost-total-value">${formatRupiah(totalCost)}</strong>`
            : `<span class="sppd-file-empty">-</span>`;
          const transferProof = (row) => row.proof
            ? `<span class="sppd-cost-proof-actions"><button type="button" data-action="sppd-doc-preview" data-file="${escapeHtml(row.proof)}" title="Preview Transfer Proof" aria-label="Preview Transfer Proof">${icon("file-text")}</button><button type="button" data-action="sppd-doc-download" data-file="${escapeHtml(row.proof)}" title="Download Transfer Proof" aria-label="Download Transfer Proof">${icon("download")}</button></span>`
            : `<span class="sppd-file-empty">-</span>`;
          return `<tr><td><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.nik || "-")}</small></td><td><strong>${escapeHtml(employee.division || "-")}</strong><small>${escapeHtml(employee.position || "-")}</small></td><td><div class="sppd-agenda-name-list">${(agendaNames.length ? agendaNames : [item.agendaName || "-"]).map((agenda) => `<span>${escapeHtml(agenda)}</span>`).join("")}</div></td><td class="center">${nominalContent}</td><td class="center">${renderCostValues((row) => statusPill(row.status || "Submitted"))}</td><td class="center">${renderCostValues(transferProof)}</td><td>${renderCostValues((row) => `<span>${escapeHtml(row.paymentRemark || "-")}</span>`)}</td><td class="center"><button class="action-icon action-edit" type="button" title="Edit Add Cost" aria-label="Edit Add Cost" data-action="sppd-other-new" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("edit")}</button></td></tr>`;
        }).join("") || emptyRow(8, "No employees added yet.")}</tbody>
      </table>
    </div>
  `;
}

function renderSppdOtherAllowanceTable(rows) {
  return `
    <div class="table-wrap">
      <table class="sppd-data-table sppd-other-allowance-table">
        <thead><tr><th>Type</th><th>Requester</th><th class="money-col">Amount</th><th>Status</th><th>Transfer Date</th><th>Proof</th></tr></thead>
        <tbody>
          ${rows.map((row) => `<tr><td><strong>${escapeHtml(row.type)}</strong></td><td>${escapeHtml(row.requesterName)}</td><td class="money-col">${formatRupiah(row.amount)}</td><td class="center">${statusPill(row.status)}</td><td>${escapeHtml(row.transferDate || "-")}</td><td>${renderSppdFileLink(row.proof)}</td></tr>`).join("") || emptyRow(6, "No additional costs yet.")}
        </tbody>
      </table>
    </div>
  `;
}

function renderSppdTravelEmployeeSection(item, editable, stage) {
  return `
    <div class="sppd-drawer-section">
      <div class="sppd-section-head">
        <h3>Travel Participants</h3>
      </div>
      <div class="form-grid sppd-travel-grid">
        ${field("Agenda Type", `<input name="agendaType" value="${escapeHtml(item.agendaType)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Region", `<input name="region" value="${escapeHtml(item.region)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Area", `<input name="area" value="${escapeHtml(item.area)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("Cluster", `<input name="cluster" value="${escapeHtml(item.cluster)}" ${editable ? "" : "disabled"}>`, false)}
        ${field("SPPD Date", `<input type="date" name="sppdDate" value="${escapeHtml(item.sppdDate)}" ${editable ? "" : "disabled"} required>`, true)}
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
        ${item.attachment ? `<div class="form-hint">Current: ${renderSppdFileLink(item.attachment)}</div>` : ""}
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
  if (!focused) return `<div class="empty-state">No travel participants yet.</div>`;

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
          <strong>${escapeHtml(item.duration)} days</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>${formatRupiah(Number(employee.dailyAllowance || 0) * Number(item.duration || 0))}</strong>
        </div>
      </div>
      <div class="sppd-employee-meta">
        ${sppdMetaTile("Jabatan", employee.position)}
        ${sppdMetaTile("Division", employee.division)}
        ${sppdMetaTile("Level", employee.level)}
        ${sppdMetaTile("SPPD Date", item.sppdDate)}
      </div>
      <div class="sppd-letter-actions">
        <button class="action-icon action-view" type="button" title="Preview Assignment Letter" aria-label="Preview Assignment Letter" data-action="sppd-letter-preview" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("eye")}</button>
        <button class="action-icon action-edit" type="button" title="Generate Assignment Letter" aria-label="Generate Assignment Letter" data-action="sppd-letter-generate" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("file-text")}</button>
        <button class="action-icon action-view" type="button" title="Download Assignment Letter" aria-label="Download Assignment Letter" data-action="sppd-letter-download" data-id="${escapeHtml(item.id)}" data-employee-id="${escapeHtml(employee.id)}">${icon("download")}</button>
      </div>
    </div>
  `;
}

function renderSppdStageContent(item, employee) {
  const active = getSppdEmployeeTab(item);
  const total = formatRupiah(Number(employee.dailyAllowance || 0) * Number(item.duration || 0));
  const content = {
    Request: [
      ["Requester/PIC", `${item.requesterName} - ${item.requesterDivision}`],
      ["Agenda", `${item.agendaName}, ${item.agendaDate} ${item.agendaTime}`],
      ["Peserta", `${employee.name} / ${employee.position}`]
    ],
    Verifikasi: [
      ["Duration", `${item.duration} days`],
      ["Compliance", "Agenda, area, level, and daily allowance can be reviewed"],
      ["Remark", item.remark || "-"]
    ],
    Approval: [
      ["Approval 1", "Relevant Head of Division"],
      ["Approval 2", "Direksi terkait"],
      ["Status", item.status === "Verified" ? "Waiting for approval" : item.status]
    ],
    Payment: [
      ["Total Allowance", total],
      ["Transfer Date", item.transferDate || "-"],
      ["Transfer Proof", item.transferProof || "Not uploaded"]
    ],
    Completed: [
      ["Status", item.paymentStatus === "Paid" ? "Completed" : "Not completed"],
      ["Assignment Letter", employee.assignmentLetter],
      ["Total Dibayarkan", total]
    ],
    "Other Allowance": [
      ["Transport / Expense", "Can be created in parallel after approval"],
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
  const tabs = ["Request", "Approval", "Verification", "Payment", "Add Cost", "Complete"];

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
  return getSppdWorkflowStage(item);
}

function sppdMetaFileTile(label, fileName) {
  return `<div class="sppd-meta-tile"><span>${escapeHtml(label)}</span><strong>${renderSppdFileLink(fileName)}</strong></div>`;
}

function renderSppdEmployeeStepper(item) {
  const steps = ["Request", "Approval", "Verification", "Payment", "Add Cost", "Complete"];
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
  const steps = ["Request", "Approval", "Verification", "Payment", "Add Cost", "Complete"];
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
  return Math.max(0, ["Request", "Approval", "Verification", "Payment", "Add Cost", "Complete"].indexOf(getSppdWorkflowStage(item)));
}

function renderSppdDrawerAction(stage, item, editable) {
  if (["sppdDashboard", "sppdRequestList", "sppdCompletedList"].includes(appState.section)) {
    if (getSppdWorkflowStage(item) === "Add Cost") {
      return `<div class="drawer-actions"><button class="btn success" type="button" data-action="sppd-complete" data-id="${escapeHtml(item.id)}">${icon("check")} Complete SPPD</button></div>`;
    }
    if (item.status === "Draft") {
      if (appState.view === "document") {
        return `
          <div class="drawer-actions">
            <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Request">Submit Request</button>
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
          <button class="btn neutral" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Draft">Revise</button>
          <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Approved">Approve</button>
        </div>
      `;
    }
    if (item.status === "Request") {
      return `<div class="drawer-actions"><button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Submitted">Submit to Approval</button></div>`;
    }
    if (["Approved", "In Verification"].includes(item.status)) {
      return `
        <div class="drawer-actions">
          <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Verified">Submit Verification</button>
        </div>
      `;
    }
    if (item.status === "Verified") {
      return `
        <div class="drawer-actions">
          <button class="btn success" type="button" data-action="sppd-paid" data-id="${escapeHtml(item.id)}">Confirm All Paid</button>
        </div>
      `;
    }
    return `<div class="process-modal-note">The SPPD document is complete.</div>`;
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
        <button class="btn success" type="button" data-action="sppd-status" data-id="${escapeHtml(item.id)}" data-status="Verified">Submit Verification</button>
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
  const requestDate = todayIso();
  return {
    id: "",
    docNo: getNextSppdDocNo(requestDate),
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
    sppdDate: requestDate,
    assignmentStartDate: "",
    assignmentEndDate: "",
    duration: 1,
    remark: "",
    attachment: "",
    attachments: [],
    status: "Draft",
    workflowStage: "Request",
    paymentStatus: "Unpaid",
    transferDate: "",
    transferProof: "",
    employees: []
  };
}

function getNextSppdDocNo(dateValue = todayIso(), currentId = "") {
  const date = new Date(`${dateValue || todayIso()}T00:00:00`);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const sequence = db.sppdRequests.filter((item) => {
    if (item.id === currentId) return false;
    const itemDate = new Date(`${item.sppdDate || item.requestDate || item.agendaDate || ""}T00:00:00`);
    return !Number.isNaN(itemDate.getTime())
      && itemDate.getMonth() === date.getMonth()
      && itemDate.getFullYear() === date.getFullYear();
  }).length + 1;
  return `${String(sequence).padStart(3, "0")}/SPPD/${month}/${year}`;
}

function findSppdRequest(id) {
  return db.sppdRequests.find((item) => item.id === id);
}

function saveSppdRequest(status) {
  const form = document.getElementById("sppdForm");
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const attachmentFiles = [...(form.querySelector('[name="attachmentFile"]')?.files || [])];
  attachmentFiles.forEach(registerSppdFile);
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
      showToast(!employeeRowIds.length ? "Add an employee first." : "Complete the employee assignment before submitting.");
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
    attachments: attachmentFiles.length ? attachmentFiles.map((file) => file.name) : getSppdAttachmentNames(item),
    attachment: attachmentFiles[0]?.name || item.attachment || "",
    remark: data.remark || item.remark || "",
    status: status === "Submitted" ? "Request" : status,
    workflowStage: "Request"
  });

  if (isAdd) {
    item.id = `SPPD-2026-${String(db.sppdRequests.length + 1).padStart(3, "0")}`;
    item.docNo = getNextSppdDocNo(item.sppdDate);
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
  window.sppdFormDirty = false;

  showToast(status === "Submitted" ? "SPPD submitted." : "SPPD draft saved.");
  setSection("sppdRequestList", "dashboard");
}

function renderSppdDraftEmployeeModal() {
  const employeeId = appState.modal?.employeeId;
  const readOnly = appState.modal?.mode === "view";
  const employee = getSppdDraftRowEmployee(employeeId);
  if (!employee) return "";
  const detail = getSppdDraftEmployeeDetail(employeeId);
  const request = getSppdCreateRequestItem() || {};
  const selectedLevel = detail.level || "Pelaksana";
  const selectedRegion = detail.region || request.region || "";
  const selectedArea = detail.area || request.area || "";
  const selectedCluster = detail.cluster || request.cluster || "";
  const selectedAgendaType = detail.agendaType || detail.agendas?.[0]?.type || request.agendaType || "";
  const selectedAgenda = detail.agendaName || detail.agendas?.[0]?.name || request.agendaName || "";
  const selectedRemark = detail.remark || detail.agendas?.[0]?.remark || request.remark || "";
  const selectedStartDate = detail.assignmentStartDate || request.assignmentStartDate || request.sppdDate || "";
  const selectedEndDate = detail.assignmentEndDate || request.assignmentEndDate || selectedStartDate;
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
            ${field("Start Date - End Date Agenda", `<div class="sppd-assignment-date-range"><input type="date" name="assignmentStartDate" value="${escapeHtml(selectedStartDate)}" required><span>to</span><input type="date" name="assignmentEndDate" value="${escapeHtml(selectedEndDate)}" required></div>`, true)}
            ${field("Agenda", `<textarea name="agendaName" placeholder="Tuliskan agenda perjalanan" required>${escapeHtml(selectedAgenda)}</textarea>`, true)}
            ${field("Agenda Type", renderSppdAgendaTypeSelect("agendaType", selectedAgendaType), true)}
            ${field("Level", renderSppdLevelSelect("level", selectedLevel), true)}
            ${field("Area", renderSppdAreaSelect("areaCluster", selectedArea, selectedCluster), true)}
            ${field("Region", renderSppdMasterSelect("region", "Region", selectedRegion, "Select Region"), true)}
            ${field("Remark", `<textarea name="remark" placeholder="Assignment notes">${escapeHtml(selectedRemark)}</textarea>`, false)}
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
        ${field("Agenda Name", `<input name="agendaName_${index}" value="${escapeHtml(agenda.name || "")}" placeholder="Agenda name">`, false)}
        ${field("Location", `<input name="agendaLocation_${index}" value="${escapeHtml(agenda.location || fallbackLocation)}" placeholder="Lokasi agenda">`, false)}
        ${field("Time", `<div class="sppd-time-stack"><label><span>Start Time</span><input type="time" name="agendaStartTime_${index}" value="${escapeHtml(agenda.startTime || "09:00")}"></label><label><span>Finish Time</span><input type="time" name="agendaEndTime_${index}" value="${escapeHtml(agenda.endTime || "17:00")}"></label></div>`, false)}
        ${field("Remark", `<textarea name="agendaRemark_${index}" placeholder="Agenda notes">${escapeHtml(agenda.remark || "")}</textarea>`, false)}
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
  const stage = getSppdWorkflowStage(item);
  const allowed = status === "Draft"
    || status === "Request"
    || status === "Submitted"
    || (status === "Approved" && stage === "Approval")
    || (status === "In Verification" && stage === "Verification")
    || (status === "Verified" && stage === "Verification");
  if (!allowed) {
    showToast(`This action is unavailable at the ${stage} stage.`);
    return;
  }
  item.status = status;
  item.workflowStage = {
    Draft: "Request",
    Request: "Request",
    Submitted: "Approval",
    Approved: "Verification",
    "In Verification": "Verification",
    Verified: "Payment"
  }[status] || item.workflowStage;
  item.updatedAt = "2026-08-24";
  appState.sppdDetailTab[id] = getDefaultSppdDetailTabForStatus(item);
  showToast(`SPPD ${status}.`);
  render();
}

function getDefaultSppdDetailTabForStatus(item) {
  const stage = getSppdWorkflowStage(item);
  if (stage === "Approval") return "Approval";
  if (stage === "Verification") return "Verification";
  if (stage === "Payment") return "Payment";
  if (stage === "Add Cost") return "Add Cost";
  if (stage === "Complete") return "Complete";
  return "Request";
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
  if (getSppdWorkflowStage(item) !== "Payment") {
    showToast("Payment can only be processed after Verification is complete.");
    return;
  }
  item.paymentStatus = "Paid";
  item.workflowStage = "Add Cost";
  item.employees?.forEach((employee) => {
    employee.paymentStatus = "Paid";
    employee.paymentDate = employee.paymentDate || todayIso();
    employee.transferProof = employee.transferProof || item.transferProof || `bukti-transfer-${item.docNo.split("/")[0]}-${employee.name.replace(/\s+/g, "-")}.pdf`;
  });
  item.transferDate = item.transferDate || todayIso();
  item.transferProof = item.transferProof || `bukti-transfer-${item.docNo.split("/")[0]}.pdf`;
  appState.sppdDetailTab[id] = "Add Cost";
  showToast("Payment completed. Continue to Add Cost.");
  render();
}

function completeSppdRequest(id) {
  const item = findSppdRequest(id);
  if (!item) return;
  if (getSppdWorkflowStage(item) !== "Add Cost") {
    showToast("SPPD can only be completed after Payment and Add Cost.");
    return;
  }
  item.workflowStage = "Complete";
  item.completedAt = todayIso();
  item.updatedAt = todayIso();
  window.sppdFormDirty = false;
  appState.sppdDetailTab[id] = "Complete";
  showToast("SPPD completed.");
  render();
}

function saveSppdEmployeePayment(id, employeeId) {
  const item = findSppdRequest(id);
  const employee = item?.employees?.find((row) => row.id === employeeId);
  const form = document.getElementById("sppdEmployeePaymentForm");
  if (!item || !employee || !form) return;
  const currentStage = getSppdWorkflowStage(item);
  const data = Object.fromEntries(new FormData(form).entries());
  const proofFile = form.querySelector('[name="transferProofFile"]')?.files?.[0];
  registerSppdFile(proofFile);
  if (!proofFile && !employee.transferProof) {
    showToast("Upload the transfer proof first.");
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
  if (item.paymentStatus === "Paid" && currentStage !== "Complete") item.workflowStage = "Add Cost";
  item.updatedAt = todayIso();
  appState.modal = null;
  renderModal();
  showToast(allPaid ? "All employees have received their allowance. Waiting for the assignment letter if it is not complete." : "Employee payment saved.");
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
      showToast("Select a PIC first.");
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
      showToast("Select an employee first.");
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
  const currentDetail = getSppdDraftEmployeeDetail(employeeId);
  const request = getSppdCreateRequestItem() || {};
  const data = Object.fromEntries(new FormData(form).entries());
  const duration = calculateDateDuration(data.assignmentStartDate, data.assignmentEndDate);
  const [area, cluster] = String(data.areaCluster || "").split("::");
  const agendaType = data.agendaType === "Lainnya" ? data.agendaTypeOther || "Lainnya" : data.agendaType || "";
  const agendas = [{
    id: currentDetail.agendas?.[0]?.id || `${employeeId}-AGENDA-1`,
    name: data.agendaName || request.agendaName || "",
    type: agendaType || request.agendaType || "",
    typeOther: data.agendaType === "Lainnya" ? data.agendaTypeOther || "" : "",
    date: data.assignmentStartDate || request.agendaDate || "",
    startTime: request.agendaTime || "09:00",
    endTime: request.agendaEndTime || "17:00",
    location: currentDetail.destination || request.agendaLocation || "",
    remark: data.remark || ""
  }];
  appState.sppdDraftEmployeeDetails[employeeId] = {
    employeeId: getSppdDraftRowEmployeeId(employeeId),
    destination: currentDetail.destination || request.agendaLocation || "",
    level: data.level || "Pelaksana",
    region: data.region || "",
    area: area || "",
    cluster: cluster || "",
    assignmentStartDate: data.assignmentStartDate || "",
    assignmentEndDate: data.assignmentEndDate || data.assignmentStartDate || "",
    duration,
    detailStatus,
    agendaName: data.agendaName || request.agendaName || "",
    agendaType: agendaType || request.agendaType || "",
    remark: data.remark || "",
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
    showToast("Complete the employee assignment before confirming.");
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
    showToast("Complete the source employee assignment before copying.");
    return false;
  }
  const targets = targetEmployeeIds.filter((id) => id !== sourceEmployeeId && appState.sppdDraftEmployeeIds.includes(id));
  if (!targets.length) {
    showToast("Select target employees to receive the copied assignment.");
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
    showToast("Select at least one target employee.");
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
    showToast("Verification semua employee terlebih dahulu dari detail employee.");
    appState.sppdDetailTab[id] = "Verification";
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
  const level = form.querySelector('[name="employeeLevel"]')?.value || "";
  const region = form.querySelector('[name="employeeRegion"]')?.value || form.dataset.sppdRegion || "";
  const [area, cluster] = String(form.querySelector('[name="employeeAreaCluster"]')?.value || `${form.dataset.sppdArea || ""}::${form.dataset.sppdCluster || ""}`).split("::");
  const docId = String(appState.selectedId || "").split("::")[0];
  const item = findSppdRequest(docId);
  const levelRate = level && item ? Number(getSppdLevelAllowance(level, item) || 0) : 0;
  const rate = levelRate || Number(form.dataset.dailyRate || 0);
  form.dataset.dailyRate = String(rate);
  const duration = calculateSppdLiveDuration(start, end, region, area || "", cluster || "");
  const calculated = rate * duration;
  const durationInput = form.querySelector('[data-role="employee-duration"]');
  const durationLabel = form.querySelector('[data-role="employee-duration-label"]');
  const effectiveInput = form.querySelector('[data-role="employee-effective-days"]');
  const masterRateInput = form.querySelector('[data-role="employee-master-rate"]');
  const calculatedInput = form.querySelector('[data-role="employee-calculated-allowance"]');
  const verifiedInput = form.querySelector('[data-role="employee-verified-allowance"]');
  if (durationInput) durationInput.value = `${duration} days`;
  if (durationLabel) durationLabel.textContent = `${duration} Day(s)`;
  if (effectiveInput) effectiveInput.value = `${duration} days`;
  if (masterRateInput) masterRateInput.value = `${formatRupiah(rate)} / day`;
  if (calculatedInput) calculatedInput.value = formatRupiah(calculated);
  if (verifiedInput && !verifiedWasEdited) verifiedInput.value = calculated;
}

function hasCompleteSppdDraftEmployeeDetail(detail = {}) {
  return Boolean(
    detail.assignmentStartDate &&
    detail.assignmentEndDate &&
    detail.agendaName &&
    detail.agendaType &&
    detail.level &&
    detail.area &&
    detail.region
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
  if (data.employeeRegion !== undefined) employee.region = data.employeeRegion;
  if (data.employeeAreaCluster !== undefined) {
    const [area, cluster] = String(data.employeeAreaCluster || "").split("::");
    employee.area = area || "";
    employee.cluster = cluster || "";
  }
  if (data.employeeLevel !== undefined) employee.level = data.employeeLevel || employee.level;
  if (data.employeeAgendaName !== undefined || data.employeeAgendaType !== undefined) {
    const agenda = employee.agendas?.[0] || {};
    employee.agendas = [{
      ...agenda,
      id: agenda.id || `${employee.id}-AGENDA-1`,
      name: data.employeeAgendaName || agenda.name || item.agendaName || "",
      type: data.employeeAgendaType || agenda.type || item.agendaType || "",
      date: employee.assignmentStartDate || agenda.date || "",
      location: employee.destination || agenda.location || item.agendaLocation || ""
    }];
  }
  employee.duration = getSppdEmployeeEffectiveDuration(item, employee);
  const levelRate = Number(getSppdLevelAllowance(employee.level, item) || 0);
  if (levelRate) employee.dailyAllowance = levelRate;
  const rate = Number(employee.dailyAllowance || levelRate || 0);
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
    item.workflowStage = "Add Cost";
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
    item.workflowStage = "Add Cost";
    item.updatedAt = todayIso();
  }
  showToast("Assignment letter uploaded.");
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
          <small class="modal-kicker">Assignment Letter ${escapeHtml(item.docNo)}</small>
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
        <small class="sppd-editor-save-note">The document is saved to the current SPPD record.</small>
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
  registerSppdFile(file);
  item.assignmentLetterContent = content;
  item.assignmentLetterFile = `Assignment Letter ${item.docNo.replace(/[\\/:*?"<>|]/g, "-")}.docx`;
  item.employees.forEach((employee) => {
    employee.assignmentLetter = "Created";
  });
  appState.modal = null;
  renderModal();
  render();
  showToast("Assignment letter saved successfully.");
}

function buildSppdAssignmentDocument(item) {
  const employees = item.employees.map((employee, index) => [
    `${index + 1}. ${employee.name} (${employee.nik})`,
    `   ${employee.position || "-"} / ${employee.division || "-"}`,
    `   Destination: ${employee.destination || item.agendaLocation || "-"}`,
    `   Periode: ${formatSppdEmployeeAssignmentPeriod(employee, item)}`
  ].join("\n")).join("\n\n");
  return [
    "SURAT TUGAS PERJALANAN DINAS",
    `Nomor: ${item.docNo}`,
    "",
    "Yang bertanda tangan di bawah ini menugaskan:",
    "",
    employees || "No employees have been assigned.",
    "",
    `Untuk melaksanakan agenda: ${item.agendaName || "-"}`,
    `Lokasi: ${item.agendaLocation || "-"}`,
    `PIC / Requester: ${item.requesterName || "-"} - ${item.requesterDivision || "-"}`,
    "",
    "This assignment letter is issued to be carried out responsibly.",
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
    showToast("Document unavailable.");
    return;
  }
  const storedUrl = sppdFileUrls.get(fileName);
  const url = storedUrl || URL.createObjectURL(createSppdPreviewPdf(fileName));
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  if (!storedUrl) {
    if (!win) URL.revokeObjectURL(url);
    else setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  showToast("Preview dokumen dibuka.");
}

function downloadSppdDocument(fileName) {
  if (!fileName) {
    showToast("Document unavailable.");
    return;
  }
  const storedUrl = sppdFileUrls.get(fileName);
  const safeName = fileName.replace(/[\\/:*?"<>|]/g, "-").replace(/\.[^.]+$/, "") || "dokumen-sppd";
  const url = storedUrl || URL.createObjectURL(createSppdPreviewPdf(fileName));
  const link = document.createElement("a");
  link.href = url;
  link.download = storedUrl ? fileName : `${safeName}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (!storedUrl) URL.revokeObjectURL(url);
  showToast("Document downloaded.");
}

function createSppdPreviewPdf(fileName) {
  const safeText = String(fileName || "SPPD Document")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/([\\()])/g, "\\$1");
  const stream = `BT /F1 18 Tf 72 760 Td (SPPD Document Preview) Tj 0 -34 Td /F1 12 Tf (${safeText}) Tj 0 -24 Td (Document available for review and download.) Tj ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function buildSppdLetterText(item, employee) {
  return [
    "SURAT TUGAS PERJALANAN DINAS",
    `No. SPPD: ${item.docNo}`,
    "",
    `Name: ${employee.name}`,
    `NIK: ${employee.nik}`,
    `Position/Division: ${employee.position} / ${employee.division}`,
    `Agenda: ${item.agendaName}`,
    `Lokasi: ${item.agendaLocation}`,
    `Lama Penugasan: ${formatSppdAssignmentPeriod(item)}`,
    "",
    "This document was generated automatically by the SPPD system."
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
  const item = findSppdRequest(data.sppdId);
  const employee = item?.employees.find((row) => row.id === data.employeeId);
  const entries = [...form.querySelectorAll(".sppd-add-cost-entry")];
  const nextNumber = db.sppdOtherAllowances.length + 1;
  entries.forEach((entry, offset) => {
    const index = Number(entry.dataset.costIndex) || 0;
    const proofFile = form.querySelector(`[name="proofFile_${index}"]`)?.files?.[0];
    registerSppdFile(proofFile);
    db.sppdOtherAllowances.unshift({
      id: `OA-${String(nextNumber + offset).padStart(3, "0")}`,
      sppdId: data.sppdId || "",
      employeeId: employee?.id || data.employeeId || "",
      requesterName: employee?.name || "",
      type: data[`type_${index}`] || "Lainnya",
      amount: Number(data[`amount_${index}`] || 0),
      status: "Submitted",
      transferDate: "",
      proof: proofFile?.name || "",
      remark: data[`remark_${index}`] || "",
      paymentRemark: ""
    });
  });
  appState.modal = null;
  showToast("Add cost submitted.");
  render();
}
