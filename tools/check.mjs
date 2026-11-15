import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
for (const file of await readdir(
  fileURLToPath(new URL('../src/client/', import.meta.url)),
)) {
  const result = spawnSync(
    process.execPath,
    [
      '--check',
      fileURLToPath(new URL('../src/client/' + file, import.meta.url)),
    ],
    { stdio: 'inherit' },
  );
  if (result.status) process.exit(result.status);
}
for (const file of ['verify.mjs', 'verify-game.cjs']) {
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(new URL(file, import.meta.url))],
    {
      stdio: 'inherit',
    },
  );
  if (result.status) process.exit(result.status);
}
