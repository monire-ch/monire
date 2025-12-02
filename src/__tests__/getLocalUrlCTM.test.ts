import config from "../../.astro/config.generated.json";
import { getLocaleUrlCTM } from "../lib/utils/i18nUtils";

const paths = [
  "http://localhost:4321",
  "http://localhost:4321/en",
  "http://localhost:4321/fr",
  "http://localhost:4321/pricing",
  "http://localhost:4321/en/pricing",
  "http://localhost:4321/fr/pricing",
  "http://localhost:4321/frog",
  "http://localhost:4321/fr/frog",
  "http://localhost:4321/en/engineer",

  "",
  "/en",
  "/fr",
  "/en/pricing",
  "/fr/pricing",
  "/fr/frog",
  "/en/engineer",
  "/engineer",
  "/frog",
  "/pricing",

  "http://localhost:4321/",
  "http://localhost:4321/en/",
  "http://localhost:4321/fr/",
  "http://localhost:4321/en/pricing/",
  "http://localhost:4321/fr/pricing/",
  "http://localhost:4321/fr/frog/",
  "http://localhost:4321/en/engineer/",
  "http://localhost:4321/frog/",
  "http://localhost:4321/engineer/",

  "/",
  "/en/",
  "/fr/",
  "/en/pricing/",
  "/fr/pricing/",
  "/fr/frog/",
  "/en/engineer/",
  "/frog/",
  "/engineer/",
];

const {
  settings: {
    multilingual: { defaultLanguage, showDefaultLangInUrl },
  },
  site: { trailingSlash },
} = config;

describe("getLocaleUrlCTM", () => {
  const prependValue = "case-studies";

  test.each(paths)("Handles URL: %s", (path) => {
    const resultWithDefaultLang = getLocaleUrlCTM(path, "en", prependValue);
    const resultWithOtherLang = getLocaleUrlCTM(path, "fr", prependValue);

    // Split the URL into segments for precise checks
    const defaultLangSegments = resultWithDefaultLang.split("/");
    const otherLangSegments = resultWithOtherLang.split("/");

    if (!showDefaultLangInUrl && defaultLanguage === "en") {
      // Check if "/en" exists as a standalone segment
      expect(defaultLangSegments.includes("en")).toBe(false);
    } else {
      // Ensure "/en" is not present for the default language
      expect(defaultLangSegments.includes("en")).toBe(true);

      // Check if "/fr" exists as a standalone segment for the other language
      expect(otherLangSegments.includes("fr")).toBe(true);
    }

    // Ensure trailing slash is as per configuration
    expect(resultWithDefaultLang.endsWith("/")).toBe(trailingSlash);
    expect(resultWithOtherLang.endsWith("/")).toBe(trailingSlash);
  });

  test("Handles absolute URLs and preserves anchors", () => {
    const url = "http://localhost:4321/en/pricing/#example-anchor";
    const result = getLocaleUrlCTM(url, "en", prependValue);
    expect(result).toBe(
      "http://localhost:4321/case-studies/pricing/#example-anchor",
    );
  });

  test("Handles relative URL file extension in URL", () => {
    const url = "en/case-studies-01.mdx";
    const result = getLocaleUrlCTM(url, "en", prependValue);
    const expected =
      showDefaultLangInUrl && defaultLanguage === "en"
        ? "/en/case-studies/case-studies-01/"
        : "/case-studies/case-studies-01/";
    expect(result).toBe(expected);
  });

  test("Handles relative URL with language directory in URL", () => {
    const url = "french/case-studies-01";
    const result = getLocaleUrlCTM(url, "en", prependValue);
    const expected =
      showDefaultLangInUrl && defaultLanguage === "en"
        ? "/en/case-studies/case-studies-01/"
        : "/case-studies/case-studies-01/";
    expect(result).toBe(expected);
  });

  test("Prepends optional value correctly", () => {
    const url = "/pricing";
    const result = getLocaleUrlCTM(url, "es", prependValue);
    expect(result).toBe("/es/case-studies/pricing/");
  });

  test("Handles root URL with default language", () => {
    const url = "/";
    const result = getLocaleUrlCTM(url, "en", prependValue);
    const expected =
      showDefaultLangInUrl && defaultLanguage === "en"
        ? "/en/case-studies/"
        : "/case-studies/";
    expect(result).toBe(expected);
  });

  test("Don't handle external url", () => {
    const url = "https://example.com";
    const result = getLocaleUrlCTM(url, "en", prependValue);
    const expected =
      showDefaultLangInUrl && defaultLanguage === "en"
        ? "https://example.com"
        : "https://example.com";
    expect(result).toBe(expected);
  });
});
