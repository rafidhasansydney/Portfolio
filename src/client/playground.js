(() => {
  const $ = (s) => document.querySelector(s),
    all = (s) => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = window.gsap;
  const board = $('.bug-board');
  if (!board || !window.BugHuntCore) return;
  const game = new window.BugHuntCore({ now: () => performance.now() });
  const cells = all('[data-cell]'),
    start = $('[data-game-start]'),
    stop = $('[data-game-stop]'),
    score = $('[data-score]'),
    time = $('[data-time]'),
    bestNode = $('[data-best]'),
    status = $('[data-game-status]');
  let ticker = null,
    mover = null,
    best = 0;
  try {
    const stored = Number(localStorage.getItem('rafid-bug-best'));
    if (Number.isFinite(stored) && stored > 0 && stored < 10000)
      best = Math.floor(stored);
  } catch {}
  bestNode.textContent = String(best);
  function render() {
    const s = game.state();
    board.dataset.running = String(s.running);
    score.textContent = String(s.score);
    time.textContent = Math.ceil(s.remainingMs / 1000) + 's';
    cells.forEach((cell, i) => {
      const active = s.running && i === s.target;
      cell.disabled = !s.running;
      cell.classList.toggle('active', active);
      cell.setAttribute(
        'aria-label',
        active
          ? 'Bug in cell ' + (i + 1) + '. Catch it.'
          : 'Cell ' + (i + 1) + ', empty',
      );
    });
  }
  function cleanup() {
    clearInterval(ticker);
    clearInterval(mover);
    ticker = null;
    mover = null;
  }
  function finish(manual = false) {
    game.end();
    cleanup();
    if (game.score > best) {
      best = game.score;
      bestNode.textContent = String(best);
      try {
        localStorage.setItem('rafid-bug-best', String(best));
      } catch {}
    }
    start.disabled = false;
    start.innerHTML =
      'Play again <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
    stop.disabled = true;
    render();
    status.textContent =
      (manual ? 'Round ended. ' : 'Time’s up! ') +
      'You caught ' +
      game.score +
      (game.score === 1 ? ' bug.' : ' bugs.') +
      ' Your best is ' +
      best +
      '.';
  }
  function hit(index) {
    if (!game.running) return;
    const wasRunning = game.running;
    if (game.hit(index)) {
      render();
      if (!reduce && gsap)
        gsap.fromTo(
          score,
          { scale: 1.18 },
          { scale: 1, duration: 0.25, ease: 'power2.out' },
        );
    } else if (wasRunning && !game.running) finish();
  }
  start.addEventListener('click', () => {
    cleanup();
    game.start();
    render();
    start.disabled = true;
    stop.disabled = false;
    status.textContent = 'Round started. Catch the bug!';
    board.focus({ preventScroll: true });
    ticker = setInterval(() => {
      game.tick();
      if (!game.running) finish();
      else render();
    }, 100);
    mover = setInterval(() => {
      game.moveTarget();
      if (!game.running) finish();
      else render();
    }, 850);
  });
  stop.addEventListener('click', () => {
    if (game.running) finish(true);
  });
  cells.forEach((cell, i) => cell.addEventListener('click', () => hit(i)));
  board.addEventListener('keydown', (event) => {
    if (game.running && /^[1-9]$/.test(event.key)) {
      event.preventDefault();
      hit(Number(event.key) - 1);
    }
  });
  addEventListener('pagehide', () => {
    game.end();
    cleanup();
  });
})();
