import {
  data,
  esc,
  icon,
  external,
  header,
  footer,
  head,
  end,
  preview,
} from './shared.mjs';
const skillGroups = [
  {
    title: 'Web',
    items: [
      ['N', 'Next.js'],
      ['R', 'React'],
      ['TS', 'TypeScript'],
      ['JS', 'JavaScript'],
      ['V', 'Vue'],
      ['TW', 'Tailwind CSS'],
    ],
  },
  {
    title: 'Mobile',
    items: [
      ['F', 'Flutter'],
      ['D', 'Dart'],
    ],
  },
  {
    title: 'Workflow',
    items: [
      ['G', 'Git & GitHub'],
      ['↗', 'Vercel'],
      ['⌘', 'Coding agents'],
      ['⇄', 'Tool integration'],
    ],
  },
];
export function renderHome() {
  return (
    head(
      'Rafid Hasan Sydney | Developer',
      'Software Engineering student and developer in Sylhet. Explore Bandhan, BazarDor, FitLog and a small interactive playground.',
    ) +
    header(true) +
    '<main id="main"><section class="hero wrap"><div class="hero-kicker"><span class="label"><span class="live-dot"></span> SOFTWARE ENGINEERING STUDENT</span><span class="label">SYLHET, BANGLADESH</span></div><div class="hero-main"><div class="hero-type"><p class="hero-role intro-item">Hello, I’m</p><h1 aria-label="Rafid Hasan Sydney"><span class="title-mask"><span class="title-line">Rafid Hasan</span></span><span class="title-mask"><span class="title-line surname">Sydney<span class="blue-dot">.</span></span></span></h1><p class="hero-summary intro-item">I build web applications, enjoy problem solving and explore what I can make next.</p><div class="hero-buttons intro-item"><a class="button button-dark" href="#work">Explore my projects ' +
    icon('down') +
    '</a><button class="resume-link" data-resume>View résumé ' +
    icon('diagonal') +
    '</button></div><div class="hero-links intro-item">' +
    external(data.github, 'GitHub') +
    external(data.facebook, 'Facebook') +
    '<a href="mailto:' +
    data.email +
    '">Email ' +
    icon('diagonal') +
    '</a></div></div><div class="portrait-composition intro-item" data-tilt><div class="portrait-backplate" aria-hidden="true"></div><figure class="hero-photo"><div class="photo-frame"><img src="/assets/rafid-portrait.webp" width="1000" height="1094" alt="Rafid Hasan Sydney" fetchpriority="high"></div><figcaption><span>RAFID HASAN SYDNEY</span><span>DEVELOPER / STUDENT</span></figcaption></figure><div class="year-sticker"><strong>04</strong><span>YEAR AT<br>UNIVERSITY</span></div><div class="hero-chip chip-web">' +
    icon('code') +
    ' Web applications</div><div class="hero-chip chip-games">' +
    icon('game') +
    ' Games & new ideas</div><a class="little-bug" href="#play" aria-label="Try the bug-catching mini game"><span class="bug-eye"><i></i></span><span class="bug-eye"><i></i></span><span class="bug-smile"></span></a><span class="bug-caption">Catch me later ↓</span></div></div><div class="hero-baseline"><span class="label">SCROLL TO DISCOVER</span><span class="label">PROJECTS · PERSONALITY · A LITTLE PLAY</span><span class="label">LOCAL TIME <span data-local-time></span></span></div></section><div class="skill-ticker" aria-hidden="true"><div>' +
    Array(2)
      .fill(
        '<span>Web development</span><b>✳</b><span>Problem solving</span><b>✳</b><span>Game development</span><b>✳</b><span>Always learning</span><b>✳</b>',
      )
      .join('') +
    '</div></div>' +
    '<section class="work section-space" id="work"><div class="wrap"><div class="section-top"><span class="label">01 / SELECTED PROJECTS</span><span class="label">THREE DIFFERENT APPLICATIONS</span></div><div class="work-heading"><h2 class="reveal-title">Things I’ve built<span class="blue-dot">.</span></h2><p class="work-instruction">Scroll through the projects ' +
    icon('arrow') +
    '</p></div></div><div class="project-stage"><div class="project-track">' +
    data.projects
      .map(
        (p, i) =>
          '<article class="project-slide" data-project="' +
          p.slug +
          '"><div class="slide-copy"><span class="slide-number">0' +
          (i + 1) +
          '<span>/03</span></span><span class="label">' +
          p.summary.toUpperCase() +
          '</span><h3>' +
          p.name +
          '</h3><p>' +
          p.description +
          '</p><div class="project-stack">' +
          p.stack
            .slice(0, 3)
            .map((s) => '<span>' + s + '</span>')
            .join('') +
          '</div><a class="button slide-detail" href="/projects/' +
          p.slug +
          '/">View project ' +
          icon('diagonal') +
          '</a></div><a class="project-image-link" href="/projects/' +
          p.slug +
          '/" aria-label="View ' +
          p.name +
          ' details">' +
          preview(p) +
          '<span class="open-disc" aria-hidden="true">' +
          icon('diagonal') +
          '</span></a></article>',
      )
      .join('') +
    '</div><div class="project-scrollbar" aria-hidden="true"><span></span></div></div><div class="wrap work-footer"><p>More projects and source code</p>' +
    external(data.github, 'Explore GitHub', 'text-link') +
    '</div></section>' +
    '<section class="about section-space" id="about"><div class="wrap"><div class="section-top"><span class="label">02 / ABOUT ME</span><span class="label">BEHIND THE PROJECTS</span></div><div class="about-grid"><h2 class="reveal-title">A bit more<br>about me<span class="blue-dot">.</span></h2><div class="about-copy"><p class="large-copy word-reveal">I’m a fourth-year Software Engineering student at Metropolitan University, Sylhet.</p><p class="reveal">I’ve always been interested in computers and technology. At university, encouragement from my teachers and seeing senior students solve problems and build projects gave that interest a clearer direction.</p><p class="reveal">Taking part in coding contests and practising on coding platforms helped me get more involved in programming. Watching programmers on YouTube, following contest walkthroughs and working through tutorials gave me new ideas to try. I enjoy figuring out why a solution works and learning from the mistakes along the way.</p><p class="reveal">That curiosity also led me to building websites and exploring game development. I like taking an idea and turning it into something people can use or play. Each project gives me a new problem to solve and a chance to improve.</p><p class="reveal">Outside programming, I read books, play games and explore new apps. I’m interested in AI and automation, and I use coding agents in my workflow while reviewing their output and understanding the code.</p><div class="interests reveal"><span>' +
    icon('code') +
    ' Problem solving</span><span>' +
    icon('book') +
    ' Reading</span><span>' +
    icon('game') +
    ' Game development</span></div></div></div></div></section>' +
    '<section class="skills wrap section-space" id="skills"><div class="section-top"><span class="label">03 / SKILLS & TOOLS</span><span class="label">USED IN MY PROJECTS</span></div><div class="skills-heading"><h2 class="reveal-title">The toolkit<span class="blue-dot">.</span></h2><p>A mix of web, mobile and development tools. Hover or tap a tool to see where I’ve used it.</p></div><div class="skill-groups">' +
    skillGroups
      .map(
        (g, i) =>
          '<article class="skill-group reveal"><div class="skill-group-title"><span class="label">0' +
          (i + 1) +
          '</span><h3>' +
          g.title +
          '</h3></div><div class="skill-items">' +
          g.items
            .map(
              ([symbol, name]) =>
                '<button class="skill-item" data-tool="' +
                esc(name) +
                '" aria-label="Where I use ' +
                esc(name) +
                '"><span class="skill-symbol" aria-hidden="true">' +
                symbol +
                '</span><span>' +
                name +
                '</span></button>',
            )
            .join('') +
          '</div></article>',
      )
      .join('') +
    '</div><div class="tool-note" role="status" aria-live="polite">Select a tool to see how it fits into my work.</div></section>' +
    '<section class="education wrap section-space" id="education"><div class="section-top"><span class="label">04 / EDUCATION</span><span class="label">2023–2027</span></div><div class="education-grid"><h2 class="reveal-title">Still learning.<br>Still building<span class="blue-dot">.</span></h2><article class="education-detail reveal"><div class="education-meta"><span class="label">UNDERGRADUATE DEGREE</span>' +
    icon('grad') +
    '</div><h3>BSc in<br>Software Engineering</h3><p>Metropolitan University</p><span class="education-location">Sylhet, Bangladesh</span><div class="education-dates"><div><span class="label">ENROLLED</span><strong>2023</strong></div><div><span class="label">CURRENT YEAR</span><strong>Fourth year</strong></div><div><span class="label">GRADUATION</span><strong>2027 <small>expected</small></strong></div></div><div class="education-draw" aria-hidden="true"><span></span></div></article></div></section>' +
    '<section class="playground section-space" id="play"><div class="wrap"><div class="section-top"><span class="label">05 / A LITTLE PLAY</span><span class="label">OPTIONAL MINI GAME</span></div><div class="play-grid"><div class="play-copy"><span class="game-tag">15 SECONDS. HOW MANY CAN YOU CATCH?</span><h2 class="reveal-title">Catch<br>the bugs<span>.</span></h2><p>A small game for a quick break. Click or tap the bug before it moves. You can also use keys 1–9 while the board is focused.</p><div class="game-stats"><div><span>SCORE</span><strong data-score>0</strong></div><div><span>TIME</span><strong data-time>15s</strong></div><div><span>BEST</span><strong data-best>0</strong></div></div><div class="game-actions"><button class="button game-start" data-game-start>Start game ' +
    icon('arrow') +
    '</button><button class="game-stop" data-game-stop disabled>End round</button></div><p class="game-status" role="status" aria-live="polite" data-game-status>Ready when you are.</p></div><div class="bug-board" tabindex="0" role="group" aria-label="Bug-catching board. Use the number keys 1 to 9.">' +
    Array.from(
      { length: 9 },
      (_, i) =>
        '<button class="bug-cell" data-cell="' +
        i +
        '" aria-label="Cell ' +
        (i + 1) +
        ', empty" disabled><span class="cell-number">' +
        (i + 1) +
        '</span><span class="cell-bug" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M22 14 16 7m26 7 6-7M12 27H4m48 0h8M12 40l-8 4m48-4 8 4M17 51l-5 7m35-7 5 7"/><ellipse cx="32" cy="37" rx="19" ry="21"/><path d="M32 19v38"/><circle cx="32" cy="18" r="13"/><circle class="eye-white" cx="27" cy="16" r="4"/><circle class="eye-white" cx="38" cy="16" r="4"/><circle class="eye-black" cx="28" cy="16" r="1.7"/><circle class="eye-black" cx="37" cy="16" r="1.7"/></svg></span></button>',
    ).join('') +
    '</div></div></div></section>' +
    '<section class="contact section-space" id="contact"><div class="wrap"><div class="section-top"><span class="label">06 / CONTACT</span><span class="label">SYLHET, BANGLADESH</span></div><a class="contact-title" href="mailto:' +
    data.email +
    '"><h2>Say hello<span>.</span></h2>' +
    icon('diagonal') +
    '</a><div class="contact-content"><p>Have a project in mind or a question about my work?<br>You can reach me by email or phone.</p><div class="contact-details"><div class="contact-email"><a href="mailto:' +
    data.email +
    '">' +
    data.email +
    '</a><button class="icon-button" data-copy="' +
    data.email +
    '" aria-label="Copy email address">' +
    icon('copy') +
    '</button></div><a class="contact-phone" href="tel:+88' +
    esc(data.phone) +
    '"><span class="label">PHONE</span><span>' +
    esc(data.phone) +
    '</span>' +
    icon('diagonal') +
    '</a></div></div><div class="contact-links">' +
    external(data.github, 'GitHub') +
    external(data.facebook, 'Facebook') +
    '<button class="resume-link" data-resume>Résumé ' +
    icon('diagonal') +
    '</button></div></div></section></main>' +
    footer() +
    end()
  );
}
