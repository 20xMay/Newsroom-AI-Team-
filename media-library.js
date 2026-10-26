const MEDIA_STORAGE_KEY = "newsroomMediaLibraryV2";
const MAX_PREVIEW_CHARS = 700000;

const defaultMediaItems = [
  {
    id: 1,
    title: "Lớp học thông minh",
    type: "Ảnh",
    size: "2,4 MB",
    date: "24 Thg 6",
    bgClass: "bg-blue-gradient",
    isVideo: false,
    imageSrc: null
  },
  {
    id: 2,
    title: "Thành phố về đêm",
    type: "Ảnh",
    size: "3,1 MB",
    date: "24 Thg 6",
    bgClass: "bg-purple-gradient",
    isVideo: false,
    imageSrc: null
  },
  {
    id: 3,
    title: "Biểu đồ tăng trưởng",
    type: "Đồ họa",
    size: "860 KB",
    date: "24 Thg 6",
    bgClass: "bg-green-gradient",
    isVideo: false,
    imageSrc: null
  },
  {
    id: 4,
    title: "Phỏng vấn chuyên gia",
    type: "Video",
    size: "42 MB",
    date: "24 Thg 6",
    bgClass: "bg-yellow-gradient",
    isVideo: true,
    imageSrc: null
  },
  {
    id: 5,
    title: "Trung tâm dữ liệu",
    type: "Ảnh",
    size: "1,8 MB",
    date: "24 Thg 6",
    bgClass: "bg-slate-gradient",
    isVideo: false,
    imageSrc: null
  },
  {
    id: 6,
    title: "Hội nghị giáo dục",
    type: "Ảnh",
    size: "2,1 MB",
    date: "24 Thg 6",
    bgClass: "bg-pink-gradient",
    isVideo: false,
    imageSrc: null
  }
];

const ACCENT_CLASSES = {
  blue: "bg-blue-gradient",
  purple: "bg-purple-gradient",
  green: "bg-green-gradient",
  yellow: "bg-yellow-gradient",
  slate: "bg-slate-gradient",
  pink: "bg-pink-gradient",
  orange: "bg-yellow-gradient"
};

const TYPE_LABELS = {
  image: "Ảnh",
  video: "Video",
  graphic: "Đồ họa",
  document: "Tài liệu"
};

let mediaItems = [];

function cloneDefaults() {
  return defaultMediaItems.map(function (item) {
    return Object.assign({}, item);
  });
}

function normalizeMediaItem(item) {
  if (item && item.title) {
    return {
      id: item.id,
      title: item.title,
      type: item.type || "Ảnh",
      size: item.size || "",
      date: item.date || "",
      bgClass: item.bgClass || "bg-blue-gradient",
      isVideo: Boolean(item.isVideo),
      imageSrc: item.imageSrc || null
    };
  }

  const typeKey = item && item.type;
  return {
    id: item.id,
    title: item.name || "Tệp media",
    type: TYPE_LABELS[typeKey] || typeKey || "Ảnh",
    size: item.sizeLabel || "",
    date: item.updatedLabel || "",
    bgClass: ACCENT_CLASSES[item.accent] || "bg-blue-gradient",
    isVideo: typeKey === "video",
    imageSrc: item.previewUrl || null
  };
}

function loadMediaItems() {
  const storedValue = localStorage.getItem(MEDIA_STORAGE_KEY);
  if (!storedValue) {
    return cloneDefaults();
  }

  try {
    const parsedItems = JSON.parse(storedValue);
    if (!Array.isArray(parsedItems) || !parsedItems.length) {
      return cloneDefaults();
    }
    return parsedItems.map(normalizeMediaItem);
  } catch (error) {
    return cloneDefaults();
  }
}

function saveMediaItems() {
  const itemsForStorage = mediaItems.map(function (item) {
    const storedItem = Object.assign({}, item);
    if (storedItem.imageSrc && storedItem.imageSrc.length > MAX_PREVIEW_CHARS) {
      storedItem.imageSrc = null;
    }
    return storedItem;
  });

  try {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(itemsForStorage));
  } catch (error) {
    const withoutPreviews = itemsForStorage.map(function (item) {
      return Object.assign({}, item, { imageSrc: null });
    });
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(withoutPreviews));
  }
}

