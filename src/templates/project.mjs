import {
  icon,
  external,
  pills,
  header,
  footer,
  head,
  end,
  preview,
} from './shared.mjs';
export function renderProject(p, next, i) {
  return (
    head(p.name + ' | Rafid Hasan Sydney', p.description) +
    header() +
    '<main id="main" class="case-page"><section class="case-hero wrap"><a class="back-link" href="/#work">' +
    icon('arrow') +
    ' All projects</a><div class="case-title-row"><div><span class="label">PROJECT 0' +
    (i + 1) +
    ' / WEB APPLICATION / 2026</span><h1 class="reveal-title">' +
    p.name +
    '<span class="blue-dot">.</span></h1><p>' +
    p.summary +
    '</p></div><div class="case-cta">' +
    external(p.live, 'Live website', 'button button-dark') +
    external(p.repo, 'Client repository', 'text-link') +
    '</div></div>' +
    preview(p) +
    '</section><section class="case-overview wrap section-space"><div class="case-section-label"><span class="label">01 / OVERVIEW</span></div><div class="case-overview-copy"><h2>' +
    p.summary +
    '</h2><p>' +
    p.overview +
    '</p><div class="case-tech"><span class="label">TECHNOLOGY STACK</span><div>' +
    pills(p.stack) +
    '</div></div></div></section><section class="case-features section-space"><div class="wrap"><div class="section-top"><span class="label">02 / FEATURES</span><span class="label">WHAT THE APPLICATION DOES</span></div><h2 class="reveal-title">Features</h2><div class="feature-grid">' +
    p.features
      .map(
        (f, j) =>
          '<article class="reveal"><span class="label">0' +
          (j + 1) +
          '</span><p>' +
          f +
          '</p>' +
          icon('diagonal') +
          '</article>',
      )
      .join('') +
    '</div></div></section><section class="case-challenges wrap section-space"><div class="section-top"><span class="label">03 / DEVELOPMENT</span><span class="label">IMPLEMENTATION DETAILS</span></div><h2 class="reveal-title">Challenges & decisions</h2><div class="challenge-list">' +
    p.challenges
      .map(
        (c, j) =>
          '<article class="reveal"><span class="label">0' +
          (j + 1) +
          '</span><h3>' +
          c.title +
          '</h3><p>' +
          c.text +
          '</p></article>',
      )
      .join('') +
    '</div></section><section class="case-future wrap section-space"><div class="case-section-label"><span class="label">04 / FUTURE DEVELOPMENT</span><h2>Possible<br>next steps</h2></div><div><p class="future-note">Ideas for a future version of the application.</p><ul>' +
    p.future
      .map((f) => '<li class="reveal">' + icon('arrow') + f + '</li>')
      .join('') +
    '</ul></div></section><section class="case-next"><div class="wrap"><span class="label">NEXT PROJECT</span><a href="/projects/' +
    next.slug +
    '/"><h2>' +
    next.name +
    '</h2>' +
    icon('diagonal') +
    '</a><a class="text-link" href="/#work">Back to selected work ' +
    icon('arrow') +
    '</a></div></section></main>' +
    footer() +
    end()
  );
}
