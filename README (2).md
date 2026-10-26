# 📰 Newsroom AI – Quy trình Biên tập Nội dung Số Minh bạch

BTL-31, học phần CSE122 – Phát triển ứng dụng Web cơ bản (Khoa CNTT – Đại học Thủy Lợi). Website tĩnh 13 màn hình cho 4 vai trò, tích hợp dữ liệu giả lập JSON & LocalStorage engine.

- **Bản deploy (GitHub Pages):** [https://20xmay.github.io/Newsroom-AI-Team-/](https://20xmay.github.io/Newsroom-AI-Team-/)
- **Mã nguồn (Repository):** [https://github.com/20xMay/Newsroom-AI-Team-](https://github.com/20xMay/Newsroom-AI-Team-) *(hoặc [Pet_Companion](https://github.com/vutruonganh/Pet_Companion))*
- **Chạy local:** Mở tệp `index.html` hoặc bấm *Open with Live Server* trong VS Code.
- **Tài liệu đầy đủ:** [`docs/README.md`](docs/README.md)

---

## 📄 Ngữ cảnh Bài toán

Sản xuất nội dung trong tòa soạn tin tức hiện đại diễn ra với tốc độ rất nhanh, trải qua nhiều khâu: đề xuất (pitching), soạn thảo (draft), kiểm duyệt (review), đối soát nguồn (fact-check) và xuất bản (publish). Việc quản lý qua các tin nhắn rời rạc (chat/email) làm thất lạc lịch sử quyết định và thiếu tính minh bạch. **Newsroom AI** được xây dựng nhằm số hóa toàn bộ quy trình biên tập tin tức trên một nền tảng Web Frontend duy nhất, liên thông dữ liệu giữa 4 vai trò và hỗ trợ các trợ lý AI UX có thể giải thích được.

---

## 🎯 Phát biểu Vấn đề & Mục tiêu

### Phát biểu Vấn đề (Problem Statement)

| Mã | Vấn đề | Đối tượng ảnh hưởng |
| :---: | :--- | :--- |
| **P1** | Draft bài viết và nhận xét (feedback) bị rời rạc qua nhiều kênh chat/email, làm mất lịch sử quyết định. | Phóng viên & Biên tập viên |
| **P2** | Các tuyên bố (claim), số liệu trong bài không được gắn trực tiếp với nguồn kiểm chứng tin cậy. | Fact-checker (Kiểm chứng viên) |
| **P3** | Tòa soạn thiếu góc nhìn tổng quan theo thời gian thực về lịch xuất bản và tiến độ từng bài viết. | Biên tập viên & Ban quản trị |
| **P4** | Quản trị viên khó phát hiện các điểm nghẽn (bottleneck) đình trệ trong quy trình xuất bản. | Quản trị viên |

### Mục tiêu Sản phẩm (Objectives)

| Mã | Mục tiêu Chi tiết |
| :---: | :--- |
| **O1** | Mỗi vai trò có cổng làm việc riêng, đăng nhập đúng phân quyền, bảo đảm có ít nhất 3 màn hình nghiệp vụ độc lập. |
| **O2** | Dữ liệu đọc/ghi qua LocalStorage & JSON giả lập, giữ nguyên sau F5; tuyệt đối không hardcode dữ liệu trong HTML. |
| **O3** | Thao tác CRUD thực chất: Tạo mới, Đọc, Cập nhật, Hủy/Lưu trữ/Khóa tài khoản theo đúng vòng đời tin tức. |
| **O4** | Đáp ứng đầy đủ các trạng thái Normal, Loading, Empty, Error, Success, Pending, Rejected, Archived. |
| **O5** | Ba tính năng AI UX chuẩn 6 bước, có khối giải thích lý do (Explainability), quyền kiểm soát và kịch bản Failure UX. |
| **O6** | Giao diện nhất quán theo Design System (`:root` CSS), responsive 320px–1024px+, đáp ứng chuẩn A11y cơ bản. |
| **O7** | Tuân thủ quy trình Git/GitHub (Branch, Conventional Commit, PR Peer Review), bảng Trello và bộ video OBS minh chứng. |

---

## 👥 Các Vai trò Nghiệp vụ

| Vai trò | Tài khoản demo | Cổng vào (`pages/`) | Quyền hạn & Trách nhiệm chính |
| :--- | :--- | :--- | :--- |
| **Phóng viên** | `reporter@newsroom.ai` | `reporter-pitch-management.html` | Tạo pitch ý tưởng, soạn draft bài viết, theo dõi trạng thái biên tập, sử dụng Trợ lý AI-1. |
| **Biên tập viên** | `editor@newsroom.ai` | `editor-editorial-queue.html` | Duyệt bài viết, ghi chú phản hồi, lên lịch xuất bản, sử dụng Trợ lý AI-2. |
| **Fact-checker** | `factchecker@newsroom.ai` | `factchecker-factcheck-queue.html` | Thẩm định các claim nghi vấn, quản lý thư viện nguồn tin uy tín, sử dụng Trợ lý AI-3. |
| **Quản trị viên** | `admin@newsroom.ai` | `admin-newsroom-analytics.html` | Thống kê hiệu suất tòa soạn, quản lý chuyên mục (taxonomy), quản lý và khóa tài khoản người dùng. |

*Mật khẩu chung cho tất cả tài khoản demo:* `demo123`. Tài khoản `locked@newsroom.ai` dùng để thử nghiệm trạng thái bị khóa.

---

## 🔄 Luồng Người dùng (User Flow)

```text
[Trang chủ / Đăng nhập] 
          ↓
[Thực hiện nghiệp vụ theo Vai trò (Phóng viên / BTV / Fact-checker / Admin)]
          ↓
[Xử lý bài viết & Kích hoạt Trợ lý AI UX (AI-1 / AI-2 / AI-3)]
          ↓
[AI Processing ➔ Trả kết quả + Khối Giải thích lý do & Độ tin cậy %]
          ↓
[Người dùng kiểm soát: Chấp nhận / Chỉnh sửa / Từ chối / Lưu]
          ↓
[Lưu bền vững vào LocalStorage & Cập nhật UI thời gian thực]
```

1. **Đăng nhập & Chuyển cổng:** `index.html` kiểm tra tài khoản trong `accounts` (LocalStorage) $\rightarrow$ ghi session $\rightarrow$ chuyển hướng đúng cổng vai trò.
2. **Phóng viên Soạn bài & AI-1:** `reporter-pitch-management.html` $\rightarrow$ tạo pitch $\rightarrow$ chuyển sang `reporter-article-draft.html` soạn bài $\rightarrow$ kích hoạt **AI-1** gợi ý tiêu đề $\rightarrow$ bấm *Chấp nhận* để lưu tiêu đề được chọn.
3. **BTV Duyệt bài & AI-2:** `editor-editorial-queue.html` hiển thị danh sách bài chờ $\rightarrow$ mở bài viết $\rightarrow$ **AI-2** tự động tóm tắt bài viết thành 3 ý cốt lõi $\rightarrow$ BTV phê duyệt bài và đẩy sang `editor-publishing-calendar.html`.
4. **Fact-checker Xác minh & AI-3:** `factchecker-factcheck-queue.html` dùng **AI-3** để tự động quét và highlight các phát ngôn/con số thiếu nguồn $\rightarrow$ gắn link đối soát từ `factchecker-source-library.html`.
5. **Admin Quản trị Tòa soạn:** `admin-newsroom-analytics.html` hiển thị biểu đồ thống kê điểm nghẽn tòa soạn $\rightarrow$ quản lý danh mục và khóa/mở tài khoản tại `admin-user-management.html`.

---

## 📊 Bảng Kiểm kê Màn hình (Screen Inventory)

> Chi tiết 13 màn hình độc lập đã được duyệt, phân công Lát cắt dọc và truy vết minh chứng 1:1.

| Nhóm Màn hình | Số lượng | Danh sách Tệp (`pages/`) | Chức năng chính & Thao tác CRUD |
| :--- | :---: | :--- | :--- |
| **Shared** | 1 | `index.html` | Trang chủ điều hướng tổng quan & Role Switcher nhanh. |
| **Phóng viên** | 3 | `reporter-pitch-management.html`<br>`reporter-article-draft.html`<br>`reporter-article-status.html` | Quản lý ý tưởng (C/R), Soạn thảo bài viết kèm AI-1 (C/R/U), Theo dõi trạng thái & Lưu trữ bài (R/U/Archive). |
| **Biên tập viên** | 3 | `editor-editorial-queue.html`<br>`editor-article-review.html`<br>`editor-publishing-calendar.html` | Hàng chờ duyệt bài kèm AI-2 (R/U), Đánh giá chi tiết bài & Comment (R/U), Lịch xuất bản tin tức (C/R/U/D). |
| **Fact-checker** | 3 | `factchecker-factcheck-queue.html`<br>`factchecker-claim-review.html`<br>`factchecker-source-library.html` | Hàng chờ thẩm định claim kèm AI-3 (R/U), Đánh giá claim & Gắn mác nguồn (C/R/U), Thư viện nguồn tin uy tín (C/R/U/D). |
| **Quản trị viên** | 3 | `admin-category-management.html`<br>`admin-user-management.html`<br>`admin-newsroom-analytics.html` | Quản lý danh mục bài viết (C/R/U/D), Phân quyền & Khóa người dùng (C/R/U/Lock), Báo cáo hiệu suất Dashboard (R). |
| **TỔNG CỘNG** | **13** | | **Được phân công Lát cắt dọc trọn vẹn cho 3 sinh viên.** |

---

## 🤖 Tính năng AI Product UX

Tất cả tính năng AI được thiết kế theo đúng quy trình **6 bước tương tác chuẩn UX**:
`Input` ➔ `Processing (Skeleton Loader)` ➔ `Output` ➔ `Explainability (Độ tin cậy % & Lý do)` ➔ `User Control (Accept/Edit/Reject)` ➔ `Save to State`.

```text
[1. Input] -> Người dùng nhập/chọn dữ liệu đầu vào.
      ↓
[2. Processing] -> Hiển thị trạng thái AI đang phân tích (Loading Spinner / Skeleton).
      ↓
[3. Output] -> Trả về kết quả hiển thị dạng Thẻ / Checklist / Highlight.
      ↓
[4. Explainability] -> Khối giải thích: "Vì sao AI đề xuất?" + Chỉ số Confidence Score %.
      ↓
[5. User Control] -> Nút hành động: [Chấp nhận] [Chỉnh sửa] [Từ chối] [Tạo lại].
      ↓
[6. Save / Apply] -> Khi bấm Chấp nhận/Lưu, kết quả cập nhật thực sự vào LocalStorage & UI.
```

### 03 Tính năng AI đặc thù:
1. **AI-1: Headline Assistant (`reporter-article-draft.html`):** Gợi ý 3 phong cách tiêu đề (Chuẩn báo chí, SEO, Thu hút) kèm độ tin cậy % và từ khóa chính.
2. **AI-2: Draft Summarizer (`editor-editorial-queue.html`):** Tự động tóm tắt bài viết dài thành 3 ý chính giúp BTV duyệt nhanh nội dung.
3. **AI-3: Source-needed Detector (`factchecker-factcheck-queue.html`):** Tự động quét và phát hiện các tuyên bố (claim), số liệu chưa được gắn nguồn kiểm chứng.

### Kịch bản AI Failure / Uncertainty UX:
* Khi văn bản nhập vào quá ngắn (< 15 từ) hoặc mâu thuẫn, hệ thống hiển thị cảnh báo: *"AI chưa đủ dữ liệu để phân tích chính xác (Độ tin cậy 35%)"* kèm nút **[Bổ sung thông tin]** và **[Chuyển sang nhập thủ công]**.

---

## 🛠️ Công nghệ & Kiến trúc Mã nguồn

- **HTML5 Semantic & CSS3:** Sử dụng thẻ ngữ nghĩa (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`), hệ thống biến CSS Design Tokens (`:root`), Flexbox, CSS Grid và Responsive Media Queries (`css/responsive.css`).
- **JavaScript Engine (ES6+):** Xử lý DOM thuần, Event Delegation, Form Validation, Debounce Search, LocalStorage Data Engine (`js/api.js`).
- **Dữ liệu Giả lập:** Tệp JSON phong phú trong `assets/data/` (`articles.json`, `sources.json`, `categories.json`).

```text
20xMay-Newsroom-AI-Team/
├── README.md                           # Tài liệu hướng dẫn chính của dự án
├── index.html                          # Trang chủ điều hướng chính & Role Switcher
├── docs/                               # Thư mục tài liệu minh chứng BTL
│   ├── project-proposal.md             # Đề xuất bài toán & Ngữ cảnh
│   ├── screen-inventory.md             # Bảng kiểm kê 13 màn hình chi tiết
│   ├── roles-and-features.md           # Chi tiết Vai trò & Luồng nghiệp vụ
│   └── ai-usage-report.md              # Báo cáo Khai báo Minh bạch AI
├── design/                             # Tài liệu thiết kế UI/UX
│   ├── figma-link.txt                  # Link Figma công khai
│   └── mockups/                        # Hình ảnh Mockup thiết kế
├── pages/                              # Các tệp HTML 12 màn hình theo Role
├── assets/                             # Hình ảnh, icon và tệp dữ liệu JSON
├── css/                                # style.css (Design System) & responsive.css
└── js/                                 # main.js, api.js và các mô-đun JS
```

---

## 👥 Phân công Công việc & Trách nhiệm Chéo

| Sinh viên | Vai trò Phụ trách Chính | Lát cắt Dọc (Vertical Slice) | Trách nhiệm Chéo (Cross-Responsibility) |
| :--- | :--- | :--- | :--- |
| **SV1** | **Phóng viên (Reporter)** | Pitching ➔ Draft ➔ Status (`reporter-*.html`) | Design System (`css/style.css`), Navigation, Role Switcher, Accessibility (A11y). |
| **SV2** | **Biên tập viên (Editor)** | Editorial Queue ➔ Review ➔ Calendar (`editor-*.html`) | Kiến trúc JS Mô-đun (`js/api.js`), Chuẩn hóa dữ liệu LocalStorage, AI UX 6-Step Engine. |
| **SV3** | **Fact-checker & Admin** | Factcheck Queue ➔ Sources ➔ Admin (`factchecker-*.html`, `admin-*.html`) | Responsive Đa thiết bị (Mobile/Tablet/Desktop), Git Management (`dev` ➔ `main`), Deploy & QA. |

---

## 🌿 Quy trình Git & Minh chứng OBS

- **Chiến lược Nhánh:** `main` (Production), `dev` (Tích hợp), các nhánh tính năng `feature/*`.
- **Commit Standard:** Tuân thủ Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `refactor:`).
- **Video OBS Evidence:** 13 video tương ứng 1:1 với 13 màn hình độc lập (đặt tên `SVx-xx-screen-name.mp4`), có webcam mặt sinh viên, giải thích code và live-code commit.

---

## 🤖 Khai báo Sử dụng AI (AI Usage Transparency)

Chi tiết khai báo minh bạch ghi nhận tại [`docs/ai-usage-report.md`](docs/ai-usage-report.md):
- **Công cụ hỗ trợ:** ChatGPT / Claude 3.5 Sonnet hỗ trợ gợi ý cấu trúc dữ liệu JSON và thuật toán từ khóa.
- **Thực chất sinh viên:** 100% mã HTML ngữ nghĩa, CSS Responsive, DOM Manipulation và LocalStorage Logic do sinh viên tự tay lập trình, giải thích trong video OBS và trả lời trong phiên bảo vệ Vấn đáp (Viva).

---

© 2026 **Newsroom AI Team (BTL-31)** – CSE122 Phát triển ứng dụng Web cơ bản – ĐH Thủy Lợi (TLU).