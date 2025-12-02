export default function removeEmptyKeys(obj: any): any {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Set empty strings and empty objects to null
    if (
      value === "" ||
      (value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0)
    ) {
      obj[key] = null;
    }
    // Recursively clean arrays
    else if (Array.isArray(value)) {
      obj[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? removeEmptyKeys(item)
          : item,
      );
    }
    // Recursively clean nested objects
    else if (typeof value === "object" && value !== null) {
      removeEmptyKeys(value);
    }
  });

  return obj;
}
