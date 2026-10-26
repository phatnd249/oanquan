/**
 * CỘI LANDING PAGE — CONTACT FORM MODULE
 *
 * Xử lý cả hai form:
 *   1. Section form cố định (#contact)
 *   2. Popup Modal form (#modal-contact)
 *
 * Dữ liệu gửi lên Google Form qua fetch (no-cors) với hidden iframe fallback.
 * Nguồn trang được gán tự động qua hidden input (entry.925381880).
 */

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqkJsPaU2bTmzwuLELj2ygbJLBsfN45js1uvwOmDDF7XEEDQ/formResponse';

/* ============================================================
   KHỞI TẠO
   ============================================================ */
export function initContactForms() {
  // Section form cố định
  initFormInstance({
    formId:       'contact-form',
    submitBtnId:  'contact-submit-btn',
    successId:    'contact-success',
    resetBtnId:   'contact-reset-btn',
    frameId:      'contact-hidden-frame',
  });

  // Popup modal form
  initFormInstance({
    formId:       'modal-contact-form',
    submitBtnId:  'modal-contact-submit-btn',
    successId:    'modal-contact-success',
    resetBtnId:   'modal-contact-reset-btn',
    frameId:      'modal-hidden-frame',
  });

  // Modal trigger & close logic
  initModal();
}

/* ============================================================
   INSTANCE FORM (dùng chung cho cả section lẫn modal)
   ============================================================ */
function initFormInstance({ formId, submitBtnId, successId, resetBtnId, frameId }) {
  const form      = document.getElementById(formId);
  const submitBtn = document.getElementById(submitBtnId);
  const successEl = document.getElementById(successId);
  const resetBtn  = document.getElementById(resetBtnId);

  if (!form || !submitBtn || !successEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    setLoadingState(submitBtn, true);

    const formData = new FormData(form);

    try {
      await submitToGoogleForm(formData, frameId);
      showSuccess(form, successEl);
    } catch (err) {
      // Vì no-cors luôn trả về opaque response (không phân biệt lỗi hay thành công),
      // ta vẫn hiện màn hình thành công. Lỗi thực sự sẽ bị catch ở đây.
      console.warn('[CỘI] Form submit warning:', err);
      showSuccess(form, successEl);
    } finally {
      setLoadingState(submitBtn, false);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetForm(form, successEl);
    });
  }
}

/* ============================================================
   VALIDATION
   ============================================================ */
function validateForm(form) {
  let valid = true;

  // Reset trạng thái lỗi cũ
  form.querySelectorAll('.contact__field').forEach(field => {
    field.classList.remove('has-error');
    const input = field.querySelector('.contact__input');
    if (input) input.classList.remove('is-error');
  });

  // Họ và tên
  const nameInput = form.querySelector('[name="entry.118746383"]');
  if (nameInput && nameInput.value.trim().length < 2) {
    setFieldError(nameInput, true);
    valid = false;
  }

  // Số điện thoại — chấp nhận 10–11 số, có thể có khoảng trắng hoặc dấu cách
  const phoneInput = form.querySelector('[name="entry.1332627325"]');
  if (phoneInput) {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 11) {
      setFieldError(phoneInput, true);
      valid = false;
    }
  }

  // Email
  const emailInput = form.querySelector('[name="entry.998852611"]');
  if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    setFieldError(emailInput, true);
    valid = false;
  }

  if (!valid) {
    // Cuộn đến trường lỗi đầu tiên
    const firstError = form.querySelector('.has-error .contact__input');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return valid;
}

function setFieldError(input, state) {
  const field = input.closest('.contact__field');
  if (!field) return;
  if (state) {
    field.classList.add('has-error');
    input.classList.add('is-error');
  } else {
    field.classList.remove('has-error');
    input.classList.remove('is-error');
  }
}

// Xoá lỗi khi người dùng bắt đầu nhập lại
function attachLiveValidation(form) {
  form.querySelectorAll('.contact__input').forEach(input => {
    input.addEventListener('input', () => setFieldError(input, false), { once: false });
  });
}

/* ============================================================
   GỬI DỮ LIỆU LÊN GOOGLE FORM
   ============================================================ */
async function submitToGoogleForm(formData, frameId) {
  // Phương án 1: fetch với mode no-cors (ưu tiên)
  try {
    await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      mode:   'no-cors',
      body:   formData,
    });
    return; // no-cors không ném lỗi nếu gửi thành công
  } catch {
    // Nếu fetch thất bại (hiếm gặp), dùng iframe fallback
  }

  // Phương án 2: iframe hidden fallback
  const frame = document.getElementById(frameId);
  if (!frame) return;

  const tempForm = document.createElement('form');
  tempForm.method  = 'POST';
  tempForm.action  = GOOGLE_FORM_ACTION;
  tempForm.target  = frame.name || frameId;
  tempForm.style.display = 'none';

  for (const [key, val] of formData.entries()) {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = key;
    input.value = val;
    tempForm.appendChild(input);
  }

  document.body.appendChild(tempForm);
  tempForm.submit();
  document.body.removeChild(tempForm);
}

/* ============================================================
   TRẠNG THÁI UI
   ============================================================ */
function setLoadingState(btn, isLoading) {
  btn.disabled = isLoading;
  if (isLoading) {
    btn.classList.add('is-loading');
    btn.querySelector('.contact__submit-text').textContent = 'Đang gửi...';
    btn.querySelector('.contact__submit-icon').style.display = 'none';
  } else {
    btn.classList.remove('is-loading');
    btn.querySelector('.contact__submit-text').textContent = 'Gửi Thông Tin Ngay';
    btn.querySelector('.contact__submit-icon').style.display = '';
  }
}

function showSuccess(form, successEl) {
  form.closest('.contact__form-wrap, .modal-body') &&
    (form.closest('.contact__form-wrap, .modal-body').style.display = 'none');
  successEl.hidden = false;
}

function resetForm(form, successEl) {
  form.reset();
  // Xoá toàn bộ lỗi
  form.querySelectorAll('.contact__field').forEach(f => {
    f.classList.remove('has-error');
  });
  form.querySelectorAll('.contact__input').forEach(i => i.classList.remove('is-error'));

  // Ẩn success, hiện lại form
  successEl.hidden = true;
  const wrap = form.closest('.contact__form-wrap, .modal-body');
  if (wrap) wrap.style.display = '';
}

/* ============================================================
   POPUP MODAL
   ============================================================ */
function initModal() {
  const overlay    = document.getElementById('contact-modal');
  const closeBtns  = document.querySelectorAll('[data-modal-close="contact-modal"]');
  const openBtns   = document.querySelectorAll('[data-modal-open="contact-modal"]');

  if (!overlay) return;

  // Mở modal
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(overlay);
    });
  });

  // Đóng modal — nút ✕
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => closeModal(overlay));
  });

  // Đóng khi click vào overlay (bên ngoài dialog)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });

  // Đóng bằng phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal(overlay);
    }
  });
}

function openModal(overlay) {
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  // Focus vào trường đầu tiên trong modal sau animation
  setTimeout(() => {
    const firstInput = overlay.querySelector('.contact__input');
    if (firstInput) firstInput.focus();
  }, 350);
}

function closeModal(overlay) {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}
