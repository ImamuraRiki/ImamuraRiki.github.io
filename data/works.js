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
 * ■ 日本語・英語
 *   文章は { en: "英語", ja: "日本語" } の形で書きます。段落が複数ある項目は
 *   { en: ["段落1", "段落2"], ja: ["段落1", "段落2"] } です。
 *   作品名は翻訳しません。"LEATHER CELL VEST" のように英語表記の文字列で書きます。
 *
 * ■ 項目（必須は id / title / year / category / cover）
 *   id          URL用ID
 *   title       作品名。固有名詞なので翻訳せず、英語表記の文字列で書く
 *               （日本語表示でも同じ表記。{ en, ja } で書いても英語が使われます）
 *   year        制作年
 *   category    カテゴリー（現在は画面に表示していません。将来の再表示用に残しています）
 *   tags        将来のカテゴリー絞り込み用（design / technology / research）。現在は表示に使っていません
 *   summary     一行説明（検索結果・SNSシェア用）
 *   cover       一覧に表示する画像（正方形 1:1 で表示。中央を基準に切り抜き）
 *   coverPosition 切り抜く位置を調整したいとき（CSS の object-position。例 "50% 30%" で上寄り）。省略時 "50% 50%"
 *   coverRatio  一覧の画像比率を変えたいとき（例 "4 / 5"）。省略時 "1 / 1"
 *   hero        詳細ページのメインビジュアル（縦長・横長どちらも可）
 *   concept     コンセプト
 *   overview    作品概要
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
 * ※ 以下の文章・年・素材・画像はすべて仮のものです。
 */
