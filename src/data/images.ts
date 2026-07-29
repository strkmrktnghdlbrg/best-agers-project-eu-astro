import generated from "./page-images.generated.json";

export type PageImage = {
  id: string;
  src: string;
  srcCard: string;
  width: number;
  height: number;
  alt: string;
  topic: string;
  title: string;
  creator: string;
  creatorUrl: string;
  license: string;
  licenseVersion: string;
  licenseUrl: string;
  source: string;
  provider: string;
};

const images = generated as Record<string, PageImage>;

/**
 * Bild zu einem Seitenpfad. Erzeugt von tools/images-build.mjs, deshalb
 * immer defensiv abfragen: Seiten ohne Eintrag rendern schlicht kein Bild
 * statt den Build zu brechen.
 */
export const imageFor = (path: string): PageImage | undefined => images[path];

/** Alle Bilder fuer die Nachweisseite, stabil nach Pfad sortiert. */
export const allImages = Object.entries(images)
  .map(([path, img]) => ({ path, ...img }))
  .sort((a, b) => a.path.localeCompare(b.path));

/**
 * Lizenzkuerzel in etwas, das man lesen kann. StockSnap liefert durchgaengig
 * CC0, die uebrigen Faelle stehen fuer den Fall der Faelle mit drin.
 */
export const licenseLabel = (img: PageImage): string => {
  const v = img.licenseVersion ? ` ${img.licenseVersion}` : "";
  switch (img.license) {
    case "cc0":
      return "CC0 1.0 (gemeinfrei)";
    case "pdm":
      return "Public Domain Mark";
    default:
      return `CC ${img.license.toUpperCase()}${v}`;
  }
};
