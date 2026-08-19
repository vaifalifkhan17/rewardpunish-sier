const icons = {
  "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  "bar-chart": '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V8"/><path d="M17 16v-3"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  gauge: '<path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h16"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  "refresh-cw": '<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 8h5V3"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/>',
  square: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0Z"/><path d="M5 5H3v2a4 4 0 0 0 4 4"/><path d="M19 5h2v2a4 4 0 0 1-4 4"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>',
  "user-circle": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20a5 5 0 0 1 10 0"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};

const criteriaSeed = [
  ["A1", "Kriteria Standar", "Riwayat Mutasi", false],
  ["A2", "Kriteria Standar", "Masa Kerja", false],
  ["A3", "Kriteria Standar", "Tingkat Pendidikan", false],
  ["B1.1", "Kriteria Utama", "Penilaian Karyawan - KPI", false],
  ["B1.2", "Kriteria Utama", "Penilaian Karyawan - BA360", false],
  ["B2.1", "Kriteria Utama", "Keikutsertaan dalam Tim/Kepanitiaan Eksternal", true],
  ["B2.2", "Kriteria Utama", "Keikutsertaan dalam Tim/Kepanitiaan Internal Jangka Panjang", true],
  ["B2.3", "Kriteria Utama", "Keikutsertaan dalam Tim/Kepanitiaan Internal Jangka Pendek", true],
  ["B3.1", "Kriteria Utama", "Sertifikasi", true],
  ["B3.2", "Kriteria Utama", "Pelatihan Sesuai Kompetensi", false],
  ["B3.3", "Kriteria Utama", "Pelatihan Diluar Kompetensi", false],
  ["B4.1", "Kriteria Utama", "Selfpaced Learning Mandatory", false],
  ["B4.2", "Kriteria Utama", "Selfpaced Learning Non Mandatory", false],
  ["B5.1", "Kriteria Utama", "Inovasi Level Perusahaan", false],
  ["B5.2", "Kriteria Utama", "Inovasi Level Divisi", false],
  ["B5.3", "Kriteria Utama", "Inovasi Level Perorangan", false],
  ["B6.1", "Kriteria Utama", "Prestasi Level Perusahaan", false],
  ["B6.2", "Kriteria Utama", "Prestasi Level Divisi", false],
  ["B6.3", "Kriteria Utama", "Prestasi Level Perorangan", false],
  ["B7.1", "Kriteria Utama", "Sharing Knowledge / Pemateri Eksternal", false],
  ["B7.2", "Kriteria Utama", "Sharing Knowledge / Pemateri Internal Lintas Divisi", false],
  ["B7.3", "Kriteria Utama", "Sharing Knowledge Internal Divisi", false],
  ["B8", "Kriteria Utama", "Olahraga dan Seni", false],
  ["B9", "Kriteria Utama", "Kedisiplinan", false]
];

const appState = {
  section: "dashboard",
  view: "dashboard",
  selectedId: null,
  search: { category: "", criteria: "", point: "", period: "", employeeInput: "", verification: "", assessmentPeriod: "", verificationPeriod: "", assessmentEmployee: "", employeeProcessPeriod: "", employeeResultPeriod: "", employeeProcess: "", employeeResult: "" },
  filters: {
    category: { status: "" },
    criteria: { period: "", category: "", status: "" },
    point: { period: "" },
    period: { year: "", status: "" },
    employeeInput: { periodName: "", division: "", status: "" },
    verification: { periodName: "", division: "", status: "" },
    assessmentEmployee: { division: "" },
    employeeProcess: {},
    employeeResult: {}
  },
  selection: { employeeInput: [], verification: [] },
  perPage: { category: 10, criteria: 10, point: 10, period: 10, employeeInput: 10, verification: 10, assessmentPeriod: 10, verificationPeriod: 10, assessmentEmployee: 10, employeeProcessPeriod: 10, employeeResultPeriod: 10, employeeProcess: 10, employeeResult: 10 },
  page: { category: 1, criteria: 1, point: 1, period: 1, employeeInput: 1, verification: 1, assessmentPeriod: 1, verificationPeriod: 1, assessmentEmployee: 1, employeeProcessPeriod: 1, employeeResultPeriod: 1, employeeProcess: 1, employeeResult: 1 },
  modal: null,
  pendingDelete: null,
  pointDraft: null,
  focusSearch: null,
  myRewardQuestion: 0,
  processTab: "input",
  dashboardPeriodId: "RNP-2026",
  dashboardCriteriaCode: "A3",
  sidebarGroups: {
    masterData: true,
    employeeData: true
  },
  processAccess: {
    viewProcess: true,
    scope: "all",
    editProcess: true,
    verificationProcess: true
  }
};

const db = {
  categories: [...new Set(criteriaSeed.map(([, category]) => category))].map((name) => ({
    id: name,
    name,
    status: "Active",
    lastUpdate: "07 Juli 2026"
  })),
  criteria: criteriaSeed.map(([code, category, name, hasSub]) => ({
    id: code,
    period: "2026",
    category,
    code,
    name,
    hasSub,
    status: "Active",
    lastUpdate: "07 Juli 2026",
    description: `${name} untuk penilaian Reward & Punishment.`,
    subCriteria: hasSub ? makeSubCriteria(name) : []
  })),
  points: [
    {
      id: "PTS-2025",
      docNo: "001/PTS/07/2026",
      period: "2026",
      name: "Rule Tahun 2025",
      description: "Sesuai SKD No. 036/SIER-PD/B.3/VI/2025",
      lastUpdate: "07 Juli 2026",
      rules: []
    }
  ],
  periods: [
    {
      id: "RNP-2026",
      docNo: "001RNP012026",
      name: "Reward and Punishment Tahun 2026",
      year: "2026",
      pointId: "PTS-2025",
      startDate: "2026-01-01",
      finishDate: "2026-12-31",
      status: "Open",
      phase: "input",
      lastUpdate: "07 Juli 2026"
    },
    {
      id: "RNP-2025",
      docNo: "001RNP012025",
      name: "Reward and Punishment Tahun 2025",
      year: "2025",
      pointId: "PTS-2025",
      startDate: "2026-01-01",
      finishDate: "2026-06-30",
      status: "Closed",
      phase: "verification",
      lastUpdate: "07 Juli 2026"
    },
    {
      id: "RNP-2024",
      docNo: "001RNP012024",
      name: "Reward and Punishment Tahun 2024",
      year: "2024",
      pointId: "PTS-2025",
      startDate: "2025-01-01",
      finishDate: "2025-06-30",
      status: "Approved",
      phase: "approval",
      lastUpdate: "07 Juli 2026"
    }
  ]
};

db.points[0].rules = db.criteria.map((criteria) => makeRuleForCriteria(criteria.code));
const employeeSeed = [
  ["EMP-001", "710012", "Roki Syah Al Zarkasi", "Human Capital", "Supervisor HC System"],
  ["EMP-002", "710027", "Dewi Kartika", "Finance", "Staff Finance"],
  ["EMP-003", "710044", "Bima Prasetya", "Commercial", "Account Executive"],
  ["EMP-004", "710051", "Anindya Putri", "Operation", "Operation Analyst"],
  ["EMP-005", "710063", "Rizky Pramana", "Engineering", "Maintenance Engineer"],
  ["EMP-006", "710078", "Satria Wibowo", "IT", "System Analyst"],
  ["EMP-007", "710086", "Maya Larasati", "Human Capital", "Learning Officer"],
  ["EMP-008", "710091", "Arif Hidayat", "Finance", "Tax Officer"],
  ["EMP-009", "710104", "Nadia Permata", "Commercial", "Customer Relation"],
  ["EMP-010", "710118", "Yoga Mahendra", "Operation", "Field Coordinator"],
  ["EMP-011", "710123", "Putri Amelia", "Engineering", "Planning Engineer"],
  ["EMP-012", "710139", "Fajar Nugroho", "IT", "Infrastructure Officer"],
  ["EMP-013", "710144", "Citra Anggraeni", "Human Capital", "Recruitment Officer"],
  ["EMP-014", "710152", "Bagus Santoso", "Finance", "Budget Analyst"],
  ["EMP-015", "710166", "Intan Maharani", "Commercial", "Marketing Officer"],
  ["EMP-016", "710173", "Dimas Saputra", "Operation", "Safety Officer"],
  ["EMP-017", "710181", "Laras Puspita", "Engineering", "QA Engineer"],
  ["EMP-018", "710194", "Kevin Aditya", "IT", "Application Support"],
  ["EMP-019", "710205", "Retno Wulandari", "Legal", "Legal Officer"],
  ["EMP-020", "710217", "Galih Pratama", "Procurement", "Procurement Officer"],
  ["EMP-021", "710229", "Ayu Nirmala", "Legal", "Compliance Analyst"],
  ["EMP-022", "710236", "Hendra Kusuma", "Procurement", "Vendor Management"],
  ["EMP-023", "710248", "Mira Febriani", "Operation", "Tenant Service"],
  ["EMP-024", "710259", "Teguh Laksono", "Engineering", "Utility Supervisor"]
];

db.employees = employeeSeed.map(([id, nik, name, division, position]) => ({ id, nik, name, division, position, status: "Active" }));
db.employeeInputs = employeeSeed.map(([id], index) => {
  const statuses = ["Draft", "Submitted", "Verified", "Draft"];
  const status = statuses[index % statuses.length];
  return {
    id: `RNP-IN-${String(index + 1).padStart(3, "0")}`,
    docNo: `${String(index + 1).padStart(3, "0")}/RNP-IN/07/2026`,
    employeeId: id,
    periodId: "RNP-2026",
    pointId: "PTS-2025",
    status,
    assessmentActive: status !== "Draft",
    verifier: "HC Reward Team",
    notes: status === "Draft" ? "Draft pengisian Reward & Punishment periode berjalan." : status === "Submitted" ? "Menunggu verifikasi input." : "Sudah diverifikasi oleh tim HC.",
    submittedAt: status === "Draft" ? "-" : `${String((index % 8) + 1).padStart(2, "0")} Juli 2026`,
    lastUpdate: "09 Juli 2026",
    answers: makeEmployeeAnswers("PTS-2025", index)
  };
});

const assessmentReviewedDummy = db.employeeInputs.find((entry) => entry.status === "Verified");
if (assessmentReviewedDummy) {
  const point = findPoint(assessmentReviewedDummy.pointId);
  const subRule = point?.rules.find((rule) => rule.hasSub);

  if (subRule) {
    const subName = Object.keys(subRule.subRules)[0];
    const subAnswer = assessmentReviewedDummy.answers[subRule.code]?.sub?.[subName];
    if (subAnswer) {
      subAnswer.remark = "Evidence sudah diperiksa pada proses verification.";
      assessmentReviewedDummy.notes = "Jawaban telah diverifikasi oleh tim HC.";
    }
  }
}

seedVerifiedDashboardCorrections();

const app = document.getElementById("app");
const modalHost = document.getElementById("modalHost");
const drawerHost = document.getElementById("drawerHost");
const toast = document.getElementById("toast");
const breadcrumb = document.getElementById("breadcrumb");
const backButton = document.getElementById("backButton");

function makeSubCriteria(name) {
  if (name.includes("Eksternal")) {
    return ["Tim/Kepanitiaan Eksternal 1", "Tim/Kepanitiaan Eksternal 2", "Tim/Kepanitiaan Eksternal 3"];
  }

  if (name.includes("Jangka Panjang")) {
    return ["Tim/Kepanitiaan Internal Jangka Panjang 1", "Tim/Kepanitiaan Internal Jangka Panjang 2", "Tim/Kepanitiaan Internal Jangka Panjang 3"];
  }

  if (name.includes("Jangka Pendek")) {
    return ["Tim/Kepanitiaan Internal Jangka Pendek 1", "Tim/Kepanitiaan Internal Jangka Pendek 2", "Tim/Kepanitiaan Internal Jangka Pendek 3"];
  }

  return ["Sertifikasi Tahun ke-1", "Sertifikasi Tahun ke-2", "Sertifikasi Tahun ke-3 s/d Berakhir"];
}

function makeRuleForCriteria(code) {
  const criteria = findCriteria(code) || db.criteria[0];
  const question = getCriteriaQuestion(criteria.code, criteria.name);
  const rule = {
    code: criteria.code,
    criteriaName: criteria.name,
    question: question.text,
    questionInfo: question.info,
    hasSub: criteria.hasSub,
    options: getDefaultOptions(criteria.code),
    subRules: {}
  };

  if (criteria.hasSub) {
    criteria.subCriteria.forEach((subName) => {
      rule.subRules[subName] = getDefaultOptions(criteria.code);
    });
  }

  return rule;
}

function getCriteriaQuestion(code, name) {
  const map = {
    A1: {
      text: "Apa riwayat mutasi karyawan pada periode penilaian ini?",
      info: "Pilih status mutasi terakhir yang berlaku untuk karyawan: promosi, rotasi/tetap/definitif, atau demosi."
    },
    A2: {
      text: "Berapa masa kerja karyawan sampai akhir periode penilaian?",
      info: "Gunakan total masa kerja aktif karyawan, lalu pilih rentang tahun yang paling sesuai."
    },
    A3: {
      text: "Apa tingkat pendidikan terakhir karyawan yang diakui perusahaan?",
      info: "Pilih jenjang pendidikan terakhir berdasarkan data master karyawan atau dokumen pendukung yang sah."
    },
    "B1.1": {
      text: "Bagaimana hasil penilaian KPI karyawan?",
      info: "Gunakan nilai KPI final periode berjalan dan konversikan ke opsi A+ sampai E."
    },
    "B1.2": {
      text: "Bagaimana hasil penilaian BA360 karyawan?",
      info: "Gunakan nilai BA360 final periode berjalan dan konversikan ke opsi A sampai E."
    },
    "B2.1": {
      text: "Apakah karyawan berperan dalam tim/kepanitiaan eksternal?",
      info: "Isi setiap sub criteria kepanitiaan eksternal berdasarkan peran tertinggi: tim/panitia inti, anggota, atau tidak ada."
    },
    "B2.2": {
      text: "Apakah karyawan berperan dalam tim/kepanitiaan internal jangka panjang?",
      info: "Isi setiap sub criteria kepanitiaan internal jangka panjang berdasarkan peran tertinggi yang dimiliki karyawan."
    },
    "B2.3": {
      text: "Apakah karyawan berperan dalam tim/kepanitiaan internal jangka pendek?",
      info: "Isi setiap sub criteria kepanitiaan internal jangka pendek berdasarkan peran tertinggi yang dimiliki karyawan."
    },
    "B3.1": {
      text: "Apakah karyawan memiliki sertifikasi yang masih relevan?",
      info: "Pilih status sertifikasi berdasarkan tahun berlaku sertifikat atau tandai tidak ada/tidak berlaku."
    },
    "B3.2": {
      text: "Berapa kali karyawan mengikuti pelatihan sesuai kompetensi?",
      info: "Hitung pelatihan sesuai kompetensi yang valid pada periode penilaian."
    },
    "B3.3": {
      text: "Berapa kali karyawan mengikuti pelatihan di luar kompetensi?",
      info: "Hitung pelatihan di luar kompetensi yang valid pada periode penilaian."
    },
    "B4.1": {
      text: "Berapa course selfpaced learning mandatory yang diselesaikan karyawan?",
      info: "Gunakan jumlah course mandatory yang selesai dan tercatat pada periode penilaian."
    },
    "B4.2": {
      text: "Berapa course selfpaced learning non mandatory yang diselesaikan karyawan?",
      info: "Gunakan jumlah course non mandatory yang selesai dan tercatat pada periode penilaian."
    },
    "B5.1": {
      text: "Berapa inovasi level perusahaan yang dihasilkan karyawan?",
      info: "Hitung inovasi level perusahaan yang sudah dinyatakan valid pada periode penilaian."
    },
    "B5.2": {
      text: "Berapa inovasi level divisi yang dihasilkan karyawan?",
      info: "Hitung inovasi level divisi yang sudah dinyatakan valid pada periode penilaian."
    },
    "B5.3": {
      text: "Berapa inovasi level perorangan yang dihasilkan karyawan?",
      info: "Hitung inovasi individu yang sudah dinyatakan valid pada periode penilaian."
    },
    "B6.1": {
      text: "Berapa prestasi level perusahaan yang diraih karyawan?",
      info: "Hitung prestasi level perusahaan yang dapat dibuktikan dan sesuai periode penilaian."
    },
    "B6.2": {
      text: "Berapa prestasi level divisi yang diraih karyawan?",
      info: "Hitung prestasi level divisi yang dapat dibuktikan dan sesuai periode penilaian."
    },
    "B6.3": {
      text: "Berapa prestasi level perorangan yang diraih karyawan?",
      info: "Hitung prestasi individu yang dapat dibuktikan dan sesuai periode penilaian."
    },
    "B7.1": {
      text: "Berapa kali karyawan menjadi pemateri eksternal dalam sharing knowledge?",
      info: "Hitung aktivitas sebagai pemateri eksternal yang tercatat pada periode penilaian."
    },
    "B7.2": {
      text: "Berapa kali karyawan menjadi pemateri internal lintas divisi?",
      info: "Hitung aktivitas sharing knowledge sebagai pemateri untuk peserta lintas divisi."
    },
    "B7.3": {
      text: "Berapa kali karyawan menjadi pemateri internal divisi?",
      info: "Hitung aktivitas sharing knowledge sebagai pemateri untuk peserta internal divisi."
    },
    B8: {
      text: "Apakah karyawan aktif dalam kegiatan olahraga dan seni?",
      info: "Pilih aktif jika karyawan tercatat mengikuti kegiatan olahraga atau seni perusahaan pada periode penilaian."
    },
    B9: {
      text: "Berapa rata-rata keterlambatan karyawan pada periode penilaian?",
      info: "Gunakan rekap absensi untuk memilih rentang rata-rata keterlambatan yang sesuai."
    }
  };

  return map[code] || {
    text: `Apakah ${name} terpenuhi pada periode penilaian?`,
    info: "Gunakan data pendukung yang valid untuk menentukan opsi point yang sesuai."
  };
}

function getDefaultOptions(code) {
  const map = {
    A1: [["Promosi", 3], ["Rotasi/Tetap/Definitif", 1], ["Demosi", -5]],
    A2: [["> 32 th", 12], ["25-32 th", 10], ["17-24 th", 8], ["9-16 th", 6], ["8 th", 4], ["3-7 th", 3], ["<3 th", 2]],
    A3: [["S3", 10], ["S2", 8], ["S1", 6], ["Diploma", 4], ["SMA", 2], ["SD/SMP", 1]],
    "B1.1": [["A+", 25], ["A", 20], ["B", 10], ["C", 0], ["D", -10], ["E", -20]],
    "B1.2": [["A", 20], ["B", 15], ["C", 10], ["D", 5], ["E", 0]],
    "B2.1": [["Tim/Panitia Inti", 20], ["Anggota", 15], ["Tidak Ada", 0]],
    "B2.2": [["Tim/Panitia Inti", 10], ["Anggota", 3], ["Tidak Ada", 0]],
    "B2.3": [["Tim/Panitia Inti", 7], ["Anggota", 2], ["Tidak Ada", 0]],
    "B3.1": [["Tahun ke-1", 10], ["Tahun ke-2", 8], ["Tahun ke-3 s/d Berakhir", 6], ["Tidak Ada/Tidak Berlaku", 0]],
    "B3.2": [["3 Kali Pelatihan", 9], ["2 Kali Pelatihan", 6], ["1 Kali Pelatihan", 3], ["Tidak Ada", 0]],
    "B3.3": [["3 Kali Pelatihan", 9], ["2 Kali Pelatihan", 6], ["1 Kali Pelatihan", 3], ["Tidak Ada", 0]],
    "B4.1": [[">= 10 Course", 6], ["6-9 Course", 4], ["3-5 Course", 2], ["<3 Course", 0]],
    "B4.2": [[">= 10 Course", 3], ["6-9 Course", 2], ["3-5 Course", 1], ["<3 Course", 0]],
    "B5.1": [["3 Inovasi", 45], ["2 Inovasi", 30], ["1 Inovasi", 15], ["Tidak Ada", 0]],
    "B5.2": [["3 Inovasi", 39], ["2 Inovasi", 26], ["1 Inovasi", 13], ["Tidak Ada", 0]],
    "B5.3": [["3 Inovasi", 33], ["2 Inovasi", 22], ["1 Inovasi", 11], ["Tidak Ada", 0]],
    "B6.1": [["3 Prestasi", 30], ["2 Prestasi", 20], ["1 Prestasi", 10], ["Tidak Ada", 0]],
    "B6.2": [["3 Prestasi", 18], ["2 Prestasi", 12], ["1 Prestasi", 6], ["Tidak Ada", 0]],
    "B6.3": [["3 Prestasi", 9], ["2 Prestasi", 6], ["1 Prestasi", 3], ["Tidak Ada", 0]],
    "B7.1": [["3 kali", 30], ["2 kali", 20], ["1 kali", 10], ["Tidak Pernah", 0]],
    "B7.2": [["3 kali", 24], ["2 kali", 16], ["1 kali", 8], ["Tidak Pernah", 0]],
    "B7.3": [["3 kali", 15], ["2 kali", 10], ["1 kali", 5], ["Tidak Pernah", 0]],
    B8: [["Aktif", 10], ["Tidak Aktif", 0]],
    B9: [["Rata-rata Keterlambatan 0-60 menit", 10], ["Rata-rata Keterlambatan 61-120 menit", 8], ["Rata-rata Keterlambatan 121-240 menit", 5], ["Rata-rata Keterlambatan > 240 menit", 0]]
  };

  return (map[code] || [["Terpenuhi", 10], ["Tidak Terpenuhi", 0]]).map(([option, point]) => ({ option, point }));
}

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons["file-text"]}</svg>`;
}

function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function findCriteria(id) {
  return db.criteria.find((item) => item.id === id || item.code === id);
}

function findCategory(id) {
  return db.categories.find((item) => item.id === id || item.name === id);
}

function findPoint(id) {
  return db.points.find((item) => item.id === id);
}

function findPeriod(id) {
  return db.periods.find((item) => item.id === id);
}

function findEmployee(id) {
  return db.employees.find((item) => item.id === id);
}

function findEmployeeInput(id) {
  return db.employeeInputs.find((item) => item.id === id);
}

function makeEmployeeAnswers(pointId, offset = 0) {
  const point = findPoint(pointId) || db.points[0];
  const answers = {};

  point.rules.forEach((rule, ruleIndex) => {
    const evidence = "";

    if (rule.hasSub) {
      const subAnswers = {};
      Object.entries(rule.subRules).forEach(([subName, options], subIndex) => {
        const option = options[(offset + subIndex) % options.length] || options[0] || { option: "" };
        subAnswers[subName] = { option: option.option };
      });
      answers[rule.code] = { sub: subAnswers, evidence };
      return;
    }

    const option = rule.options[(offset + ruleIndex) % rule.options.length] || rule.options[0] || { option: "" };
    answers[rule.code] = { option: option.option, evidence };
  });

  return answers;
}

function seedVerifiedDashboardCorrections() {
  db.employeeInputs.forEach((entry, entryIndex) => {
    if (entry.status !== "Verified") return;

    const point = findPoint(entry.pointId);
    if (!point) return;

    entry.verificationAnswers = clone(entry.answers || {});

    point.rules.forEach((rule, ruleIndex) => {
      if ((entryIndex + ruleIndex) % 5 !== 0) return;

      if (rule.hasSub) {
        const subNames = Object.keys(rule.subRules || {});
        const subName = subNames[(entryIndex + ruleIndex) % Math.max(subNames.length, 1)];
        if (!subName) return;

        const answer = entry.verificationAnswers[rule.code] || { sub: {} };
        const subAnswer = answer.sub?.[subName] || {};
        subAnswer.option = getDashboardAdjustedOption(rule.subRules[subName] || [], subAnswer.option, entryIndex + ruleIndex);
        subAnswer.remark = "Dummy koreksi verification untuk preview dashboard.";
        answer.sub = { ...(answer.sub || {}), [subName]: subAnswer };
        entry.verificationAnswers[rule.code] = answer;
        return;
      }

      const answer = entry.verificationAnswers[rule.code] || {};
      answer.option = getDashboardAdjustedOption(rule.options || [], answer.option, entryIndex + ruleIndex);
      answer.remark = "Dummy koreksi verification untuk preview dashboard.";
      entry.verificationAnswers[rule.code] = answer;
    });
  });
}

function getDashboardAdjustedOption(options, currentOption, seed) {
  if (!options.length) return currentOption || "";

  const currentIndex = Math.max(0, options.findIndex((option) => option.option === currentOption));
  const direction = seed % 2 === 0 ? 1 : -1;
  let nextIndex = Math.min(options.length - 1, Math.max(0, currentIndex + direction));

  if (nextIndex === currentIndex && options.length > 1) {
    nextIndex = Math.min(options.length - 1, Math.max(0, currentIndex - direction));
  }

  return options[nextIndex]?.option || currentOption || options[0]?.option || "";
}

function getOptionPoint(options, selectedOption) {
  const item = options.find((option) => option.option === selectedOption);
  return Number(item?.point || 0);
}

function getRuleRawAnswerTotal(rule, answer) {
  if (!answer) return 0;

  if (rule.hasSub) {
    return Object.entries(rule.subRules).reduce((sum, [subName, options]) => {
      const selected = answer.sub?.[subName]?.option || "";
      return sum + getOptionPoint(options, selected);
    }, 0);
  }

  return getOptionPoint(rule.options, answer.option || "");
}

function getRuleAnswerTotal(rule, answer) {
  if (!answer) return 0;
  if (rule.hasSub) {
    if (answer.rejected) return 0;
    return Object.entries(rule.subRules).reduce((sum, [subName, options]) => {
      const subAnswer = answer.sub?.[subName] || {};
      if (subAnswer.rejected) return sum;
      return sum + getOptionPoint(options, subAnswer.option || "");
    }, 0);
  }

  if (answer?.rejected) return 0;
  return getRuleRawAnswerTotal(rule, answer);
}

function getEmployeeInputTotal(entry) {
  const point = findPoint(entry.pointId);
  if (!point) return 0;
  const answers = getEmployeeVerificationAnswers(entry);

  return point.rules.reduce((sum, rule) => sum + getRuleAnswerTotal(rule, answers?.[rule.code]), 0);
}

function getEmployeeInputRawTotal(entry) {
  const point = findPoint(entry.pointId);
  if (!point) return 0;

  return point.rules.reduce((sum, rule) => sum + getRuleRawAnswerTotal(rule, entry.answers?.[rule.code]), 0);
}

function getEmployeeVerificationAnswers(entry) {
  return entry?.verificationAnswers || entry?.answers || {};
}

function getEvidenceCount(entry) {
  return Object.values(entry.answers || {}).filter((answer) => String(answer.evidence || "").trim()).length;
}

function getRejectedAnswerCount(entry) {
  const point = findPoint(entry.pointId);
  const answers = getEmployeeVerificationAnswers(entry);
  if (!point) return Object.values(answers || {}).filter((answer) => answer.rejected).length;

  return point.rules.reduce((count, rule) => {
    const answer = answers?.[rule.code] || {};
    if (rule.hasSub) {
      const subRejected = Object.keys(rule.subRules).filter((subName) => answer.sub?.[subName]?.rejected).length;
      return count + subRejected + (answer.rejected && subRejected === 0 ? 1 : 0);
    }

    return count + (answer.rejected ? 1 : 0);
  }, 0);
}

function resultCategory(totalPoint) {
  return `${Number(totalPoint || 0)} Point`;
}

function getInputRows() {
  return db.employeeInputs.map((entry) => {
    const employee = findEmployee(entry.employeeId) || {};
    const period = findPeriod(entry.periodId) || {};
    const point = findPoint(entry.pointId) || {};
    const totalPoint = getEmployeeInputTotal(entry);
    const rawTotalPoint = getEmployeeInputRawTotal(entry);
    const assessmentActive = entry.assessmentActive ?? ["Submitted", "Verified"].includes(entry.status);

    return {
      ...entry,
      employeeName: employee.name || "-",
      nik: employee.nik || "-",
      division: employee.division || "-",
      position: employee.position || "-",
      employeeStatus: employee.status || "Active",
      periodName: period.name || "-",
      pointName: point.name || "-",
      totalPoint,
      rawTotalPoint,
      assessmentStatus: assessmentActive ? "Active" : "Inactive",
      verificationStatus: entry.status === "Verified" ? "Verified" : "Unverified",
      evidenceCount: getEvidenceCount(entry),
      rejectedCount: getRejectedAnswerCount(entry),
      resultCategory: resultCategory(totalPoint)
    };
  });
}

function countByStatus(status) {
  return db.employeeInputs.filter((entry) => entry.status === status).length;
}

function getDashboardPeriod() {
  return findPeriod(appState.dashboardPeriodId) || getActiveProcessPeriod() || db.periods[0] || null;
}

function getDashboardRows(period = getDashboardPeriod()) {
  return getInputRows().filter((row) => !period || row.periodId === period.id);
}

function getProgressByDivision(rows = getInputRows()) {
  const groups = {};

  rows.forEach((row) => {
    if (!groups[row.division]) {
      groups[row.division] = { division: row.division, total: 0, draft: 0, submitted: 0, verified: 0, scored: 0, totalPoint: 0 };
    }

    groups[row.division].total += 1;
    if (row.status === "Draft") groups[row.division].draft += 1;
    if (row.status === "Submitted") groups[row.division].submitted += 1;
    if (isDashboardVerifiedRow(row)) groups[row.division].verified += 1;
    if (isDashboardScoredRow(row)) {
      groups[row.division].scored += 1;
      groups[row.division].totalPoint += row.totalPoint;
    }
  });

  return Object.values(groups).map((group) => ({
    ...group,
    progress: group.total ? Math.round((group.verified / group.total) * 100) : 0,
    averagePoint: group.scored ? Math.round(group.totalPoint / group.scored) : 0
  }));
}

function isDashboardVerifiedRow(row) {
  return row.status === "Verified" && row.assessmentStatus === "Active" && row.employeeStatus !== "Inactive";
}

function isDashboardPendingRow(row) {
  return row.status === "Draft" || row.assessmentStatus === "Inactive" || row.employeeStatus === "Inactive";
}

function isDashboardScoredRow(row) {
  return isDashboardVerifiedRow(row);
}

function getDashboardSubmittedUnverifiedRows(rows = getDashboardRows()) {
  return rows.filter((row) => row.status === "Submitted" && !isDashboardPendingRow(row));
}

function getDashboardAssessedRows(rows = getDashboardRows()) {
  return rows.filter((row) => ["Submitted", "Verified", "Approved"].includes(row.status)
    && row.assessmentStatus === "Active"
    && row.employeeStatus !== "Inactive");
}

function getDashboardPointSummary(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const employeeAktif = rows.filter((row) => row.employeeStatus !== "Inactive").length;
  const assessedRows = getDashboardAssessedRows(rows);
  const scoredRows = rows.filter(isDashboardScoredRow);
  const totals = scoredRows.map((row) => Number(row.totalPoint || 0));
  const totalPoint = totals.reduce((sum, value) => sum + value, 0);

  return {
    employeeAktif,
    assessed: assessedRows.length,
    averagePoint: scoredRows.length ? Math.round(totalPoint / scoredRows.length) : 0,
    highestPoint: totals.length ? Math.max(...totals) : 0,
    lowestPoint: totals.length ? Math.min(...totals) : 0,
    totalPoint
  };
}

function getDashboardCriteriaPointRows(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const point = findPoint(period?.pointId) || db.points[0];
  const assessedRows = rows.filter(isDashboardScoredRow).filter((row) => row.pointId === point?.id);
  const assessedCount = assessedRows.length;

  return (point?.rules || []).map((rule) => {
    const criteria = findCriteria(rule.code) || {};
    const points = assessedRows.map((row) => {
      const answers = getEmployeeVerificationAnswers(row);
      return getRuleAnswerTotal(rule, answers?.[rule.code]);
    });
    const totalPoint = points.reduce((sum, value) => sum + value, 0);

    return {
      code: rule.code,
      name: rule.criteriaName || criteria.name || rule.code,
      category: criteria.category || "-",
      hasSub: rule.hasSub,
      assessed: assessedCount,
      totalPoint,
      averagePoint: assessedCount ? Number((totalPoint / assessedCount).toFixed(1)) : 0,
      highestPoint: points.length ? Math.max(...points) : 0,
      lowestPoint: points.length ? Math.min(...points) : 0
    };
  });
}

function getDashboardCategoryPointRows(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const criteriaRows = getDashboardCriteriaPointRows(period, rows);
  const groups = {};

  criteriaRows.forEach((row) => {
    const key = row.category || "-";
    if (!groups[key]) groups[key] = { label: key, totalPoint: 0, criteriaCount: 0, assessed: row.assessed };
    groups[key].totalPoint += Number(row.totalPoint || 0);
    groups[key].criteriaCount += 1;
  });

  return Object.values(groups)
    .map((group) => ({
      ...group,
      value: group.criteriaCount && group.assessed ? Number((group.totalPoint / (group.criteriaCount * group.assessed)).toFixed(1)) : 0,
      note: `${group.criteriaCount} criteria`
    }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

function getDashboardRuleOption(row, rule) {
  const answers = getEmployeeVerificationAnswers(row);
  const answer = answers?.[rule.code] || {};
  if (!rule.hasSub) return answer.option || "Belum diisi";

  const firstSub = Object.keys(rule.subRules || {})[0];
  return answer.sub?.[firstSub]?.option || "Belum diisi";
}

function getDashboardCriteriaRules(period = getDashboardPeriod()) {
  const point = findPoint(period?.pointId) || db.points[0];
  return point?.rules || [];
}

function getDashboardSelectedCriteriaRule(period = getDashboardPeriod()) {
  const rules = getDashboardCriteriaRules(period);
  return rules.find((rule) => rule.code === appState.dashboardCriteriaCode)
    || rules.find((rule) => rule.code === "A3")
    || rules[0]
    || null;
}

function renderDashboardCriteriaOptions(period = getDashboardPeriod(), selectedRule = getDashboardSelectedCriteriaRule(period)) {
  return getDashboardCriteriaRules(period).map((rule) => `
    <option value="${escapeHtml(rule.code)}" ${rule.code === selectedRule?.code ? "selected" : ""}>
      ${escapeHtml(`${rule.code} - ${rule.criteriaName}`)}
    </option>
  `).join("");
}

function getRuleOptionDefinitions(rule) {
  const options = rule?.hasSub
    ? Object.values(rule.subRules || {}).flat()
    : rule?.options || [];
  const groups = {};

  options.forEach((option) => {
    if (!groups[option.option]) {
      groups[option.option] = { label: option.option, point: Number(option.point || 0), count: 0, totalPoint: 0 };
    }
  });

  return Object.values(groups).sort((a, b) => a.point - b.point || a.label.localeCompare(b.label));
}

function ensureOptionBucket(groups, label, point = 0) {
  if (!groups[label]) groups[label] = { label, point: Number(point || 0), count: 0, totalPoint: 0 };
  return groups[label];
}

function getDashboardCriteriaOptionRows(period = getDashboardPeriod(), rows = getDashboardRows(period), rule = getDashboardSelectedCriteriaRule(period)) {
  if (!rule) return [];

  const point = findPoint(period?.pointId) || db.points[0];
  const groups = {};
  getRuleOptionDefinitions(rule).forEach((option) => {
    groups[option.label] = option;
  });

  getDashboardAssessedRows(rows)
    .filter((row) => row.pointId === point?.id)
    .forEach((row) => {
      const answers = getEmployeeVerificationAnswers(row);
      const answer = answers?.[rule.code] || {};

      if (rule.hasSub) {
        Object.entries(rule.subRules || {}).forEach(([subName, options]) => {
          const selected = answer.sub?.[subName]?.option || "Belum diisi";
          const optionPoint = getOptionPoint(options, selected);
          const bucket = ensureOptionBucket(groups, selected, optionPoint);
          bucket.count += 1;
          bucket.totalPoint += optionPoint;
        });
        return;
      }

      const selected = answer.option || "Belum diisi";
      const optionPoint = getOptionPoint(rule.options || [], selected);
      const bucket = ensureOptionBucket(groups, selected, optionPoint);
      bucket.count += 1;
      bucket.totalPoint += optionPoint;
    });

  return Object.values(groups).sort((a, b) => a.point - b.point || a.label.localeCompare(b.label));
}

function getDashboardCriteriaComparisonRows(period = getDashboardPeriod(), rows = getDashboardRows(period), rule = getDashboardSelectedCriteriaRule(period)) {
  if (!rule) return [];

  const point = findPoint(period?.pointId) || db.points[0];
  const groups = {};
  getRuleOptionDefinitions(rule).forEach((option) => {
    groups[option.label] = { ...option, count: 0, inputCount: 0, finalCount: 0, totalPoint: 0 };
  });

  function addAnswer(answer, targetKey, includePoint = false) {
    if (rule.hasSub) {
      Object.entries(rule.subRules || {}).forEach(([subName, options]) => {
        const selected = answer.sub?.[subName]?.option || "Belum diisi";
        const optionPoint = getOptionPoint(options, selected);
        const bucket = ensureOptionBucket(groups, selected, optionPoint);
        bucket[targetKey] = Number(bucket[targetKey] || 0) + 1;
        if (includePoint) {
          bucket.count += 1;
          bucket.totalPoint += optionPoint;
        }
      });
      return;
    }

    const selected = answer.option || "Belum diisi";
    const optionPoint = getOptionPoint(rule.options || [], selected);
    const bucket = ensureOptionBucket(groups, selected, optionPoint);
    bucket[targetKey] = Number(bucket[targetKey] || 0) + 1;
    if (includePoint) {
      bucket.count += 1;
      bucket.totalPoint += optionPoint;
    }
  }

  rows.filter(isDashboardScoredRow)
    .filter((row) => row.pointId === point?.id)
    .forEach((row) => {
      const answers = getEmployeeVerificationAnswers(row);
      addAnswer(row.answers?.[rule.code] || {}, "inputCount");
      addAnswer(answers?.[rule.code] || {}, "finalCount", true);
    });

  return Object.values(groups).sort((a, b) => a.point - b.point || a.label.localeCompare(b.label));
}

function getDashboardOptionBreakdown(period = getDashboardPeriod(), rows = getDashboardRows(period), criteriaCode) {
  const point = findPoint(period?.pointId) || db.points[0];
  const rule = point?.rules.find((item) => item.code === criteriaCode);
  if (!rule) return [];

  const groups = {};
  getDashboardAssessedRows(rows)
    .filter((row) => row.pointId === point?.id)
    .forEach((row) => {
      const label = getDashboardRuleOption(row, rule);
      if (!groups[label]) groups[label] = { label, count: 0, totalPoint: 0 };
      groups[label].count += 1;
      groups[label].totalPoint += Number(row.totalPoint || 0);
    });

  return Object.values(groups)
    .map((group) => ({
      ...group,
      value: group.count,
      note: `${group.count ? Math.round(group.totalPoint / group.count) : 0} avg point`
    }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

function getDashboardPointDistributionRows(rows = getDashboardRows()) {
  const buckets = [
    { label: "<= 0", min: -Infinity, max: 0 },
    { label: "1 - 50", min: 1, max: 50 },
    { label: "51 - 100", min: 51, max: 100 },
    { label: "101 - 150", min: 101, max: 150 },
    { label: "> 150", min: 151, max: Infinity }
  ].map((bucket) => ({ ...bucket, value: 0, note: "0 employee" }));

  rows.filter(isDashboardScoredRow).forEach((row) => {
    const point = Number(row.totalPoint || 0);
    const bucket = buckets.find((item) => point >= item.min && point <= item.max) || buckets[0];
    bucket.value += 1;
    bucket.note = `${bucket.value} employee`;
  });

  return buckets;
}

function getDashboardDivisionPointRows(rows = getDashboardRows()) {
  return getDivisionChartRows(rows)
    .filter((row) => row.scored > 0)
    .map((row) => ({
      label: row.division,
      value: row.averagePoint,
      note: `${row.scored}/${row.total} final verified`,
      totalPoint: row.totalPoint,
      scored: row.scored
    }));
}

function getDashboardCriteriaImpactRows(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const point = findPoint(period?.pointId) || db.points[0];
  const scoredRows = rows.filter(isDashboardScoredRow).filter((row) => row.pointId === point?.id);

  return (point?.rules || []).map((rule) => {
    const criteria = findCriteria(rule.code) || {};
    const totals = scoredRows.reduce((summary, row) => {
      const inputPoint = getRuleRawAnswerTotal(rule, row.answers?.[rule.code]);
      const finalPoint = getRuleAnswerTotal(rule, getEmployeeVerificationAnswers(row)?.[rule.code]);

      summary.inputTotal += inputPoint;
      summary.finalTotal += finalPoint;
      summary.count += 1;
      return summary;
    }, { inputTotal: 0, finalTotal: 0, count: 0 });
    const gap = totals.finalTotal - totals.inputTotal;

    return {
      code: rule.code,
      name: rule.criteriaName || criteria.name || rule.code,
      category: criteria.category || "-",
      assessed: totals.count,
      inputTotal: totals.inputTotal,
      finalTotal: totals.finalTotal,
      averagePoint: totals.count ? Number((totals.finalTotal / totals.count).toFixed(1)) : 0,
      gap,
      absGap: Math.abs(gap)
    };
  });
}

function getDashboardPointDeltaSummary(rows = getDashboardRows()) {
  return rows.filter(isDashboardScoredRow).reduce((summary, row) => {
    const inputPoint = Number(row.rawTotalPoint || 0);
    const finalPoint = Number(row.totalPoint || 0);

    if (finalPoint > inputPoint) summary.up += 1;
    else if (finalPoint < inputPoint) summary.down += 1;
    else summary.same += 1;

    summary.total += 1;
    summary.delta += finalPoint - inputPoint;
    return summary;
  }, { up: 0, down: 0, same: 0, total: 0, delta: 0 });
}

const dashboardAssessmentProgressSeed = [
  { periodId: "RNP-2022", year: "2022", employeeAktif: 128, submitted: 118, verified: 104, approved: 96 },
  { periodId: "RNP-2023", year: "2023", employeeAktif: 142, submitted: 132, verified: 119, approved: 108 },
  { periodId: "RNP-2024", year: "2024", employeeAktif: 157, submitted: 149, verified: 133, approved: 121 },
  { periodId: "RNP-2025", year: "2025", employeeAktif: 171, submitted: 160, verified: 145, approved: 132 },
  { periodId: "RNP-2026", year: "2026", employeeAktif: 184, submitted: 163, verified: 128, approved: 93 }
];

const dashboardDivisionProgressSeed = [
  { code: "SKP", name: "Sekretaris Perusahaan", total: 11, draft: 1, submitted: 2, verified: 8 },
  { code: "SPI", name: "Satuan Pengawasan Intern", total: 9, draft: 1, submitted: 2, verified: 6 },
  { code: "TIK", name: "Teknologi Informasi dan Komunikasi", total: 14, draft: 1, submitted: 3, verified: 10 },
  { code: "HKM", name: "Hukum", total: 8, draft: 1, submitted: 2, verified: 5 },
  { code: "PHS", name: "Pengawasan", total: 12, draft: 2, submitted: 2, verified: 8 },
  { code: "KEU", name: "Keuangan", total: 15, draft: 1, submitted: 3, verified: 11 },
  { code: "SDM", name: "Sumber Daya Manusia", total: 17, draft: 2, submitted: 3, verified: 12 },
  { code: "UMP", name: "Umum dan Pengadaan", total: 16, draft: 2, submitted: 3, verified: 11 },
  { code: "PSR", name: "Pemasaran", total: 13, draft: 1, submitted: 3, verified: 9 },
  { code: "PMB", name: "Pengembangan", total: 12, draft: 2, submitted: 2, verified: 8 },
  { code: "KSR", name: "Manajemen Kawasan SIER", total: 14, draft: 2, submitted: 2, verified: 10 },
  { code: "KPR", name: "Manajemen Kawasan PIER", total: 13, draft: 1, submitted: 3, verified: 9 },
  { code: "LOG", name: "Logistik", total: 10, draft: 1, submitted: 2, verified: 7 },
  { code: "UJP", name: "Jasa Penunjang", total: 20, draft: 3, submitted: 3, verified: 14 }
];

function getDashboardAssessmentSummary(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const seeded = dashboardAssessmentProgressSeed.find((item) => item.periodId === period?.id || item.year === period?.year);

  if (seeded) {
    return {
      ...seeded,
      pendingApproval: Math.max(Number(seeded.verified || 0) - Number(seeded.approved || 0), 0)
    };
  }

  const employeeAktif = rows.filter((row) => row.employeeStatus !== "Inactive").length;
  const submitted = rows.filter((row) => ["Submitted", "Verified", "Approved"].includes(row.status)).length;
  const verified = rows.filter((row) => row.status === "Verified" || row.status === "Approved").length;
  const approved = period?.status === "Approved" ? verified : 0;

  return {
    periodId: period?.id || "",
    year: period?.year || "-",
    employeeAktif,
    submitted,
    verified,
    pendingApproval: Math.max(verified - approved, 0),
    approved
  };
}

function renderDashboardPeriodOptions(selectedPeriod = getDashboardPeriod()) {
  return db.periods.map((period) => `
    <option value="${escapeHtml(period.id)}" ${period.id === selectedPeriod?.id ? "selected" : ""}>
      ${escapeHtml(period.name)}
    </option>
  `).join("");
}

function getRankingRows(rows = getInputRows()) {
  return rows
    .filter(isDashboardScoredRow)
    .sort((a, b) => b.totalPoint - a.totalPoint || a.employeeName.localeCompare(b.employeeName));
}

function getDivisionChartRows(rows = getInputRows()) {
  const groups = {};

  rows.forEach((row) => {
    if (!groups[row.division]) {
      groups[row.division] = { division: row.division, total: 0, scored: 0, totalPoint: 0, verified: 0 };
    }

    groups[row.division].total += 1;
    if (isDashboardVerifiedRow(row)) groups[row.division].verified += 1;
    if (isDashboardScoredRow(row)) {
      groups[row.division].scored += 1;
      groups[row.division].totalPoint += row.totalPoint;
    }
  });

  const chartRows = Object.values(groups).map((group) => ({
    ...group,
    averagePoint: group.scored ? Math.round(group.totalPoint / group.scored) : 0
  })).sort((a, b) => b.averagePoint - a.averagePoint);
  const maxPoint = Math.max(...chartRows.map((row) => row.averagePoint), 1);

  return chartRows.map((row) => ({
    ...row,
    percent: Math.max(6, Math.round((row.averagePoint / maxPoint) * 100))
  }));
}

function getDashboardStatusCounts(rows = getInputRows()) {
  return rows.reduce((counts, row) => {
    if (row.status === "Draft") counts.draft += 1;
    if (row.status === "Submitted") counts.submitted += 1;
    if (isDashboardVerifiedRow(row)) counts.verified += 1;
    if (isDashboardVerifiedRow(row)) counts.verif += 1;
    if (isDashboardPendingRow(row)) counts.belumMengisi += 1;
    counts.total += 1;
    return counts;
  }, { draft: 0, submitted: 0, verified: 0, verif: 0, belumMengisi: 0, total: 0 });
}

function getTrendRows() {
  return dashboardAssessmentProgressSeed
    .map((row) => ({
      ...row,
      pendingApproval: Math.max(Number(row.verified || 0) - Number(row.approved || 0), 0)
    }))
    .sort((a, b) => Number(a.year) - Number(b.year) || String(a.year).localeCompare(String(b.year)));
}

function distributeDashboardTotal(total, weights) {
  const normalizedTotal = Math.max(0, Math.round(Number(total || 0)));
  const weightTotal = weights.reduce((sum, value) => sum + Number(value || 0), 0);
  if (!weightTotal) return weights.map(() => 0);

  const shares = weights.map((weight, index) => {
    const raw = (Number(weight || 0) / weightTotal) * normalizedTotal;
    return { index, value: Math.floor(raw), remainder: raw - Math.floor(raw) };
  });
  let remaining = normalizedTotal - shares.reduce((sum, item) => sum + item.value, 0);

  [...shares].sort((a, b) => b.remainder - a.remainder).forEach((item) => {
    if (remaining <= 0) return;
    shares[item.index].value += 1;
    remaining -= 1;
  });

  return shares.map((item) => item.value);
}

function getDivisionCategoryRows(rows = getDashboardRows(), period = getDashboardPeriod()) {
  const summary = getDashboardAssessmentSummary(period, rows);
  const totals = distributeDashboardTotal(summary.employeeAktif, dashboardDivisionProgressSeed.map((item) => item.total));
  const approvedCounts = distributeDashboardTotal(summary.approved, dashboardDivisionProgressSeed.map((item) => item.verified))
    .map((value, index) => Math.min(value, totals[index]));
  const verifiedCounts = distributeDashboardTotal(Math.max(Number(summary.verified || 0) - Number(summary.approved || 0), 0), dashboardDivisionProgressSeed.map((item) => item.verified))
    .map((value, index) => Math.min(value, Math.max(totals[index] - approvedCounts[index], 0)));
  const submittedCounts = distributeDashboardTotal(Math.max(Number(summary.submitted || 0) - Number(summary.verified || 0), 0), dashboardDivisionProgressSeed.map((item) => item.submitted))
    .map((value, index) => Math.min(value, Math.max(totals[index] - approvedCounts[index] - verifiedCounts[index], 0)));

  return dashboardDivisionProgressSeed.map((item, index) => ({
    ...item,
    total: totals[index],
    submitted: submittedCounts[index],
    verified: verifiedCounts[index],
    approved: approvedCounts[index],
    division: `${item.code} - ${item.name}`,
    progress: totals[index] ? Math.round(((verifiedCounts[index] + approvedCounts[index]) / totals[index]) * 100) : 0,
    averagePoint: 0
  }));
}

function todayLabel() {
  return "09 Juli 2026";
}

function formatDate(value) {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${day} ${months[Number(month) - 1]} ${year}`;
}

