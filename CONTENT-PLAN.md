# homotox.de – Content- und Wachstumsplan

Stand: 26.07.2026. Datenbasis: DataForSEO (DE) und Majestic-Backlinks, beide am 26.07.2026 erhoben.

## Status: LIVE seit 27.07.2026

| | |
| --- | --- |
| URL | https://homotox.de (www → 301 Apex) |
| Hosting | Cloudflare Pages, Projekt `homotox-de-astro`, Deploy per GitHub Actions auf `main` |
| Registry | tecspace · **DNS: Cloudflare** (`jewel/newt.ns.cloudflare.com`) |
| GA4 / GTM | `G-MK8G17NH1C` / `GTM-MMM3H94V` (Live-Version 4) |
| AdSense | `ca-pub-3946820918041547` (stark.marketing GmbH) – Site-Status `REQUIRES_REVIEW` |
| Amazon | `homotox-21`, 228 Produkte in 39 Gruppen |
| GSC | Property `https://homotox.de/` angelegt, SA ist siteOwner, Sitemap eingereicht |
| Bing | verifiziert, Index- und Kind-Sitemap eingereicht |
| IndexNow | 80 URLs eingereicht (HTTP 202) |

⚠️ **www → Apex braucht `functions/_middleware.js`.** Cloudflare Pages ist kein Apache und
ignoriert `public/.htaccess` komplett – ohne die Middleware liefern www und Apex beide HTTP 200
und damit Duplicate Content. Nach dem Deploy dauert die Edge-Propagation ein paar Minuten,
ein 200 direkt danach ist noch kein Fehler.

⚠️ **Cloudflare Managed robots.txt ist aktiv** und sperrt GPTBot, ClaudeBot, Google-Extended,
CCBot, Bytespider und weitere. Die Sitemap-Zeile hat überlebt. Das ist eine Zone-Einstellung,
keine Datei im Repo – wer AI-Sichtbarkeit will, muss das in Cloudflare abschalten.

## Ausgangslage

| Kennzahl | Wert |
| --- | --- |
| Domain registriert | 26.07.2026, 10,00 € / 2,23 € p.a. |
| Registry / DNS | tecspace |
| DR (Ahrefs) | 23 – teils Spam-Inflation aus der Parking-Phase |
| Ref. Domains (Majestic) | 177, davon 172 live |
| Links auf `/` | 227 von 264 – der Wert hängt an der Startseite |
| Keyword-Cluster | 2.151 Keywords > 150 Vol. / 2.311.060 Suchvolumen |
| Seiten im Build | 83 (58 Artikel + 15 Silo-Hubs + 3 Sektionen + 7 Sonstige) |

**Themenachse gedreht.** Der Markenbegriff `homotoxikologie` hat 50 Suchen/Monat und ist als
Head-Term wertlos. Das kommerzielle Umfeld – Entgiftung, Heilerde, Mariendistel, Traumeel,
Darm, Leber – trägt dagegen 2,3 Mio. Suchvolumen. Die Domain-Historie bleibt als Methoden-Silo
erhalten (`/methoden/homotoxikologie/`), aber nur als sachliche Einordnung.

## Architektur

```
/                             Affiliate-Portal (Hub der Hubs)
/mittel/                      9 Silos: heilerde · zeolith · bentonit · mariendistel ·
                              traumeel · schuessler-salze · bachblueten · spagyrik · probiotika
/anwendung/                   4 Silos: entgiftung · leber · darm · schwermetalle
/methoden/                    2 Silos: homotoxikologie · homoeopathie
/studienlage/                 Bewertungsmaßstab – trägt E-E-A-T und die HWG-Absicherung
```

Interlinking läuft über `src/data/taxonomy.ts`:
`siloRelations` verbindet die Silos handgesetzt nach Nutzeranliegen, `RelatedLinks.astro`
rendert Geschwister- plus Querverweise auf jeder Seite. Eine Silo-Änderung dort wirkt sofort
auf allen Seiten – es gibt keine hartkodierten Links in den Artikeln.

## Silo-Stärke nach Cluster-Volumen

