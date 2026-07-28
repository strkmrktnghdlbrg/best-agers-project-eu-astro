/**
 * Topical-Authority-Architektur best-agers-project.eu
 * ---------------------------------------------------
 * Eine Quelle der Wahrheit für Hubs, Keyword-Ziele und Interlinking.
 *
 * Datenbasis: DataForSEO Labs Keyword-Suggestions, DE (location 2276),
 * erhoben 28.07.2026. 1.680 dedupte Keywords, 7.842.480 Suchvolumen gesamt.
 *
 * Warum diese fünf Hubs und nicht die naheliegenden "Fitness ab 50" /
 * "Bewerbung ab 50": jene Begriffe haben real 310 bzw. 140 Suchen im Monat.
 * Die Nachfrage im 50-plus-Feld sitzt nicht in der Lebensphasen-Sprache,
 * sondern in konkreten Anliegen – Rente, Pflegegrad, Treppenlift, Wechseljahre.
 * Die Hubs bilden deshalb Anliegen ab, nicht Zielgruppen-Etiketten.
 *
 * `status` steuert das Routing:
 *   "live"   -> Markdown in src/content/artikel/ vorhanden, Seite wird gebaut
 *   "queued" -> geplant, wartet auf NeuronWriter-Analyse. KEINE Route.
 *               Bewusst nicht als Duennseite veroeffentlicht: programmatische
 *               Massenseiten MIT Ads sind das Muster hinter der
 *               "minderwertige Inhalte"-Ablehnung bei AdSense.
 */

export type PageStatus = "live" | "queued";

export type HubPage = {
  /** Slug relativ zum Hub, ergibt /<hub>/<slug>/ */
  slug: string;
  title: string;
  /** Kurzes Label für Listen und Navigation */
  nav: string;
  /** Fokus-Keyword */
  kw: string;
  /** Suchvolumen DE pro Monat */
  vol: number;
  /** CPC in EUR – Indikator für Lead-/Affiliate-Wert */
  cpc: number;
  intent: "info" | "commercial" | "transactional";
  status: PageStatus;
};

export type Hub = {
  slug: string;
  name: string;
  title: string;
  claim: string;
  /** Ein-Satz-Zusammenfassung für die Startseite */
  teaser: string;
  kw: string;
  vol: number;
  clusterVol: number;
  pages: HubPage[];
};

