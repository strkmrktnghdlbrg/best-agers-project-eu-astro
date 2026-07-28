// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import outboundGate from "./integrations/outbound-gate.mjs";

export default defineConfig({
  // WWW ist kanonisch. Der Apex leitet serverseitig per 301 hierher.
  site: "https://www.best-agers-project.eu",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    outboundGate(),
    sitemap({
      // Rechtsseiten gehoeren nicht in die Sitemap (noindex, siehe BaseLayout).
      // Die Danke-Seite ebenfalls nicht – sie ist ein Formular-Ziel, kein Inhalt.
      filter: (page) =>
        !/\/(impressum|datenschutz|haftungsausschluss|danke)\/$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
