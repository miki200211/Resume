/* ============================================================================
   共用 JavaScript — 全站每一頁都連這個檔
   功能：主題切換、中/EN 雙語切換、手機選單、目前頁面高亮、進場動畫、列印、燈箱
   ============================================================================ */
(function () {
  const root = document.documentElement;

  function readStorage(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  }
  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore storage errors when site data is blocked */
    }
  }

  /* ---- 頁尾年份 ---- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- 主題（深 / 淺）。同步 data-theme、meta[name="color-scheme"] 與 theme-color ---- */
  const themeBtn = document.getElementById('themeToggle');
  const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const sunSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const moonSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  function applyTheme(t, persist = true) {
    const scheme = t === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', scheme);
    if (colorSchemeMeta) colorSchemeMeta.content = scheme;
    if (themeColorMeta) themeColorMeta.content = scheme === 'light' ? '#f6f9f5' : '#111612';
    if (themeBtn) {
      themeBtn.innerHTML = scheme === 'dark' ? sunSvg : moonSvg;
      themeBtn.setAttribute('aria-pressed', String(scheme === 'light'));
    }
    if (persist) writeStorage('theme', scheme);
  }
  applyTheme(readStorage('theme', 'dark'), false);
  if (themeBtn) {
    themeBtn.addEventListener('click', () =>
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
  }

  /* ---- 中 / EN 雙語：每個 [data-en] 元素在 中文(_zh) 與 英文(data-en) 間互換。
         英文標題放在每頁 <html data-title-en="..."> ---- */
  const langBtn = document.getElementById('langToggle');
  const zhTitle = document.title;
  function applyLang(lang, persist = true) {
    const isEn = lang === 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
      try {
        if (el._zh === undefined) el._zh = el.innerHTML;
        el.innerHTML = isEn ? el.dataset.en : el._zh;
      } catch (e) {
        console.warn('[i18n] Failed to switch element:', el, e);
      }
    });
    root.lang = isEn ? 'en' : 'zh-Hant';
    document.title = (isEn && root.dataset.titleEn) ? root.dataset.titleEn : zhTitle;
    if (langBtn) {
      langBtn.textContent = isEn ? '中' : 'EN';
      langBtn.setAttribute('aria-pressed', String(isEn));
    }
    if (persist) writeStorage('lang', isEn ? 'en' : 'zh');
  }
  applyLang(readStorage('lang', 'zh'), false);
  if (langBtn) {
    langBtn.addEventListener('click', () =>
      applyLang(readStorage('lang', 'zh') === 'en' ? 'zh' : 'en'));
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && e.newValue) applyTheme(e.newValue, false);
    if (e.key === 'lang' && e.newValue) applyLang(e.newValue, false);
  });

  /* ---- 手機選單 ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    const setMenuOpen = (open) => {
      navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });
  }

  /* ---- 目前頁面高亮 ---- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ---- 列印 / 存 PDF（只有履歷頁有這顆按鈕）---- */
  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  /* ---- 原生 <dialog> 圖片燈箱 ---- */
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('imgModalTarget');
  if (modal && modalImg) {
    const closeBtn = modal.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
    modal.addEventListener('close', () => {
      modalImg.removeAttribute('src');
    });
  }
  window.openCertModal = function (src, alt) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    if (alt) modalImg.alt = alt;
    if (typeof modal.showModal === 'function') {
      if (!modal.open) modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  };
  document.querySelectorAll('.cert-thumb[onclick], .photo-item[onclick], .dish-card[onclick]').forEach(el => {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  /* ---- 進場動畫（尊重 prefers-reduced-motion）---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }
})();
