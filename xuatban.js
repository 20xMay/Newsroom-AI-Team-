const defaultPublishArticles = [
  {
    id: 1,
    title: "AI đang thay đổi ngành giáo dục Việt Nam",
    author: "Nguyễn Lan Anh",
    category: "Công nghệ",
    words: "1.240 từ",
    timeText: "Hôm nay, 14:30",
    statusText: "Đã duyệt",
    statusClass: "tag-green",
    dotClass: "dot-green",
    primaryAction: "Xuất bản",
    tabGroup: "all"
  },
  {
    id: 2,
    title: "Kinh tế xanh: Cơ hội cho doanh nghiệp Việt",
    author: "Trần Minh Khoa",
    category: "Kinh tế",
    words: "1.240 từ",
    timeText: "Hôm nay, 17:00",
    statusText: "Chờ duyệt",
    statusClass: "tag-yellow",
    dotClass: "dot-yellow",
    primaryAction: "Phê duyệt",
    tabGroup: "all"
  },
  {
    id: 3,
    title: "Du lịch bền vững trở thành xu hướng mới",
    author: "Hoàng Phương",
    category: "Du lịch",
    words: "1.240 từ",
    timeText: "25 Thg 6, 09:00",
    statusText: "Đã lên lịch",
    statusClass: "tag-blue",
    dotClass: "dot-blue",
    primaryAction: null,
    tabGroup: "scheduled"
  },
  {
    id: 4,
    title: "Thành phố thông minh và bài toán dữ liệu",
    author: "Lê Quang Huy",
    category: "Công nghệ",
    words: "1.240 từ",
    timeText: "Chưa đặt lịch",
    statusText: "Bản nháp",
    statusClass: "tag-gray",
    dotClass: "dot-gray",
    primaryAction: null,
    tabGroup: "all"
  },
  {
    id: 5,
    title: "Ứng dụng Năng lượng Xanh trong Đô thị",
    author: "Nguyễn Lan Anh",
    category: "Công nghệ",
    words: "1.100 từ",
    timeText: "24 Thg 6, 16:00",
    statusText: "Đã xuất bản",
    statusClass: "tag-green",
    dotClass: "dot-green",
    primaryAction: null,
    tabGroup: "published"
  },
  {
    id: 6,
    title: "Thị trường Chứng khoán cuối năm 2026",
    author: "Trần Minh Khoa",
    category: "Kinh tế",
    words: "950 từ",
    timeText: "23 Thg 6, 11:30",
    statusText: "Bị từ chối",
    statusClass: "tag-red",
    dotClass: "dot-red",
    primaryAction: null,
    tabGroup: "rejected"
  }
];

let publishArticles = [];
let selectedArticleId = null;
let activePublishTab = "all";
let filteredPublishArticles = [];

document.addEventListener("DOMContentLoaded", () => {
  loadPublishDataFromStorage();
  initTabEvents();
  initFilterEvents();
  initModalEvents();
  updatePublishStats();
  applyPublishFilters();
});

function loadPublishDataFromStorage() {
  const savedData = localStorage.getItem("newsroom_publish_articles");
  if (savedData) {
    try {
      publishArticles = JSON.parse(savedData);
    } catch (e) {
      publishArticles = defaultPublishArticles;
      savePublishDataToStorage();
    }
  } else {
    publishArticles = defaultPublishArticles;
    savePublishDataToStorage();
  }
}

function savePublishDataToStorage() {
  localStorage.setItem("newsroom_publish_articles", JSON.stringify(publishArticles));
  if (window.parent && window.parent.dispatchEvent) {
    window.parent.dispatchEvent(new Event("articleDataChanged"));
  }
}

function updatePublishStats() {
  const readyCount = publishArticles.filter(a => a.statusText === "Đã duyệt" || a.statusText === "Chờ duyệt").length;
  const scheduledCount = publishArticles.filter(a => a.tabGroup === "scheduled" || a.statusText === "Đã lên lịch").length;
  const editCount = publishArticles.filter(a => a.statusText === "Bản nháp").length;
  const publishedTodayCount = publishArticles.filter(a => a.tabGroup === "published" || a.statusText === "Đã xuất bản").length + 11;

  const statCards = document.querySelectorAll(".stat-card .stat-num");
  if (statCards.length >= 4) {
    statCards[0].innerHTML = `<span class="dot dot-green"></span> ${readyCount}`;
    statCards[1].innerHTML = `<span class="dot dot-blue"></span> ${scheduledCount}`;
    statCards[2].innerHTML = `<span class="dot dot-red"></span> ${editCount}`;
    statCards[3].innerHTML = `<span class="dot dot-purple"></span> ${publishedTodayCount}`;
  }
}

function initTabEvents() {
  const tabs = document.querySelectorAll(".publish-tabs .tab-item");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activePublishTab = tab.getAttribute("data-tab");
      applyPublishFilters();
    });
  });
}

function initFilterEvents() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const authorFilter = document.getElementById("authorFilter");

  if (searchInput) searchInput.addEventListener("input", applyPublishFilters);
  if (categoryFilter) categoryFilter.addEventListener("change", applyPublishFilters);
  if (authorFilter) authorFilter.addEventListener("change", applyPublishFilters);
}

