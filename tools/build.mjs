// 作品写真のコピー・HTML（各ページの <head> と検索エンジン向けの本文）・sitemap.xml・robots.txt を
// data/ の内容から作り直します。
// 使い方（portfolio フォルダで）: node tools/build.mjs
//
// ページの本文は assets/js/main.js が表示します。ここで <main> に書き込むのは、
// JavaScript を実行しない検索エンジンやリンクプレビュー向けの英語の要約で、
// ブラウザでは main.js がすぐに同じ内容の表示に置き換えます（画面に二重には出ません）。
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["data/site.js", "data/i18n.js", "data/profile.js", "data/works.js"]) {
  vm.runInContext(readFileSync(new URL(f, root), "utf8"), ctx, { filename: f });
}
const { SITE, I18N, PROFILE, WORKS: ALL_WORKS } = ctx.window;
const WORKS = ALL_WORKS.filter((w) => w && w.id && !w.draft);
const SEO = SITE.seo;
const base = SITE.baseUrl.replace(/\/?$/, "/");

/* ---------- work photos ---------- */

// works.js の photoDir（例 photo/L）の画像を images/works/<id>/photos/ にコピーし、
// ファイル名順の一覧を data/photos.js に書き出す。元フォルダのファイルは読むだけで変更しない。
// （photo/ は Git に含めないため、元フォルダがない環境では公開用フォルダの中身をそのまま使う）
const IMAGE = /\.(jpe?g|png|webp)$/i;
const byName = (a, b) => a.localeCompare(b, "en", { numeric: true });
const sameFile = (a, b) => existsSync(b) && readFileSync(a).equals(readFileSync(b));
const PHOTOS = {};
for (const w of WORKS) {
  const dest = `images/works/${w.id}/photos/`;
  const destUrl = new URL(dest, root);
  if (w.photoDir && existsSync(new URL(w.photoDir.replace(/\/?$/, "/"), root))) {
    const srcUrl = new URL(w.photoDir.replace(/\/?$/, "/"), root);
    const files = readdirSync(srcUrl).filter((f) => IMAGE.test(f));
    mkdirSync(destUrl, { recursive: true });
    for (const f of files) {
      if (!sameFile(new URL(f, srcUrl), new URL(f, destUrl))) copyFileSync(new URL(f, srcUrl), new URL(f, destUrl));
    }
    // 元フォルダから消えた写真は公開用フォルダからも消す（公開用のコピーだけが対象）
    for (const f of readdirSync(destUrl)) if (IMAGE.test(f) && !files.includes(f)) rmSync(new URL(f, destUrl));
  }
  const list = existsSync(destUrl) ? readdirSync(destUrl).filter((f) => IMAGE.test(f)).sort(byName) : [];
  if (list.length) PHOTOS[w.id] = list.map((f) => dest + f);
}
writeFileSync(
  new URL("data/photos.js", root),
  `// 自動生成（node tools/build.mjs）。編集しないでください。作品ごとの写真一覧（01 がメイン画像）\nwindow.PHOTOS = ${JSON.stringify(PHOTOS, null, 2)};\n`
);

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ESC[c]);
const en = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v.en : v);
const list = (v) => (Array.isArray(en(v)) ? en(v) : []);
const ui = (k) => I18N.en[k] || k;
const workTitle = (w) => (typeof w.title === "string" ? w.title : w.title.en);
const workUrl = (w) => `work.html?id=${encodeURIComponent(w.id)}`;

/* ---------- structured data (schema.org) ---------- */

const personId = `${base}#person`;
const person = {
  "@type": "Person",
  "@id": personId,
  name: SEO.personName,
  alternateName: SEO.alternateNames,
  url: base,
  description: list(PROFILE.biography).join(" "),
  knowsAbout: SEO.knowsAbout,
};
const website = {
  "@type": "WebSite",
  "@id": `${base}#website`,
  name: SEO.personName,
  alternateName: SEO.alternateNames,
  url: base,
  inLanguage: ["en", "ja"],
  author: { "@id": personId },
};
const profilePage = {
  "@type": "ProfilePage",
  "@id": `${base}about.html`,
  url: `${base}about.html`,
  name: SEO.pages.about.title,
  mainEntity: { "@id": personId },
  isPartOf: { "@id": `${base}#website` },
};
const jsonLd = (graph) =>
  `  <script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    .split("\n")
    .map((l) => "  " + l)
    .join("\n")}\n  </script>\n`;

/* ---------- static fallback content (English) ---------- */

const nameHtml = `${esc(SITE.name)} <span lang="ja">${esc(SITE.nameJa)}</span>`;
const nav = `<nav class="static-nav" aria-label="${esc(ui("mainNav"))}">
      <a href="index.html">${nameHtml}</a>
      ${SITE.nav.map((n) => `<a href="${esc(n.href)}">${esc(en(n.label))}</a>`).join("\n      ")}
    </nav>`;

const recordsHtml = (items) =>
  `<ul>
${list(items)
  .map((r) => `      <li>${[en(r.date) || r.year, en(r.title), en(r.detail), en(r.status), en(r.note)].filter(Boolean).map(esc).join(" — ")}</li>`)
  .join("\n")}
    </ul>`;

