/*
 * RIKI IMAMURA — portfolio
 * 共通スクリプト：ヘッダー・フッター・各ページの描画、EN / JP 切り替え、画像ビューア、ページ遷移。
 * 内容の編集は data/ フォルダで行います（このファイルは通常、編集不要です）。
 */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const PROFILE = window.PROFILE || {};
  const I18N = window.I18N || {};
  const WORKS = (window.WORKS || []).filter((w) => w && w.id && !w.draft);
  const page = document.body.dataset.page || "";

  /* ---------- language ---------- */

  const LANGS = [
    { id: "en", label: "EN", name: "English" },
    { id: "ja", label: "JP", name: "日本語" },
  ];
  const STORAGE_KEY = "lang";
  let lang = "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.some((l) => l.id === saved)) lang = saved;
  } catch (e) {
    /* storage unavailable: stay in English */
  }

  // { en, ja } の値を現在の言語で取り出す（ただの文字列ならそのまま）
  const tr = (v) =>
    v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "ja" in v) ? (v[lang] != null ? v[lang] : v.en != null ? v.en : v.ja) : v;
  const ui = (key) => (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;

  /* ---------- helpers ---------- */

  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ESC[c]);
  const list = (v) => {
    v = tr(v);
    return (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);
  };
  const pad = (n) => String(n).padStart(2, "0");
  const toImage = (v) => (typeof v === "string" ? { src: v } : v || null);
  // 作品名は固有名詞なので翻訳しない（{ en, ja } で書かれていても英語表記を使う）
  const workTitle = (w) => (typeof w.title === "string" ? w.title : (w.title && w.title.en) || "");
  // 作品写真（tools/build.mjs が photoDir から作る data/photos.js）。01 がメイン画像
  const photosOf = (w) => ((window.PHOTOS || {})[w.id] || []).map((src) => ({ src }));
  const workUrl = (w) => `work.html?id=${encodeURIComponent(w.id)}`;
  const isExternal = (href) => /^https?:\/\//.test(href || "");
  const linkAttrs = (href) => (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "");

  const prose = (v, cls = "prose") => {
    const ps = list(v);
    return ps.length ? `<div class="${cls}">${ps.map((p) => `<p>${esc(tr(p))}</p>`).join("")}</div>` : "";
  };

  function img(image, { eager = false, alt } = {}) {
    if (!image || !image.src) return "";
    const size = image.width && image.height ? ` width="${+image.width}" height="${+image.height}"` : "";
    const load = eager ? ' fetchpriority="high"' : ' loading="lazy"';
    const text = alt != null ? alt : tr(image.alt) || "";
    return `<img class="fade" src="${esc(image.src)}" alt="${esc(text)}"${size}${load} decoding="async">`;
  }

  // 拡大表示できる画像（ギャラリー・プロセス）
  function figure(image, cls) {
    image = toImage(image);
    if (!image || !image.src) return "";
    const size = image.size && image.size !== "auto" ? ` is-${esc(image.size)}` : "";
    const full = image.full ? ` data-full="${esc(image.full)}"` : "";
    const alt = tr(image.alt);
    const caption = tr(image.caption);
    const label = alt ? `${ui("enlarge")}: ${esc(alt)}` : ui("enlarge");
    return `<figure class="${cls}${size}" data-orient>
      <button type="button" class="zoom" data-zoom${full} aria-label="${label}">${img(image)}</button>
      ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}
    </figure>`;
  }

  // 空の内容ならセクションごと出力しない
  const block = (label, body, mod) =>
    body
      ? `<section class="block${mod ? ` block--${mod}` : ""}">
          <h2 class="block__label label">${esc(label)}</h2>
          <div class="block__body">${body}</div>
        </section>`
      : "";

  // 経歴の一覧：{ year | date, title, detail, status, note, url }
  // date（例「2025年3月 — 卒業」）があるものは、年の列ではなくタイトルの上に表示する
  function records(items) {
    items = list(items);
    if (!items.length) return "";
    return `<ul class="records">${items
      .map((r) => {
        const t = esc(tr(r.title));
        const title = r.url ? `<a class="text-link" href="${esc(r.url)}"${linkAttrs(r.url)}>${t}</a>` : t;
        const lines = [...list(r.detail), tr(r.status), tr(r.note)]
          .filter(Boolean)
          .map((d) => `<span class="records__detail">${esc(tr(d))}</span>`)
          .join("");
        const date = tr(r.date);
        return `<li${date ? ' class="is-stacked"' : ""}>
          ${date ? `<span class="records__date">${esc(date)}</span>` : `<span class="records__year">${esc(r.year)}</span>`}
          <span class="records__title">${title}</span>
          ${lines}
        </li>`;
      })
      .join("")}</ul>`;
  }

  function specs(items) {
    items = list(items);
    if (!items.length) return "";
    return `<dl class="specs">${items
      .map((s) => `<div><dt>${esc(tr(s.label))}</dt><dd>${esc(list(s.value).join(", "))}</dd></div>`)
      .join("")}</dl>`;
  }

  // 英語名＋日本語名（日本語名は小さく併記。どちらの言語でも表示）
  const personName = (en, ja, cls) =>
    `<span class="${cls}__en">${esc(en)}</span>${ja ? `<span class="${cls}__ja" lang="ja">${esc(ja)}</span>` : ""}`;

  // "YYYY-MM-DD" → { y, m, d }（タイムゾーンの影響を受けないよう文字列から読む）
  const parseDate = (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return m ? { y: +m[1], m: +m[2], d: +m[3] } : null;
  };

  // 閲覧日時点の満年齢
  const ageOn = (b, today = new Date()) => {
    const m = today.getMonth() + 1;
    const beforeBirthday = m < b.m || (m === b.m && today.getDate() < b.d);
    return today.getFullYear() - b.y - (beforeBirthday ? 1 : 0);
  };

  const formatDate = (b) =>
    new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(b.y, b.m - 1, b.d)
    );

  // 自由セクション：{ label, text } または { label, items }
  const customSections = (sections) =>
    list(sections).map((s) => block(tr(s.label), s.items ? records(s.items) : prose(s.text))).join("");

  function setMeta(attr, key, content) {
    let m = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute(attr, key);
      document.head.appendChild(m);
    }
    m.setAttribute("content", content);
  }

  function setPageMeta(title, description, path) {
    document.title = title;
    setMeta("property", "og:title", title);
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }
    if (path != null && SITE.baseUrl) {
      const url = SITE.baseUrl.replace(/\/?$/, "/") + path;
      setMeta("property", "og:url", url);
      // work.html は ?id= ごとに URL が変わるため、HTML には canonical を書かずここで追加する
      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
  }

  // 検索エンジン向けのタイトル・説明文（data/site.js の seo。言語切り替えに関係なく固定）
  const SEO = SITE.seo || {};
  const siteName = SEO.siteName || SITE.name;
  const seoMeta = (id, path) => {
    const m = (SEO.pages && SEO.pages[id]) || {};
    setPageMeta(m.title || siteName, m.description, path);
  };

  /* ---------- header / footer ---------- */

  const header = document.createElement("header");
  header.className = "site-header";
  const skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  document.body.prepend(skip, header);
  document.body.append(footer);

  function renderChrome() {
    const current = document.body.dataset.nav || page;
    skip.textContent = ui("skip");

    const nav = list(SITE.nav)
      .map((n) => `<li><a href="${esc(n.href)}"${n.id === current ? ' aria-current="page"' : ""}>${esc(tr(n.label))}</a></li>`)
      .join("");
    const switcher = LANGS.map(
      (l) =>
        `<button type="button" data-lang="${l.id}" lang="${l.id}" aria-label="${esc(l.name)}" aria-pressed="${l.id === lang}">${l.label}</button>`
    ).join('<span aria-hidden="true">/</span>');

    header.innerHTML = `
      <a class="site-title" href="index.html">${personName(SITE.name, SITE.nameJa, "site-title")}</a>
      <nav class="site-nav" aria-label="${esc(ui("mainNav"))}"><ul>${nav}</ul></nav>
      <div class="lang-switch" role="group" aria-label="${esc(ui("language"))}">${switcher}</div>`;

    const links = list(SITE.contact && SITE.contact.items)
      .filter((c) => c.footer !== false && c.href)
      .map((c) => `<li><a href="${esc(c.href)}"${linkAttrs(c.href)}>${esc(tr(c.label))}</a></li>`)
      .join("");
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}</p>
      ${links ? `<ul class="site-footer__links">${links}</ul>` : ""}`;
  }

  header.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn || btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* not persisted, but still switch for this page */
    }
    render();
    const again = header.querySelector(`[data-lang="${lang}"]`);
    if (again) again.focus();
  });

  /* ---------- WORKS (index) ---------- */

  function renderWorks(main) {
    seoMeta("works", "");

    const cards = WORKS.map((w, i) => {
      const cover = toImage(w.cover) || photosOf(w)[0] || {};
      return `<li class="work-card">
        <a class="work-card__link" href="${workUrl(w)}">
          <div class="work-card__media" style="--ratio: ${esc(w.coverRatio || "1 / 1")}; --position: ${esc(w.coverPosition || "50% 50%")}">${img(cover, { eager: i < 2 })}</div>
          <div class="work-card__caption">
            <h3 class="work-card__title">${esc(workTitle(w))}</h3>
            <span class="work-card__year">${esc(w.year)}</span>
          </div>
        </a>
      </li>`;
    }).join("");

    main.innerHTML = `
      <h1 class="visually-hidden">${esc(SITE.nameJa)} / ${esc(SITE.name)} — ${esc(tr(SITE.field))}</h1>
      <section class="projects" aria-labelledby="projects-title">
        <header class="page-head"><h2 class="page-title" id="projects-title">${esc(ui("projects"))}</h2></header>
        <ul class="work-grid">${cards}</ul>
      </section>`;
  }

  /* ---------- PROJECT DETAIL ---------- */

  function renderWork(main) {
    const id = new URLSearchParams(location.search).get("id");
    const index = WORKS.findIndex((w) => w.id === id);
    if (index < 0) return renderNotFound(main);

    const w = WORKS[index];
    const title = workTitle(w);
    const photos = photosOf(w);
    const hero = photos[0];
    setPageMeta(`${title} — ${siteName}`, tr(w.summary) || list(w.overview)[0], workUrl(w));

    // 01 はメイン画像なので、下部には 02 以降だけを並べる
    const rest = photos.slice(1).map((ph, i) => ({ ...ph, alt: `${title} — ${pad(i + 2)}` }));
    const gallery = rest.length
      ? `<section class="work-photos" aria-label="${esc(ui("photos"))}"><div class="gallery">${rest.map((g) => figure(g, "gallery__item")).join("")}</div></section>`
      : "";

    const prev = WORKS[(index - 1 + WORKS.length) % WORKS.length];
    const next = WORKS[(index + 1) % WORKS.length];

    main.innerHTML = `
      <article class="work">
        <header class="work-head">
          <a class="back-link label" href="index.html">${esc(ui("backToWorks"))}</a>
          <h1 class="page-title work-title">${esc(title)}</h1>
          ${w.year ? `<p class="work-year">${esc(w.year)}</p>` : ""}
        </header>
        ${
          hero
            ? `<figure class="work-hero"><button type="button" class="zoom" data-zoom aria-label="${esc(ui("enlarge"))}: ${esc(title)}">${img(hero, { eager: true, alt: title })}</button></figure>`
            : ""
        }
        ${block(ui("overview"), prose(w.overview))}
        ${block(ui("credits"), specs(w.credits))}
        ${block(ui("awardsSelections"), records(workAwards(w)))}
        ${w.links ? block(ui("links"), workLinks(w.links)) : ""}
        ${gallery}
      </article>
      ${
        WORKS.length > 1
          ? `<nav class="pager" aria-label="${esc(ui("moreWorks"))}">
              <a class="pager__link" href="${workUrl(prev)}"><span class="label">${esc(ui("previous"))}</span><span class="pager__title">${esc(workTitle(prev))}</span></a>
              <a class="pager__link pager__link--next" href="${workUrl(next)}"><span class="label">${esc(ui("next"))}</span><span class="pager__title">${esc(workTitle(next))}</span></a>
            </nav>`
          : ""
      }`;
  }

  // 受賞・選考歴は profile.js の awards から id で引く（ABOUT と同じ表記・状況になる）
  function workAwards(w) {
    return list(w.awards)
      .map((ref) => {
        const a = list(PROFILE.awards).find((x) => x.id === ref.id);
        if (!a) return null;
        const related = ref.relatedWork ? ui("relatedWork").replace("{title}", ref.relatedWork) : null;
        return { ...a, detail: related ? [related] : a.detail };
      })
      .filter(Boolean);
  }

  // LINKS：3Dデータと掲載記事。まだないものは「公開準備中」「追加予定」と表示する
  function workLinks(links) {
    const linkTitle = (title, href) => {
      const t = esc(tr(title) || href);
      return href ? `<a class="text-link" href="${esc(href)}"${isExternal(href) ? linkAttrs(href) : " download"}>${t}</a>` : t;
    };
    const item = (title, lines, pending) => `<li>
        <span class="links__title">${title}</span>
        ${lines.filter(Boolean).map((d) => `<span class="links__detail">${esc(d)}</span>`).join("")}
        ${pending ? `<span class="links__detail">${esc(pending)}</span>` : ""}
      </li>`;
    const group = (label, items, empty) => `<div class="records-group">
        <h3 class="label">${esc(label)}</h3>
        <ul class="links">${items.length ? items.join("") : `<li><span class="links__detail">${esc(empty)}</span></li>`}</ul>
      </div>`;

    const data = list(links.data).map((d) => {
      const href = d.url || d.file;
      const license = tr(d.license) ? `${ui("license")}: ${tr(d.license)}` : "";
      return item(linkTitle(d.title, href), [tr(d.description), license], href ? "" : ui("comingSoon"));
    });
    const articles = list(links.articles).map((r) =>
      item(linkTitle(r.title, r.url), [tr(r.source)], r.url ? "" : ui("toBeAdded"))
    );
    return group(ui("data3d"), data, ui("comingSoon")) + group(ui("articles"), articles, ui("toBeAdded"));
  }

  function renderNotFound(main) {
    setPageMeta(`${ui("notFound")} — ${siteName}`);
    setMeta("name", "robots", "noindex");
    main.innerHTML = `
      <header class="page-head">
        <h1 class="page-title">${esc(ui("notFound"))}</h1>
        <p class="page-head__note">${esc(ui("notFoundText"))}</p>
        <a class="text-link" href="index.html">${esc(ui("backHome"))}</a>
      </header>`;
  }

  /* ---------- ABOUT ---------- */

  function renderAbout(main) {
    const p = PROFILE;
    const portrait = toImage(p.portrait);
    const birth = parseDate(p.birthDate);
    seoMeta("about", "about.html");

    main.innerHTML = `
      <header class="page-head"><h1 class="page-title">${esc(ui("about"))}</h1></header>
      <section class="about-intro${portrait ? "" : " about-intro--text"}">
        ${portrait ? `<figure class="about-intro__portrait">${img(portrait, { eager: true })}</figure>` : ""}
        <div class="about-intro__body">
          <dl class="profile">
            <div class="profile__name"><dt class="label">${esc(ui("name"))}</dt><dd>${personName(tr(p.name) || SITE.name, p.nameJa || SITE.nameJa, "profile-name")}</dd></div>
            ${
              birth
                ? `<div><dt class="label">${esc(ui("dateOfBirth"))}</dt><dd><time datetime="${esc(p.birthDate)}">${esc(formatDate(birth))}</time></dd></div>
                   <div><dt class="label">${esc(ui("age"))}</dt><dd>${esc(ui("ageValue").replace("{n}", ageOn(birth)))}</dd></div>`
                : ""
            }
          </dl>
          ${prose(p.biography, "prose about-bio")}
        </div>
      </section>
      ${block(ui("education"), records(p.education))}
      ${block(ui("awardsSelections"), records(p.awards))}
      ${block(ui("exhibitions"), records(p.exhibitions))}
      ${block(ui("publications"), records(p.publications))}
      ${customSections(p.sections)}`;
  }

  /* ---------- CONTACT ---------- */

  function renderContact(main) {
    const c = SITE.contact || {};
    seoMeta("contact", "contact.html");
    const items = list(c.items)
      .map((i) => {
        const value = esc(tr(i.value));
        return `<li>
          <span class="label">${esc(tr(i.label))}</span>
          ${
            i.href
              ? `<a class="contact-list__value" href="${esc(i.href)}"${linkAttrs(i.href)}>${value}</a>`
              : `<span class="contact-list__value">${value}</span>`
          }
        </li>`;
      })
      .join("");

    main.innerHTML = `
      <header class="page-head"><h1 class="page-title">${esc(ui("contact"))}</h1></header>
      ${block(ui("inquiries"), `${prose(c.intro)}<ul class="contact-list">${items}</ul>${prose(c.note, "prose contact-note")}`)}`;
  }

  /* ---------- images ---------- */

  function revealImages(root) {
    root.querySelectorAll("img.fade").forEach((im) => {
      const done = () => im.classList.add("is-loaded");
      if (im.complete && im.naturalWidth) done();
      else {
        im.addEventListener("load", done, { once: true });
        im.addEventListener("error", done, { once: true });
      }
    });
  }

  // 縦長・横長を判定してレイアウトを切り替える
  function markOrientation(root) {
    root.querySelectorAll("[data-orient]").forEach((fig) => {
      const im = fig.querySelector("img");
      const set = () => {
        if (!im.naturalWidth) return;
        fig.classList.add(im.naturalWidth > im.naturalHeight * 1.05 ? "is-landscape" : "is-portrait");
      };
      if (im.complete) set();
      else im.addEventListener("load", set, { once: true });
    });
  }

  let lightbox = null;

  function setupLightbox(root) {
    if (lightbox) lightbox.remove();
    lightbox = null;
    const triggers = [...root.querySelectorAll("[data-zoom]")];
    if (!triggers.length || typeof HTMLDialogElement !== "function") return;

    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", ui("viewer"));
    dlg.innerHTML = `
      <div class="lightbox__bar">
        <span class="lightbox__count label" aria-live="polite"></span>
        <button type="button" class="label" data-close>${esc(ui("close"))}</button>
      </div>
      <figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>
      <div class="lightbox__nav"${triggers.length < 2 ? " hidden" : ""}>
        <button type="button" class="label" data-step="-1">${esc(ui("prevImage"))}</button>
        <button type="button" class="label" data-step="1">${esc(ui("nextImage"))}</button>
      </div>`;
    document.body.appendChild(dlg);
    lightbox = dlg;

    const view = dlg.querySelector(".lightbox__img");
    const caption = dlg.querySelector(".lightbox__caption");
    const count = dlg.querySelector(".lightbox__count");
    let current = 0;

    const show = (i) => {
      current = (i + triggers.length) % triggers.length;
      const t = triggers[current];
      const src = t.querySelector("img");
      const fc = t.closest("figure").querySelector("figcaption");
      view.src = t.dataset.full || src.currentSrc || src.src;
      view.alt = src.alt;
      caption.textContent = fc ? fc.textContent : "";
      count.textContent = `${current + 1} / ${triggers.length}`;
    };

    triggers.forEach((t, i) =>
      t.addEventListener("click", () => {
        show(i);
        dlg.showModal();
      })
    );
    dlg.addEventListener("click", (e) => {
      const step = e.target.closest("[data-step]");
      if (step) show(current + Number(step.dataset.step));
      else if (e.target.closest("[data-close]") || e.target === dlg || e.target.classList.contains("lightbox__figure")) dlg.close();
    });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    });
  }

  /* ---------- page transition ---------- */

  function setupTransitions() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.protocol !== location.protocol || url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(() => (location.href = url.href), 240);
    });
    // 「戻る」で復帰したときに表示を戻す
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) document.body.classList.remove("is-leaving");
    });
  }

  /* ---------- init ---------- */

  const main = document.getElementById("main");
  const renderers = { works: renderWorks, work: renderWork, about: renderAbout, contact: renderContact, notfound: renderNotFound };

  // 言語切り替え時もページを再読み込みせず、ここで全体を描き直す
  function render() {
    document.documentElement.lang = lang;
    renderChrome();
    if (main && renderers[page]) {
      renderers[page](main);
      revealImages(main);
      markOrientation(main);
      setupLightbox(main);
    }
  }

  render();
  setupTransitions();
})();
