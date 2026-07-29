# best-agers-project.eu

Affiliate- und Lead-Portal für die Themen ab 50: Rente, Altersvorsorge,
Pflegegrad, barrierefreies Wohnen und Gesundheit. Astro 5 + Tailwind 4,
statischer Build.

## Warum diese Nische

Die Domain war bis etwa 2013 die Website des EU-Interreg-Projekts „Best Agers"
(Ostseeraum, Age Management, ältere Erwerbstätige) und trug danach eine dünne
WordPress-Installation mit sechs themenfremden Beiträgen.

Der Wert der Domain liegt in einem Kern echter Institutslinks: `cordis.europa.eu`
(3x), `oshwiki.osha.europa.eu`, `oecd.org`, `link.springer.com`,
`landtag.ltsh.de`, `sseriga.edu`, `lbtu.lv`, `enetosh.net`, `itmo.ru`, `evea.ee`.
Deren Anker lauten „Best Agers", „Network for Innovative Age Management" und
„The Labour Market and Demographic Change in the Baltic Sea Region". Diese
Relevanz überlebt nur, wenn die Seite im Feld 50 plus bleibt. Die Nische kommt
also aus den Backlink-Zielen, nicht aus dem Altcontent.

Daneben liegt eine Schicht Directory-Spam (rund 30 Domains vom Typ
`seobacklinkdirectory.com`), Spam-Score 37. Inbound-Linkspam ist kein Grund,
die Domain aufzugeben.

**DR 34** (Ahrefs, 28.07.2026). 110 Links / 89 Referring Domains (DataForSEO).

## Architektur

Fünf Hubs, abgeleitet aus 1.680 dedupten Keywords mit 7,84 Mio. Suchvolumen
(DataForSEO Labs, DE, 28.07.2026). Bewusst nach Anliegen geschnitten, nicht nach
Lebensphasen-Sprache: „fitness ab 50" hat real 310 Suchen im Monat,
„bewerbung ab 50" nur 140.

| Hub | Cluster-Volumen | Ø CPC | Monetarisierung |
|---|---|---|---|
| `/rente/` | 4.897.970 | 1,01 € | AdSense, interner Funnel |
| `/pflege/` | 947.070 | 1,11 € | Pflegehilfsmittel-Leads |
| `/gesundheit/` | 1.073.430 | ~1,00 € | Amazon, Netzwerklink hoer-gut |
| `/wohnen/` | 481.340 | **13,58 €** | **Treppenlift-Leads** |
| `/altersvorsorge/` | 409.450 | 2,64 € | FinanceAds / FinanceQuality |

Der Geld-Hub ist eindeutig `wohnen`: „treppenlift kosten" liegt bei 21,54 € CPC,
„treppenlift mieten" bei 29,45 €, „treppenlift kaufen" bei 36,42 €.

`src/data/taxonomy.ts` ist die einzige Quelle der Wahrheit für Hubs, Seiten,
Navigation, Suche und Interlinking. Seiten mit `status: "queued"` bekommen
bewusst **keine** Route: programmatische Dünnseiten mit Ads sind das Muster
hinter der AdSense-Ablehnung wegen „minderwertiger Inhalte".

## Design-System

Bewusst gegen den Rest des Portfolios gebaut, damit die Seite nicht als
Schwesterprojekt der anderen Portale lesbar ist. Referenz ist ein flaches
skandinavisches Flat-Pack-Raster. Drei Regeln tragen alles, sie sind hart:

1. **Zwei Schriftschnitte.** Inter 400 und 700, sonst nichts. Kein 500, kein
   600, keine Kursive, keine zweite Familie. Hierarchie entsteht über Größe.
2. **Ein Radius.** 8px auf Karten, Buttons, Inputs, Tabellen. Einzige Ausnahme
   ist der runde Pfeil-Button, der als Navigations-Affordance eine Kreisform
   braucht.
3. **Gelb ist Fläche, keine Dekoration.** `#ffdb00` nie als Rahmen, nie als
   Textfarbe, nie als Hover-Tint, und nie als Untergrund für Fließtext. Nur
   ganze CTA-Flächen und Tabellenköpfe.

Null Schatten, null Verläufe auf Flächen. Tiefe entsteht ausschließlich durch
Flächenkontrast, 1px schwarze Rahmen, Größe und Abstand.

