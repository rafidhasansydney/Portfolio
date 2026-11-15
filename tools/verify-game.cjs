const fs = require('node:fs'),
  vm = require('node:vm'),
  assert = require('node:assert/strict'),
  path = require('node:path');
const scope = {};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '../src/client/game.js'), 'utf8'),
  { globalThis: scope, Date, Math },
);
let now = 0;
const game = new scope.BugHuntCore({ now: () => now, random: () => 0 });
assert.equal(game.hit(0), false);
game.start();
assert.equal(game.target, 0);
assert.equal(game.remainingMs(), 15000);
assert.equal(game.hit(7), false);
assert.equal(game.score, 0);
assert.equal(game.hit(0), true);
assert.equal(game.score, 1);
assert.equal(game.target, 1);
assert.equal(game.hit(0), false);
now = 14999;
assert.equal(game.hit(1), true);
assert.equal(game.score, 2);
now = 15000;
assert.equal(game.hit(game.target), false);
assert.equal(game.running, false);
assert.equal(game.remainingMs(), 0);
assert.equal(game.score, 2);
now = 20000;
game.start();
assert.equal(game.score, 0);
assert.equal(game.remainingMs(), 15000);
for (let i = 0; i < 100; i++) {
  const old = game.target;
  game.moveTarget();
  assert.ok(game.target >= 0 && game.target <= 8);
  assert.notEqual(game.target, old);
}
game.end();
assert.equal(game.target, -1);
assert.equal(game.hit(0), false);
console.log(
  'PASS: scoring, wrong clicks, duplicate clicks, exact deadline, restart, manual end and valid moving targets.',
);
