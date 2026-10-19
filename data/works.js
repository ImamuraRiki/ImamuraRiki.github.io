/*
 * 作品データ
 * ------------------------------------------------------------
 * ここに書いた作品が、トップページの一覧と詳細ページ（work.html?id=...）に
 * 自動で表示されます。並び順 ＝ 一覧の表示順です。
 * 詳細ページはすべて同じ形式で、次の順に表示されます（データがない項目は表示されません）。
 *   作品名 → 制作年 → メイン画像 → 概要 → クレジット → 受賞・選考歴 → リンク → その他の作品画像
 *
 * ■ 作品を追加する手順
 *   1. photo/<フォルダ>/ に写真を 01.jpg, 02.jpg ... の名前で入れる（01 がメイン画像・一覧のサムネイル）
 *   2. 下の作品ブロックを1つコピーして貼り付け、内容を書き換える
 *   3. id は半角英小文字・数字・ハイフンのみ（URLになります。公開後は変えない）
 *   4. node tools/build.mjs を実行（写真を images/works/<id>/photos/ にコピーし、一覧を data/photos.js に書き出します）
 *
 * ■ 日本語・英語
 *   文章は { en: "英語", ja: "日本語" } の形で書きます。段落が複数ある項目は
 *   { en: ["段落1", "段落2"], ja: ["段落1", "段落2"] } です。
 *   作品名は翻訳しません。"LEATHER CELL VEST" のように英語表記の文字列で書きます。
 *
 * ■ 項目（必須は id / title / year / photoDir）
 *   id          URL用ID
 *   title       作品名。固有名詞なので翻訳せず、英語表記の文字列で書く
 *               （日本語表示でも同じ表記。{ en, ja } で書いても英語が使われます）
 *   year        制作年（作品名の下に表示）
 *   category    カテゴリー（現在は画面に表示していません。将来の再表示用に残しています）
 *   tags        将来のカテゴリー絞り込み用（design / technology / research）。現在は表示に使っていません
 *   summary     一行説明（検索結果・SNSシェア用。画面には表示されません）
 *   photoDir    写真の元フォルダ。01 がメイン画像と一覧のサムネイル、02 以降がページ下部の作品画像
 *               （ファイル名の順。jpg / png / webp）。元フォルダのファイルは変更されません
 *   coverPosition 一覧の正方形サムネイルで切り抜く位置（CSS の object-position。例 "50% 30%" で上寄り）。省略時 "50% 50%"
 *   overview    概要
 *   credits     クレジット [{ label: 役割, value: 名前 }]（複数可。人名は英語表記の文字列）
 *   awards      受賞・選考歴。profile.js の awards の id を参照します（ABOUT と同じ表記・状況で表示）
 *                 [{ id: "japan-leather-award-2026" }]
 *                 関連作品の実績のときは { id: "...", relatedWork: "作品名" }
 *   links       リンク（この項目を書いた作品だけ LINKS を表示）
 *                 data      3Dデータ [{ title, url, file, description, license }]
 *                             url = 外部の公開ページ / file = このサイト内のファイル（例 "files/leather-cell-vest/vest.stl"）
 *                             空 [] のときは「公開準備中 / Coming soon」と表示
 *                 articles  掲載記事・外部リンク [{ title, source, url }]
 *                             空 [] のとき、または url がないときは「追加予定 / To be added」と表示
 *   draft       true にすると非公開（一覧・詳細に出ません）
 */