| Token | Wert | Rolle |
|---|---|---|
| `--color-yellow` | `#ffdb00` | einzige Akzentfarbe, nur als Fläche |
| `--color-ink` | `#111111` | Text, Überschriften, alle Rahmen |
| `--color-warm` | `#fffefb` | ruhige Flächen, minimal wärmer als Weiß |
| `--color-link` | `#0159a3` | ausschließlich Textlinks, nie Buttons |
| `--color-steel` | `#818181` | nur Rahmen und Icons |

**Abweichung von der Referenz:** Steel Gray schafft auf Weiß nur 3,5:1. Die
Vorlage nutzt es für Sekundärtext, das ist bei einer 50-plus-Zielgruppe nicht
vertretbar. Lesbarer Text ist hier durchgehend Ink Black. Geprüft: alle zehn
Seitentypen mit null Kontrastfehlern nach WCAG AA.

**Zweite Abweichung:** Die Vorlage ist medienzentriert und lebt von Bildkarten
mit Gradient-zu-Schwarz-Overlays. Dieses Portal hat keine Fotografie, deshalb
tragen die textbasierten Muster: gelbe Aktionsflächen, schwarz umrandete
Flachkarten und harte Typo-Kontraste. Wenn später Bilder dazukommen, gehören
sie full-bleed in 8px-Karten mit Overlay, nie ohne.

## Stand

- 59 Seiten, 43 Artikel, rund 26.000 Wörter
- Alle Beträge gegen amtliche Quellen geprüft (Stand Juli 2026): Rentenwert
  42,52 €, Pflegegeld 347/599/800/990 €, Entlastungsbetrag 131 €,
  Pflegehilfsmittel 42 €, Wohnumfeld-Zuschuss 4.180 €, Grundfreibetrag
  12.348 €, Besteuerungsanteil 84 %
- GA4 `G-D87Z18WJYX` / GTM `GTM-5J2PCRDK`, Event-Paket verdrahtet und publiziert
- AdSense `ca-pub-7432388986384363` (WEBMAGICS LTD)

## Offene Punkte

1. **Deploy.** Zielhost ist A2 Hosting (LiteSpeed, cPanel). FTP-/SFTP-Zugang
   fehlt noch in `.secrets/`. Ohne ihn kein Cutover.
2. **AdSense-Site anlegen.** `best-agers-project.eu` ist in keinem der beiden
   AdSense-Konten hinterlegt. Die Management API v2 ist für Sites lesend, das
   muss einmalig in der Oberfläche passieren.
3. **GSC-Property.** Die Verifikation läuft über den live ausgelieferten
   GTM-Container, geht also erst nach dem Deploy. Danach
   `Tools/google-provision/gsc_provision.py --auth both`, anschließend
   dashboard-reader ergänzen.
4. **Web3Forms-Key.** Fehlt. Solange leer, zeigt `/kontakt/` bewusst den
   Mailweg statt eines Formulars, das ins Leere läuft.
5. **Partnerprogramme.** `site.partnersActive` steht auf `false`, die
   Angebots-Slots rendern nichts. Reihenfolge nach CPC: Treppenlift-Leads,
   dann Altersvorsorge, dann Pflegehilfsmittel.
6. **Bing + IndexNow + RalfyIndex** nach dem Livegang.

## Bestandsschutz

`/heilkristalle-was-bewirken/` ist ein Beitrag aus der WordPress-Zeit und bleibt
mit unverändertem Link auf `heilstein.de` bestehen. Die Seite ist **unlisted**:
nicht in Navigation und Übersichten, aber in der Sitemap und **nicht** noindex.
Der Ursprungstext nannte eine real existierende Ärztin namentlich, das wurde
entfernt.

Die übrigen fünf Altbeiträge wurden gelöscht und per 301 umgeleitet. Alle alten
Slugs, die `/thema/`- und `/category/`-Taxonomien, die DotNetNuke-Struktur und
die alten Sitemap-URLs sind in `public/.htaccess` abgebildet.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

Der Build läuft über das Outbound-Gate: Partnerlinks im Markup zeigen **direkt**
auf den Partner und werden beim Build auf `/go/?u=<base64url>` umgeschrieben.
Niemals selbst `/go/` bauen und niemals `awc=` hardcoden.