| Silo | Cluster-Vol. | Live | Geplant |
| --- | --- | --- | --- |
| entgiftung | 384.730 | 5 | 2 |
| heilerde | 380.550 | 7 | 3 |
| mariendistel | 291.580 | 7 | 3 |
| traumeel | 250.160 | 5 | 2 |
| leber | 214.320 | 4 | 1 |
| darm / probiotika | 172.250 | 7 | 2 |
| zeolith | 100.380 | 7 | 1 |
| schuessler-salze | 42.300 | 2 | 2 |
| schwermetalle | 25.600 | 3 | 1 |
| bentonit | 24.200 | 2 | 2 |
| bachblueten | 22.600 | 3 | 3 |
| homoeopathie | 38.200 | 3 | 0 |
| spagyrik | 6.420 | 1 | 1 |
| homotoxikologie | 1.200 | 2 | 0 |

### NeuronWriter-Queue (geplant, noch keine Route)

| URL | Fokus-Keyword | Vol. | Intent |
| --- | --- | --- | --- |
| `/anwendung/darm/reizdarm/` | reizdarm | 14800 | info |
| `/anwendung/leber/werte/` | leberwerte | 12100 | info |
| `/mittel/heilerde/sodbrennen/` | luvos heilerde sodbrennen | 1900 | info |
| `/mittel/schuessler-salze/dosierung/` | schüssler salze dosierung | 1900 | info |
| `/anwendung/entgiftung/symptome/` | entgiftungssymptome | 1300 | info |
| `/mittel/heilerde/reizdarm/` | luvos heilerde reizdarm | 1000 | info |
| `/mittel/bachblueten/dm/` | bachblüten dm | 1000 | transactional |
| `/mittel/bachblueten/tiere/` | bachblüten für tiere | 1000 | info |
| `/mittel/heilerde/gesichtsmaske/` | heilerde maske | 880 | info |
| `/mittel/mariendistel/frauen/` | mariendistel wirkung frauen | 880 | info |
| `/mittel/mariendistel/bluthochdruck/` | mariendistel nebenwirkung bluthochdruck | 880 | info |
| `/mittel/bentonit/kaufen/` | bentonit kaufen | 720 | transactional |
| `/mittel/mariendistel/oel/` | mariendistel öl | 720 | commercial |
| `/mittel/traumeel/nebenwirkungen/` | traumeel nebenwirkungen | 590 | info |
| `/mittel/schuessler-salze/kur/` | schüssler salze kur | 590 | info |
| `/mittel/bachblueten/kinder/` | bachblüten kinder | 590 | info |
| `/mittel/spagyrik/mischungen/` | spagyrik mischungen | 480 | info |
| `/anwendung/entgiftung/dauer/` | entgiftung dauer | 480 | info |
| `/mittel/zeolith/dm-kaufen/` | zeolith dm | 390 | transactional |
| `/mittel/bentonit/anwendung/` | bentonit anwendung | 390 | info |
| `/anwendung/schwermetalle/quecksilber/` | quecksilber belastung | 390 | info |
| `/mittel/traumeel/alternativen/` | traumeel alternative | 260 | commercial |
| `/mittel/probiotika/staemme/` | probiotika stämme | 210 | info |

### Bereits live (Baseline geschrieben, NeuronWriter-Optimierung ausstehend)

