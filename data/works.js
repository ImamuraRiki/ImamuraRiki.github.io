/*
 * 作品データ
 * ------------------------------------------------------------
 * ここに書いた作品が、トップページの一覧と詳細ページ（work.html?id=...）に
 * 自動で表示されます。並び順 ＝ 一覧の表示順です。
 *
 * ■ 作品を追加する手順
 *   1. images/works/<id>/ フォルダを作り、画像を入れる
 *   2. 下の作品ブロックを1つコピーして貼り付け、内容を書き換える
 *   3. id は半角英小文字とハイフンのみ（URLになります。公開後は変えない）
 *
 * ■ 項目（必須は id / title / year / category / cover）
 *   id          URL用ID
 *   title       作品名
 *   year        制作年
 *   category    カテゴリー（一覧と詳細に表示）
 *   tags        絞り込み用。site.js の filters の id（design / technology / research）
 *   summary     一行説明（検索結果・SNSシェア用）
 *   cover       一覧に表示する画像（縦長 4:5 推奨）
 *   coverRatio  一覧の画像比率を変えたいとき（例 "3 / 2"）。省略時 "4 / 5"
 *   hero        詳細ページのメインビジュアル（縦長・横長どちらも可）
 *   concept     コンセプト（段落の配列）
 *   overview    作品概要（段落の配列）
 *   process     制作プロセス [{ title, text, image }]
 *   materials   使用技術・素材 [{ label, value }]
 *   gallery     写真ギャラリー [{ src, alt, caption, size }]
 *                 size: 省略 = 自動（横長は全幅、縦長は2列）/ "full" = 全幅
 *   awards / exhibitions / publications   [{ year, title, detail, url }]
 *                 （空なら非表示。公表済みの情報のみ）
 *   credits     クレジット [{ label, value }]
 *   sections    自由セクション [{ label, text }]
 *   draft       true にすると非公開（一覧・詳細に出ません）
 *
 * 画像は { src, alt, caption } の形のほか、"images/..." のパス文字列だけでも書けます。
 * alt（画像の説明文）は、画面読み上げと検索のために入れておくのがおすすめです。
 * 写真を差し替えるときは .jpg / .webp を同じフォルダに置き、src のパスを書き換えます。
 *
 * ※ 以下の文章・年・画像はすべて仮のものです。
 */
