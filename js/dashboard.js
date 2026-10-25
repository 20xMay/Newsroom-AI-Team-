document.addEventListener('DOMContentLoaded', () => {
  // Xử lý đóng/mở Sidebar trên màn hình di động (Mobile)
  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (mobileToggle && sidebar && sidebarOverlay) {
    const toggleSidebar = () => {
      sidebar.classList.toggle('show');
      sidebarOverlay.classList.toggle('show');
    };

    mobileToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
  }
});