| URL | Fokus-Keyword | Vol. | Intent |
| --- | --- | --- | --- |
| `/anwendung/leber/entgiftung/` | leber entgiften | 49500 | info |
| `/mittel/traumeel/tabletten/` | traumeel tabletten | 27100 | commercial |
| `/anwendung/darm/darmsanierung/` | darmsanierung | 22200 | info |
| `/mittel/probiotika/flohsamenschalen/` | flohsamenschalen | 14800 | commercial |
| `/mittel/mariendistel/wirkung/` | mariendistel wirkung | 12100 | info |
| `/mittel/traumeel/hunde/` | traumeel für hunde | 12100 | info |
| `/anwendung/entgiftung/koerper/` | körper entgiften | 12100 | info |
| `/anwendung/darm/darmflora-aufbauen/` | darmflora aufbauen | 12100 | info |
| `/mittel/heilerde/luvos/` | luvos heilerde | 9900 | commercial |
| `/mittel/mariendistel/kapseln/` | mariendistel kapseln | 8100 | commercial |
| `/mittel/traumeel/salbe/` | traumeel salbe | 8100 | commercial |
| `/mittel/bachblueten/tropfen/` | bachblüten tropfen | 8100 | commercial |
| `/anwendung/entgiftung/kur/` | entgiftungskur | 8100 | info |
| `/methoden/homoeopathie/globuli/` | globuli | 8100 | info |
| `/mittel/zeolith/pulver/` | zeolith pulver | 6600 | commercial |
| `/anwendung/entgiftung/detox-kur/` | detox kur | 6600 | info |
| `/mittel/heilerde/kapseln/` | heilerde kapseln | 4400 | commercial |
| `/mittel/heilerde/dm-rossmann/` | heilerde dm | 4400 | commercial |
| `/anwendung/entgiftung/basenfasten/` | basenfasten | 4400 | info |
| `/mittel/schuessler-salze/uebersicht/` | schüssler salze übersicht | 2900 | info |
| `/mittel/probiotika/nach-antibiotika/` | probiotika nach antibiotika | 2900 | info |
| `/anwendung/darm/nach-antibiotika/` | darmsanierung nach antibiotika | 2900 | commercial |
| `/mittel/heilerde/wirkung/` | heilerde wirkung | 2400 | info |
| `/mittel/mariendistel/dm-rossmann/` | mariendistel dm | 2400 | commercial |
| `/mittel/bachblueten/rescue-tropfen/` | bachblüten rescue tropfen | 2400 | commercial |
| `/anwendung/entgiftung/entschlacken/` | entschlacken | 2400 | info |
| `/anwendung/leber/reinigung/` | leberreinigung | 2400 | info |
| `/anwendung/schwermetalle/ausleiten/` | schwermetalle ausleiten | 2400 | info |
| `/mittel/heilerde/anwendung/` | heilerde anwendung | 1900 | info |
| `/mittel/mariendistel/nebenwirkungen/` | mariendistel nebenwirkungen | 1900 | info |
| `/anwendung/leber/lebensmittel/` | leber lebensmittel | 1900 | info |
| `/mittel/mariendistel/silymarin/` | silymarin | 1600 | info |
| `/mittel/bachblueten/liste/` | bachblüten liste | 1600 | info |
| `/anwendung/darm/welche-produkte/` | darmsanierung welche produkte | 1600 | commercial |
| `/mittel/heilerde/innerlich-einnehmen/` | heilerde einnehmen | 1300 | info |
| `/mittel/zeolith/wirkung/` | zeolith wirkung | 1300 | info |
| `/mittel/zeolith/kapseln/` | zeolith kapseln | 1300 | commercial |
| `/mittel/mariendistel/tee/` | mariendistel tee | 1300 | info |
| `/anwendung/leber/kurkuma/` | kurkuma leber | 1300 | info |
| `/anwendung/schwermetalle/amalgam/` | amalgam ausleiten | 1300 | info |
| `/mittel/zeolith/erfahrungen/` | zeolith erfahrungen | 1000 | commercial |
| `/mittel/zeolith/klinoptilolith/` | klinoptilolith | 880 | info |
| `/anwendung/schwermetalle/chelattherapie/` | chelattherapie | 880 | info |
| `/mittel/heilerde/nebenwirkungen/` | heilerde nebenwirkungen | 720 | info |
| `/mittel/bentonit/wirkung/` | bentonit wirkung | 720 | info |
| `/mittel/zeolith/nebenwirkungen/` | zeolith nebenwirkungen | 480 | info |
| `/mittel/zeolith/welches-ist-das-beste/` | welches zeolith ist das beste | 480 | commercial |
| `/mittel/mariendistel/dosierung/` | mariendistel dosierung | 480 | info |
| `/methoden/homoeopathie/potenzen/` | homöopathie potenzen | 480 | info |
| `/mittel/traumeel/inhaltsstoffe/` | traumeel inhaltsstoffe | 390 | info |
| `/mittel/schuessler-salze/entgiftung/` | schüssler salze entgiftung | 390 | info |
| `/mittel/bentonit/unterschied-heilerde/` | bentonit heilerde unterschied | 320 | info |
| `/mittel/traumeel/globuli/` | traumeel globuli | 320 | commercial |
| `/mittel/spagyrik/anwendung/` | spagyrik anwendung | 320 | info |
| `/mittel/probiotika/auswahl/` | probiotika auswahl | 320 | commercial |
| `/methoden/homoeopathie/evidenz/` | homöopathie wirkung studien | 210 | info |
| `/methoden/homotoxikologie/sechs-phasen-tabelle/` | sechs phasen tabelle | 70 | info |
| `/methoden/homotoxikologie/kritik/` | homotoxikologie kritik | 40 | info |

