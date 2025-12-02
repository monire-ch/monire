/**
 * Normalize text by converting it to lowercase and splitting it into words,
 * while filtering out reserved words and words with a length of 4 or fewer characters.
 *
 * @param {string} [text] - The text to normalize.
 * @param {string[]} [reservedWords=[]] - Words to ignore during normalization.
 * @returns {string[]} - An array of normalized words.
 */
const normalizeText = (
  text?: string,
  reservedWords: string[] = [],
): string[] =>
  typeof text === "string" // Ensure the input is a string
    ? text
        .toLowerCase()
        .split(" ")
        .filter(
          (word) =>
            word !== "" && word.length > 4 && !reservedWords.includes(word),
        )
    : []; // If not a string, return an empty array

/**
 * Count the number of matching words between two arrays of strings.
 *
 * @param {string[]} arr1 - The first array of words.
 * @param {string[]} arr2 - The second array of words.
 * @returns {number} - The count of matching words between the two arrays.
 */
const countMatchingWords = (arr1: string[], arr2: string[]): number => {
  return arr1.filter((word) => arr2.includes(word)).length;
};

/**
 * Get related content (e.g., themes, posts) by comparing specified frontmatter fields
 * (like description, metaDescription, and categories) and filtering by word similarity.
 *
 * @template T - A generic type representing the structure of content items.
 * @param {T[]} [contentList=[]] - The list of all content items to search for related content.
 * @param {T} currentContent - The current content item for which to find related items.
 * @param {string[]} [keysToConsider=["description", "metaDescription", "categories"]] -
 *        The frontmatter keys to compare for similarity (e.g., description, metaDescription, categories).
 * @param {string[]} [reservedWords=["theme", "astro", "tailwindcss"]] - Words to exclude from comparison.
 * @param {number} [limit=3] - The maximum number of related content items to return.
 * @returns {T[]} - An array of related content items based on the similarity criteria.
 */
const getRelatedContent = <T extends { data: Record<string, any> }>(
  contentList: T[] = [],
  currentContent: T,
  keysToConsider: string[] = [
    "title",
    "categories",
    "description",
    "metaDescription",
  ],
  reservedWords: string[] = [],
  limit: number = 3,
): T[] => {
  // Normalize and extract relevant fields for the current content
  const normalizedCurrentFields = keysToConsider.map((key) =>
    normalizeText(currentContent.data[key], reservedWords),
  );

  // Filter and sort content based on the matching criteria
  const filteredContent = contentList
    .filter((contentItem) => {
      // Exclude the current content from results
      if (contentItem.data.title === currentContent.data.title) return false;

      // Normalize and extract relevant fields for the current item
      const normalizedItemFields = keysToConsider.map((key) =>
        normalizeText(contentItem.data[key], reservedWords),
      );

      // Count matching words across all specified keys
      const totalMatchCount = normalizedCurrentFields.reduce(
        (acc, currentFieldWords, index) =>
          acc +
          countMatchingWords(
            currentFieldWords,
            normalizedItemFields[index] || [],
          ),
        0,
      );

      // Determine if there is a matching category, if categories are considered
      const hasMatchingCategory = keysToConsider.includes("categories")
        ? contentItem.data.categories?.some((category: string) =>
            currentContent.data.categories?.includes(category),
          )
        : false;

      // Include the content if it has matches or matching categories
      return totalMatchCount > 0 || hasMatchingCategory;
    })
    .sort((a, b) => {
      // Sort by total matches for all fields
      const aMatchCount = keysToConsider.reduce(
        (acc, key, index) =>
          acc +
          countMatchingWords(
            normalizeText(a.data[key], reservedWords),
            normalizedCurrentFields[index],
          ),
        0,
      );
      const bMatchCount = keysToConsider.reduce(
        (acc, key, index) =>
          acc +
          countMatchingWords(
            normalizeText(b.data[key], reservedWords),
            normalizedCurrentFields[index],
          ),
        0,
      );

      // Sort by match count difference
      return bMatchCount - aMatchCount;
    });

  // Limit the number of related content items
  return filteredContent.slice(0, limit);
};

export default getRelatedContent;
