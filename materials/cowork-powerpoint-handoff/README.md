# M365 Copilot Cowork PowerPoint Handoff

> PowerPoint Copilot 用の Base64 埋め込み HTML 版は `materials/powerpoint-copilot-handoff/` に作成済みです。このディレクトリは Cowork 用のリンク画像版として残しています。

このディレクトリは、第2回から第6回の HTML プレゼンテーションを PowerPoint 化するために M365 Copilot Cowork へ渡す素材をまとめたものです。

## 使い方

各回ごとに、以下を Cowork に渡します。

- `lesson-XX/prompt.md`: Cowork に貼り付けるプロンプト
- `archives/lesson-XX-cowork-materials.zip`: HTML、ドラフト、HTML が参照している画像をまとめた素材アーカイブ
- 別途用意している PowerPoint テンプレート: スライドマスターとして使用させるファイル

## 方針

- HTML プレゼンテーションを一次情報として扱います。
- Markdown ドラフトは、意図、補足説明、講師ノート、図表改善の文脈として参照させます。
- スクリーンショットは加工せず、そのまま使用させます。
- 図表 SVG は内容を維持したうえで、PowerPoint 上でより洗練された図として再構成させます。
- 既存のマスク済み情報を復元、推測、追加させないでください。

## アーカイブ構成

各 zip は、リポジトリ相対パスを保ったまま以下を含みます。

- `materials/presentation-html/lesson-XX.html`
- `materials/drafts/lesson-XX.md`
- `materials/images/screenshots/...`
- `assets/diagrams/...`

第6回のみ、第5回終了状態の図表を参照しているため `assets/diagrams/lesson-05/l05-d17-lesson5-end-state.drawio.svg` も含めています。