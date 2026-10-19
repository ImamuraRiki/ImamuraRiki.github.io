# RIKI IMAMURA — Portfolio

ファッションデザインとデジタルファブリケーションを軸とした個人ポートフォリオサイトです。
HTML / CSS / JavaScript だけで作られた静的サイトで、GitHub Pages で公開しています。

公開URL：https://imamurariki.github.io/

## フォルダ構成

```
portfolio/
├── index.html          WORKS（トップ・PROJECTS 一覧）
├── work.html           作品詳細（work.html?id=作品ID で各作品を表示）
├── about.html          ABOUT
├── contact.html        CONTACT
├── 404.html            ページが見つからないとき
├── data/               ★ 内容の編集はここだけ
│   ├── site.js         サイト名・ナビ・連絡先・公開URL
│   ├── i18n.js         見出しやボタンなど UI の日本語・英語
│   ├── profile.js      プロフィール・学歴・受賞歴・研究テーマ
│   └── works.js        作品データ（一覧と詳細ページの元データ）
├── images/
│   ├── works/<作品ID>/ 作品ごとの画像（cover / hero / process-xx / gallery-xx）
│   └── about/          プロフィール写真（載せる場合に作成し、profile.js の portrait に指定）
├── assets/
│   ├── css/style.css   デザイン
│   ├── css/fonts.css   和文フォントの読み込み（自動生成）
│   ├── fonts/source-han-sans-jp/  源ノ角ゴシックのWebフォントとライセンス
│   ├── js/main.js      表示処理・言語切り替え（通常は編集不要）
│   └── img/favicon.svg
├── tools/
│   ├── build.mjs          HTML の検索エンジン向け情報・sitemap.xml・robots.txt を作り直す
│   └── subset-font.py     和文Webフォントを作り直す（通常は不要）
├── sitemap.xml / robots.txt 検索エンジン向け
└── .nojekyll           GitHub Pages 用の設定
```

## ローカルで確認する

```sh
cd ~/Projects/portfolio
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 を開きます。終了は `Ctrl + C`。

## 日本語・英語（EN / JP）

- ヘッダーの EN / JP で切り替わります。初期表示は英語で、選んだ言語はブラウザに保存されます。
- 文章は `{ en: "英語", ja: "日本語" }` の形で書きます。段落が複数ある項目は
  `{ en: ["段落1", "段落2"], ja: ["段落1", "段落2"] }`。
- 作品名は固有名詞として翻訳しません。`"LEATHER CELL VEST"` のように英語表記の文字列で書き、日本語表示でも同じ表記になります。
- 片方の言語が未入力の場合は英語が表示されます。
- 「PROJECTS / プロジェクト」などの UI の言葉は `data/i18n.js` で変更できます。

## 作品を追加・編集する

1. `photo/<フォルダ>/` に写真を `01.jpg`, `02.jpg` … の名前で入れる（`01` がメイン画像と一覧のサムネイル）
2. `data/works.js` の作品ブロックを1つコピーして貼り付け、内容を書き換える（`photoDir` に 1 のフォルダを指定）
3. `node tools/build.mjs` を実行（写真を `images/works/<作品ID>/photos/` にコピーし、HTML の検索エンジン向け情報と sitemap.xml を更新。Node.js が必要）
4. ローカルで確認して、GitHub に反映（下記「公開後の更新」）

- 並び順は `works.js` に書いた順番です。
- `draft: true` にすると非公開になります。
- 詳細ページはすべて同じ形式です：作品名 → 制作年 → メイン画像 → 概要 → クレジット → 受賞・選考歴 → リンク → その他の作品画像。データがない項目は表示されません。
- 受賞・選考歴は `profile.js` の `awards` に登録し、作品側では `id` で参照します（ABOUT と表記・状況が必ず一致します）。
- リンク（3Dデータ・掲載記事）は `links` を書いた作品だけに表示されます。まだ中身がないときは「公開準備中」「追加予定」と表示されます。
- `tags` は将来カテゴリー絞り込みを再導入するためのデータです（現在は表示に使っていません）。

### 画像について

- 写真の元データは `photo/`（Git に含めない）に置き、公開用のコピーは `node tools/build.mjs` が `images/works/<作品ID>/photos/` に作ります。元の写真は変更されません。
- `02` 以降はファイル名の順に詳細ページの下部に並びます（横長は全幅、縦長は PC で2列）。どの写真もクリックで拡大できます。
- 目安：長辺 2000px 程度、1枚 500KB 以下。macOS なら「プレビュー」→ ツール → サイズを調整 で縮小できます。
- 一覧のカバー画像は正方形（1:1）で表示されます（中央を基準に切り抜き。位置は works.js の `coverPosition` で調整）。詳細ページの画像は縦長・横長どちらでも自動でレイアウトされます。
- 未加工の大きな元データは `_originals/` フォルダに置けば、Git に含まれず公開されません。

## フォント

- 欧文：Helvetica Neue / Helvetica（閲覧者の端末に入っているものを使用。フォントファイルは同梱していません）。ない環境では Arial。
- 和文：源ノ角ゴシック（Source Han Sans JP、Adobe、SIL Open Font License 1.1）。
  - Webフォントとして同梱しています。JIS第1・第2水準の文字に絞り、文字種ごとに3ファイルに分割しているため、ページで使われた分だけが読み込まれます（英語表示では読み込まれません）。
  - OFL の規定で、改変（サブセット化）したフォントには予約名「Source」を使えないため、フォント内部名は「Han Sans JP Web」に変更しています。著作権表示とライセンスはそのまま保持し、`assets/fonts/source-han-sans-jp/LICENSE.txt` を同梱しています。
  - 閲覧者の端末に源ノ角ゴシックがインストールされている場合は、そちらが使われます。

## 検索エンジン（SEO）

- ページのタイトルと説明文は `data/site.js` の `seo` で管理しています（日本語名・英語名の両方を含め、言語切り替えに関係なく固定）。
- 各 HTML の `<head>`（タイトル・説明文・canonical・構造化データ）と `<main>` 内の要約は `node tools/build.mjs` が data/ から生成します。
  `data/` を編集したら実行してください（HTML を手で直接編集すると、次の実行で上書きされます）。
- `<main>` 内の要約は JavaScript を実行しない検索エンジン向けで、ブラウザでは main.js の表示に置き換わります。
- Google Search Console の所有権確認ファイル（`google〜.html`）は、このフォルダの直下に置いてコミットします。

## 公開後の更新

```sh
git add .
git commit -m "Add new work"
git push
```

push すると 1〜2 分で https://imamurariki.github.io/ に反映されます。

## URL を変えないために（QRコード用）

- リポジトリ名（ImamuraRiki.github.io）と GitHub ユーザー名を変えると URL が変わります。名刺を刷った後は変更しないでください。
- 作品の `id` も URL の一部です。公開後は変えないでください。
- 将来ドメインを持つ場合は、Settings → Pages → Custom domain で独自ドメインを設定できます。