function applyPublishFilters() {
  const searchValue = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";
  const categoryValue = document.getElementById("categoryFilter")?.value || "all";
  const authorValue = document.getElementById("authorFilter")?.value || "all";

  filteredPublishArticles = publishArticles.filter(item => {
    const matchesTab = (activePublishTab === "all") || (item.tabGroup === activePublishTab);
    const matchesSearch = item.title.toLowerCase().includes(searchValue) || item.author.toLowerCase().includes(searchValue);
    const matchesCategory = (categoryValue === "all") || (item.category === categoryValue);
    const matchesAuthor = (authorValue === "all") || (item.author === authorValue);

    return matchesTab && matchesSearch && matchesCategory && matchesAuthor;
  });

  renderPublishList();
}

function renderPublishList() {
  const container = document.getElementById("publishListContainer");
  if (!container) return;

  container.innerHTML = "";

  if (filteredPublishArticles.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px; color: #94a3b8; font-size: 13px;">
        Không có bài viết nào trong danh mục này.
      </div>
    `;
    return;
  }

  filteredPublishArticles.forEach(item => {
    const div = document.createElement("div");
    div.className = "publish-item";
    div.innerHTML = `
      <div class="item-left">
        <div class="file-icon-box">
          <i class="fa-regular fa-file-lines"></i>
        </div>
        <div>
          <div class="item-title">${item.title}</div>
          <div class="item-sub">${item.author} · ${item.category} · ${item.words}</div>
        </div>
      </div>

      <div class="item-right">
        <div class="time-col">
          <div class="time-label">THỜI GIAN</div>
          <div class="time-value">${item.timeText}</div>
        </div>

        <span class="status-tag ${item.statusClass}">
          <span class="dot ${item.dotClass}"></span> ${item.statusText}
        </span>

        <div class="action-group">
          ${item.primaryAction ? `<button class="btn-act btn-act-blue" onclick="handlePrimaryAction(${item.id})">${item.primaryAction}</button>` : ''}
          <button class="btn-act btn-act-outline" onclick="openScheduleModal(${item.id})">Lên lịch</button>
          <button class="btn-act btn-act-danger" onclick="rejectArticle(${item.id})">Từ chối</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function initModalEvents() {
  const modal = document.getElementById("scheduleModal");
  const btnOpenHeader = document.getElementById("btnOpenScheduleModal");
  const btnClose = document.getElementById("btnCloseModal");
  const btnCancel = document.getElementById("btnCancelModal");
  const btnSubmit = document.getElementById("btnSubmitSchedule");

  if (btnOpenHeader) {
    btnOpenHeader.addEventListener("click", () => openScheduleModal(null));
  }

  const closeModal = () => modal.classList.remove("show");
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
      const dateVal = document.getElementById("scheduleDate").value;
      const timeVal = document.getElementById("scheduleTime").value;

      if (!dateVal) {
        alert("Vui lòng chọn Ngày xuất bản!");
        return;
      }

      if (selectedArticleId) {
        const item = publishArticles.find(a => a.id === selectedArticleId);
        if (item) {
          item.timeText = `${dateVal}, ${timeVal}`;
          item.statusText = "Đã lên lịch";
          item.statusClass = "tag-blue";
          item.dotClass = "dot-blue";
          item.primaryAction = null;
          item.tabGroup = "scheduled";
        }
      }

      savePublishDataToStorage();
      updatePublishStats();
      applyPublishFilters();
      closeModal();
      alert(`Đã lên lịch xuất bản thành công vào ${dateVal} lúc ${timeVal}!`);
    });
  }
}

function openScheduleModal(articleId) {
  selectedArticleId = articleId;
  const modal = document.getElementById("scheduleModal");

  const today = new Date().toISOString().split('T')[0];
  document.getElementById("scheduleDate").value = today;

  modal.classList.add("show");
}

function handlePrimaryAction(id) {
  const item = publishArticles.find(a => a.id === id);
  if (item) {
    if (item.primaryAction === "Xuất bản") {
      item.statusText = "Đã xuất bản";
      item.statusClass = "tag-green";
      item.dotClass = "dot-green";
      item.primaryAction = null;
      item.tabGroup = "published";
    } else if (item.primaryAction === "Phê duyệt") {
      item.statusText = "Đã duyệt";
      item.statusClass = "tag-green";
      item.dotClass = "dot-green";
      item.primaryAction = "Xuất bản";
    }
    savePublishDataToStorage();
    updatePublishStats();
    applyPublishFilters();
    alert(`Đã thực hiện cập nhật bài viết "${item.title}"`);
  }
}

function rejectArticle(id) {
  if (confirm("Bạn có chắc chắn muốn từ chối bài viết này?")) {
    const item = publishArticles.find(a => a.id === id);
    if (item) {
      item.statusText = "Bị từ chối";
      item.statusClass = "tag-red";
      item.dotClass = "dot-red";
      item.primaryAction = null;
      item.tabGroup = "rejected";
    }
    savePublishDataToStorage();
    updatePublishStats();
    applyPublishFilters();
    alert("Đã chuyển bài viết vào danh sách Bị từ chối!");
  }
}