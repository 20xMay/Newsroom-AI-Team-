const SETTINGS_STORAGE_KEY = "newsroomSettings";

const defaultSettings = {
  profile: {
    fullName: "Lan Anh",
    role: "Phóng viên",
    email: "lananh@newsroom.ai",
    newsroom: "Tòa soạn Newsroom AI Việt Nam"
  },
  notifications: {
    articleReview: true,
    newComment: true,
    newSource: true,
    publishReminder: false,
    aiSuggestion: true
  },
  assistant: {
    replyLanguage: "vi",
    tone: "professional",
    autoFactCheck: true
  }
};

let currentAvatarData = null;

function loadSettings() {
  const storedValue = localStorage.getItem(SETTINGS_STORAGE_KEY);
  const fallback = JSON.parse(JSON.stringify(defaultSettings));
  if (!storedValue) {
    fallback.profile.fullName = localStorage.getItem("userFullName") || fallback.profile.fullName;
    fallback.profile.email = localStorage.getItem("userEmail") || fallback.profile.email;
    fallback.profile.role = localStorage.getItem("userRole") || fallback.profile.role;
    return fallback;
  }

  try {
    const parsedSettings = JSON.parse(storedValue);
    return {
      profile: Object.assign({}, defaultSettings.profile, parsedSettings.profile || {}),
      notifications: Object.assign({}, defaultSettings.notifications, parsedSettings.notifications || {}),
      assistant: Object.assign({}, defaultSettings.assistant, parsedSettings.assistant || {})
    };
  } catch (error) {
    return fallback;
  }
}

function initialsFromName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return "LA";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function paintAvatar(element, imageData, fallbackText) {
  if (!element) {
    return;
  }
  element.replaceChildren();
  if (imageData) {
    const image = document.createElement("img");
    image.src = imageData;
    image.alt = "Ảnh đại diện";
    element.appendChild(image);
    return;
  }
  element.textContent = fallbackText || "LA";
}

function parentDocument() {
  try {
    if (window.parent && window.parent !== window) {
      return window.parent.document;
    }
  } catch (error) {
    return null;
  }
  return null;
}

function updateShellProfile(name, role, imageData) {
  const fallback = initialsFromName(name);
  const root = parentDocument();
  if (!root) {
    return;
  }

  const nameElement = root.querySelector(".user-name");
  const roleElement = root.querySelector(".user-role");
  if (nameElement) {
    nameElement.textContent = name;
  }
  if (roleElement) {
    roleElement.textContent = role;
  }

  paintAvatar(root.querySelector(".header-avatar"), imageData, fallback);
  paintAvatar(root.querySelector(".user-avatar"), imageData, fallback);
}

function updateAvatarDisplay(imageData) {
  const name = document.getElementById("profileFullName").value.trim() || "Lan Anh";
  paintAvatar(document.getElementById("avatarPreview"), imageData, initialsFromName(name));
  updateShellProfile(
    name,
    document.getElementById("profileRole").value.trim() || "Phóng viên",
    imageData
  );
}

function fillSettingsForm(settings) {
  document.getElementById("profileFullName").value = settings.profile.fullName;
  document.getElementById("profileRole").value = settings.profile.role;
  document.getElementById("profileEmail").value = settings.profile.email;
  document.getElementById("profileNewsroomInput").value = settings.profile.newsroom;

  document.getElementById("notifyReviewInput").checked = settings.notifications.articleReview;
  document.getElementById("notifyCommentInput").checked = settings.notifications.newComment;
  document.getElementById("notifySourceInput").checked = settings.notifications.newSource;
  document.getElementById("notifyPublishInput").checked = settings.notifications.publishReminder;
  document.getElementById("notifyAiInput").checked = settings.notifications.aiSuggestion;

  document.getElementById("assistantLanguageInput").value = settings.assistant.replyLanguage;
  document.getElementById("assistantToneInput").value = settings.assistant.tone;
  document.getElementById("assistantFactCheckInput").checked = settings.assistant.autoFactCheck;
}

