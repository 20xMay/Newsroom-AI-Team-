document.addEventListener("DOMContentLoaded", () => {
  initWeeklyChart();
  initThroughputChart();
  initTimeRangeSelector();
});

// 1. Biểu đồ Cột ghép nhóm (Bài viết theo tuần: Xuất bản & Bản nháp)
function initWeeklyChart() {
  const ctx = document.getElementById("weeklyArticlesChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"],
      datasets: [
        {
          label: "Bản nháp",
          data: [18, 22, 20, 26, 24, 28, 26, 30],
          backgroundColor: "#93c5fd", // Xanh lam nhạt
          borderRadius: 4,
          barPercentage: 0.4,
          categoryPercentage: 0.6
        },
        {
          label: "Đã xuất bản",
          data: [22, 28, 25, 32, 30, 36, 34, 38],
          backgroundColor: "#1d4ed8", // Xanh lam đậm
          borderRadius: 4,
          barPercentage: 0.4,
          categoryPercentage: 0.6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleFont: { family: "Be Vietnam Pro", size: 12 },
          bodyFont: { family: "Be Vietnam Pro", size: 12 },
          cornerRadius: 6
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { family: "Be Vietnam Pro", size: 11 } }
        },
        y: {
          display: false,
          grid: { display: false }
        }
      }
    }
  });
}

// 2. Biểu đồ Đường Gradient (Content throughput)
function initThroughputChart() {
  const ctx = document.getElementById("throughputChart");
  if (!ctx) return;

  const chartCanvas = ctx.getContext("2d");

  // Dải màu Gradient xanh mờ phủ dưới đường cong
  const blueGradient = chartCanvas.createLinearGradient(0, 0, 0, 220);
  blueGradient.addColorStop(0, "rgba(37, 99, 235, 0.2)");
  blueGradient.addColorStop(1, "rgba(37, 99, 235, 0.0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["01/06", "08/06", "15/06", "22/06"],
      datasets: [
        {
          label: "Hiệu suất",
          data: [25, 38, 45, 52],
          borderColor: "#2563eb",
          backgroundColor: blueGradient,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#2563eb",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleFont: { family: "Be Vietnam Pro", size: 12 },
          bodyFont: { family: "Be Vietnam Pro", size: 12 },
          cornerRadius: 6
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { family: "Be Vietnam Pro", size: 11 } }
        },
        y: {
          display: false,
          grid: { display: false }
        }
      }
    }
  });
}

// 3. Xử lý đổi khoảng thời gian xem báo cáo
function initTimeRangeSelector() {
  const select = document.getElementById("timeRangeSelect");
  if (select) {
    select.addEventListener("change", (e) => {
      console.log(`Đang tải dữ liệu cho: ${e.target.value} ngày`);
    });
  }
}