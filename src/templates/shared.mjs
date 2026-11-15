import { readFileSync } from 'node:fs';
const data = JSON.parse(
  readFileSync(new URL('../data/profile.json', import.meta.url), 'utf8'),
);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
const icon = (name, cls = '') => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
    down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    moon: '<path d="M20 15.8A9 9 0 0 1 8.2 4 9 9 0 1 0 20 15.8Z"/>',
    code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V4H4v11h4"/>',
    github:
      '<path d="M8 21v-4c-4 1-4-2-5-2m14 6v-4a4 4 0 0 0-1-3c3 0 5-1 5-5 0-1-.3-2-1-3 0-1 0-2-.2-3-2 0-3 1-4 1a13 13 0 0 0-8 0C7 4 6 3 4 3c-.3 1-.3 2-.1 3A5 5 0 0 0 3 9c0 4 2 5 5 5a4 4 0 0 0-1 3v4"/>',
    book: '<path d="M12 6C8 3 5 3 2 4v15c4-1 6-1 10 1 4-2 6-2 10-1V4c-3-1-6-1-10 2Zm0 0v14"/>',
    game: '<path d="M7 7h10a4 4 0 0 1 4 3l1 7a2 2 0 0 1-3 2l-4-3H9l-4 3a2 2 0 0 1-3-2l1-7a4 4 0 0 1 4-3ZM7 10v4m-2-2h4m7-1h.01m3 2h.01"/>',
    spark:
      '<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/>',
    location:
      '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    grad: '<path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v8"/>',
  };
  return (
    '<svg class="icon ' +
    cls +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (paths[name] || paths.spark) +
    '</svg>'
  );
};
const external = (href, label, cls = '') =>
  '<a class="' +
  cls +
  '" href="' +
  esc(href) +
  '" target="_blank" rel="noopener noreferrer">' +
  label +
  icon('diagonal') +
  '</a>';
const pills = (stack) =>
  stack.map((t) => '<span class="tech-tag">' + esc(t) + '</span>').join('');

const header = (home = false) =>
  '<header class="site-header"><a class="brand" href="/" aria-label="Rafid Hasan Sydney home">RHS<span class="brand-dot"></span></a><nav id="navigation" aria-label="Main navigation">' +
  [
    ['work', 'Work'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['education', 'Education'],
    ['play', 'Play'],
    ['contact', 'Contact'],
  ]
    .map(
      ([id, label]) =>
        '<a href="' +
        (home ? '' : '/') +
        '#' +
        id +
        '"><span>' +
        label +
        '</span></a>',
    )
    .join('') +
  '</nav><div class="header-actions"><button class="theme-toggle icon-button" aria-label="Switch to dark theme">' +
  icon('moon', 'moon-icon') +
  icon('sun', 'sun-icon') +
  '</button><a class="header-email" href="mailto:' +
  data.email +
  '">Say hello ' +
  icon('diagonal') +
  '</a><button class="menu-toggle icon-button" aria-label="Open navigation" aria-controls="navigation" aria-expanded="false">' +
  icon('menu') +
  '</button></div></header>';
const footer = () =>
  '<footer class="footer wrap"><span>© 2026 RAFID HASAN SYDNEY</span><div>' +
  external(data.github, 'GitHub') +
  external(data.facebook, 'Facebook') +
  '<a href="#top">Back to top ' +
  icon('diagonal') +
  '</a></div></footer>';
const head = (title, description) =>
  '<!DOCTYPE html><html lang="en" data-theme="light"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' +
  esc(title) +
  '</title><meta name="description" content="' +
  esc(description) +
  '"><meta name="theme-color" content="#f5f1e9"><meta property="og:title" content="' +
  esc(title) +
  '"><meta property="og:description" content="' +
  esc(description) +
  '"><meta property="og:type" content="website"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/fonts.css"><link rel="stylesheet" href="/styles.css"><script>try{document.documentElement.dataset.theme=localStorage.getItem("rafid-theme-v3")||"light"}catch(e){}</script><script src="/vendor/gsap.min.js" defer></script><script src="/vendor/ScrollTrigger.min.js" defer></script><script src="/scripts/game.js" defer></script><script src="/scripts/interface.js" defer></script><script src="/scripts/motion.js" defer></script><script src="/scripts/scroll-effects.js" defer></script><script src="/scripts/playground.js" defer></script></head><body id="top"><a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"></div>';
const end = () =>
  '<div class="project-cursor" aria-hidden="true">Open project ' +
  icon('diagonal') +
  '</div><div class="toast" role="status" aria-live="polite"></div><dialog id="resume-dialog"><button class="dialog-close icon-button" aria-label="Close résumé information">' +
  icon('close') +
  '</button><span class="label">RÉSUMÉ</span><h2>Coming soon.</h2><p>My résumé is being prepared. You can find my education and projects here, or request a copy by email.</p><a class="button button-dark" href="mailto:' +
  data.email +
  '">Request by email ' +
  icon('diagonal') +
  '</a></dialog></body></html>';
const preview = (p) =>
  '<div class="project-preview ' +
  (p.slug === 'fitlog' ? 'phone-preview' : 'desktop-preview') +
  '" style="view-transition-name:preview-' +
  p.slug +
  '">' +
  (p.slug === 'fitlog'
    ? '<span class="preview-caption">FITLOG<br><small>WORKOUT PLANNING</small></span><div class="phone-device"><div class="phone-camera" aria-hidden="true"></div><img src="/assets/' +
      p.image +
      '" width="360" height="812" alt="' +
      esc(p.alt) +
      '" loading="lazy"></div><span class="preview-index" aria-hidden="true">03</span>'
    : '<div class="desktop-device"><div class="device-bar" aria-hidden="true"><span><i></i><i></i><i></i></span><small>' +
      p.live.replace('https://', '') +
      '</small>' +
      icon('diagonal') +
      '</div><img src="/assets/' +
      p.image +
      '" alt="' +
      esc(p.alt) +
      '" loading="lazy" width="' +
      '1410' +
      '" height="' +
      (p.slug === 'bazardor' ? '875' : '960') +
      '"></div>') +
  '</div>';
export { data, esc, icon, external, pills, header, footer, head, end, preview };
