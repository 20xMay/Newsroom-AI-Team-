// =========================================================================
// TRỢ LÝ NEWSROOM AI - KẾT NỐI SERVER AI TỰ DO (MIỄN PHÍ 100% - KHÔNG CẦN KEY)
// =========================================================================

const STORAGE_CHATS_KEY = "newsroom_ai_chats";

// Lịch sử chat mặc định
const defaultHistory = [
  { id: 1, title: "Gợi ý tiêu đề bài AI", date: "Hôm nay", messages: [] },
  { id: 2, title: "Tóm tắt báo cáo kinh tế", date: "Hôm nay", messages: [] },
  { id: 3, title: "Kiểm tra giọng văn", date: "Hôm qua", messages: [] },
  { id: 4, title: "Nguồn cho bài giáo dục", date: "Hôm qua", messages: [] }
];

let currentChatId = 1;

document.addEventListener("DOMContentLoaded", () => {
  initChatHistory();
  initChatEvents();
});

// Quản lý LocalStorage
function getChatsFromStorage() {
  const data = localStorage.getItem(STORAGE_CHATS_KEY);
  if (data) return JSON.parse(data);
  localStorage.setItem(STORAGE_CHATS_KEY, JSON.stringify(defaultHistory));
  return defaultHistory;
}

function saveChatsToStorage(chats) {
  localStorage.setItem(STORAGE_CHATS_KEY, JSON.stringify(chats));
  renderSidebarHistory();
}

// Render Sidebar bên trái
function renderSidebarHistory() {
  const container = document.getElementById("chatHistoryList");
  if (!container) return;

  const chats = getChatsFromStorage();
  container.innerHTML = "";

  chats.forEach((chat) => {
    const item = document.createElement("div");
    item.className = `chat-history-item ${chat.id === currentChatId ? "active" : ""}`;
    item.innerHTML = `
      <i class="fa-regular fa-file-lines chat-icon"></i>
      <span class="chat-title">${escapeHtml(chat.title)}</span>
      <i class="fa-solid fa-ellipsis chat-more-btn" onclick="toggleChatMenu(event, ${chat.id})"></i>
      <div class="chat-item-menu" id="menu_${chat.id}">
        <button class="chat-menu-btn-delete" onclick="deleteChat(event, ${chat.id})">
          <i class="fa-solid fa-trash-can"></i> Xóa
        </button>
      </div>
    `;
    item.addEventListener("click", () => loadChatSession(chat.id));
    container.appendChild(item);
  });
}

function toggleChatMenu(event, id) {
  event.stopPropagation();
  document.querySelectorAll(".chat-item-menu").forEach((m) => m.classList.remove("show"));
  const targetMenu = document.getElementById(`menu_${id}`);
  if (targetMenu) targetMenu.classList.toggle("show");
}

document.addEventListener("click", () => {
  document.querySelectorAll(".chat-item-menu").forEach((m) => m.classList.remove("show"));
});

function deleteChat(event, id) {
  event.stopPropagation();
  if (confirm("Bạn có chắc chắn muốn xóa cuộc trò chuyện này không?")) {
    let chats = getChatsFromStorage();
    chats = chats.filter((c) => c.id !== id);
    
    if (chats.length === 0) {
      currentChatId = Date.now();
      chats.push({ id: currentChatId, title: "Cuộc trò chuyện mới", date: "Hôm nay", messages: [] });
    } else if (currentChatId === id) {
      currentChatId = chats[0].id;
    }

    saveChatsToStorage(chats);
    loadChatSession(currentChatId);
  }
}

function initChatHistory() {
  renderSidebarHistory();
}

function loadChatSession(id) {
  currentChatId = id;
  renderSidebarHistory();

  const chats = getChatsFromStorage();
  const currentChat = chats.find((c) => c.id === id);

  const messageList = document.getElementById("chatMessageList");
  messageList.innerHTML = `
    <div class="chat-message message-ai message-welcome">
      <div class="msg-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="msg-content-wrapper">
        <div class="welcome-box">
          <h2>Xin chào Lan Anh, tôi có thể giúp gì cho bạn?</h2>
          <p>Tôi có thể hỗ trợ lên ý tưởng, tóm tắt tài liệu, cải thiện bài viết hoặc kiểm tra nguồn tin.</p>
        </div>
      </div>
    </div>
  `;

  if (currentChat && currentChat.messages) {
    currentChat.messages.forEach((msg) => {
      appendMessageUI(msg.sender, msg.text, false);
    });
  }
}

