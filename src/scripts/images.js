/**
 * Khai báo và quản lý đường dẫn hình ảnh / icons tập trung
 * Hỗ trợ Vite import hoặc public assets
 */

import logoSrc from '../assets/images/branding/logo.png';
import logoBadgeSrc from '../assets/images/branding/logo-badge.png';

export const images = {
  branding: {
    logo: logoSrc,
    badge: logoBadgeSrc,
    favicon: './favicon.svg'
  },
  showcase: {
    pottery: {
      title: 'Bộ Sưu Tập Gốm Mộc',
      desc: 'Hơi thở đất nung từ phù sa sông Hồng',
      tag: 'Gốm Thủ Công'
    },
    weaving: {
      title: 'Sợi Tự Nhiên & Chàm',
      desc: 'Màu nhuộm thảo mộc vùng cao Tây Bắc',
      tag: 'Dệt Bản Địa'
    },
    tea: {
      title: 'Trà & Thảo Mộc Bản Địa',
      desc: 'Thanh mát, nguyên bản vị tự nhiên',
      tag: 'Ẩm Thực Tự Nhiên'
    }
  }
};
