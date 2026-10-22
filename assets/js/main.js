/**
 * Ngô Mỹ Quyên - Landing Page Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. COUNTDOWN TIMER
  initCountdownTimer();

  // 2. MODAL POPUP HANDLERS
  initModalPopup();

  // 3. SOCIAL PROOF NOTIFICATIONS (TOASTS)
  initSocialProof();

  // 4. FORM SUBMISSION
  initFormSubmission();

  // 5. VIDEO POPUP
  initVideoPlayer();
});

/* ==========================================================================
   1. COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll('.countdown-timer');
  if (!timerElements.length) return;

  // Set 15 minutes timer stored in sessionStorage so it doesn't reset on every refresh
  let remainingSeconds = sessionStorage.getItem('lp_timer');
  if (!remainingSeconds || remainingSeconds <= 0) {
    remainingSeconds = 15 * 60; // 15 minutes
  } else {
    remainingSeconds = parseInt(remainingSeconds, 10);
  }

  function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timerElements.forEach((el) => {
      el.textContent = formatted;
    });

    sessionStorage.setItem('lp_timer', remainingSeconds);

    if (remainingSeconds > 0) {
      remainingSeconds--;
    } else {
      // Loop or maintain last 30s
      remainingSeconds = 300; // Reset to 5 mins if expired
    }
  }

  updateDisplay();
  setInterval(updateDisplay, 1000);
}

/* ==========================================================================
   2. MODAL POPUP HANDLERS
   ========================================================================== */
function initModalPopup() {
  const modal = document.getElementById('registerModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerButtons = document.querySelectorAll('.trigger-modal, .btn-cta, .sticky-btn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input[name="fullname"]');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 200);
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Exit intent popup (Desktop only, trigger once)
  let exitIntentTriggered = false;
  document.addEventListener('mouseleave', function (e) {
    if (e.clientY <= 0 && !exitIntentTriggered && !modal.classList.contains('active')) {
      exitIntentTriggered = true;
      openModal();
    }
  });
}

/* ==========================================================================
   3. SOCIAL PROOF NOTIFICATIONS (TOASTS)
   ========================================================================== */
function initSocialProof() {
  const toast = document.getElementById('proofToast');
  if (!toast) return;

  const names = [
    { name: 'Nguyễn Văn Tuấn', city: 'Hà Nội', time: '2 phút trước' },
    { name: 'Trần Thị Thảo', city: 'TP. Hồ Chí Minh', time: '3 phút trước' },
    { name: 'Phạm Minh Đức', city: 'Đà Nẵng', time: '5 phút trước' },
    { name: 'Hoàng Thị Yến', city: 'Hải Phòng', time: '1 phút trước' },
    { name: 'Lê Văn Nam', city: 'Cần Thơ', time: '4 phút trước' },
    { name: 'Vũ Thanh Hằng', city: 'Bình Dương', time: '6 phút trước' }
  ];

  let index = 0;

  function showNextProof() {
    const item = names[index % names.length];
    const nameEl = toast.querySelector('.proof-user');
    const timeEl = toast.querySelector('.proof-time');
    const avatarEl = toast.querySelector('.proof-avatar');

    if (nameEl) nameEl.textContent = `${item.name} (${item.city})`;
    if (timeEl) timeEl.textContent = item.time;
    if (avatarEl) avatarEl.textContent = item.name.charAt(0);

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);

    index++;
  }

  // First toast after 4s, then every 12s
  setTimeout(() => {
    showNextProof();
    setInterval(showNextProof, 12000);
  }, 4000);
}

/* ==========================================================================
   4. FORM SUBMISSION
   ========================================================================== */
function initFormSubmission() {
  const form = document.getElementById('leadForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const fullname = form.querySelector('input[name="fullname"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();

    if (!fullname || !phone || !email) {
      alert('Vui lòng điền đầy đủ thông tin: Họ tên, Số điện thoại và Email!');
      return;
    }

    // Phone validation (Vietnamese phone regex)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      alert('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'ĐANG XỬ LÝ ĐĂNG KÝ...';
    }

    // Save lead locally
    const lead = {
      fullname,
      phone,
      email,
      registeredAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('registered_leads') || '[]');
      existing.push(lead);
      localStorage.setItem('registered_leads', JSON.stringify(existing));
      sessionStorage.setItem('current_lead', JSON.stringify(lead));
    } catch (err) {
      console.error('Error saving lead:', err);
    }

    // Redirect to Thank-you page after brief loading delay
    setTimeout(() => {
      window.location.href = 'thank-you.html';
    }, 800);
  });
}

/* ==========================================================================
   5. VIDEO PLAYER MODAL
   ========================================================================== */
function initVideoPlayer() {
  const videoTrigger = document.querySelector('.video-showcase');
  if (!videoTrigger) return;

  videoTrigger.addEventListener('click', function () {
    // If user clicks video box, open registration modal to watch full presentation
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.classList.add('active');
    }
  });
}
