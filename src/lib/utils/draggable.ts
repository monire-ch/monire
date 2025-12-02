import {
  Engine,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Body,
  Events,
  Engine as MatterEngine,
  World as MatterWorld,
  Body as MatterBody,
} from "matter-js";

// Define a custom type for draggable items
interface DraggableItem {
  element: HTMLElement;
  width: number;
  height: number;
  text: string;
  styles: {
    background: string;
    color: string;
    borderRadius: string;
    fontSize: string;
    padding: string;
    borderColor?: string;
  };
}

// Extend Matter.Body to include our custom "item" property
declare module "matter-js" {
  interface Body {
    item?: DraggableItem;
  }
}

const draggable = (): void => {
  const wrapper: HTMLElement | null =
    document.querySelector(".draggable-wrapper");
  const draggableItems: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".draggable-wrapper .draggable",
  );

  const items: DraggableItem[] = [];

  if (wrapper) {
    draggableItems.forEach((item: HTMLElement) => {
      items.push({
        element: item,
        width: item.offsetWidth,
        height: item.offsetHeight,
        text: item.innerText,
        styles: {
          background: window.getComputedStyle(item).backgroundColor,
          color: window.getComputedStyle(item).color,
          borderRadius: window.getComputedStyle(item).borderRadius,
          fontSize: window.getComputedStyle(item).fontSize,
          padding: window.getComputedStyle(item).padding,
          borderColor: window.getComputedStyle(item).borderColor,
        },
      });
    });

    const engine: MatterEngine = Engine.create();
    const world: MatterWorld = engine.world;

    engine.gravity.y = 1;

    const customRender = (): void => {
      Composite.allBodies(engine.world).forEach((body: MatterBody) => {
        if (body.item) {
          const { element, width, height } = body.item;
          const { x, y } = body.position;
          const angle = body.angle;

          element.style.transform = `translate(${x - width / 2}px, ${y - height / 2}px) rotate(${angle}rad)`;

          const content = body.item.element.querySelector(
            ".content",
          ) as HTMLElement | null;
          if (content) {
            content.style.transform = `rotate(${-angle}rad)`;
          }
        }
      });

      Engine.update(engine, 1000 / 60);

      requestAnimationFrame(customRender);
    };

    customRender();

    const getRandomPosition = (): { x: number; y: number } => {
      const x = Math.random() * (window.innerWidth - 200) + 100;
      const y = Math.random() * (window.innerHeight - 200) + 100;
      return { x, y };
    };

    const createBodiesFromItems = (): void => {
      items.forEach((item: DraggableItem) => {
        const position = getRandomPosition();
        const body: MatterBody = Bodies.rectangle(
          position.x,
          position.y,
          item.width,
          item.height,
          {
            render: {
              fillStyle: "transparent",
              strokeStyle: item.styles.borderColor || "transparent",
              lineWidth: 0,
            },
          },
        );

        Composite.add(world, body);

        body.item = item;
      });
    };

    createBodiesFromItems();

    const mouse: any = Mouse.create(wrapper);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        render: { visible: false, type: "spring" },
      },
    }) as any;
    Composite.add(world, mouseConstraint);

    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchstart",
      mouseConstraint.mouse.mousedown,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchmove",
      mouseConstraint.mouse.mousemove,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchend",
      mouseConstraint.mouse.mouseup,
    );

    mouseConstraint.mouse.element.addEventListener(
      "touchstart",
      mouseConstraint.mouse.mousedown,
      { passive: true },
    );
    mouseConstraint.mouse.element.addEventListener("touchmove", (e: any) => {
      if (mouseConstraint.body) {
        mouseConstraint.mouse.mousemove(e);
      }
    });
    mouseConstraint.mouse.element.addEventListener("touchend", (e: any) => {
      if (mouseConstraint.body) {
        mouseConstraint.mouse.mouseup(e);
      }
    });

    wrapper.addEventListener("mouseleave", (event: Event) => {
      mouseConstraint.mouse.mouseup(event);
    });

    const checkBounds = (body: MatterBody): void => {
      const margin = 0;
      const wrapperWidth = wrapper.offsetWidth;
      const wrapperHeight = wrapper.offsetHeight;

      const minX = body.bounds.max.x - body.position.x + margin;
      const maxX =
        wrapperWidth - (body.bounds.max.x - body.position.x + margin);
      const minY = body.bounds.max.y - body.position.y + margin;
      const maxY =
        wrapperHeight - (body.bounds.max.y - body.position.y + margin);

      if (body.position.x < minX) {
        Body.setPosition(body, { x: minX, y: body.position.y });
        Body.setVelocity(body, {
          x: Math.abs(body.velocity.x) * 0.8,
          y: body.velocity.y,
        });
        Body.setAngularVelocity(body, body.angularVelocity * -0.8);
      } else if (body.position.x > maxX) {
        Body.setPosition(body, { x: maxX, y: body.position.y });
        Body.setVelocity(body, {
          x: -Math.abs(body.velocity.x) * 0.8,
          y: body.velocity.y,
        });
        Body.setAngularVelocity(body, body.angularVelocity * -0.8);
      }

      if (body.position.y < minY) {
        Body.setPosition(body, { x: body.position.x, y: minY });
        Body.setVelocity(body, {
          x: body.velocity.x,
          y: Math.abs(body.velocity.y) * 0.8,
        });
        Body.setAngularVelocity(body, body.angularVelocity * -0.8);
      } else if (body.position.y > maxY) {
        Body.setPosition(body, { x: body.position.x, y: maxY });
        Body.setVelocity(body, {
          x: body.velocity.x,
          y: -Math.abs(body.velocity.y) * 0.8,
        });
        Body.setAngularVelocity(body, body.angularVelocity * -0.8);
      }
    };

    Events.on(engine, "beforeUpdate", () => {
      Composite.allBodies(world).forEach((body: MatterBody) => {
        checkBounds(body);
      });
    });

    // ===== Additional Custom Render Loop for DOM Elements =====
    // This loop updates the position and rotation of draggable DOM items
    function additionalCustomRender(): void {
      Composite.allBodies(engine.world).forEach((body: MatterBody) => {
        if (body.item && body.item.element) {
          const { x, y } = body.position;
          const halfWidth = body.item.width / 2;
          const halfHeight = body.item.height / 2;
          body.item.element.style.position = "absolute";
          body.item.element.style.left = `${x - halfWidth}px`;
          body.item.element.style.top = `${y - halfHeight}px`;
          body.item.element.style.transform = `rotate(${body.angle}rad)`;
        }
      });
      requestAnimationFrame(additionalCustomRender);
    }
    additionalCustomRender();

    window.addEventListener("resize", () => {
      Composite.allBodies(world).forEach((body: MatterBody) => {
        if (body.item && body.item.element) {
          // Get new dimensions from the DOM element
          const newWidth = body.item.element.offsetWidth;
          const newHeight = body.item.element.offsetHeight;

          // Calculate scale factors relative to the stored dimensions
          const scaleX = newWidth / body.item.width;
          const scaleY = newHeight / body.item.height;

          // Only update if there's a change (scale factors different than 1)
          if (scaleX !== 1 || scaleY !== 1) {
            // Scale the physics body to match the new dimensions
            Body.scale(body, scaleX, scaleY);
            // Update stored dimensions so that subsequent calculations are correct
            body.item.width = newWidth;
            body.item.height = newHeight;
          }
        }
      });
    });
  }
};

export default draggable;
