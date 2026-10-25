const SOURCE_STORAGE_KEY = "newsroomSourcesV2";

const defaultSources = [
  {
    id: 1,
    name: "Tổng cục Thống kê",
    url: "gso.gov.vn",
    type: "Cơ quan nhà nước",
    trust: "Cao",
    usage: 124,
    status: "Hoạt động"
  },
  {
    id: 2,
    name: "World Bank Việt Nam",
    url: "worldbank.org/vi",
    type: "Tổ chức quốc tế",
    trust: "Cao",
    usage: 89,
    status: "Hoạt động"
  },
  {
    id: 3,
    name: "Bộ Thông tin và Truyền thông",
    url: "mic.gov.vn",
    type: "Cơ quan nhà nước",
    trust: "Cao",
    usage: 210,
    status: "Hoạt động"
  },
  {
    id: 4,
    name: "Viện Kinh tế Việt Nam",
    url: "ie.vass.gov.vn",
    type: "Viện nghiên cứu",
    trust: "Trung bình",
    usage: 45,
    status: "Chờ duyệt"
  }
];

let sourcesData = [];

function loadSources() {
  const storedValue = localStorage.getItem(SOURCE_STORAGE_KEY);
  if (!storedValue) {
    return defaultSources.map(function (source) {
      return Object.assign({}, source);
    });
  }

  try {
    const parsedSources = JSON.parse(storedValue);
    if (!Array.isArray(parsedSources)) {
      return defaultSources.map(function (source) {
        return Object.assign({}, source);
      });
    }
    return parsedSources;
  } catch (error) {
    return defaultSources.map(function (source) {
      return Object.assign({}, source);
    });
  }
}

function saveSources() {
  localStorage.setItem(SOURCE_STORAGE_KEY, JSON.stringify(sourcesData));
}

function sourceHref(url) {
  const cleaned = String(url || "").trim().replace(/^https?:\/\//i, "");
  if (!cleaned || /[\s"'<>]/.test(cleaned)) {
    return "#";
  }
  return "https://" + cleaned;
}

function trustClassName(trust) {
  if (trust === "Trung bình") {
    return "trust-medium";
  }
  if (trust === "Thấp") {
    return "trust-low";
  }
  return "trust-high";
}

function statusClassName(status) {
  if (status === "Chờ duyệt") {
    return "status-pending";
  }
  if (status === "Tạm dừng") {
    return "status-paused";
  }
  return "status-active";
}

function updateCounters() {
  document.getElementById("stat-total").textContent = String(sourcesData.length);
  document.getElementById("stat-verified").textContent = String(
    sourcesData.filter(function (item) { return item.trust === "Cao"; }).length
  );
  document.getElementById("stat-pending").textContent = String(
    sourcesData.filter(function (item) { return item.status === "Chờ duyệt"; }).length
  );
}

function renderTable(data) {
  const tableBody = document.getElementById("source-table-body");
  tableBody.replaceChildren();

  if (!data.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.className = "empty-row";
    cell.textContent = "Không tìm thấy nguồn tin phù hợp";
    row.appendChild(cell);
    tableBody.appendChild(row);
    updateCounters();
    return;
  }

  data.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="font-medium"></td>
      <td><a class="link-url" target="_blank" rel="noopener noreferrer"></a></td>
      <td class="text-secondary"></td>
      <td><span class="badge-trust ${trustClassName(item.trust)}"><span class="dot"></span><span class="badge-text"></span></span></td>
      <td class="text-secondary"></td>
      <td><span class="badge-status ${statusClassName(item.status)}"><span class="dot"></span><span class="badge-text"></span></span></td>
    `;
    row.children[0].textContent = item.name;
    const link = row.querySelector(".link-url");
    link.textContent = item.url;
    link.href = sourceHref(item.url);
    row.children[2].textContent = item.type;
    row.querySelector(".badge-trust .badge-text").textContent = item.trust;
    row.children[4].textContent = String(item.usage);
    row.querySelector(".badge-status .badge-text").textContent = item.status;
    tableBody.appendChild(row);
  });

  updateCounters();
}

function applyFilters() {
  const query = document.getElementById("filter-search").value.toLowerCase().trim();
  const selectedType = document.getElementById("filter-type").value;
  const selectedStatus = document.getElementById("filter-status").value;

  const filtered = sourcesData.filter(function (item) {
    const matchesQuery = item.name.toLowerCase().includes(query) || item.url.toLowerCase().includes(query);
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesQuery && matchesType && matchesStatus;
  });

  renderTable(filtered);
}

function openModal() {
  document.getElementById("add-modal").classList.add("active");
  document.getElementById("input-name").focus();
}

function closeModal() {
  document.getElementById("add-modal").classList.remove("active");
  document.getElementById("add-source-form").reset();
}

function initSourceEvents() {
  sourcesData = loadSources();

  document.getElementById("filter-search").addEventListener("input", applyFilters);
  document.getElementById("filter-type").addEventListener("change", applyFilters);
  document.getElementById("filter-status").addEventListener("change", applyFilters);
  document.getElementById("btn-add-source").addEventListener("click", openModal);
  document.getElementById("btn-close-modal").addEventListener("click", closeModal);
  document.getElementById("btn-cancel-modal").addEventListener("click", closeModal);
  document.getElementById("add-modal").addEventListener("click", function (event) {
    if (event.target.id === "add-modal") {
      closeModal();
    }
  });

  document.getElementById("add-source-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("input-name").value.trim();
    const url = document.getElementById("input-url").value.trim();
    if (!name || !url) {
      return;
    }

    sourcesData.unshift({
      id: Date.now(),
      name: name,
      url: url.replace(/^https?:\/\//i, ""),
      type: document.getElementById("input-type").value,
      trust: document.getElementById("input-trust").value,
      usage: 0,
      status: "Chờ duyệt"
    });

    saveSources();
    applyFilters();
    closeModal();
  });

  renderTable(sourcesData);
}

document.addEventListener("DOMContentLoaded", initSourceEvents);
