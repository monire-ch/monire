import { defineCollection, z } from "astro:content";

// Universal Page Schema
const page = z.object({
  title: z.string(),
  date: z.date().optional(), // example date format 2022-01-01 or 2022-01-01T00:00:00+00:00 (Year-Month-Day Hour:Minute:Second+Timezone)
  description: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  robots: z.string().optional(),
  excludeFromSitemap: z.boolean().optional(),
  customSlug: z.string().optional(),
  canonical: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  disableTagline: z.boolean().optional(),
});

// Call to Action Button
const buttonSchema = z.object({
  enable: z.boolean(),
  label: z.string(),
  url: z.string(),
  rel: z.string().optional(),
  target: z.string().optional(),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: page,
});

// Post collection schema
const blogCollection = defineCollection({
  schema: page.merge(
    z.object({
      categories: z.array(z.string()).default(["others"]),
      author: z.string().optional(),
      excerpt: z.string().optional(),
    }),
  ),
});

const caseStudies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string(),
    date: z.string(),
    client: z.string(),
    website: z.string().optional(),
    tools: z.array(z.string()),
    before: z.string(),
    after: z.string(),
    impact: z.string(),
  }),
});

// Export collections
export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
  sections: defineCollection({}),
  contact: defineCollection({}),
  faq: defineCollection({}),
  pricing: defineCollection({}),
  homepage: defineCollection({}),
  author: defineCollection({}),
  changelog: defineCollection({}),
  "case-studies": caseStudies,
};
