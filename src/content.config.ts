import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localized = z.object({
  ja: z.string().default(""),
  zhTw: z.string().default(""),
  en: z.string().default("")
});

const common = z.object({
  title: localized,
  summary: localized.default({ ja: "", zhTw: "", en: "" }),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.number().default(100),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  image: z.string().optional(),
  imageAlt: localized.default({ ja: "", zhTw: "", en: "" }),
  gallery: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([])
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: common.extend({
    organization: localized,
    role: localized,
    category: z.enum(["career", "internship", "part-time"]),
    location: localized.default({ ja: "", zhTw: "", en: "" })
  })
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: common.extend({
    school: localized,
    program: localized,
    degree: localized.default({ ja: "", zhTw: "", en: "" }),
    level: z.enum(["graduate", "university", "high-school", "junior-high", "elementary", "kindergarten"])
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: common.extend({
    slug: z.string(),
    category: z.enum(["Web", "AI", "SaaS", "Concept"]).default("Web"),
    status: localized,
    challenge: localized.default({ ja: "", zhTw: "", en: "" }),
    solution: localized.default({ ja: "", zhTw: "", en: "" }),
    features: z.array(localized).default([]),
    responsibilities: z.array(localized).default([]),
    githubUrl: z.string().url().optional().or(z.literal("")),
    demoUrl: z.string().url().optional().or(z.literal(""))
  })
});

const timeline = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/timeline" }),
  schema: common.extend({
    year: z.string(),
    age: z.string().optional(),
    place: localized.default({ ja: "", zhTw: "", en: "" }),
    category: z.string(),
    relatedProjects: z.array(z.string()).default([]),
    relatedAchievements: z.array(z.string()).default([])
  })
});

const memories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/memories" }),
  schema: common.extend({
    year: z.string().optional(),
    place: localized.default({ ja: "", zhTw: "", en: "" }),
    category: z.string(),
    caption: localized.default({ ja: "", zhTw: "", en: "" }),
    showOnHome: z.boolean().default(false),
    showOnStory: z.boolean().default(false),
    showInGallery: z.boolean().default(true),
    relatedStory: z.string().optional()
  })
});

const achievements = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/achievements" }),
  schema: common.extend({
    year: z.string().optional(),
    category: z.string(),
    relatedStory: z.string().optional()
  })
});

export const collections = { experience, education, projects, timeline, memories, achievements };
