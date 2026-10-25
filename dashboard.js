// Dữ liệu mặc định ban đầu
const initialArticles = [
  {
    id: 1,
    title: "AI đang thay đổi ngành giáo dục Việt Nam như thế nào?",
    category: "Công nghệ",
    words: "1.240 từ",
    status: "Chờ duyệt",
    statusClass: "status-warning",
    updated: "20 phút trước",
    deadline: "Hôm nay, 17:00",
    isDeadlineDanger: true
  },
  {
    id: 2,
    title: "Kinh tế xanh: Cơ hội mới cho doanh nghiệp vừa và nhỏ",
    category: "Kinh tế",
    words: "1.240 từ",
    status: "Đang viết",
    statusClass: "status-info",
    updated: "2 giờ trước",
    deadline: "25 Thg 6",
    isDeadlineDanger: false
  },
  {
    id: 3,
    title: "Những chuyển biến mới trong chính sách y tế cộng đồng",
    category: "Xã hội",
    words: "1.240 từ",
    status: "Cần chỉnh sửa",
    statusClass: "status-danger",
    updated: "Hôm qua",
    deadline: "27 Thg 6",
    isDeadlineDanger: false
  },
  {
    id: 4,
    title: "Thành phố thông minh và bài toán dữ liệu mở",
    category: "Công nghệ",
    words: "1.240 từ",
    status: "Đã duyệt",
    statusClass: "status-success",
    updated: "2 ngày trước",
    deadline: "29 Thg 6",
    isDeadlineDanger: false
  }
];

// 1. Tự động lấy Ngày và Lời chúc theo giờ thực tế máy tính
function initDateTimeAndGreeting() {
  const now = new Date();

  const daysOfWeek = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
  const dayName = daysOfWeek[now.getDay()];
  const day = now.getDate();
  const month = now.getMonth() + 1;

  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    dateEl.textContent = `${dayName}, ${day} THÁNG ${month}`;
  }

  const hours = now.getHours();
  let greeting = 'Chào buổi sáng';
  if (hours >= 12 && hours < 18) {
    greeting = 'Chào buổi chiều';
  } else if (hours >= 18 || hours < 5) {
    greeting = 'Chào buổi tối';
  }

  const greetingEl = document.getElementById('greetingText');
  if (greetingEl) {
    greetingEl.textContent = greeting;
  }
}

// 2. Vẽ Biểu đồ 7 ngày có màu Gradient phủ đổ bóng (chuẩn UI mẫu)
function initPublishChart() {
  const ctx = document.getElementById('publishChart');
  if (!ctx) return;

  const chartCanvas = ctx.getContext('2d');

  // Dải màu Gradient xanh mờ cho đường nét liền
  const blueGradient = chartCanvas.createLinearGradient(0, 0, 0, 200);
  blueGradient.addColorStop(0, 'rgba(29, 78, 216, 0.18)');
  blueGradient.addColorStop(1, 'rgba(29, 78, 216, 0.0)');

  // Dải màu Gradient cam mờ cho đường nét đứt
  const orangeGradient = chartCanvas.createLinearGradient(0, 0, 0, 200);
  orangeGradient.addColorStop(0, 'rgba(234, 88, 12, 0.15)');
  orangeGradient.addColorStop(1, 'rgba(234, 88, 12, 0.0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [
        {
          label: 'Đã xuất bản',
          data: [15, 25, 38, 42, 55, 58, 70],
          borderColor: '#1d4ed8',
          backgroundColor: blueGradient,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Chờ duyệt',
          data: [8, 18, 22, 28, 32, 30, 36],
          borderColor: '#ea580c',
          backgroundColor: orangeGradient,
          borderWidth: 2,
          borderDash: [5, 5],
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { family: 'Be Vietnam Pro', size: 12 } } },
        y: { display: false, grid: { display: false } }
      }
    }
  });
}

// 3. Quản lý lưu bài viết vào LocalStorage (Nhấn F5 không mất)
function getSavedArticles() {
  const saved = localStorage.getItem('newsroom_articles');
  if (saved) return JSON.parse(saved);

  localStorage.setItem('newsroom_articles', JSON.stringify(initialArticles));
  return initialArticles;
}

function saveArticles(articles) {
  localStorage.setItem('newsroom_articles', JSON.stringify(articles));
  renderArticlesTable();
}

function renderArticlesTable() {
  const tbody = document.getElementById('articlesTableBody');
  if (!tbody) return;

  const articles = getSavedArticles();
  tbody.innerHTML = '';

  articles.forEach((article) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="article-info">
          <div class="article-icon">
            <i class="fa-regular fa-file-lines"></i>
          </div>
          <div class="article-details">
            <div class="article-title">${article.title}</div>
            <div class="article-meta">${article.category} · ${article.words}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="status-tag ${article.statusClass}">
          <span class="dot"></span> ${article.status}
        </span>
      </td>
      <td class="text-muted">${article.updated}</td>
      <td class="${article.isDeadlineDanger ? 'text-danger font-weight-medium' : 'text-muted'}">
        ${article.deadline}
      </td>
      <td class="text-right">
        <button class="btn-icon-more" title="Xóa bài" onclick="deleteArticle(${article.id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addNewArticle() {
  const title = prompt("Nhập tiêu đề bài viết mới:");
  if (!title) return;

  const articles = getSavedArticles();
  const newArticle = {
    id: Date.now(),
    title: title,
    category: "Chưa phân loại",
    words: "0 từ",
    status: "Đang viết",
    statusClass: "status-info",
    updated: "Vừa xong",
    deadline: "Hôm nay",
    isDeadlineDanger: false
  };

  articles.unshift(newArticle);
  saveArticles(articles);
}

function deleteArticle(id) {
  if (confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
    let articles = getSavedArticles();
    articles = articles.filter(a => a.id !== id);
    saveArticles(articles);
  }
}

// Khởi chạy khi nạp trang
document.addEventListener('DOMContentLoaded', () => {
  initDateTimeAndGreeting();
  initPublishChart();
  renderArticlesTable();

  const btnCreate = document.getElementById('btnCreateArticle');
  if (btnCreate) btnCreate.addEventListener('click', addNewArticle);
}); 