window.WORKS = [
  {
    id: "leather-cell-vest",
    title: "LEATHER CELL VEST",
    year: "2026",
    category: { en: "Fashion Design / 3D Printing", ja: "ファッションデザイン / 3Dプリント" },
    tags: ["design", "technology"],
    summary: {
      en: "LEATHER CELL VEST by Riki Imamura: a modular vest assembled from “LEATHER CELL” units made of 3D-printed components and 0.3 mm-thick sheepskin leather.",
      ja: "今村吏希による LEATHER CELL VEST。3Dプリントパーツと0.3mm厚のシープレザーによるユニット「LEATHER CELL」を組み合わせたモジュール式のベスト。",
    },
    photoDir: "photo/L",
    overview: {
      en: [
        "Conventional leather garments are made by cutting materials according to patterns and assembling them through sewing, making localized repairs and significant changes to the silhouette difficult.",
        "LEATHER CELL VEST proposes an alternative approach to garment construction through a modular system.",
        "Individual units called “LEATHER CELL,” made from 3D-printed components and 0.3 mm-thick sheepskin leather, are assembled to follow the contours of the body. This structure allows individual units to be replaced or repaired, while also enabling the silhouette to be reconfigured.",
      ],
      ja: [
        "従来のレザー衣服は、型紙に沿って素材を裁断し、縫製によって仕立てられるため、部分的な修理や大幅なシルエットの変更が難しい。",
        "LEATHER CELL VESTは、こうした課題に対してモジュール構造による新たな衣服のあり方を提案する作品である。",
        "3Dプリントパーツと0.3mm厚のシープレザーから構成される独自のユニット「LEATHER CELL」を、身体の形状に沿って組み合わせることで、個々のユニットの交換・修理や、組み替えによるシルエットの変更を可能にしている。",
      ],
    },
    credits: [{ label: { en: "Design", ja: "デザイン" }, value: "Riki Imamura" }],
    awards: [{ id: "japan-leather-award-2026" }],
    links: {
      data: [],
      articles: [],
    },
  },

  {
    id: "curve-cell",
    title: "CURVE CELL BAG",
    year: "2026",
    category: { en: "Structure / 3D Printing", ja: "構造 / 3Dプリント" },
    tags: ["design", "technology"],
    summary: {
      en: "CURVE CELL BAG by Riki Imamura: a modular bag of “CURVE CELL” units made with 3D-printed components and YKK’s PLANCER® snap fasteners, joined without adhesives.",
      ja: "今村吏希による CURVE CELL BAG。3DプリントパーツとYKKのスナップボタン「PLANCER®」によるユニット「CURVE CELL」を、接着剤を使わずに組み合わせたモジュール式のバッグ。",
    },
    photoDir: "photo/C",
    overview: {
      en: [
        "CURVE CELL BAG is a modular bag constructed from individual “CURVE CELL” units made with 3D-printed components and YKK’s PLANCER® snap fasteners.",
        "Inspired by the interlacing structure of plain-woven fabric, the units are connected without the use of adhesives.",
        "By rearranging the CURVE CELL units, the bag can be adapted in size and color to suit different uses and preferences. Its modular construction also allows individual units to be replaced or repaired.",
      ],
      ja: [
        "3DプリントパーツとYKKのスナップボタン「PLANCER®」から構成される独自のユニット「CURVE CELL」を組み合わせた、モジュール式のバッグ。",
        "布地の平織りに着想を得た独特の構造により、接着剤を一切使用せずに各ユニットを接合している。",
        "CURVE CELLを組み替えることで、用途や好みに応じたサイズやカラーへの変更が可能であり、個々のユニットの交換・修理にも対応している。",
      ],
    },
    credits: [{ label: { en: "Design", ja: "デザイン" }, value: "Riki Imamura" }],
    awards: [{ id: "ykk-fastening-awards-26" }],
    // links: { data: [], articles: [] },  // 追加すると LINKS が表示されます
  },

  {
    id: "3d-printed-textiles",
    title: "3D PRINTED TEXTILES",
    year: "2026",
    category: { en: "Textile / 3D Printing", ja: "テキスタイル / 3Dプリント" },
    tags: ["research", "technology"],
    summary: {
      en: "3D PRINTED TEXTILES by Riki Imamura: research into garment production by directly 3D printing textiles in the shapes of clothing patterns, with software that converts DXF patterns into STL files.",
      ja: "今村吏希による 3D PRINTED TEXTILES。3Dプリンタで衣服の型紙形状を直接造形する製造方法と、DXFの型紙データからSTLデータを生成するソフトウェアの開発。",
    },
    photoDir: "photo/3",
    overview: {
      en: [
        "This project explores a new approach to garment production by directly 3D printing textile structures in the shapes of clothing patterns.",
        "By eliminating the conventional fabric-cutting stage, the process aims to reduce the material offcuts generated during garment production. Controlling the structure and thickness of the printed textiles also makes it possible to introduce properties such as flexibility and stretchability according to their intended applications.",
        "I am also developing software that reads garment pattern data in DXF format and generates STL files for 3D printing based on parameters such as structural design and thickness.",
        "By integrating pattern design with textile fabrication, this approach aims to enable a more efficient and adaptable garment production process.",
      ],
      ja: [
        "3Dプリンタを用いて衣服の型紙形状を直接造形する、新たな衣服製造方法の探究。",
        "従来の布地の裁断工程を省くことで、裁断時に発生する端材の削減を目指している。また、テキスタイルの構造や厚みを制御することにより、柔軟性や伸縮性など、用途に応じた特性を持たせることができる。",
        "さらに、衣服の型紙のDXFデータを読み込み、構造や厚みなどのパラメータを設定することで、3Dプリントに使用するSTLデータを生成するソフトウェアを開発している。",
        "これにより、パターン設計からテキスタイルの造形までを一体化し、より効率的で柔軟な衣服制作の実現を目指している。",
      ],
    },
    credits: [
      { label: { en: "Design & Research", ja: "デザイン・リサーチ" }, value: "Riki Imamura" },
      { label: { en: "Software Development", ja: "ソフトウェア開発" }, value: "Riki Imamura" },
    ],
    // 関連作品（ZERO CUT PATTERN / EXTENDED SKIN）での実績。テキスタイル研究そのものの受賞ではない
    awards: [
      { id: "nippori-2026", relatedWork: "ZERO CUT PATTERN" },
      { id: "nfdt-2027", relatedWork: "EXTENDED SKIN" },
    ],
    // links: { data: [], articles: [] },  // 追加すると LINKS が表示されます
  },
];