function backToProcessList(fallbackPeriodId = null) {
  const entry = findEmployeeInput(appState.selectedId);
  setSection("verification", "period", entry?.periodId || fallbackPeriodId);
}

function getActiveProcessPeriodId() {
  if (appState.section === "verification" && appState.view === "period" && appState.selectedId) {
    return appState.selectedId;
  }

  if (appState.section === "verification" && ["detail", "edit", "verify"].includes(appState.view)) {
    return findEmployeeInput(appState.selectedId)?.periodId || db.periods[0]?.id || null;
  }

  return db.periods[0]?.id || null;
}

function getActiveProcessPeriod() {
  return findPeriod(getActiveProcessPeriodId());
}

function processAccess() {
  const access = appState.processAccess || {};
  return {
    viewProcess: access.viewProcess !== false,
    scope: access.scope === "onlyMe" ? "onlyMe" : "all",
    editProcess: access.editProcess !== false,
    verificationProcess: access.verificationProcess !== false
  };
}

function canViewProcess() {
  return processAccess().viewProcess;
}

function canEditProcess() {
  const access = processAccess();
  return access.viewProcess && access.editProcess;
}

function canVerifyProcess() {
  const access = processAccess();
  return access.viewProcess && access.verificationProcess;
}

function isProcessOpenPeriod(period) {
  return (period?.phase || "input") === "input" || period?.status === "Open";
}

function isProcessVerificationPeriod(period) {
  return period?.phase === "verification" || period?.status === "Closed" || period?.status === "Verification";
}

function isProcessFinalPeriod(period) {
  return period?.phase === "approval" || period?.status === "Approved" || period?.status === "Outstanding";
}

function getProcessRows(period = null) {
  const access = processAccess();
  const currentEmployee = getCurrentEmployee();

  return getInputRows()
    .filter((item) => !period || item.periodId === period.id)
    .filter((item) => access.scope === "all" || item.employeeId === currentEmployee?.id);
}

function canAccessProcessEntry(entry) {
  const access = processAccess();
  const currentEmployee = getCurrentEmployee();
  return access.scope === "all" || entry?.employeeId === currentEmployee?.id;
}

function defaultApprovalSteps(period) {
  const approved = period?.status === "Approved";
  return [
    { id: "kepala-divisi", role: "Kepala Divisi", approver: "Kepala Divisi Terkait", status: approved ? "Approved" : "Pending", date: approved ? period.lastUpdate : "-" },
    { id: "direktur", role: "Direktur", approver: "Direktur Terkait", status: approved ? "Approved" : "Pending", date: approved ? period.lastUpdate : "-" },
    { id: "direktur-utama", role: "Direktur Utama", approver: "Direktur Utama", status: approved ? "Approved" : "Pending", date: approved ? period.lastUpdate : "-" }
  ];
}

function ensurePeriodApprovals(period) {
  if (!period) return [];
  if (!Array.isArray(period.approvals)) {
    period.approvals = defaultApprovalSteps(period);
  }

  return period.approvals;
}

function getApprovalProgress(period) {
  const approvals = ensurePeriodApprovals(period);
  const approved = approvals.filter((item) => item.status === "Approved").length;
  return { approved, total: approvals.length };
}

function setSection(section, view = "list", selectedId = null) {
  appState.section = section;
  appState.view = view;
  appState.selectedId = selectedId;
  appState.modal = null;
  appState.pendingDelete = null;
  appState.pointDraft = null;

  if (section === "verification" && ["detail", "edit", "verify"].includes(view)) {
    appState.processTab = view === "verify" ? "verification" : "input";
  }

  if (section === "point" && (view === "add" || view === "edit")) {
    appState.pointDraft = createPointDraft(view, selectedId);
  }

  render();
}

function createPointDraft(view, id) {
  if (view === "edit") {
    return clone(findPoint(id));
  }

  return {
    id: "",
    docNo: "Auto",
    period: "2026",
    name: "",
    description: "",
    lastUpdate: todayLabel(),
    rules: db.criteria.slice(0, 6).map((item) => makeRuleForCriteria(item.code))
  };
}

function render() {
  updateChrome();

  if (appState.section === "dashboard") {
    app.innerHTML = renderDashboard();
  } else if (appState.section === "category") {
    app.innerHTML = renderCategory();
  } else if (appState.section === "criteria") {
    app.innerHTML = renderCriteria();
  } else if (appState.section === "point") {
    app.innerHTML = renderPoint();
  } else if (appState.section === "period") {
    app.innerHTML = renderPeriod();
  } else if (appState.section === "myReward") {
    app.innerHTML = renderMyReward();
  } else if (appState.section === "assessment") {
    app.innerHTML = appState.view === "form"
      ? renderAssessment()
      : appState.view === "period"
        ? renderAssessmentEmployeeList()
        : renderPeriodSelection("assessment");
  } else if (appState.section === "employeeProcess") {
    app.innerHTML = appState.view === "form"
      ? renderEmployeeProcessForm()
      : renderPeriodSelection("employeeProcess");
  } else if (appState.section === "employeeResult") {
    app.innerHTML = appState.view === "form"
      ? renderEmployeeResultDetail()
      : appState.view === "period"
        ? renderEmployeeResult()
        : renderPeriodSelection("employeeResult");
  } else if (appState.section === "employeeInput") {
    app.innerHTML = renderEmployeeInput();
  } else if (appState.section === "verification") {
    app.innerHTML = canViewProcess() ? ["detail", "edit", "verify"].includes(appState.view)
      ? renderProcessEntryPage()
      : appState.view === "period"
        ? renderVerification()
        : renderPeriodSelection("verification") : renderNoAccess("Process");
  } else {
    app.innerHTML = renderDashboard();
  }

  renderDrawer();
  renderModal();
  renderIcons();
  restoreSearchFocus();
}

function updateChrome() {
  const processMenu = document.querySelector('[data-section="verification"]');
  if (processMenu) processMenu.hidden = !canViewProcess();

  document.querySelectorAll(".sub-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.section === appState.section);
  });
  document.querySelectorAll("[data-group='masterData']").forEach((item) => {
    const active = ["category", "criteria", "point", "period"].includes(appState.section);
    item.classList.toggle("active", active);
    if (active) appState.sidebarGroups.masterData = true;
  });
  document.querySelectorAll("[data-group='employeeData']").forEach((item) => {
    const active = ["employeeProcess", "employeeResult"].includes(appState.section);
    item.classList.toggle("active", active);
    if (active) appState.sidebarGroups.employeeData = true;
  });
  syncSidebarDropdowns();

  const masterActive = appState.section === "dashboard" || rewardSections().includes(appState.section);
  document.querySelector('[data-section="dashboard"]').classList.toggle("active", masterActive);

  const crumb = ["Reward & Punishment"];
  if (appState.section !== "dashboard") {
    crumb.push(groupForSection(appState.section));
    crumb.push(titleForSection(appState.section));
  }
  if (appState.view !== "list" && appState.view !== "dashboard") {
    crumb.push(titleForView(appState.view));
  }

  breadcrumb.innerHTML = crumb.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  backButton.classList.toggle("is-hidden", appState.view === "list" || appState.view === "dashboard");
}

function syncSidebarDropdowns() {
  document.querySelectorAll("[data-group]").forEach((button) => {
    const group = button.dataset.group;
    const isOpen = appState.sidebarGroups[group] !== false;
    const nested = button.nextElementSibling?.classList.contains("submenu-nested") ? button.nextElementSibling : null;

    button.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    if (nested) nested.classList.toggle("is-collapsed", !isOpen);
  });
}

function titleForSection(section) {
  return {
    category: "Category",
    criteria: "Criteria",
    point: "Point",
    period: "Period",
    verification: "Process",
    assessment: "Result",
    employeeProcess: "Process",
    employeeResult: "Result",
    dashboard: "Reward & Punishment"
  }[section] || section;
}

