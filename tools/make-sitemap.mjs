// sitemap.xml と robots.txt を data/ の内容から作り直します。
// 使い方（portfolio フォルダで）: node tools/make-sitemap.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["data/site.js", "data/works.js"]) {
  vm.runInContext(readFileSync(new URL(f, root), "utf8"), ctx, { filename: f });
}
const { SITE, WORKS } = ctx.window;
const base = SITE.baseUrl.replace(/\/?$/, "/");

const paths = [
  "",
  "about.html",
  "contact.html",
  ...WORKS.filter((w) => !w.draft).map((w) => `work.html?id=${encodeURIComponent(w.id)}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(new URL("sitemap.xml", root), xml);
writeFileSync(new URL("robots.txt", root), `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`);
console.log(`sitemap.xml: ${paths.length} URLs (${base})`);
