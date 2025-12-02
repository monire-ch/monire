const dateFormat = (
  date: Date | string,
  pattern: string = "dd MMM, yyyy",
): string => {
  const dateObj = new Date(date);

  if (pattern === "dd MMM, yyyy") {
    const formatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formatter.format(dateObj);
  }

  throw new Error(`Unsupported pattern: ${pattern}`);
};

export default dateFormat;
