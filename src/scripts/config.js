/**
 * Cấu hình tổng thể dự án Boardgame CỘI (Ô Ăn Quan)
 */

export const siteConfig = {
  name: 'CỘI',
  productName: 'Boardgame Ô Ăn Quan',
  tagline: 'Gìn giữ nét xưa – Kết nối thế hệ.',
  keyMessage: 'Cùng cội khám phá lại: Miền tuổi thơ Việt',
  description: 'Boardgame Ô Ăn Quan phiên bản mới của CỘI: bàn cờ 2 mặt gấp gọn, quân acrylic, nhân vật Chíp & Trúc Mai. Dễ chơi từ 7 tuổi, quà gacha khi mua online.',
  url: import.meta.env.VITE_SITE_URL || 'https://username.github.io/coi',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'lienhe@coi.vn',
  hotline: import.meta.env.VITE_HOTLINE || '+84 (0) 90 000 0000',
  credits: {
    project: 'Đồ án tốt nghiệp ngành Truyền thông Đa phương tiện – Trường Đại học Lạc Hồng',
    authors: 'Trần Xuân Nghi, Nguyễn Ngọc Xuân Nhi',
    instructor: 'ThS. Phan Thị Hường',
    year: '2026'
  },
  navLinks: [
    { label: 'Về CỘI', href: '#about' },
    { label: 'Nhân Vật', href: '#characters' },
    { label: 'Sản Phẩm', href: '#product' },
    { label: 'Cách Chơi', href: '#rules' },
    { label: 'Điểm Nổi Bật', href: '#usp' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Quà Gacha', href: '#gacha' },
    { label: 'FAQ', href: '#faq' },
  ]
};
