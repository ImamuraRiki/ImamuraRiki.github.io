/*
 * サイト全体の設定
 * ------------------------------------------------------------
 * サイト名・ナビゲーション・連絡先をここで管理します。
 * 文章は { en: "英語", ja: "日本語" } の形で書くと、EN / JP 切り替えに対応します。
 * （片方しか書かない場合や "..." だけの場合は、両方の言語で同じ文が表示されます）
 */
window.SITE = {
  name: "RIKI IMAMURA",
  field: {
    en: "Fashion Design / Digital Fabrication",
    ja: "ファッションデザイン / デジタルファブリケーション",
  },

  // 検索結果・SNSシェア時の説明文
  description: {
    en: "Portfolio of Riki Imamura, working across fashion design and digital fabrication: 3D-printed garments, structural development, and fabrication research.",
    ja: "ファッションデザインとデジタルファブリケーションを軸に活動する RIKI IMAMURA のポートフォリオ。3Dプリントによる衣服、独自構造の開発、デジタルファブリケーション研究。",
  },

  // 公開URL（変更したら tools/make-sitemap.mjs を実行）
  baseUrl: "https://imamurariki.github.io/",

  // ヘッダーのナビゲーション（ページを増やすときはここに追加）
  nav: [
    { id: "works", label: { en: "Works", ja: "作品" }, href: "index.html" },
    { id: "about", label: { en: "About", ja: "プロフィール" }, href: "about.html" },
    { id: "contact", label: { en: "Contact", ja: "お問い合わせ" }, href: "contact.html" },
  ],

  contact: {
    intro: {
      en: "For collaborations, research, commissions, and exhibition inquiries, please get in touch.",
      ja: "コラボレーション、研究、制作のご依頼、展示に関するお問い合わせは、こちらからご連絡ください。",
    },
    // 連絡先（仮の情報です）。footer: false にするとフッターには表示しません。
    items: [
      { label: { en: "Email", ja: "メール" }, value: "hello@example.com", href: "mailto:hello@example.com" },
      { label: "Instagram", value: "@your_instagram", href: "https://www.instagram.com/your_instagram/" },
      // { label: "LinkedIn", value: "Riki Imamura", href: "https://www.linkedin.com/in/xxxx/" },
      // { label: "GitHub", value: "your-username", href: "https://github.com/your-username", footer: false },
    ],
  },
};
