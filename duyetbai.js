const initialQueueData = [
  {
    id: 101,
    title: "Đề xuất tuyến đường sắt tốc độ cao Bắc - Nam",
    category: "Giao thông",
    words: "850 từ",
    author: "Nguyễn Văn An",
    createdAt: "25 Thg 6, 10:15",
    priority: "Cao",
    status: "Chờ duyệt",
    tabGroup: "Pitch"
  },
  {
    id: 102,
    title: "Ứng dụng năng lượng tái tạo tại Việt Nam",
    category: "Môi trường",
    words: "920 từ",
    author: "Lê Thu Hà",
    createdAt: "25 Thg 6, 09:30",
    priority: "Trung bình",
    status: "Bản nháp",
    tabGroup: "Pitch"
  },
  {
    id: 103,
    title: "Bài toán chuyển đổi số cho doanh nghiệp nhỏ",
    category: "Công nghệ",
    words: "1.050 từ",
    author: "Phạm Quốc Bảo",
    createdAt: "24 Thg 6, 15:45",
    priority: "Thấp",
    status: "Chờ duyệt",
    tabGroup: "Pitch"
  },
  {
    id: 1,
    title: "AI đang thay đổi ngành giáo dục...",
    category: "Công nghệ",
    words: "1.240 từ",
    author: "Nguyễn Lan Anh",
    createdAt: "24 Thg 6, 09:20",
    priority: "Cao",
    status: "Chờ duyệt",
    tabGroup: "Draft"
  },
  {
    id: 2,
    title: "Du lịch xanh trở thành xu hướng...",
    category: "Công nghệ",
    words: "1.240 từ",
    author: "Trần Minh Khoa",
    createdAt: "24 Thg 6, 08:45",
    priority: "Trung bình",
    status: "Bản nháp",
    tabGroup: "Draft"
  },
  {
    id: 3,
    title: "Thị trường bán lẻ nửa cuối năm",
    category: "Công nghệ",
    words: "1.240 từ",
    author: "Hoàng Phương",
    createdAt: "23 Thg 6, 16:30",
    priority: "Cao",
    status: "Chờ fact-check",
    tabGroup: "Draft"
  },
  {
    id: 4,
    title: "Giao thông công cộng sau một năm",
    category: "Công nghệ",
    words: "1.240 từ",
    author: "Lê Quang Huy",
    createdAt: "23 Thg 6, 14:12",
    priority: "Thấp",
    status: "Chờ đăng",
    tabGroup: "Draft"
  },
  {
    id: 5,
    title: "Giải pháp phát triển kinh tế số bền vững",
    category: "Kinh tế",
    words: "1.100 từ",
    author: "Phạm Thái Sơn",
    createdAt: "22 Thg 6, 11:15",
    priority: "Trung bình",
    status: "Chờ duyệt",
    tabGroup: "Draft"
  },
  {
    id: 6,
    title: "Ứng dụng Năng lượng Mặt trời trong Đô thị",
    category: "Đô thị",
    words: "980 từ",
    author: "Vũ Hải Yến",
    createdAt: "21 Thg 6, 15:40",
    priority: "Cao",
    status: "Bản nháp",
    tabGroup: "Draft"
  },
  {
    id: 7,
    title: "Xu hướng Du lịch Sinh thái tại Đồng bằng",
    category: "Du lịch",
    words: "1.450 từ",
    author: "Đặng Hoàng Nam",
    createdAt: "20 Thg 6, 09:00",
    priority: "Thấp",
    status: "Chờ fact-check",
    tabGroup: "Draft"
  },
  {
    id: 8,
    title: "Định hướng Khởi nghiệp Đổi mới Sáng tạo",
    category: "Công nghệ",
    words: "1.320 từ",
    author: "Ngô Mỹ Linh",
    createdAt: "19 Thg 6, 17:20",
    priority: "Trung bình",
    status: "Chờ đăng",
    tabGroup: "Draft"
  },
  {
    id: 201,
    title: "Phân tích số liệu lạm phát tháng 6",
    category: "Kinh tế",
    words: "1.600 từ",
    author: "Đỗ Anh Tuấn",
    createdAt: "24 Thg 6, 14:00",
    priority: "Cao",
    status: "Chờ fact-check",
    tabGroup: "FactCheck"
  },
  {
    id: 202,
    title: "Thống kê lượng khách quốc tế quý II",
    category: "Du lịch",
    words: "1.150 từ",
    author: "Bùi Thị Mai",
    createdAt: "23 Thg 6, 11:20",
    priority: "Trung bình",
    status: "Chờ fact-check",
    tabGroup: "FactCheck"
  },
  {
    id: 203,
    title: "Báo cáo an ninh mạng quốc gia 2026",
    category: "Công nghệ",
    words: "2.100 từ",
    author: "Hoàng Phương",
    createdAt: "22 Thg 6, 16:45",
    priority: "Cao",
    status: "Chờ fact-check",
    tabGroup: "FactCheck"
  },
  {
    id: 204,
    title: "Đánh giá hiệu quả gói kích cầu tiêu dùng",
    category: "Kinh tế",
    words: "1.300 từ",
    author: "Trần Minh Khoa",
    createdAt: "21 Thg 6, 08:30",
    priority: "Thấp",
    status: "Chờ fact-check",
    tabGroup: "FactCheck"
  },
  {
    id: 205,
    title: "Chính sách bảo hiểm y tế mới nhất",
    category: "Xã hội",
    words: "1.400 từ",
    author: "Nguyễn Lan Anh",
    createdAt: "20 Thg 6, 13:10",
    priority: "Trung bình",
    status: "Chờ fact-check",
    tabGroup: "FactCheck"
  },
  {
    id: 301,
    title: "Kế hoạch mở rộng mạng lưới 5G toàn quốc",
    category: "Công nghệ",
    words: "1.500 từ",
    author: "Lê Quang Huy",
    createdAt: "25 Thg 6, 08:00",
    priority: "Cao",
    status: "Chờ đăng",
    tabGroup: "PublishReady"
  },
  {
    id: 302,
    title: "Toàn cảnh thị trường bất động sản nghỉ dưỡng",
    category: "Kinh tế",
    words: "1.800 từ",
    author: "Phạm Thái Sơn",
    createdAt: "24 Thg 6, 17:30",
    priority: "Trung bình",
    status: "Chờ đăng",
    tabGroup: "PublishReady"
  },
  {
    id: 303,
    title: "Kỷ nguyên xe điện và hạ tầng trạm sạc",
    category: "Đô thị",
    words: "1.350 từ",
    author: "Vũ Hải Yến",
    createdAt: "23 Thg 6, 10:00",
    priority: "Cao",
    status: "Chờ đăng",
    tabGroup: "PublishReady"
  },
  {
    id: 304,
    title: "Lễ hội văn hóa ẩm thực ba miền năm 2026",
    category: "Văn hóa",
    words: "1.200 từ",
    author: "Đặng Hoàng Nam",
    createdAt: "22 Thg 6, 14:20",
    priority: "Thấp",
    status: "Chờ đăng",
    tabGroup: "PublishReady"
  }
];

