/**
 * Themen-Katalog fuer die Bildbeschaffung.
 *
 * Nicht ein Motiv je Seite suchen, sondern Pools bilden: eine Suche liefert
 * 6 bis 8 brauchbare Kandidaten, aus denen mehrere Seiten bedient werden.
 * Das spart Requests am anonymen Rate-Limit und haelt den Look konsistent.
 *
 * Regeln aus frueheren Laeufen:
 *  - Queries in Stockfoto-Vokabular und KURZ (1 bis 3 Woerter). "senior man
 *    filling out pension application" liefert 0 Treffer, "paperwork desk" trifft.
 *  - Mehrere Fallback-Queries je Thema, sonst bleibt der Pool duenn.
 *  - Nebentreffer einplanen: "stairs" holt auch Wendeltreppen in Museen,
 *    "crystal" holt Glaswaren. Nach dem ersten Lauf einmal durchsehen.
 */

export const topics = [
  // ---------- uebergreifend ----------
  { key: "hero-home", q: "senior couple", q2: "older couple home", q3: "elderly couple smiling", alt: "Ein aelteres Paar zu Hause" },
  { key: "editorial", q: "notebook desk", q2: "reading glasses book", q3: "writing notes", alt: "Notizbuch und Lesebrille auf einem Schreibtisch" },

  // ---------- Rente ----------
  { key: "retirement", q: "retirement", q2: "senior relaxing", q3: "older man thinking", alt: "Aeltere Person in ruhiger Umgebung" },
  { key: "paperwork", q: "paperwork desk", q2: "documents form", q3: "filling form", alt: "Formulare und Unterlagen auf einem Tisch" },
  { key: "calculator", q: "calculator", q2: "calculator money", q3: "accounting desk", alt: "Taschenrechner und Unterlagen" },
  { key: "tax", q: "receipts", q2: "bills", q3: "financial documents", q4: "money desk", alt: "Steuerunterlagen und Belege" },
  { key: "helping-hands", q: "hands together", q2: "hands", q3: "holding hands", q4: "friendship", alt: "Zwei Haende, die einander halten" },

  // ---------- Altersvorsorge ----------
  { key: "savings", q: "money", q2: "coins", q3: "banknotes", q4: "wallet", alt: "Geld und Ersparnisse" },
  { key: "office-meeting", q: "business meeting", q2: "office handshake", q3: "colleagues talking", alt: "Besprechung in einem Buero" },
  { key: "contract", q: "signature", q2: "pen paper", q3: "writing hand", q4: "agreement", alt: "Unterschrift unter einem Vertrag" },
  { key: "investing", q: "stock chart", q2: "financial graph", q3: "market data screen", alt: "Kursverlauf auf einem Bildschirm" },

  // ---------- Pflege ----------
  { key: "caregiving", q: "caregiver elderly", q2: "nurse elderly", q3: "care home senior", alt: "Pflegende Person und aeltere Person" },
  { key: "elderly-support", q: "elderly assistance", q2: "senior wheelchair", q3: "helping senior", alt: "Unterstuetzung im Alltag" },
  { key: "medical-supplies", q: "medical", q2: "pharmacy", q3: "first aid", q4: "hospital", alt: "Pflegehilfsmittel zum Verbrauch" },

  // ---------- Wohnen ----------
  { key: "stairs", q: "staircase", q2: "wooden stairs", q3: "stairs handrail", q4: "stairway home", alt: "Treppe in einem Wohnhaus" },
  { key: "bathroom", q: "modern bathroom", q2: "bathroom shower", q3: "bathroom interior", alt: "Modernes Badezimmer" },
  { key: "mobility-aid", q: "wheelchair", q2: "walking cane", q3: "walking path", q4: "elderly walking", alt: "Gehhilfe und Mobilitaet" },
  { key: "home-interior", q: "home interior", q2: "living room", q3: "apartment interior", alt: "Wohnraum" },

  // ---------- Gesundheit ----------
  { key: "mature-woman", q: "mature woman", q2: "woman portrait window", q3: "middle aged woman", alt: "Portraet einer Frau" },
  { key: "mature-man", q: "mature man", q2: "older man portrait", q3: "middle aged man", alt: "Portraet eines Mannes" },
  { key: "exercise", q: "senior exercise", q2: "yoga mat", q3: "stretching outdoors", q4: "walking park", alt: "Bewegung im Freien" },
  { key: "hearing", q: "listening", q2: "conversation", q3: "talking people", q4: "doctor patient", alt: "Gespraech und Hoeren" },
  { key: "brain-puzzle", q: "puzzle pieces", q2: "chess board", q3: "crossword puzzle", alt: "Denkspiel" },
  { key: "crystals", q: "crystals", q2: "gemstones", q3: "quartz stone", alt: "Heilsteine" },

  // ---------- Nachbesserung nach der Sichtung des ersten Laufs ----------
  // Die breiten Pools lieferten hier Ausreisser: "retirement" zog Pflegemotive,
  // "mature woman" Weihnachtsfotos mit Enkelkind, "savings" US-Dollarnoten.
  { key: "senior-couple", q: "senior couple", q2: "older couple", q3: "couple walking", alt: "Aelteres Paar" },
  { key: "euro-money", q: "euro", q2: "coins stack", q3: "piggy bank savings", q4: "saving money", alt: "Muenzen und Ersparnisse" },
  { key: "woman-portrait", q: "woman thinking", q2: "woman window", q3: "businesswoman", q4: "woman relaxing", alt: "Portraet einer Frau" },
  { key: "calm-exercise", q: "yoga", q2: "stretching", q3: "hiking", q4: "walking outdoors", alt: "Ruhige Bewegung" },
  { key: "bathroom-interior", q: "bathroom sink", q2: "shower tiles", q3: "bathroom mirror", q4: "tiles", alt: "Badezimmer" },
  { key: "mobility", q: "wheelchair", q2: "walker", q3: "rehabilitation", alt: "Gehhilfe und Mobilitaet" },
  { key: "brainwork", q: "chess", q2: "crossword", q3: "reading book", q4: "sudoku", alt: "Geistige Aktivitaet" },
  { key: "consultation", q: "doctor consultation", q2: "medical consultation", q3: "patient doctor", alt: "Beratungsgespraech" },
  { key: "home-living", q: "living room", q2: "home interior modern", q3: "apartment", alt: "Wohnraum" },

  // StockSnap liefert auf "woman" fast ausschliesslich Models um die 30. Fuer
  // Wechseljahre und Osteoporose braucht es expliziten Altersbezug, sonst
  // widerspricht das Bild dem Text.
  { key: "senior-woman", q: "senior woman", q2: "elderly woman", q3: "grandmother", q4: "older woman portrait", alt: "Aeltere Frau" },
  { key: "wellbeing", q: "meditation", q2: "tea cup hands", q3: "sunrise calm", q4: "relaxing nature", alt: "Ruhe und Wohlbefinden" },
];

