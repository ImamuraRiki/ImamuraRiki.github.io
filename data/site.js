/*
 * サイト全体の設定
 * ------------------------------------------------------------
 * サイト名・紹介文・ナビゲーション・連絡先をここで管理します。
 * 文字列は "..." の中だけを書き換えてください。
 */
window.SITE = {
  name: "RIKI IMAMURA",
  field: "Fashion Design / Digital Fabrication",

  // トップページ冒頭の紹介文
  intro:
    "Fashion design and digital fabrication — 3D-printed garments, original structural systems, and research into new ways of making clothes.",

  // 検索結果・SNSシェア時の説明文
  description:
    "Portfolio of Riki Imamura, working across fashion design and digital fabrication: 3D-printed garments, structural development, and fabrication research.",

  // 公開URL（GitHub Pages のURLが決まったら書き換え、tools/make-sitemap.mjs を実行）
  baseUrl: "https://your-username.github.io/portfolio/",

  // ヘッダーのナビゲーション（ページを増やすときはここに追加）
  nav: [
    { id: "works", label: "Works", href: "index.html" },
    { id: "about", label: "About", href: "about.html" },
    { id: "contact", label: "Contact", href: "contact.html" },
  ],

  // トップページの絞り込み。works.js の tags と id を対応させます。
  // 該当する作品がないフィルターは自動で非表示になります。
  filters: [
    { id: "all", label: "All" },
    { id: "design", label: "Design" },
    { id: "technology", label: "Technology" },
    { id: "research", label: "Research" },
  ],

  contact: {
    intro:
      "For collaborations, research, commissions, and exhibition inquiries, please get in touch.",
    // 連絡先（仮の情報です）。footer: false にするとフッターには表示しません。
    items: [
      { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
      { label: "Instagram", value: "@your_instagram", href: "https://www.instagram.com/your_instagram/" },
      // { label: "LinkedIn", value: "Riki Imamura", href: "https://www.linkedin.com/in/xxxx/" },
      // { label: "GitHub", value: "your-username", href: "https://github.com/your-username", footer: false },
    ],
  },
};
