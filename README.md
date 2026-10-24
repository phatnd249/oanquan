# CỘI - Landing Page Dự Án Di Sản & Bản Sắc Việt

Cấu trúc dự án Landing Page tinh gọn, chuẩn SEO, tối ưu tốc độ và sẵn sàng triển khai trực tiếp lên **GitHub Pages** không cần build step phức tạp.

---

## 📁 Cấu Trúc Thư Mục (Project Structure)

```text
coi/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions tự động deploy lên GitHub Pages khi push
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design Tokens (màu sắc, font chữ, spacing, radius, shadow)
│   │   ├── base.css            # Reset CSS, typography và utility classes
│   │   ├── components.css      # Header/Nav, Buttons, Cards, Badges, Form Inputs
│   │   ├── sections.css        # Bố cục từng section (Hero, About, Features, Stats, Footer)
│   │   └── style.css           # Master stylesheet tổng hợp
│   ├── js/
│   │   ├── main.js             # Logic menu mobile, sticky navbar, smooth scroll, form
│   │   └── animations.js       # Hiệu ứng scroll reveal & số nhảy tự động (stats counter)
│   ├── images/
│   │   ├── branding/           # Logo, biểu trưng thương hiệu (logo.png, logo-badge.png)
│   │   ├── hero/               # Banner và ảnh minh họa chính
│   │   ├── icons/              # Biểu tượng SVG / Icons
│   │   └── favicon.svg         # Favicon trình duyệt
│   └── fonts/                  # (Tùy chọn) Thư mục chứa web font nếu không dùng Google Fonts
├── index.html                  # File HTML chính chuẩn Semantic & SEO
├── 404.html                    # Trang báo lỗi 404 tùy chỉnh chuẩn GitHub Pages
├── .nojekyll                   # Vô hiệu hóa Jekyll để GitHub Pages load tài nguyên tĩnh nhanh nhất
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages

Dự án đã được cấu hình sẵn đường dẫn tương đối (`./assets/...`), hỗ trợ 2 cách deploy:

### Cách 1: Deploy trực tiếp từ nhánh `main` (Đơn giản nhất - Khuyên dùng)
1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "Khởi tạo landing page CỘI"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
2. Vào GitHub Repository -> **Settings** -> mục **Pages** (cột trái).
3. Tại phần **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn `main` và thư mục `/ (root)`.
   - Bấm **Save**.
4. Chờ 1 - 2 phút, website của bạn sẽ hoạt động tại địa chỉ:
   `https://<tai-khoan>.github.io/<ten-repo>/`

### Cách 2: Deploy qua GitHub Actions (Đã có sẵn file `.github/workflows/deploy.yml`)
1. Vào **Settings** -> **Pages**.
2. Tại phần **Build and deployment** -> **Source**: Chọn **GitHub Actions**.
3. Mỗi khi bạn `git push` lên `main`, hệ thống sẽ tự động kích hoạt workflow và cập nhật trang web tức thì.

---

## 🎨 Hướng Dẫn Khi Có Bản Thiết Kế

Khi bạn có bản thiết kế chính thức (Figma/Photoshop):
1. **Màu sắc & Font chữ**: Điều chỉnh mã màu tại file `assets/css/variables.css`.
2. **Hình ảnh & Banner**: Thêm hình ảnh mới vào thư mục `assets/images/`.
3. **Nội dung & Section**: Chỉnh sửa hoặc bổ sung các khối thẻ trong file `index.html`.
4. **Hiệu ứng tùy biến**: Thêm animation trong `assets/js/animations.js`.
