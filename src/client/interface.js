(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const toast = $('.toast');
  let timer;
  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
  const theme = $('.theme-toggle');
  function themeLabel() {
    theme?.setAttribute(
      'aria-label',
      'Switch to ' +
        (root.dataset.theme === 'light' ? 'dark' : 'light') +
        ' theme',
    );
  }
  themeLabel();
  theme?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('rafid-theme-v3', root.dataset.theme);
    } catch {}
    themeLabel();
    $('meta[name="theme-color"]')?.setAttribute(
      'content',
      root.dataset.theme === 'light' ? '#f5f1e9' : '#171622',
    );
  });
  const nav = $('#navigation'),
    menu = $('.menu-toggle');
  function closeMenu() {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute(
      'aria-label',
      open ? 'Close navigation' : 'Open navigation',
    );
    document.body.classList.toggle('menu-open', open);
  });
  nav
    ?.querySelectorAll('a')
    .forEach((a) => a.addEventListener('click', closeMenu));
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  addEventListener('resize', () => {
    if (innerWidth > 650) closeMenu();
  });
  const modal = $('#resume-dialog');
  all('[data-resume]').forEach((button) =>
    button.addEventListener('click', () => {
      if (modal?.showModal) modal.showModal();
      else notify('Résumé is being prepared. Please contact me by email.');
    }),
  );
  modal
    ?.querySelector('.dialog-close')
    ?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
      const r = modal.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        modal.close();
    }
  });
  all('[data-copy]').forEach((button) =>
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        notify('Email address copied.');
      } catch {
        notify('Email: ' + button.dataset.copy);
      }
    }),
  );
  function time() {
    const node = $('[data-local-time]');
    if (node)
      node.textContent =
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()) + ' BST';
  }
  time();
  if ($('[data-local-time]')) setInterval(time, 60000);
  const progress = $('.reading-progress');
  let scrollScheduled = false;
  function updateProgress() {
    const max = root.scrollHeight - innerHeight;
    if (progress)
      progress.style.transform =
        'scaleX(' + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ')';
    scrollScheduled = false;
  }
  addEventListener(
    'scroll',
    () => {
      if (!scrollScheduled) {
        scrollScheduled = true;
        requestAnimationFrame(updateProgress);
      }
    },
    { passive: true },
  );
  updateProgress();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            nav
              ?.querySelectorAll('a')
              .forEach((a) =>
                a.classList.toggle('current', a.hash === '#' + entry.target.id),
              );
        }),
      { rootMargin: '-15% 0px -65% 0px' },
    );
    all('main>section[id]').forEach((s) => observer.observe(s));
  }
})();
