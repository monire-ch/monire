import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import sitemap from "@astrojs/sitemap";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import fontsJson from "./src/config/fonts.json";
import config from "./.astro/config.generated.json";
import { enabledLanguages } from "./src/lib/utils/i18nUtils.ts";
import { generateAstroFontsConfig } from "./src/lib/utils/AstroFont.ts";
import remarkParseContent from "./src/lib/utils/remarkParseContent.ts";

const fonts = generateAstroFontsConfig(fontsJson);

let {
  seo: { sitemap: sitemapConfig },
  settings: {
    multilingual: { showDefaultLangInUrl, defaultLanguage },
  },
} = config;

// https://astro.build/config
export default defineConfig({
  site: config.site.baseUrl ? config.site.baseUrl : "http://examplesite.com",
  trailingSlash: config.site.trailingSlash ? "always" : "never",
  image: {
    layout: "constrained",
  },
  experimental: {
    fonts,
  },
  i18n: {
    locales: enabledLanguages,
    defaultLocale: defaultLanguage,
    routing: {
      prefixDefaultLocale: showDefaultLangInUrl,
    },
  },
  integrations: [
    sitemapConfig.enable ? sitemap() : null,
    AutoImport({
      imports: [
        "@/shortcodes/Button.astro",
        "@/shortcodes/Accordion.astro",
        "@/shortcodes/Notice.astro",
        "@/shortcodes/ListCheck.astro",
        "@/shortcodes/CardGrid.astro",
        "@/shortcodes/ImageList.astro",
        "@/shortcodes/ImageItem.astro",
        "@/shortcodes/Card.astro",
        "@/shortcodes/VideoInline.astro",
      ],
    }),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      ],
    ],
    remarkPlugins: [
      remarkParseContent, // Parse markdown content and add classes in heading and loading="lazy" to images
      remarkToc,
    ],

    // Code Highlighter https://github.com/shikijs/shiki
    shikiConfig: {
      theme: "github-dark", // https://shiki.style/themes
      wrap: false,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