function groupForSection(section) {
  if (["category", "criteria", "point", "period"].includes(section)) return "Master Data";
  if (["verification", "assessment"].includes(section)) return "Reward";
  if (["employeeProcess", "employeeResult"].includes(section)) return "Employee";
  return "Overview";
}

function rewardSections() {
  return ["category", "criteria", "point", "period", "verification", "assessment", "employeeProcess", "employeeResult"];
}

function titleForView(view) {
  return { add: "Add", edit: "Edit", verify: "Verify", detail: "Detail", form: "Form", period: "Data", list: "List" }[view] || view;
}

function renderDashboard() {
  const period = getDashboardPeriod();
  const rows = getDashboardRows(period);

  return `
    <div class="dashboard-page">
      ${renderDashboardOverviewPanel(period, rows)}
      ${renderAssessmentAnalyticsPanel(period, rows)}
      ${renderEmployeeDetailPanel(rows)}
      ${renderDivisionAssessmentPanel(rows, period)}
    </div>
  `;
}

function renderPeriodSelection(targetSection) {
  const periodTableSections = {
    assessment: "assessmentPeriod",
    verification: "verificationPeriod",
    employeeProcess: "employeeProcessPeriod",
    employeeResult: "employeeResultPeriod"
  };
  const tableSection = periodTableSections[targetSection] || "verificationPeriod";
  const periodRows = targetSection === "employeeProcess" ? db.periods.filter(isProcessOpenPeriod) : db.periods;
  const items = filterRows(periodRows, tableSection, tableSearchKeys(tableSection));
  const page = getPaged(items, tableSection);
  const isResult = ["assessment", "employeeResult"].includes(targetSection);
  const isEmployee = ["employeeProcess", "employeeResult"].includes(targetSection);

  return `
    <div class="page-grid">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>${isResult ? "Result" : "Process"}</h2>
            <small class="panel-kicker">${isEmployee
              ? `Pilih periode untuk melihat ${isResult ? "result" : "process"} milik employee aktif`
              : isResult
                ? "Pilih data sebelum melihat hasil Reward & Punishment"
                : "Pilih data sebelum melihat daftar proses employee"}</small>
          </div>
        </div>
        ${renderToolbar(tableSection, periodRows)}
        <div class="table-wrap">
          <table class="data-table period-table">
            <thead>
              <tr>
                <th class="center">No</th>
                <th>Doc No</th>
                <th>Name</th>
                <th>Year</th>
                <th>Start Date Input</th>
                <th>Finish Date Input</th>
                <th>Status</th>
                <th>Last Update</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${page.rows.length ? page.rows.map((item, index) => `
                <tr>
                  <td class="center">${page.start + index + 1}</td>
                  <td>${escapeHtml(item.docNo)}</td>
                  <td>${escapeHtml(item.name)}</td>
                  <td>${escapeHtml(item.year)}</td>
                  <td>${escapeHtml(formatDate(item.startDate))}</td>
                  <td>${escapeHtml(formatDate(item.finishDate))}</td>
                  <td>${statusPill(item.status)}</td>
                  <td>${escapeHtml(item.lastUpdate)}</td>
                  <td class="center">${periodSelectionActions(targetSection, item)}</td>
                </tr>
              `).join("") : emptyRow(9, "No data found.")}
            </tbody>
          </table>
        </div>
        ${renderPagination(page, tableSection)}
      </div>
    </div>
  `;
}

function renderSelectedPeriodContext(period, title, section) {
  if (!period) return "";

  return `
    <div class="panel period-context-panel">
      <div class="period-context-head">
        <h2>${escapeHtml(title)}</h2>
      </div>
      <div class="period-context-body">
        <div><span>No Document</span><strong>: ${escapeHtml(period.docNo)}</strong></div>
        <div><span>Name</span><strong>: ${escapeHtml(period.name)}</strong></div>
        <div><span>Start Date</span><strong>: ${escapeHtml(formatDate(period.startDate))}</strong></div>
        <div><span>Finish Date</span><strong>: ${escapeHtml(formatDate(period.finishDate))}</strong></div>
        <div><span>Last update</span><strong>: ${escapeHtml(period.lastUpdate)}</strong></div>
      </div>
    </div>
  `;
}

function renderAssessmentEmployeeList() {
  const period = findPeriod(appState.selectedId);
  if (!period) return renderNotFound("Result");

  const verifiedRows = getInputRows().filter((item) => item.periodId === period.id && item.status === "Verified");
  const rows = filterRows(verifiedRows, "assessmentEmployee", tableSearchKeys("assessmentEmployee"));
  const page = getPaged(rows, "assessmentEmployee");

  return `
    <div class="page-grid">
      ${renderSelectedPeriodContext(period, "Result Reward & Punishment", "assessment")}
      ${renderResultApprovalPanel(period)}
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Verified Result</h2>
            <small class="panel-kicker">Hasil verified dari input user dan koreksi verification</small>
          </div>
        </div>
        ${renderToolbar("assessmentEmployee", rows)}
        <div class="table-wrap">
          <table class="data-table assessment-employee-table">
            <thead>
              <tr>
                <th class="center no-sort">No</th>
                <th>Name</th>
                <th>NIK</th>
                <th>Position & Division</th>
                <th class="center">Total Point<br>(Input)</th>
                <th class="center">Total Point<br>(Verification)</th>
                <th>Verification Status</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${page.rows.length ? page.rows.map((item, index) => `
                <tr>
                  <td class="center">${page.start + index + 1}</td>
                  <td>
                    <strong>${escapeHtml(item.employeeName)}</strong>
                  </td>
                  <td>${escapeHtml(item.nik)}</td>
                  <td>
                    <strong>${escapeHtml(item.position || "-")}</strong>
                    <small class="table-subtext">${escapeHtml(item.division)}</small>
                  </td>
                  <td class="center"><strong>${escapeHtml(item.rawTotalPoint)}</strong></td>
                  <td class="center">${processVerificationPoint(item.rawTotalPoint, item.totalPoint)}</td>
                  <td>${statusPill(item.verificationStatus)}</td>
                  <td class="center">${assessmentEmployeeActions(item)}</td>
                </tr>
              `).join("") : emptyRow(8, "No verified Reward & Punishment result found.")}
            </tbody>
          </table>
        </div>
        ${renderPagination(page, "assessmentEmployee")}
      </div>
    </div>
  `;
}

function getEmployeePeriodRows(period = null, verifiedOnly = false, ensureEntry = false) {
  const employee = getCurrentEmployee();
  if (ensureEntry && period?.id) ensureCurrentEmployeeInput(period.id);

  return getInputRows()
    .filter((item) => item.employeeId === employee?.id)
    .filter((item) => !period || item.periodId === period.id)
    .filter((item) => !verifiedOnly || item.status === "Verified");
}

function isCurrentEmployeeEntry(entry) {
  const employee = getCurrentEmployee();
  return Boolean(entry && employee && entry.employeeId === employee.id);
}

function renderEmployeeProcess() {
  const period = findPeriod(appState.selectedId);
  if (!period) return renderNotFound("Process");

  const rows = getEmployeePeriodRows(period, false, true);
  const items = filterRows(rows, "employeeProcess", tableSearchKeys("employeeProcess"));
  const page = getPaged(items, "employeeProcess");

  return `
    <div class="page-grid">
      <div class="panel process-panel">
        <div class="process-head">
          <div>
            <h2>Process</h2>
            <small class="panel-kicker">Data process milik employee aktif.</small>
          </div>
        </div>
        ${renderProcessContext(period)}
        ${renderProcessToolbar(rows, "employeeProcess")}
        <div class="table-wrap">
          <table class="data-table verification-table">
            <thead>
              <tr>
                <th class="center no-sort">No</th>
                <th>Name</th>
                <th>NIK</th>
                <th>Position & Division</th>
                <th class="center">Total Point<br>(Input)</th>
                <th class="center">Total Point<br>(Verification)</th>
                <th>Assessment Status</th>
                <th>Verification Status</th>
                <th>Last Edited</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${page.rows.length ? page.rows.map((item, index) => `
                <tr>
                  <td class="center">${page.start + index + 1}</td>
                  <td><strong>${escapeHtml(item.employeeName)}</strong></td>
                  <td>${escapeHtml(item.nik)}</td>
                  <td>
                    <strong>${escapeHtml(item.position || "-")}</strong>
                    <small class="table-subtext">${escapeHtml(item.division)}</small>
                  </td>
                  <td class="center"><strong>${escapeHtml(item.rawTotalPoint)}</strong></td>
                  <td class="center">${processVerificationPoint(item.rawTotalPoint, item.totalPoint)}</td>
                  <td>${statusPill(item.assessmentStatus)}</td>
                  <td>${statusPill(item.verificationStatus)}</td>
                  <td>${escapeHtml(item.lastUpdate || "-")}</td>
                  <td class="center">${employeeProcessActions(item)}</td>
                </tr>
              `).join("") : emptyRow(10, "No process data found.")}
            </tbody>
          </table>
        </div>
        ${renderPagination(page, "employeeProcess")}
      </div>
    </div>
  `;
}

function renderEmployeeResult() {
  const period = findPeriod(appState.selectedId);
  if (!period) return renderNotFound("Result");

  const rows = getEmployeePeriodRows(period, false, true);
  const items = filterRows(rows, "employeeResult", tableSearchKeys("employeeResult"));
  const page = getPaged(items, "employeeResult");

  return `
    <div class="page-grid">
      ${renderSelectedPeriodContext(period, "Result Reward & Punishment", "employeeResult")}
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Employee Result</h2>
            <small class="panel-kicker">Hasil input dan verification milik employee aktif.</small>
          </div>
        </div>
        ${renderToolbar("employeeResult", rows)}
        <div class="table-wrap">
          <table class="data-table assessment-employee-table">
            <thead>
              <tr>
                <th class="center no-sort">No</th>
                <th>Name</th>
                <th>NIK</th>
                <th>Position & Division</th>
                <th class="center">Total Point<br>(Input)</th>
                <th class="center">Total Point<br>(Verification)</th>
                <th>Verification Status</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${page.rows.length ? page.rows.map((item, index) => `
                <tr>
                  <td class="center">${page.start + index + 1}</td>
                  <td><strong>${escapeHtml(item.employeeName)}</strong></td>
                  <td>${escapeHtml(item.nik)}</td>
                  <td>
                    <strong>${escapeHtml(item.position || "-")}</strong>
                    <small class="table-subtext">${escapeHtml(item.division)}</small>
                  </td>
                  <td class="center"><strong>${escapeHtml(item.rawTotalPoint)}</strong></td>
                  <td class="center">${processVerificationPoint(item.rawTotalPoint, item.totalPoint)}</td>
                  <td>${statusPill(item.verificationStatus)}</td>
                  <td class="center">${employeeResultActions(item)}</td>
                </tr>
              `).join("") : emptyRow(8, "No Reward & Punishment result found.")}
            </tbody>
          </table>
        </div>
        ${renderPagination(page, "employeeResult")}
      </div>
    </div>
  `;
}

function renderEmployeeProcessForm() {
  const entry = findEmployeeInput(appState.selectedId);
  if (!entry) return renderNotFound("Process");
  if (!isCurrentEmployeeEntry(entry)) return renderNoAccess("Employee Process");

  const employee = findEmployee(entry.employeeId);
  const period = findPeriod(entry.periodId);
  const point = findPoint(entry.pointId);
  if (!employee || !period || !point) return renderNotFound("Process");

  const editable = isProcessOpenPeriod(period) && entry.status !== "Verified";

  return `
    <form class="process-entry-page employee-process-form" id="employeeInputForm">
      ${renderProcessEntryHeader(entry, employee, period, "input")}
      ${renderProcessInputTab(entry, point, editable, "Catatan employee sebelum submit", false)}
    </form>
  `;
}

function renderEmployeeResultDetail() {
  const entry = findEmployeeInput(appState.selectedId);
  if (!entry) return renderNotFound("Result");
  if (!isCurrentEmployeeEntry(entry)) return renderNoAccess("Employee Result");

  const employee = findEmployee(entry.employeeId);
  const period = findPeriod(entry.periodId);
  if (!employee || !period) return renderNotFound("Result");

  const inputTotal = getEmployeeInputRawTotal(entry);
  const verificationTotal = getEmployeeInputTotal(entry);

  return `
    <div class="process-entry-page assessment-final-page">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Result Detail</h2>
            <small class="panel-kicker">Hasil Reward & Punishment milik employee aktif.</small>
          </div>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Doc No", entry.docNo],
            ["Employee", `${employee.name} / ${employee.nik}`],
            ["Division", employee.division],
            ["Tanggal Submit", entry.submittedAt || "-"],
            ["Total Point (Final)", processVerificationPoint(inputTotal, verificationTotal)],
            ["Final Status", statusPill(entry.status === "Verified" ? "Verified" : "Unverified")],
            ["Verifier", entry.verifier],
            ["Notes", entry.notes || "-"]
          ])}
        </div>
      </div>
      ${renderFinalResultPanel(entry)}
    </div>
  `;
}

