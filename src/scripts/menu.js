/**
 * Xử lý Menu điều hướng, Sticky Header, Mobile Drawer và Smooth Scroll
 */

export function initMenu() {
  initStickyHeader();
  initMobileDrawer();
  initSmoothScroll();
  initScrollSpy();
}

/**
 * Hiệu ứng Sticky Header khi cuộn trang
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!toggleBtn || !navMenu) return;

  const toggle = () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  const close = () => {
    toggleBtn.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  toggleBtn.addEventListener('click', toggle);

  navLinks.forEach(link => {
    link.addEventListener('click', close);
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      close();
    }
  });
}

/**
 * Cuộn mượt có bù trừ chiều cao Header
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('.header');

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = (header ? header.offsetHeight : 70) + 10;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Đánh dấu mục menu active theo vị trí scroll
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
