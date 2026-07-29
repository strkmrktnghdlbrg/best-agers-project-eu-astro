// Ordnet jeder Seite ein Foto aus tools/image-candidates.json zu, laedt es
// herunter, erzeugt zwei WebP-Groessen in public/images/ und schreibt die
// Zuordnung samt Bildnachweis nach src/data/page-images.generated.json.
//
// Aufruf: node tools/images-build.mjs
// Idempotent: bereits vergebene Zuordnungen und vorhandene Dateien bleiben.
// Soll neu gemischt werden, JSON + Bildordner wegraeumen statt patchen.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { pageTopics, topics, fallbackChain } from "./image-topics.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const OUT_JSON = path.join(ROOT, "src", "data", "page-images.generated.json");
const CANDIDATES = path.join(__dirname, "image-candidates.json");

// StockSnap-CDN blockt ohne Browser-Kennung mit 403.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// StockSnap meldet in den Metadaten bis zu 4928px, liefert ueber die API-URL
// aber nur die 960w-Variante. Groessere Pfade antworten mit 403/404. Also auf
// das planen, was wirklich ankommt.
const SIZES = [
  { w: 960, h: 540, suffix: "" }, // Seitenkopf und OG-Bild
  { w: 600, h: 338, suffix: "-600" }, // Karten in Grids
];

// Fotos, die die automatischen Filter passiert haben, im Portal aber
// unpassend wirken. Gepflegt in tools/blocked-images.json (ID -> Begruendung),
// befuellt nach der Sichtung des Kontaktbogens.
const BLOCKED = new Set(
  Object.keys(
    JSON.parse(
      await fs.readFile(path.join(__dirname, "blocked-images.json"), "utf8").catch(() => "{}")
    )
  )
);

// Seiten, deren Motiv redaktionell festgelegt ist (Pfad -> Foto-ID).
const PINNED = {};

const slug = (p) =>
  p.replace(/^\/|\/$/g, "").replace(/\//g, "--") || "startseite";

const candidates = JSON.parse(await fs.readFile(CANDIDATES, "utf8"));
const pools = new Map(
  Object.entries(candidates).map(([k, v]) => [
    k,
    v.filter((c) => !BLOCKED.has(c.id)),
  ])
);
const altByTopic = Object.fromEntries(topics.map((t) => [t.key, t.alt]));

const store = await fs
  .readFile(OUT_JSON, "utf8")
  .then(JSON.parse)
  .catch(() => ({}));

// Bereits vergebene Fotos merken, damit kein Motiv zweimal auftaucht.
const used = new Set(Object.values(store).map((v) => v.id));

await fs.mkdir(OUT_DIR, { recursive: true });

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Referer: "https://stocksnap.io/", Accept: "image/*" },
  });
  if (!res.ok) throw new Error(`${res.status} bei ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

let neu = 0,
  behalten = 0;
const fehlend = [];

for (const [pagePath, topicKey] of Object.entries(pageTopics)) {
  if (store[pagePath]) {
    behalten++;
    continue;
  }

  // Pin schlaegt Pool, sonst der erste noch freie Kandidat aus dem Pool,
  // danach die Fallback-Kette.
  let pick = null;
  if (PINNED[pagePath]) {
    pick = [...pools.values()].flat().find((c) => c.id === PINNED[pagePath]);
  }
  if (!pick) {
    for (const key of [topicKey, ...fallbackChain]) {
      pick = (pools.get(key) || []).find((c) => !used.has(c.id));
      if (pick) break;
    }
  }
  if (!pick) {
    fehlend.push(pagePath);
    continue;
  }
  used.add(pick.id);

  const base = slug(pagePath);
  try {
    const buf = await download(pick.url);
    for (const s of SIZES) {
      const file = path.join(OUT_DIR, `${base}${s.suffix}.webp`);
      await sharp(buf)
        .resize(s.w, s.h, { fit: "cover", position: "attention" })
        .webp({ quality: 78 })
        .toFile(file);
    }
    store[pagePath] = {
      id: pick.id,
      src: `/images/${base}.webp`,
      srcCard: `/images/${base}-600.webp`,
      width: SIZES[0].w,
      height: SIZES[0].h,
      alt: altByTopic[pick.topic] || "Symbolbild",
      topic: pick.topic,
      title: pick.title,
      creator: pick.creator,
      creatorUrl: pick.creatorUrl,
      license: pick.license,
      licenseVersion: pick.licenseVersion,
      licenseUrl: pick.licenseUrl,
      source: pick.source,
      provider: pick.provider,
    };
    neu++;
    console.log(`+ ${pagePath} <- ${pick.topic} "${pick.title || pick.id}"`);
  } catch (e) {
    console.log(`! ${pagePath}: ${e.message}`);
    fehlend.push(pagePath);
    used.delete(pick.id);
  }
  await fs.writeFile(OUT_JSON, JSON.stringify(store, null, 1));
}

console.log(
  `\nFertig: ${neu} neu, ${behalten} unveraendert, ${Object.keys(store).length} Seiten insgesamt`
);
if (fehlend.length) console.log(`Ohne Bild: ${fehlend.join(", ")}`);