function showToast(message) {
  const toast = document.getElementById("toast-msg");
  document.getElementById("toast-text").textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timerId);
  showToast.timerId = window.setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

function showTab(tabId) {
  document.querySelectorAll(".settings-tab-item").forEach(function (tab) {
    tab.classList.toggle("active", tab.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-pane").forEach(function (pane) {
    pane.classList.toggle("active", pane.id === tabId);
  });
}

function handleSaveSettings() {
  const fullName = document.getElementById("profileFullName").value.trim();
  const role = document.getElementById("profileRole").value.trim();
  const email = document.getElementById("profileEmail").value.trim();
  const newsroom = document.getElementById("profileNewsroomInput").value.trim();
  const nextPassword = document.getElementById("newPasswordInput").value;

  if (!fullName || !role || !email || !newsroom) {
    showToast("Hãy điền đủ thông tin hồ sơ và tòa soạn");
    showTab(!fullName || !role || !email ? "tab-profile" : "tab-editorial");
    return;
  }

  if (!email.includes("@")) {
    showToast("Email chưa đúng định dạng");
    showTab("tab-profile");
    return;
  }

  if (nextPassword && nextPassword.length < 8) {
    showToast("Mật khẩu mới cần ít nhất 8 ký tự");
    showTab("tab-security");
    return;
  }

  const nextSettings = {
    profile: {
      fullName: fullName,
      role: role,
      email: email,
      newsroom: newsroom
    },
    notifications: {
      articleReview: document.getElementById("notifyReviewInput").checked,
      newComment: document.getElementById("notifyCommentInput").checked,
      newSource: document.getElementById("notifySourceInput").checked,
      publishReminder: document.getElementById("notifyPublishInput").checked,
      aiSuggestion: document.getElementById("notifyAiInput").checked
    },
    assistant: {
      replyLanguage: document.getElementById("assistantLanguageInput").value,
      tone: document.getElementById("assistantToneInput").value,
      autoFactCheck: document.getElementById("assistantFactCheckInput").checked
    }
  };

  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings));
  localStorage.setItem("userFullName", fullName);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", role);

  if (currentAvatarData) {
    localStorage.setItem("userAvatar", currentAvatarData);
  } else {
    localStorage.removeItem("userAvatar");
  }

  updateAvatarDisplay(currentAvatarData);
  document.getElementById("currentPasswordInput").value = "";
  document.getElementById("newPasswordInput").value = "";
  showToast("Đã lưu các thay đổi thành công!");
}

function initSettingsEvents() {
  const settings = loadSettings();
  fillSettingsForm(settings);
  currentAvatarData = localStorage.getItem("userAvatar") || null;
  updateAvatarDisplay(currentAvatarData);

  document.querySelectorAll(".settings-tab-item").forEach(function (tab) {
    tab.addEventListener("click", function () {
      showTab(tab.getAttribute("data-tab"));
    });
  });

  document.getElementById("btnUploadAvatar").addEventListener("click", function () {
    document.getElementById("inputAvatarFile").click();
  });

  document.getElementById("inputAvatarFile").addEventListener("change", function (event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      showToast("Ảnh quá lớn, hãy chọn ảnh nhỏ hơn 3MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      currentAvatarData = String(reader.result || "");
      updateAvatarDisplay(currentAvatarData);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("btnRemoveAvatar").addEventListener("click", function () {
    currentAvatarData = null;
    updateAvatarDisplay(null);
  });

  document.getElementById("profileFullName").addEventListener("input", function () {
    if (!currentAvatarData) {
      updateAvatarDisplay(null);
    }
  });

  document.getElementById("btn-save-settings").addEventListener("click", handleSaveSettings);
}

document.addEventListener("DOMContentLoaded", initSettingsEvents);