function renderResultApprovalPanel(period, editable = true) {
  const approvals = ensurePeriodApprovals(period);

  return `
    <div class="panel result-approval-panel">
      <div class="panel-header">
        <div>
          <h2>Approval Periode</h2>
          <small class="panel-kicker">Approval result berlaku untuk periode ${escapeHtml(period.year || "-")}</small>
        </div>
        ${statusPill(period.status)}
      </div>
      <div class="panel-body">
        <div class="approval-flow">
          ${approvals.map((item, index) => renderApprovalStep(period, item, index, editable)).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderDashboardApprovalPanel(period) {
  const approvals = ensurePeriodApprovals(period);

  return `
    <div class="dashboard-card dashboard-approval-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Approval Periode</h2>
          <small>Approval result berlaku untuk periode ${escapeHtml(period?.year || "-")}</small>
        </div>
        ${statusPill(period?.status)}
      </div>
      <div class="dashboard-approval-body">
        <div class="approval-flow">
          ${approvals.map((item, index) => renderApprovalStep(period, item, index, false)).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderApprovalStep(period, item, index, editable = true) {
  const approved = item.status === "Approved";
  return `
    <div class="approval-step ${approved ? "approved" : ""}">
      <span class="approval-number">${escapeHtml(index + 1)}</span>
      <div>
        <strong>${escapeHtml(item.role)}</strong>
        <small>${escapeHtml(item.approver)}</small>
      </div>
      <div class="approval-status-block">
        ${statusPill(item.status)}
        <small>${escapeHtml(item.date || "-")}</small>
      </div>
      ${approved || !editable ? "" : `<button class="btn success" type="button" data-action="approve-result-step" data-period-id="${escapeHtml(period.id)}" data-step-id="${escapeHtml(item.id)}">${icon("check")} Approve</button>`}
    </div>
  `;
}

function assessmentEmployeeActions(item) {
  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View Detail" aria-label="View Detail" data-action="view-assessment-entry" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
    </span>
  `;
}

function employeeProcessActions(item) {
  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View Process" aria-label="View Process" data-action="view-employee-process-entry" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
    </span>
  `;
}

function employeeResultActions(item) {
  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View Result" aria-label="View Result" data-action="view-employee-result-entry" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
    </span>
  `;
}

function periodSelectionActions(targetSection, item) {
  const isResult = ["assessment", "employeeResult"].includes(targetSection);
  const actionMap = {
    assessment: "open-assessment-period",
    verification: "open-verification-period",
    employeeProcess: "open-employee-process-period",
    employeeResult: "open-employee-result-period"
  };
  const action = actionMap[targetSection] || "open-verification-period";

  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="${isResult ? "View Result" : "View Process"}" aria-label="${isResult ? "View Result" : "View Process"}" data-action="${action}" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
    </span>
  `;
}

function getCurrentEmployee() {
  return db.employees.find((employee) => employee.name === "Roki Syah Al Zarkasi") || db.employees[0];
}

function getCurrentEmployeeInput(periodId = null) {
  const employee = getCurrentEmployee();
  const rows = getInputRows().filter((row) => row.employeeId === employee?.id);
  if (periodId) return rows.find((row) => row.periodId === periodId) || null;
  return rows[0] || getInputRows()[0];
}

function ensureCurrentEmployeeInput(periodId) {
  const employee = getCurrentEmployee();
  const period = findPeriod(periodId);
  if (!employee || !period) return null;

  const existing = db.employeeInputs.find((entry) => entry.employeeId === employee.id && entry.periodId === period.id);
  if (existing) return existing;

  const next = db.employeeInputs.length + 1;
  const entry = {
    id: `RNP-IN-${String(next).padStart(3, "0")}`,
    docNo: `${String(next).padStart(3, "0")}/RNP-IN/07/${period.year}`,
    employeeId: employee.id,
    periodId: period.id,
    pointId: period.pointId,
    status: "Draft",
    verifier: "HC Reward Team",
    notes: "",
    submittedAt: "-",
    lastUpdate: todayLabel(),
    answers: makeEmptyEmployeeAnswers(period.pointId)
  };

  db.employeeInputs.push(entry);
  return entry;
}

function prepareEmployeeProcessInput(periodId) {
  const entry = ensureCurrentEmployeeInput(periodId);
  if (!entry) return null;

  if (entry.status === "Draft" && !entry.employeeStarted) {
    entry.answers = makeEmptyEmployeeAnswers(entry.pointId);
    entry.notes = "";
    entry.submittedAt = "-";
    delete entry.verificationAnswers;
  }

  return entry;
}

function makeEmptyEmployeeAnswers(pointId) {
  const point = findPoint(pointId) || db.points[0];
  const answers = {};

  point.rules.forEach((rule) => {
    if (rule.hasSub) {
      const sub = {};
      Object.keys(rule.subRules).forEach((subName) => {
        sub[subName] = { option: "", evidence: "" };
      });
      answers[rule.code] = { sub, evidence: "" };
      return;
    }

    answers[rule.code] = { option: "", evidence: "" };
  });

  return answers;
}

function renderMyReward() {
  const entry = getMyRewardCbtEntry();
  const employee = entry ? findEmployee(entry.employeeId) : null;
  const period = entry ? findPeriod(entry.periodId) : null;
  const questions = entry ? getCbtQuestionItems(entry) : [];
  const activeIndex = clampCbtIndex(appState.myRewardQuestion, questions.length);
  const active = questions[activeIndex];
  const answeredCount = questions.filter((item) => item.answered).length;
  const rejectedCount = questions.filter((item) => item.rejected).length;

  if (!entry || !employee || !period || !active) return renderNotFound("My Reward");

  return `
    <div class="page-grid my-reward-cbt-page">
      <section class="panel cbt-workbench">
        <div class="cbt-topbar">
          <div class="cbt-title-block">
            <span class="cbt-mode-chip">CBT View</span>
            <h2>My Reward</h2>
            <small>${escapeHtml(period.name)}</small>
          </div>
          <div class="cbt-metrics">
            ${renderCbtMetric("Employee", employee.name, employee.nik)}
            ${renderCbtMetric("Total Point", getEmployeeInputTotal(entry), resultCategory(getEmployeeInputTotal(entry)))}
            ${renderCbtMetric("Question", `${activeIndex + 1}/${questions.length}`, `${answeredCount} terjawab`)}
            ${renderCbtMetric("Reject", rejectedCount, "hasil validasi")}
          </div>
        </div>

        <div class="cbt-shell">
          <aside class="cbt-nav-panel">
            <div class="cbt-nav-head">
              <div>
                <h3>Navigator</h3>
                <small>${escapeHtml(answeredCount)} / ${escapeHtml(questions.length)} item</small>
              </div>
              <strong>${escapeHtml(Math.round((answeredCount / questions.length) * 100))}%</strong>
            </div>
            <div class="cbt-progress"><span style="width:${escapeHtml(Math.round((answeredCount / questions.length) * 100))}%"></span></div>
            <div class="cbt-number-grid">
              ${questions.map((item, index) => `
                <button class="cbt-number ${index === activeIndex ? "active" : ""} ${item.answered ? "answered" : ""} ${item.rejected ? "rejected" : ""}" type="button" data-action="cbt-question" data-index="${escapeHtml(index)}" title="${escapeHtml(item.code)} - ${escapeHtml(item.title)}">
                  ${escapeHtml(index + 1)}
                </button>
              `).join("")}
            </div>
            <div class="cbt-legend">
              <span><b class="answered"></b>Answered</span>
              <span><b class="rejected"></b>Rejected</span>
            </div>
          </aside>

          <section class="cbt-question-panel ${active.rejected ? "is-rejected" : ""}">
            <div class="cbt-question-header">
            <div>
              <span class="cbt-question-code">${escapeHtml(active.code)}</span>
              <h3>${escapeHtml(active.title)}</h3>
              <small class="panel-kicker">${escapeHtml(active.category)}</small>
            </div>
            <strong>${escapeHtml(active.finalPoint)} / ${escapeHtml(active.rawPoint)} Point</strong>
          </div>
          <div class="cbt-question-body">
            <div class="cbt-question-copy">
              <span>Soal ${escapeHtml(activeIndex + 1)} dari ${escapeHtml(questions.length)}</span>
              <h4>${escapeHtml(active.question)}</h4>
              <button class="info-toggle assessment-info-toggle" type="button" title="Info soal" aria-label="Info soal ${escapeHtml(active.code)}" aria-expanded="false" data-action="toggle-question-info">${icon("info")}</button>
            </div>
            <div class="question-info">${escapeHtml(active.info)}</div>
            ${active.hasSub ? renderCbtSubCategoryList(active) : renderCbtSingleQuestion(active)}
          </div>
          <div class="cbt-question-footer">
            <button class="btn neutral" type="button" data-action="cbt-prev" ${activeIndex === 0 ? "disabled" : ""}>${icon("arrow-left")} Prev</button>
            <span>${escapeHtml(activeIndex + 1)} / ${escapeHtml(questions.length)}</span>
            <button class="btn primary" type="button" data-action="cbt-next" ${activeIndex === questions.length - 1 ? "disabled" : ""}>Next ${icon("chevron-right")}</button>
          </div>
          </section>
        </div>
      </section>
    </div>
  `;
}

function renderCbtMetric(label, value, note) {
  return `
    <div class="cbt-metric">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(note)}</span>
    </div>
  `;
}

function getMyRewardCbtEntry() {
  return db.employeeInputs.find((entry) => entry.status === "Verified" && getRejectedAnswerCount(entry) > 0)
    || db.employeeInputs.find((entry) => entry.status === "Verified")
    || db.employeeInputs[0];
}

function clampCbtIndex(index, length) {
  if (!length) return 0;
  const value = Number.isFinite(Number(index)) ? Number(index) : 0;
  return Math.max(0, Math.min(length - 1, value));
}

function getCbtQuestionItems(entry) {
  const point = findPoint(entry.pointId);
  if (!point) return [];

  const verificationAnswers = getEmployeeVerificationAnswers(entry);

  return point.rules.map((rule) => {
    const inputAnswer = entry.answers?.[rule.code] || {};
    const answer = verificationAnswers?.[rule.code] || inputAnswer;
    const question = rule.question || getCriteriaQuestion(rule.code, rule.criteriaName).text;
    const info = rule.questionInfo || getCriteriaQuestion(rule.code, rule.criteriaName).info;
    const rawPoint = getRuleRawAnswerTotal(rule, inputAnswer);
    const finalPoint = getRuleAnswerTotal(rule, answer);

    if (rule.hasSub) {
      const subItems = Object.entries(rule.subRules).map(([subName, options], index) => {
        const subAnswer = answer.sub?.[subName] || {};
        const inputSubAnswer = inputAnswer.sub?.[subName] || {};
        const subRawPoint = getOptionPoint(options, inputSubAnswer.option || "");
        return {
          code: `${rule.code}.${index + 1}`,
          title: subName,
          category: rule.criteriaName,
          question: subName,
          info: `Pilih opsi yang sesuai untuk ${subName}.`,
          options,
          selected: subAnswer.option || "",
          evidence: submittedEvidenceName(`${rule.code}.${index + 1}`, subAnswer.evidence),
          rawPoint: subRawPoint,
          finalPoint: subAnswer.rejected ? 0 : subRawPoint,
          rejected: Boolean(subAnswer.rejected),
          adminNote: subAnswer.adminNote || "",
          answered: Boolean(subAnswer.option)
        };
      });

      return {
        code: rule.code,
        title: rule.criteriaName,
        category: `${subItems.length} sub kategori`,
        question,
        info,
        hasSub: true,
        subItems,
        rawPoint,
        finalPoint,
        rejected: hasRejectedInRule(rule, answer),
        adminNote: subItems.filter((item) => item.rejected).map((item) => `${item.title}: ${item.adminNote || "Rejected"}`).join(" | "),
        answered: hasEmployeeAnswer(rule, answer)
      };
    }

    return {
      code: rule.code,
      title: rule.criteriaName,
      category: rule.criteriaName,
      question,
      info,
      hasSub: false,
      options: rule.options,
      selected: answer.option || "",
      evidence: submittedEvidenceName(rule.code, answer.evidence),
      rawPoint,
      finalPoint,
      rejected: Boolean(answer.rejected),
      adminNote: answer.adminNote || "",
      answered: Boolean(answer.option)
    };
  });
}

function renderCbtSingleQuestion(active) {
  return `
    <div class="cbt-option-list">
      ${active.options.map((option) => renderCbtOption(option, active)).join("")}
    </div>
    <div class="cbt-evidence-row">
      ${renderCbtEvidence(active.evidence)}
      ${renderCbtStatusCard(active)}
    </div>
  `;
}

function renderCbtSubCategoryList(active) {
  return `
    <div class="cbt-sub-list">
      ${active.subItems.map((item) => `
        <section class="cbt-sub-card ${item.rejected ? "is-rejected" : ""}">
          <div class="cbt-sub-head">
            <div>
              <span>${escapeHtml(item.code)}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </div>
            <b>${escapeHtml(item.finalPoint)} / ${escapeHtml(item.rawPoint)} Point</b>
          </div>
          <div class="cbt-option-list compact">
            ${item.options.map((option) => renderCbtOption(option, item)).join("")}
          </div>
          <div class="cbt-evidence-row compact">
            ${renderCbtEvidence(item.evidence)}
            ${renderCbtStatusCard(item)}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function renderCbtStatusCard(item) {
  return `
    <div class="cbt-status-card ${item.rejected ? "is-rejected" : ""}">
      <small>Status Validasi</small>
      <strong>${escapeHtml(item.rejected ? "Rejected" : "Accepted")}</strong>
      <span>${escapeHtml(item.adminNote || "Tidak ada catatan admin.")}</span>
    </div>
  `;
}

function renderCbtOption(option, active) {
  const selected = option.option === active.selected;
  return `
    <div class="cbt-option ${selected ? "selected" : ""}">
      <span class="assessment-radio-mark"></span>
      <div>
        <strong>${escapeHtml(option.option)}</strong>
        <small>${escapeHtml(option.point)} Point</small>
      </div>
    </div>
  `;
}

function renderCbtEvidence(evidence) {
  return `
    <div class="cbt-file-box">
      <span class="cbt-file-icon">${icon("file-text")}</span>
      <div>
        <small>Evidence</small>
        <strong>${escapeHtml(evidence || "Tidak ada file")}</strong>
      </div>
    </div>
  `;
}

function renderAssessment() {
  const entry = findEmployeeInput(appState.selectedId);
  const employee = entry ? findEmployee(entry.employeeId) : null;
  const period = entry ? findPeriod(entry.periodId) : null;
  if (!entry || !employee || !period || entry.status !== "Verified") return renderNotFound("Result");

  const inputTotal = getEmployeeInputRawTotal(entry);
  const verificationTotal = getEmployeeInputTotal(entry);
  return `
    <div class="process-entry-page assessment-final-page">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>Result Detail</h2>
            <small class="panel-kicker">Hasil akhir Reward & Punishment setelah proses validation</small>
          </div>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Doc No", entry.docNo],
            ["Employee", `${employee.name} / ${employee.nik}`],
            ["Division", employee.division],
            ["Tanggal Submit", entry.submittedAt || "-"],
            ["Total Point (Final)", processVerificationPoint(inputTotal, verificationTotal)],
            ["Final Status", statusPill("Verified")],
            ["Verifier", entry.verifier],
            ["Notes", entry.notes || "-"]
          ])}
        </div>
      </div>
      ${renderFinalResultPanel(entry)}
    </div>
  `;
}

function hasEmployeeAnswer(rule, answer = {}) {
  if (!answer) return false;
  if (rule.hasSub) {
    return Object.keys(rule.subRules).every((subName) => Boolean(answer.sub?.[subName]?.option));
  }

  return Boolean(answer.option);
}

function renderAssessmentRuleInput(rule, answer = {}, number = 1, locked = false, uploadReadonly = false) {
  const total = getRuleRawAnswerTotal(rule, answer);
  const answered = hasEmployeeAnswer(rule, answer);

  return `
    <section class="assessment-rule-card assessment-form-card ${answered ? "is-answered" : ""}">
      <button class="assessment-rule-head" type="button" data-action="toggle-assessment-rule" aria-expanded="true">
        <div>
          <strong>${escapeHtml(rule.code)} ${escapeHtml(rule.criteriaName)}</strong>
          <small>Nomor ${escapeHtml(number)}</small>
        </div>
        <div class="assessment-rule-meta">
          <b data-role="input-rule-total">${escapeHtml(total)} Point</b>
          <span class="assessment-rule-chevron">${icon("chevron-down")}</span>
        </div>
      </button>
      <div class="assessment-question-list">
        ${rule.hasSub ? renderAssessmentSubRuleInput(rule, answer, locked, uploadReadonly) : renderAssessmentOptionInput(rule, answer, locked, uploadReadonly)}
      </div>
    </section>
  `;
}

function renderAssessmentOptionInput(rule, answer = {}, locked = false, uploadReadonly = false, afterContent = "") {
  const selected = answer.option || "";
  const question = rule.question || getCriteriaQuestion(rule.code, rule.criteriaName).text;
  const info = rule.questionInfo || getCriteriaQuestion(rule.code, rule.criteriaName).info;
  const evidence = uploadReadonly ? submittedEvidenceName(rule.code, answer.evidence) : answer.evidence || "";
  const remark = answer.remark || "";

  return `
    ${renderAssessmentQuestionSection({
      code: rule.code,
      question,
      info,
      options: rule.options,
      selected,
      inputName: `answer:${rule.code}`,
      evidenceName: `evidence:${rule.code}`,
      fileName: `file:${rule.code}`,
      evidence,
      remarkName: `remark:${rule.code}`,
      remark,
      locked,
      uploadReadonly,
      relatedEmployees: answer.relatedEmployees || [],
      relatedEmployeeIds: answer.relatedEmployeeIds || [],
      afterContent
    })}
  `;
}

function renderAssessmentSubRuleInput(rule, answer = {}, locked = false, uploadReadonly = false) {
  return `
    <input type="hidden" name="evidence:${escapeHtml(rule.code)}" value="${escapeHtml(answer.evidence || "")}">
    <div class="assessment-subrule-stack">
      ${Object.entries(rule.subRules).map(([subName, options], index) => {
        const selected = answer.sub?.[subName]?.option || "";
        const subCode = `${rule.code}.${index + 1}`;
        const evidence = uploadReadonly ? submittedEvidenceName(subCode, answer.sub?.[subName]?.evidence) : answer.sub?.[subName]?.evidence || "";
        const remark = answer.sub?.[subName]?.remark || "";
        const relatedEmployeeIds = answer.sub?.[subName]?.relatedEmployeeIds || [];
        const relatedEmployees = answer.sub?.[subName]?.relatedEmployees || [];
        return `
          ${renderAssessmentQuestionSection({
            code: subCode,
            question: subName,
            info: `Pilih opsi yang sesuai untuk ${subName}.`,
            options,
            selected,
            inputName: `answer:${rule.code}:${index}`,
            evidenceName: `evidence:${rule.code}:${index}`,
            fileName: `file:${rule.code}:${index}`,
            evidence,
            remarkName: `remark:${rule.code}:${index}`,
            remark,
            locked,
            uploadReadonly,
            relatedName: `related:${rule.code}:${index}`,
            contributionName: `contribution:${rule.code}:${index}`,
            relatedEmployeeIds,
            relatedEmployees,
            contribution: answer.sub?.[subName]?.contribution || ""
          })}
        `;
      }).join("")}
    </div>
  `;
}

function submittedEvidenceName(code, evidence = "") {
  const value = String(evidence || "").trim();
  if (value) return value;
  return `evidence-${String(code).replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}.pdf`;
}

function renderAssessmentQuestionSection({ code, question, info, options, selected, inputName, evidenceName, fileName, evidence, remarkName, remark = "", locked, uploadReadonly = false, relatedName = `related:${code}`, contributionName = `contribution:${code}`, relatedEmployeeIds = [], relatedEmployees = [], contribution = "", afterContent = "" }) {
  const relatedBlock = isCertificationCode(code)
    ? uploadReadonly
      ? renderRelatedEmployeesReadonlyBlock(relatedEmployees, relatedEmployeeIds, contribution)
      : renderRelatedEmployeesPicker(relatedName, contributionName, relatedEmployeeIds, contribution, locked)
    : "";

  return `
    <div class="assessment-question-section">
      <div class="assessment-sub-head">
        <strong>${escapeHtml(question)}</strong>
        <button class="info-toggle assessment-info-toggle" type="button" title="Info soal" aria-label="Info soal ${escapeHtml(code)}" aria-expanded="false" data-action="toggle-question-info">
          ${icon("info")}
        </button>
      </div>
      <div class="assessment-sub-body">
        <div class="assessment-option-list" role="radiogroup" aria-label="${escapeHtml(question)}">
          ${options.map((option) => renderAssessmentRadioOption(inputName, option, selected, locked)).join("")}
        </div>
        ${uploadReadonly ? renderAssessmentUploadReadonlyBlock(evidence) : renderAssessmentUploadBlock(evidenceName, fileName, evidence, locked)}
        ${relatedBlock}
      </div>
      <label class="assessment-remark">
        <span>Remark</span>
        <textarea name="${escapeHtml(remarkName)}" placeholder="Remark" ${locked ? "disabled" : ""}>${escapeHtml(remark)}</textarea>
      </label>
      ${afterContent}
      <div class="question-info">
        ${escapeHtml(info)}
      </div>
    </div>
  `;
}

function isCertificationCode(code = "") {
  return String(code).startsWith("B3.1");
}

function getCurrentInputEmployeeId() {
  const entry = findEmployeeInput(appState.selectedId) || getCurrentEmployeeInput();
  return entry?.employeeId || getCurrentEmployee()?.id || "";
}

function normalizeRelatedEmployeeIds(ids = []) {
  const selected = new Set((ids || []).filter(Boolean));
  const currentEmployeeId = getCurrentInputEmployeeId();
  if (currentEmployeeId && selected.size === 0) selected.add(currentEmployeeId);
  return selected;
}

function renderRelatedEmployeesPicker(relatedName, contributionName, relatedEmployeeIds = [], contribution = "", locked = false) {
  const selected = normalizeRelatedEmployeeIds(relatedEmployeeIds);
  const currentEmployeeId = getCurrentInputEmployeeId();
  const divisions = [...new Set(db.employees.map((employee) => employee.division))].sort();

  return `
    <div class="related-employee-picker">
      <div class="related-employee-head">
        <strong>Employee terkait</strong>
        <small>Centang kontributor sertifikasi; satu dokumen bisa dipakai beberapa employee.</small>
      </div>
      <label class="related-contribution">
        <span>Peran / kontribusi</span>
        <input name="${escapeHtml(contributionName)}" value="${escapeHtml(contribution)}" placeholder="Contoh: Auditor internal, anggota tim, PIC dokumen" ${locked ? "disabled" : ""}>
      </label>
      <div class="related-division-actions">
        ${divisions.map((division) => `
          <button class="mini-chip" type="button" data-action="select-related-division" data-related-name="${escapeHtml(relatedName)}" data-division="${escapeHtml(division)}" ${locked ? "disabled" : ""}>${escapeHtml(division)}</button>
        `).join("")}
      </div>
      <div class="related-employee-list">
        ${db.employees.map((employee) => `
          <label class="related-employee-item">
            <input type="checkbox" name="${escapeHtml(relatedName)}" value="${escapeHtml(employee.id)}" data-division="${escapeHtml(employee.division)}" ${selected.has(employee.id) ? "checked" : ""} ${locked ? "disabled" : ""}>
            <span>
              <strong>${escapeHtml(employee.name)}${employee.id === currentEmployeeId ? " (Uploader)" : ""}</strong>
              <small>${escapeHtml(employee.nik)} / ${escapeHtml(employee.division)}</small>
            </span>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

function renderRelatedEmployeesReadonlyBlock(relatedEmployees = [], relatedEmployeeIds = [], contribution = "") {
  const names = relatedEmployees.length
    ? relatedEmployees
    : relatedEmployeeIds.map((id) => {
      const employee = findEmployee(id);
      return employee ? `${employee.name} / ${employee.nik}` : id;
    });

  return `
    <div class="related-employee-readonly">
      <strong>Employee terkait</strong>
      <span>${escapeHtml(names.length ? names.join(", ") : "-")}</span>
      ${contribution ? `<small>${escapeHtml(contribution)}</small>` : ""}
    </div>
  `;
}

function renderAssessmentUploadReadonlyBlock(evidence = "") {
  const fileName = String(evidence || "").trim();
  const hasFile = Boolean(fileName);

  return `
    <div class="assessment-upload assessment-upload-readonly ${hasFile ? "has-file" : "is-empty"}">
      <div class="assessment-upload-head">
        <strong>Upload Document</strong>
      </div>
      <div class="assessment-upload-box" aria-disabled="true">
        ${icon(hasFile ? "file-text" : "upload")}
        <span class="assessment-upload-label">${escapeHtml(hasFile ? "File terupload" : "Tidak ada file")}</span>
        ${hasFile ? `
          <span class="assessment-file-chip">
            <span class="assessment-file-name">${escapeHtml(fileName)}</span>
          </span>
        ` : ""}
      </div>
    </div>
  `;
}

function renderAssessmentRadioOption(inputName, option, selected, locked) {
  const checked = selected === option.option;

  return `
    <label class="assessment-option">
      <input type="radio" name="${escapeHtml(inputName)}" value="${escapeHtml(option.option)}" data-action="assessment-answer" data-point="${escapeHtml(option.point)}" ${checked ? "checked" : ""} ${locked ? "disabled" : ""}>
      <span class="assessment-radio-mark"></span>
      <span class="assessment-option-copy">
        <strong>${escapeHtml(option.option)}</strong>
        <small>${escapeHtml(option.point)} Point</small>
      </span>
    </label>
  `;
}

function renderAssessmentUploadBlock(evidenceName, fileName, evidence = "", locked = false) {
  const inputId = `upload-${evidenceName.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const isActive = Boolean(evidence) && !locked;
  const label = evidence || "Centang Yes untuk upload";

  return `
    <div class="assessment-upload ${isActive ? "is-active" : ""} ${evidence ? "has-file" : ""} ${locked ? "is-locked" : ""}">
      <div class="assessment-upload-head">
        <strong>Upload Document?</strong>
        <label class="assessment-upload-switch">
          <input type="checkbox" data-action="assessment-upload-toggle" ${evidence ? "checked" : ""} ${locked ? "disabled" : ""}>
          <span class="assessment-upload-switch-track"></span>
          <span>Yes</span>
        </label>
      </div>
      <label class="assessment-upload-box" for="${escapeHtml(inputId)}" aria-disabled="${locked || !isActive ? "true" : "false"}">
        <input class="assessment-upload-hidden" type="hidden" name="${escapeHtml(evidenceName)}" value="${escapeHtml(evidence)}">
        <input class="assessment-upload-input" id="${escapeHtml(inputId)}" type="file" name="${escapeHtml(fileName)}" data-action="assessment-upload" ${locked || !isActive ? "disabled" : ""}>
        ${icon("upload")}
        <span class="assessment-upload-label">${escapeHtml(evidence ? "File terupload" : label)}</span>
        <span class="assessment-file-chip">
          <span class="assessment-file-name">${escapeHtml(evidence)}</span>
          <button class="assessment-file-remove" type="button" title="Batalkan upload" aria-label="Batalkan upload" data-action="assessment-upload-cancel" ${locked ? "disabled" : ""}>${icon("x")}</button>
        </span>
      </label>
    </div>
  `;
}

function setAssessmentUploadActive(upload, active) {
  const fileInput = upload?.querySelector(".assessment-upload-input");
  const hidden = upload?.querySelector(".assessment-upload-hidden");
  const label = upload?.querySelector(".assessment-upload-label");
  const fileName = upload?.querySelector(".assessment-file-name");
  const removeButton = upload?.querySelector("[data-action='assessment-upload-cancel']");
  const hasFile = Boolean(hidden?.value);

  upload?.classList.toggle("is-active", active);
  upload?.classList.toggle("has-file", hasFile);
  if (fileInput) fileInput.disabled = !active;
  if (removeButton) removeButton.disabled = !active || !hasFile;
  if (fileName) fileName.textContent = hidden?.value || "";
  if (label) label.textContent = hasFile ? "File terupload" : active ? "Upload Here....." : "Centang Yes untuk upload";
}

function clearAssessmentUpload(upload, keepActive = true) {
  const fileInput = upload?.querySelector(".assessment-upload-input");
  const hidden = upload?.querySelector(".assessment-upload-hidden");
  const checkbox = upload?.querySelector("[data-action='assessment-upload-toggle']");

  if (fileInput) fileInput.value = "";
  if (hidden) hidden.value = "";
  if (checkbox) checkbox.checked = keepActive;
  setAssessmentUploadActive(upload, keepActive);
}

function isAssessmentCardAnswered(card) {
  const groups = [...(card?.querySelectorAll(".assessment-option-list") || [])];
  return groups.length > 0 && groups.every((group) => Boolean(group.querySelector("input[type='radio']:checked")));
}

function updateAssessmentCardAnswered(source) {
  const card = source?.closest(".assessment-rule-card");
  card?.classList.toggle("is-answered", isAssessmentCardAnswered(card));
  updateInputRuleReview(card);
  updateProcessInputTotal(source?.closest(".process-entry-form-panel") || source?.closest("form") || document);
}

function selectedAssessmentPointTotal(root) {
  return [...(root?.querySelectorAll("input[data-action='assessment-answer']:checked") || [])]
    .reduce((sum, input) => sum + Number(input.dataset.point || 0), 0);
}

function updateInputRuleReview(card) {
  if (!card || card.classList.contains("verification-review-card")) return;

  const totalNode = card.querySelector('[data-role="input-rule-total"]');
  if (totalNode) totalNode.textContent = `${selectedAssessmentPointTotal(card)} Point`;
}

function updateProcessInputTotal(root) {
  const totalNode = document.querySelector('[data-role="process-total-input"]');
  if (!totalNode) return;

  const scope = root?.querySelectorAll ? root : document;
  const form = scope.closest?.("form") || document.querySelector("form.process-entry-page") || document;
  totalNode.textContent = selectedAssessmentPointTotal(form);
}

function updateProcessVerificationTotal(root) {
  const totalNode = document.querySelector('[data-role="process-total-verification"]');
  if (!totalNode) return;

  const scope = root?.querySelectorAll ? root : document;
  const form = scope.closest?.("form") || document.querySelector("form.process-entry-page") || document;
  totalNode.textContent = selectedAssessmentPointTotal(form);
}

function updateVerificationRuleReview(card) {
  if (!card) return;

  const totalNode = card.querySelector('[data-role="verification-rule-total"]');
  const selectedPoint = selectedAssessmentPointTotal(card);

  if (totalNode) totalNode.textContent = `${selectedPoint} Point`;
  updateProcessVerificationTotal(card);
}

function closeQuestionInfoPopups(exceptCard = null) {
  document.querySelectorAll(".question-card.open, .assessment-question-section.open, .cbt-question-body.open").forEach((card) => {
    if (card === exceptCard) return;
    card.classList.remove("open");
    card.querySelector('[data-action="toggle-question-info"]')?.setAttribute("aria-expanded", "false");
  });
}

function renderDashboardOverviewPanel(period, rows) {
  const summary = getDashboardPointSummary(period, rows);

  return `
    <div class="dashboard-card dashboard-overview-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Dashboard Reward & Punishment</h2>
          <small>${escapeHtml(period?.name || "Semua periode")}</small>
        </div>
        <label class="dashboard-filter dashboard-period-filter">
          <span>PERIOD</span>
          <select data-action="dashboard-period">
            ${renderDashboardPeriodOptions(period)}
          </select>
        </label>
      </div>
      <div class="dashboard-summary-grid">
        ${dashboardSummaryCard("Employee Aktif", summary.employeeAktif, "Employee aktif pada periode ini", "active")}
        ${dashboardSummaryCard("Sudah Dinilai", summary.assessed, "Sudah submit atau verified", "submitted")}
        ${dashboardSummaryCard("Rata-rata Point", summary.averagePoint, "Rata-rata nilai final", "verified")}
        ${dashboardSummaryCard("Point Tertinggi", summary.highestPoint, "Nilai final tertinggi", "approved")}
        ${dashboardSummaryCard("Point Terendah", summary.lowestPoint, "Nilai final terendah", "pending")}
      </div>
    </div>
  `;
}

function dashboardSummaryCard(label, value, note, tone = "total") {
  return `
    <div class="dashboard-summary-card ${escapeHtml(tone)}">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(note)}</span>
    </div>
  `;
}

function renderPointDistributionPanel(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const distributionRows = getDashboardPointDistributionRows(rows);
  const totalEmployee = distributionRows.reduce((sum, row) => sum + Number(row.value || 0), 0);

  return `
    <div class="dashboard-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Distribusi Nilai Employee</h2>
          <small>Komposisi total point final verified pada ${escapeHtml(period?.name || "periode terpilih")}</small>
        </div>
        <div class="dashboard-inline-stat">
          <small>Final Verified</small>
          <strong>${escapeHtml(totalEmployee)}</strong>
        </div>
      </div>
      ${renderInsightBarChart(distributionRows, "employee")}
    </div>
  `;
}

function renderDivisionPointAveragePanel(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const divisionRows = getDashboardDivisionPointRows(rows);

  return `
    <div class="dashboard-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Rata-rata Point per Divisi</h2>
          <small>Rata-rata nilai final employee yang sudah verified pada ${escapeHtml(period?.name || "periode terpilih")}</small>
        </div>
      </div>
      ${renderInsightBarChart(divisionRows, "avg point")}
    </div>
  `;
}

function renderCriteriaInfluencePanel(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const impactRows = getDashboardCriteriaImpactRows(period, rows);
  const topRows = [...impactRows]
    .filter((row) => row.assessed > 0)
    .sort((a, b) => b.finalTotal - a.finalTotal || a.code.localeCompare(b.code))
    .slice(0, 5);
  const gapRows = [...impactRows]
    .filter((row) => row.assessed > 0)
    .sort((a, b) => b.absGap - a.absGap || b.finalTotal - a.finalTotal || a.code.localeCompare(b.code))
    .slice(0, 5);

  return `
    <div class="dashboard-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Criteria Paling Berpengaruh</h2>
          <small>Criteria dengan kontribusi final tertinggi dan koreksi verification terbesar</small>
        </div>
      </div>
      <div class="criteria-impact-grid">
        ${renderCriteriaImpactList("Top Penyumbang Point", "Total final point terbesar", topRows, "total")}
        ${renderCriteriaImpactList("Gap Input vs Final", "Selisih terbesar setelah verification", gapRows, "gap")}
      </div>
    </div>
  `;
}

function renderInsightBarChart(rows, unit = "") {
  const maxValue = Math.max(1, ...rows.map((row) => Math.abs(Number(row.value || 0))));

  return `
    <div class="insight-bar-list">
      ${rows.length ? rows.map((row) => {
        const value = Number(row.value || 0);
        const width = Math.max(value ? 7 : 0, (Math.abs(value) / maxValue) * 100);
        const tone = value < 0 ? "negative" : "positive";

        return `
          <div class="insight-bar-row">
            <span title="${escapeHtml(row.label)}">${escapeHtml(row.label)}</span>
            <div class="insight-bar-track">
              <b class="${tone}" style="width:${escapeHtml(width)}%"></b>
            </div>
            <strong>${escapeHtml(value)}</strong>
            <small>${escapeHtml(row.note || unit)}</small>
          </div>
        `;
      }).join("") : `<div class="empty-state">Belum ada data final verified.</div>`}
    </div>
  `;
}

function renderCriteriaImpactList(title, subtitle, rows, mode) {
  return `
    <div class="criteria-impact-list">
      <div class="criteria-impact-head">
        <h3>${escapeHtml(title)}</h3>
        <small>${escapeHtml(subtitle)}</small>
      </div>
      ${rows.length ? rows.map((row, index) => {
        const value = mode === "gap" ? row.gap : row.finalTotal;
        const valueLabel = mode === "gap" && value > 0 ? `+${value}` : String(value);
        const tone = mode === "gap" ? value > 0 ? "positive" : value < 0 ? "negative" : "neutral" : "positive";

        return `
          <div class="criteria-impact-row">
            <span>${escapeHtml(index + 1)}</span>
            <div>
              <strong title="${escapeHtml(row.name)}">${escapeHtml(row.code)} - ${escapeHtml(row.name)}</strong>
              <small>${escapeHtml(row.category)} / ${escapeHtml(row.averagePoint)} avg</small>
            </div>
            <b class="${escapeHtml(tone)}">${escapeHtml(valueLabel)}</b>
          </div>
        `;
      }).join("") : `<div class="empty-state">Belum ada data criteria.</div>`}
    </div>
  `;
}

function renderAssessmentAnalyticsPanel(period = getDashboardPeriod(), rows = getDashboardRows(period)) {
  const selectedRule = getDashboardSelectedCriteriaRule(period);

  return `
    <div class="dashboard-card dashboard-analytics-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Analisis Assessment</h2>
          <small>Grafik hasil isian assessment berdasarkan criteria pada ${escapeHtml(period?.name || "periode terpilih")}</small>
        </div>
        <label class="dashboard-filter dashboard-criteria-filter">
          <span>Criteria</span>
          <select data-action="dashboard-criteria">
            ${renderDashboardCriteriaOptions(period, selectedRule)}
          </select>
        </label>
      </div>
      ${renderAssessmentCriteriaChart(period, rows, selectedRule)}
    </div>
  `;
}

function renderAssessmentCriteriaChart(period, rows, rule) {
  if (!rule) return `<div class="empty-state">Belum ada criteria pada periode ini.</div>`;

  const chartRows = getDashboardCriteriaComparisonRows(period, rows, rule);
  const series = [
    { key: "inputCount", label: "Input Employee", color: "#1687e8" },
    { key: "finalCount", label: "Final Verified", color: "#22c77a" }
  ];
  const maxCount = Math.max(1, ...chartRows.flatMap((row) => series.map((item) => Number(row[item.key] || 0))));
  const totalResponses = chartRows.reduce((sum, row) => sum + Number(row.count || 0), 0);
  const totalPoint = chartRows.reduce((sum, row) => sum + Number(row.totalPoint || 0), 0);
  const avgPoint = totalResponses ? Number((totalPoint / totalResponses).toFixed(1)) : 0;
  const chartCount = Math.max(chartRows.length, 1);
  const seriesPoints = series.map((item) => ({
    ...item,
    points: chartRows.map((row, index) => {
      const x = chartRows.length === 1 ? 50 : 5 + (index / (chartRows.length - 1)) * 90;
      const y = 88 - (Number(row[item.key] || 0) / maxCount) * 72;

      return {
        ...row,
        value: Number(row[item.key] || 0),
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      };
    })
  }));

  return `
    <div class="assessment-criteria-chart">
      <div class="assessment-criteria-meta">
        <div>
          <strong>${escapeHtml(`${rule.code} - ${rule.criteriaName}`)}</strong>
          <span>${escapeHtml(rule.hasSub ? "Criteria dengan sub criteria" : "Criteria tunggal")}</span>
        </div>
        <div class="assessment-criteria-stat">
          <small>Total Isian</small>
          <strong>${escapeHtml(totalResponses)}</strong>
        </div>
        <div class="assessment-criteria-stat">
          <small>Avg Point</small>
          <strong>${escapeHtml(avgPoint)}</strong>
        </div>
      </div>
      <div class="assessment-xy-chart" style="--bar-count:${escapeHtml(chartCount)}">
        <div class="assessment-y-axis">
          <span>${escapeHtml(maxCount)}</span>
          <span>${escapeHtml(Math.round(maxCount / 2))}</span>
          <span>0</span>
        </div>
        <div class="assessment-line-stage">
          <div class="assessment-line-plot">
            <svg class="assessment-line-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              ${seriesPoints.map((item) => `
                <path d="${escapeHtml(smoothTrendPath(item.points.map((point) => ({ x: point.x, y: point.y }))))}" style="--series-color:${escapeHtml(item.color)}"></path>
              `).join("")}
            </svg>
            ${seriesPoints.map((item) => item.points.map((row) => `
                <span class="assessment-line-dot comparison" style="--series-color:${escapeHtml(item.color)}; left:${escapeHtml(row.x)}%; top:${escapeHtml(row.y)}%" title="${escapeHtml(`${item.label} - ${row.label}: ${row.value} employee, ${row.point} point`)}">
                  <b>${escapeHtml(row.value)}</b>
                </span>
              `).join("")).join("")}
          </div>
          <div class="assessment-line-labels">
            ${chartRows.map((row) => `
              <div>
                <span title="${escapeHtml(row.label)}">${escapeHtml(row.label)}</span>
                <small>${escapeHtml(row.point)} point</small>
              </div>
            `).join("")}
          </div>
          <div class="assessment-line-legend">
            ${series.map((item) => `
              <span style="--series-color:${escapeHtml(item.color)}">
                <i></i>${escapeHtml(item.label)}
              </span>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="assessment-axis-label">
        <span>Y: jumlah employee input vs final</span>
        <span>X: opsi jawaban criteria berdasarkan point</span>
      </div>
    </div>
  `;
}

function renderDashboardMiniBarChart(title, subtitle, rows, unit = "") {
  const maxValue = Math.max(1, ...rows.map((row) => Math.abs(Number(row.value || 0))));

  return `
    <div class="mini-chart-card">
      <div class="mini-chart-head">
        <h3>${escapeHtml(title)}</h3>
        <small>${escapeHtml(subtitle)}</small>
      </div>
      <div class="mini-chart-list">
        ${rows.length ? rows.map((row) => {
          const value = Number(row.value || 0);
          const width = Math.max(7, (Math.abs(value) / maxValue) * 100);
          const tone = value < 0 ? "negative" : "positive";

          return `
            <div class="mini-chart-row">
              <span title="${escapeHtml(row.label)}">${escapeHtml(row.label)}</span>
              <div class="mini-chart-track">
                <b class="${tone}" style="width:${escapeHtml(width)}%"></b>
              </div>
              <strong>${escapeHtml(value)}</strong>
              <small>${escapeHtml(row.note || unit)}</small>
            </div>
          `;
        }).join("") : `<div class="empty-state">Belum ada data chart.</div>`}
      </div>
    </div>
  `;
}

function renderCriteriaPointPanel(period = getDashboardPeriod(), sourceRows = getDashboardRows(period)) {
  const rows = getDashboardCriteriaPointRows(period, sourceRows);
  const chartRows = [...rows]
    .sort((a, b) => b.totalPoint - a.totalPoint || a.code.localeCompare(b.code))
    .slice(0, 10);

  return `
    <div class="dashboard-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Point Assessment per Criteria</h2>
          <small>Akumulasi point hasil assessment berdasarkan criteria pada ${escapeHtml(period?.name || "periode terpilih")}</small>
        </div>
      </div>
      ${renderCriteriaPointChart(chartRows)}
      <div class="trend-summary criteria-point-summary">
        <h3>Top Criteria Contributor</h3>
        <small>Top 10 criteria berdasarkan total point final employee yang sudah verified.</small>
        <div class="table-wrap">
          <table class="mini-table trend-table criteria-point-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Criteria</th>
                <th>Category</th>
                <th class="center">Avg Point</th>
                <th class="center">Total Point</th>
                <th class="center">Dinilai</th>
              </tr>
            </thead>
            <tbody>
              ${chartRows.map((row) => `
                <tr>
                  <td><strong>${escapeHtml(row.code)}</strong></td>
                  <td>${escapeHtml(row.name)}</td>
                  <td>${escapeHtml(row.category)}</td>
                  <td class="center"><strong>${escapeHtml(row.averagePoint)}</strong></td>
                  <td class="center"><strong>${escapeHtml(row.totalPoint)}</strong></td>
                  <td class="center">${escapeHtml(row.assessed)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderCriteriaPointChart(rows) {
  const maxPoint = Math.max(1, ...rows.map((row) => Math.abs(Number(row.totalPoint || 0))));

  return `
    <div class="criteria-point-chart" role="img" aria-label="Top criteria berdasarkan total point assessment">
      ${rows.map((row) => {
        const width = Math.max(7, (Math.abs(Number(row.totalPoint || 0)) / maxPoint) * 100);
        const tone = Number(row.totalPoint || 0) < 0 ? "negative" : "positive";

        return `
          <div class="criteria-point-row">
            <span title="${escapeHtml(`${row.code} - ${row.name}`)}">${escapeHtml(row.code)} - ${escapeHtml(row.name)}</span>
            <div class="criteria-point-track">
              <b class="${tone}" style="width:${escapeHtml(width)}%"></b>
            </div>
            <strong>${escapeHtml(row.totalPoint)}</strong>
            <small>${escapeHtml(row.averagePoint)} avg</small>
          </div>
        `;
      }).join("")}
      <div class="criteria-point-chart-note">Top 10 criteria berdasarkan total point</div>
      </div>
  `;
}

function smoothTrendPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M${points[0].x} ${points[0].y}`;

  const segments = [`M${points[0].x} ${points[0].y}`];

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] || points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    segments.push(`C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
  }

  return segments.join(" ");
}

function renderEmployeeDetailPanel(rows = getDashboardRows()) {
  const ranking = getRankingRows(rows);
  const topRows = ranking.slice(0, 10);
  const bottomRows = [...ranking]
    .sort((a, b) => a.totalPoint - b.totalPoint || a.employeeName.localeCompare(b.employeeName))
    .slice(0, 10);
  const pendingRows = rows.filter(isDashboardPendingRow);

  return `
    <div class="dashboard-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Detail Employee</h2>
          <small>Informasi draft/nonaktif/belum mengisi dan ranking score employee pada periode terpilih</small>
        </div>
      </div>
      <div class="dashboard-split">
        ${renderPendingEmployeePanel(pendingRows)}
        ${renderRankingSummaryPanel(topRows, bottomRows)}
      </div>
    </div>
  `;
}

function renderPendingEmployeePanel(rows) {
  return `
    <div class="pending-card">
      <div class="pending-card-head">
        <div>
          <h3>${icon("info")} Draft / Nonaktif / Belum Mengisi</h3>
          <small>Data karyawan yang belum submit atau assessment status nonaktif</small>
        </div>
      </div>
      <div class="pending-list">
        <div class="pending-list-head">
          <span>No</span>
          <span>Name</span>
          <span>Division/Position</span>
          <span>Status</span>
        </div>
        ${rows.length ? rows.map((item, index) => `
          <div class="pending-row">
            <span class="pending-number">${escapeHtml(index + 1)}</span>
            <strong>${escapeHtml(item.employeeName)}</strong>
            <div>
              <small>${escapeHtml(item.division)}</small>
              <b>${escapeHtml(item.position)}</b>
            </div>
            <span class="pending-status">${escapeHtml(dashboardPendingStatusLabel(item))}</span>
          </div>
        `).join("") : `<div class="empty-state">Tidak ada data draft/nonaktif/belum mengisi.</div>`}
      </div>
    </div>
  `;
}

function dashboardPendingStatusLabel(item) {
  if (item.assessmentStatus === "Inactive" && item.status === "Draft") return "Nonaktif / Draft";
  if (item.assessmentStatus === "Inactive") return "Nonaktif";
  return "Belum Mengisi";
}

function renderRankingSummaryPanel(topRows, bottomRows) {
  return `
    <div class="ranking-summary-card">
      <div class="ranking-summary-head">
        <h3>Data Reward & Punishment Employee</h3>
        <small>Ranking berdasarkan total point final karyawan yang sudah verified</small>
      </div>
      ${renderCompactRankingGroup("Top 10 Terbaik", topRows, "top")}
      ${renderCompactRankingGroup("Top 10 Score Rendah", bottomRows, "bottom")}
    </div>
  `;
}

function renderCompactRankingGroup(title, rows, tone) {
  return `
    <div class="compact-ranking-group">
      <div class="compact-ranking-title ${escapeHtml(tone)}">
        ${tone === "top" ? icon("bar-chart") : icon("chevron-down")}
        <strong>${escapeHtml(title)}</strong>
      </div>
      <div class="compact-ranking-list">
        ${rows.length ? rows.map((item, index) => `
          <div class="compact-ranking-row">
            <span class="rank-number ${escapeHtml(tone)}">${escapeHtml(index + 1)}</span>
            <div>
              <strong>${escapeHtml(item.employeeName)}</strong>
              <small>${escapeHtml(item.division)}</small>
            </div>
            <b class="${escapeHtml(tone)}">${escapeHtml(item.totalPoint)}</b>
          </div>
        `).join("") : `<div class="empty-state">No ranking data.</div>`}
      </div>
    </div>
  `;
}

function renderRankingPanel(title, subtitle, rows, rankStart, tone = "top") {
  return `
    <div class="ranking-card">
      <div class="ranking-card-title ${escapeHtml(tone)}">
        <span>${tone === "top" ? icon("bar-chart") : icon("chevron-down")}</span>
        <strong>${escapeHtml(title)}</strong>
      </div>
      <p>${escapeHtml(subtitle)}</p>
      <div class="ranking-list">
        ${rows.length ? rows.map((item, index) => {
          const rank = title.includes("Bottom") ? rankStart - index : rankStart + index;
          return `
            <div class="ranking-row">
              <span class="rank-number">${escapeHtml(rank)}</span>
              <div>
                <strong>${escapeHtml(item.employeeName)}</strong>
                <small>${escapeHtml(item.division)} / ${escapeHtml(item.nik)}</small>
              </div>
              <b>${escapeHtml(item.totalPoint)}</b>
              ${resultPill(item.resultCategory)}
            </div>
          `;
        }).join("") : `<div class="empty-state">No ranking data.</div>`}
      </div>
    </div>
  `;
}

function renderDivisionAssessmentPanel(sourceRows = getDashboardRows(), period = getDashboardPeriod()) {
  const rows = getDivisionCategoryRows(sourceRows, period);
  const maxTotal = Math.max(25, ...rows.map((row) => row.total));

  return `
    <div class="dashboard-card">
      <div class="dashboard-card-header">
        <div>
          <h2>Progress Reward & Punishment per Division</h2>
          <small>Breakdown status assessment berdasarkan Submitted, Verified, dan Approved untuk ${escapeHtml(period?.name || "periode terpilih")}</small>
        </div>
      </div>
      <div class="division-stack-chart">
        ${rows.map((row) => `
          <div class="stack-row">
            <span title="${escapeHtml(row.division)}">${escapeHtml(row.division)}</span>
            <div class="stack-track" style="--stack-width:${escapeHtml(Math.max(4, (row.total / maxTotal) * 100))}%">
              ${renderStackSegment("submitted", row.submitted, row.total)}
              ${renderStackSegment("verified", row.verified, row.total)}
              ${renderStackSegment("approved", row.approved, row.total)}
            </div>
          </div>
        `).join("")}
        <div class="stack-axis">
          ${[0, 5, 10, 15, 20, 25].map((tick) => `<span>${tick}</span>`).join("")}
        </div>
      </div>
      <div class="chart-legend">
        <span class="submitted-dot"></span> Submitted
        <span class="verified-dot"></span> Verified
        <span class="approved-dot"></span> Approved
      </div>
    </div>
  `;
}

function renderStackSegment(type, value, total) {
  if (!value) return "";
  const width = Math.max(7, (value / total) * 100);
  return `<b class="${type}" style="width:${escapeHtml(width)}%">${escapeHtml(value)}</b>`;
}

function summaryBox(label, value, note) {
  return `
    <div class="summary-box">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(note)}</span>
    </div>
  `;
}

function getCategoryRows() {
  const groups = {};

  db.categories.forEach((item) => {
    groups[item.name] = {
      id: item.id,
      name: item.name,
      criteriaCount: 0,
      status: item.status,
      lastUpdate: item.lastUpdate
    };
  });

  db.criteria.forEach((item) => {
    if (!groups[item.category]) {
      groups[item.category] = {
        id: item.category,
        name: item.category,
        criteriaCount: 0,
        status: item.status === "Active" ? "Active" : "Inactive",
        lastUpdate: item.lastUpdate
      };
    }

    const group = groups[item.category];
    group.criteriaCount += 1;
  });

  return Object.values(groups)
    .map((group) => ({
      id: group.id,
      name: group.name,
      criteriaCount: group.criteriaCount,
      status: group.status,
      lastUpdate: group.lastUpdate
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function renderCategory() {
  return `<div class="page-grid">${renderCategoryListPanel()}</div>`;
}

function renderCategoryListPanel() {
  const sourceRows = getCategoryRows();
  const items = filterRows(sourceRows, "category", tableSearchKeys("category"));
  const page = getPaged(items, "category");

  return `
    <div class="panel">
      <div class="panel-header">
        <h2>Category</h2>
        <button class="btn primary" type="button" data-action="add" data-section="category">${icon("plus")} Add Category</button>
      </div>
      ${renderToolbar("category", sourceRows)}
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th class="center">No</th>
              <th>Category</th>
              <th class="center">Criteria</th>
              <th>Status</th>
              <th>Last Update</th>
              <th class="center">Action</th>
            </tr>
          </thead>
          <tbody>
            ${page.rows.length ? page.rows.map((item, index) => `
              <tr>
                <td class="center">${page.start + index + 1}</td>
                <td>${escapeHtml(item.name)}</td>
                <td class="center">${escapeHtml(item.criteriaCount)}</td>
                <td>${statusPill(item.status)}</td>
                <td>${escapeHtml(item.lastUpdate)}</td>
                <td class="center">${rowActions("category", item.id, true)}</td>
              </tr>
            `).join("") : emptyRow(6, "No category found.")}
          </tbody>
        </table>
      </div>
      ${renderPagination(page, "category")}
    </div>
  `;
}

function renderCriteria() {
  return `<div class="page-grid">${renderCriteriaListPanel()}</div>`;
}

function renderCriteriaListPanel(compact = false) {
  const items = filterRows(db.criteria, "criteria", tableSearchKeys("criteria"));
  const page = getPaged(items, "criteria", compact ? 5 : undefined);

  return `
    <div class="panel">
      <div class="panel-header">
        <h2>Criteria</h2>
        <button class="btn primary" type="button" data-action="add" data-section="criteria">${icon("plus")} Add</button>
      </div>
      ${compact ? "" : renderToolbar("criteria", db.criteria)}
      <div class="table-wrap">
        <table class="data-table criteria-table">
          <thead>
            <tr>
              <th class="center">No</th>
              <th>Category</th>
              <th>Criteria Code</th>
              <th>Criteria Name</th>
              <th>Sub Criteria</th>
              <th>Status</th>
              <th>Last Update</th>
              <th class="center">Action</th>
            </tr>
          </thead>
          <tbody>
            ${page.rows.length ? page.rows.map((item, index) => `
              <tr>
                <td class="center">${page.start + index + 1}</td>
                <td>${escapeHtml(item.category)}</td>
                <td>${escapeHtml(item.code)}</td>
                <td>${escapeHtml(item.name)}</td>
                <td>${item.hasSub ? "Yes" : "No"}</td>
                <td>${statusPill(item.status)}</td>
                <td>${escapeHtml(item.lastUpdate)}</td>
                <td class="center">${rowActions("criteria", item.id, true)}</td>
              </tr>
            `).join("") : emptyRow(8, "No criteria found.")}
          </tbody>
        </table>
      </div>
      ${compact ? "" : renderPagination(page, "criteria")}
    </div>
  `;
}

function tableSearchKeys(section) {
  return {
    category: ["name", "criteriaCount", "status", "lastUpdate"],
    criteria: ["category", "code", "name", "status"],
    point: ["docNo", "name", "description", "lastUpdate"],
    period: ["docNo", "name", "year", "status", "lastUpdate"],
    assessmentPeriod: ["docNo", "name", "year", "status", "lastUpdate"],
    verificationPeriod: ["docNo", "name", "year", "status", "lastUpdate"],
    employeeProcessPeriod: ["docNo", "name", "year", "status", "lastUpdate"],
    employeeResultPeriod: ["docNo", "name", "year", "status", "lastUpdate"],
    assessmentEmployee: ["docNo", "employeeName", "nik", "division", "position", "rawTotalPoint", "totalPoint", "verificationStatus"],
    employeeResult: ["docNo", "employeeName", "nik", "division", "position", "rawTotalPoint", "totalPoint", "verificationStatus"],
    employeeInput: ["docNo", "employeeName", "nik", "division", "pointName", "status"],
    employeeProcess: ["employeeName", "nik", "position", "division", "rawTotalPoint", "totalPoint", "assessmentStatus", "verificationStatus", "lastUpdate"],
    verification: ["employeeName", "nik", "position", "division", "rawTotalPoint", "totalPoint", "assessmentStatus", "verificationStatus", "lastUpdate"]
  }[section] || [];
}

function tableFilterConfig(section) {
  return {
    employeeInput: [
      { key: "division", label: "Division" },
      { key: "status", label: "Status" }
    ],
    verification: [
      { key: "division", label: "Division" },
      { key: "assessmentStatus", label: "Assessment" },
      { key: "verificationStatus", label: "Verification" }
    ],
    assessmentEmployee: [
      { key: "division", label: "Division" }
    ]
  }[section] || [];
}

function getFilterSourceRows(section) {
  if (section === "category") return getCategoryRows();
  if (section === "criteria") return db.criteria;
  if (section === "point") return db.points;
  if (section === "period") return db.periods;
  if (section === "assessmentPeriod") return db.periods;
  if (section === "verificationPeriod") return db.periods;
  if (section === "employeeProcessPeriod") return db.periods;
  if (section === "employeeResultPeriod") return db.periods;
  if (section === "assessmentEmployee") return getInputRows().filter((item) => item.status === "Verified");
  if (section === "employeeResult") return getEmployeePeriodRows(null, false);
  if (section === "employeeProcess") return getEmployeePeriodRows(null, false);
  if (section === "employeeInput") return getInputRows();
  if (section === "verification") return getInputRows().filter((item) => item.status !== "Draft");
  return [];
}

function renderToolbar(section, sourceRows = getFilterSourceRows(section)) {
  const filters = renderTableFilters(section, sourceRows);

  return `
    <div class="toolbar">
      <div class="toolbar-main">
        <div class="toolbar-left">
          <label class="field-inline">
            <select class="select-sm page-size-select" data-action="per-page" data-section="${section}">
              ${[10, 25, 50].map((value) => `<option value="${value}" ${appState.perPage[section] === value ? "selected" : ""}>${value}</option>`).join("")}
            </select>
            <span>records per page</span>
          </label>
        </div>
        <div class="toolbar-right">
          <label class="searchbox">
            <span data-icon="search"></span>
            <input type="search" placeholder="Search..." value="${escapeHtml(appState.search[section])}" data-action="search" data-section="${section}">
          </label>
        </div>
      </div>
      ${filters ? `<div class="toolbar-filter-row"><span>Filter</span>${filters}</div>` : ""}
    </div>
  `;
}

function renderTableFilters(section, rows) {
  const filters = tableFilterConfig(section);
  if (!filters.length) return "";

  return `
    <div class="table-filters">
      ${filters.map(({ key, label }) => {
        const selected = appState.filters[section]?.[key] || "";
        const options = uniqueOptions(rows, key);
        return `
          <label class="table-filter">
            <span>${escapeHtml(label)}</span>
            <select class="select-sm filter-select" data-action="table-filter" data-section="${section}" data-filter="${escapeHtml(key)}">
              <option value="">All ${escapeHtml(label)}</option>
              ${options.map((option) => `<option value="${escapeHtml(option)}" ${selected === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
            </select>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function uniqueOptions(rows, key) {
  return [...new Set(rows.map((row) => String(row[key] ?? "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
}

function selectedIds(section) {
  return appState.selection[section] || [];
}

function selectionHeader(section, rows) {
  const ids = rows.map((row) => row.id);
  const checked = ids.length > 0 && ids.every((id) => selectedIds(section).includes(id));

  return `
    <th class="center select-col no-sort">
      <label class="check-cell" title="Select current page">
        <input type="checkbox" data-action="select-page" data-section="${section}" data-ids="${escapeHtml(ids.join(","))}" ${checked ? "checked" : ""} ${ids.length ? "" : "disabled"}>
      </label>
    </th>
  `;
}

function selectionCell(section, id) {
  const checked = selectedIds(section).includes(id);

  return `
    <td class="center select-col">
      <label class="check-cell">
        <input type="checkbox" data-action="select-row" data-section="${section}" data-id="${escapeHtml(id)}" ${checked ? "checked" : ""}>
      </label>
    </td>
  `;
}

function renderBulkActions(section, filteredRows) {
  const selected = selectedIds(section);
  if (!selected.length) return "";

  const allFilteredIds = filteredRows.map((row) => row.id);
  const allFilteredSelected = allFilteredIds.length > 0 && allFilteredIds.every((id) => selected.includes(id));

  return `
    <div class="bulk-bar">
      <div class="bulk-info">
        <strong>${escapeHtml(selected.length)} selected</strong>
        <span>${escapeHtml(filteredRows.length)} rows after filter</span>
      </div>
      <div class="bulk-actions">
        <button class="btn neutral" type="button" data-action="select-all-filtered" data-section="${section}" ${allFilteredSelected || !allFilteredIds.length ? "disabled" : ""}>Select All Filtered</button>
        <button class="btn neutral" type="button" data-action="bulk-update-status" data-section="${section}" data-status="Draft" ${selected.length ? "" : "disabled"}>Mark Draft</button>
        <button class="btn success" type="button" data-action="bulk-update-status" data-section="${section}" data-status="Submitted" ${selected.length ? "" : "disabled"}>${icon("check")} Submit Selected</button>
        <button class="btn ghost" type="button" data-action="clear-selection" data-section="${section}" ${selected.length ? "" : "disabled"}>Clear</button>
      </div>
    </div>
  `;
}

function renderPagination(page, section) {
  return `
    <div class="pagination">
      <span>Showing ${page.total ? page.start + 1 : 0}-${page.end} From ${page.total} Data</span>
      <div class="page-buttons">
        ${Array.from({ length: page.totalPages }, (_, index) => `
          <button class="page-number ${page.current === index + 1 ? "active" : ""}" type="button" data-action="page" data-section="${section}" data-page="${index + 1}">
            ${index + 1}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function filterRows(rows, section, keys) {
  const query = appState.search[section].trim().toLowerCase();
  const filters = appState.filters[section] || {};

  return rows.filter((item) => {
    const matchesSearch = !query || keys.some((key) => String(item[key] ?? "").toLowerCase().includes(query));
    const matchesFilters = tableFilterConfig(section).every(({ key }) => {
      const selected = filters[key];
      return !selected || String(item[key] ?? "") === selected;
    });

    return matchesSearch && matchesFilters;
  });
}

function getPaged(rows, section, limitOverride) {
  const perPage = limitOverride || appState.perPage[section];
  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const current = Math.min(appState.page[section], totalPages);
  const start = (current - 1) * perPage;
  const end = Math.min(start + perPage, rows.length);

  return { rows: rows.slice(start, end), total: rows.length, totalPages, current, start, end };
}

function rowActions(section, id, allowDelete = false) {
  if (section === "verification") {
    const item = findEmployeeInput(id);
    return item ? verificationActions(item) : "";
  }

  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View" aria-label="View" data-action="detail" data-section="${section}" data-id="${escapeHtml(id)}">${icon("eye")}</button>
      <button class="action-icon action-edit" type="button" title="Edit" aria-label="Edit" data-action="edit" data-section="${section}" data-id="${escapeHtml(id)}">${icon("edit")}</button>
      ${allowDelete ? `<button class="action-icon action-delete danger" type="button" title="Delete" aria-label="Delete" data-action="delete" data-section="${section}" data-id="${escapeHtml(id)}">${icon("trash")}</button>` : ""}
    </span>
  `;
}

function verificationActions(item) {
  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View" aria-label="View" data-action="detail" data-section="verification" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
    </span>
  `;
}

function employeeInputActions(item) {
  const canEdit = item.status !== "Verified";

  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View" aria-label="View" data-action="detail" data-section="employeeInput" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
      ${canEdit ? `<button class="action-icon action-edit" type="button" title="Edit" aria-label="Edit" data-action="edit" data-section="employeeInput" data-id="${escapeHtml(item.id)}">${icon("edit")}</button>` : ""}
    </span>
  `;
}

function emptyRow(colspan, label) {
  return `<tr><td colspan="${colspan}" class="empty-row">${escapeHtml(label)}</td></tr>`;
}

function statusPill(status) {
  const key = String(status).toLowerCase();
  const cls = key === "active" ? "active" : key === "inactive" ? "inactive" : key === "open" ? "open" : key === "closed" ? "closed" : key === "approved" ? "approved" : key === "submitted" ? "submitted" : key === "verified" ? "verified" : key === "unverified" ? "unverified" : key === "verification" ? "submitted" : key === "outstanding" ? "returned" : key === "returned" ? "returned" : key === "pending" ? "warning" : key === "rejected" ? "rejected" : "draft";
  return `<span class="status ${cls}">${escapeHtml(status)}</span>`;
}

function resultPill(category) {
  const key = String(category).toLowerCase();
  const cls = key.includes("eligible") ? "reward" : "punishment";
  return `<span class="result-pill ${cls}">${escapeHtml(category)}</span>`;
}

function renderCategoryForm() {
  const isEdit = appState.view === "edit";
  const item = isEdit ? findCategory(appState.selectedId) : null;
  if (isEdit && !item) return renderNotFound("Category");
  const value = item || { name: "", status: "Active" };

  return `
    <form class="panel" id="categoryForm">
      <div class="panel-header">
        <h2>${isEdit ? "Edit" : "Add"} Category</h2>
      </div>
      <div class="panel-body form-grid">
        ${field("Category Name", `<input name="name" value="${escapeHtml(value.name)}" placeholder="Kriteria Utama" required>`, true)}
        ${field("Status", `
          <div class="radio-group">
            ${["Active", "Inactive"].map((status) => `
              <label>
                <input type="radio" name="status" value="${status}" ${value.status === status ? "checked" : ""}>
                <span class="radio-pill">${status}</span>
              </label>
            `).join("")}
          </div>
        `, true)}
      </div>
      <div class="panel-footer">
        <button class="btn danger" type="button" data-action="cancel">Cancel</button>
        <button class="btn success" type="submit" data-action="save-category">${icon("save")} Save</button>
      </div>
    </form>
  `;
}

function renderCategoryDetail() {
  const item = findCategory(appState.selectedId);
  if (!item) return renderNotFound("Category");

  return `
    <div class="drawer-stack">
      <div class="panel">
        <div class="panel-header">
          <h2>Detail Category</h2>
          <button class="btn primary" type="button" data-action="edit" data-section="category" data-id="${escapeHtml(item.id)}">${icon("edit")} Edit Data</button>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Category Name", item.name],
            ["Criteria", getCategoryRows().find((row) => row.id === item.id || row.name === item.name)?.criteriaCount || 0],
            ["Status", statusPill(item.status)],
            ["Last Update", item.lastUpdate || "-"]
          ])}
        </div>
      </div>
    </div>
  `;
}

function getCriteriaCategoryOptions(selected) {
  return getCategoryRows().filter((item) => item.status === "Active" || item.name === selected);
}

function renderCriteriaDetail() {
  const item = findCriteria(appState.selectedId);
  if (!item) return renderNotFound("Criteria");

  return `
    <div class="drawer-stack">
      <div class="panel">
        <div class="panel-header">
          <h2>Detail Criteria</h2>
          <button class="btn primary" type="button" data-action="edit" data-section="criteria" data-id="${escapeHtml(item.id)}">${icon("edit")} Edit Data</button>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Category", item.category],
            ["Status", statusPill(item.status)],
            ["Criteria Code", item.code],
            ["Criteria Name", item.name],
            ["Last Update", item.lastUpdate],
            ["Sub Criteria", item.hasSub ? "Yes" : "No"],
            ["Description", item.description]
          ])}
        </div>
      </div>
      ${item.hasSub ? renderSubCriteriaPanel(item.subCriteria) : ""}
    </div>
  `;
}

function renderSubCriteriaPanel(rows) {
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>Sub Criteria</h3>
      </div>
      <div class="table-wrap">
        <table class="mini-table">
          <thead>
            <tr>
              <th class="center">No</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((name, index) => `
              <tr>
                <td class="center">${index + 1}</td>
                <td>${escapeHtml(name)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderDetailGrid(items) {
  return `
    <div class="detail-grid">
      ${items.map(([label, value]) => `
        <div class="detail-item">
          <span class="label">${escapeHtml(label)}</span>
          <span>:</span>
          <span class="value">${isSafeDetailHtml(value) ? value : escapeHtml(value)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function isSafeDetailHtml(value) {
  return typeof value === "string" && (
    /^<span class="(status|result-pill) [a-z]+">[^<>]+<\/span>$/.test(value)
    || /^<strong class="process-verification-point (same|down|up)">[^<>]+<\/strong>$/.test(value)
  );
}

function renderCriteriaForm() {
  const isEdit = appState.view === "edit";
  const item = isEdit ? findCriteria(appState.selectedId) : {
    id: "",
    period: "2026",
    category: "Kriteria Utama",
    code: "",
    name: "",
    hasSub: false,
    status: "Active",
    description: "",
    subCriteria: [""]
  };

  if (!item) return renderNotFound("Criteria");
  const categoryOptions = getCriteriaCategoryOptions(item.category);

  return `
    <form class="panel" id="criteriaForm">
      <div class="panel-header">
        <h2>${isEdit ? "Edit Criteria" : "Add Criteria"}</h2>
      </div>
      <div class="panel-body form-grid">
        ${field("Category", `<select name="category" required>
          ${categoryOptions.map((category) => `<option value="${escapeHtml(category.name)}" ${item.category === category.name ? "selected" : ""}>${escapeHtml(category.name)}</option>`).join("")}
        </select>`, true)}
        ${field("Criteria Code", `<input name="code" value="${escapeHtml(item.code)}" ${isEdit ? "readonly" : ""} required>`, true)}
        ${field("Criteria Name", `<input name="name" value="${escapeHtml(item.name)}" required>`, true)}
        ${field("Sub Criteria", `
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" name="hasSub" data-action="toggle-subcriteria" ${item.hasSub ? "checked" : ""}>
              <span class="switch-track"></span>
              <span>Yes</span>
            </label>
          </div>
        `, true)}
        ${isEdit ? field("Status", `
          <div class="radio-group">
            ${["Active", "Inactive"].map((status) => `
              <label>
                <input type="radio" name="status" value="${status}" ${item.status === status ? "checked" : ""}>
                <span class="radio-pill">${status}</span>
              </label>
            `).join("")}
          </div>
        `, true) : ""}
        ${field("Description", `<textarea name="description" required>${escapeHtml(item.description)}</textarea>`, true)}
        <div class="form-field" id="subCriteriaField" style="${item.hasSub ? "" : "display:none"}">
          <label>Sub Criteria</label>
          <div class="subcriteria-box" id="subCriteriaRows">
            ${(item.subCriteria.length ? item.subCriteria : [""]).map((name, index) => subCriteriaInput(name, index)).join("")}
            <button class="btn ghost" type="button" data-action="add-sub-row">${icon("plus")} Add Row</button>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <button class="btn danger" type="button" data-action="cancel">Cancel</button>
        <button class="btn success" type="submit" data-action="save-criteria">${icon("save")} Save</button>
      </div>
    </form>
  `;
}

function field(label, control, required = false) {
  return `
    <div class="form-field">
      <label>${escapeHtml(label)} ${required ? '<span class="required">*</span>' : ""}</label>
      <div>${control}</div>
    </div>
  `;
}

function subCriteriaInput(name, index) {
  return `
    <div class="dynamic-row">
      <strong>${index + 1}</strong>
      <input name="subCriteria[]" value="${escapeHtml(name)}">
      <button class="action-icon action-delete danger" type="button" title="Delete" aria-label="Delete row" data-action="remove-sub-row">${icon("trash")}</button>
    </div>
  `;
}

function renderPoint() {
  return `<div class="page-grid">${renderPointListPanel()}</div>`;
}

function renderPointListPanel() {
  const items = filterRows(db.points, "point", tableSearchKeys("point"));
  const page = getPaged(items, "point");

  return `
    <div class="panel">
      <div class="panel-header">
        <h2>Point</h2>
        <button class="btn primary" type="button" data-action="add" data-section="point">${icon("plus")} Add</button>
      </div>
      ${renderToolbar("point", db.points)}
      <div class="table-wrap">
        <table class="data-table point-table">
          <thead>
            <tr>
              <th class="center">No</th>
              <th>Doc No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Last Update</th>
              <th class="center">Action</th>
            </tr>
          </thead>
          <tbody>
            ${page.rows.length ? page.rows.map((item, index) => `
              <tr>
                <td class="center">${page.start + index + 1}</td>
                <td>${escapeHtml(item.docNo)}</td>
                <td>${escapeHtml(item.name)}</td>
                <td>${escapeHtml(item.description)}</td>
                <td>${escapeHtml(item.lastUpdate)}</td>
                <td class="center">${rowActions("point", item.id, true)}</td>
              </tr>
            `).join("") : emptyRow(6, "No point rules found.")}
          </tbody>
        </table>
      </div>
      ${renderPagination(page, "point")}
    </div>
  `;
}

function renderEmployeeInput() {
  return `<div class="page-grid">${renderEmployeeInputListPanel()}</div>`;
}

function renderEmployeeInputListPanel() {
  const rows = getInputRows();
  const items = filterRows(rows, "employeeInput", tableSearchKeys("employeeInput"));
  const page = getPaged(items, "employeeInput");

  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Input Reward & Punishment</h2>
          <small class="panel-kicker">Employee transaction from active point rules</small>
        </div>
      </div>
      ${renderToolbar("employeeInput", rows)}
      <div class="table-wrap">
        <table class="data-table employee-input-table">
          <thead>
            <tr>
              ${selectionHeader("employeeInput", page.rows)}
              <th class="center no-sort">No</th>
              <th>Doc No</th>
              <th>Employee</th>
              <th>Division</th>
              <th>Point Rule</th>
              <th class="center">Total Point</th>
              <th>Status</th>
              <th class="center">Action</th>
            </tr>
          </thead>
          <tbody>
            ${page.rows.length ? page.rows.map((item, index) => `
              <tr>
                ${selectionCell("employeeInput", item.id)}
                <td class="center">${page.start + index + 1}</td>
                <td>${escapeHtml(item.docNo)}</td>
                <td>
                  <strong>${escapeHtml(item.employeeName)}</strong>
                  <small class="table-subtext">${escapeHtml(item.nik)}</small>
                </td>
                <td>${escapeHtml(item.division)}</td>
                <td>${escapeHtml(item.pointName)}</td>
                <td class="center"><strong>${escapeHtml(item.totalPoint)}</strong></td>
                <td>${statusPill(item.status)}</td>
                <td class="center">${employeeInputActions(item)}</td>
              </tr>
            `).join("") : emptyRow(9, "No employee input found.")}
          </tbody>
        </table>
      </div>
      ${renderBulkActions("employeeInput", items)}
      ${renderPagination(page, "employeeInput")}
    </div>
  `;
}

function renderVerification() {
  const period = findPeriod(appState.selectedId);
  const rows = getProcessRows(period);
  const items = filterRows(rows, "verification", tableSearchKeys("verification"));
  const page = getPaged(items, "verification");

  return `
    <div class="page-grid">
      <div class="panel process-panel">
        <div class="process-head">
          <h2>Process</h2>
          ${renderProcessHeaderActions()}
        </div>
        ${renderProcessContext(period)}
        ${renderProcessToolbar(rows)}
        <div class="table-wrap">
          <table class="data-table verification-table">
            <thead>
              <tr>
                <th class="center no-sort">No</th>
                <th>Name</th>
                <th>NIK</th>
                <th>Position & Division</th>
                <th class="center">Total Point<br>(Input)</th>
                <th class="center">Total Point<br>(Verification)</th>
                <th>Assessment Status</th>
                <th>Verification Status</th>
                <th>Last Edited</th>
                <th class="center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${page.rows.length ? page.rows.map((item, index) => `
                <tr>
                  <td class="center">${page.start + index + 1}</td>
                  <td><strong>${escapeHtml(item.employeeName)}</strong></td>
                  <td>${escapeHtml(item.nik)}</td>
                  <td>
                    <strong>${escapeHtml(item.position || "-")}</strong>
                    <small class="table-subtext">${escapeHtml(item.division)}</small>
                  </td>
                  <td class="center"><strong>${escapeHtml(item.rawTotalPoint)}</strong></td>
                  <td class="center">${processVerificationPoint(item.rawTotalPoint, item.totalPoint)}</td>
                  <td>${statusPill(item.assessmentStatus)}</td>
                  <td>${statusPill(item.verificationStatus)}</td>
                  <td>${escapeHtml(item.lastUpdate || "-")}</td>
                  <td class="center">${processRowActions(item, period)}</td>
                </tr>
              `).join("") : emptyRow(10, "No process data found.")}
            </tbody>
          </table>
        </div>
        ${renderPagination(page, "verification")}
      </div>
    </div>
  `;
}

function renderProcessContext(period) {
  const fallback = {
    docNo: "-",
    name: "Semua data",
    year: "-",
    startDate: "",
    finishDate: "",
    status: "-"
  };
  const item = period || fallback;

  return `
    <div class="process-context">
      <div class="process-context-col">
        ${processMetaRow("Doc No", item.docNo)}
        ${processMetaRow("Name", item.name)}
        ${processMetaRow("Period", item.year || "-")}
      </div>
      <div class="process-context-col">
        ${processMetaRow("Start Date Input", formatDate(item.startDate))}
        ${processMetaRow("Finish Date Input", formatDate(item.finishDate))}
        ${processMetaRow("Status", processPeriodStatus(item))}
      </div>
    </div>
  `;
}

function processMetaRow(label, value) {
  return `
    <div class="process-meta-row">
      <span>${escapeHtml(label)}</span>
      <b>:</b>
      <strong>${isSafeDetailHtml(value) ? value : escapeHtml(value)}</strong>
    </div>
  `;
}

function processPeriodStatus(period) {
  if (!period?.status || period.status === "-") return "-";
  const phase = period.phase === "verification" ? "Verification" : period.phase === "approval" ? "Approved" : period.status;
  return statusPill(phase);
}

function renderProcessHeaderActions() {
  return `
    <div class="process-header-actions" aria-label="Process actions">
      <button class="process-action-button employee" type="button" data-action="process-tool" data-tool="edit-karyawan">${icon("user-plus")} <span>Edit Karyawan</span></button>
      <button class="process-action-button sync" type="button" data-action="process-tool" data-tool="sync">${icon("refresh-cw")} <span>Sync</span></button>
      <button class="process-action-button import" type="button" data-action="process-tool" data-tool="import">${icon("upload")} <span>Import</span></button>
      <button class="process-action-button export" type="button" data-action="process-tool" data-tool="export">${icon("download")} <span>Export</span></button>
    </div>
  `;
}

function renderProcessToolbar(rows, section = "verification") {
  const filters = renderTableFilters(section, rows);

  return `
    <div class="process-toolbar">
      <div class="process-toolbar-left">
        <div class="process-filter-group">
          <span>Filter</span>
          ${filters || '<div class="table-filters"></div>'}
        </div>
      </div>
      <div class="process-toolbar-right">
        <label class="field-inline">
          <select class="select-sm page-size-select" data-action="per-page" data-section="${section}">
            ${[10, 25, 50].map((value) => `<option value="${value}" ${appState.perPage[section] === value ? "selected" : ""}>${value}</option>`).join("")}
          </select>
          <span>Records Per Page</span>
        </label>
        <label class="searchbox process-search">
          <span data-icon="search"></span>
          <input type="search" placeholder="Search" value="${escapeHtml(appState.search[section])}" data-action="search" data-section="${section}">
        </label>
      </div>
    </div>
  `;
}

function processVerificationPoint(inputPoint, verificationPoint) {
  const input = Number(inputPoint || 0);
  const verification = Number(verificationPoint || 0);
  const tone = verification > input ? "up" : verification < input ? "down" : "same";

  return `<strong class="process-verification-point ${tone}">${escapeHtml(verification)}</strong>`;
}

function renderProcessTotalBoxes(entry, mode = "input") {
  const inputTotal = getEmployeeInputRawTotal(entry);
  const verificationTotal = getEmployeeInputTotal(entry);

  if (mode === "verification") {
    return `
      <div class="process-total-box">
        <span>Total Point Verification</span>
        <strong class="process-verification-point ${verificationTotal > inputTotal ? "up" : verificationTotal < inputTotal ? "down" : "same"}" data-role="process-total-verification">${escapeHtml(verificationTotal)}</strong>
      </div>
    `;
  }

  return `
    <div class="process-total-box">
      <span>Total Point Input</span>
      <strong data-role="process-total-input">${escapeHtml(inputTotal)}</strong>
    </div>
  `;
}

function processRowActions(item, period) {
  const isOpen = isProcessOpenPeriod(period);
  const isVerification = isProcessVerificationPeriod(period);
  const isFinal = isProcessFinalPeriod(period);

  return `
    <span class="table-actions">
      <button class="action-icon action-view" type="button" title="View" aria-label="View" data-action="detail" data-section="verification" data-id="${escapeHtml(item.id)}">${icon("eye")}</button>
      ${isOpen && !isFinal && canEditProcess() ? `<button class="action-icon action-edit" type="button" title="Edit" aria-label="Edit" data-action="edit" data-section="verification" data-id="${escapeHtml(item.id)}">${icon("edit")}</button>` : ""}
      ${isVerification && !isFinal && canVerifyProcess() ? `<button class="action-icon action-verify" type="button" title="Verification" aria-label="Verification" data-action="verify" data-id="${escapeHtml(item.id)}">${icon("check")}</button>` : ""}
    </span>
  `;
}

function renderPointDetail() {
  const item = findPoint(appState.selectedId);
  if (!item) return renderNotFound("Point");

  return `
    <div class="drawer-stack">
      <div class="panel">
        <div class="panel-header">
          <h2>Detail Point</h2>
          <button class="btn primary" type="button" data-action="edit" data-section="point" data-id="${escapeHtml(item.id)}">${icon("edit")} Edit Data</button>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Doc No", item.docNo],
            ["Name", item.name],
            ["Last Update", item.lastUpdate],
            ["Description", item.description]
          ])}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Pertanyaan & Rules</h3>
        </div>
        <div class="panel-body">
          ${renderRuleAccordion(item.rules)}
        </div>
      </div>
    </div>
  `;
}

function renderRuleAccordion(rules) {
  return `
    <div class="accordion">
      ${rules.map((rule, index) => `
        <div class="accordion-item">
          <button class="accordion-button" type="button" data-action="toggle-accordion">
            <span>${escapeHtml(rule.code)}</span>
            <span>${escapeHtml(rule.criteriaName)}</span>
            <span data-icon="chevron-down"></span>
          </button>
          <div class="accordion-body">
            ${renderQuestionBlock(rule)}
            ${rule.hasSub ? renderSubRuleCards(rule) : renderOptionsTable(rule.options)}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderQuestionBlock(rule) {
  const question = rule.question || getCriteriaQuestion(rule.code, rule.criteriaName).text;
  const info = rule.questionInfo || getCriteriaQuestion(rule.code, rule.criteriaName).info;

  return `
    <div class="question-card">
      <div class="question-head">
        <div class="question-title">
          <span class="question-code">${escapeHtml(rule.code)}</span>
          <strong>${escapeHtml(question)}</strong>
        </div>
        <button class="info-toggle" type="button" title="Info soal" aria-label="Info soal ${escapeHtml(rule.code)}" aria-expanded="false" data-action="toggle-question-info">
          ${icon("info")}
        </button>
      </div>
      <div class="question-info">
        ${escapeHtml(info)}
      </div>
    </div>
  `;
}

function totalPoints(options) {
  return options.reduce((sum, item) => sum + Number(item.point || 0), 0);
}

function totalSubRulePoints(subRules) {
  return Object.values(subRules).reduce((sum, options) => sum + totalPoints(options), 0);
}

function renderOptionsTable(options, showFooter = false) {
  return `
    <table class="mini-table">
      <thead>
        <tr>
          <th>Option</th>
          <th class="center">Point</th>
        </tr>
      </thead>
      <tbody>
        ${options.map((option) => `
          <tr>
            <td>${escapeHtml(option.option)}</td>
            <td class="center">${escapeHtml(option.point)}</td>
          </tr>
        `).join("")}
      </tbody>
      ${showFooter ? `
        <tfoot>
          <tr>
            <td>Total Point</td>
            <td class="center">${escapeHtml(totalPoints(options))}</td>
          </tr>
        </tfoot>
      ` : ""}
    </table>
  `;
}

function renderSubRuleCards(rule) {
  const entries = Object.entries(rule.subRules);
  return `
    <div class="subrule-stack">
      <div class="subrule-total-strip">
        <span>Max Point Keseluruhan Sub</span>
        <strong>${escapeHtml(totalSubRulePoints(rule.subRules))}</strong>
      </div>
      <div class="subrule-grid">
        ${entries.map(([name, options]) => `
          <div class="subrule-card">
            <h4>
              <span>${escapeHtml(name)}</span>
              <b>${escapeHtml(totalPoints(options))} Point</b>
            </h4>
            ${renderOptionsTable(options, true)}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderPointForm() {
  const isEdit = appState.view === "edit";
  const draft = appState.pointDraft;

  if (!draft) return renderNotFound("Point");

  return `
    <form class="panel" id="pointForm">
      <div class="panel-header">
        <h2>${isEdit ? "Edit Point" : "Add Point"}</h2>
      </div>
      <div class="panel-body form-grid">
        ${field("Doc No", `<input name="docNo" value="${escapeHtml(draft.docNo)}" readonly>`, false)}
        ${field("Name", `<input name="name" value="${escapeHtml(draft.name)}" placeholder="Rule Tahun 2025" required>`, true)}
        ${field("Description", `<textarea name="description" required>${escapeHtml(draft.description)}</textarea>`, true)}
      </div>
      <div class="panel-header">
        <h3>Rules</h3>
        <button class="btn ghost" type="button" data-action="add-rule-row">${icon("plus")} Add Row</button>
      </div>
      <div class="panel-body">
        <div class="rules-editor" id="rulesEditor">
          <div class="rules-row header">
            <span>Code</span>
            <span>Criteria</span>
            <span>Sub Criteria</span>
            <span>Rules</span>
            <span>Action</span>
          </div>
          ${draft.rules.map((rule, index) => renderRuleEditorRow(rule, index)).join("")}
        </div>
      </div>
      <div class="panel-footer">
        <button class="btn danger" type="button" data-action="cancel">Cancel</button>
        <button class="btn success" type="submit" data-action="save-point">${icon("save")} Save</button>
      </div>
    </form>
  `;
}

function renderEmployeeInputDetail() {
  const entry = findEmployeeInput(appState.selectedId);
  if (!entry) return renderNotFound("Input Reward & Punishment");

  const employee = findEmployee(entry.employeeId);
  const period = findPeriod(entry.periodId);
  const point = findPoint(entry.pointId);
  const canEdit = entry.status !== "Verified";

  return `
    <div class="drawer-stack">
      <div class="panel">
        <div class="panel-header">
          <h2>Detail Input Reward & Punishment</h2>
          ${canEdit ? `<button class="btn primary" type="button" data-action="edit" data-section="employeeInput" data-id="${escapeHtml(entry.id)}">${icon("edit")} Isi Data</button>` : ""}
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Doc No", entry.docNo],
            ["Employee", employee ? `${employee.name} / ${employee.nik}` : "-"],
            ["Division", employee?.division || "-"],
            ["Point Rule", point?.name || "-"],
            ["Total Point", getEmployeeInputTotal(entry)],
            ["Status", statusPill(entry.status)],
            ["Verifier", entry.verifier],
            ["Last Update", entry.lastUpdate],
            ["Notes", entry.notes || "-"]
          ])}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Jawaban Employee</h3>
        </div>
        <div class="panel-body">
          ${renderEmployeeAnswerReview(entry)}
        </div>
      </div>
    </div>
  `;
}

function renderProcessEntryPage() {
  const entry = findEmployeeInput(appState.selectedId);
  if (!entry) return renderNotFound("Process");

  const employee = findEmployee(entry.employeeId);
  const period = findPeriod(entry.periodId);
  const point = findPoint(entry.pointId);
  if (!employee || !period || !point) return renderNotFound("Process");
  if (!canAccessProcessEntry(entry)) return renderNoAccess("Process");
  if (appState.view === "edit" && (!canEditProcess() || !isProcessOpenPeriod(period) || isProcessFinalPeriod(period))) return renderNoAccess("Process");
  if (appState.view === "verify" && (!canVerifyProcess() || !isProcessVerificationPeriod(period) || isProcessFinalPeriod(period))) return renderNoAccess("Process");

  const tab = appState.processTab === "verification" ? "verification" : "input";
  const inputEditable = false;
  const verificationEditable = ["edit", "verify"].includes(appState.view) && tab === "verification";
  const content = `
    ${renderProcessEntryHeader(entry, employee, period, tab)}
    ${renderProcessEntryTabs(tab)}
    ${tab === "verification"
      ? renderProcessVerificationTab(entry, verificationEditable)
      : renderProcessInputTab(entry, point, inputEditable)}
  `;

  if (inputEditable) {
    return `<form class="process-entry-page" id="employeeInputForm">${content}</form>`;
  }

  if (verificationEditable) {
    return `<form class="process-entry-page" id="verificationForm">${content}</form>`;
  }

  return `<div class="process-entry-page">${content}</div>`;
}

function renderProcessEntryHeader(entry, employee, period, mode = "input") {
  const rawTotal = getEmployeeInputRawTotal(entry);
  const total = getEmployeeInputTotal(entry);
  const totalRow = mode === "verification"
    ? processMetaRow("Total Point (Verification)", processVerificationPoint(rawTotal, total))
    : processMetaRow("Total Point (Input)", rawTotal);

  return `
    <div class="panel process-entry-header">
      <div class="process-entry-title">
        <h2>Process</h2>
      </div>
      <div class="process-context process-entry-context">
        <div class="process-context-col">
          ${processMetaRow("Period", period.year || "-")}
          ${processMetaRow("Name", employee.name)}
          ${processMetaRow("NIK", employee.nik)}
          ${processMetaRow("Position", employee.position)}
        </div>
        <div class="process-context-col">
          ${processMetaRow("Assessment Status", statusPill(["Submitted", "Verified"].includes(entry.status) ? "Active" : "Inactive"))}
          ${processMetaRow("Verification Status", statusPill(entry.status === "Verified" ? "Verified" : "Unverified"))}
          ${totalRow}
        </div>
      </div>
    </div>
  `;
}

function renderProcessEntryTabs(activeTab) {
  return `
    <div class="process-tabs" role="tablist" aria-label="Process tabs">
      <button class="process-tab ${activeTab === "input" ? "active" : ""}" type="button" role="tab" aria-selected="${activeTab === "input"}" data-action="process-tab" data-tab="input">Input</button>
      <button class="process-tab ${activeTab === "verification" ? "active" : ""}" type="button" role="tab" aria-selected="${activeTab === "verification"}" data-action="process-tab" data-tab="verification">Verification</button>
    </div>
  `;
}

function renderProcessInputTab(entry, point, editable, notesPlaceholder = "Catatan admin sebelum submit", uploadReadonly = true) {
  return `
    <div class="panel process-entry-form-panel">
      <div class="panel-header">
        <div>
          <h3>Reward and Punishment</h3>
          <small class="panel-kicker">Detail jawaban employee yang masuk ke Process.</small>
        </div>
        <div class="process-entry-header-actions">
          <div class="assessment-collapse-actions">
            <button class="assessment-mini-action" type="button" data-action="collapse-assessment-all">${icon("chevron-right")} Collapse All</button>
            <button class="assessment-mini-action" type="button" data-action="expand-assessment-all">${icon("chevron-down")} Uncollapse All</button>
          </div>
          ${renderProcessTotalBoxes(entry, "input")}
        </div>
      </div>
      <div class="panel-body assessment-rule-stack process-rule-stack">
        ${point.rules.map((rule, index) => renderAssessmentRuleInput(rule, entry.answers?.[rule.code], index + 1, !editable, uploadReadonly)).join("")}
      </div>
      <div class="panel-body">
        ${field("Notes", `<textarea name="notes" placeholder="${escapeHtml(notesPlaceholder)}" ${editable ? "" : "disabled"}>${escapeHtml(entry.notes || "")}</textarea>`, false)}
      </div>
      <div class="panel-footer">
        <button class="btn danger" type="button" data-action="process-back" data-period-id="${escapeHtml(entry.periodId)}">Back</button>
        ${editable ? `
          <button class="btn neutral" type="submit" data-action="save-employee-input" data-status="Draft">${icon("save")} Save Draft</button>
          <button class="btn success" type="submit" data-action="save-employee-input" data-status="Submitted">${icon("check")} Submit</button>
        ` : ""}
      </div>
    </div>
  `;
}

function renderProcessVerificationTab(entry, editable) {
  return `
    ${renderVerificationReviewPanel(entry, editable, {
      title: "Verification",
      subtitle: editable ? "Koreksi jawaban dan isi remark untuk hasil verifikasi." : "Hasil verifikasi atas jawaban employee."
    })}
    ${editable ? renderVerificationDecisionForm(entry) : `
      <div class="panel-footer process-entry-footer">
        <button class="btn danger" type="button" data-action="process-back" data-period-id="${escapeHtml(entry.periodId)}">Back</button>
      </div>
    `}
  `;
}

function renderFinalResultPanel(entry) {
  return renderVerificationReviewPanel(entry, false, {
    title: "Final",
    subtitle: "Hasil final setelah proses verifikasi."
  });
}

function renderVerificationDetail() {
  const entry = findEmployeeInput(appState.selectedId);
  if (!entry) return renderNotFound("Process");

  const employee = findEmployee(entry.employeeId);
  const period = findPeriod(entry.periodId);
  const total = getEmployeeInputTotal(entry);
  const canVerify = entry.status !== "Verified";
  const summaryPanel = `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h2>Detail Process</h2>
          <small class="panel-kicker">Review jawaban employee dan hasil verifikasi.</small>
        </div>
      </div>
      <div class="panel-body">
        ${renderDetailGrid([
          ["Doc No", entry.docNo],
          ["Employee", employee ? `${employee.name} / ${employee.nik}` : "-"],
          ["Division", employee?.division || "-"],
          ["Tanggal Submit", entry.submittedAt || "-"],
          ["Total Point", total],
          ["Rejected Soal", `${getRejectedAnswerCount(entry)} soal`],
          ["Status", statusPill(entry.status)],
          ["Verifier", entry.verifier],
          ["Notes", entry.notes || "-"]
        ])}
      </div>
    </div>
  `;

  if (canVerify) {
    return `
      <form class="verification-page" id="verificationForm">
        ${summaryPanel}
        ${renderVerificationReviewPanel(entry, true)}
        ${renderVerificationDecisionForm(entry)}
      </form>
    `;
  }

  return `
    <div class="verification-page">
      ${summaryPanel}
      ${renderVerificationReviewPanel(entry, false)}
    </div>
  `;
}

function renderVerificationDecisionForm(entry) {
  return `
    <div class="panel">
      <div class="panel-header">
        <h3>Final Validation</h3>
      </div>
      <div class="panel-body form-grid">
        ${field("Verifier", `<input name="verifier" value="${escapeHtml(entry.verifier || "HC Reward Team")}" required>`, true)}
        ${field("Final Notes", `<textarea name="notes" placeholder="Catatan hasil verifikasi akhir">${escapeHtml(entry.notes || "")}</textarea>`, false)}
      </div>
      <div class="panel-footer">
        <button class="btn danger" type="button" data-action="process-back" data-period-id="${escapeHtml(entry.periodId)}">Back</button>
        <button class="btn success" type="submit" data-action="save-verification">${icon("check")} Validate Final</button>
      </div>
    </div>
  `;
}

function renderVerificationReviewPanel(entry, editable = false, copy = {}) {
  const point = findPoint(entry.pointId);
  if (!point) return renderNotFound("Process");
  const title = copy.title || "Form Jawaban Employee";
  const subtitle = copy.subtitle || "Admin dapat mengoreksi jawaban dan mengisi remark verifikasi.";
  const verificationAnswers = getEmployeeVerificationAnswers(entry);

  return `
    <div class="panel verification-form-panel">
      <div class="panel-header">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <small class="panel-kicker">${escapeHtml(subtitle)}</small>
        </div>
        <div class="process-entry-header-actions">
          <div class="assessment-collapse-actions">
            <button class="assessment-mini-action" type="button" data-action="collapse-assessment-all">${icon("chevron-right")} Collapse All</button>
            <button class="assessment-mini-action" type="button" data-action="expand-assessment-all">${icon("chevron-down")} Uncollapse All</button>
          </div>
          ${renderProcessTotalBoxes(entry, "verification")}
        </div>
      </div>
      <div class="panel-body assessment-rule-stack verification-assessment-stack">
        ${point.rules.map((rule, index) => renderVerificationAssessmentRule(rule, entry.answers?.[rule.code], verificationAnswers?.[rule.code], index + 1, editable)).join("")}
      </div>
    </div>
  `;
}

function renderVerificationAssessmentRule(rule, inputAnswer = {}, verificationAnswer = inputAnswer, number = 1, editable = false) {
  const verificationTotal = getRuleAnswerTotal(rule, verificationAnswer);
  const answered = hasEmployeeAnswer(rule, verificationAnswer);

  return `
    <section class="assessment-rule-card assessment-form-card verification-rule-card verification-review-card ${answered ? "is-answered" : ""}">
      <button class="assessment-rule-head" type="button" data-action="toggle-assessment-rule" aria-expanded="true">
        <div>
          <strong>${escapeHtml(rule.code)} ${escapeHtml(rule.criteriaName)}</strong>
          <small>Nomor ${escapeHtml(number)}</small>
        </div>
        <div class="assessment-rule-meta">
          <b data-role="verification-rule-total">${escapeHtml(verificationTotal)} Point</b>
          <span class="assessment-rule-chevron">${icon("chevron-down")}</span>
        </div>
      </button>
      <div class="assessment-question-list">
        ${rule.hasSub
          ? renderVerificationSubRuleInput(rule, verificationAnswer, editable)
          : renderAssessmentOptionInput(rule, verificationAnswer, !editable, true)}
      </div>
    </section>
  `;
}

function hasRejectedInRule(rule, answer = {}) {
  if (rule.hasSub) {
    return Boolean(answer.rejected) || Object.keys(rule.subRules).some((subName) => answer.sub?.[subName]?.rejected);
  }

  return Boolean(answer.rejected);
}

function renderVerificationSubRuleInput(rule, answer = {}, editable = false) {
  return `
    <input type="hidden" name="evidence:${escapeHtml(rule.code)}" value="${escapeHtml(answer.evidence || "")}">
    <div class="assessment-subrule-stack">
      ${Object.entries(rule.subRules).map(([subName, options], index) => {
        const subAnswer = answer.sub?.[subName] || {};
        const selected = subAnswer.option || "";
        const subCode = `${rule.code}.${index + 1}`;
        const evidence = submittedEvidenceName(subCode, subAnswer.evidence);
        const remark = subAnswer.remark || "";
        return renderAssessmentQuestionSection({
          code: subCode,
          question: subName,
          info: `Pilih opsi yang sesuai untuk ${subName}.`,
          options,
          selected,
          inputName: `answer:${rule.code}:${index}`,
          evidenceName: `evidence:${rule.code}:${index}`,
          fileName: `file:${rule.code}:${index}`,
          evidence,
          remarkName: `remark:${rule.code}:${index}`,
          remark,
          locked: !editable,
          uploadReadonly: true
        });
      }).join("")}
    </div>
  `;
}

function renderEmployeeInputForm() {
  const source = findEmployeeInput(appState.selectedId);
  if (!source) return renderNotFound("Input Reward & Punishment");
  if (source.status === "Verified") return renderEmployeeInputDetail();

  const entry = clone(source);

  const employee = findEmployee(entry.employeeId);
  const period = findPeriod(entry.periodId);
  const point = findPoint(entry.pointId);
  if (!employee || !period || !point) return renderNotFound("Input Reward & Punishment");

  return `
    <form class="drawer-stack" id="employeeInputForm">
      <div class="panel">
        <div class="panel-header">
          <h2>Isi Reward & Punishment Employee</h2>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Doc No", entry.docNo],
            ["Employee", `${employee.name} / ${employee.nik}`],
            ["Division", employee.division],
            ["Position", employee.position],
            ["Point Rule", point.name],
            ["Current Total", `${getEmployeeInputTotal(entry)} Point`],
            ["Status", statusPill(entry.status)]
          ])}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Form Pengisian</h3>
        </div>
        <div class="panel-body employee-rule-stack">
          ${point.rules.map((rule) => renderEmployeeRuleInput(rule, entry.answers?.[rule.code])).join("")}
        </div>
        <div class="panel-body">
          ${field("Notes", `<textarea name="notes" placeholder="Catatan admin sebelum submit">${escapeHtml(entry.notes || "")}</textarea>`, false)}
        </div>
        <div class="panel-footer">
          <button class="btn danger" type="button" data-action="cancel">Cancel</button>
          <button class="btn neutral" type="submit" data-action="save-employee-input" data-status="Draft">${icon("save")} Save Draft</button>
          <button class="btn success" type="submit" data-action="save-employee-input" data-status="Submitted">${icon("check")} Submit</button>
        </div>
      </div>
    </form>
  `;
}

function renderEmployeeRuleInput(rule, answer = {}, locked = false) {
  const total = getRuleAnswerTotal(rule, answer);

  return `
    <div class="employee-rule-card">
      <div class="employee-rule-head">
        <div>
          <span>${escapeHtml(rule.code)}</span>
          <strong>${escapeHtml(rule.criteriaName)}</strong>
        </div>
        <b>${escapeHtml(total)} Point</b>
      </div>
      ${renderQuestionBlock(rule)}
      ${rule.hasSub ? renderEmployeeSubRuleInput(rule, answer, locked) : renderEmployeeOptionInput(rule, answer, locked)}
      <label class="employee-evidence">
        <span>Keterangan Input</span>
        <input name="evidence:${escapeHtml(rule.code)}" value="${escapeHtml(answer.evidence || "")}" placeholder="Catatan atau referensi dokumen pendukung (opsional)" ${locked ? "disabled" : ""}>
      </label>
    </div>
  `;
}

function renderEmployeeOptionInput(rule, answer = {}, locked = false) {
  const selected = answer.option || "";

  return `
    <div class="employee-answer-row">
      <span>Jawaban</span>
      <select name="answer:${escapeHtml(rule.code)}" ${locked ? "disabled" : ""}>
        ${rule.options.map((option) => `
          <option value="${escapeHtml(option.option)}" ${selected === option.option ? "selected" : ""}>
            ${escapeHtml(`${option.option} (${option.point} Point)`)}
          </option>
        `).join("")}
      </select>
    </div>
  `;
}

function renderEmployeeSubRuleInput(rule, answer = {}, locked = false) {
  return `
    <div class="employee-subrule-grid">
      ${Object.entries(rule.subRules).map(([subName, options], index) => {
        const selected = answer.sub?.[subName]?.option || "";
        return `
          <label class="employee-subrule-item">
            <span>${escapeHtml(subName)}</span>
            <select name="answer:${escapeHtml(rule.code)}:${index}" ${locked ? "disabled" : ""}>
              ${options.map((option) => `
                <option value="${escapeHtml(option.option)}" ${selected === option.option ? "selected" : ""}>
                  ${escapeHtml(`${option.option} (${option.point} Point)`)}
                </option>
              `).join("")}
            </select>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function renderEmployeeAnswerReview(entry) {
  const point = findPoint(entry.pointId);
  if (!point) return "Point rule not found.";

  return `
    <div class="employee-review-list">
      ${point.rules.map((rule) => {
        const answer = entry.answers?.[rule.code] || {};
        const rawTotal = getRuleRawAnswerTotal(rule, answer);
        return `
          <div class="employee-review-row verification-review-card">
            <div class="employee-rule-head">
              <div>
                <span>${escapeHtml(rule.code)}</span>
                <strong>${escapeHtml(rule.criteriaName)}</strong>
              </div>
              <b>${escapeHtml(rawTotal)} Point</b>
            </div>
            ${renderQuestionBlock(rule)}
            ${renderVerificationEmployeeAnswer(rule, answer)}
            ${answer.evidence ? `<div class="verification-input-note"><span>Keterangan Employee</span><strong>${escapeHtml(answer.evidence)}</strong></div>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderVerificationEmployeeAnswer(rule, answer = {}) {
  if (rule.hasSub) {
    return `
      <div class="employee-subrule-grid verification-answer-grid">
        ${Object.entries(rule.subRules).map(([subName, options]) => {
          const selected = answer.sub?.[subName]?.option || "";
          return `
            <label class="employee-subrule-item">
              <span>${escapeHtml(subName)}</span>
              <select disabled>
                ${options.map((option) => `
                  <option value="${escapeHtml(option.option)}" ${selected === option.option ? "selected" : ""}>
                    ${escapeHtml(`${option.option} (${option.point} Point)`)}
                  </option>
                `).join("")}
              </select>
            </label>
          `;
        }).join("")}
      </div>
    `;
  }

  const selected = answer.option || "";

  return `
    <div class="employee-answer-row verification-answer-row">
      <span>Jawaban Employee</span>
      <select disabled>
        ${rule.options.map((option) => `
          <option value="${escapeHtml(option.option)}" ${selected === option.option ? "selected" : ""}>
            ${escapeHtml(`${option.option} (${option.point} Point)`)}
          </option>
        `).join("")}
      </select>
    </div>
  `;
}

function formatEmployeeAnswer(rule, answer = {}) {
  if (rule.hasSub) {
    return Object.keys(rule.subRules).map((subName) => `${subName}: ${answer.sub?.[subName]?.option || "-"}`).join(" | ");
  }

  return answer.option || "-";
}

function renderRuleEditorRow(rule, index) {
  const criteriaOptions = db.criteria.map((item) => `
    <option value="${escapeHtml(item.code)}" ${item.code === rule.code ? "selected" : ""}>${escapeHtml(item.code)} - ${escapeHtml(item.name)}</option>
  `).join("");

  return `
    <div class="rules-row" data-rule-index="${index}">
      <input value="${escapeHtml(rule.code)}" readonly>
      <select data-action="select-rule-criteria" data-index="${index}">${criteriaOptions}</select>
      <input value="${rule.hasSub ? "Yes" : "No"}" readonly>
      <button class="btn rule-action" type="button" data-action="open-rule-modal" data-index="${index}">${icon("edit")} Edit Rules</button>
      <span class="table-actions">
        <button class="action-icon action-delete danger" type="button" title="Delete" aria-label="Delete rule" data-action="remove-rule-row" data-index="${index}">${icon("trash")}</button>
      </span>
    </div>
  `;
}

function renderPeriod() {
  return `<div class="page-grid">${renderPeriodListPanel()}</div>`;
}

function renderPeriodListPanel() {
  const items = filterRows(db.periods, "period", tableSearchKeys("period"));
  const page = getPaged(items, "period");

  return `
    <div class="panel">
      <div class="panel-header">
        <h2>Period</h2>
        <button class="btn primary" type="button" data-action="add" data-section="period">${icon("plus")} Add</button>
      </div>
      ${renderToolbar("period", db.periods)}
      <div class="table-wrap">
        <table class="data-table period-table">
          <thead>
            <tr>
              <th class="center">No</th>
              <th>Doc No</th>
              <th>Name</th>
              <th>Year</th>
              <th>Start Date Input</th>
              <th>Finish Date Input</th>
              <th>Status</th>
              <th>Last Update</th>
              <th class="center">Action</th>
            </tr>
          </thead>
          <tbody>
            ${page.rows.length ? page.rows.map((item, index) => `
              <tr>
                <td class="center">${page.start + index + 1}</td>
                <td>${escapeHtml(item.docNo)}</td>
                <td>${escapeHtml(item.name)}</td>
                <td>${escapeHtml(item.year)}</td>
                <td>${escapeHtml(formatDate(item.startDate))}</td>
                <td>${escapeHtml(formatDate(item.finishDate))}</td>
                <td>${statusPill(item.status)}</td>
                <td>${escapeHtml(item.lastUpdate)}</td>
                <td class="center">${rowActions("period", item.id, false)}</td>
              </tr>
            `).join("") : emptyRow(9, "No period found.")}
          </tbody>
        </table>
      </div>
      ${renderPagination(page, "period")}
    </div>
  `;
}

function renderPeriodDetail() {
  const item = findPeriod(appState.selectedId);
  if (!item) return renderNotFound("Period");

  const point = findPoint(item.pointId);

  return `
    <div class="drawer-stack">
      <div class="panel">
        <div class="panel-header">
          <h2>Detail Period</h2>
          <button class="btn primary" type="button" data-action="edit" data-section="period" data-id="${escapeHtml(item.id)}">${icon("edit")} Edit Data</button>
        </div>
        <div class="panel-body">
          ${renderDetailGrid([
            ["Doc No", item.docNo],
            ["Start Date Input", formatDate(item.startDate)],
            ["Name", item.name],
            ["Finish Date Input", formatDate(item.finishDate)],
            ["Year", item.year],
            ["Status", statusPill(item.status)],
            ["Point", point?.name || "-"],
            ["Last Edit", item.lastUpdate]
          ])}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Phase</h3>
        </div>
        <div class="panel-body">
          <div class="phase-box">
            <div class="phase-actions">
              <button class="btn ${item.phase === "input" ? "success" : "neutral"}" type="button" data-action="period-phase" data-id="${escapeHtml(item.id)}" data-phase="input">${icon("play")} Start Input</button>
              <button class="btn ${item.status === "Closed" ? "danger" : "neutral"}" type="button" data-action="period-phase" data-id="${escapeHtml(item.id)}" data-phase="closed">${icon("square")} Stop Input</button>
              <button class="btn ${item.phase === "verification" ? "success" : "neutral"}" type="button" data-action="period-phase" data-id="${escapeHtml(item.id)}" data-phase="verification">${icon("check")} Verification Phase</button>
              <button class="btn ${item.phase === "approval" ? "success" : "neutral"}" type="button" data-action="period-phase" data-id="${escapeHtml(item.id)}" data-phase="approval">${icon("check")} Approval Phase</button>
            </div>
            <div class="phase-flow">
              ${phaseStep("Input Phase", item.phase === "input", ["verification", "approval"].includes(item.phase), item.status)}
              ${phaseStep("Verification Phase", item.phase === "verification", item.phase === "approval", item.status)}
              ${phaseStep("Approval Phase", item.phase === "approval", item.status === "Approved", item.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function phaseStep(label, active, done, status) {
  const cls = active ? "active" : done ? "done" : "";
  return `
    <div class="phase-step ${cls}">
      <strong>${escapeHtml(label)}</strong>
      <small>${escapeHtml(status)}</small>
    </div>
  `;
}

function renderPeriodForm() {
  const isEdit = appState.view === "edit";
  const item = isEdit ? findPeriod(appState.selectedId) : {
    id: "",
    docNo: "Auto",
    name: "",
    year: "2026",
    pointId: db.points[0]?.id || "",
    startDate: "2026-01-01",
    finishDate: "2026-12-31",
    status: "Open",
    phase: "input"
  };

  if (!item) return renderNotFound("Period");

  return `
    <form class="panel" id="periodForm">
      <div class="panel-header">
        <h2>${isEdit ? "Edit Period" : "Add Period"}</h2>
      </div>
      <div class="panel-body form-grid">
        ${field("Doc No", `<input name="docNo" value="${escapeHtml(item.docNo)}" readonly>`, false)}
        ${field("Period Name", `<input name="name" value="${escapeHtml(item.name)}" placeholder="Reward and Punishment Tahun 2026" required>`, true)}
        ${field("Period Year", `<select name="year" required>
          ${["2026", "2025", "2024", "2023"].map((year) => `<option value="${year}" ${item.year === year ? "selected" : ""}>${year}</option>`).join("")}
        </select>`, true)}
        ${field("Point", `<select name="pointId" required>
          ${db.points.map((point) => `<option value="${escapeHtml(point.id)}" ${item.pointId === point.id ? "selected" : ""}>${escapeHtml(point.name)}</option>`).join("")}
        </select>`, true)}
        ${field("Start Date Input", `<input type="date" name="startDate" value="${escapeHtml(item.startDate)}" required>`, true)}
        ${field("Finish Date Input", `<input type="date" name="finishDate" value="${escapeHtml(item.finishDate)}" required>`, true)}
      </div>
      <div class="panel-footer">
        <button class="btn danger" type="button" data-action="cancel">Cancel</button>
        <button class="btn success" type="submit" data-action="save-period">${icon("save")} Save</button>
      </div>
    </form>
  `;
}

function renderNotFound(label) {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2>${escapeHtml(label)}</h2>
      </div>
      <div class="panel-body">Data not found.</div>
    </div>
  `;
}

function renderNoAccess(label) {
  return `
    <div class="panel">
      <div class="panel-header">
        <h2>${escapeHtml(label)}</h2>
      </div>
      <div class="panel-body">Access is not available for this role.</div>
    </div>
  `;
}

function renderDrawer() {
  const fullPageSection = ["assessment", "verification", "employeeProcess", "employeeResult"].includes(appState.section);

  if (appState.view === "list" || appState.view === "dashboard" || fullPageSection) {
    drawerHost.classList.remove("open");
    drawerHost.setAttribute("aria-hidden", "true");
    drawerHost.innerHTML = "";
    return;
  }

  const content = getDrawerContent();
  const actionLabel = titleForView(appState.view);
  const sectionLabel = titleForSection(appState.section);

  drawerHost.classList.add("open");
  drawerHost.setAttribute("aria-hidden", "false");
  drawerHost.innerHTML = `
    <button class="drawer-scrim" type="button" aria-label="Close drawer" data-action="close-drawer"></button>
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="${escapeHtml(`${actionLabel} ${sectionLabel}`)}">
      <div class="drawer-header">
        <div>
          <small>Reward & Punishment</small>
          <h2>${escapeHtml(actionLabel)} ${escapeHtml(sectionLabel)}</h2>
        </div>
        <button class="icon-button" type="button" aria-label="Close" title="Close" data-action="close-drawer">${icon("x")}</button>
      </div>
      <div class="drawer-body">
        ${content}
      </div>
    </aside>
  `;

  renderIcons(drawerHost);
}

function getDrawerContent() {
  if (appState.section === "category" && appState.view === "detail") return renderCategoryDetail();
  if (appState.section === "category" && ["add", "edit"].includes(appState.view)) return renderCategoryForm();
  if (appState.section === "criteria" && appState.view === "detail") return renderCriteriaDetail();
  if (appState.section === "criteria" && ["add", "edit"].includes(appState.view)) return renderCriteriaForm();
  if (appState.section === "point" && appState.view === "detail") return renderPointDetail();
  if (appState.section === "point" && ["add", "edit"].includes(appState.view)) return renderPointForm();
  if (appState.section === "employeeInput" && appState.view === "detail") return renderEmployeeInputDetail();
  if (appState.section === "employeeInput" && appState.view === "edit") return renderEmployeeInputForm();
  if (appState.section === "verification" && ["detail", "verify"].includes(appState.view)) return renderVerificationDetail();
  if (appState.section === "period" && appState.view === "detail") return renderPeriodDetail();
  if (appState.section === "period" && ["add", "edit"].includes(appState.view)) return renderPeriodForm();

  return renderNotFound("Data");
}

function renderModal() {
  if (!appState.modal) {
    modalHost.classList.remove("open");
    modalHost.setAttribute("aria-hidden", "true");
    modalHost.innerHTML = "";
    return;
  }

  modalHost.classList.add("open");
  modalHost.setAttribute("aria-hidden", "false");

  if (appState.modal.type === "delete") {
    modalHost.innerHTML = renderDeleteModal();
  } else if (appState.modal.type === "processEmployees") {
    modalHost.innerHTML = renderProcessEmployeesModal();
  } else if (appState.modal.type === "processImport") {
    modalHost.innerHTML = renderProcessImportModal();
  } else {
    modalHost.innerHTML = renderRulesModal();
  }

  renderIcons(modalHost);
}

function renderDeleteModal() {
  return `
    <div class="modal small" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>Delete Data</h3>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <p>Delete selected record?</p>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn danger" type="button" data-action="confirm-delete">${icon("trash")} Delete</button>
      </div>
    </div>
  `;
}

function renderRulesModal() {
  const draft = appState.pointDraft;
  const rule = draft?.rules[appState.modal.ruleIndex];
  if (!rule) return "";

  const tabs = rule.hasSub ? Object.keys(rule.subRules) : ["Default"];
  const activeTab = appState.modal.activeTab || tabs[0];
  const options = rule.hasSub ? rule.subRules[activeTab] : rule.options;
  const overallTotal = rule.hasSub ? totalSubRulePoints(rule.subRules) : totalPoints(options);

  return `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3>Rules ${escapeHtml(rule.code)} - ${escapeHtml(rule.criteriaName)}</h3>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        ${rule.hasSub ? `
          <div class="modal-tabs">
            ${tabs.map((tab) => `
              <button class="modal-tab ${tab === activeTab ? "active" : ""}" type="button" data-action="rule-tab" data-tab="${escapeHtml(tab)}">
                ${escapeHtml(tab.replace(rule.criteriaName, "").trim() || tab)}
              </button>
            `).join("")}
          </div>
        ` : ""}
        <div class="rule-total-strip">
          <div>
            <span>${rule.hasSub ? "Max Point Sub Aktif" : "Total Point"}</span>
            <strong id="activeRuleTotal">${escapeHtml(totalPoints(options))}</strong>
          </div>
          ${rule.hasSub ? `
            <div>
              <span>Max Point Keseluruhan Sub</span>
              <strong id="overallRuleTotal">${escapeHtml(overallTotal)}</strong>
            </div>
          ` : ""}
        </div>
        <div class="rule-option-head">
          <span>Option</span>
          <span>Point</span>
          <span>Action</span>
        </div>
        <div id="ruleOptions">
          ${options.map((item, index) => renderRuleOptionInput(item, index)).join("")}
        </div>
        <button class="btn ghost" type="button" data-action="add-option-row">${icon("plus")} Add Row</button>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="button" data-action="save-rule-options">${icon("save")} Save</button>
      </div>
    </div>
  `;
}

function renderProcessEmployeesModal() {
  const period = findPeriod(appState.modal.periodId) || getActiveProcessPeriod();
  const rows = getProcessRows(period);
  return `
    <form class="modal process-modal" id="processEmployeesForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Edit Karyawan</h3>
          <small class="modal-kicker">${escapeHtml(period?.name || "Process")}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <div class="process-modal-note">
          Menonaktifkan / mengaktifkan assessment status dan menambahkan karyawan baru untuk bisa dinilai.
        </div>
        <div class="process-add-employee">
          <h4>Tambah Karyawan</h4>
          <div class="process-employee-search">
            <label class="searchbox">
              <span data-icon="search"></span>
              <input name="employeeSearch" list="processEmployeeOptions" placeholder="Search by name" autocomplete="off" data-action="process-employee-search">
            </label>
            <datalist id="processEmployeeOptions">
              ${db.employees.map((employee) => `<option value="${escapeHtml(employee.name)}">${escapeHtml(`${employee.nik} - ${employee.position} / ${employee.division}`)}</option>`).join("")}
            </datalist>
            <button class="btn primary" type="button" data-action="add-process-employee">${icon("plus")} Tambah Karyawan</button>
          </div>
        </div>
        <div class="process-employee-list" id="processEmployeeList">
          <div class="process-employee-head">
            <span>Karyawan</span>
            <span>Posisi & Divisi</span>
            <span>Status Employee</span>
            <span>Assessment</span>
          </div>
          ${rows.map(renderProcessEmployeeModalRow).join("")}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="submit" data-action="save-process-employees">${icon("save")} Save Assessment Status</button>
      </div>
    </form>
  `;
}

function renderProcessEmployeeModalRow(row) {
  return `
    <div class="process-employee-row" data-employee-name="${escapeHtml(row.employeeName)}">
      <div>
        <strong>${escapeHtml(row.employeeName)}</strong>
        <small>${escapeHtml(row.nik)}</small>
      </div>
      <div>
        <strong>${escapeHtml(row.position)}</strong>
        <small>${escapeHtml(row.division)}</small>
      </div>
      <div>${statusPill(row.employeeStatus || "Active")}</div>
      <label class="process-status-toggle">
        <input type="checkbox" name="assessmentActive:${escapeHtml(row.id)}" ${row.assessmentStatus === "Active" ? "checked" : ""}>
        <span>Active</span>
      </label>
    </div>
  `;
}

function renderProcessImportModal() {
  const period = findPeriod(appState.modal.periodId) || getActiveProcessPeriod();
  const point = findPoint(period?.pointId) || db.points[0];
  const disciplineRule = point.rules.find((rule) => rule.code === "B9") || point.rules.find((rule) => rule.criteriaName.toLowerCase().includes("kedisiplinan")) || point.rules[0];

  return `
    <form class="modal process-modal" id="processImportForm" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Import Parameter</h3>
          <small class="modal-kicker">${escapeHtml(period?.name || "Process")}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Close" data-action="close-modal">${icon("x")}</button>
      </div>
      <div class="modal-body">
        <div class="process-modal-note">
          Memasukkan angka pada parameter tertentu. Saat ini template difokuskan untuk kriteria Kedisiplinan.
        </div>
        <div class="form-grid">
          ${field("Criteria", `
            <select name="criteriaCode" required>
              ${point.rules.map((rule) => `
                <option value="${escapeHtml(rule.code)}" ${rule.code === disciplineRule.code ? "selected" : ""}>${escapeHtml(`${rule.code} - ${rule.criteriaName}`)}</option>
              `).join("")}
            </select>
          `, true)}
          ${field("Parameter Value", `<input type="number" min="0" name="parameterValue" placeholder="Contoh menit keterlambatan">`, false)}
          ${field("Upload Template", `<input type="file" name="importFile" accept=".csv,.xlsx,.xls">`, false)}
        </div>
        <button class="btn ghost" type="button" data-action="download-import-template">${icon("download")} Download Template</button>
      </div>
      <div class="modal-footer">
        <button class="btn neutral" type="button" data-action="close-modal">Cancel</button>
        <button class="btn success" type="submit" data-action="save-process-import">${icon("upload")} Import</button>
      </div>
    </form>
  `;
}

function renderRuleOptionInput(item, index) {
  return `
    <div class="rule-option-row" data-option-index="${index}">
      <input name="option[]" value="${escapeHtml(item.option)}" placeholder="Nama point">
      <input type="number" name="point[]" value="${escapeHtml(item.point)}" placeholder="Point">
      <button class="action-icon action-delete danger" type="button" title="Delete" aria-label="Delete option" data-action="remove-option-row">${icon("trash")}</button>
    </div>
  `;
}

document.addEventListener("pointerdown", (event) => {
  const option = event.target.closest(".assessment-option");
  const radio = option?.querySelector("input[data-action='assessment-answer']");
  if (!radio || radio.disabled) return;
  radio.dataset.wasChecked = radio.checked ? "true" : "false";
});

document.addEventListener("click", (event) => {
  const assessmentOption = event.target.closest(".assessment-option");
  const assessmentRadio = assessmentOption?.querySelector("input[data-action='assessment-answer']");
  if (assessmentRadio && !assessmentRadio.disabled && assessmentRadio.dataset.wasChecked === "true") {
    event.preventDefault();
    assessmentRadio.checked = false;
    assessmentRadio.dataset.wasChecked = "false";
    updateAssessmentCardAnswered(assessmentRadio);
    return;
  }

  if (!event.target.closest('[data-action="toggle-question-info"], .question-info')) {
    closeQuestionInfoPopups();
  }

  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  if (action === "go-section") {
    if (target.dataset.section === "verification" && !canViewProcess()) {
      showToast("Process tidak tersedia untuk role ini.");
      return;
    }
    setSection(target.dataset.section);
  }

  if (action === "add") {
    setSection(target.dataset.section, "add");
  }

  if (action === "detail") {
    setSection(target.dataset.section, "detail", target.dataset.id);
  }

  if (action === "edit") {
    if (target.dataset.section === "verification" && !canEditProcess()) {
      showToast("Edit Process tidak tersedia untuk role ini.");
      return;
    }
    setSection(target.dataset.section, "edit", target.dataset.id);
  }

  if (action === "verify") {
    if (!canVerifyProcess()) {
      showToast("Verification Process tidak tersedia untuk role ini.");
      return;
    }
    setSection("verification", "verify", target.dataset.id);
  }

  if (action === "process-tab") {
    appState.processTab = target.dataset.tab || "input";
    render();
  }

  if (action === "process-back") {
    const periodId = target.dataset.periodId || null;
    if (appState.section === "employeeProcess") {
      setSection("employeeProcess", "list");
    } else if (appState.section === "employeeResult") {
      setSection("employeeResult", "period", periodId);
    } else {
      backToProcessList(periodId);
    }
  }

  if (action === "open-assessment-period") {
    setSection("assessment", "period", target.dataset.id);
  }

  if (action === "open-verification-period") {
    setSection("verification", "period", target.dataset.id);
  }

  if (action === "open-employee-process-period") {
    const period = findPeriod(target.dataset.id);
    if (!isProcessOpenPeriod(period)) {
      showToast("Periode ini belum dibuka untuk input employee.");
      return;
    }
    const entry = prepareEmployeeProcessInput(target.dataset.id);
    setSection("employeeProcess", "form", entry?.id || null);
  }

  if (action === "open-employee-result-period") {
    setSection("employeeResult", "period", target.dataset.id);
  }

  if (action === "view-assessment-entry") {
    setSection("assessment", "form", target.dataset.id);
  }

  if (action === "view-employee-process-entry") {
    setSection("employeeProcess", "form", target.dataset.id);
  }

  if (action === "view-employee-result-entry") {
    setSection("employeeResult", "form", target.dataset.id);
  }

  if (action === "cbt-question") {
    appState.myRewardQuestion = Number(target.dataset.index || 0);
    render();
  }

  if (action === "cbt-prev" || action === "cbt-next") {
    const entry = getMyRewardCbtEntry();
    const questions = entry ? getCbtQuestionItems(entry) : [];
    const step = action === "cbt-next" ? 1 : -1;
    appState.myRewardQuestion = clampCbtIndex(appState.myRewardQuestion + step, questions.length);
    render();
  }

  if (action === "cancel") {
    setSection(appState.section, "list");
  }

  if (action === "close-drawer") {
    setSection(appState.section, "list");
  }

  if (action === "page") {
    appState.page[target.dataset.section] = Number(target.dataset.page);
    render();
  }

  if (action === "delete") {
    appState.pendingDelete = { section: target.dataset.section, id: target.dataset.id };
    appState.modal = { type: "delete" };
    renderModal();
  }

  if (action === "confirm-delete") {
    deletePendingRecord();
  }

  if (action === "close-modal") {
    appState.modal = null;
    renderModal();
  }

  if (action === "add-sub-row") {
    addSubCriteriaRow();
  }

  if (action === "remove-sub-row") {
    target.closest(".dynamic-row")?.remove();
    refreshSubRowNumbers();
  }

  if (action === "add-rule-row") {
    appState.pointDraft.rules.push(makeRuleForCriteria(db.criteria[0].code));
    render();
  }

  if (action === "remove-rule-row") {
    appState.pointDraft.rules.splice(Number(target.dataset.index), 1);
    render();
  }

  if (action === "open-rule-modal") {
    const index = Number(target.dataset.index);
    const rule = appState.pointDraft.rules[index];
    const firstTab = rule.hasSub ? Object.keys(rule.subRules)[0] : "Default";
    appState.modal = { type: "rules", ruleIndex: index, activeTab: firstTab };
    renderModal();
  }

  if (action === "rule-tab") {
    persistVisibleRuleOptions();
    appState.modal.activeTab = target.dataset.tab;
    renderModal();
  }

  if (action === "add-option-row") {
    addOptionRow();
  }

  if (action === "remove-option-row") {
    target.closest(".rule-option-row")?.remove();
    updateRuleModalTotals();
  }

  if (action === "save-rule-options") {
    saveRuleOptions();
  }

  if (action === "toggle-accordion") {
    target.closest(".accordion-item")?.classList.toggle("open");
  }

  if (action === "toggle-question-info") {
    const card = target.closest(".question-card, .assessment-question-section, .cbt-question-body");
    const wasOpen = card?.classList.contains("open") || false;
    closeQuestionInfoPopups(card);
    const isOpen = wasOpen ? false : card?.classList.toggle("open") || false;
    if (!isOpen) card?.classList.remove("open");
    target.setAttribute("aria-expanded", String(isOpen));
  }

  if (action === "toggle-assessment-rule") {
    const card = target.closest(".assessment-rule-card");
    const isCollapsed = card?.classList.toggle("is-collapsed") || false;
    target.setAttribute("aria-expanded", String(!isCollapsed));
  }

  if (action === "collapse-assessment-all" || action === "expand-assessment-all") {
    const shouldCollapse = action === "collapse-assessment-all";
    document.querySelectorAll(".assessment-rule-card").forEach((card) => {
      card.classList.toggle("is-collapsed", shouldCollapse);
      card.querySelector(".assessment-rule-head")?.setAttribute("aria-expanded", String(!shouldCollapse));
    });
  }

  if (action === "assessment-upload-cancel") {
    event.preventDefault();
    event.stopPropagation();
    clearAssessmentUpload(target.closest(".assessment-upload"), true);
  }

  if (action === "select-related-division") {
    const picker = target.closest(".related-employee-picker");
    const division = target.dataset.division || "";
    picker?.querySelectorAll(`input[name="${CSS.escape(target.dataset.relatedName || "")}"]`).forEach((input) => {
      input.checked = input.dataset.division === division || input.checked;
    });
  }

  if (action === "period-phase") {
    updatePeriodPhase(target.dataset.id, target.dataset.phase);
  }

  if (action === "process-tool") {
    runProcessTool(target.dataset.tool);
  }

  if (action === "download-import-template") {
    downloadProcessImportTemplate();
  }

  if (action === "add-process-employee") {
    addProcessEmployeeFromModal();
  }

  if (action === "approve-result-step") {
    approveResultStep(target.dataset.periodId, target.dataset.stepId);
  }

  if (action === "select-all-filtered") {
    selectAllFilteredRows(target.dataset.section);
  }

  if (action === "clear-selection") {
    clearSelection(target.dataset.section);
    render();
  }

  if (action === "bulk-update-status") {
    bulkUpdateStatus(target.dataset.section, target.dataset.status);
  }
});

document.addEventListener("submit", (event) => {
  const submitter = event.submitter;
  if (!submitter?.dataset.action) return;

  event.preventDefault();

  if (submitter.dataset.action === "save-criteria") {
    saveCriteria();
  }

  if (submitter.dataset.action === "save-category") {
    saveCategory();
  }

  if (submitter.dataset.action === "save-point") {
    savePoint();
  }

  if (submitter.dataset.action === "save-period") {
    savePeriod();
  }

  if (submitter.dataset.action === "save-employee-input") {
    saveEmployeeInput(submitter.dataset.status || "Draft");
  }

  if (submitter.dataset.action === "save-assessment") {
    saveAssessment(submitter.dataset.status || "Draft");
  }

  if (submitter.dataset.action === "save-verification") {
    saveVerificationDecision();
  }

  if (submitter.dataset.action === "save-process-employees") {
    saveProcessEmployees();
  }

  if (submitter.dataset.action === "save-process-import") {
    saveProcessImport();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.closest("#ruleOptions")) {
    updateRuleModalTotals();
  }

  const target = event.target.closest("[data-action]");
  if (!target) return;

  if (target.dataset.action === "search") {
    const section = target.dataset.section;
    appState.search[section] = target.value;
    appState.page[section] = 1;
    clearSelection(section);
    appState.focusSearch = section;
    render();
  }

  if (target.dataset.action === "process-employee-search") {
    filterProcessEmployeeRows(target.value);
  }
});

document.addEventListener("change", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  if (target.dataset.action === "per-page") {
    const section = target.dataset.section;
    appState.perPage[section] = Number(target.value);
    appState.page[section] = 1;
    render();
  }

  if (target.dataset.action === "table-filter") {
    const section = target.dataset.section;
    appState.filters[section][target.dataset.filter] = target.value;
    appState.page[section] = 1;
    clearSelection(section);
    render();
  }

  if (target.dataset.action === "dashboard-period") {
    appState.dashboardPeriodId = target.value;
    render();
  }

  if (target.dataset.action === "dashboard-criteria") {
    appState.dashboardCriteriaCode = target.value;
    render();
  }

  if (target.dataset.action === "select-row") {
    toggleSelection(target.dataset.section, target.dataset.id, target.checked);
    render();
  }

  if (target.dataset.action === "select-page") {
    const ids = target.dataset.ids ? target.dataset.ids.split(",").filter(Boolean) : [];
    setSelectionForIds(target.dataset.section, ids, target.checked);
    render();
  }

  if (target.dataset.action === "toggle-reject-note") {
    const strip = target.closest(".verification-admin-strip");
    const card = target.closest(".verification-review-card");
    strip?.classList.toggle("is-rejected", target.checked);
    strip?.querySelector(".verify-note-wrap")?.classList.toggle("show", target.checked);
    updateVerificationRuleReview(card);
  }

  if (target.dataset.action === "assessment-answer") {
    updateAssessmentCardAnswered(target);
    updateVerificationRuleReview(target.closest(".verification-review-card"));
  }

  if (target.dataset.action === "assessment-upload") {
    const fileName = target.files?.[0]?.name || "";
    const upload = target.closest(".assessment-upload");
    if (fileName) {
      const label = upload?.querySelector(".assessment-upload-label");
      if (label) label.textContent = fileName;
      const hidden = upload?.querySelector(".assessment-upload-hidden");
      if (hidden) hidden.value = fileName;
      const checkbox = upload?.querySelector("input[type='checkbox']");
      if (checkbox) checkbox.checked = true;
      setAssessmentUploadActive(upload, true);
    }
  }

  if (target.dataset.action === "assessment-upload-toggle") {
    const upload = target.closest(".assessment-upload");

    if (!target.checked) {
      clearAssessmentUpload(upload, false);
    } else {
      setAssessmentUploadActive(upload, true);
    }
  }

  if (target.dataset.action === "toggle-subcriteria") {
    document.getElementById("subCriteriaField").style.display = target.checked ? "" : "none";
  }

  if (target.dataset.action === "select-rule-criteria") {
    appState.pointDraft.rules[Number(target.dataset.index)] = makeRuleForCriteria(target.value);
    render();
  }
});

document.querySelectorAll("[data-section]").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.section === "verification" && !canViewProcess()) {
      showToast("Process tidak tersedia untuk role ini.");
      return;
    }

    if (item.dataset.section === "dashboard") {
      setSection("dashboard", "dashboard");
    } else {
      setSection(item.dataset.section);
    }
  });
});

document.querySelectorAll("[data-group]").forEach((item) => {
  item.addEventListener("click", () => {
    const group = item.dataset.group;
    appState.sidebarGroups[group] = appState.sidebarGroups[group] === false;
    syncSidebarDropdowns();
  });
});

backButton.addEventListener("click", () => {
  if (appState.section === "assessment" && appState.view === "form") {
    const entry = findEmployeeInput(appState.selectedId);
    setSection("assessment", "period", entry?.periodId || null);
    return;
  }

  if (appState.section === "employeeProcess" && appState.view === "form") {
    setSection("employeeProcess", "list");
    return;
  }

  if (appState.section === "employeeResult" && appState.view === "form") {
    const entry = findEmployeeInput(appState.selectedId);
    setSection("employeeResult", "period", entry?.periodId || null);
    return;
  }

  if (appState.section === "verification" && ["detail", "edit", "verify"].includes(appState.view)) {
    backToProcessList();
    return;
  }

  if (appState.section === "employeeProcess" && appState.view === "form") {
    setSection("employeeProcess", "list");
    return;
  }

  if (appState.section === "employeeResult" && appState.view === "form") {
    const entry = findEmployeeInput(appState.selectedId);
    setSection("employeeResult", "period", entry?.periodId || null);
    return;
  }

  if (appState.view !== "list" && appState.view !== "dashboard") {
    setSection(appState.section, "list");
    return;
  }

  setSection("dashboard", "dashboard");
});

modalHost.addEventListener("click", (event) => {
  if (event.target === modalHost) {
    appState.modal = null;
    renderModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (appState.modal) {
    appState.modal = null;
    renderModal();
    return;
  }

  if (appState.section === "verification" && ["detail", "edit", "verify"].includes(appState.view)) {
    backToProcessList();
    return;
  }

  if (appState.view !== "list" && appState.view !== "dashboard") {
    setSection(appState.section, "list");
  }
});

function addSubCriteriaRow() {
  const container = document.getElementById("subCriteriaRows");
  const button = container.querySelector('[data-action="add-sub-row"]');
  const index = container.querySelectorAll(".dynamic-row").length;
  button.insertAdjacentHTML("beforebegin", subCriteriaInput("", index));
  renderIcons(container);
}

function refreshSubRowNumbers() {
  document.querySelectorAll("#subCriteriaRows .dynamic-row strong").forEach((node, index) => {
    node.textContent = index + 1;
  });
}

function addOptionRow() {
  const container = document.getElementById("ruleOptions");
  const index = container.querySelectorAll(".rule-option-row").length;
  container.insertAdjacentHTML("beforeend", renderRuleOptionInput({ option: "", point: 0 }, index));
  renderIcons(container);
  updateRuleModalTotals();
}

function saveRuleOptions() {
  persistVisibleRuleOptions();
  appState.modal = null;
  showToast("Rules saved.");
  render();
}

function persistVisibleRuleOptions() {
  if (!appState.modal || appState.modal.type !== "rules") return;

  const draft = appState.pointDraft;
  const rule = draft?.rules[appState.modal.ruleIndex];
  if (!rule) return;

  const options = getVisibleRuleOptions();

  if (rule.hasSub) {
    rule.subRules[appState.modal.activeTab] = options;
  } else {
    rule.options = options;
  }
}

function getVisibleRuleOptions() {
  return Array.from(document.querySelectorAll(".rule-option-row")).map((row) => ({
    option: row.querySelector('[name="option[]"]').value.trim(),
    point: Number(row.querySelector('[name="point[]"]').value || 0)
  })).filter((item) => item.option);
}

function updateRuleModalTotals() {
  if (!appState.modal || appState.modal.type !== "rules") return;

  const draft = appState.pointDraft;
  const rule = draft?.rules[appState.modal.ruleIndex];
  if (!rule) return;

  const visibleOptions = getVisibleRuleOptions();
  const activeTotal = totalPoints(visibleOptions);
  const activeTotalNode = document.getElementById("activeRuleTotal");
  if (activeTotalNode) activeTotalNode.textContent = activeTotal;

  const overallTotalNode = document.getElementById("overallRuleTotal");
  if (overallTotalNode && rule.hasSub) {
    const nextSubRules = { ...rule.subRules, [appState.modal.activeTab]: visibleOptions };
    overallTotalNode.textContent = totalSubRulePoints(nextSubRules);
  }
}

function saveCategory() {
  const form = document.getElementById("categoryForm");
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const isEdit = appState.view === "edit";
  const previous = isEdit ? findCategory(appState.selectedId) : null;
  const name = String(formData.get("name") || "").trim();
  const duplicate = getCategoryRows().some((item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== previous?.id && item.name !== previous?.name);

  if (duplicate) {
    showToast("Category already exists.");
    return;
  }

  if (isEdit && previous) {
    const oldName = previous.name;
    previous.id = name;
    previous.name = name;
    previous.status = formData.get("status") || "Active";
    previous.lastUpdate = todayLabel();
    db.criteria.forEach((criteria) => {
      if (criteria.category === oldName) criteria.category = name;
    });
  } else {
    db.categories.push({
      id: name,
      name,
      status: formData.get("status") || "Active",
      lastUpdate: todayLabel()
    });
  }

  showToast("Category saved.");
  setSection("category", "list");
}

function saveCriteria() {
  const form = document.getElementById("criteriaForm");
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const previous = appState.view === "edit" ? findCriteria(appState.selectedId) : null;
  const hasSub = form.querySelector('[name="hasSub"]').checked;
  const subCriteria = hasSub
    ? Array.from(form.querySelectorAll('[name="subCriteria[]"]')).map((input) => input.value.trim()).filter(Boolean)
    : [];

  const payload = {
    id: formData.get("code").trim(),
    period: previous?.period || "2026",
    category: formData.get("category"),
    code: formData.get("code").trim(),
    name: formData.get("name").trim(),
    hasSub,
    status: formData.get("status") || "Active",
    lastUpdate: todayLabel(),
    description: formData.get("description").trim(),
    subCriteria
  };

  if (appState.view === "edit") {
    const index = db.criteria.findIndex((item) => item.id === appState.selectedId);
    db.criteria[index] = payload;
  } else {
    if (db.criteria.some((item) => item.id === payload.id)) {
      showToast("Criteria Code already exists.");
      return;
    }
    db.criteria.push(payload);
  }

  showToast("Criteria saved.");
  setSection("criteria", "list");
}

function savePoint() {
  const form = document.getElementById("pointForm");
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const payload = {
    ...appState.pointDraft,
    id: appState.view === "edit" ? appState.selectedId : `PTS-${Date.now()}`,
    docNo: appState.view === "edit" ? appState.pointDraft.docNo : generatePointDocNo(),
    period: appState.pointDraft.period || "2026",
    name: formData.get("name").trim(),
    description: formData.get("description").trim(),
    lastUpdate: todayLabel()
  };

  if (appState.view === "edit") {
    const index = db.points.findIndex((item) => item.id === appState.selectedId);
    db.points[index] = payload;
  } else {
    db.points.push(payload);
  }

  showToast("Point saved.");
  setSection("point", "list");
}

function savePeriod() {
  const form = document.getElementById("periodForm");
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const isEdit = appState.view === "edit";
  const previous = isEdit ? findPeriod(appState.selectedId) : {};
  const year = formData.get("year");
  const payload = {
    id: isEdit ? appState.selectedId : `RNP-${year}-${Date.now()}`,
    docNo: isEdit ? previous.docNo : generatePeriodDocNo(year),
    name: formData.get("name").trim(),
    year,
    pointId: formData.get("pointId"),
    startDate: formData.get("startDate"),
    finishDate: formData.get("finishDate"),
    status: previous.status || "Open",
    phase: previous.phase || "input",
    lastUpdate: todayLabel()
  };

  if (isEdit) {
    const index = db.periods.findIndex((item) => item.id === appState.selectedId);
    db.periods[index] = payload;
  } else {
    db.periods.push(payload);
  }

  showToast("Period saved.");
  setSection("period", "list");
}

function saveEmployeeInput(status) {
  const form = document.getElementById("employeeInputForm");
  if (!form.reportValidity()) return;

  const entry = findEmployeeInput(appState.selectedId);
  const point = entry ? findPoint(entry.pointId) : null;
  if (!entry || !point) return;
  if (entry.status === "Verified") {
    showToast("Verified input cannot be edited.");
    if (appState.section === "verification") {
      setSection("verification", "detail", entry.id);
    } else if (appState.section === "employeeProcess") {
      setSection("employeeProcess", "list");
    } else {
      setSection("employeeInput", "detail", entry.id);
    }
    return;
  }

  const formData = new FormData(form);
  entry.answers = collectEmployeeAnswers(formData, point);
  delete entry.verificationAnswers;
  entry.employeeStarted = true;
  entry.notes = String(formData.get("notes") || "").trim();
  entry.status = status;
  if (status === "Submitted") entry.submittedAt = todayLabel();
  entry.lastUpdate = todayLabel();

  showToast(status === "Submitted" ? "Submitted to Process." : "Reward & Punishment draft saved.");
  if (appState.section === "verification") {
    setSection("verification", "period", entry.periodId);
  } else if (appState.section === "employeeProcess") {
    setSection("employeeProcess", "list");
  } else {
    setSection("employeeInput", "list");
  }
}

function saveAssessment(status) {
  const form = document.getElementById("assessmentForm");
  if (!form.reportValidity()) return;

  const row = getCurrentEmployeeInput();
  const entry = row ? findEmployeeInput(row.id) : null;
  const point = entry ? findPoint(entry.pointId) : null;
  if (!entry || !point) return;

  if (["Submitted", "Verified"].includes(entry.status)) {
    showToast("Assessment sudah dikirim.");
    setSection("assessment", "form", entry.periodId);
    return;
  }

  const formData = new FormData(form);
  entry.answers = collectEmployeeAnswers(formData, point);
  delete entry.verificationAnswers;
  entry.notes = String(formData.get("notes") || "").trim();
  entry.status = status;
  if (status === "Submitted") entry.submittedAt = todayLabel();
  entry.lastUpdate = todayLabel();

  showToast(status === "Submitted" ? "Assessment submitted." : "Assessment draft saved.");
  setSection("assessment", "form", entry.periodId);
}

function collectEmployeeAnswers(formData, point) {
  const answers = {};

  point.rules.forEach((rule) => {
    const evidence = collectEvidenceValue(formData, `evidence:${rule.code}`, `file:${rule.code}`);

    if (rule.hasSub) {
      const sub = {};
      Object.keys(rule.subRules).forEach((subName, index) => {
        const subEvidence = collectEvidenceValue(formData, `evidence:${rule.code}:${index}`, `file:${rule.code}:${index}`);
        const relatedEmployeeIds = collectRelatedEmployeeIds(formData, `related:${rule.code}:${index}`, rule.code);
        sub[subName] = {
          option: String(formData.get(`answer:${rule.code}:${index}`) || ""),
          evidence: subEvidence,
          remark: String(formData.get(`remark:${rule.code}:${index}`) || "").trim(),
          relatedEmployeeIds,
          relatedEmployees: relatedEmployeeIds.map(formatEmployeeLabel).filter(Boolean),
          contribution: String(formData.get(`contribution:${rule.code}:${index}`) || "").trim()
        };
      });
      const evidenceSummary = Object.entries(sub)
        .filter(([, item]) => item.evidence)
        .map(([subName, item]) => `${subName}: ${item.evidence}`)
        .join(" | ");
      answers[rule.code] = { sub, evidence: evidenceSummary || evidence };
      return;
    }

    const relatedEmployeeIds = collectRelatedEmployeeIds(formData, `related:${rule.code}`, rule.code);
    answers[rule.code] = {
      option: String(formData.get(`answer:${rule.code}`) || ""),
      evidence,
      remark: String(formData.get(`remark:${rule.code}`) || "").trim(),
      relatedEmployeeIds,
      relatedEmployees: relatedEmployeeIds.map(formatEmployeeLabel).filter(Boolean),
      contribution: String(formData.get(`contribution:${rule.code}`) || "").trim()
    };
  });

  return answers;
}

function collectRelatedEmployeeIds(formData, relatedName, ruleCode) {
  if (!isCertificationCode(ruleCode)) return [];
  const selected = formData.getAll(relatedName).map((value) => String(value || "").trim()).filter(Boolean);
  const currentEmployeeId = getCurrentInputEmployeeId();
  if (currentEmployeeId && !selected.includes(currentEmployeeId)) selected.unshift(currentEmployeeId);
  return [...new Set(selected)];
}

function formatEmployeeLabel(employeeId) {
  const employee = findEmployee(employeeId);
  return employee ? `${employee.name} / ${employee.nik}` : "";
}

function collectEvidenceValue(formData, evidenceName, fileName) {
  const file = formData.get(fileName);
  const uploadedName = file && typeof file.name === "string" ? file.name.trim() : "";
  return uploadedName || String(formData.get(evidenceName) || "").trim();
}

function saveVerificationDecision() {
  const form = document.getElementById("verificationForm");
  if (!form.reportValidity()) return;

  const entry = findEmployeeInput(appState.selectedId);
  const point = entry ? findPoint(entry.pointId) : null;
  if (!entry || !point) return;

  const formData = new FormData(form);
  entry.verificationAnswers = clone(entry.verificationAnswers || entry.answers || {});

  point.rules.forEach((rule) => {
    const answer = entry.verificationAnswers?.[rule.code] || clone(entry.answers?.[rule.code] || {});
    if (rule.hasSub) {
      answer.rejected = false;
      answer.adminNote = "";
      answer.sub = answer.sub || {};
      Object.keys(rule.subRules).forEach((subName, index) => {
        const subAnswer = answer.sub[subName] || {};
        subAnswer.option = String(formData.get(`answer:${rule.code}:${index}`) || subAnswer.option || "");
        subAnswer.remark = String(formData.get(`remark:${rule.code}:${index}`) || subAnswer.remark || "").trim();
        subAnswer.rejected = false;
        subAnswer.adminNote = "";
        answer.sub[subName] = subAnswer;
      });
      entry.verificationAnswers[rule.code] = answer;
      return;
    }

    answer.option = String(formData.get(`answer:${rule.code}`) || answer.option || "");
    answer.remark = String(formData.get(`remark:${rule.code}`) || answer.remark || "").trim();
    answer.rejected = false;
    answer.adminNote = "";
    entry.verificationAnswers[rule.code] = answer;
  });

  entry.status = "Verified";
  entry.verifier = String(formData.get("verifier") || "").trim();
  entry.notes = String(formData.get("notes") || "").trim();
  entry.lastUpdate = todayLabel();

  showToast("Reward validation finalized.");
  setSection("verification", "period", entry.periodId);
}

function runProcessTool(tool) {
  const periodId = getActiveProcessPeriodId();

  if (tool === "edit-karyawan") {
    appState.modal = { type: "processEmployees", periodId };
    renderModal();
    return;
  }

  if (tool === "sync") {
    syncProcessData(periodId);
    return;
  }

  if (tool === "import") {
    appState.modal = { type: "processImport", periodId };
    renderModal();
    return;
  }

  if (tool === "export") {
    exportProcessTable(periodId);
  }
}

function saveProcessEmployees() {
  const form = document.getElementById("processEmployeesForm");
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const period = findPeriod(appState.modal?.periodId) || getActiveProcessPeriod();
  if (!period) return;

  const rows = getProcessRows(period)
    .map((row) => findEmployeeInput(row.id))
    .filter(Boolean);
  rows.forEach((entry) => {
    entry.assessmentActive = formData.get(`assessmentActive:${entry.id}`) === "on";
    entry.lastUpdate = todayLabel();
  });

  period.lastUpdate = todayLabel();
  appState.modal = null;
  showToast("Assessment status karyawan updated.");
  render();
}

function addProcessEmployeeFromModal() {
  const form = document.getElementById("processEmployeesForm");
  if (!form) return;

  const formData = new FormData(form);
  const period = findPeriod(appState.modal?.periodId) || getActiveProcessPeriod();
  if (!period) return;

  const query = String(formData.get("employeeSearch") || "").trim().toLowerCase();
  if (!query) {
    showToast("Cari nama karyawan terlebih dahulu.");
    return;
  }

  const employee = db.employees.find((item) => item.name.toLowerCase() === query);
  if (!employee) {
    showToast("Pilih karyawan dari hasil search by name.");
    return;
  }

  const alreadyAdded = db.employeeInputs.some((entry) => entry.periodId === period.id && entry.employeeId === employee.id);
  if (alreadyAdded) {
    showToast("Karyawan sudah ada di periode ini.");
    return;
  }

  const entry = createProcessEmployeeInput(employee, period);
  db.employeeInputs.push(entry);
  period.lastUpdate = todayLabel();

  const input = form.elements.employeeSearch;
  if (input) input.value = "";

  const list = document.getElementById("processEmployeeList");
  if (list) {
    const row = getInputRows().find((item) => item.id === entry.id);
    list.insertAdjacentHTML("beforeend", renderProcessEmployeeModalRow(row));
    filterProcessEmployeeRows("");
  }

  showToast("Karyawan baru ditambahkan.");
}

function createProcessEmployeeInput(employee, period) {
  const next = db.employeeInputs.length + 1;
  return {
    id: `RNP-IN-${String(next).padStart(3, "0")}`,
    docNo: `${String(next).padStart(3, "0")}/RNP-IN/07/${period.year}`,
    employeeId: employee.id,
    periodId: period.id,
    pointId: period.pointId,
    status: "Draft",
    assessmentActive: true,
    verifier: "HC Reward Team",
    notes: "Karyawan baru ditambahkan untuk proses penilaian.",
    submittedAt: "-",
    lastUpdate: todayLabel(),
    answers: makeEmptyEmployeeAnswers(period.pointId)
  };
}

function filterProcessEmployeeRows(query = "") {
  const keyword = String(query || "").trim().toLowerCase();
  document.querySelectorAll("#processEmployeeList .process-employee-row").forEach((row) => {
    const name = String(row.dataset.employeeName || "").toLowerCase();
    row.hidden = Boolean(keyword) && !name.includes(keyword);
  });
}

function syncProcessData(periodId) {
  const period = findPeriod(periodId) || getActiveProcessPeriod();
  if (!period) return;

  getProcessRows(period)
    .map((row) => findEmployeeInput(row.id))
    .filter(Boolean)
    .forEach((entry) => {
      entry.lastUpdate = todayLabel();
    });

  period.lastUpdate = todayLabel();
  showToast("Posisi, Divisi, riwayat mutasi, masa kerja, pendidikan, BA360, dan KPI sudah disinkronisasi.");
  render();
}

function saveProcessImport() {
  const form = document.getElementById("processImportForm");
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const period = findPeriod(appState.modal?.periodId) || getActiveProcessPeriod();
  const point = findPoint(period?.pointId);
  const criteriaCode = String(formData.get("criteriaCode") || "");
  const rule = point?.rules.find((item) => item.code === criteriaCode);
  if (!period || !rule) return;

  const file = formData.get("importFile");
  const fileName = file && typeof file.name === "string" ? file.name.trim() : "";
  const parameterValue = String(formData.get("parameterValue") || "").trim();
  let affected = 0;

  if (criteriaCode === "B9" && parameterValue !== "") {
    const option = getDisciplineOption(rule, Number(parameterValue));
    db.employeeInputs
      .filter((entry) => entry.periodId === period.id)
      .forEach((entry) => {
        entry.answers[rule.code] = entry.answers[rule.code] || {};
        entry.answers[rule.code].option = option;
        entry.answers[rule.code].remark = `Import Kedisiplinan: ${parameterValue} menit.`;
        entry.lastUpdate = todayLabel();
        affected += 1;
      });
  }

  period.lastUpdate = todayLabel();
  appState.modal = null;
  showToast(affected ? `Import ${rule.criteriaName} applied to ${affected} data.` : `Template ${fileName || rule.criteriaName} uploaded.`);
  render();
}

function approveResultStep(periodId, stepId) {
  const period = findPeriod(periodId);
  const approvals = ensurePeriodApprovals(period);
  const step = approvals.find((item) => item.id === stepId);
  if (!period || !step) return;

  step.status = "Approved";
  step.date = todayLabel();
  period.phase = "approval";
  period.status = approvals.every((item) => item.status === "Approved") ? "Approved" : "Outstanding";
  period.lastUpdate = todayLabel();

  showToast(`${step.role} approved.`);
  render();
}

function getDisciplineOption(rule, minutes) {
  const options = rule.options || [];
  if (minutes <= 60) return options[0]?.option || "";
  if (minutes <= 120) return options[1]?.option || options[0]?.option || "";
  if (minutes <= 240) return options[2]?.option || options.at(-1)?.option || "";
  return options[3]?.option || options.at(-1)?.option || "";
}

function downloadProcessImportTemplate() {
  const period = findPeriod(appState.modal?.periodId) || getActiveProcessPeriod();
  const rows = getProcessRows(period);
  const data = [
    ["NIK", "Name", "Criteria Code", "Criteria Name", "Parameter Value"],
    ...rows.map((row) => [row.nik, row.employeeName, "B9", "Kedisiplinan", ""])
  ];
  downloadCsv(`template-import-kedisiplinan-${period?.year || "process"}.csv`, data);
}

function exportProcessTable(periodId) {
  const period = findPeriod(periodId) || getActiveProcessPeriod();
  const rows = getProcessRows(period);
  const data = [
    ["No", "Name", "NIK", "Position", "Division", "Total Point (Input)", "Total Point (Verification)", "Assessment Status", "Verification Status"],
    ...rows.map((row, index) => [
      index + 1,
      row.employeeName,
      row.nik,
      row.position,
      row.division,
      row.rawTotalPoint,
      row.totalPoint,
      row.assessmentStatus,
      row.verificationStatus
    ])
  ];

  downloadCsv(`process-${period?.year || "all"}.csv`, data);
  showToast("Process table exported.");
}

function downloadCsv(fileName, rows) {
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function generatePointDocNo() {
  const next = String(db.points.length + 1).padStart(3, "0");
  return `${next}/PTS/07/2026`;
}

function generatePeriodDocNo(year) {
  const next = String(db.periods.length + 1).padStart(3, "0");
  return `${next}RNP01${year}`;
}

function deletePendingRecord() {
  const pending = appState.pendingDelete;
  if (!pending) return;

  const map = { category: "categories", criteria: "criteria", point: "points", period: "periods" };
  const collection = db[map[pending.section]];
  const index = collection.findIndex((item) => item.id === pending.id);

  if (index >= 0) {
    const removed = collection[index];
    collection.splice(index, 1);
    if (pending.section === "category") {
      db.criteria = db.criteria.filter((item) => item.category !== removed.name);
    }
  }

  appState.modal = null;
  appState.pendingDelete = null;
  showToast("Record deleted.");
  render();
}

function updatePeriodPhase(id, phase) {
  const period = findPeriod(id);
  if (!period) return;

  if (phase === "closed") {
    period.status = "Closed";
    period.phase = "verification";
  } else if (phase === "input") {
    period.status = "Open";
    period.phase = "input";
  } else if (phase === "verification") {
    period.status = "Closed";
    period.phase = "verification";
  } else if (phase === "approval") {
    period.status = "Approved";
    period.phase = "approval";
  }

  period.lastUpdate = todayLabel();
  showToast("Period phase updated.");
  render();
}

function toggleSelection(section, id, checked) {
  const current = new Set(selectedIds(section));
  if (checked) current.add(id);
  else current.delete(id);

  appState.selection[section] = [...current];
}

function setSelectionForIds(section, ids, checked) {
  const current = new Set(selectedIds(section));
  ids.forEach((id) => {
    if (checked) current.add(id);
    else current.delete(id);
  });

  appState.selection[section] = [...current];
}

function clearSelection(section) {
  if (!appState.selection[section]) return;
  appState.selection[section] = [];
}

function getFilteredRowsForSection(section) {
  const source = getFilterSourceRows(section);
  return filterRows(source, section, tableSearchKeys(section));
}

function selectAllFilteredRows(section) {
  const ids = getFilteredRowsForSection(section).map((row) => row.id);
  appState.selection[section] = [...new Set([...selectedIds(section), ...ids])];
  render();
}

function bulkUpdateStatus(section, status) {
  const ids = selectedIds(section);
  if (!ids.length) {
    showToast("Select rows first.");
    return;
  }

  ids.forEach((id) => {
    const entry = findEmployeeInput(id);
    if (!entry) return;
    entry.status = status;
    entry.lastUpdate = todayLabel();
  });

  clearSelection(section);
  showToast(`${ids.length} row updated to ${status}.`);
  render();
}

let toastTimer = null;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function restoreSearchFocus() {
  if (!appState.focusSearch) return;

  const input = document.querySelector(`[data-action="search"][data-section="${appState.focusSearch}"]`);
  if (input) {
    input.focus();
    const end = input.value.length;
    input.setSelectionRange(end, end);
  }

  appState.focusSearch = null;
}

render();
