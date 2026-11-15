(() => {
  class BugHuntCore {
    constructor({
      durationMs = 15000,
      now = () => Date.now(),
      random = Math.random,
    } = {}) {
      this.durationMs = durationMs;
      this.now = now;
      this.random = random;
      this.running = false;
      this.score = 0;
      this.target = -1;
      this.deadline = 0;
    }
    start() {
      this.running = true;
      this.score = 0;
      this.target = -1;
      this.deadline = this.now() + this.durationMs;
      this.moveTarget();
      return this.state();
    }
    remainingMs() {
      return this.running ? Math.max(0, this.deadline - this.now()) : 0;
    }
    tick() {
      if (this.running && this.now() >= this.deadline) this.end();
      return this.state();
    }
    moveTarget() {
      if (!this.running) return -1;
      if (this.now() >= this.deadline) {
        this.end();
        return -1;
      }
      const old = this.target;
      let next = Math.min(
        old < 0 ? 8 : 7,
        Math.floor(this.random() * (old < 0 ? 9 : 8)),
      );
      if (old >= 0 && next >= old) next++;
      this.target = next;
      return next;
    }
    hit(index) {
      this.tick();
      if (!this.running || index !== this.target) return false;
      this.score++;
      this.moveTarget();
      return true;
    }
    end() {
      this.running = false;
      this.target = -1;
      return this.state();
    }
    state() {
      return {
        running: this.running,
        score: this.score,
        target: this.target,
        remainingMs: this.remainingMs(),
      };
    }
  }
  globalThis.BugHuntCore = BugHuntCore;
})();
