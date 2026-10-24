# CỘI - Landing Page (Vite & GitHub Pages)

Landing Page tôn vinh bản sắc và di sản truyền thống Việt Nam. Dự án được xây dựng với **Vite**, chia nhỏ các module HTML Partials, Vanilla CSS Tokens và đã cấu hình sẵn sàng tự động build & deploy lên **GitHub Pages**.

---

## 📁 Cấu Trúc Thư Mục Chuẩn

```text
/
├── index.html                       # Entry HTML chính, nhúng các partials và main.js
├── vite.config.js                   # Cấu hình Vite (base relative & HTML Partials plugin)
├── package.json                     # Scripts & devDependencies
├── .env.example                     # Biến môi trường mẫu (VITE_SITE_URL, ...)
├── .gitignore                       # Bỏ qua node_modules, dist, .env...
├── .github/
│   └── workflows/
│       └── deploy.yml               # Tự động build Vite & deploy lên GitHub Pages
├── public/
│   ├── robots.txt                   # Quy tắc thu thập dữ liệu tìm kiếm
│   ├── sitemap.xml                  # Bản đồ website chuẩn SEO
│   ├── 404.html                     # Trang 404 tùy biến
│   ├── CNAME                        # Tên miền tùy chỉnh (nếu có)
│   ├── favicon.svg                  # Favicon trình duyệt
│   ├── og-image.svg                 # Ảnh Open Graph chuẩn 1200x630
│   └── .nojekyll                    # Tắt Jekyll trên GitHub Pages
├── src/
│   ├── partials/                    # Các khối giao diện HTML tách nhỏ
│   │   ├── header.html              # Thanh điều hướng và menu
│   │   ├── hero.html                # Banner mở đầu và CTA
│   │   ├── about.html               # Câu chuyện thương hiệu Cội
│   │   ├── features.html            # Điểm nổi bật & giá trị cốt lõi
│   │   ├── stats.html               # Thống kê & chỉ số ấn tượng
│   │   ├── showcase.html            # Bộ sưu tập hình ảnh
│   │   ├── cta.html                 # Khối kêu gọi hành động & form
│   │   └── footer.html              # Chân trang & liên kết
│   ├── styles/
│   │   ├── tokens.css               # Biến màu, font, spacing, border, breakpoint
│   │   ├── base.css                 # Reset CSS, typography & animation
│   │   ├── components.css           # Buttons, Cards, Badges, Inputs
│   │   └── sections/                # Style riêng biệt cho từng section
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── features.css
│   │       ├── stats.css
│   │       ├── showcase.css
│   │       ├── cta.css
│   │       ├── footer.css
│   │       └── index.css
│   ├── scripts/
│   │   ├── main.js                  # Entry script chính của Vite
│   │   ├── menu.js                  # Xử lý mobile menu, sticky nav, scrollspy
│   │   ├── posts.js                 # Dữ liệu bài viết, câu chuyện, chỉ số
│   │   ├── images.js                # Khai báo & export đường dẫn ảnh tập trung
│   │   └── config.js                # Cấu hình website & đọc biến môi trường
│   └── assets/
│       ├── images/                  # Thư mục hình ảnh & logo thương hiệu
│       └── icons/                   # Thư mục chứa biểu tượng SVG
└── docs/
    ├── PROJECT_NOTES.md             # Ghi chú kỹ thuật & hướng dẫn lập trình
    └── ASSETS_TODO.md               # Danh mục checklist tài nguyên cần bổ sung
```

---

## ⚡ Các Lệnh Phát Triển

```bash
# 1. Cài đặt thư viện (đã cài đặt sẵn)
npm install

# 2. Khởi chạy dev server (HMR tức thì tại http://localhost:3000)
npm run dev

# 3. Build sản phẩm tối ưu ra thư mục dist/
npm run build

# 4. Xem thử bản build production
npm run preview
```

---

## 🚀 Triển Khai Lên GitHub Pages

File `.github/workflows/deploy.yml` đã được cấu hình tự động:
1. Đẩy mã nguồn lên repository GitHub của bạn (`git push origin main`).
2. Trên GitHub, vào **Settings** -> **Pages**.
3. Tại mục **Build and deployment** > **Source**: Chọn **GitHub Actions**.
4. GitHub Actions sẽ tự động chạy `npm install`, `npm run build` và deploy thư mục `dist/` lên website GitHub Pages của bạn mà không cần bất kỳ thao tác thủ công nào.
