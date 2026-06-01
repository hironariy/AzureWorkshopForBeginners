# PowerPoint Copilot 用プロンプト: 第6回

添付した `lesson-06-embedded.html`、`lesson-06-draft.md`、および別途添付した PowerPoint テンプレートを使って、PowerPoint 版のプレゼンテーションを作成してください。

## 作成対象

- 講座: Azure Workshop for Beginners
- 回: 第6回
- タイトル: Todo アプリの構築 2
- 想定スライド数: 48枚
- 出力ファイル名: `lesson-06-todo-app-build-2.pptx`

## 素材の扱い

- `lesson-06-embedded.html` は一次情報です。すべての画像は HTML 内に Base64 の data URI として埋め込み済みです。外部画像ファイルは参照しないでください。
- `lesson-06-draft.md` は、学習意図、補足説明、講師ノート、図表改善の文脈として参照してください。
- 別途添付する PowerPoint テンプレートを必ずスライドマスター、フォント、色、余白、見出しスタイルに適用してください。

## 作成方針

1. HTML の各 `<section class="slide">` を原則1枚の PowerPoint スライドに対応させてください。
2. HTML の見出し、リード文、箇条書き、表、図表、スクリーンショットの意味を保持してください。
3. スクリーンショットは HTML 内の埋め込み画像をそのまま使用し、トリミング、ぼかし、再マスク、文字起こしによる再作成はしないでください。
4. 図表は HTML 内の埋め込み SVG を参考に、PowerPoint の図形、コネクタ、アイコン、ラベルでより洗練された図に再構成して構いません。Azure サービス名、矢印の向き、責任分界、順序、強調箇所は変えないでください。
5. 初学者向けの教材なので、専門用語を増やしすぎず、HTML とドラフトにある説明の粒度を保ってください。
6. 既存素材に含まれるマスク済み情報を復元、推測、追加しないでください。
7. 余計な表紙、目次、マーケティング風の導入、出典不明の画像は追加しないでください。

## 第6回で特に重視すること

- 第5回で作成したリソースを引き継ぎ、GitHub Actions で Web/API の実イメージをデプロイして Todo アプリを完成させる流れを明確にしてください。
- GitHub Actions、Service Principal、Secret、Repository variables、ACR、Container Apps、PostgreSQL、Entra ID の関係を混同しないように整理してください。
- Secret value、ID、URL など、公開資料で扱ってはいけない情報は、既存スクリーンショットのマスク状態を維持してください。
- デプロイ結果の確認は、GitHub Actions、ACR、Container Apps revision、Web URL、Entra ID redirect URI、Todo 操作の順序を崩さないでください。
- クリーンアップでは PostgreSQL 停止、Resource group 削除、Entra ID/GitHub 側の残存情報の扱いを明確にしてください。