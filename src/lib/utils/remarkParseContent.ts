import { visit } from "unist-util-visit";

/**
 * Parse markdown content
 * Add classes in markdown heading by [.class .another-class]
 * Add loading="lazy" to images
 * @returns {any}
 */

export default function remarkParseContent(): any {
  return (tree: any) => {
    // Add options to add classes in markdown heading by [.class .another-class]
    visit(tree, "heading", (node) => {
      // Get the heading text in one pass
      const headingText = node.children
        .map((child: any) => child.value)
        .join("");

      // Use a single regex to match and extract all classes within square brackets
      const classRegex = /\[([^\]]+)\]/g;
      let match;
      let classes = [];

      // Extract classes starting with '.' in a single loop
      while ((match = classRegex.exec(headingText)) !== null) {
        const classList = match[1].split(/\s+/); // Split the classes
        for (const word of classList) {
          if (word.startsWith(".")) {
            // Remove the leading dot and add the class
            classes.push(word.slice(1));
          }
        }
      }

      // If classes are found, add them to the node's class attribute
      if (classes.length > 0) {
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};

        const newClass = classes.join(" ");
        if (node.data.hProperties.class) {
          node.data.hProperties.class += " " + newClass;
        } else {
          node.data.hProperties.class = newClass;
        }
      }

      // Remove square brackets [] from heading text in one pass
      node.children = node.children?.map((child: any) => ({
        ...child,
        value: child.value.replace(classRegex, "").trim(),
      }));
    });

    // Add loading="lazy" attribute to images
    visit(tree, "image", (node: any) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.loading = "lazy";
    });
  };
}