let queueData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 4;
let activeTab = "Draft";

document.addEventListener("DOMContentLoaded", () => {
  loadDataFromStorage();
  initTabEvents();
  initFilterEvents();
  initPaginationEvents();
});

function loadDataFromStorage() {
  const savedArticles = localStorage.getItem("newsroom_articles");
  if (savedArticles) {
    try {
      const parsed = JSON.parse(savedArticles);
      if (Array.isArray(parsed) && parsed.length > 0) {
        queueData = parsed.map((item, index) => ({
          id: item.id ? Number(item.id) : index + 1,
          title: item.title || "Bài viết không có tiêu đề",
          category: item.category || "Công nghệ",
          words: item.words || "1.240 từ",
          author: item.author || "Nguyễn Lan Anh",
          createdAt: item.createdAt || "24 Thg 6, 09:20",
          priority: item.priority || (index % 2 === 0 ? "Cao" : "Trung bình"),
          status: item.status || "Chờ duyệt",
          tabGroup: item.tabGroup || "Draft"
        }));
      } else {
        queueData = initialQueueData;
      }
    } catch (e) {
      queueData = initialQueueData;
    }
  } else {
    queueData = initialQueueData;
  }

  updateTabBadges();
  applyFilters();
}

function updateTabBadges() {
  const counts = {
    Pitch: queueData.filter(i => i.tabGroup === "Pitch").length,
    Draft: queueData.filter(i => i.tabGroup === "Draft").length,
    FactCheck: queueData.filter(i => i.tabGroup === "FactCheck").length,
    PublishReady: queueData.filter(i => i.tabGroup === "PublishReady").length
  };

  document.querySelectorAll(".queue-tab-btn").forEach(btn => {
    const tabKey = btn.getAttribute("data-tab");
    const countSpan = btn.querySelector(".tab-count");
    if (countSpan && counts[tabKey] !== undefined) {
      countSpan.textContent = counts[tabKey];
    }
  });
}

