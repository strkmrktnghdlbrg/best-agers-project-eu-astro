import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Ein Markdown je Artikel: src/content/artikel/<hub>--<slug>.md
 * Der Doppel-Bindestrich haelt die IDs flach und eindeutig – damit kann der
 * glob-Loader keine "Duplicate id" aus verschachtelten Ordnern bauen.
 */
const artikel = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/artikel" }),
  schema: z.object({
    hub: z.string(),
    /** Hub-relativer Slug. Absichtlich NICHT `slug` – das ist bei Astro die Entry-ID. */
    pageSlug: z.string(),
    /** Einleitung unter der H1 – bewusst getrennt vom Body. */
    lead: z.string(),
    /** Stand der Ueberarbeitung. YAML liefert ein Date-Objekt. */
    updated: z.coerce.date(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Quellenangaben – tragen E-E-A-T und die YMYL-Absicherung. */
    quellen: z.array(z.string()).default([]),
    /**
     * Bestandsartikel aus der WordPress-Zeit: URL und ausgehender Link bleiben
     * erhalten, die Seite taucht aber in keiner Uebersicht und keiner
     * Navigation auf. NIEMALS noindex – die Seite bleibt in der Sitemap.
     */
    unlisted: z.boolean().default(false),
  }),
});

/** Ein Markdown je Hub: src/content/hubs/<hub>.md */
const hubs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hubs" }),
  schema: z.object({
    hub: z.string(),
    lead: z.string(),
    updated: z.coerce.date(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    quellen: z.array(z.string()).default([]),
  }),
});

export const collections = { artikel, hubs };