window.WORKS = [
  {
    id: "leather-cell-vest",
    title: "LEATHER CELL VEST",
    year: "2025",
    category: "Fashion Design / 3D Printing",
    tags: ["design", "technology"],
    summary: "A vest built from a cellular structure, combining 3D-printed components and leather.",
    cover: { src: "images/works/leather-cell-vest/cover.svg", alt: "" },
    hero: { src: "images/works/leather-cell-vest/hero.svg", alt: "LEATHER CELL VEST, front view" },
    concept: [
      "A garment that behaves like tissue: many small cells, each simple, together producing a surface that can bend, breathe and hold its shape.",
    ],
    overview: [
      "LEATHER CELL VEST explores how a cellular structure can replace conventional seams and darts. The vest is assembled from repeated units, so its fit is shaped by the geometry of the cells rather than by cutting and sewing.",
      "Placeholder text — replace with a description of the work, its scale, and the context in which it was made.",
    ],
    process: [
      {
        title: "Cell design",
        text: "Developing the unit geometry and testing how cells connect, flex and distribute load across the body.",
        image: { src: "images/works/leather-cell-vest/process-01.svg", alt: "Cell geometry studies", caption: "Cell geometry studies" },
      },
      {
        title: "Printing and assembly",
        text: "Printing the components and joining them with leather into a single wearable surface.",
        image: { src: "images/works/leather-cell-vest/process-02.svg", alt: "Assembly of printed components", caption: "Assembly" },
      },
      {
        title: "Fitting",
        text: "Adjusting cell density and size on the body to refine the silhouette.",
      },
    ],
    materials: [
      { label: "Technique", value: "FDM 3D printing, hand assembly" },
      { label: "Material", value: "TPU, leather" },
      { label: "Software", value: "Rhinoceros, Grasshopper" },
    ],
    gallery: [
      { src: "images/works/leather-cell-vest/gallery-01.svg", alt: "Front view", caption: "Front" },
      { src: "images/works/leather-cell-vest/gallery-02.svg", alt: "Back view", caption: "Back" },
      { src: "images/works/leather-cell-vest/gallery-03.svg", alt: "Detail of the cellular structure", caption: "Detail" },
      { src: "images/works/leather-cell-vest/gallery-04.svg", alt: "Side view", caption: "Side" },
    ],
    awards: [],
    exhibitions: [],
    credits: [
      { label: "Design", value: "Riki Imamura" },
      // { label: "Photography", value: "Name" },
    ],
  },

  {
    id: "curve-cell",
    title: "CURVE CELL",
    year: "2025",
    category: "Structure / 3D Printing",
    tags: ["design", "technology"],
    summary: "A curved cellular structure that lets flat-printed surfaces take on three-dimensional form.",
    cover: { src: "images/works/curve-cell/cover.svg", alt: "" },
    hero: { src: "images/works/curve-cell/hero.svg", alt: "CURVE CELL structure" },
    concept: [
      "Curves instead of corners: a cell shape designed so that a flat print can follow the curvature of the body.",
    ],
    overview: [
      "Placeholder text — describe the structure, how it deforms, and how it is used in garments.",
    ],
    process: [
      { title: "Geometry", text: "Designing curved cell outlines and comparing their flexibility." },
      { title: "Prototyping", text: "Printing test samples and evaluating drape and recovery." },
    ],
    materials: [
      { label: "Technique", value: "3D printing on textile" },
      { label: "Material", value: "TPU, polyester mesh" },
    ],
    gallery: [
      { src: "images/works/curve-cell/gallery-01.svg", alt: "Structure sample", caption: "Sample" },
      { src: "images/works/curve-cell/gallery-02.svg", alt: "Worn view" },
      { src: "images/works/curve-cell/gallery-03.svg", alt: "Detail" },
    ],
  },

  {
    id: "zero-cut-pattern",
    title: "ZERO CUT PATTERN",
    year: "2024",
    category: "Pattern Making",
    tags: ["design"],
    summary: "A pattern-making method that forms garments without cutting the material.",
    cover: { src: "images/works/zero-cut-pattern/cover.svg", alt: "" },
    hero: { src: "images/works/zero-cut-pattern/hero.svg", alt: "ZERO CUT PATTERN layout" },
    concept: [
      "What if a garment could be made without a single cut?",
      "Placeholder text — explain the idea behind the pattern and what it changes about making clothes.",
    ],
    overview: [
      "Placeholder text — describe the pattern system, the garments produced with it, and the results.",
      "Longer descriptions can be split into several paragraphs; the layout adapts to any length.",
      "A third paragraph to show how longer text flows in the page.",
    ],
    process: [
      {
        title: "Pattern study",
        text: "Placeholder text for the first step of the process.",
        image: { src: "images/works/zero-cut-pattern/process-01.svg", alt: "Pattern study", caption: "Pattern study" },
      },
    ],
    materials: [
      { label: "Technique", value: "Pattern making, draping" },
      { label: "Material", value: "Wool" },
    ],
    gallery: [
      { src: "images/works/zero-cut-pattern/gallery-01.svg", alt: "Look 1", caption: "Look 1" },
      { src: "images/works/zero-cut-pattern/gallery-02.svg", alt: "Flat pattern", caption: "Flat pattern" },
      { src: "images/works/zero-cut-pattern/gallery-03.svg", alt: "Look 2", caption: "Look 2" },
      { src: "images/works/zero-cut-pattern/gallery-04.svg", alt: "Look 3", caption: "Look 3" },
      { src: "images/works/zero-cut-pattern/gallery-05.svg", alt: "Overview of all looks", caption: "All looks" },
    ],
  },

  {
    id: "digital-fabrication-research",
    title: "DIGITAL FABRICATION RESEARCH",
    year: "2024–",
    category: "Research",
    tags: ["research", "technology"],
    summary: "Ongoing research into digital fabrication techniques for clothing.",
    cover: { src: "images/works/digital-fabrication-research/cover.svg", alt: "" },
    hero: { src: "images/works/digital-fabrication-research/hero.svg", alt: "Research samples" },
    concept: [
      "Research into how digital fabrication can change the way garments are designed, produced and repaired.",
    ],
    overview: [
      "Placeholder text — summarise the research questions, methods and findings.",
      "This entry is intended to grow over time with experiments, papers and software.",
    ],
    process: [
      { title: "Material tests", text: "Placeholder text." },
      { title: "Fabrication parameters", text: "Placeholder text." },
      { title: "Evaluation", text: "Placeholder text." },
    ],
    materials: [
      { label: "Fields", value: "Digital fabrication, material research" },
      { label: "Tools", value: "3D printer, laser cutter" },
    ],
    gallery: [
      { src: "images/works/digital-fabrication-research/gallery-01.svg", alt: "Test samples", caption: "Test samples" },
      { src: "images/works/digital-fabrication-research/gallery-02.svg", alt: "Measurement setup", caption: "Measurement" },
    ],
    publications: [],
    sections: [
      // { label: "Notes", text: ["..."] },
    ],
  },
];