/**
 * Feste Zuordnung Seite -> Themen-Pool.
 *
 * Bewusst handverdrahtet statt per Keyword-Scoring: bei 52 Seiten ist die
 * Liste ueberschaubar, und Scoring produziert genau die Ausreisser, die man
 * hinterher einzeln nachpinnen muss.
 *
 * Der Build vergibt je Pool die Fotos der Reihe nach, damit sich innerhalb
 * eines Hubs kein Motiv wiederholt.
 */
export const pageTopics = {
  "/": "hero-home",
  "/ratgeber/": "editorial",
  "/ueber-uns/": "editorial",
  "/heilkristalle-was-bewirken/": "crystals",

  // Hubs
  "/rente/": "senior-couple",
  "/altersvorsorge/": "savings",
  "/pflege/": "caregiving",
  "/wohnen/": "home-interior",
  "/gesundheit/": "exercise",

  // Rente
  "/rente/rente-beantragen/": "paperwork",
  "/rente/rente-berechnen/": "calculator",
  "/rente/wann-in-rente-gehen/": "retirement",
  "/rente/frueher-in-rente-gehen/": "senior-couple",
  "/rente/rente-und-steuern/": "tax",
  "/rente/krankenversicherung-der-rentner/": "paperwork",
  "/rente/rente-brutto-netto/": "calculator",
  "/rente/grundsicherung-im-alter/": "helping-hands",
  "/rente/rente-bei-schwerbehinderung/": "helping-hands",

  // Altersvorsorge
  "/altersvorsorge/private-altersvorsorge/": "savings",
  "/altersvorsorge/betriebliche-altersvorsorge/": "office-meeting",
  "/altersvorsorge/riester-rente/": "contract",
  "/altersvorsorge/riester-rente-kuendigen/": "contract",
  "/altersvorsorge/ruerup-rente/": "contract",
  "/altersvorsorge/etf-altersvorsorge/": "investing",
  "/altersvorsorge/altersvorsorge-ab-50/": "euro-money",

  // Pflege
  "/pflege/pflegegrad-beantragen/": "paperwork",
  "/pflege/pflegegrade-uebersicht/": "caregiving",
  "/pflege/pflegegrad-1-leistungen/": "elderly-support",
  "/pflege/pflegegrad-2-leistungen/": "caregiving",
  "/pflege/widerspruch-pflegegrad/": "paperwork",
  "/pflege/pflegehilfsmittel/": "medical-supplies",
  "/pflege/verhinderungspflege/": "elderly-support",
  "/pflege/entlastungsbetrag/": "helping-hands",

  // Wohnen
  "/wohnen/treppenlift-kosten/": "stairs",
  "/wohnen/treppenlift-mieten/": "stairs",
  "/wohnen/treppenlift-gebraucht/": "stairs",
  "/wohnen/treppenlift-alternativen/": "home-living",
  "/wohnen/treppenlift-schmale-treppe/": "stairs",
  "/wohnen/treppenlift-aussen/": "stairs",
  "/wohnen/treppenlift-zuschuss/": "home-interior",
  "/wohnen/barrierefreies-bad/": "bathroom-interior",
  "/wohnen/rollator-kaufberatung/": "mobility-aid",
  "/wohnen/rollator-krankenkasse/": "consultation",

  // Gesundheit
  "/gesundheit/wechseljahre-symptome/": "senior-woman",
  "/gesundheit/wechseljahre-ab-wann/": "wellbeing",
  "/gesundheit/wechseljahre-abnehmen/": "calm-exercise",
  "/gesundheit/wechseljahre-gelenkschmerzen/": "senior-woman",
  "/gesundheit/wechseljahre-beim-mann/": "mature-man",
  "/gesundheit/osteoporose/": "senior-woman",
  "/gesundheit/gedaechtnistraining/": "brainwork",
  "/gesundheit/hoergeraete-kosten/": "consultation",
  "/gesundheit/bewegung-ab-50/": "exercise",
};

/** Wenn ein Pool leer laeuft, in dieser Reihenfolge ausweichen. */
export const fallbackChain = [
  "editorial",
  "home-interior",
  "retirement",
  "helping-hands",
  "paperwork",
];
