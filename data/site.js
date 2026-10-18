/*
 * サイト全体の設定
 * ------------------------------------------------------------
 * サイト名・ナビゲーション・連絡先をここで管理します。
 * 文章は { en: "英語", ja: "日本語" } の形で書くと、EN / JP 切り替えに対応します。
 * （片方しか書かない場合や "..." だけの場合は、両方の言語で同じ文が表示されます）
 */
window.SITE = {
  name: "RIKI IMAMURA",
  nameJa: "今村吏希", // 英語名の横に小さく表示（どちらの言語でも表示）
  field: {
    en: "Fashion Design / Digital Fabrication",
    ja: "ファッションデザイン / デジタルファブリケーション",
  },

  // 検索エンジン・SNSシェア用の設定（日本語名と英語名の両方で見つけてもらうため、言語切り替えに関係なく固定）
  // 変更したら node tools/build.mjs を実行して、HTML・sitemap.xml に反映します
  seo: {
    siteName: "今村吏希 | Riki Imamura", // ブラウザのタブ・検索結果のタイトルに使う名前
    personName: "Riki Imamura", // 構造化データ（Person）の名前
    alternateNames: ["今村吏希", "RIKI IMAMURA"],
    knowsAbout: ["Fashion Design", "Digital Fabrication", "3D Printing", "Sustainable Fashion"],
    pages: {
      works: {
        title: "今村吏希 | Riki Imamura — Fashion Design / Digital Fabrication",
        description:
          "今村吏希（Riki Imamura）のポートフォリオ。3Dプリントによる衣服やプロダクトのデザインと、新しい製造方法を探究しています。Portfolio of Riki Imamura: Fashion Design, Digital Fabrication, 3D Printing and Sustainable Fashion.",
      },
      about: {
        title: "About — 今村吏希 | Riki Imamura",
        description:
          "今村吏希（Riki Imamura）のプロフィール。文化服装学院・放送大学在学。テクノロジーを活用したサステナブルなファッションに関心を持つ。Profile of Riki Imamura: Fashion Design, Digital Fabrication, 3D Printing and Sustainable Fashion.",
      },
      contact: {
        title: "Contact — 今村吏希 | Riki Imamura",
        description: "今村吏希（Riki Imamura）へのお問い合わせ。Contact Riki Imamura — Fashion Design and Digital Fabrication portfolio.",
      },
    },
  },

  // 公開URL（変更したら node tools/build.mjs を実行）
  baseUrl: "https://imamurariki.github.io/",

  // ヘッダーのナビゲーション（ページを増やすときはここに追加）
  nav: [
    { id: "works", label: { en: "PROJECTS", ja: "プロジェクト" }, href: "index.html" },
    { id: "about", label: { en: "About", ja: "プロフィール" }, href: "about.html" },
    { id: "contact", label: { en: "Contact", ja: "お問い合わせ" }, href: "contact.html" },
  ],

  contact: {
    intro: {
      en: "For inquiries, please contact me at the email address below.",
      ja: "お問い合わせは、以下のメールアドレスまでご連絡ください。",
    },
    // 連絡先。迷惑メール対策のため、メールアドレスは "()" 表記のまま・リンクなし（href なし）で表示します。
    // SNS などを追加する場合は { label, value, href } を追加します（href があるものはフッターにも表示。footer: false で非表示）。
    items: [{ label: { en: "Email", ja: "メール" }, value: "rk30.8se()icloud.com" }],
    note: {
      en: "Please replace “()” with “@” when sending an email.",
      ja: "送信時は「()」を「@」に置き換えてください。",
    },
  },
};