const birth = /^(\d{4})-(\d{2})-(\d{2})$/.exec(PROFILE.birthDate || "");
const birthText = birth
  ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
      new Date(Date.UTC(+birth[1], +birth[2] - 1, +birth[3]))
    )
  : "";

const snapshots = {
  works: `<h1>${esc(SITE.nameJa)} / ${esc(SITE.name)} — ${esc(en(SITE.field))}</h1>
    <h2>${esc(ui("projects"))}</h2>
    <ul>
${WORKS.map((w) => `      <li><a href="${workUrl(w)}">${esc(workTitle(w))}</a> ${esc(w.year)}</li>`).join("\n")}
    </ul>`,
  about: `<h1>${esc(ui("about"))}</h1>
    <h2>${nameHtml}</h2>
    <dl>
      <dt>${esc(ui("dateOfBirth"))}</dt><dd><time datetime="${esc(PROFILE.birthDate)}">${esc(birthText)}</time></dd>
    </dl>
${list(PROFILE.biography).map((p) => `    <p>${esc(p)}</p>`).join("\n")}
    <h2>${esc(ui("education"))}</h2>
    ${recordsHtml(PROFILE.education)}
    <h2>${esc(ui("awardsSelections"))}</h2>
    ${recordsHtml(PROFILE.awards)}`,
  contact: `<h1>${esc(ui("contact"))}</h1>
${list([en(SITE.contact.intro)]).map((p) => `    <p>${esc(p)}</p>`).join("\n")}
${SITE.contact.items.map((i) => `    <p>${esc(en(i.label))}: ${esc(en(i.value))}</p>`).join("\n")}
    <p>${esc(en(SITE.contact.note))}</p>`,
  work: `<h1>${esc(ui("projects"))}</h1>
    <ul>
${WORKS.map((w) => `      <li><a href="${workUrl(w)}">${esc(workTitle(w))}</a></li>`).join("\n")}
    </ul>`,
};

/* ---------- pages ---------- */

const pages = [
  { file: "index.html", page: "works", data: ["works", "photos"], path: "", ...SEO.pages.works, ld: [website, person] },
  { file: "about.html", page: "about", data: ["profile"], path: "about.html", ...SEO.pages.about, ld: [person, profilePage] },
  { file: "contact.html", page: "contact", path: "contact.html", ...SEO.pages.contact },
  // 作品詳細は ?id= ごとに URL が変わるので canonical とタイトルは main.js が設定する
  { file: "work.html", page: "work", nav: "works", data: ["profile", "works", "photos"], path: null, title: `${ui("projects")} — ${SEO.siteName}`, description: SEO.pages.works.description },
  {
    file: "404.html",
    page: "notfound",
    nav: "",
    path: null,
    noindex: true,
    title: `${ui("notFound")} — ${SEO.siteName}`,
    description: SEO.pages.works.description,
    main: `<header class="page-head">
      <h1 class="page-title">${esc(ui("notFound"))}</h1>
      <p class="page-head__note">${esc(ui("notFoundText"))}</p>
      <a class="text-link" href="index.html">${esc(ui("backHome"))}</a>
    </header>`,
  },
];

for (const p of pages) {
  const url = p.path != null ? base + p.path : null;
  const main = p.main
    ? `    ${p.main}`
    : `    <!-- 検索エンジン向けの要約（tools/build.mjs が生成。表示は main.js が置き換えます） -->
    ${nav}
    ${snapshots[p.page]}`;
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
${p.noindex ? `  <base href="/">\n  <meta name="robots" content="noindex">\n` : ""}${
    url ? `  <link rel="canonical" href="${url}">\n  <meta property="og:url" content="${url}">\n` : ""
  }  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SEO.siteName)}">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#ffffff">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/fonts.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <script>try{if(localStorage.getItem("lang")==="ja")document.documentElement.lang="ja"}catch(e){}</script>
  <script defer src="data/site.js"></script>
  <script defer src="data/i18n.js"></script>
${(p.data || []).map((d) => `  <script defer src="data/${d}.js"></script>\n`).join("")}  <script defer src="assets/js/main.js"></script>
${p.ld ? jsonLd(p.ld) : ""}</head>
<body data-page="${p.page}" data-nav="${p.nav != null ? p.nav : p.page}">
  <main id="main" tabindex="-1">
${main}
  </main>
</body>
</html>
`;
  writeFileSync(new URL(p.file, root), html);
}

/* ---------- sitemap.xml / robots.txt ---------- */

const paths = ["", "about.html", "contact.html", ...WORKS.map(workUrl)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${esc(base + p)}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(new URL("sitemap.xml", root), xml);
writeFileSync(new URL("robots.txt", root), `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`);
console.log(`photos: ${WORKS.map((w) => `${w.id} ${(PHOTOS[w.id] || []).length}`).join(", ")}`);
console.log(`HTML: ${pages.map((p) => p.file).join(", ")}\nsitemap.xml: ${paths.length} URLs (${base})`);