export const hubs: Hub[] = [
  /* ===================== RENTE & RUHESTAND ===================== */
  {
    slug: "rente",
    name: "Rente & Ruhestand",
    title: "Rente und Ruhestand: Antrag, Berechnung, Steuern",
    claim:
      "Wann Sie in Rente gehen können, wie sich Ihre Rente berechnet und was davon nach Steuern und Krankenversicherung übrig bleibt.",
    teaser:
      "Antrag, Abschläge, Steuern und die Krankenversicherung der Rentner – die Punkte, an denen es in der Praxis klemmt.",
    kw: "rente",
    vol: 246000,
    clusterVol: 4897970,
    pages: [
      { slug: "rente-beantragen", title: "Rente beantragen: Fristen, Unterlagen und der richtige Zeitpunkt", nav: "Rente beantragen", kw: "rente beantragen", vol: 9900, cpc: 4.24, intent: "info", status: "live" },
      { slug: "rente-berechnen", title: "Rente berechnen: So kommt Ihre Rentenhöhe zustande", nav: "Rente berechnen", kw: "rente berechnen", vol: 14800, cpc: 1.93, intent: "info", status: "live" },
      { slug: "wann-in-rente-gehen", title: "Wann kann ich in Rente gehen? Altersgrenzen nach Jahrgang", nav: "Wann in Rente", kw: "wann kann ich in rente gehen", vol: 8100, cpc: 1.15, intent: "info", status: "live" },
      { slug: "frueher-in-rente-gehen", title: "Früher in Rente gehen: Wege, Abschläge und was sie kosten", nav: "Früher in Rente", kw: "früher in rente gehen", vol: 9900, cpc: 0.76, intent: "info", status: "live" },
      { slug: "rente-und-steuern", title: "Rente und Steuern: Wer zahlt wie viel, und ab wann", nav: "Rente & Steuern", kw: "steuern bei rente", vol: 14800, cpc: 0.97, intent: "info", status: "live" },
      { slug: "krankenversicherung-der-rentner", title: "Krankenversicherung der Rentner: Beiträge, Pflicht und Freiwillige", nav: "KV der Rentner", kw: "krankenversicherung rente", vol: 22200, cpc: 2.16, intent: "info", status: "live" },
      { slug: "rente-brutto-netto", title: "Rente brutto und netto: Was am Ende auf dem Konto landet", nav: "Brutto & Netto", kw: "rente brutto netto", vol: 5400, cpc: 1.95, intent: "info", status: "live" },
      { slug: "grundsicherung-im-alter", title: "Grundsicherung im Alter: Anspruch, Höhe und Antrag", nav: "Grundsicherung", kw: "grundsicherung rente", vol: 9900, cpc: 1.36, intent: "info", status: "live" },
      { slug: "rente-bei-schwerbehinderung", title: "Rente bei Schwerbehinderung: Altersgrenzen und Abschläge", nav: "Schwerbehinderung", kw: "schwerbehinderung rente tabelle", vol: 5400, cpc: 2.25, intent: "info", status: "live" },
      { slug: "rentennachzahlung", title: "Rentennachzahlung: Wann sie entsteht und wie sie versteuert wird", nav: "Nachzahlung", kw: "nachzahlung rente", vol: 33100, cpc: 10.78, intent: "info", status: "queued" },
      { slug: "witwenrente", title: "Witwenrente: Höhe, Anrechnung und Antrag", nav: "Witwenrente", kw: "witwenrente", vol: 33100, cpc: 0.9, intent: "info", status: "queued" },
      { slug: "rentenpunkte", title: "Rentenpunkte: Was ein Entgeltpunkt wert ist", nav: "Rentenpunkte", kw: "rentenpunkte", vol: 12100, cpc: 1.2, intent: "info", status: "queued" },
    ],
  },

  /* ===================== ALTERSVORSORGE ===================== */
  {
    slug: "altersvorsorge",
    name: "Altersvorsorge",
    title: "Altersvorsorge: Modelle, Kosten und was sich noch lohnt",
    claim:
      "Riester, Rürup, Betriebsrente, ETF-Depot: die Bausteine der privaten Vorsorge im nüchternen Vergleich.",
    teaser:
      "Welcher Vorsorgebaustein zu welcher Situation passt und woran man Kostenfallen erkennt.",
    kw: "altersvorsorge",
    vol: 40500,
    clusterVol: 409450,
    pages: [
      { slug: "private-altersvorsorge", title: "Private Altersvorsorge: Bausteine im Vergleich", nav: "Private Vorsorge", kw: "private altersvorsorge", vol: 6600, cpc: 7.48, intent: "commercial", status: "live" },
      { slug: "betriebliche-altersvorsorge", title: "Betriebliche Altersvorsorge: Entgeltumwandlung, Steuern, Auszahlung", nav: "Betriebsrente", kw: "betriebliche altersvorsorge", vol: 40500, cpc: 3.18, intent: "info", status: "live" },
      { slug: "riester-rente", title: "Riester-Rente: Zulagen, Kosten und für wen sie noch passt", nav: "Riester-Rente", kw: "riester rente", vol: 49500, cpc: 2.2, intent: "info", status: "live" },
      { slug: "riester-rente-kuendigen", title: "Riester-Rente kündigen: Folgen, Alternativen, Beitragsfreistellung", nav: "Riester kündigen", kw: "riester rente kündigen", vol: 6600, cpc: 1.77, intent: "info", status: "live" },
      { slug: "ruerup-rente", title: "Rürup-Rente: Für wen die Basisrente rechnet", nav: "Rürup-Rente", kw: "rürup rente", vol: 12100, cpc: 4.97, intent: "info", status: "live" },
      { slug: "etf-altersvorsorge", title: "ETF als Altersvorsorge: Chancen, Risiken und der Zeithorizont", nav: "ETF-Vorsorge", kw: "etf altersvorsorge", vol: 1900, cpc: 3.74, intent: "commercial", status: "live" },
      { slug: "altersvorsorge-ab-50", title: "Altersvorsorge ab 50: Was in 15 Jahren noch aufzubauen ist", nav: "Vorsorge ab 50", kw: "altersvorsorge ab 50", vol: 590, cpc: 4.52, intent: "commercial", status: "live" },
      { slug: "altersvorsorge-vergleich", title: "Altersvorsorge im Vergleich: Woran sich Angebote messen lassen", nav: "Vergleich", kw: "private altersvorsorge vergleich", vol: 1300, cpc: 7.95, intent: "commercial", status: "queued" },
    ],
  },

  /* ===================== PFLEGE & PFLEGEGRAD ===================== */
  {
    slug: "pflege",
    name: "Pflege & Pflegegrad",
    title: "Pflegegrad und Pflegeleistungen: Antrag, Stufen, Geld",
    claim:
      "Vom Antrag über die Begutachtung bis zu Pflegegeld, Entlastungsbetrag und Verhinderungspflege.",
    teaser:
      "Der Weg zum Pflegegrad und welche Leistungen in welcher Stufe tatsächlich zustehen.",
    kw: "pflegegrad",
    vol: 165000,
    clusterVol: 947070,
    pages: [
      { slug: "pflegegrad-beantragen", title: "Pflegegrad beantragen: Ablauf, Formular und Begutachtung", nav: "Pflegegrad beantragen", kw: "pflegegrad beantragen", vol: 18100, cpc: 2.86, intent: "info", status: "live" },
      { slug: "pflegegrade-uebersicht", title: "Die fünf Pflegegrade im Überblick", nav: "Pflegegrade", kw: "pflegegrade", vol: 12100, cpc: 0.8, intent: "info", status: "live" },
      { slug: "pflegegrad-1-leistungen", title: "Pflegegrad 1: Welche Leistungen es gibt", nav: "Pflegegrad 1", kw: "pflegegrad 1 leistungen", vol: 6600, cpc: 0.83, intent: "info", status: "live" },
      { slug: "pflegegrad-2-leistungen", title: "Pflegegrad 2: Pflegegeld, Sachleistung und Entlastungsbetrag", nav: "Pflegegrad 2", kw: "pflegegrad 2 pflegegeld", vol: 12100, cpc: 0.67, intent: "info", status: "live" },
      { slug: "widerspruch-pflegegrad", title: "Widerspruch gegen den Pflegegrad: Fristen und Vorgehen", nav: "Widerspruch", kw: "widerspruch pflegegrad", vol: 4400, cpc: 1.29, intent: "info", status: "live" },
      { slug: "pflegehilfsmittel", title: "Pflegehilfsmittel zum Verbrauch: 42 Euro im Monat", nav: "Pflegehilfsmittel", kw: "pflegehilfsmittel", vol: 8100, cpc: 7.72, intent: "commercial", status: "live" },
      { slug: "verhinderungspflege", title: "Verhinderungspflege: Anspruch, Höhe und Abrechnung", nav: "Verhinderungspflege", kw: "verhinderungspflege", vol: 8100, cpc: 0.69, intent: "info", status: "live" },
      { slug: "entlastungsbetrag", title: "Entlastungsbetrag: 131 Euro monatlich richtig nutzen", nav: "Entlastungsbetrag", kw: "entlastungsbetrag", vol: 3600, cpc: 1.11, intent: "info", status: "live" },
      { slug: "pflegegrad-rechner-erklaert", title: "Pflegegrad-Rechner: Wie die Punktebewertung funktioniert", nav: "Punktesystem", kw: "pflegegrad rechner", vol: 12100, cpc: 0.79, intent: "info", status: "queued" },
    ],
  },

  /* ===================== WOHNEN & BARRIEREFREIHEIT ===================== */
  {
    slug: "wohnen",
    name: "Wohnen & Barrierefreiheit",
    title: "Barrierefrei wohnen: Treppenlift, Bad und Zuschüsse",
    claim:
      "Was ein Umbau kostet, welche Zuschüsse es gibt und wie man Anbieter vergleicht, ohne über den Tisch gezogen zu werden.",
    teaser:
      "Treppenlift, barrierefreies Bad, Rollator und die Zuschüsse, die den Umbau bezahlbar machen.",
    kw: "treppenlift",
    vol: 22200,
    clusterVol: 481340,
    pages: [
      { slug: "treppenlift-kosten", title: "Treppenlift Kosten: Preise nach Treppenform", nav: "Treppenlift Kosten", kw: "treppenlift kosten", vol: 9900, cpc: 21.54, intent: "commercial", status: "live" },
      { slug: "treppenlift-mieten", title: "Treppenlift mieten statt kaufen: Wann sich Miete rechnet", nav: "Treppenlift mieten", kw: "treppenlift mieten", vol: 1300, cpc: 29.45, intent: "commercial", status: "live" },
      { slug: "treppenlift-gebraucht", title: "Gebrauchter Treppenlift: Worauf beim Kauf zu achten ist", nav: "Gebraucht", kw: "treppenlift gebraucht", vol: 3600, cpc: 22.35, intent: "commercial", status: "live" },
      { slug: "treppenlift-alternativen", title: "Alternativen zum Treppenlift: Homelift, Rampe, Umzug", nav: "Alternativen", kw: "treppenlift alternativen", vol: 2400, cpc: 6.23, intent: "info", status: "live" },
      { slug: "treppenlift-schmale-treppe", title: "Treppenlift für schmale Treppen: Mindestbreite und Lösungen", nav: "Schmale Treppe", kw: "treppenlift schmale treppe", vol: 1300, cpc: 20.62, intent: "commercial", status: "live" },
      { slug: "treppenlift-aussen", title: "Treppenlift für außen: Witterung, Technik, Genehmigung", nav: "Außenlift", kw: "treppenlift außen", vol: 1300, cpc: 14.91, intent: "commercial", status: "live" },
      { slug: "treppenlift-zuschuss", title: "Zuschuss zum Treppenlift: 4.180 Euro von der Pflegekasse", nav: "Zuschuss", kw: "treppenlift zuschuss", vol: 2900, cpc: 9.5, intent: "info", status: "live" },
      { slug: "barrierefreies-bad", title: "Barrierefreies Bad: Kosten, Foerderung und Planung", nav: "Barrierefreies Bad", kw: "barrierefreies bad", vol: 4400, cpc: 1.38, intent: "commercial", status: "live" },
      { slug: "rollator-kaufberatung", title: "Rollator kaufen: Typen, Masse und Kaufkriterien", nav: "Rollator kaufen", kw: "rollator kaufen", vol: 8100, cpc: 0.71, intent: "commercial", status: "live" },
      { slug: "rollator-krankenkasse", title: "Rollator auf Rezept: Was die Krankenkasse zahlt", nav: "Rollator auf Rezept", kw: "rollator krankenkasse", vol: 3600, cpc: 0.62, intent: "info", status: "live" },
      { slug: "wohnraumanpassung-zuschuss", title: "Wohnumfeldverbessernde Maßnahmen: Zuschüsse im Überblick", nav: "Wohnraumanpassung", kw: "wohnraumanpassung zuschuss", vol: 880, cpc: 2.4, intent: "info", status: "queued" },
    ],
  },

  /* ===================== GESUNDHEIT AB 50 ===================== */
  {
    slug: "gesundheit",
    name: "Gesundheit ab 50",
    title: "Gesundheit ab 50: Wechseljahre, Knochen, Gehör, Gedächtnis",
    claim:
      "Die Beschwerden, die in der zweiten Lebenshaelfte haeufig werden – eingeordnet, ohne Panik und ohne Heilversprechen.",
    teaser:
      "Wechseljahre, Osteoporose, Hören und Gedächtnis: was normal ist und wann der Arztbesuch ansteht.",
    kw: "gesundheit im alter",
    vol: 210,
    clusterVol: 1073430,
    pages: [
      { slug: "wechseljahre-symptome", title: "Wechseljahre: Symptome, Phasen und Dauer", nav: "Wechseljahre", kw: "wechseljahre symptome", vol: 14800, cpc: 0.58, intent: "info", status: "live" },
      { slug: "wechseljahre-ab-wann", title: "Wechseljahre: Ab wann sie beginnen und wie lange sie dauern", nav: "Ab wann", kw: "wechseljahre ab wann", vol: 6600, cpc: 0.77, intent: "info", status: "live" },
      { slug: "wechseljahre-abnehmen", title: "Abnehmen in den Wechseljahren: Warum es schwerer wird", nav: "Abnehmen", kw: "abnehmen in wechseljahre", vol: 12100, cpc: 1.98, intent: "info", status: "live" },
      { slug: "wechseljahre-gelenkschmerzen", title: "Gelenkschmerzen in den Wechseljahren: Ursachen und Einordnung", nav: "Gelenkschmerzen", kw: "gelenkschmerzen wechseljahre", vol: 5400, cpc: 0.85, intent: "info", status: "live" },
      { slug: "wechseljahre-beim-mann", title: "Wechseljahre beim Mann: Was hinter dem Begriff steckt", nav: "Beim Mann", kw: "wechseljahre mann", vol: 14800, cpc: 1.1, intent: "info", status: "live" },
      { slug: "osteoporose", title: "Osteoporose: Risikofaktoren, Diagnose und Vorbeugung", nav: "Osteoporose", kw: "osteoporose", vol: 22200, cpc: 0.56, intent: "info", status: "live" },
      { slug: "gedaechtnistraining", title: "Gedächtnistraining: Was wirkt und was nur beschäftigt", nav: "Gedächtnistraining", kw: "gedächtnistraining", vol: 12100, cpc: 0.54, intent: "info", status: "live" },
      { slug: "hoergeraete-kosten", title: "Hörgeräte Kosten: Festbetrag, Zuzahlung und Eigenanteil", nav: "Hörgeräte Kosten", kw: "hörgeräte kosten", vol: 3600, cpc: 1.62, intent: "commercial", status: "live" },
      { slug: "bewegung-ab-50", title: "Bewegung ab 50: Wie viel, wie oft und womit anfangen", nav: "Bewegung ab 50", kw: "fitness ab 50", vol: 310, cpc: 0.77, intent: "info", status: "live" },
      { slug: "vorsorgeuntersuchungen-ab-50", title: "Vorsorgeuntersuchungen ab 50: Was die Kasse zahlt", nav: "Vorsorge", kw: "vorsorgeuntersuchungen ab 50", vol: 480, cpc: 1.1, intent: "info", status: "queued" },
    ],
  },
];

