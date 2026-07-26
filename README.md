# Shoue Nakazawa Portfolio & Life Archive

中澤祥慧（Shoue Nakazawa）の「Professional Portfolio」と「Personal Life Archive」を一つにまとめた、3言語対応の完全静的サイトです。

- 公開URL: <https://11044172.github.io/Shoue-Nakazawa.tw/>
- 管理画面: <https://app.pagescms.org/>
- 対応言語: 日本語 / 繁體中文 / English
- 月額費用: 独自ドメインを使わない限り0円

## このサイトの役割

トップページでは、JASM／TSMC熊本工場での半導体装置経験、Web・AI開発、台湾科技大学大学院への進学、主要プロジェクトを優先します。幼稚園、小学校、中学校、高校、台湾留学、過去のアルバイト、スポーツ、音楽、料理、旅行などは削除せず、My StoryとMemoriesへ整理しています。

## 技術構成

- Astro / TypeScript / Astro Content Collections
- HTML5 / CSS Custom Properties / Grid / Flexbox
- 必要最小限のVanilla JavaScript
- JSON / Markdown / YAML Front Matter
- Pages CMS
- GitHub Actions / GitHub Pages
- 外部データベース、バックエンド、有料CMSなし

GitHub Pagesは静的ファイルを無料で配信し、Pages CMSはGitHub内のJSON・Markdown・画像を直接更新します。保存後にGitHub Actionsが自動で型チェック、テスト、ビルド、公開を行うため、外部DBや常時稼働サーバーは不要です。独自ドメインを使う場合のみ、ドメイン取得・更新費用が別途かかります。

## ディレクトリ構成

```text
src/
├── components/          共通UI
├── layouts/             SEO・ヘッダー・フッター
├── pages/               3言語のページ
├── styles/              全体デザイン
├── utils/               翻訳フォールバック、base path
├── data/                プロフィール、サイト設定、スキル、語学、SNS
└── content/
    ├── experience/      職歴・アルバイト
    ├── education/       学歴
    ├── projects/        プロジェクト
    ├── timeline/        My Story
    ├── memories/        思い出・写真
    └── achievements/    資格・スポーツ・音楽・リーダー経験
public/
├── assets/images/       用途別の公開画像
├── assets/documents/    CVなど
├── favicon/
└── legacy/              旧サイト一式
.pages.yml               Pages CMS設定
.github/workflows/       GitHub Pages自動公開
```

## ローカル起動

### 1. Node.jsを準備

Node.js 22 LTSを推奨します。Node.jsを入れると、通常はCorepackも利用できます。

```bash
node --version
corepack enable
corepack prepare pnpm@11.9.0 --activate
```

### 2. 依存関係をインストール

```bash
pnpm install
```

### 3. 開発サーバー

```bash
pnpm dev
```

表示されたローカルURLをブラウザで開きます。

### 4. 型チェック・ビルド・プレビュー・テスト

```bash
pnpm check
pnpm build
pnpm preview
pnpm test
```

`pnpm test` はJSON・Markdown・画像パス・秘密情報候補・Pages CMS YAML・ビルド後の主要ページ・base path・内部リンク・電話リンクを確認します。

## GitHub Pagesへの公開

1. GitHubのリポジトリで `Settings` → `Pages` を開く
2. `Build and deployment` のSourceを `GitHub Actions` にする
3. `main` ブランチへ変更を保存（push）する
4. `Actions` タブの `Build and deploy to GitHub Pages` が緑色になるまで待つ
5. 公開URLを確認する

ワークフローはNode.js準備、依存関係、コンテンツ検証、型チェック、Astroビルド、ビルド後検証、GitHub Pages公開を自動実行します。Pages CMSからの保存もGitHubへの変更なので、同じ流れで公開されます。

## Pages CMSへの接続

1. <https://app.pagescms.org/> を開く
2. GitHubアカウントでログイン
3. Pages CMSのGitHub Appを、リポジトリ所有者 `11044172` にインストール
4. アクセス対象として `Shoue-Nakazawa.tw` を選択
5. Pages CMSで対象リポジトリと `main` ブランチを開く
6. `.pages.yml` が読み込まれ、左側に日本語の管理メニューが出ることを確認

Pages CMSは別のデータベースへコピーするのではなく、リポジトリのファイルを直接編集します。

## よく行う更新

### プロフィール画像を変更

1. Pages CMSへGitHubアカウントでログイン
2. 対象リポジトリを開く
3. 「サイト基本設定」→「プロフィール・ヒーロー」を開く
4. 「メインプロフィール画像」で新しい画像を選択
5. 「画像の説明（alt）」を3言語で入力（最低でも日本語）
6. 保存
7. GitHub Actionsの完了後に公開サイトを確認

画像は `public/assets/images/profile/` に保存されます。

### プロジェクト画像を変更

1. 「キャリア・学び」→「プロジェクト」を開く
2. 対象プロジェクトを選択
3. 「メイン画像」または「スクリーンショット」を変更
4. alt、説明、技術、状態を確認して保存

### 思い出写真を追加

1. 「人生・思い出」→「Memories／写真」を開く
2. 「新規作成」
3. タイトル、画像、alt、キャプション、撮影年、撮影場所、カテゴリを入力
4. 表示順を入力
5. 「公開する」「ギャラリーに表示する」をオン
6. 必要に応じてFeatured、トップページ、My Story表示をオン
7. 保存し、Actions完了後に公開サイトを確認

