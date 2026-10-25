// Key lưu trữ trong LocalStorage
const STORAGE_KEY = 'newsroom_editor_draft';

// 1. Khởi tạo và load dữ liệu cũ khi F5
document.addEventListener('DOMContentLoaded', () => {
  loadSavedDraft();
  initToolbarCommands();
  initAutoSave();
  initImageUpload();
  initAiFeatures();
  calculateWordCount();
});

// 2. Lấy dữ liệu đã lưu từ LocalStorage
function loadSavedDraft() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const draft = JSON.parse(savedData);
    if (draft.title) document.getElementById('articleTitle').value = draft.title;
    if (draft.category) {
      document.getElementById('articleCategory').value = draft.category;
      document.getElementById('categoryBreadcrumb').textContent = draft.category;
    }
    if (draft.priority) document.getElementById('articlePriority').value = draft.priority;
    if (draft.content) document.getElementById('editorBody').innerHTML = draft.content;
    if (draft.coverImg) showCoverPreview(draft.coverImg);
    if (draft.lastSaved) updateSaveStatus(draft.lastSaved);
  } catch (e) {
    console.error('Lỗi đọc nháp:', e);
  }
}

// 3. Lưu dữ liệu tự động
function saveDraft() {
  const draftData = {
    title: document.getElementById('articleTitle').value,
    category: document.getElementById('articleCategory').value,
    priority: document.getElementById('articlePriority').value,
    content: document.getElementById('editorBody').innerHTML,
    coverImg: document.getElementById('coverPreviewImg').src || '',
    lastSaved: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
  updateSaveStatus(draftData.lastSaved);
}

function updateSaveStatus(timeStr) {
  const statusEl = document.getElementById('saveStatus');
  if (statusEl) statusEl.textContent = `• Đã lưu ${timeStr}`;
}

// 4. Bắt sự kiện tự động lưu khi người dùng gõ
function initAutoSave() {
  const inputs = [
    document.getElementById('articleTitle'),
    document.getElementById('articleCategory'),
    document.getElementById('articlePriority')
  ];

  inputs.forEach(el => {
    if (el) el.addEventListener('change', () => {
      if (el.id === 'articleCategory') {
        document.getElementById('categoryBreadcrumb').textContent = el.value;
      }
      saveDraft();
    });
  });

  const editor = document.getElementById('editorBody');
  if (editor) {
    editor.addEventListener('input', () => {
      calculateWordCount();
      saveDraft(); // Tự động lưu sau mỗi thao tác gõ
    });
  }

  // Nút bấm Lưu nháp thủ công
  document.getElementById('btnSaveDraft').addEventListener('click', () => {
    saveDraft();
    alert('Đã lưu bản nháp thành công!');
  });

  // Nút Gửi duyệt
  document.getElementById('btnSubmitReview').addEventListener('click', () => {
    saveDraft();
    alert('Bài viết đã được gửi duyệt!');
  });
}

// 5. Tính số từ và thời gian đọc
function calculateWordCount() {
  const text = document.getElementById('editorBody').innerText || '';
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const count = words.length;

  document.getElementById('wordCount').textContent = `${count} từ`;
  const readTime = Math.max(1, Math.ceil(count / 200));
  document.getElementById('readingTime').textContent = `Thời gian đọc ${readTime} phút`;
}

// 6. Xử lý các nút Toolbar Soạn thảo (In đậm, nghiêng, H1, H2...)
function initToolbarCommands() {
  const buttons = document.querySelectorAll('.tool-btn[data-command]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-command');
      const value = btn.getAttribute('data-value') || null;

      if (command === 'h1' || command === 'h2') {
        document.execCommand('formatBlock', false, `<${command}>`);
      } else if (command === 'createLink') {
        const url = prompt('Nhập đường dẫn URL:');
        if (url) document.execCommand('createLink', false, url);
      } else {
        document.execCommand(command, false, value);
      }
      saveDraft();
    });
  });
}

// 7. Tải ảnh bìa
function initImageUpload() {
  const btnSelect = document.getElementById('btnSelectMedia');
  const fileInput = document.getElementById('coverFileInput');

  btnSelect.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        showCoverPreview(evt.target.result);
        saveDraft();
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('btnRemoveCover').addEventListener('click', () => {
    document.getElementById('coverDropzone').style.display = 'flex';
    document.getElementById('coverPreviewContainer').style.display = 'none';
    document.getElementById('coverPreviewImg').src = '';
    saveDraft();
  });
}

function showCoverPreview(src) {
  if (!src) return;
  document.getElementById('coverDropzone').style.display = 'none';
  const preview = document.getElementById('coverPreviewContainer');
  preview.style.display = 'block';
  document.getElementById('coverPreviewImg').src = src;
}

// 8. Tương tác với gợi ý AI
function initAiFeatures() {
  const btnApply = document.getElementById('btnApplyAiTitle');
  if (btnApply) {
    btnApply.addEventListener('click', () => {
      const suggested = document.getElementById('aiSuggestedTitle').textContent.trim();
      document.getElementById('articleTitle').value = suggested;
      saveDraft();
      alert('Đã áp dụng tiêu đề gợi ý từ AI!');
    });
  }
}