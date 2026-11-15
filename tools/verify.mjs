import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pages = [
  'index.html',
  'projects/bandhan/index.html',
  'projects/bazardor/index.html',
  'projects/fitlog/index.html',
  '404.html',
];
const pageContents = new Map();
for (const page of pages) {
  const text = await fs.readFile(path.join(dist, page), 'utf8');
  pageContents.set(page, text);
  assert.match(text, /<title>[^<]+<\/title>/);
  assert.match(text, /<html lang="en"/);
  assert.match(text, /name="viewport"/);
  assert.match(text, /<main[^>]* id="main"/);
  assert.doesNotMatch(text, /undefined|lorem ipsum|href="javascript:/i);
  const ids = [...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'Duplicate IDs in ' + page);
  for (const [, kind, ref] of text.matchAll(/\s(src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(ref)) continue;
    if (ref.startsWith('#')) {
      assert.ok(
        ids.includes(ref.slice(1)),
        'Missing anchor ' + ref + ' in ' + page,
      );
      continue;
    }
    const [url, anchor] = ref.split('#');
    let target = url.startsWith('/')
      ? url.slice(1)
      : path.join(path.dirname(page), url);
    if (!path.extname(target)) target = path.join(target, 'index.html');
    await fs.access(path.join(dist, target));
    if (anchor) {
      const content =
        pageContents.get(target) ||
        (await fs.readFile(path.join(dist, target), 'utf8'));
      assert.ok(
        content.includes('id="' + anchor + '"'),
        'Missing target anchor ' + ref,
      );
    }
  }
}
const home = pageContents.get('index.html');
for (const section of ['work', 'about', 'skills', 'education', 'contact'])
  assert.ok(home.includes('id="' + section + '"'));
for (const slug of ['bandhan', 'bazardor', 'fitlog']) {
  const html = pageContents.get('projects/' + slug + '/index.html');
  for (const heading of [
    'TECHNOLOGY STACK',
    'OVERVIEW',
    'Live website',
    'Client repository',
    'Challenges',
    'next steps',
  ])
    assert.ok(html.includes(heading), slug + ' missing ' + heading);
}
assert.equal((home.match(/class="project-slide"/g) || []).length, 3);
assert.ok(home.includes('2023') && home.includes('2027'));
assert.doesNotMatch(
  home,
  /CGPA|AI expert|years of experience|Senior Developer|linkedin\.com/,
);
const css = await fs.readFile(path.join(dist, 'styles.css'), 'utf8');
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(/max-width:\s*360px/.test(css));
assert.ok(/data-theme\s*=\s*["']?dark/.test(css));
const fonts = await fs.readFile(path.join(dist, 'fonts.css'), 'utf8');
for (const [, file] of fonts.matchAll(/url\(\.\/([^)]*)\)/g))
  await fs.access(path.join(dist, file));
console.log(
  'PASS: five HTML pages, three complete case studies, local assets/fonts, unique anchors, responsive styles and content safeguards.',
);