window.WORKS = [
  {
    id: "leather-cell-vest",
    title: "LEATHER CELL VEST",
    year: "2026",
    category: { en: "Fashion Design / 3D Printing", ja: "ファッションデザイン / 3Dプリント" },
    tags: ["design", "technology"],
    summary: {
      en: "A vest built from a cellular structure, combining 3D-printed components and leather.",
      ja: "3Dプリントのパーツとレザーを組み合わせた、セル構造によるベスト。",
    },
    cover: { src: "images/works/leather-cell-vest/cover.jpg", alt: "", width: 1023, height: 1023 },
    coverPosition: "50% 50%",
    hero: {
      src: "images/works/leather-cell-vest/hero.svg",
      alt: { en: "LEATHER CELL VEST, front view", ja: "LEATHER CELL VEST 正面" },
    },
    concept: {
      en: ["A garment that behaves like tissue: many small cells, each simple, together producing a surface that can bend, breathe and hold its shape."],
      ja: ["生体組織のようにふるまう衣服。ひとつひとつは単純な小さなセルが集まり、しなやかに曲がり、通気し、かたちを保つ面をつくる。"],
    },
    overview: {
      en: [
        "LEATHER CELL VEST explores how a cellular structure can replace conventional seams and darts. The vest is assembled from repeated units, so its fit is shaped by the geometry of the cells rather than by cutting and sewing.",
        "Placeholder text — replace with a description of the work, its scale, and the context in which it was made.",
      ],
      ja: [
        "LEATHER CELL VEST は、セル構造によって従来の縫い目やダーツを置き換える試みです。繰り返しのユニットで組み立てられたベストは、裁断と縫製ではなく、セルの形状によって身体へのフィットが決まります。",
        "仮のテキストです。作品の説明、規模、制作の背景などに差し替えてください。",
      ],
    },
    process: [
      {
        title: { en: "Cell design", ja: "セルの設計" },
        text: {
          en: "Developing the unit geometry and testing how cells connect, flex and distribute load across the body.",
          ja: "ユニットの形状を設計し、セル同士の接続、しなり、身体にかかる力の分散を検証する。",
        },
        image: {
          src: "images/works/leather-cell-vest/process-01.svg",
          alt: { en: "Cell geometry studies", ja: "セル形状のスタディ" },
          caption: { en: "Cell geometry studies", ja: "セル形状のスタディ" },
        },
      },
      {
        title: { en: "Printing and assembly", ja: "出力と組み立て" },
        text: {
          en: "Printing the components and joining them with leather into a single wearable surface.",
          ja: "パーツを出力し、レザーと接合して一枚の着用可能な面に仕上げる。",
        },
        image: {
          src: "images/works/leather-cell-vest/process-02.svg",
          alt: { en: "Assembly of printed components", ja: "出力パーツの組み立て" },
          caption: { en: "Assembly", ja: "組み立て" },
        },
      },
      {
        title: { en: "Fitting", ja: "フィッティング" },
        text: {
          en: "Adjusting cell density and size on the body to refine the silhouette.",
          ja: "身体に合わせてセルの密度と大きさを調整し、シルエットを整える。",
        },
      },
    ],
    materials: [
      { label: { en: "Technique", ja: "技術" }, value: { en: "FDM 3D printing, hand assembly", ja: "FDM方式3Dプリント、手作業による組み立て" } },
      { label: { en: "Material", ja: "素材" }, value: { en: "TPU, leather", ja: "TPU、レザー" } },
      { label: { en: "Software", ja: "ソフトウェア" }, value: "Rhinoceros, Grasshopper" },
    ],
    gallery: [
      { src: "images/works/leather-cell-vest/gallery-01.svg", alt: { en: "Front view", ja: "正面" }, caption: { en: "Front", ja: "正面" } },
      { src: "images/works/leather-cell-vest/gallery-02.svg", alt: { en: "Back view", ja: "背面" }, caption: { en: "Back", ja: "背面" } },
      { src: "images/works/leather-cell-vest/gallery-03.svg", alt: { en: "Detail of the cellular structure", ja: "セル構造のディテール" }, caption: { en: "Detail", ja: "ディテール" } },
      { src: "images/works/leather-cell-vest/gallery-04.svg", alt: { en: "Side view", ja: "側面" }, caption: { en: "Side", ja: "側面" } },
    ],
    awards: [],
    exhibitions: [],
    credits: [
      { label: { en: "Design", ja: "デザイン" }, value: "Riki Imamura" },
      // { label: { en: "Photography", ja: "写真" }, value: "Name" },
    ],
  },

  {
    id: "curve-cell",
    title: "CURVE CELL BAG",
    year: "2026",
    category: { en: "Structure / 3D Printing", ja: "構造 / 3Dプリント" },
    tags: ["design", "technology"],
    summary: {
      en: "A curved cellular structure that lets flat-printed surfaces take on three-dimensional form.",
      ja: "平面に出力した面が立体的なかたちをとる、曲線のセル構造。",
    },
    cover: { src: "images/works/curve-cell/cover.jpg", alt: "", width: 1086, height: 1086 },
    coverPosition: "50% 50%",
    hero: { src: "images/works/curve-cell/hero.svg", alt: { en: "CURVE CELL BAG structure", ja: "CURVE CELL BAG の構造" } },
    concept: {
      en: ["Curves instead of corners: a cell shape designed so that a flat print can follow the curvature of the body."],
      ja: ["角ではなく曲線で。平面の出力物が身体の曲面に沿うように設計したセル形状。"],
    },
    overview: {
      en: ["Placeholder text — describe the structure, how it deforms, and how it is used in garments."],
      ja: ["仮のテキストです。構造の特徴、変形のしかた、衣服での使い方などを記述してください。"],
    },
    process: [
      {
        title: { en: "Geometry", ja: "形状設計" },
        text: { en: "Designing curved cell outlines and comparing their flexibility.", ja: "曲線によるセルの輪郭を設計し、柔軟性を比較する。" },
      },
      {
        title: { en: "Prototyping", ja: "試作" },
        text: { en: "Printing test samples and evaluating drape and recovery.", ja: "テストサンプルを出力し、ドレープ性と復元性を評価する。" },
      },
    ],
    materials: [
      { label: { en: "Technique", ja: "技術" }, value: { en: "3D printing on textile", ja: "布への3Dプリント" } },
      { label: { en: "Material", ja: "素材" }, value: { en: "TPU, polyester mesh", ja: "TPU、ポリエステルメッシュ" } },
    ],
    gallery: [
      { src: "images/works/curve-cell/gallery-01.svg", alt: { en: "Structure sample", ja: "構造サンプル" }, caption: { en: "Sample", ja: "サンプル" } },
      { src: "images/works/curve-cell/gallery-02.svg", alt: { en: "Worn view", ja: "着用イメージ" } },
      { src: "images/works/curve-cell/gallery-03.svg", alt: { en: "Detail", ja: "ディテール" } },
    ],
  },

  {
    id: "3d-printed-textiles",
    title: "3D PRINTED TEXTILES",
    year: "2026",
    category: { en: "Textile / 3D Printing", ja: "テキスタイル / 3Dプリント" },
    tags: ["design", "technology"],
    summary: {
      en: "Textiles made by 3D printing, exploring new surfaces and structures for clothing.",
      ja: "3Dプリントによるテキスタイル。衣服のための新しい表面と構造を探る。",
    },
    cover: { src: "images/works/3d-printed-textiles/cover.jpg", alt: "", width: 1086, height: 1086 },
    coverPosition: "50% 50%",
    hero: { src: "images/works/3d-printed-textiles/hero.svg", alt: { en: "3D PRINTED TEXTILES samples", ja: "3D PRINTED TEXTILES のサンプル" } },
    concept: {
      en: ["Placeholder text — describe the idea behind the textiles."],
      ja: ["仮のテキストです。テキスタイルのコンセプトを記述してください。"],
    },
    overview: {
      en: ["Placeholder text — describe the textiles, how they are made, and how they are used in garments."],
      ja: ["仮のテキストです。テキスタイルの特徴、制作方法、衣服での使い方などを記述してください。"],
    },
    process: [
      { title: { en: "Material tests", ja: "素材の検証" }, text: { en: "Placeholder text.", ja: "仮のテキストです。" } },
      { title: { en: "Printing", ja: "出力" }, text: { en: "Placeholder text.", ja: "仮のテキストです。" } },
    ],
    materials: [
      { label: { en: "Technique", ja: "技術" }, value: { en: "3D printing", ja: "3Dプリント" } },
      { label: { en: "Material", ja: "素材" }, value: { en: "Placeholder", ja: "仮" } },
    ],
    gallery: [
      { src: "images/works/3d-printed-textiles/gallery-01.svg", alt: { en: "Textile sample", ja: "テキスタイルのサンプル" }, caption: { en: "Sample", ja: "サンプル" } },
      { src: "images/works/3d-printed-textiles/gallery-02.svg", alt: { en: "Detail", ja: "ディテール" }, caption: { en: "Detail", ja: "ディテール" } },
    ],
  },
];
