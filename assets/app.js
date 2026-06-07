/* ============================================================================
   共用 JavaScript — 全站每一頁都連這個檔
   功能：主題切換、中/EN 雙語切換、手機選單、目前頁面高亮、進場動畫、列印
   ============================================================================ */
(function () {
  const root = document.documentElement;

  /* ---- 頁尾年份 ---- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- 主題（深 / 淺）。預設深色；想預設淺色把 'dark' 改成 'light' ---- */
  const themeBtn = document.getElementById('themeToggle');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.textContent = (t === 'dark') ? '☀' : '☾';
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
