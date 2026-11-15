import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { data } from '../src/templates/shared.mjs';
import { renderHome } from '../src/templates/home.mjs';
import { renderProject } from '../src/templates/project.mjs';
import { renderNotFound } from '../src/templates/not-found.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
await fs.rm(dist, { recursive: true, force: true });
await fs.cp(path.join(root, 'public'), dist, { recursive: true });
await fs.cp(path.join(root, 'src/client'), path.join(dist, 'scripts'), {
  recursive: true,
});
await fs.copyFile(
  path.join(root, 'src/styles/main.css'),
  path.join(dist, 'styles.css'),
);
await fs.copyFile(
  path.join(root, 'src/styles/fonts.css'),
  path.join(dist, 'fonts.css'),
);
await fs.writeFile(path.join(dist, 'index.html'), renderHome());
for (const [i, p] of data.projects.entries()) {
  const target = path.join(dist, 'projects', p.slug);
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(
    path.join(target, 'index.html'),
    renderProject(p, data.projects[(i + 1) % data.projects.length], i),
  );
}
await fs.writeFile(path.join(dist, '404.html'), renderNotFound());
console.log('Built portfolio and three project detail pages.');
