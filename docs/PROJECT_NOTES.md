# PROJECT NOTES — BOARDGAME CỘI (Ô ĂN QUAN)

Ghi chú đặc tả kiến trúc, công nghệ và quy chuẩn xây dựng Landing Page CỘI dựa trên Báo cáo chi tiết và Slide thuyết trình Đồ án tốt nghiệp Đại học Lạc Hồng (2026).

---

## 1. Thông Tin Dự Án
- **Tên thương hiệu:** CỘI
- **Sản phẩm chủ đạo:** Boardgame Ô Ăn Quan (bàn cờ 2 mặt gập 4, quân acrylic, hộp cứng có quai xách)
- **Big Idea:** *"Gìn giữ nét xưa – Kết nối thế hệ."*
- **Key Message:** *"Cùng cội khám phá lại: Miền tuổi thơ Việt"*
- **Tác giả đồ án:** Trần Xuân Nghi, Nguyễn Ngọc Xuân Nhi
- **GVHD:** ThS. Phan Thị Hường
- **Đơn vị:** Ngành Truyền thông Đa phương tiện – Trường Đại học Lạc Hồng (2026)

---

## 2. Hệ Thống Màu & Typography Chuẩn
- **Màu thương hiệu chính:**
  - Teal (`#22A7A4`): Màu chủ đạo, nút bấm, điểm nhấn chính.
  - Cam (`#FAA21D`): CTA nổi bật, huy hiệu, điểm nhấn năng động.
  - Kem (`#FCF3EA`): Nền trang chủ đạo, mang lại cảm giác ấm áp, mộc mạc.
  - Xanh rêu đậm (`#254A45`): Chữ tương phản, footer, roadmap.
  - Màu bổ trợ sản phẩm: `#0DB1B0`, `#87CFCE`, `#E38E32`, `#EADCA8`, `#8C9B78`.
- **Typography:**
  - Display / Tiêu đề: `Phudu` (Google Fonts chính thức từ font DT Phudu của thương hiệu).
  - Body / Nội dung: `Be Vietnam Pro` (tối ưu hiển thị tiếng Việt, fallback Helvetica).
  - Typo Ô Ăn Quan: Con dấu có viền và không viền.

---

## 3. Kiến Trúc 14 Section (One-Page Flow)
- `00 Navbar (sticky)`: Logo CỘI, menu điều hướng, nút Đặt mua ngay, mobile hamburger + sticky bottom bar.
- `01 Hero`: Headline, chips thông tin (`Từ 7 tuổi`, `2–4 người`, `Bàn cờ 2 mặt`, `Quân acrylic`), CTAs, visual Trúc Mai + Chíp và vòng tròn teal lớn.
- `02 Về CỘI`: Sứ mệnh, Big Idea in lớn, 3 trụ cột thông điệp, ý nghĩa logo chú gà CỘI.
- `03 Vấn đề → Giải pháp (Insight)`: Quote thấu hiểu người trẻ, bảng so sánh 2 cột đối lập (Trước đây vs. Với CỘI).
- `04 Nhân vật`: Hồ sơ nhân vật Trúc Mai (15 tuổi) và Bé Chíp (Sứ giả Cội Nguồn).
- `05 Sản phẩm`: Trọn bộ Ô Ăn Quan, gallery thumbnail chuyển đổi ảnh, bảng thông số kích thước & chất liệu.
- `06 Cách chơi`: 3 bước infographic (Chuẩn bị → Rải quân & Đi lượt → Ăn quân & Tính điểm), mẹo chiến thuật, launcher video.
- `07 Vì sao chọn CỘI (USP)`: Lưới 6 ưu thế vượt trội.
- `08 Gallery & Mockup`: Bộ sưu tập hình ảnh thực tế từ slide, bộ lọc theo danh mục (Sản phẩm, Nhận diện, Ấn phẩm, Quà tặng).
- `09 Quà tặng Gacha + Mua hàng`: Minigame mở hộp Gacha ngẫu nhiên, bảng giá khuyến mãi và form đặt hàng nhanh.
- `10 Hành trình tương lai (Roadmap)`: Lộ trình 3 giai đoạn mở rộng hệ sinh thái trò chơi dân gian.
- `11 Dành cho ai & Cảm nhận`: 4 chân dung khách hàng và trích dẫn kết quả nghiên cứu đồ án.
- `12 FAQ`: 7 câu hỏi thường gặp dạng accordion.
- `13 CTA cuối`: Kêu gọi hành động và form đăng ký nhận ưu đãi.
- `14 Footer`: Băng hoa văn phân cách, thông tin liên hệ, mạng xã hội và dòng ghi công chính thức.

---

## 4. Lệnh Vận Hành & Triển Khai
```bash
# Khởi chạy server phát triển local
npm run dev

# Đóng gói tối ưu production
npm run build

# Xem thử bản build
npm run preview
```
- Khi `git push origin main`, GitHub Actions tại `.github/workflows/deploy.yml` sẽ tự động build và deploy lên GitHub Pages.
