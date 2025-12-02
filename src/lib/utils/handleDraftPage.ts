/**
 * Handles draft pages by returning a 404 response if the page is marked as draft in frontmatter.
 * - Sets response to 404 if `draft` is true, excluding it from production and development output.
 * - Optionally excludes draft pages from the sitemap.
 *
 * @param {PageData} pageData - The page's frontmatter data object
 * @returns {Response | undefined} A 404 Response if draft is true; otherwise undefined.
 */
function handleDraftPage(pageData: any): Response | undefined {
  if (pageData.draft && import.meta.env.PROD) {
    // Return a 404 response to exclude the page from `dist` folder output
    return new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  // Return undefined if the page is not a draft or in development mode
  return undefined;
}

export default handleDraftPage;
