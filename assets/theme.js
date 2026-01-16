
(() => {
  const SELECTORS = {
    galleryMain: '.product-gallery-main img',
    galleryThumb: '.thumbnail',
    tabBtn: '.tab-button',
    tabContent: '.tab-content',
    accordionBtn: '.accordion-button',
    accordionContent: '.accordion-content',
    stickyBar: '#sticky-atc',
    liveProof: '#live-proof',
    qtyInput: 'input[name="quantity"]',
    qtyBtn: '.quantity-btn'
  };

  const CLASSES = {
    active: 'active',
    hidden: 'hidden',
    rotate: 'rotate-180'
  };

  /* ---------- Gallery ---------- */
  function initGallery() {
    document.addEventListener('click', e => {
      if (!e.target.closest(SELECTORS.galleryThumb)) return;
      e.preventDefault();
      const thumb = e.target.closest(SELECTORS.galleryThumb);
      const newSrc = thumb.querySelector('img').src.replace(/_\d+x\d+\./, '_1024x1024.');
      const main = document.querySelector(SELECTORS.galleryMain);
      if (!main) return;
      main.src = newSrc;
      document.querySelectorAll(SELECTORS.galleryThumb).forEach(t => t.classList.remove(CLASSES.active));
      thumb.classList.add(CLASSES.active);
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    document.addEventListener('click', e => {
      if (!e.target.closest(SELECTORS.tabBtn)) return;
      e.preventDefault();
      const btn = e.target.closest(SELECTORS.tabBtn);
      const targetId = btn.dataset.tab || btn.getAttribute('onclick').match(/'(\w+)'/)[1];
      document.querySelectorAll(SELECTORS.tabBtn).forEach(b => b.classList.remove(CLASSES.active));
      document.querySelectorAll(SELECTORS.tabContent).forEach(c => c.classList.add(CLASSES.hidden));
      btn.classList.add(CLASSES.active);
      const target = document.getElementById(targetId);
      if (target) target.classList.remove(CLASSES.hidden);
    });
  }

  /* ---------- Accordion FAQ ---------- */
  function initAccordion() {
    document.addEventListener('click', e => {
      if (!e.target.closest(SELECTORS.accordionBtn)) return;
      e.preventDefault();
      const btn = e.target.closest(SELECTORS.accordionBtn);
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');
      const isOpen = !content.classList.contains(CLASSES.hidden);
      content.classList.toggle(CLASSES.hidden);
      icon?.classList.toggle(CLASSES.rotate);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  /* ---------- Sticky ATC ---------- */
  function initStickyATC() {
    const bar = document.querySelector(SELECTORS.stickyBar);
    if (!bar) return;
    const threshold = 400;
    const toggle = () => {
      window.scrollY > threshold
        ? bar.classList.remove('translate-y-full')
        : bar.classList.add('translate-y-full');
    };
    window.addEventListener('scroll', toggle, { passive: true });
  }

  /* ---------- Quantity Controls ---------- */
  function initQuantity() {
    document.addEventListener('click', e => {
      const btn = e.target.closest(SELECTORS.qtyBtn);
      if (!btn) return;
      const input = btn.parentElement.querySelector(SELECTORS.qtyInput);
      if (!input) return;
      const isDown = btn.querySelector('.fa-minus');
      const current = parseInt(input.value, 10) || 1;
      const newVal = isDown ? Math.max(1, current - 1) : current + 1;
      input.value = newVal;
    });
  }

  /* ---------- Live Visitor Counter ---------- */
  function initLiveCounter() {
    const el = document.querySelector(SELECTORS.liveProof);
    if (!el) return;
    const base = parseInt(el.textContent.match(/\d+/)?.[0] || '12', 10);
    const variation = () => Math.floor(Math.random() * 5) + base;
    setInterval(() => {
      el.textContent = el.textContent.replace(/\d+/, variation());
    }, 8000);
  }

  /* ---------- Initialize ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initTabs();
    initAccordion();
    initStickyATC();
    initQuantity();
    initLiveCounter();
  });
})();
