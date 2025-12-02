// @ts-nocheck
/**
 * FastDom Utility for batching DOM reads and writes.
 */
class FastDom {
  constructor() {
    this.reads = [];
    this.writes = [];
    this.raf = this._requestAnimationFrame.bind(window);
  }

  _requestAnimationFrame(callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        return setTimeout(cb, 16);
      }
    )(callback);
  }

  _schedule() {
    if (!this.scheduled) {
      this.scheduled = true;
      this.raf(this._processTasks.bind(this));
    }
  }

  _processTasks() {
    let error;
    try {
      this._execute(this.reads);
      this._execute(this.writes);
    } catch (e) {
      error = e;
    }
    this.scheduled = false;
    if (this.reads.length || this.writes.length) {
      this._schedule();
    }
    if (error) {
      throw error;
    }
  }

  _execute(tasks) {
    let task;
    while ((task = tasks.shift())) {
      task();
    }
  }

  _removeFromQueue(queue, task) {
    const index = queue.indexOf(task);
    if (~index) {
      queue.splice(index, 1);
      return true;
    }
    return false;
  }

  measure(task, context) {
    const boundTask = context ? task.bind(context) : task;
    this.reads.push(boundTask);
    this._schedule();
    return boundTask;
  }

  mutate(task, context) {
    const boundTask = context ? task.bind(context) : task;
    this.writes.push(boundTask);
    this._schedule();
    return boundTask;
  }

  clear(task) {
    return (
      this._removeFromQueue(this.reads, task) ||
      this._removeFromQueue(this.writes, task)
    );
  }
}

const fastdom = new FastDom();

/**
 * OverflowScroller - Makes an element smartly sticky.
 */
export class stickySidebar {
  constructor(element, options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error("Invalid element provided to stickySidebar.");
    }

    this.element = element;
    this.options = options;
    this.lastKnownY = window.scrollY;
    this.currentTop = 0;

    // Ensure the top offset is valid
    const computedTop = window.getComputedStyle(this.element).top;
    this.initialTopOffset = options.offsetTop || parseInt(computedTop, 10) || 0;

    this.attachListeners();
  }

  attachListeners() {
    this.checkPositionListener = this.checkPosition.bind(this);
    window.addEventListener("scroll", this.checkPositionListener);
  }

  destroy() {
    window.removeEventListener("scroll", this.checkPositionListener);
  }

  checkPosition() {
    fastdom.measure(() => {
      if (!this.element) return; // Ensure element exists before accessing properties

      const bounds = this.element.getBoundingClientRect();
      const maxTop =
        bounds.top +
        window.scrollY -
        this.element.offsetTop +
        this.initialTopOffset;

      const minTop =
        this.element.clientHeight -
        window.innerHeight +
        (this.options.offsetBottom || 0);

      if (window.scrollY < this.lastKnownY) {
        this.currentTop -= window.scrollY - this.lastKnownY;
      } else {
        this.currentTop += this.lastKnownY - window.scrollY;
      }

      this.currentTop = Math.min(
        Math.max(this.currentTop, -minTop),
        maxTop,
        this.initialTopOffset,
      );

      this.lastKnownY = window.scrollY;
    });

    fastdom.mutate(() => {
      if (!this.element) return; // Ensure element exists before mutating properties
      this.element.style.top = `${this.currentTop}px`;
    });
  }
}
