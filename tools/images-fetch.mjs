// Sucht je Thema Kandidaten-Fotos bei Openverse -> tools/image-candidates.json
//
// Nur kommerziell nutzbare, veraenderbare Lizenzen (CC0, Public Domain Mark,
// CC BY) und nur StockSnap als Quelle: die Sammlung ist durchgaengig CC0 und
// liefert einen konsistenten, modernen Stockfoto-Look. Rawpixel waere groesser,
// steckt aber voller Clipart, Museumsgut und Behoerdenfotos.
//
// Keine API-Keys noetig. Das anonyme Rate-Limit (~20 Requests/min) wird ueber
// Pausen und 429-Backoff respektiert.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { topics } from "./image-topics.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "image-candidates.json");
const UA = "best-agers-project.eu image sourcing (kontakt@best-agers-project.eu)";
const SOURCES = "stocksnap";
const PER_TOPIC = 8;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Archivgut, Clipart und Grafiken: passen nicht in ein aktuelles Ratgeberportal.
const JUNK =
  /(clipart|png |psd|vector|illustration|mockup|wallpaper|frame|border|collage|sticker|doodle|drawing|painting|lithograph|engraving|font|typography|editable|customizable|remix|vintage|retro|antique|century|museum|artwork|christmas|santa|holiday|easter|halloween|\b1[6789]\d\d\b|\b19[0-7]\d\b)/i;

// Presse-, Behoerden- und Reportagefotos zeigen konkrete Personen und Anlaesse.
const PRESS =
  /(location unknown|u\.s\.|president|secretary|minister|ambassador|embassy|medal|air force|coast guard|\barmy\b|\bnavy\b|marines|police|sheriff|governor|senator|\bmayor\b|department of|county|national team|press conference|photo by)/i;
const AGENCY =
  /(service|agency|department|force|guard|government|library|museum|archives|ministry|administration)/i;

const usable = (r) =>
  r.url &&
  !PRESS.test(`${r.title || ""} ${r.creator || ""}`) &&
  !(r.creator && AGENCY.test(r.creator)) &&
  Number(r.width) >= 1100 &&
  Number(r.height) >= 620 &&
  Number(r.width) / Number(r.height) >= 1.2 && // Querformat, wir schneiden auf 16:9
  !r.mature &&
  !JUNK.test(
    `${r.title || ""} ${(r.tags || []).map((t) => t.name).join(" ")} ` +
      `${decodeURIComponent(r.foreign_landing_url || "").replace(/[-/]/g, " ")}`
  );

async function search(query, page) {
  const url =
    "https://api.openverse.org/v1/images/?" +
    new URLSearchParams({
      q: query,
      source: SOURCES,
      license: "cc0,pdm,by",
      category: "photograph",
      page_size: "20",
      page: String(page),
    });
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (res.status === 429) {
      const wait = 20000 * (attempt + 1);
      console.log(`   429 – warte ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    if (res.status === 400) return { results: [] }; // Seite ausserhalb des Bereichs
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} bei "${query}"`);
    return res.json();
  }
  throw new Error(`Rate-Limit dauerhaft bei "${query}"`);
}

const store = await fs
  .readFile(OUT, "utf8")
  .then(JSON.parse)
  .catch(() => ({}));

// Ein Foto darf nur in EINEM Pool landen, sonst taucht dasselbe Motiv auf
// mehreren Seiten auf.
const takenIds = new Set(
  Object.values(store).flatMap((list) => list.map((c) => c.id))
);

let requests = 0;
for (const t of topics) {
  if (store[t.key]?.length >= PER_TOPIC) {
    console.log(`= ${t.key} (${store[t.key].length})`);
    continue;
  }
  const picked = store[t.key] ?? [];
  const seen = new Set(picked.map((p) => p.id));
  outer: for (const q of [t.q, t.q2, t.q3, t.q4].filter(Boolean)) {
    for (let page = 1; page <= 3; page++) {
      if (picked.length >= PER_TOPIC) break outer;
      const data = await search(q, page);
      requests++;
      for (const r of data.results || []) {
        if (picked.length >= PER_TOPIC) break;
        if (seen.has(r.id) || takenIds.has(r.id) || !usable(r)) continue;
        seen.add(r.id);
        takenIds.add(r.id);
        picked.push({
          id: r.id,
          topic: t.key,
          query: q,
          title: r.title || "",
          url: r.url,
          creator: r.creator || "",
          creatorUrl: r.creator_url || "",
          license: r.license,
          licenseVersion: r.license_version || "",
          licenseUrl: r.license_url || "",
          source: r.foreign_landing_url || "",
          provider: r.source || r.provider || "",
          width: r.width,
          height: r.height,
          tags: (r.tags || []).map((x) => x.name).slice(0, 8),
        });
      }
      if (!data.results?.length) break;
      await sleep(1000);
    }
  }
  store[t.key] = picked;
  console.log(`+ ${t.key}: ${picked.length} (${requests} Requests)`);
  await fs.writeFile(OUT, JSON.stringify(store, null, 1));
  await sleep(1200);
}

const total = Object.values(store).reduce((n, a) => n + a.length, 0);
const thin = Object.entries(store)
  .filter(([, v]) => v.length < 3)
  .map(([k, v]) => `${k}(${v.length})`);
console.log(`\nFertig: ${total} Kandidaten in ${Object.keys(store).length} Themen -> ${OUT}`);
if (thin.length) console.log(`Duenn besetzt: ${thin.join(", ")}`);