function formatFileSize(byteCount) {
  if (byteCount < 1024 * 1024) {
    return Math.max(1, Math.round(byteCount / 1024)) + " KB";
  }
  return (byteCount / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
}

function showToast(message) {
  const toast = document.getElementById("toast-msg");
  document.getElementById("toast-text").textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timerId);
  showToast.timerId = window.setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

function visibleMediaItems() {
  const query = document.getElementById("mediaSearchInput").value.toLowerCase().trim();
  if (!query) {
    return mediaItems;
  }
  return mediaItems.filter(function (item) {
    return item.title.toLowerCase().includes(query);
  });
}

function renderMediaList() {
  const container = document.getElementById("mediaContainer");
  const items = visibleMediaItems();
  container.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "media-empty";
    empty.textContent = "Không tìm thấy tệp media nào phù hợp";
    container.appendChild(empty);
    return;
  }

  items.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "media-card";

    const thumbnail = document.createElement("div");
    thumbnail.className = "media-thumbnail" + (item.imageSrc ? "" : " " + item.bgClass);

    if (item.imageSrc) {
      const image = document.createElement("img");
      image.src = item.imageSrc;
      image.alt = item.title;
      thumbnail.appendChild(image);
    } else if (item.isVideo) {
      const play = document.createElement("div");
      play.className = "play-icon";
      play.innerHTML = '<i class="fa-solid fa-play"></i>';
      thumbnail.appendChild(play);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "placeholder-text";
      placeholder.textContent = "NEWSROOM";
      thumbnail.appendChild(placeholder);
    }

    const moreButton = document.createElement("button");
    moreButton.className = "btn-more-options";
    moreButton.type = "button";
    moreButton.title = "Xóa tệp";
    moreButton.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
    moreButton.addEventListener("click", function (event) {
      event.stopPropagation();
      mediaItems = mediaItems.filter(function (entry) {
        return entry.id !== item.id;
      });
      saveMediaItems();
      renderMediaList();
      showToast("Đã xóa tệp khỏi thư viện");
    });
    const info = document.createElement("div");
    info.className = "media-info";
    const title = document.createElement("div");
    title.className = "media-title";
    title.textContent = item.title;
    const meta = document.createElement("div");
    meta.className = "media-meta";
    meta.textContent = item.type + " • " + item.size + " • " + item.date;
    info.appendChild(title);
    info.appendChild(meta);

    card.appendChild(thumbnail);
    card.appendChild(info);
    card.appendChild(moreButton);
    container.appendChild(card);
  });
}

function addUploadedFile(file, imageSrc) {
  const isVideo = file.type.indexOf("video/") === 0;
  const fileName = file.name.replace(/\.[^.]+$/, "") || file.name;
  mediaItems.unshift({
    id: Date.now() + Math.floor(Math.random() * 1000),
    title: fileName,
    type: isVideo ? "Video" : "Ảnh",
    size: formatFileSize(file.size),
    date: "Vừa xong",
    bgClass: isVideo ? "bg-yellow-gradient" : "bg-blue-gradient",
    isVideo: isVideo,
    imageSrc: imageSrc || null
  });
  saveMediaItems();
  document.getElementById("mediaSearchInput").value = "";
  renderMediaList();
  showToast("Đã thêm tệp vào thư viện");
}

function initMediaEvents() {
  mediaItems = loadMediaItems();
  const container = document.getElementById("mediaContainer");
  const btnViewGrid = document.getElementById("btnViewGrid");
  const btnViewList = document.getElementById("btnViewList");
  const inputMediaFile = document.getElementById("inputMediaFile");

  document.getElementById("mediaSearchInput").addEventListener("input", renderMediaList);

  btnViewGrid.addEventListener("click", function () {
    btnViewGrid.classList.add("active");
    btnViewList.classList.remove("active");
    container.classList.remove("list-view");
  });

  btnViewList.addEventListener("click", function () {
    btnViewList.classList.add("active");
    btnViewGrid.classList.remove("active");
    container.classList.add("list-view");
  });

  document.getElementById("btnUploadMedia").addEventListener("click", function () {
    inputMediaFile.click();
  });

  inputMediaFile.addEventListener("change", function (event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    files.forEach(function (file) {
      if (file.type.indexOf("image/") === 0 && file.size <= MAX_PREVIEW_CHARS) {
        const reader = new FileReader();
        reader.onload = function () {
          addUploadedFile(file, String(reader.result || ""));
        };
        reader.readAsDataURL(file);
        return;
      }
      addUploadedFile(file, null);
    });
  });

  renderMediaList();
}

document.addEventListener("DOMContentLoaded", initMediaEvents);
