(() => {
  'use strict';
  const $ = (s) => document.querySelector(s),
    all = (s) => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const gsap = window.gsap,
    ST = window.ScrollTrigger;
  if (gsap && ST && !reduce) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (min-height: 650px)', () => {
      const stage = $('.project-stage'),
        track = $('.project-track');
      if (!stage || !track) return;
      stage.classList.add('is-horizontal');
      const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const horizontal = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top 88px',
          end: () => '+=' + Math.max(distance(), 1),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      const progress = gsap.fromTo(
        '.project-scrollbar>span',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top 88px',
            end: () => '+=' + Math.max(distance(), 1),
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
      return () => {
        horizontal.scrollTrigger?.kill();
        horizontal.kill();
        progress.scrollTrigger?.kill();
        progress.kill();
        gsap.set(track, { clearProps: 'transform' });
        stage.classList.remove('is-horizontal');
      };
    });
    const words = $('.word-reveal');
    if (words) {
      const text = words.textContent;
      words.textContent = '';
      text.split(/(\s+)/).forEach((word) => {
        if (/^\s+$/.test(word)) words.append(document.createTextNode(word));
        else {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = word;
          words.append(span);
        }
      });
      gsap.from(words.querySelectorAll('.word'), {
        opacity: 0.18,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: words,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: 0.5,
        },
      });
    }
    if ($('.education-draw>span'))
      gsap.from('.education-draw>span', {
        scaleX: 0,
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.education-detail',
          start: 'top 80%',
          once: true,
        },
      });
    document.fonts?.ready.then(() => ST.refresh());
  }
  if (fine && !reduce) {
    const portrait = $('[data-tilt]');
    if (portrait && gsap) {
      const card = portrait.querySelector('.hero-photo');
      portrait.addEventListener('pointermove', (event) => {
        const b = portrait.getBoundingClientRect(),
          x = (event.clientX - b.left) / b.width - 0.5,
          y = (event.clientY - b.top) / b.height - 0.5;
        gsap.to(card, {
          rotationY: x * 8,
          rotationX: -y * 7,
          rotation: 3,
          duration: 0.65,
          ease: 'power3.out',
        });
      });
      portrait.addEventListener('pointerleave', () =>
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          rotation: 3,
          duration: 0.7,
          ease: 'power3.out',
        }),
      );
    }
    const eyes = all('.bug-eye i');
    if (eyes.length) {
      addEventListener(
        'pointermove',
        (event) => {
          const face = $('.little-bug')?.getBoundingClientRect();
          if (!face) return;
          const x = Math.max(
              -3,
              Math.min(3, (event.clientX - face.left - face.width / 2) / 100),
            ),
            y = Math.max(
              -3,
              Math.min(3, (event.clientY - face.top - face.height / 2) / 100),
            );
          eyes.forEach((eye) => {
            eye.style.transform = 'translate(' + x + 'px,' + y + 'px)';
          });
        },
        { passive: true },
      );
    }
  }
  const toolInfo = {
    'Next.js': 'Used in Bandhan, BazarDor and FitLog.',
    React: 'Used across my web applications, including Bandhan and FitLog.',
    TypeScript: 'Used in BazarDor, FitLog and WorkForce.',
    JavaScript: 'Used in Bandhan and my web development projects.',
    Vue: 'Used in WorkForce, an employee management interface.',
    'Tailwind CSS': 'Used to style Bandhan, BazarDor and FitLog.',
    Flutter: 'Used in Momentum, my habit-tracking app.',
    Dart: 'Used with Flutter in Momentum.',
    'Git & GitHub':
      'Used for source control and storing my project repositories.',
    Vercel: 'Used to host Bandhan, BazarDor and FitLog.',
    'Coding agents':
      'Part of my development, code review and debugging workflow.',
    'Tool integration': 'Connecting development tools where they help a task.',
  };
  all('[data-tool]').forEach((button) => {
    const show = () => {
      const note = $('.tool-note');
      if (note)
        note.textContent =
          button.dataset.tool +
          ' — ' +
          (toolInfo[button.dataset.tool] || 'Used in my projects.');
      all('[data-tool]').forEach((other) =>
        other.classList.toggle('selected', other === button),
      );
    };
    button.addEventListener('click', show);
    button.addEventListener('focus', show);
    if (fine) button.addEventListener('pointerenter', show);
  });
})();
