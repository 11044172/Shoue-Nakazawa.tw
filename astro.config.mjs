import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://11044172.github.io",
  base: "/Shoue-Nakazawa.tw",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/legacy/")
    })
  ],
  build: {
    format: "directory"
  }
});
