/* ============================================================================
   共用 JavaScript — 全站每一頁都連這個檔
   功能：主題切換、中/EN 雙語切換、手機選單、目前頁面高亮、進場動畫、列印
   ============================================================================ */
(function () {
  const root = document.documentElement;

  /* ---- 頁尾年份 ---- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- 主題（深 / 淺）。預設深色；使用 SVG 向量圖示防止跨平台缺字 ---- */
  const themeBtn = document.getElementById('themeToggle');
  const sunSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const moonSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.innerHTML = (t === 'dark') ? sunSvg : moonSvg;
    localStorage.setItem('theme', t);
  }
  applyTheme(localStorage.getItem('theme') || 'dark');
  if (themeBtn) themeBtn.addEventListener('click', () =>
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ---- 中 / EN 雙語：每個 [data-en] 元素在 中文(_zh) 與 英文(data-en) 間互換。
         英文標題放在每頁 <html data-title-en="..."> ---- */
  const langBtn = document.getElementById('langToggle');
  let zhTitle = document.title;
  function applyLang(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      try {
        if (el._zh === undefined) el._zh = el.innerHTML;
        el.innerHTML = (lang === 'en') ? el.dataset.en : el._zh;
      } catch (e) {
        console.warn('[i18n] Failed to switch element:', el, e);
      }
    });
    root.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    document.title = (lang === 'en' && root.dataset.titleEn) ? root.dataset.titleEn : zhTitle;
    if (langBtn) langBtn.textContent = (lang === 'en') ? '中' : 'EN';
    localStorage.setItem('lang', lang);
  }
  applyLang(localStorage.getItem('lang') || 'zh');
  if (langBtn) langBtn.addEventListener('click', () =>
    applyLang(localStorage.getItem('lang') === 'en' ? 'zh' : 'en'));

  /* ---- 手機選單 ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  /* ---- 目前頁面高亮 ---- */
  let here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  /* ---- 列印 / 存 PDF（只有履歷頁有這顆按鈕）---- */
  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  /* ---- 進場動畫 ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
