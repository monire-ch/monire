/**
 * Recursively clones an object or array, creating a deep copy.
 *
 * @param obj - The object or array to clone.
 * @returns A deep copy of the input object or array.
 *
 * @remarks
 * If you do not use this function and instead assign the object or array directly (e.g., `const newObj = originalObj`),
 * both variables will reference the same memory. Changes to one will affect the other.
 *
 * Example:
 * ```typescript
 * const original = { a: 1, b: { c: 2 } };
 * const shallowCopy = original; // Points to the same object in memory.
 * shallowCopy.b.c = 42;
 * console.log(original.b.c); // Outputs: 42
 *
 * const deepCopy = recursiveCloneObject(original); // Creates a new, independent object.
 * deepCopy.b.c = 99;
 * console.log(original.b.c); // Outputs: 42 (unchanged).
 * ```
 */
export function recursiveCloneObject(obj: any) {
  // If the input is not an object or is null, return it as is (primitive values).
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Determine if the input is an array or object, and initialize the copy accordingly.
  const copy: any = Array.isArray(obj) ? [] : {};

  // Recursively copy each property or element.
  for (const key in obj) {
    copy[key] = recursiveCloneObject(obj[key]);
  }

  // Return the deep copy.
  return copy;
}