## Warum 23 Seiten NICHT live sind

Bewusste Entscheidung: Sie sind in `taxonomy.ts` mit `status: "queued"` angelegt und bekommen
keine Route. Grund – dünn befüllte Seiten sind bei einer gesundheitsnahen Domain mit vielen
Unterseiten genau das Muster, das zur AdSense-Ablehnung „minderwertige Inhalte" und zu
Quality-Problemen führt. Sie gehen live, sobald NeuronWriter-Content vorliegt: Status auf
`"live"` setzen, Markdown unter `src/content/artikel/<silo>--<slug>.md` anlegen, fertig.

## NeuronWriter-Reihenfolge

1. **Runde 1 – die 58 Live-Seiten optimieren.** Baseline-Content steht; NeuronWriter liefert
   Term-Abdeckung und Struktur-Lücken. Beginnen bei den Silos mit dem größten Cluster-Volumen.
2. **Runde 2 – die 23 Queue-Seiten schreiben** und live schalten.
3. **Runde 3 – Produktbaum** (siehe unten).

## Produktbaum (die eigentliche Umsatzschicht)

Nach dem Longtail-Amazon-Modell kommt der Umsatz nicht aus den Hubs, sondern aus
Ultra-Longtail mit Händler- und Markennamen. Die Recherche hat dafür **152 Keywords /
160.580 Suchvolumen** identifiziert. Die stärksten Muster:

- **Händler-Kombis:** `heilerde dm` 4.400 · `mariendistel bei dm` 2.400 · `heilerde rossmann`
  2.400 · `bachblüten dm` 1.000 · `zeolith dm` 390
- **Marken-Longtails:** `luvos-heilerde` 9.900 · `luvos heilerde kapseln` 4.400 ·
  `luvos heilerde magenfein` 1.300 · `luvos imutox heilerde` 1.000 · `dhu globuli` 1.000
- **Marke + Anliegen:** `luvos-heilerde sodbrennen` 1.900 · `luvos heilerde reizdarm` 1.000

**Ausrollen in Wellen à ~150 Seiten/Woche, nie am Stück.** Ein Sitemap-Sprung über Nacht ist
das stärkste Spam-Signal. Der Produktbaum bekommt **kein AdSense** – er verdient über
Partnerprogramme.

## Monetarisierung – scharfgeschaltet 26.07.2026

Amazon PartnerNet, Tracking-ID **homotox-21**. In `src/data/site.ts`:

```ts
partnersActive: true
amazonTag: "homotox-21"
adsense: false          // in diesem Projekt gar nicht vorgesehen
```

- **Outbound-Gate ist ausgerollt** (`Tools/outbound-gate`): 146 Affiliate-Links werden beim
  Build auf `/go/?u=<base64url>` umgeschrieben, `robots.txt` sperrt `/go/`, die Sitemap ist
  bereinigt. Verifiziert: **0 rohe Amazon-hrefs im dist**, Token dekodiert sauber zurück auf
  `…&tag=homotox-21` (keine `&amp;`-Entity-Falle).
- **`PartnerSlot` liegt auf jeder Artikel- und Hub-Seite** mit `data-partner-topic` und
  bekommt das Fokus-Keyword der Seite. Die hrefs zeigen im Quellcode direkt auf amazon.de –
  das Gate rewritet sie, deshalb dort **nicht** selbst `/go/` bauen (sonst Doppelkodierung).
- **Produktdaten sind drin (Amazon Creators API, 26.07.2026).** `npm run creators` holt je
  Produktgruppe echte Daten: Titel, Marke, Preis, Bild, fertig getaggte `detailPageURL`.
  **228 Produkte in 39 Gruppen.** Ablage: `src/data/amazon-groups.json` (Gruppen + ASINs),
  `src/data/amazon-products.json` (Produktdaten je ASIN). Gerendert von `AmazonBoxGrid.astro`.
