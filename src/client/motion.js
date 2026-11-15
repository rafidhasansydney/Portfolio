(() => {
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s) => document.querySelector(s),
    all = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = window.gsap,
    ST = window.ScrollTrigger;
  function mediaMotion() {
    if (!gsap || !ST || reduced || innerWidth < 651) return;
    all('.project-preview').forEach((preview) => {
      const target = preview.querySelector('.desktop-device,.phone-device');
      if (!target) return;
      gsap.to(target, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: preview,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    });
  }
  if (gsap && ST && !reduced) {
    try {
      gsap.registerPlugin(ST);
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if ($('.title-line'))
        intro.from(
          '.title-line',
          { yPercent: 115, rotate: 2, duration: 1.15, stagger: 0.12 },
          0.05,
        );
      if ($('.intro-item'))
        intro.from(
          '.intro-item',
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 },
          0.2,
        );
      all('.reveal-title').forEach((el) =>
        gsap.from(el, {
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
        }),
      );
      all('.reveal').forEach((el) =>
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
        }),
      );
      all('.project-image-link').forEach((el) =>
        gsap.from(el, {
          clipPath: 'inset(9% 0% 0% 0%)',
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 93%', once: true },
        }),
      );
      mediaMotion();
      document.fonts?.ready.then(() => ST.refresh());
      addEventListener('load', () => ST.refresh(), { once: true });
    } catch (error) {
      console.warn('Motion fallback:', error);
      gsap.set(
        '.title-line,.intro-item,.reveal-title,.reveal,.project-image-link',
        { clearProps: 'transform,opacity,clipPath' },
      );
    }
  }
  if (gsap && fine && !reduced) {
    const cursor = $('.project-cursor');
    if (cursor) {
      const x = gsap.quickTo(cursor, 'x', {
          duration: 0.32,
          ease: 'power3.out',
        }),
        y = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });
      all('.project-image-link').forEach((link) => {
        link.addEventListener('pointerenter', (event) => {
          x(event.clientX + 18);
          y(event.clientY + 18);
          gsap.to(cursor, { opacity: 1, duration: 0.18 });
        });
        link.addEventListener('pointermove', (event) => {
          x(event.clientX + 18);
          y(event.clientY + 18);
        });
        link.addEventListener('pointerleave', () =>
          gsap.to(cursor, { opacity: 0, duration: 0.18 }),
        );
      });
      addEventListener('blur', () => gsap.set(cursor, { opacity: 0 }));
    }
    all('.project-image-link').forEach((link) => {
      const target = link.querySelector('.desktop-device,.phone-device');
      link.addEventListener('pointermove', (event) => {
        const b = link.getBoundingClientRect(),
          n = (event.clientX - b.left) / b.width - 0.5;
        gsap.to(target, {
          rotation: (link.querySelector('.phone-device') ? -7 : 0) + n * 1.5,
          x: n * 8,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
      link.addEventListener('pointerleave', () => {
        gsap.to(target, {
          rotation: link.querySelector('.phone-device') ? -7 : 0,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
    });
  }
})();
