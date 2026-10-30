/**
 * CỘI LANDING PAGE - MAIN ENTRY POINT
 */

// Stylesheets
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/sections/index.css';

// Modules
import { initMenu } from './menu.js';
import { images } from './images.js';
import { initContactForms } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initScrollAnimations();
  initFAQAccordion();
  initProductGallery();
  initGachaGame();
  initOrderForm();
  initContactForms();
  applyAssets();
});

/**
 * Gắn các assets thực tế vào các thẻ có data-asset
 */
function applyAssets() {
  document.querySelectorAll('[data-asset]').forEach(el => {
    const key = el.getAttribute('data-asset');
    if (images[key]) {
      if (el.tagName === 'IMG') {
        el.src = images[key];
      } else {
        el.style.backgroundImage = `url(${images[key]})`;
      }
    }
  });
}

/**
 * Hiệu ứng Scroll Reveal bằng IntersectionObserver
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Đổi ảnh sản phẩm khi bấm thumbnail
 */
function initProductGallery() {
  const mainImg = document.getElementById('product-main-view');
  const thumbs = document.querySelectorAll('.product__thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const targetKey = thumb.getAttribute('data-target-asset');
      if (targetKey && images[targetKey]) {
        mainImg.src = images[targetKey];
      }
    });
  });
}

/**
 * Minigame mở hộp quà Gacha ngẫu nhiên
 */
function initGachaGame() {
  const unboxBtn = document.getElementById('btn-unbox-gacha');
  const resultBox = document.getElementById('gacha-result-box');
  const resultText = document.getElementById('gacha-prize-text');
  const chestImg = document.getElementById('gacha-chest-icon');

  if (!unboxBtn || !resultBox || !resultText) return;

  const prizes = [
    { name: 'Bộ Sticker Chíp & Trúc Mai độc quyền' },
    { name: 'Móc khóa Acrylic hình Bé Chíp tung tăng' },
    { name: 'Đế lót ly gốm họa tiết hoa mai CỘI' },
    { name: 'Huy hiệu kim loại mạ vàng CỘI Limited' },
    { name: 'Standee mini Trúc Mai du hành thời gian' }
  ];

  const rollGacha = () => {
    unboxBtn.disabled = true;
    unboxBtn.innerHTML = 'Đang mở hộp bí ẩn...';
    if (chestImg) {
      chestImg.style.transform = 'scale(1.15) rotate(10deg)';
    }

    setTimeout(() => {
      const luckyPrize = prizes[Math.floor(Math.random() * prizes.length)];
      resultText.innerHTML = `Chúc mừng bạn đã quay được: <strong>${luckyPrize.name}</strong> (Tặng kèm khi đặt hàng!)`;
      resultBox.classList.add('show');
      unboxBtn.disabled = false;
      unboxBtn.innerHTML = 'Quay lại phần quà khác';
      if (chestImg) {
        chestImg.style.transform = 'scale(1) rotate(0deg)';
      }
    }, 900);
  };

  unboxBtn.addEventListener('click', rollGacha);
  if (chestImg) {
    chestImg.addEventListener('click', rollGacha);
  }
}

/**
 * Xử lý Form đặt hàng kết nối Google Form
 */
function initOrderForm() {
  const orderForm = document.getElementById('order-form');
  const successBox = document.getElementById('order-success-box');
  if (!orderForm) return;

  const GOOGLE_ORDER_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLSfHIlmUFAwLAUbIe2wjuf0wJoyydKnld95hwwWFrNaF_Kc1Bw/formResponse';

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-order');
    const originalText = btn ? btn.innerHTML : 'Xác Nhận Đặt Mua & Nhận Quà Gacha';

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Đang gửi thông tin...';
    }

    const formData = new FormData(orderForm);

    try {
      await fetch(GOOGLE_ORDER_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
    } catch {
      // Fallback qua hidden iframe nếu fetch thất bại
      const frame = document.getElementById('order-hidden-frame');
      if (frame) {
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = GOOGLE_ORDER_FORM_ACTION;
        tempForm.target = frame.name || 'order-hidden-frame';
        tempForm.style.display = 'none';

        for (const [key, val] of formData.entries()) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = val;
          tempForm.appendChild(input);
        }

        document.body.appendChild(tempForm);
        tempForm.submit();
        setTimeout(() => {
          if (tempForm.parentNode) {
            document.body.removeChild(tempForm);
          }
        }, 1000);
      }
    }

    orderForm.reset();
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }

    if (successBox) {
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
