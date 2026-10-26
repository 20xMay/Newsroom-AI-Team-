function initialsFromName(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) {
        return "LA";
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function paintSavedAvatar(element, imageData, fallbackText) {
    if (!element) {
        return;
    }
    element.replaceChildren();
    if (imageData) {
        const image = document.createElement("img");
        image.src = imageData;
        image.alt = "";
        element.appendChild(image);
        return;
    }
    element.textContent = fallbackText;
}

function restoreSavedProfile() {
    const savedName = localStorage.getItem("userFullName");
    const savedRole = localStorage.getItem("userRole");
    const savedAvatar = localStorage.getItem("userAvatar");
    const nameElement = document.querySelector(".user-name");
    const roleElement = document.querySelector(".user-role");

    if (savedName && nameElement) {
        nameElement.textContent = savedName;
    }
    if (savedRole && roleElement) {
        roleElement.textContent = savedRole;
    }

    const fallback = initialsFromName(savedName || (nameElement ? nameElement.textContent : ""));
    if (savedAvatar || savedName) {
        paintSavedAvatar(document.querySelector(".header-avatar"), savedAvatar, fallback);
        paintSavedAvatar(document.querySelector(".user-avatar"), savedAvatar, fallback);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    restoreSavedProfile();

    const navItems = document.querySelectorAll(".nav-item");
    const mainFrame = document.getElementById("mainFrame");
    const newArticleBtn = document.getElementById("newArticleBtn");
    const currentPage = document.getElementById("currentPage");


    // Khi bấm menu bên trái
    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            // Xóa active ở tất cả menu
            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            // Thêm active cho menu vừa bấm
            item.classList.add("active");

            // Đổi tên trên Header
            const pageName = item.querySelector("span");

            if (pageName) {
                currentPage.textContent = pageName.textContent;
            }

        });

    });


    // Bấm "Bài viết mới"
    newArticleBtn.addEventListener("click", function () {

        // Chuyển iframe sang trình soạn thảo
        mainFrame.src = "trinhsoanthao.html";


        // Xóa active ở tất cả menu
        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });


        // Tìm menu Trình soạn thảo
        const editorMenu = document.querySelector(
            '.nav-item[href="trinhsoanthao.html"]'
        );


        // Cho Trình soạn thảo màu xanh
        if (editorMenu) {
            editorMenu.classList.add("active");
        }


        // Đổi tên trên Header
        currentPage.textContent = "Trình soạn thảo";

    });

});