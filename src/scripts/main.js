/**
 * CỘI LANDING PAGE - MAIN ENTRY POINT
 */

// 1. Import Toàn Bộ Stylesheet
import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/sections/index.css';

// 2. Import Modules & Scripts
import { initMenu } from './menu.js';
import { siteConfig } from './config.js';
import { images } from './images.js';

document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo Menu & Navigation
  initMenu();

  // Khởi tạo Hiệu Ứng Cuộn & Đếm Số
  initScrollAnimations();
  initStatsCounter();

  // Xử lý Form Đăng Ký
  initNewsletterForm();

  // Cập nhật logo nếu có
  applyDynamicAssets();
});

/**
 * Gắn asset động từ images.js
 */
function applyDynamicAssets() {
  const brandLogos = document.querySelectorAll('.dynamic-logo');
  brandLogos.forEach(logo => {
    logo.src = images.branding.logo;
  });

  const heroBadge = document.querySelector('.dynamic-hero-badge');
  if (heroBadge) {
    heroBadge.src = images.branding.badge;
  }
}

/**
 * Hiệu ứng IntersectionObserver khi cuộn (Scroll Reveal)
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
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Hiệu ứng đếm số tăng dần cho các chỉ số
 */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat__number');
  if (!counters.length) return;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target') || el.innerText.replace(/\D/g, ''), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1600;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.innerText = `${prefix}${target.toLocaleString()}${suffix}`;
        clearInterval(timer);
      } else {
        el.innerText = `${prefix}${Math.floor(start).toLocaleString()}${suffix}`;
      }
    }, stepTime);
  };

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Xử lý sự kiện đăng ký nhận tin
 */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    if (!input || !input.value.trim() || !button) return;

    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'Đã gửi thành công ✓';

    setTimeout(() => {
      input.value = '';
      button.disabled = false;
      button.innerHTML = originalText;
    }, 3000);
  });
}
