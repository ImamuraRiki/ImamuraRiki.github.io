/*
 * RIKI IMAMURA — portfolio
 * 共通スクリプト：ヘッダー・フッター・各ページの描画、画像ビューア、ページ遷移。
 * 内容の編集は data/ フォルダで行います（このファイルは通常、編集不要です）。
 */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const PROFILE = window.PROFILE || {};
  const WORKS = (window.WORKS || []).filter((w) => w && w.id && !w.draft);
  const page = document.body.dataset.page || "";

  /* ---------- helpers ---------- */

  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ESC[c]);
  const list = (v) => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);
  const pad = (n) => String(n).padStart(2, "0");
  const toImage = (v) => (typeof v === "string" ? { src: v } : v || null);
  const workUrl = (w) => `work.html?id=${encodeURIComponent(w.id)}`;
  const isExternal = (href) => /^https?:\/\//.test(href || "");
  const linkAttrs = (href) => (isExternal(href) ? ' target="_blank" rel="noopener"' : "");

  const prose = (v, cls = "prose") => {
    const ps = list(v);
    return ps.length ? `<div class="${cls}">${ps.map((p) => `<p>${esc(p)}</p>`).join("")}</div>` : "";
  };

  function img(image, { eager = false } = {}) {
    if (!image || !image.src) return "";
    const size = image.width && image.height ? ` width="${+image.width}" height="${+image.height}"` : "";
    const load = eager ? ' fetchpriority="high"' : ' loading="lazy"';
    return `<img class="fade" src="${esc(image.src)}" alt="${esc(image.alt || "")}"${size}${load} decoding="async">`;
  }

  // 拡大表示できる画像（ギャラリー・プロセス）
  function figure(image, cls) {
    image = toImage(image);
    if (!image || !image.src) return "";
    const size = image.size && image.size !== "auto" ? ` is-${esc(image.size)}` : "";
    const full = image.full ? ` data-full="${esc(image.full)}"` : "";
    const label = image.alt ? `Enlarge image: ${esc(image.alt)}` : "Enlarge image";
    return `<figure class="${cls}${size}" data-orient>
      <button type="button" class="zoom" data-zoom${full} aria-label="${label}">${img(image)}</button>
      ${image.caption ? `<figcaption>${esc(image.caption)}</figcaption>` : ""}
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

  function records(items) {
    items = list(items);
    if (!items.length) return "";
    return `<ul class="records">${items
      .map((r) => {
        const title = r.url ? `<a class="text-link" href="${esc(r.url)}"${linkAttrs(r.url)}>${esc(r.title)}</a>` : esc(r.title);
        return `<li>
          <span class="records__year">${esc(r.year)}</span>
          <span class="records__title">${title}</span>
          ${r.detail ? `<span class="records__detail">${esc(r.detail)}</span>` : ""}
        </li>`;
      })
      .join("")}</ul>`;
  }

  function specs(items) {
    items = list(items);
    if (!items.length) return "";
    return `<dl class="specs">${items
      .map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(list(s.value).join(", "))}</dd></div>`)
      .join("")}</dl>`;
  }

  // 自由セクション：{ label, text } または { label, items }
  const customSections = (sections) =>
    list(sections).map((s) => block(s.label, s.items ? records(s.items) : prose(s.text))).join("");

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
      const canonical = document.head.querySelector('link[rel="canonical"]');
      if (canonical) canonical.href = url;
    }
  }

  /* ---------- header / footer ---------- */

  function renderChrome() {
    const current = document.body.dataset.nav || page;
    const nav = list(SITE.nav)
      .map((n) => `<li><a href="${esc(n.href)}"${n.id === current ? ' aria-current="page"' : ""}>${esc(n.label)}</a></li>`)
      .join("");
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header">
        <a class="site-title" href="index.html">${esc(SITE.name)}</a>
        <nav class="site-nav" aria-label="Main"><ul>${nav}</ul></nav>
      </header>`
    );

    const links = list(SITE.contact && SITE.contact.items)
      .filter((c) => c.footer !== false && c.href)
      .map((c) => `<li><a href="${esc(c.href)}"${linkAttrs(c.href)}>${esc(c.label)}</a></li>`)
      .join("");
    document.body.insertAdjacentHTML(
      "beforeend",
      `<footer class="site-footer">
        <p>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}</p>
        <ul class="site-footer__links">${links}</ul>
      </footer>`
    );
  }

  /* ---------- WORKS (index) ---------- */

  function renderWorks(main) {
    const used = new Set(WORKS.flatMap((w) => list(w.tags)));
    const filters = list(SITE.filters).filter((f) => f.id === "all" || used.has(f.id));

    const cards = WORKS.map((w, i) => {
      const cover = toImage(w.cover) || toImage(w.hero) || {};
      return `<li class="work-card" data-tags="${esc(list(w.tags).join(" "))}">
        <a class="work-card__link" href="${workUrl(w)}">
          <div class="work-card__media" style="--ratio: ${esc(w.coverRatio || "4 / 5")}">${img(cover, { eager: i < 2 })}</div>
          <div class="work-card__caption">
            <h2 class="work-card__title">${esc(w.title)}</h2>
            <span class="work-card__year">${esc(w.year)}</span>
            <span class="work-card__category">${esc(w.category)}</span>
          </div>
        </a>
      </li>`;
    }).join("");

    main.innerHTML = `
      <section class="intro">
        <h1 class="visually-hidden">${esc(SITE.name)} — Works</h1>
        <p class="intro__lead">${esc(SITE.intro || SITE.description)}</p>
        <p class="intro__field label">${esc(SITE.field)}</p>
      </section>
      ${
        filters.length > 2
          ? `<div class="filters" role="group" aria-label="Filter works">${filters
              .map((f, i) => `<button type="button" data-filter="${esc(f.id)}" aria-pressed="${i === 0}">${esc(f.label)}</button>`)
              .join("")}</div>`
          : ""
      }
      <p class="visually-hidden" aria-live="polite" data-count></p>
      <ul class="work-grid">${cards}</ul>`;

    const items = [...main.querySelectorAll(".work-card")];
    const count = main.querySelector("[data-count]");
    // 2列表示のとき右列を下にずらす（表示中の作品だけで数える）
    const layout = () => {
      let n = 0;
      items.forEach((c) => {
        if (c.hidden) return;
        c.classList.toggle("is-offset", n % 2 === 1);
        n++;
      });
      return n;
    };
    layout();

    main.querySelectorAll("[data-filter]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        main.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        items.forEach((c) => (c.hidden = f !== "all" && !c.dataset.tags.split(" ").includes(f)));
        const n = layout();
        count.textContent = `${n} ${n === 1 ? "work" : "works"}`;
      })
    );
  }

  /* ---------- PROJECT DETAIL ---------- */

  function renderWork(main) {
    const id = new URLSearchParams(location.search).get("id");
    const index = WORKS.findIndex((w) => w.id === id);
    if (index < 0) return renderNotFound(main);

    const w = WORKS[index];
    const hero = toImage(w.hero) || toImage(w.cover);
    setPageMeta(`${w.title} — ${SITE.name}`, w.summary || list(w.concept)[0], workUrl(w));

    const process = list(w.process).length
      ? `<ol class="process">${list(w.process)
          .map(
            (s, i) => `<li class="process__step">
              <span class="process__num">${pad(i + 1)}</span>
              <div class="process__body">
                ${s.title ? `<h3 class="process__title">${esc(s.title)}</h3>` : ""}
                ${prose(s.text)}
                ${figure(s.image, "process__figure")}
              </div>
            </li>`
          )
          .join("")}</ol>`
      : "";

    const gallery = list(w.gallery).length
      ? `<div class="gallery">${list(w.gallery).map((g) => figure(g, "gallery__item")).join("")}</div>`
      : "";

    const recognition = [
      ["Awards", w.awards],
      ["Exhibitions", w.exhibitions],
      ["Publications", w.publications],
    ]
      .filter(([, v]) => list(v).length)
      .map(([t, v]) => `<div class="records-group"><h3 class="label">${t}</h3>${records(v)}</div>`)
      .join("");

    const meta = [
      ["Year", w.year],
      ["Category", w.category],
      ["Role", w.role],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${esc(v)}</dd></div>`)
      .join("");

    const prev = WORKS[(index - 1 + WORKS.length) % WORKS.length];
    const next = WORKS[(index + 1) % WORKS.length];

    main.innerHTML = `
      <article class="work">
        <header class="work-head">
          <a class="back-link label" href="index.html">&larr; Works</a>
          <h1 class="work-title">${esc(w.title)}</h1>
        </header>
        ${
          hero
            ? `<figure class="work-hero">${img({ ...hero, alt: hero.alt || w.title }, { eager: true })}${
                hero.caption ? `<figcaption>${esc(hero.caption)}</figcaption>` : ""
              }</figure>`
            : ""
        }
        <dl class="work-meta">${meta}</dl>
        ${block("Concept", prose(w.concept, "lead"))}
        ${block("Overview", prose(w.overview))}
        ${block("Process", process)}
        ${block("Technology & Materials", specs(w.materials))}
        ${customSections(w.sections)}
        ${block("Gallery", gallery, "wide")}
        ${block("Awards & Exhibitions", recognition)}
        ${block("Credits", specs(w.credits))}
      </article>
      ${
        WORKS.length > 1
          ? `<nav class="pager" aria-label="More works">
              <a class="pager__link" href="${workUrl(prev)}"><span class="label">&larr; Previous</span><span class="pager__title">${esc(prev.title)}</span></a>
              <a class="pager__link pager__link--next" href="${workUrl(next)}"><span class="label">Next &rarr;</span><span class="pager__title">${esc(next.title)}</span></a>
            </nav>`
          : ""
      }`;
  }

  function renderNotFound(main) {
    setPageMeta(`Not found — ${SITE.name}`);
    setMeta("name", "robots", "noindex");
    main.innerHTML = `
      <header class="page-head">
        <h1 class="page-title">Not found</h1>
        <p class="page-head__note">The page you are looking for does not exist or has moved.</p>
        <a class="text-link" href="index.html">&larr; Back to works</a>
      </header>`;
  }

  /* ---------- ABOUT ---------- */

  function renderAbout(main) {
    const p = PROFILE;
    const portrait = toImage(p.portrait);
    const interests = list(p.researchInterests).length
      ? `<ul class="plain-list">${list(p.researchInterests).map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`
      : "";

    main.innerHTML = `
      <header class="page-head"><h1 class="page-title">About</h1></header>
      <section class="about-intro${portrait ? "" : " about-intro--text"}">
        ${portrait ? `<figure class="about-intro__portrait">${img(portrait, { eager: true })}</figure>` : ""}
        <dl class="profile">
          <div><dt class="label">Name</dt><dd>${esc(p.name || SITE.name)}</dd></div>
          <div><dt class="label">Field</dt><dd>${esc(p.field || SITE.field)}</dd></div>
        </dl>
      </section>
      ${block("Biography", prose(p.biography))}
      ${block("Education", records(p.education))}
      ${block("Awards", records(p.awards))}
      ${block("Exhibitions", records(p.exhibitions))}
      ${block("Research Interests", interests)}
      ${block("Publications", records(p.publications))}
      ${customSections(p.sections)}`;

    // 検索エンジン向けの人物情報
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: p.name || SITE.name,
      jobTitle: p.field || SITE.field,
      url: SITE.baseUrl,
      sameAs: list(SITE.contact && SITE.contact.items).map((c) => c.href).filter(isExternal),
    });
    document.head.appendChild(ld);
  }

  /* ---------- CONTACT ---------- */

  function renderContact(main) {
    const c = SITE.contact || {};
    const items = list(c.items)
      .map(
        (i) => `<li>
          <span class="label">${esc(i.label)}</span>
          ${
            i.href
              ? `<a class="contact-list__value" href="${esc(i.href)}"${linkAttrs(i.href)}>${esc(i.value)}</a>`
              : `<span class="contact-list__value">${esc(i.value)}</span>`
          }
        </li>`
      )
      .join("");

    main.innerHTML = `
      <header class="page-head"><h1 class="page-title">Contact</h1></header>
      ${block("Inquiries", `${prose(c.intro)}<ul class="contact-list">${items}</ul>`)}`;
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

  function setupLightbox(root) {
    const triggers = [...root.querySelectorAll("[data-zoom]")];
    if (!triggers.length || typeof HTMLDialogElement !== "function") return;

    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Image viewer");
    dlg.innerHTML = `
      <div class="lightbox__bar">
        <span class="lightbox__count label" aria-live="polite"></span>
        <button type="button" class="label" data-close>Close</button>
      </div>
      <figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>
      <div class="lightbox__nav"${triggers.length < 2 ? " hidden" : ""}>
        <button type="button" class="label" data-step="-1">&larr; Prev</button>
        <button type="button" class="label" data-step="1">Next &rarr;</button>
      </div>`;
    document.body.appendChild(dlg);

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

  renderChrome();
  const main = document.getElementById("main");
  const renderers = { works: renderWorks, work: renderWork, about: renderAbout, contact: renderContact };
  if (main) {
    if (renderers[page]) renderers[page](main);
    revealImages(main);
    markOrientation(main);
    setupLightbox(main);
  }
  setupTransitions();
})();