/** Nur Hubs und Seiten mit Inhalt bekommen eine Route. */
export const liveHubs = hubs;
export const livePages = (hub: Hub) => hub.pages.filter((p) => p.status === "live");

export const hubBySlug = (slug: string) => hubs.find((h) => h.slug === slug);

export const hubUrl = (hub: Hub) => `/${hub.slug}/`;
export const pageUrl = (hub: Hub, page: HubPage) => `/${hub.slug}/${page.slug}/`;

/**
 * Querverweise zwischen den Hubs.
 * Bewusst handverdrahtet statt automatisch: die inhaltlich sinnvollen Bruecken
 * sind nicht die volumenstaerksten. Pflegegrad haengt an Wohnen (der Zuschuss
 * zum Treppenlift kommt aus der Pflegekasse) und an Rente (Grundsicherung).
 */
const HUB_RELATIONS: Record<string, string[]> = {
  rente: ["altersvorsorge", "pflege"],
  altersvorsorge: ["rente", "gesundheit"],
  pflege: ["wohnen", "rente"],
  wohnen: ["pflege", "gesundheit"],
  gesundheit: ["pflege", "wohnen"],
};

export const relatedHubs = (slug: string): Hub[] =>
  (HUB_RELATIONS[slug] ?? [])
    .map((s) => hubBySlug(s))
    .filter((h): h is Hub => Boolean(h));

/** Navigation aus der Taxonomie ableiten – eine Quelle der Wahrheit. */
export const nav = hubs.map((h) => ({
  label: h.name,
  href: `/${h.slug}/`,
  children: livePages(h)
    .slice(0, 8)
    .map((p) => ({ label: p.nav, href: `/${h.slug}/${p.slug}/` })),
}));

/** Alle Live-Seiten flach – für Suche, Sitemap-Checks und die 404. */
export const allLivePages = hubs.flatMap((h) =>
  livePages(h).map((p) => ({ ...p, hub: h.slug, hubName: h.name }))
);
