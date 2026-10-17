# RIKI IMAMURA — Portfolio

ファッションデザインとデジタルファブリケーションを軸とした個人ポートフォリオサイトです。
HTML / CSS / JavaScript だけで作られた静的サイトで、GitHub Pages でそのまま公開できます。

## フォルダ構成

```
portfolio/
├── index.html          WORKS（トップ・作品一覧）
├── work.html           作品詳細（work.html?id=作品ID で各作品を表示）
├── about.html          ABOUT
├── contact.html        CONTACT
├── 404.html            ページが見つからないとき
├── data/               ★ 内容の編集はここだけ
│   ├── site.js         サイト名・紹介文・ナビ・連絡先・公開URL
│   ├── profile.js      プロフィール・学歴・受賞歴・研究関心
│   └── works.js        作品データ（一覧と詳細ページの元データ）
├── images/
│   ├── works/<作品ID>/ 作品ごとの画像（cover / hero / process-xx / gallery-xx）
│   └── about/          プロフィール写真
├── assets/
│   ├── css/style.css   デザイン
│   ├── js/main.js      表示処理（通常は編集不要）
│   └── img/favicon.svg
├── tools/make-sitemap.mjs   sitemap.xml を作り直すスクリプト
├── sitemap.xml / robots.txt 検索エンジン向け
└── .nojekyll           GitHub Pages 用の設定
```

## ローカルで確認する

ターミナルで portfolio フォルダに移動して、次を実行します。

```sh
cd ~/Projects/portfolio
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 を開きます。終了は `Ctrl + C`。
（`index.html` をダブルクリックして開いても表示できます）

## 作品を追加・編集する

1. `images/works/<作品ID>/` フォルダを作り、画像を入れる（例: `images/works/new-work/cover.jpg`）
2. `data/works.js` の作品ブロックを1つコピーして貼り付け、内容を書き換える
3. `node tools/make-sitemap.mjs` を実行（sitemap.xml の更新。Node.js が必要）
4. ローカルで確認して、GitHub に反映（下記「公開後の更新」）

- 並び順は `works.js` に書いた順番です。
- `draft: true` にすると非公開になります。
- 受賞歴・展示歴は、空 `[]` のままならセクションごと表示されません。

### 画像について

- 現在の画像はすべて仮画像（`.svg`）です。写真は `.jpg` か `.webp` で同じフォルダに置き、`works.js` の `src` を書き換えます。
- 目安：長辺 2000px 程度、1枚 500KB 以下（大きすぎると表示が遅くなります）。
  macOS なら「プレビュー」→ ツール → サイズを調整 で縮小できます。
- 一覧のカバー画像は縦長（4:5）推奨です。詳細ページの画像は縦長・横長どちらでも自動でレイアウトされます（横長は全幅、縦長は2列）。
- 未加工の大きな元データは `_originals/` フォルダに置けば、Git に含まれず公開されません。

## プロフィール・連絡先を編集する

- ABOUT：`data/profile.js`（公表済み・確認済みの情報のみ載せてください）
- CONTACT・フッターのリンク：`data/site.js` の `contact.items`
- ページを追加するとき：既存の HTML をコピーし、`data/site.js` の `nav` に追加します。

## GitHub Pages で公開する

> 現在は仮のURL `https://your-username.github.io/portfolio/` を使っています。

1. GitHub で新しいリポジトリを作成（Public、README などは追加しない）
2. このフォルダをアップロード
   ```sh
   git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```
3. GitHub のリポジトリ → **Settings** → **Pages**
   → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → **Save**
4. 数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます
5. 公開URLが決まったら、仮URLをすべて置き換えて `node tools/make-sitemap.mjs` を実行
   （`your-username.github.io/portfolio` を検索して置換。`data/site.js` と各 HTML の `<head>`）

## 公開後の更新

```sh
git add .
git commit -m "Add new work"
git push
```

push すると 1〜2 分で公開サイトに反映されます。

## URL を変えないために（QRコード用）

- リポジトリ名と GitHub ユーザー名を変えると URL が変わります。名刺を刷った後は変更しないでください。
- 作品の `id` も URL の一部です。公開後は変えないでください。
- 将来ドメインを持つ場合は、Settings → Pages → Custom domain で独自ドメインを設定できます。
