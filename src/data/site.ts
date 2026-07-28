export const site = {
  name: "Best Agers",
  domain: "best-agers-project.eu",
  url: "https://www.best-agers-project.eu",
  tagline: "Das Portal für die Jahre ab 50",
  description:
    "Rente, Altersvorsorge, Pflegegrad, barrierefreies Wohnen und Gesundheit ab 50. Verständlich erklärt, mit Zahlen, Fristen und Quellen.",
  email: "kontakt@best-agers-project.eu",

  /**
   * WWW ist die kanonische Variante.
   * Der Apex leitet bereits serverseitig per 301 auf www um (Bestand aus der
   * WordPress-Zeit, geprueft 28.07.2026). Deshalb steht hier www in `url` –
   * sonst zeigen alle Canonicals auf eine Adresse, die selbst weiterleitet.
   */

  /**
   * Monetarisierung
   * ---------------
   * Noch KEIN Partnerprogramm angebunden. Die Angebots-Slots rendern bis dahin
   * einen ehrlichen Platzhalter statt eines toten Links – eine leere Box ist
   * besser als ein Affiliate-Versprechen ohne Partner dahinter.
   *
   * Wenn Programme kommen: Links im Markup DIREKT auf den Partner setzen.
   * Das Outbound-Gate schreibt sie beim Build auf /go/?u=<base64url> um.
   * Niemals selbst /go/ bauen und niemals `awc=` hardcoden.
   *
   * Prioritaet nach Keyword-Recherche (DataForSEO, DE, 28.07.2026):
   *   1. Treppenlift-Leads  – CPC 21,54 bis 36,42 EUR, 225.060 Vol. im Cluster
   *   2. Altersvorsorge     – CPC bis 8,34 EUR, FinanceAds/FinanceQuality vorhanden
   *   3. Pflegehilfsmittel  – "pflegepaket bei pflegegrad 2" CPC 7,72 EUR
   */
  partnersActive: false,
  outboundBase: "/go/",

  /**
   * AdSense – WEBMAGICS LTD.
   *
   * Per API geprueft am 28.07.2026. Es gibt zwei Konten im Portfolio:
   *   accounts/pub-3946820918041547 – stark.marketing GmbH (50 Sites)
   *   accounts/pub-7432388986384363 – WEBMAGICS LTD (46 Sites)
   * Eine kontofremde ID fuehrt zu null Ausspielung, deshalb der Abgleich vor
   * dem Einbau. Massgeblich ist die Entitaet im Impressum, und das ist hier
   * Webmagics Ltd.
   *
   * ⚠️ OFFEN: best-agers-project.eu ist in KEINEM der beiden Konten als Site
   * hinterlegt. Die AdSense Management API v2 ist fuer Sites lesend, das
   * Anlegen muss einmalig in der AdSense-Oberflaeche passieren. Bis dahin
   * laedt das Snippet zwar, liefert aber keine Anzeigen aus.
   */
  adsenseClient: "ca-pub-7432388986384363",

  /**
   * Tracking – provisioniert am 28.07.2026 per Service Account.
   * GA4-Property properties/547434671 (Konto WEBMAGICS Projects 199332337)
   * GTM-Container accounts/6004085399/containers/259659025, Version 2 publiziert
   *
   * Das GA4-Config-Tag haengt im Container auf All-Pages, deshalb wird ga4Id
   * hier NICHT separat ins Layout gerendert – sonst zaehlt der page_view doppelt.
   */
  gtmId: "GTM-5J2PCRDK",
  ga4Id: "G-D87Z18WJYX",

  /** Web3Forms – Access Key steht noch aus, Formular meldet das sichtbar. */
  web3formsKey: "",
} as const;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };
