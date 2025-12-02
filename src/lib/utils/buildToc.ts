import type { TocHeading } from "@/types";
import config from ".astro/config.generated.json" with { type: "json" };

interface TocOptions {
  startLevel: number;
  endLevel: number;
  ordered: boolean;
}

export default function buildToc(headings: TocHeading[]): TocHeading[] {
  const { startLevel, endLevel, ordered } = config.settings.markup
    .tableOfContents as TocOptions;

  const toc: TocHeading[] = [];
  const parentHeadings: TocHeading[] = [];

  headings.forEach((heading) => {
    if (heading.depth >= startLevel && heading.depth <= endLevel) {
      const newHeading: TocHeading = { ...heading, subheadings: [] };

      // Find the correct parent for the current heading
      while (
        parentHeadings.length > 0 &&
        parentHeadings[parentHeadings.length - 1].depth >= newHeading.depth
      ) {
        parentHeadings.pop(); // Remove invalid parents
      }

      if (parentHeadings.length === 0) {
        // Top-level heading
        toc.push(newHeading);
      } else {
        // Add as a child to the closest valid parent
        const parent = parentHeadings[parentHeadings.length - 1];
        parent.subheadings?.push(newHeading);
      }

      // Push the current heading to the stack of parents
      parentHeadings.push(newHeading);
    }
  });

  // Optionally sort the TOC
  if (ordered) {
    sortToc(toc);
  }

  return toc;
}

// Helper function to sort TOC entries alphabetically or based on other criteria
function sortToc(toc: TocHeading[]): void {
  toc.sort((a, b) => a.text.localeCompare(b.text));
  toc.forEach((heading) => {
    if (heading.subheadings && heading.subheadings.length > 0) {
      sortToc(heading.subheadings);
    }
  });
}
