/*
 * ABOUT ページの内容
 * ------------------------------------------------------------
 * 経歴・受賞歴はここに追加します。
 * 公開前の受賞結果や、確認できていない経歴は載せないでください。
 * 項目が空（[]）のセクションは自動で非表示になります。
 */
window.PROFILE = {
  name: "RIKI IMAMURA",
  field: "Fashion Design / Digital Fabrication",

  // 写真が不要なら portrait: null
  portrait: { src: "images/about/portrait.svg", alt: "Portrait of Riki Imamura" },

  // 段落ごとに "..." を並べます（仮テキスト）
  biography: [
    "Riki Imamura is a student working across fashion design and digital fabrication.",
    "The practice centres on garments made with 3D printing, the development of original structural systems for clothing, and research into digital fabrication techniques — treating structure, material and pattern as a single design problem.",
  ],

  // { year, title, detail } の形で追加（仮の項目です。確定した情報に差し替えてください）
  education: [
    { year: "20XX–", title: "University / School name", detail: "Department, Program — to be updated" },
  ],

  // 受賞歴：結果が公表されたものだけを追加します
  // 例: { year: "2026", title: "Award name", detail: "Grand Prix — Work title", url: "https://..." },
  awards: [],

  // 展示歴（任意）
  exhibitions: [],

  researchInterests: [
    "3D printing for garments",
    "Original structural systems for clothing",
    "Digital fabrication techniques",
    "Fashion design and material experimentation",
  ],

  // 論文・発表（任意）
  // 例: { year: "2027", title: "Paper title", detail: "Conference / Journal", url: "https://..." },
  publications: [],

  // 自由に追加できるセクション（ソフトウェア、ブランド活動など）
  // 例: { label: "Software", items: [{ year: "2026", title: "Tool name", detail: "Description", url: "https://..." }] },
  //     { label: "Statement", text: ["Paragraph 1", "Paragraph 2"] },
  sections: [],
};
