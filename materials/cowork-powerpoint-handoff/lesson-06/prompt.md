# M365 Copilot Cowork 用プロンプト: 第6回

添付した素材アーカイブ `lesson-06-cowork-materials.zip` と、別途添付した PowerPoint テンプレートを使って、PowerPoint 版のプレゼンテーションを作成してください。

## 作成対象

- 講座: Azure Workshop for Beginners
- 回: 第6回
- タイトル: Todo アプリの構築 2
- 想定スライド数: 48枚
- 出力ファイル名: `lesson-06-todo-app-build-2.pptx`

## 使用する素材

- `materials/presentation-html/lesson-06.html`: 既存 HTML プレゼンテーション。スライド構成、本文、図表・スクリーンショット配置の一次情報として扱ってください。
- `materials/drafts/lesson-06.md`: ドラフト。学習意図、補足説明、講師ノート、図表改善の文脈として参照してください。
- `assets/diagrams/lesson-06/*.drawio.svg`: 図表素材。内容は維持しつつ、PowerPoint 上で見やすく洗練された図に再構成してください。
- `assets/diagrams/lesson-05/l05-d17-lesson5-end-state.drawio.svg`: 第5回終了状態の参照図。第6回冒頭の引き継ぎ説明に使ってください。
- `materials/images/screenshots/L06-*.png`: スクリーンショット素材。画像は加工せず、そのまま使用してください。
- 別途添付する PowerPoint テンプレート: 必ずスライドマスター、フォント、色、余白、見出しスタイルに適用してください。

## 作成方針

1. HTML の各 `<section class="slide">` を原則1枚の PowerPoint スライドに対応させてください。
2. HTML の見出し、リード文、箇条書き、表、図表、スクリーンショットの意味を保持してください。
3. ドラフトは、HTML だけでは読み取れない講師意図や補足説明を講師ノートに入れる用途で使ってください。
4. スクリーンショットは、そのまま使用してください。トリミング、ぼかし、再マスク、文字起こしによる再作成はしないでください。
5. 図表は、添付 SVG を参考にして、PowerPoint の図形、コネクタ、アイコン、ラベルで作り直して構いません。Azure サービス名、矢印の向き、責任分界、順序、強調箇所は変えないでください。
6. 図表を改善する場合は、読みやすい余白、統一されたアイコン、少ない色数、整列したラベル、明確なグルーピングを優先してください。
7. 初学者向けの教材なので、専門用語を増やしすぎず、HTML とドラフトにある説明の粒度を保ってください。
8. 既存素材に含まれるマスク済み情報を復元、推測、追加しないでください。
9. テンプレートのスライドマスターに従い、16:9 の研修用スライドとして作成してください。
10. 余計な表紙、目次、マーケティング風の導入、出典不明の画像は追加しないでください。

## 第6回で特に重視すること

- 第5回で作成したリソースを引き継ぎ、GitHub Actions で Web/API の実イメージをデプロイして Todo アプリを完成させる流れを明確にしてください。
- GitHub Actions、Service Principal、Secret、Repository variables、ACR、Container Apps、PostgreSQL、Entra ID の関係を混同しないように整理してください。
- Secret value、ID、URL など、公開資料で扱ってはいけない情報は、既存スクリーンショットのマスク状態を維持してください。
- デプロイ結果の確認は、GitHub Actions、ACR、Container Apps revision、Web URL、Entra ID redirect URI、Todo 操作の順序を崩さないでください。
- クリーンアップでは PostgreSQL 停止、Resource group 削除、Entra ID/GitHub 側の残存情報の扱いを明確にしてください。

## 完成後の確認

- スライド順が HTML と一致していること。
- 図表内の矢印、Azure サービス名、GitHub Actions と実行時通信の区別に誤りがないこと。
- スクリーンショットが差し替えられていないこと。
- テンプレートのスライドマスターが適用されていること。
- 日本語の表記ゆれが増えていないこと。