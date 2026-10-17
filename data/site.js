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

  // 検索結果・SNSシェア時の説明文
  description: {
    en: "Portfolio of Riki Imamura, working across fashion design and digital fabrication: 3D-printed garments, structural development, and fabrication research.",
    ja: "ファッションデザインとデジタルファブリケーションを軸に活動する RIKI IMAMURA のポートフォリオ。3Dプリントによる衣服、独自構造の開発、デジタルファブリケーション研究。",
  },

  // 公開URL（変更したら tools/make-sitemap.mjs を実行）
  baseUrl: "https://imamurariki.github.io/",

  // ヘッダーのナビゲーション（ページを増やすときはここに追加）
  nav: [
    { id: "works", label: { en: "PROJECT", ja: "プロジェクト" }, href: "index.html" },
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
