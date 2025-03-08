// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Définition du schéma pour vos articles de blog
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    slug: z.string().optional(),
    image: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Exportation des collections
export const collections = {
  'blog': blogCollection,
};