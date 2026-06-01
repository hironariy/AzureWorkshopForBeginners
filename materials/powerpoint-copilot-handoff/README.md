# PowerPoint Copilot Handoff

このディレクトリは、第2回から第6回の HTML プレゼンテーションを PowerPoint Copilot に渡して PowerPoint 化するための素材です。

## 使い方

各回ごとに、以下を PowerPoint Copilot に渡します。

- `lesson-XX/prompt.md`: PowerPoint Copilot に貼り付けるプロンプト
- `archives/lesson-XX-powerpoint-copilot-materials.zip`: Base64 埋め込み済み HTML、ドラフト、プロンプトをまとめたアーカイブ
- 別途用意している PowerPoint テンプレート: スライドマスターとして使用させるファイル

## 重要な変更点

- HTML 内のすべての `<img src="...">` は、PNG/SVG ファイルへのリンクではなく `data:...;base64,...` に変換済みです。
- アーカイブには個別の画像ファイルを含めていません。PowerPoint Copilot には、Base64 埋め込み済み HTML を一次情報として読ませてください。
- ドラフトは、学習意図、補足説明、講師ノート、図表改善の文脈として使用します。
- スクリーンショットは HTML 内に埋め込まれた画像をそのまま使わせ、追加加工や再マスクはさせないでください。
- 図表は HTML 内に埋め込まれた SVG を参照し、可能であれば PowerPoint の図形、コネクタ、アイコンでより洗練された図として再構成させます。

## アーカイブ構成

各 zip は以下を含みます。

- `lesson-XX/prompt.md`
- `lesson-XX/lesson-XX-embedded.html`
- `lesson-XX/lesson-XX-draft.md`

## 注意

- 既存のマスク済み情報を復元、推測、追加させないでください。
- HTML 内の data URI は長いため、PowerPoint Copilot には zip または HTML ファイルとして渡す運用を想定しています。
- PowerPoint テンプレートはリポジトリ内には含めていません。別途添付してください。