/**
 * Cấu hình tổng thể của dự án CỘI Landing Page
 */

export const siteConfig = {
  name: 'CỘI',
  tagline: 'Tinh Hoa Bản Sắc & Di Sản Thuần Việt',
  description: 'Khám phá hành trình gìn giữ và tôn vinh những giá trị truyền thống Việt qua từng sản phẩm mộc mạc, tinh tế và bền vững.',
  url: import.meta.env.VITE_SITE_URL || 'https://username.github.io/coi',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'lienhe@coi.vn',
  hotline: import.meta.env.VITE_HOTLINE || '+84 (0) 90 000 0000',
  address: 'Hà Nội & TP. Hồ Chí Minh, Việt Nam',
  navLinks: [
    { label: 'Trang Chủ', href: '#hero' },
    { label: 'Câu Chuyện Cội', href: '#about' },
    { label: 'Điểm Khác Biệt', href: '#features' },
    { label: 'Bộ Sưu Tập', href: '#showcase' },
    { label: 'Liên Hệ', href: '#contact' },
  ],
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com'
  }
};