function initChatEvents() {
  const sendBtn = document.getElementById("btnSendMessage");
  const inputEl = document.getElementById("userChatInput");
  const newChatBtn = document.getElementById("btnNewChat");

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserSend();
    }
  });

  sendBtn.addEventListener("click", handleUserSend);

  newChatBtn.addEventListener("click", () => {
    const chats = getChatsFromStorage();
    const newId = Date.now();
    const newChat = { id: newId, title: "Cuộc trò chuyện mới", date: "Hôm nay", messages: [] };
    chats.unshift(newChat);
    saveChatsToStorage(chats);
    loadChatSession(newId);
  });

  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".prompt-chip");
    if (chip) {
      const promptText = chip.getAttribute("data-prompt");
      if (promptText) {
        inputEl.value = promptText;
        handleUserSend();
      }
    }
  });
}

// Xử lý gửi tin nhắn
async function handleUserSend() {
  const inputEl = document.getElementById("userChatInput");
  const text = inputEl.value.trim();
  if (!text) return;

  // 1. Hiện tin nhắn người dùng
  appendMessageUI("user", text, true);
  inputEl.value = "";

  // 2. Hiện hiệu ứng gõ
  const loadingId = appendTypingIndicator();

  // 3. Gọi Server AI Tự do
  try {
    const reply = await callFreeAiServer(text);
    removeTypingIndicator(loadingId);
    appendMessageUI("ai", reply, true);
  } catch (err) {
    console.error("Lỗi AI Server:", err);
    removeTypingIndicator(loadingId);
    appendMessageUI("ai", "⚠️ Có lỗi xảy ra khi xử lý phản hồi. Vui lòng thử lại câu hỏi khác!", true);
  }
}

// HÀM GỌI API AI TỰ DO TỪ POLLINATIONS (KHÔNG CẦN API KEY)
async function callFreeAiServer(userPrompt) {
  const chats = getChatsFromStorage();
  const currentChat = chats.find((c) => c.id === currentChatId);

  const messages = [
    {
      role: "system",
      content: "Bạn là Trợ lý AI thông minh (Newsroom AI). Hãy trả lời người dùng bằng tiếng Việt chính xác, tự nhiên, ngắn gọn và hữu ích cho bất kỳ câu hỏi nào."
    }
  ];

  // Đưa lịch sử trò chuyện vào cho AI ghi nhớ ngữ cảnh
  if (currentChat && currentChat.messages) {
    currentChat.messages.forEach(msg => {
      messages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      });
    });
  }

  messages.push({ role: "user", content: userPrompt });

  const response = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages,
      model: "openai"
    })
  });

  if (!response.ok) {
    throw new Error("Lỗi phản hồi từ máy chủ AI");
  }

  const resultText = await response.text();
  return resultText;
}

function appendMessageUI(sender, text, shouldSave = true) {
  const list = document.getElementById("chatMessageList");
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message message-${sender}`;

  if (sender === "user") {
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
      <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="msg-content-wrapper">
        <div class="msg-bubble">${formatAiResponse(text)}</div>
        <div class="msg-actions">
          <button class="btn-msg-action" onclick="copyText(this)"><i class="fa-regular fa-copy"></i> Sao chép</button>
          <button class="btn-msg-action"><i class="fa-solid fa-arrow-right-to-bracket"></i> Chèn vào bài</button>
        </div>
      </div>
    `;
  }

  list.appendChild(msgDiv);
  list.scrollTop = list.scrollHeight;

  if (shouldSave) {
    const chats = getChatsFromStorage();
    const currentChat = chats.find((c) => c.id === currentChatId);
    if (currentChat) {
      if (currentChat.messages.length === 0) {
        currentChat.title = text.substring(0, 25) + "...";
      }
      currentChat.messages.push({ sender, text });
      saveChatsToStorage(chats);
    }
  }
}

function appendTypingIndicator() {
  const list = document.getElementById("chatMessageList");
  const id = "typing_" + Date.now();
  const div = document.createElement("div");
  div.id = id;
  div.className = "chat-message message-ai";
  div.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
    <div class="msg-bubble typing-indicator"><span></span><span></span><span></span></div>
  `;
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function formatAiResponse(text) {
  return escapeHtml(text)
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function copyText(btn) {
  const bubble = btn.closest(".msg-content-wrapper").querySelector(".msg-bubble");
  navigator.clipboard.writeText(bubble.innerText);
  alert("Đã sao chép nội dung!");
}