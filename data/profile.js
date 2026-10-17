/*
 * ABOUT ページの内容
 * ------------------------------------------------------------
 * 経歴・受賞歴はここに追加します。
 * 公開前の受賞結果や、確認できていない経歴は載せないでください。
 * 項目が空（[]）のセクションは自動で非表示になります。
 * 文章は { en: "英語", ja: "日本語" } の形で書くと EN / JP 切り替えに対応します。
 */
window.PROFILE = {
  name: "RIKI IMAMURA",
  field: {
    en: "Fashion Design / Digital Fabrication",
    ja: "ファッションデザイン / デジタルファブリケーション",
  },

  // 写真が不要なら portrait: null
  portrait: { src: "images/about/portrait.svg", alt: { en: "Portrait of Riki Imamura", ja: "RIKI IMAMURA のポートレート" } },

  // 段落ごとに "..." を並べます（仮テキスト）
  biography: {
    en: [
      "Riki Imamura is a student working across fashion design and digital fabrication.",
      "The practice centres on garments made with 3D printing, the development of original structural systems for clothing, and research into digital fabrication techniques — treating structure, material and pattern as a single design problem.",
    ],
    ja: [
      "ファッションデザインとデジタルファブリケーションを軸に活動する学生。",
      "3Dプリントによる衣服制作、衣服のための独自構造の開発、デジタルファブリケーション技術の研究に取り組み、構造・素材・パターンをひとつのデザインとして捉え直している。",
    ],
  },

  // { year, title, detail } の形で追加（仮の項目です。確定した情報に差し替えてください）
  education: [
    {
      year: "20XX–",
      title: { en: "University / School name", ja: "大学・学校名" },
      detail: { en: "Department, Program — to be updated", ja: "学部・学科（更新予定）" },
    },
  ],

  // 受賞歴：結果が公表されたものだけを追加します
  // 例: { year: "2026", title: { en: "Award name", ja: "賞の名称" }, detail: { en: "Grand Prix — Work title", ja: "グランプリ — 作品名" }, url: "https://..." },
  awards: [],

  // 展示歴（任意）
  exhibitions: [],

  researchInterests: {
    en: [
      "3D printing for garments",
      "Original structural systems for clothing",
      "Digital fabrication techniques",
      "Fashion design and material experimentation",
    ],
    ja: [
      "3Dプリントによる衣服制作",
      "衣服のための独自構造",
      "デジタルファブリケーション技術",
      "ファッションデザインと素材の実験",
    ],
  },

  // 論文・発表（任意）
  // 例: { year: "2027", title: "Paper title", detail: { en: "Conference / Journal", ja: "学会・論文誌名" }, url: "https://..." },
  publications: [],

  // 自由に追加できるセクション（ソフトウェア、ブランド活動など）
  // 例: { label: { en: "Software", ja: "ソフトウェア" }, items: [{ year: "2026", title: "Tool name", detail: "...", url: "https://..." }] },
  //     { label: { en: "Statement", ja: "ステートメント" }, text: { en: ["..."], ja: ["..."] } },
  sections: [],
};