- **Fallback bleibt bestehen:** Wo keine Produktgruppe existiert, rendert `AmazonBoxGrid` den
  getaggten Suchlink. Damit funktioniert jede Seite, auch die ohne Gruppe.
- **Bewusst ohne Produktboxen:** alle `/methoden/`-Seiten, der komplette Schwermetalle-Silo
  und `leber/*`. Eine Produktbox neben der Chelattherapie wäre sachlich falsch – das ist eine
  ärztliche Behandlung, keine Kaufentscheidung – und HWG-seitig heikel.
- **Produkttitel sind Herstellertexte** und tragen teils Wirkaussagen („Naturheilmittel gegen
  Reizdarm"). Der Hinweis unter dem Grid stellt klar, dass das keine Aussage dieser Seite ist.

## AdSense – eingebaut 26.07.2026

Auto Ads, Client `ca-pub-3946820918041547`, ungated (kein Cookie-Banner). `public/ads.txt`
mit `google.com, pub-3946820918041547, DIRECT, f08c47fec0942fa0`.

Das Snippet läuft **nicht** auf `noindex`-Seiten – Impressum, Datenschutz, 404 und `/go/`
bleiben ohne Ads. Steuerbar über `noAds` im `BaseLayout`.

⚠️ **Für den Produktbaum gilt: `noAds` setzen.** Programmatische Massenseiten *mit* Ads sind
genau das Muster hinter der „minderwertige Inhalte"-Ablehnung. Der Produktbaum verdient über
Amazon, nicht über Ads.

## Tracking – provisioniert 26.07.2026

| Was | Wert |
| --- | --- |
| GA4-Property | `properties/547139734`, Konto WEBMAGICS Projects (199332337) |
| Measurement-ID | `G-MK8G17NH1C` |
| GTM-Container | `GTM-MMM3H94V`, `accounts/6004085399/containers/259460758` |
| Live-Version | 4 (publiziert) |

Angelegt per Service Account (`Tools/ga4-gtm-provision`). Das GTM-Snippet sitzt
config-getrieben im `BaseLayout` (head + noscript) – **nicht** nur als Feld in `site.ts`,
sonst rendert es nie. GA4 läuft über das Config-Tag **im Container**, es gibt bewusst kein
zweites `gtag/js` im Layout, sonst zählt der `page_view` doppelt. Kein Consent-Gate.

**Event-Paket** (`wire_events.py`), alle 6 im Live-Container verifiziert:

| Event | Trigger | Key Event | Feuert auf homotox? |
| --- | --- | --- | --- |
| affiliate_click | **nur `CE -`** | ja | ja – der Umsatz-Event |
| outbound_click | `Auto -` + `CE -` | nein | ja |
| mail_click | `Auto -` + `CE -` | ja | ja (Kontakt, Studienlage) |
| generate_lead | `Auto -` + `CE -` | ja | nein – kein Formular auf der Seite |
| phone_click | `Auto -` + `CE -` | ja | nein – keine Telefonnummer |
| whatsapp_click | `Auto -` + `CE -` | ja | nein |

⚠️ **Der native `Auto - affiliate_click`-Trigger wurde gelöscht.** Das Outbound-Gate injiziert
einen eigenen Listener, der `affiliate_click` in den dataLayer pusht. Bliebe der native
Link-Click-Trigger daneben, würde **jeder Affiliate-Klick doppelt gezählt**. Die drei nicht
feuernden Events bleiben aus Konsistenzgründen im Container – das Portfolio berichtet über
alle Domains mit demselben Paket.

## Linkaufbau-Plan Richtung 500 Ref. Domains

Ausgangspunkt 177 Ref-Domains, davon nur ~8 thematisch belastbar (aerztezeitung.de,
akupunktur.de, dgfan.de, ars-medendi-gmbh.de, hippokrateserben.de, qimeda.de,
omundernaehrung.com, uia.org). Der Rest ist Directory-Spam aus der Parking-Phase.

| Phase | Ziel RD | Maßnahmen |
| --- | --- | --- |
| 1 | 200 | Portfolio-interne Links aus thematisch passenden Projekten (heilstein, hoer-gut, welt-der-sauna, psychotherapie-hp, fettsucht, cfs-portal). Nur dofollow, nur im Textkontext. |
| 2 | 260 | Cross-Portal-Artikel auf den Stadtportalen nach dem Muster der bankscore-Banken-Artikel – Naturheilkunde/Apotheken-Aufhänger mit Deeplink auf die Silo-Hubs. |
| 3 | 350 | Themenverwandte Fachlinks: Heilpraktiker-Verzeichnisse, Apotheken-Blogs, Ernährungsportale. Der Studienlage-Anker macht die Seite zitierfähig – das ist der Grund, warum er existiert. |
| 4 | 500 | Digitale PR über den Faktencheck-Winkel (Provokationstests, Leberspülung, Zeolith-Werbung). Diese Inhalte sind linkwürdig, Produktseiten sind es nicht. |

**Erst prüfen, dann bauen:** Ein Teil der bestehenden 177 Domains ist Directory-Müll. Vor der
zweiten Phase eine Disavow-Prüfung, sonst arbeitet der Aufbau gegen ein belastetes Profil.

## 301-Map

`public/_redirects` (Cloudflare Pages / Netlify) und `public/.htaccess` (Apache) liegen bereit.
Sie deckeln die 6 Deeplink-Muster mit Restwert ab. Die alten PDFs sind im Wayback nicht mehr
abrufbar – Inhalt unbekannt, deshalb thematisch auf `/methoden/homotoxikologie/`.

⚠️ nginx ignoriert `.htaccess`. Bei nginx-Hosting muss die Redirect-Logik in die Server-Config.

## Rechtliche Leitplanken (nicht verhandelbar)

- **Keine fremde Organisationsidentität.** Die Domain war bis 2016 die Site der IGHH/IGBM e.V.
  Kein Verbandsauftritt, kein e.V., kein Reckeweg als eigene Historie, keine Fortbildungs- oder
  Mitgliedschafts-Anmutung. `/ueber-uns/` grenzt das ausdrücklich ab.
- **HWG und Health-Claims-VO.** Keine Heilversprechen, keine krankheitsbezogenen Wirkaussagen.
  Jeder Artikel trennt Anwendung von Wirksamkeit und trägt den Stand-Hinweis plus Quellen.
- **Kein Cookie-Banner nötig**, solange kein Tracking läuft. Bei GTM/GA4-Einbau die
  Datenschutzerklärung vorher ergänzen.

## Fonts

Vollständig lokal ausgeliefert, kein Google-CDN und kein externer Request. Bewusst nur die
Subsets **latin + latin-ext** – die Vollimporte von `@fontsource` ziehen zusätzlich cyrillic,
greek und vietnamese und blähen den Build auf 80 woff2-Dateien auf. Jetzt **8 Dateien**.
Verifiziert: die einzigen externen Hosts im gebauten HTML sind `googletagmanager.com` (GTM)
und `amazon.de` (vor dem Gate-Rewrite).

## Offene Punkte

- **AdSense-Review abwarten.** Die Site steht im stark.marketing-Konto auf
  `REQUIRES_REVIEW`; bis zur Freigabe wird nichts ausgespielt. Gegenprüfen per AdSense-API,
  nicht im UI raten.
- **homotox.de ins `Tools/bing-indexnow`-Inventar aufnehmen**, damit künftige Läufe die
  Domain automatisch mitnehmen (`node scripts/inventory.mjs`).
- **AI-Crawler-Sperre entscheiden** (Cloudflare Managed robots.txt, siehe oben).
- **Produktdaten aktuell halten:** `npm run creators` periodisch laufen lassen, Preise und
  Verfügbarkeit veralten. Rate-Limit ~1 req/s, der Lauf über 39 Gruppen dauert ~90 s.
- **Zustellung der Events** gegen GA4-Echtzeit prüfen, sobald echter Traffic läuft. Der
  `curl gtm.js | grep`-Check beweist nur, dass das Tag im Container liegt – nicht, dass ein
  Hit ankommt.
- **Disavow-Prüfung** des Altprofils vor Phase 2 des Linkaufbaus
