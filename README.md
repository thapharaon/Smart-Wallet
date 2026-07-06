# Smart Wallet Pro

Trình quản lý tài chính cá nhân offline với hỗ trợ đa ngân sách.

## Công nghệ

- **Vite** — bundler và dev server
- **Tailwind CSS v4** — utility-first CSS
- **Chart.js** — biểu đồ doughnut thống kê
- **Font Awesome 6** — icon
- **localStorage** — lưu trữ dữ liệu

## Cài đặt

```bash
npm install
```

## Chạy (dev)

```bash
npm run dev
```

Mở trình duyệt tại địa chỉ Vite hiển thị (mặc định `http://localhost:5173`).

## Build

```bash
npm run build
```

Output trong thư mục `dist/`. Mở `dist/index.html` trong trình duyệt hoặc deploy lên static host.

## Cấu trúc thư mục

```
src/
├── main.js              # Entry point, khởi tạo app
├── state.js             # State + localStorage persistence
├── lang.js              # Từ điển đa ngôn ngữ (vi/en)
├── ui.js                # Tab navigation, animation số đếm
├── transactions.js      # CRUD giao dịch, render bảng
├── calendar.js          # Lịch tháng
├── report.js            # Biểu đồ thống kê (Chart.js)
├── budget.js            # Quản lý đa ngân sách
├── settings.js          # Cài đặt, theme, backup, categories
└── style.css            # Tailwind import + CSS tùy chỉnh
```

## Tính năng

- Ghi chép giao dịch thu/chi
- Lịch tháng trực quan
- Biểu đồ doughnut thống kê
- Thiết lập đa ngân sách với cảnh báo vàng/đỏ
- Xuất/nhập dữ liệu JSON
- Chủ đề màu sắc (teal, blue, purple, rose, orange)
- Đa ngôn ngữ (Tiếng Việt / English)

## Dữ liệu

Tất cả dữ liệu được lưu trong `localStorage` với các key prefix `smart_wallet_`.
Xoá dữ liệu: Settings → Khu vực nguy hiểm → Xoá tất cả dữ liệu.
