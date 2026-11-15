import { icon, header, footer, head, end } from './shared.mjs';
export function renderNotFound() {
  return (
    head('Page not found | Rafid Hasan Sydney', 'Return to the portfolio.') +
    header() +
    '<main class="not-found wrap" id="main"><span class="label">404 / PAGE NOT FOUND</span><h1>Page not found<span class="blue-dot">.</span></h1><a class="button button-dark" href="/">Back to home ' +
    icon('arrow') +
    '</a></main>' +
    footer() +
    end()
  );
}