function initTabEvents() {
  const tabBtns = document.querySelectorAll(".queue-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTab = btn.getAttribute("data-tab");
      currentPage = 1;
      applyFilters();
    });
  });
}

function initFilterEvents() {
  const searchInput = document.getElementById("queueSearchInput");
  const filterStatus = document.getElementById("filterStatus");
  const filterPriority = document.getElementById("filterPriority");
  const filterCategory = document.getElementById("filterCategory");

  if (searchInput) searchInput.addEventListener("input", () => { currentPage = 1; applyFilters(); });
  if (filterStatus) filterStatus.addEventListener("change", () => { currentPage = 1; applyFilters(); });
  if (filterPriority) filterPriority.addEventListener("change", () => { currentPage = 1; applyFilters(); });
  if (filterCategory) filterCategory.addEventListener("change", () => { currentPage = 1; applyFilters(); });
}

function applyFilters() {
  const searchValue = document.getElementById("queueSearchInput")?.value.toLowerCase().trim() || "";
  const statusValue = document.getElementById("filterStatus")?.value || "all";
  const priorityValue = document.getElementById("filterPriority")?.value || "all";
  const categoryValue = document.getElementById("filterCategory")?.value || "all";

  filteredData = queueData.filter(item => {
    const matchesTab = item.tabGroup === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchValue) || 
                          item.author.toLowerCase().includes(searchValue);
    const matchesStatus = (statusValue === "all") || (item.status === statusValue);
    const matchesPriority = (priorityValue === "all") || (item.priority === priorityValue);
    const matchesCategory = (categoryValue === "all") || (item.category === categoryValue);

    return matchesTab && matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  renderTable();
  updatePaginationUI();
}

function renderTable() {
  const tbody = document.getElementById("editorialQueueTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (filteredData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 32px; color: #94a3b8;">
          Không có bài viết nào trong danh mục này.
        </td>
      </tr>
    `;
    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  pageItems.forEach(item => {
    const tr = document.createElement("tr");

    let priorityClass = "thap";
    if (item.priority === "Cao") priorityClass = "cao";
    if (item.priority === "Trung bình") priorityClass = "trung-binh";

    let statusClass = "cho-duyet";
    if (item.status === "Bản nháp") statusClass = "ban-nhap";
    if (item.status === "Chờ fact-check") statusClass = "cho-fact-check";
    if (item.status === "Chờ đăng") statusClass = "cho-dang";

    tr.innerHTML = `
      <td>
        <div class="article-title-cell">
          <span class="article-title-text" onclick="openArticleEditor(${item.id})">${item.title}</span>
          <span class="article-sub-info">${item.category} · ${item.words}</span>
        </div>
      </td>
      <td>${item.author}</td>
      <td>${item.createdAt}</td>
      <td>
        <span class="priority-pill ${priorityClass}">
          <span class="dot-indicator"></span> ${item.priority}
        </span>
      </td>
      <td>
        <span class="status-pill ${statusClass}">
          ${item.status}
        </span>
      </td>
      <td style="text-align: right;">
        <button class="btn-action-view" onclick="openArticleEditor(${item.id})">Xem bài</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function initPaginationEvents() {
  const btnPrev = document.getElementById("btnPrevPage");
  const btnNext = document.getElementById("btnNextPage");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
        updatePaginationUI();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      const maxPage = Math.ceil(filteredData.length / itemsPerPage);
      if (currentPage < maxPage) {
        currentPage++;
        renderTable();
        updatePaginationUI();
      }
    });
  }
}

function updatePaginationUI() {
  const total = filteredData.length;
  const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, total);

  const infoEl = document.getElementById("paginationInfo");
  if (infoEl) {
    infoEl.textContent = `Hiển thị ${start}–${end} trong ${total} bài`;
  }

  const btnPrev = document.getElementById("btnPrevPage");
  const btnNext = document.getElementById("btnNextPage");

  if (btnPrev) btnPrev.disabled = (currentPage === 1);
  if (btnNext) btnNext.disabled = (currentPage * itemsPerPage >= total || total === 0);
}

function openArticleEditor(id) {
  localStorage.setItem("selectedArticleId", id);
  
  try {
    if (window.parent && window.parent !== window && typeof window.parent.navigateToPage === "function") {
      window.parent.navigateToPage("trinhsoanthao.html", "Trình soạn thảo");
      return;
    }
  } catch (e) {
    console.warn("Cross-origin frame error:", e);
  }

  window.location.href = "trinhsoanthao.html";
}
