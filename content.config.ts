import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        slug: z.string(),
        excerpt: z.string(),
        keywords: z.string(),
        image: z.string(),
        category: z.string(),
        tags: z.string(),
        readingTime: z.string().optional(),
      }),
    }),
  },
})