人物名や撮影場所が不明な写真には、推測で情報を書かないでください。

### 職歴・学歴を更新

- 職歴: 「キャリア・学び」→「職歴・アルバイト」
- 学歴: 「キャリア・学び」→「学歴」

開始年月、終了年月、現在継続中、説明、画像、alt、表示順、公開、トップページ表示を編集できます。会社の機密、工程条件、装置名、顧客情報、生産情報は入力しないでください。

### プロジェクトを追加

「キャリア・学び」→「プロジェクト」→「新規作成」から、slug、概要、課題、解決方法、機能、担当範囲、技術、画像、URL、期間、状態を入力します。存在しないURLは空欄にしてください。

### My Storyを追加

「人生・思い出」→「My Story／人生年表」→「新規作成」から、年、開始・終了年月、任意の年齢、場所、カテゴリ、本文、写真、関連項目、表示順を入力します。

### 3言語テキスト

各多言語項目には「日本語」「繁體中文」「English」があります。未入力の場合、サイトは次の順で空ではない文章を探します。

1. 選択中の言語
2. 日本語
3. 繁體中文
4. English

会社名、学校名、日付、資格名、受賞名、数値は翻訳時に推測しないでください。

### 公開・非公開と表示順

- `公開する`: オフの場合、生成サイトとsitemapへ出しません
- `トップページに表示する` / `Featured`: 代表項目だけトップへ表示
- `表示順`: 小さい数字ほど先に表示

重要: 公開リポジトリ内のファイルは、`公開する` をオフにしてもGitHub上で閲覧できます。完全に秘密にしたい情報をファイルへ保存しないでください。

### CVを差し替え

「サイト基本設定」→「プロフィール・ヒーロー」→「CV」でPDFを選びます。空欄の場合、CVボタンは表示されません。

### OGP画像を差し替え

「サイト基本設定」→「サイト・SEO」→「OGP画像」で1200×630pxの画像を選びます。

## 画像の推奨仕様と最適化

- JPEG / PNG / WebP / AVIFに対応（通常はWebP推奨）
- 長辺1600〜2000px程度
- 1枚500KB以下を目安
- OGPは1200×630px
- 元画像は別途ローカルや個人ストレージに保存
- 巨大な未圧縮写真やHEICを大量にGitHubへ入れない

macOSの例:

```bash
sips -Z 1800 input.jpg --out resized.jpg
sips -s formatOptions 78 resized.jpg
```

ImageMagickを利用できる場合:

```bash
magick input.jpg -resize '1800x1800>' -strip -quality 78 output.webp
```

`-strip` はEXIF等のメタデータ削除にも役立ちます。macOSではプレビューの書き出し、WindowsではExifToolなども利用できます。公開前にGPS位置情報、端末名、撮影日時が残っていないか確認してください。

## セキュリティとプライバシー

保存しないもの:

- APIキー、GitHubトークン、パスワード、秘密鍵、`.env`
- 自宅住所、非公開電話番号
- 顧客情報、社内資料、生産データ、非公開の装置・工程条件
- 公開許可のない人物写真

電話番号は「非公開」フラグを付けてもファイル内にあればGitHubから見えます。初期データには電話番号を保存していません。Markdownへ実行可能なJavaScriptや未確認のHTMLを貼り付けないでください。

## GitHub履歴から戻す

技術に不慣れな場合はGitHubの対象ファイルで `History` を開き、戻したい更新を選び、内容を確認して元の値をPages CMSへ入力し直す方法が安全です。Git操作に慣れている場合:

```bash
git log --oneline
git revert <戻したい変更のコミットID>
git push origin main
```

`git reset --hard` は履歴や作業を失う可能性があるため、この運用では使いません。

## 既存サイトから移行した情報

- 氏名、台湾での自己紹介、好奇心・挑戦という人物像
- 幼稚園、小学校、中学校、高校、中原大学
- KFC、マクドナルド、PRONTO、くら寿司
- ピアノ、ソフトテニス、料理、中国語、プログラミング
- 体操、空手、ソフトテニス、伴奏者賞、委員長の証明書
- 旧プロフィール・学校・仕事・証明書写真

旧サイト一式は `public/legacy/` に保存しています。旧画像のうち内容を確実に特定できない写真は、削除せず非公開CMSデータまたはlegacyに残しました。

## 本人による確認が必要な情報

- 福海智趣科技公司での具体的な担当業務
- くら寿司の正確な勤務期間・役職・リーダー経験の範囲
- KFC、マクドナルド、PRONTOの店舗・勤務期間の最終確認
- 高校の所属コース
- RentFlow AI、LeanDevStudio、代購プラットフォーム、NFCゲームの制作期間・機能・公開URL
- 旧写真 `IMG_2560.jpeg`、`IMG_2570.jpg`、`IMG_2578.jpg`、`IMG_2584.jpg`、`IMG_3677.jpg` の人物・場所・撮影年
- 大学合格実績の学校名、年度、合否、掲載可否
- CVファイルとLeanDevStudioの正式URL
- 各証明書の正式大会名・部門

不明な項目は空欄、TODO、または `published: false` としています。

## 今後の改善候補

- 本人確認済みのCV、GitHub・デモURL、大学合格実績を追加
- 旧JPEGのWebP化とEXIF除去
- Memoriesの写真が増えた段階で年別ページネーションを追加
- 公開後の実データでLighthouseを再計測
- 研究開始後、公開可能な範囲で大学院の研究関心を更新
