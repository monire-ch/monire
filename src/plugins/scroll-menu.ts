interface ScrollMenuOptions {
  duration: number;
  activeOffset: number;
  scrollOffset: number;
  smoothScroll: boolean; // Option to control smooth or immediate scroll
  autoSetFirstActive: boolean; // New option to auto-set the first item as active
  afterActive?: (item: HTMLElement) => void; // New callback option
  beforeActive?: (item: HTMLElement) => void; // New callback option
  easingFunction: (
    time: number,
    start: number,
    change: number,
    duration: number,
  ) => number;
}

export class ScrollMenu {
  items: HTMLElement[] = [];
  options: ScrollMenuOptions = {} as ScrollMenuOptions; // Initialize options as an empty object
  positions: number[] = [];

  constructor(
    menuItems: string | string[],
    options: Partial<ScrollMenuOptions>,
  ) {
    this.initDefaultOptions(); // Ensure options are initialized here
    this.extendOptions(options); // Apply user-provided options
    this.initMenuItems(menuItems);
    this.getSectionsPositions();
    this.bindWindowEvents();
    this.bindMenuItems();

    if (this.options.autoSetFirstActive) {
      this.changeActiveMenuItem(this.items[0]); // Automatically set the first item active on initialization
    }
  }

  initDefaultOptions() {
    this.options = {
      duration: 400,
      activeOffset: 40,
      scrollOffset: 10,
      smoothScroll: true, // Default to smooth scroll
      autoSetFirstActive: true, // Default to automatically setting the first item active
      easingFunction: (t, i, e, n) => {
        return (t /= n / 2) < 1
          ? (e / 2) * t * t * t + i
          : (e / 2) * ((t -= 2) * t * t + 2) + i;
      },
      afterActive: undefined, // Default callback is undefined
      beforeActive: undefined, // Default callback is undefined
    };
  }

  extendOptions(options: Partial<ScrollMenuOptions>) {
    if (options) {
      for (let key in options) {
        if (options.hasOwnProperty(key)) {
          const typedKey = key as keyof ScrollMenuOptions;
          const value = options[typedKey];

          if (value !== undefined) {
            // Only assign valid (non-undefined) values
            this.options[typedKey] = value as never;
          }
        }
      }
    }
  }

  initMenuItems(menuItems: string | string[]) {
    this.items = [];
    if (!Array.isArray(menuItems)) menuItems = [menuItems];

    menuItems.forEach((selector: string) => {
      const elements = Array.from(
        document.querySelectorAll(selector),
      ) as HTMLElement[];
      this.items = this.items.concat(elements);
    });
  }

  getTargetOffset(item: HTMLElement): number {
    const href = item.getAttribute("href");
    const target = document.querySelector(href!) as HTMLElement;
    return href && !href.match(/^#?$/) ? target.offsetTop : 0;
  }

  bindWindowEvents() {
    window.addEventListener("load", this.onWindowUpdate.bind(this), false);
    window.addEventListener("scroll", this.onWindowUpdate.bind(this), false);
    window.addEventListener("resize", this.onWindowUpdate.bind(this), false);
  }

  bindMenuItems() {
    this.items.forEach((item) => {
      item.addEventListener("click", this.onMenuItemClick.bind(this), false);
    });
  }

  onWindowUpdate() {
    this.getSectionsPositions();
    this.updateActiveMenuItem();
  }

  getSectionsPositions() {
    this.positions = this.items.map(
      (item) => this.getTargetOffset(item) - this.options.activeOffset,
    );
  }

  updateActiveMenuItem() {
    const scrollOffset = this.getScrollOffset();

    // Find all the items whose sections are in the viewport (i.e., whose positions are less than or equal to the scrollOffset)
    const activeItems = this.items.filter(
      (_, index) => this.positions[index] <= scrollOffset,
    );

    // If no items are active and we're near the top of the page, activate the first menu item
    if (activeItems.length === 0) {
      if (scrollOffset <= this.options.activeOffset) {
        this.changeActiveMenuItem(this.items[0]); // Always activate the first item at the top
      }
      return; // Exit if no active item found
    }

    // If active items are found, activate the last one in the viewport
    const lastActiveItem = activeItems[activeItems.length - 1];
    this.changeActiveMenuItem(lastActiveItem);
  }

  getScrollOffset(): number {
    return document.body.scrollTop || window.scrollY;
  }

  resetActiveMenuItem() {
    this.items.forEach((item) => {
      item.classList.remove("active");
    });
  }

  changeActiveMenuItem(item: HTMLElement) {
    if (!item.classList.contains("active")) {
      this.resetActiveMenuItem();
      item.classList.add("active");

      // Call the afterActive callback after the active class is added
      if (typeof this.options.afterActive === "function") {
        this.options.afterActive(item);
      }
    }
  }

  onMenuItemClick(event: MouseEvent) {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const index = this.items.indexOf(target);

    // Call the beforeActive callback before the scroll animation starts
    if (index !== -1 && typeof this.options.beforeActive === "function") {
      this.options.beforeActive(this.items[index]);
    }

    if (index !== -1) {
      this.updateLocationHash(index);
      this.animatePageScroll(index);
    }
  }

  updateLocationHash(index: number) {
    const href = this.items[index].getAttribute("href");
    const currentLocation = location.pathname + location.search;

    if (href && !href.match(/^#?$/)) {
      history.pushState(href, document.title, currentLocation + href);
    }
  }

  animatePageScroll(index: number) {
    const offset = -this.options.activeOffset + this.options.scrollOffset;
    const targetPosition = this.positions[index] - offset;

    if (this.options.smoothScroll) {
      // Smooth scroll with animation
      this.scrollTo(targetPosition, this.options.duration);
    } else {
      // Immediate scroll to the target position
      window.scrollTo(0, targetPosition);
      this.updateActiveMenuItem(); // Update active state immediately
    }
  }

  scrollTo(targetPosition: number, duration: number, elapsedTime = 0) {
    if (duration <= 0) return;

    const change = targetPosition - this.getScrollOffset();
    elapsedTime += 10; // Small time step for animation

    setTimeout(() => {
      const position = this.options.easingFunction(
        elapsedTime,
        this.getScrollOffset(),
        change,
        duration,
      );
      window.scroll(0, position);

      if (elapsedTime < duration) {
        this.scrollTo(targetPosition, duration, elapsedTime);
      } else {
        this.updateActiveMenuItem(); // Ensure active menu item is updated
      }
    }, 10);
  }
}

// Declare ScrollMenu on the window object
declare global {
  interface Window {
    ScrollMenu: typeof ScrollMenu;
  }
}

window.ScrollMenu = ScrollMenu;
