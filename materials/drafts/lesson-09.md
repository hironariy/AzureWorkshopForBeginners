# 第9回 静的 Web サイトと Static Web Apps ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第9回
- タイトル: 静的 Web サイトと Static Web Apps
- 形式: オンライン座学
- 時間: 60分 (50分レクチャー、10分QA)
- 想定日: 2026年8月27日

## この回の位置づけ

第9回は、第2回から第6回で扱った Web 3層アーキテクチャとは異なる Web アプリケーション構成として、静的 Web サイト、Single Page Application、サーバーレス API、マネージドデータベースを組み合わせる考え方を理解する回です。
第8回では ID、権限、ガバナンス、セキュリティ、コスト、保護などの管理系サービスを扱いました。
本回では、アプリケーションの構成そのものに戻り、ブラウザー、静的コンテンツ、API、データストア、イベント系サービスがどのように分担するかを整理します。

本回では Azure リソースは作成しません。
Microsoft の公式サンプルアプリ `Azure-Samples/todo-nodejs-mongo-swa-func` を、デプロイ手順としてではなく、アーキテクチャを読むための題材として扱います。
このサンプルは Azure Developer CLI、Bicep、Azure Static Web Apps、Azure Functions、Azure Cosmos DB API for MongoDB、Azure Monitor、Azure Key Vault を組み合わせた構成です。
2026年5月13日時点で README の内容を確認済みですが、公式サンプルは変更または削除される可能性があるため、公開前レビューで再確認します。

第10回では AI と Microsoft Foundry、第11回では Azure Monitor を中心とした監視を扱います。
本回では Azure Monitor や Key Vault もサンプル内の構成要素として触れますが、詳細は第8回または第11回の範囲に留めます。

## 受講前提

- 第2回で Web 3層アーキテクチャ、Web 層、AP 層、DB 層の役割を学んでいることが望ましい。
- 第3回から第6回までで、VM、ACI、Container Apps、PostgreSQL、GitHub Actions などの名前を見たことがあることが望ましい。
- 第8回で、Key Vault、Cost Management、Backup、Site Recovery、Service Health などの管理系サービスの入口を学んでいることが望ましい。
- フロントエンド開発、JavaScript フレームワーク、Azure Functions、Cosmos DB、SQL Database、イベント系サービスの詳細経験は不要。
- 本回は座学のみで、Azure Portal の操作、Azure CLI、Azure Developer CLI、IaC、GitHub 操作は行わない。

## 到達目標

- 静的 Web サイト、Single Page Application、Web 3層アーキテクチャの違いを説明できる。
- SPA では、ブラウザー側の画面処理、API、データストアを分けて考えることを理解できる。
- Azure Static Web Apps が、静的コンテンツのホスティング、統合 API、認証、ルーティング、CI/CD 連携、プレビュー環境を支援するサービスであることを説明できる。
- Azure Functions が、HTTP API やイベント処理をサーバーレスに実装するためのサービスであることを説明できる。
- Cosmos DB と Azure SQL Database の代表的な使い分けを概要レベルで説明できる。
- Event Grid、Event Hubs、Service Bus の違いを、イベント通知、イベントストリーミング、信頼性の高いメッセージングの観点で説明できる。
- Microsoft 公式サンプルアプリの構成図を見て、各 Azure サービスがどの役割を担っているかを説明できる。

## 受講後に説明できること/操作できること

- Web 3層アーキテクチャと SPA アーキテクチャの違いを説明できる。
- 静的コンテンツ、フロントエンドアプリ、API、データストアの役割を分けて説明できる。
- Azure Static Web Apps と Azure Functions を組み合わせる基本構成を説明できる。
- Cosmos DB が柔軟なスキーマやグローバル分散に向く NoSQL データベースであり、Azure SQL Database が SQL Server と共通の基盤を持つマネージドなリレーショナルデータベースであることを説明できる。
- Event Grid、Event Hubs、Service Bus を、通知、取り込み、業務メッセージングという観点で大まかに選び分けられる。
- 公式サンプルアプリが、Static Web Apps、Functions、Cosmos DB、Key Vault、Azure Monitor を組み合わせたアプリ構成例であると説明できる。
- 公式サンプルは azd/Bicep 前提のため、本講座では実行せずアーキテクチャ解説用に読むものだと説明できる。

## 本回で扱う範囲

- Web 3層アーキテクチャの振り返り
- 静的 Web サイトと動的 Web アプリケーションの違い
- Single Page Application の基本的な考え方
- SPA と API の役割分担
- Azure Static Web Apps の位置づけと主要機能
- Azure Functions の位置づけと代表的なトリガー
- Static Web Apps と Functions を組み合わせる基本構成
- Cosmos DB、Azure SQL Database の概要と代表的な使い分け
- Event Grid、Event Hubs、Service Bus の概要と代表的な使い分け
- Microsoft 公式サンプルアプリ `Azure-Samples/todo-nodejs-mongo-swa-func` の構成読解
- 公式サンプルに含まれる Azure Static Web Apps、Function Apps、Cosmos DB API for MongoDB、Azure Monitor、Key Vault の役割

## 本回で扱わない範囲

- 公式サンプルアプリのデプロイ実行
- `azd init`、`azd up`、`azd down` など Azure Developer CLI の操作手順
- Bicep、Terraform、ARM テンプレートなど IaC の実装
- React、Angular、Vue、Svelte、Next.js など個別フレームワークの詳細
- Azure Functions のコード実装、ホスティングプラン詳細、Durable Functions の詳細
- Cosmos DB のパーティションキー、RU、整合性レベル、インデックス設計の詳細
- Azure SQL Database の詳細なチューニング、正規化、インデックス設計、移行設計
- Event Grid、Event Hubs、Service Bus の詳細な実装、SDK 利用、リトライ設計
- Static Web Apps の本番向け詳細設計、カスタムドメイン、認証/認可の詳細、セキュリティレビュー
- Azure Monitor、Application Insights、Log Analytics の詳細。第11回で扱う。
- Microsoft Foundry、Azure OpenAI、AI エージェントの詳細。第10回で扱う。

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | Web 3層の振り返り | これまでの構成と本回の違いを明確にする |
| 5-15分 | 静的 Web サイトと SPA | 静的コンテンツ、SPA、ブラウザー側処理の考え方を理解する |
| 15-30分 | Static Web Apps、Functions、DB | SPA 構成で使う主要 Azure サービスの役割を整理する |
| 30-40分 | イベント系サービスの入口 | Event Grid、Event Hubs、Service Bus の違いをつかむ |
| 40-48分 | 公式サンプルアプリ解説 | サンプル構成図からサービスの役割を読み取る |
| 48-50分 | 振り返り | Web 3層、SPA、次回以降との接続を確認する |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は35枚です。座学中心の回として25枚から35枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | 静的 Web サイトと Static Web Apps | この回では、Web 3層とは違う Web アプリケーション構成として、静的サイトと SPA を学びます。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | サービス名よりも、画面、API、データ、イベントがどの役割に分かれるかを理解します。 | 到達目標、座学のみ、公式サンプルは読むだけ | L09-D01 |
| 3 | Web 3層の振り返り | これまでの Web 3層では、Web 層、AP 層、DB 層の役割を分けて考えました。 | Web/AP/DB、VM/ACA/PostgreSQL、リクエスト処理 | L09-D02 |
| 4 | SPA は別の見方 | SPA では、画面表示の多くをブラウザー側で行い、必要なデータを API から取得します。 | HTML/CSS/JS、ブラウザー側ルーティング、API 呼び出し | L09-D03 |
| 5 | 静的 Web サイトとは | 静的 Web サイトは、HTML、CSS、JavaScript、画像などのファイルを配信する構成です。 | 静的ファイル、ホスティング、CDN 的な配信、サーバー側処理を持たない場合 | L09-T01 |
| 6 | 動的処理はどこへ行くか | 静的な画面でも、ログイン、検索、保存などの処理には API やデータストアが必要です。 | API、バックエンド、データ保存、認証 | L09-D04 |
| 7 | Web 3層と SPA の比較 | Web 3層と SPA は、処理の置き場所とデプロイ単位が違います。 | Web 層/AP 層/DB 層、ブラウザー/API/DB、利点と注意点 | L09-T01 |
| 8 | Static Web Apps の役割 | Static Web Apps は、静的コンテンツと API を組み合わせる Web アプリの入口になります。 | 静的ホスティング、グローバル配信、統合 API | L09-D05 |
| 9 | Static Web Apps の主要機能 | Static Web Apps は、ホスティングだけでなく、認証、ルーティング、CI/CD、プレビュー環境も支援します。 | GitHub/Azure DevOps 連携、SSL、カスタムドメイン、認証、PR プレビュー | L09-T02 |
| 10 | Storage 静的 Web サイトとの違い | Static Web Apps は単なる静的ファイル置き場ではなく、アプリ開発ワークフローに近いサービスです。 | Storage static website、Static Web Apps、API、認証、CI/CD | L09-T02 |
| 11 | API は Azure Functions で受ける | SPA からのデータ取得や更新は、Azure Functions の HTTP API で受ける構成がよく使われます。 | HTTP trigger、REST API、サーバーレス | L09-D06 |
| 12 | Functions はイベントでも動く | Functions は HTTP だけでなく、ファイル、キュー、イベント、スケジュールなどをきっかけに実行できます。 | トリガー、バインド、イベント駆動 | L09-T03 |
| 13 | Static Web Apps と Functions の関係 | Static Web Apps では、フロントエンドと API を近い開発体験で扱えます。 | 統合 API、リバースプロキシ、CORS を意識しにくい構成 | L09-D07 |
| 14 | 認証と認可の入口 | Static Web Apps には認証プロバイダー連携とロールによる認可の入口があります。 | Microsoft Entra ID、GitHub、ロール、ルーティング規則 | L09-D08 |
| 15 | SPA のデータストア | SPA 構成でも、データの性質によって NoSQL と RDBMS を選び分けます。 | 構造化データ、ドキュメントデータ、トランザクション、スケール | L09-T04 |
| 16 | Cosmos DB | Cosmos DB は、柔軟なデータモデル、グローバル分散、低遅延を重視する NoSQL データベースです。 | NoSQL、MongoDB API、ドキュメント、グローバル分散 | L09-D09 |
| 17 | Azure SQL Database | Azure SQL Database は、SQL Server と共通の基盤を持つマネージドなリレーショナルデータベースです。 | SQL、リレーショナル、PaaS、自動バックアップ、高可用性 | L09-D10 |
| 18 | Cosmos DB と SQL Database の使い分け | データの形、クエリ、整合性、スケール、既存スキルでデータストアを選びます。 | NoSQL/RDBMS、代表シナリオ、注意点 | L09-T04 |
| 19 | イベント系サービスが必要になる場面 | アプリが大きくなると、すべてを同期 API だけでつなぐのが難しくなります。 | 非同期処理、通知、キュー、ストリーム | L09-D11 |
| 20 | Event Grid | Event Grid は、何かが起きたことを別のサービスへ知らせるイベント通知の入口です。 | イベント、push/pull、サーバーレストリガー、フィルター | L09-T05 |
| 21 | Event Hubs | Event Hubs は、大量のイベントやログを取り込むストリーミング基盤です。 | 高スループット、テレメトリ、ログ、Kafka 互換 | L09-T05 |
| 22 | Service Bus | Service Bus は、信頼性の高い業務メッセージをキューやトピックで扱うためのサービスです。 | キュー、トピック、順序、デッドレター、トランザクション | L09-T05 |
| 23 | 3つのイベント系サービスの違い | Event Grid、Event Hubs、Service Bus は似ていますが、得意な問いが違います。 | 通知、取り込み、業務メッセージング | L09-D12 / L09-T05 |
| 24 | 公式サンプルを読む | 公式サンプルは、React、Functions、Cosmos DB、Static Web Apps を組み合わせた Todo アプリです。 | サンプル名、参照日、デプロイしない理由 | L09-D13 |
| 25 | サンプルの構成要素 | サンプルでは、Static Web Apps が画面、Function Apps が API、Cosmos DB がデータ保存を担当します。 | SWA、Function Apps、Cosmos DB API for MongoDB | L09-T06 |
| 26 | サンプルに含まれる管理系サービス | Key Vault と Azure Monitor は、アプリ構成を運用するための周辺サービスとして登場します。 | Key Vault、Monitor、Managed Identity、接続文字列 | L09-D14 |
| 27 | サンプルは azd/Bicep 前提 | 公式サンプルは Azure Developer CLI と Bicep で構築するため、本講座では操作対象にしません。 | azd、Bicep、対応リージョン、講義では読解のみ | L09-T06 |
| 28 | Static Web Apps のよいところ | フロントエンド、API、認証、CI/CD を近い体験で扱えることが、SPA 構成では大きな利点です。 | 開発体験、プレビュー環境、認証、API | L09-T02 |
| 29 | 注意が必要なところ | 便利なサービスでも、データ設計、認証設計、API 保護、監視、コストは別途考えます。 | 本番設計、シークレット、Private Endpoint、監視、コスト | L09-T07 |
| 30 | Web 3層と SPA をどう選ぶか | どちらが常に正しいのではなく、アプリの性質とチームの開発方法に合わせて選びます。 | 画面中心、API 中心、既存資産、運用チーム | L09-T07 |
| 31 | 第8回とのつながり | SPA 構成でも、ID、権限、シークレット、コスト、バックアップ、DR の考え方は必要です。 | Entra ID、RBAC、Key Vault、Cost、Backup/DR | L09-D15 |
| 32 | 第10回とのつながり | AI アプリでも、画面、API、データ、イベントという見方は土台になります。 | Foundry、AI API、データ、イベント、監視 | L09-D16 |
| 33 | 第11回とのつながり | SPA とサーバーレス構成では、フロントエンド、API、DB、イベントそれぞれの監視が必要です。 | Static Web Apps、Functions、Cosmos DB、Monitor | L09-D17 |
| 34 | 今日のまとめ | SPA は、ブラウザー、API、データ、イベントを分けて設計する Web アプリケーションの見方です。 | 3つのまとめ、次回への接続 | L09-D18 |
| 35 | 確認クイズ | Web 3層、SPA、Static Web Apps、Functions、イベント系サービスの違いを確認します。 | クイズ、QA への導入 | なし |

## 図表・スクリーンショット素材一覧

本回は座学回のため、スライド本文で必須となる Azure Portal 操作スクリーンショットはありません。
サービスの関係と利用場面を理解するため、`L09-Dxx` は AI または draw.io で作成する図表、`L09-Txx` は表として管理します。
GitHub や Azure Portal の画面例は任意の参考画像として `L09-SSxx` を割り当てます。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L09-D01 | 図表 | 必須 | AI で作成 | 今日のゴール。画面、API、データ、イベントの役割地図 |
| L09-D02 | 図表 | 必須 | AI/draw.io で作成 | Web 3層の振り返り |
| L09-D03 | 図表 | 必須 | AI/draw.io で作成 | SPA の基本フロー |
| L09-D04 | 図表 | 必須 | AI/draw.io で作成 | 静的コンテンツと API/DB の分担 |
| L09-D05 | 図表 | 必須 | AI/draw.io で作成 | Azure Static Web Apps の役割 |
| L09-D06 | 図表 | 必須 | AI/draw.io で作成 | SPA から Azure Functions HTTP API への通信 |
| L09-D07 | 図表 | 必須 | AI/draw.io で作成 | Static Web Apps と統合 API の関係 |
| L09-D08 | 図表 | 必須 | AI/draw.io で作成 | Static Web Apps の認証とルーティングの入口 |
| L09-D09 | 図表 | 必須 | AI/draw.io で作成 | Cosmos DB の位置づけ |
| L09-D10 | 図表 | 必須 | AI/draw.io で作成 | Azure SQL Database の位置づけ |
| L09-D11 | 図表 | 必須 | AI で作成 | 同期 API と非同期イベントの違い |
| L09-D12 | 図表 | 必須 | AI/draw.io で作成 | Event Grid、Event Hubs、Service Bus の使い分け |
| L09-D13 | 図表 | 必須 | AI/draw.io で作成 | 公式サンプルアプリの全体構成 |
| L09-D14 | 図表 | 必須 | AI/draw.io で作成 | サンプルに含まれる Key Vault、Monitor、Managed Identity |
| L09-D15 | 図表 | 必須 | AI で作成 | 第8回管理系サービスとの接続 |
| L09-D16 | 図表 | 必須 | AI で作成 | 第10回 AI 回への接続 |
| L09-D17 | 図表 | 必須 | AI で作成 | 第11回監視回への接続 |
| L09-D18 | 図表 | 必須 | AI で作成 | 今日のまとめ。ブラウザー、API、データ、イベント |
| L09-T01 | 表 | 必須 | AI で作成 | Web 3層、静的 Web サイト、SPA の比較 |
| L09-T02 | 表 | 必須 | AI で作成 | Static Web Apps の主要機能 |
| L09-T03 | 表 | 必須 | AI で作成 | Azure Functions の代表的なトリガー |
| L09-T04 | 表 | 必須 | AI で作成 | Cosmos DB と Azure SQL Database の使い分け |
| L09-T05 | 表 | 必須 | AI で作成 | Event Grid、Event Hubs、Service Bus の違い |
| L09-T06 | 表 | 必須 | AI で作成 | 公式サンプルアプリの構成要素 |
| L09-T07 | 表 | 必須 | AI で作成 | Web 3層と SPA を選ぶ判断軸 |
| L09-T08 | 表 | 必須 | AI で作成 | SPA 構成で確認する設計項目 |
| L09-SS01 | スクリーンショット | 任意 | 筆者が提供 | 公式 GitHub サンプルの README 冒頭 |
| L09-SS02 | スクリーンショット | 任意 | 筆者が提供 | 公式サンプルのアーキテクチャ図 |
| L09-SS03 | スクリーンショット | 任意 | 筆者が提供 | Azure Static Web Apps の Overview 画面 |
| L09-SS04 | スクリーンショット | 任意 | 筆者が提供 | Static Web Apps の Configuration または Functions 連携画面 |
| L09-SS05 | スクリーンショット | 任意 | 筆者が提供 | Azure Functions の Overview 画面 |
| L09-SS06 | スクリーンショット | 任意 | 筆者が提供 | Azure Cosmos DB または Azure SQL Database の Overview 画面 |
| L09-SS07 | スクリーンショット | 任意 | 筆者が提供 | Event Grid、Event Hubs、Service Bus のポータル入口例 |
| L09-SS08 | スクリーンショット | 任意 | 筆者が提供 | サンプルのデプロイ済み Todo アプリ画面。デモ環境がある場合のみ |

## 図表案

### L09-D01 今日のゴール

目的: 本回が「Static Web Apps の操作手順」ではなく、SPA 構成を読むための回であることを示す。

構成:

- 中央: 「SPA 構成を読む」。
- 周囲に4つの役割を配置する。
- 画面: Static Web Apps、HTML/CSS/JavaScript、React など。
- API: Azure Functions、HTTP trigger。
- データ: Cosmos DB、Azure SQL Database。
- イベント: Event Grid、Event Hubs、Service Bus。
- 外側に管理系サービスとして Key Vault、Azure Monitor を薄く配置し、第8回/第11回との接続を示す。

### L09-D02 Web 3層の振り返り

目的: 第2回から第6回までの見方を思い出し、SPA との対比に入る。

構成:

- 利用者/ブラウザー。
- Web 層。
- AP 層。
- DB 層。
- 第3回 VM、第5回から第6回 ACA + PostgreSQL の例を小さく添える。
- 「役割を分ける見方」と注記する。

### L09-D03 SPA の基本フロー

目的: SPA が初回ロード後、ブラウザー内で画面遷移や API 呼び出しを行うことを説明する。

構成:

- ブラウザー。
- Static Web Apps から配信される HTML/CSS/JavaScript。
- ブラウザー内のルーティングと状態管理。
- API 呼び出し。
- API から返る JSON。
- 画面再描画。

### L09-D04 静的コンテンツと API/DB の分担

目的: 静的 Web サイトでも、データ保存やログインなどの動的処理には別のサービスが必要であることを示す。

構成:

- 静的コンテンツ: HTML、CSS、JavaScript、画像。
- 動的処理: API、認証、データ保存、イベント処理。
- 例: Todo 一覧表示、Todo 作成、Todo 保存。

### L09-D05 Azure Static Web Apps の役割

目的: Static Web Apps が SPA/静的サイトのホスティングと開発ワークフローを支えることを説明する。

構成:

- GitHub または Azure DevOps。
- ビルドとデプロイ。
- Static Web Apps。
- グローバルな静的コンテンツ配信。
- 統合 API。
- 認証、ルーティング、プレビュー環境。

### L09-D06 SPA から Azure Functions HTTP API への通信

目的: SPA のバックエンド処理を Azure Functions が受ける基本構成を説明する。

構成:

- ブラウザー内の SPA。
- `/api/todos` のような API 呼び出し。
- Azure Functions HTTP trigger。
- データストアへの読み書き。
- JSON 応答。

### L09-D07 Static Web Apps と統合 API の関係

目的: Static Web Apps と API の連携で、フロントエンドとバックエンドを近い体験で扱えることを示す。

構成:

- Static Web Apps の枠内に静的アセットと統合 API の入口を配置する。
- Functions を API 実装として示す。
- CORS 設定を個別に意識しにくいリバースプロキシ的な入口をラベルで示す。
- 「詳細な認証/認可設計は本回では入口のみ」と注記する。

### L09-D08 Static Web Apps の認証とルーティングの入口

目的: Static Web Apps が認証プロバイダー連携やロールベースのルーティングを支援することを示す。

構成:

- 利用者。
- 認証プロバイダー。Microsoft Entra ID、GitHub など。
- Static Web Apps。
- 公開ページ、ログイン後ページ、API。
- ロールとルーティング規則。

### L09-D09 Cosmos DB の位置づけ

目的: Cosmos DB が NoSQL データストアとして SPA/API 構成で利用される場面を説明する。

構成:

- Functions API。
- Cosmos DB。
- ドキュメントデータ、柔軟なスキーマ。
- MongoDB API、NoSQL API など API の種類があることを補足する。
- グローバル分散、低遅延、スケールをキーワードとして置く。

### L09-D10 Azure SQL Database の位置づけ

目的: Azure SQL Database がマネージドなリレーショナルデータベースとして選択される場面を説明する。

構成:

- Functions API またはアプリケーション。
- Azure SQL Database。
- テーブル、リレーション、SQL、トランザクション。
- 自動バックアップ、高可用性、スケール変更を PaaS 機能として示す。

### L09-D11 同期 API と非同期イベントの違い

目的: API 呼び出しだけでなく、非同期処理やイベント駆動が必要になる場面を示す。

構成:

- 同期 API: 画面が API 応答を待つ。
- 非同期イベント: 画面の処理とは別に、通知、集計、メール送信、ログ処理が動く。
- API、キュー、イベント、ストリームの違いをラベルで示す。

### L09-D12 Event Grid、Event Hubs、Service Bus の使い分け

目的: 3つのイベント系サービスを、初心者が混同しないように整理する。

構成:

- Event Grid: 何かが起きた通知。
- Event Hubs: 大量のイベントを取り込むストリーム。
- Service Bus: 確実に処理したい業務メッセージ。
- それぞれの代表シナリオを1つずつ添える。

### L09-D13 公式サンプルアプリの全体構成

目的: Microsoft 公式サンプルアプリを、操作手順ではなくアーキテクチャとして読む。

構成:

- GitHub リポジトリ。
- Azure Developer CLI/Bicep は「教材では実行しない」と注記する。
- Azure Static Web Apps。
- Azure Function Apps。
- Azure Cosmos DB API for MongoDB。
- Azure Key Vault。
- Azure Monitor。
- 単一リソースグループに作られる構成であることを補足する。

### L09-D14 サンプルに含まれる Key Vault、Monitor、Managed Identity

目的: 第8回と第11回のサービスが、実アプリ構成にも登場することを示す。

構成:

- Function Apps の Managed Identity。
- Key Vault に格納された Cosmos DB 接続文字列。
- Azure Monitor/Application Insights による監視とログ。
- 第8回: Key Vault/ID。
- 第11回: Monitor。

### L09-D15 第8回管理系サービスとの接続

目的: SPA 構成でも管理系サービスが不要になるわけではないことを説明する。

構成:

- Static Web Apps、Functions、DB の構成。
- 周囲に Entra ID、RBAC、Key Vault、Cost Management、Backup/DR、Service Health を配置する。

### L09-D16 第10回 AI 回への接続

目的: AI アプリでも、画面、API、データ、イベントの見方が役立つことを示す。

構成:

- SPA/フロントエンド。
- API。
- AI サービス。
- データ/検索。
- イベント処理。
- 第10回で AI サービス側を深掘りすることを示す。

### L09-D17 第11回監視回への接続

目的: SPA とサーバーレス構成で、監視対象が複数に分かれることを示す。

構成:

- Static Web Apps。
- Functions。
- Cosmos DB または SQL Database。
- Event Grid/Event Hubs/Service Bus。
- Azure Monitor、Application Insights、Log Analytics は第11回で扱うと示す。

### L09-D18 今日のまとめ

目的: 本回の判断軸を短く持ち帰らせる。

構成:

- 画面をどこで配るか。Static Web Apps。
- 処理をどこで受けるか。Functions。
- データをどこに置くか。Cosmos DB、Azure SQL Database。
- イベントをどう流すか。Event Grid、Event Hubs、Service Bus。

### L09-T01 Web 3層、静的 Web サイト、SPA の比較

| 観点 | Web 3層 | 静的 Web サイト | SPA |
| --- | --- | --- | --- |
| 基本の見方 | Web 層、AP 層、DB 層を分ける | HTML/CSS/JavaScript/画像を配信する | 初回ロード後、ブラウザー側で画面処理を進める |
| 動的処理 | AP 層が担当する | 原則として持たない | API を呼び出して実行する |
| データ保存 | DB 層が担当する | 原則として持たない | API 経由で DB やストレージに保存する |
| 向いている例 | 業務 Web アプリ、既存サーバー構成 | ドキュメント、ランディングページ、静的コンテンツ | Todo、管理画面、ポータル、対話的な画面 |
| 注意点 | 構成要素と運用対象が増えやすい | 動的処理は別途必要 | API、認証、データ、監視も設計が必要 |

### L09-T02 Static Web Apps の主要機能

| 機能 | 初心者向け説明 | 注意点 |
| --- | --- | --- |
| 静的コンテンツホスティング | HTML、CSS、JavaScript、画像を配信する | サーバー側処理そのものを実行する場所ではない |
| 統合 API | Azure Functions などと組み合わせて API を提供できる | API の設計、認証、エラー処理は必要 |
| GitHub/Azure DevOps 連携 | コード変更をきっかけにビルドとデプロイを自動化できる | 本回では CI/CD 設定は扱わない |
| 認証/認可 | Microsoft Entra ID や GitHub などの認証プロバイダーを利用できる | 本番では権限、ロール、API 保護の設計が必要 |
| プレビュー環境 | Pull request ごとに確認用環境を作れる | チーム開発時の確認用途。詳細は扱わない |
| SSL/カスタムドメイン | HTTPS と独自ドメインの設定を支援する | DNS と証明書の詳細は扱わない |

### L09-T03 Azure Functions の代表的なトリガー

| トリガー | 何をきっかけに動くか | 代表的な用途 |
| --- | --- | --- |
| HTTP trigger | HTTP リクエスト | SPA から呼び出す API |
| Timer trigger | 時刻やスケジュール | 定期実行、クリーンアップ、集計 |
| Blob trigger | Blob の作成や更新 | ファイルアップロード後の処理 |
| Queue trigger | キューにメッセージが入る | 非同期ジョブ、バックグラウンド処理 |
| Event Grid trigger | Event Grid のイベント | リソース変更やカスタムイベントへの反応 |
| Event Hubs trigger | Event Hubs のイベントストリーム | テレメトリ、ログ、IoT データ処理 |
| Service Bus trigger | Service Bus のキュー/トピック | 信頼性が必要な業務メッセージ処理 |

### L09-T04 Cosmos DB と Azure SQL Database の使い分け

| 観点 | Cosmos DB | Azure SQL Database |
| --- | --- | --- |
| データモデル | ドキュメント、キー値、グラフ、テーブルなどの NoSQL | テーブル、リレーション、SQL |
| 向いているデータ | 柔軟なスキーマ、ユーザープロファイル、カタログ、IoT データ | 明確な関係を持つ業務データ、トランザクション、集計 |
| スケールの考え方 | グローバル分散、低遅延、高スループットを重視 | SQL Server と共通のデータベース機能、PaaS 機能を重視 |
| 開発者体験 | API for NoSQL、API for MongoDB などを選ぶ | T-SQL、SQL Server 系ツールや知識を使いやすい |
| 注意点 | パーティション、RU、整合性などの設計が必要 | テーブル設計、インデックス、接続、性能設計が必要 |
| 本回での扱い | 公式サンプルでは API for MongoDB を利用 | 代表的な RDBMS 選択肢として比較する |

### L09-T05 Event Grid、Event Hubs、Service Bus の違い

| サービス | 代表的な問い | 向いているシナリオ | 初心者向けの言い換え |
| --- | --- | --- | --- |
| Event Grid | 何かが起きたことを誰に知らせるか | リソース変更通知、サーバーレス起動、イベントルーティング | 通知を配る |
| Event Hubs | 大量のイベントをどう取り込むか | IoT テレメトリ、ログ、クリックストリーム、リアルタイム分析 | 大量の流れを受ける |
| Service Bus | 処理すべき業務メッセージをどう確実に渡すか | 注文処理、業務ワークフロー、キュー、トピック、デッドレター | 確実に渡して処理する |

### L09-T06 公式サンプルアプリの構成要素

| 構成要素 | サンプルでの役割 | 本講座での扱い |
| --- | --- | --- |
| React フロントエンド | Todo アプリの画面 | SPA の画面例として読む |
| Azure Static Web Apps | Web フロントエンドのホスト | 静的配信と統合 API の入口として説明する |
| Azure Function Apps | Node.js API バックエンド | SPA から呼び出す API として説明する |
| Azure Cosmos DB API for MongoDB | Todo データの保存 | NoSQL データストア例として説明する |
| Azure Key Vault | Cosmos DB 接続文字列などの秘密情報保護 | 第8回の Key Vault と接続する |
| Azure Monitor | 監視とログ | 第11回の監視サービスへ接続する |
| Azure Developer CLI / Bicep | インフラ作成とデプロイ | 本回では実行しない。アーキテクチャ読解のみ |

補足:

- 参照日: 2026年5月13日。
- README では対応リージョンとして Central US、East Asia、East US 2、West Europe、West US 2 が示されていた。
- 本講座ではデプロイしないため、Japan East 既定リージョンの制約は発生しない。
- 講師が別途デモ環境を作る場合は、サンプルの対応リージョンから最寄りの利用可能リージョンを選び、教材内で理由を説明する。

### L09-T07 Web 3層と SPA を選ぶ判断軸

| 判断軸 | Web 3層寄り | SPA/Static Web Apps 寄り |
| --- | --- | --- |
| 画面の性質 | サーバー側で画面を生成する構成が中心 | ブラウザー側で画面を切り替える構成が中心 |
| チーム構成 | サーバーサイド中心の開発チーム | フロントエンドと API を分けて開発するチーム |
| 更新頻度 | サーバー側アプリ全体をまとめて更新 | フロントエンドと API を分けて更新しやすい |
| 既存資産 | 既存のサーバーアプリ、RDBMS、社内標準が強い | 新規開発、静的配信、サーバーレス API に向く |
| 注意点 | サーバー、OS、ミドルウェア、スケールの設計 | API、認証、データ、監視、ビルドの設計 |

### L09-T08 SPA 構成で確認する設計項目

| 設計項目 | 確認すること | 関連サービス |
| --- | --- | --- |
| 画面配信 | どこから HTML/CSS/JavaScript を配るか | Static Web Apps、Storage static website、CDN |
| API | どの API をどの認証で呼ぶか | Azure Functions、Container Apps、API Management |
| データ | データの形と更新頻度は何か | Cosmos DB、Azure SQL Database、Storage |
| シークレット | 接続文字列やキーをどこで守るか | Key Vault、Managed Identity |
| 認証/認可 | 誰がどの画面/APIを使えるか | Microsoft Entra ID、Static Web Apps authentication、RBAC |
| イベント | 同期処理でよいか、非同期処理が必要か | Event Grid、Event Hubs、Service Bus |
| 監視 | 画面、API、DB、イベントをどう見るか | Azure Monitor、Application Insights、Log Analytics |
| コスト | 使った分だけ増える項目は何か | Cost Management、予算、タグ |

## スクリーンショット取得指示

本回は座学のみのため、スクリーンショットは必須ではありません。
HTML 詳細版やスライドで画面例を添える場合は、次の任意素材を取得します。
いずれもサブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、課金金額、シークレット、接続文字列、顧客名、組織名が写らないようにマスクします。

| スクリーンショットID | 対象画面 | 用途 | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- |
| L09-SS01 | 公式 GitHub サンプルの README 冒頭 | サンプルが公式リポジトリであることを示す | Star 数やユーザー情報は不要。README のタイトルと概要が見える範囲にする | GitHub ログイン名、ブラウザーの個人情報 |
| L09-SS02 | 公式サンプル README の Application Architecture 図 | サンプル構成を読む題材として使う | 参照日を教材本文に明記する。画像差し替えがないか公開前に再確認する | なし。必要に応じて URL バーを隠す |
| L09-SS03 | Azure Static Web Apps の Overview | Static Web Apps の入口画面例を示す | デモ用リソースを使う。実環境名を写さない | リソース名、URL、サブスクリプション ID、リソース ID |
| L09-SS04 | Static Web Apps の Configuration または Functions 連携画面 | API 連携や構成画面の雰囲気を示す | 認証設定やシークレット値が見えない画角にする | アプリ設定値、シークレット、リソース名 |
| L09-SS05 | Azure Functions の Overview | API バックエンドの入口画面を示す | 関数 URL やキーを表示しない | 関数 URL、キー、リソース名、リソース ID |
| L09-SS06 | Azure Cosmos DB または Azure SQL Database の Overview | データストアの入口画面を示す | 接続文字列、キー、エンドポイント詳細を表示しない | 接続文字列、キー、アカウント名、サーバー名、エンドポイント |
| L09-SS07 | Event Grid、Event Hubs、Service Bus のポータル入口例 | イベント系サービスの名前と入口を示す | 実運用のトピック名、キュー名、イベント数を写さない | リソース名、メッセージ数、イベント数、リソース ID |
| L09-SS08 | サンプルのデプロイ済み Todo アプリ画面 | サンプルアプリのユーザー体験例を示す | 講師が別途デモ環境を持つ場合のみ。URL やテナント情報を写さない | URL、ユーザー名、メールアドレス、Todo 内容 |

## ハンズオン手順案

本回はハンズオンは行いません。
Azure Portal で新しいリソースを作成せず、Azure CLI、Azure Developer CLI、IaC も利用しません。
公式サンプルアプリは、受講者に実行させず、アーキテクチャ解説用に README と構成図を読むだけにします。

HTML 詳細版では、操作完了チェックリストではなく、次の理解確認チェックリストを用意します。

| チェック項目 | 確認する内容 | 期待状態 |
| --- | --- | --- |
| 1 | Web 3層と SPA の違い | Web 3層は Web/AP/DB の役割分担、SPA はブラウザー/API/データの役割分担として説明できる |
| 2 | 静的 Web サイトの意味 | 静的ファイル配信だけでは、ログインやデータ保存などの動的処理は完結しないと説明できる |
| 3 | Static Web Apps の役割 | 静的ホスティング、統合 API、認証、CI/CD、プレビュー環境の入口を説明できる |
| 4 | Azure Functions の役割 | SPA から呼ばれる HTTP API やイベント処理をサーバーレスに実装するサービスだと説明できる |
| 5 | Cosmos DB と SQL Database の違い | 柔軟な NoSQL とリレーショナル SQL の代表的な使い分けを説明できる |
| 6 | イベント系サービスの違い | Event Grid、Event Hubs、Service Bus を通知、取り込み、業務メッセージングとして説明できる |
| 7 | 公式サンプルの読み方 | 公式サンプルが SWA、Functions、Cosmos DB、Key Vault、Monitor を組み合わせた構成例だと説明できる |
| 8 | 本回で実行しない理由 | 公式サンプルは azd/Bicep 前提のため、講義ではデプロイせず構成を読むだけだと説明できる |

## よくある理解のつまずき

| つまずき | 起きやすい誤解 | 講師の説明 |
| --- | --- | --- |
| 静的 Web サイトはアプリではないと思う | HTML を置くだけなので業務アプリには使えないと思う | SPA と API を組み合わせると、静的配信を入口にした対話的なアプリを構成できると説明する |
| SPA ならバックエンドが不要だと思う | 画面処理がブラウザー側なら、サーバーや API は不要だと思う | データ保存、認証、権限、外部連携には API やデータストアが必要になると説明する |
| Static Web Apps と Storage static website を混同する | どちらも静的ファイルを置くので同じだと思う | Static Web Apps は CI/CD、統合 API、認証、プレビュー環境などアプリ開発向け機能を持つと説明する |
| Azure Functions は HTTP API だけだと思う | Functions は Web API のためだけのサービスだと思う | HTTP 以外にも Timer、Blob、Queue、Event Grid、Event Hubs、Service Bus などをきっかけに動くと説明する |
| Cosmos DB と SQL Database を名前だけで選ぶ | NoSQL が新しいから常に Cosmos DB がよい、または SQL が慣れているから常に SQL がよいと思う | データの形、クエリ、整合性、トランザクション、スケール、チーム経験で選ぶと説明する |
| Event Grid、Event Hubs、Service Bus を混同する | どれもイベントなので同じ用途だと思う | Event Grid は通知、Event Hubs は大量取り込み、Service Bus は信頼性の高い業務メッセージングと分ける |
| 公式サンプルを講義中に実行するものだと思う | GitHub に手順があるので受講者がデプロイすると思う | 本回は座学であり、サンプルは azd/Bicep 前提のため、構成を読むだけにすると明確に伝える |
| Static Web Apps の認証だけで本番認証設計が完了すると思う | 組み込み認証があれば API 保護やロール設計は不要だと思う | 認証プロバイダー、ロール、API 保護、監査、秘密情報管理を合わせて設計する必要があると説明する |
| サーバーレスは必ず安いと思う | 使った分だけなので常に低コストだと思う | トラフィック、ビルド、API 呼び出し、DB、ログ量でコストが変わるため、Cost Management と監視が必要と説明する |

## 講師が見る確認ポイント

- 受講者が Web 3層と SPA を、優劣ではなく処理の置き場所の違いとして説明できているか。
- 静的コンテンツ、API、データストア、イベントの役割を分けて説明できているか。
- Static Web Apps を単なる静的ファイル置き場ではなく、Web アプリ開発ワークフローを支えるサービスとして理解しているか。
- Azure Functions を HTTP API だけでなく、イベント駆動で動くサーバーレス処理として理解しているか。
- Cosmos DB と Azure SQL Database の違いを、NoSQL と RDBMS の性質から説明できているか。
- Event Grid、Event Hubs、Service Bus の使い分けを、通知、ストリーミング、業務メッセージングの観点で説明できているか。
- 公式サンプルの構成図を見て、Static Web Apps、Function Apps、Cosmos DB、Key Vault、Azure Monitor の役割を読み取れているか。
- 本回では公式サンプルを実行しない理由を理解しているか。
- Azure Monitor の詳細に入りすぎず、第11回に接続できているか。

## 復旧できない場合のスキップ手順

本回は座学のみのため、Azure リソース作成失敗による復旧手順はありません。
ただし、時間不足や公式サンプルの参照先変更がある場合は、次の順に扱います。

1. 必須として、Web 3層と SPA の違いを `L09-T01` で説明する。
2. 必須として、Static Web Apps と Azure Functions の関係を `L09-D07` で説明する。
3. 必須として、Cosmos DB と Azure SQL Database の使い分けを `L09-T04` で説明する。
4. 必須として、Event Grid、Event Hubs、Service Bus の違いを `L09-T05` で説明する。
5. 公式サンプルの GitHub ページが参照できない場合は、事前取得済みのスクリーンショットまたは `L09-D13` の構成整理図で進行する。
6. 時間が不足した場合、Static Web Apps の認証、プレビュー環境、カスタムドメインの詳細は参考資料への誘導に留める。
7. さらに時間が不足した場合、公式サンプルの azd/Bicep、リージョン制約、Key Vault/Monitor は講師向け補足に回す。

Azure Portal の画面例を見せる予定で Portal が利用できない場合は、スクリーンショット素材または図表のみで進行します。
本回では実操作がないため、Portal 障害、GitHub 障害、権限不足があっても講義内容は継続できます。

## クリーンアップ手順

本回では Azure リソースを作成しないため、受講者によるクリーンアップはありません。

講師がデモ用に公式サンプルまたは類似構成を別途デプロイした場合は、講座後に次を確認します。

- デモ用リソースグループを削除したこと。
- Azure Static Web Apps、Function Apps、Cosmos DB、Key Vault、Application Insights、Log Analytics などの関連リソースが残っていないこと。
- Azure Developer CLI を使った場合は、講師環境で `azd down` などの削除手順が完了していること。
- GitHub Actions、Azure DevOps、Azure Developer CLI の認証情報や環境設定が不要になっていないか確認すること。
- スクリーンショットや録画に、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、URL、接続文字列、シークレット、課金情報が写っていないこと。
- 公式サンプルの対応リージョン外にデプロイしようとして失敗したリソースが残っていないこと。

## 振り返り

本回のまとめは次の4点です。

1. Web 3層は Web/AP/DB の役割分担、SPA はブラウザー/API/データの役割分担として考えると理解しやすい。
2. Azure Static Web Apps は、静的コンテンツの配信だけでなく、統合 API、認証、CI/CD、プレビュー環境を支える Web アプリ向けサービスである。
3. SPA 構成では、API に Azure Functions、データに Cosmos DB や Azure SQL Database、非同期処理に Event Grid、Event Hubs、Service Bus などを組み合わせて考える。
4. 公式サンプルは、Static Web Apps、Functions、Cosmos DB、Key Vault、Azure Monitor を組み合わせた構成例として読み、講義中にはデプロイしない。

次回は、オフサイトの AI アプリ構築につなげるため、Microsoft Foundry、Azure OpenAI、AI エージェント、Copilot Studio との使い分けを扱います。

## 確認クイズ案

### Q1

Web 3層アーキテクチャと SPA アーキテクチャの説明として最も適切なものはどれですか。

1. Web 3層は必ず3台のサーバーを使い、SPA は必ずサーバーを使わない。
2. Web 3層は Web/AP/DB の役割分担として考え、SPA はブラウザー/API/データの役割分担として考える。
3. Web 3層は Azure では使えず、SPA だけが Azure で使える。
4. SPA はデータ保存を一切必要としない。

正解: 2

### Q2

Azure Static Web Apps の説明として最も適切なものはどれですか。

1. VM の OS パッチを管理するサービスである。
2. 静的コンテンツのホスティング、統合 API、認証、CI/CD 連携などを支援する Web アプリ向けサービスである。
3. RDBMS のインデックスを自動作成するサービスである。
4. Azure の請求書を表示するサービスである。

正解: 2

### Q3

SPA から呼び出される API をサーバーレスに実装する代表的なサービスはどれですか。

1. Azure Functions
2. Azure DNS
3. Azure Route Table
4. Azure Site Recovery

正解: 1

### Q4

Cosmos DB と Azure SQL Database の使い分けとして最も適切なものはどれですか。

1. Cosmos DB は必ずリレーショナルデータに使い、Azure SQL Database は必ず画像ファイルの保存に使う。
2. Cosmos DB は柔軟な NoSQL データやグローバル分散に向き、Azure SQL Database はリレーショナルデータや SQL を使う業務データに向く。
3. Cosmos DB と Azure SQL Database は完全に同じサービスなので、名前だけで選んでよい。
4. Azure SQL Database は Azure 上では使えない。

正解: 2

### Q5

Event Grid、Event Hubs、Service Bus の説明として最も適切なものはどれですか。

1. Event Grid は通知、Event Hubs は大量イベント取り込み、Service Bus は信頼性の高い業務メッセージングに向く。
2. Event Grid は VM 作成専用、Event Hubs は DNS 専用、Service Bus は画像配信専用である。
3. 3つは同じサービスで、料金だけが違う。
4. 3つともデータベースサービスである。

正解: 1

### Q6

本回で Microsoft 公式サンプルアプリを扱う目的として最も適切なものはどれですか。

1. 受講者が講義中に `azd up` を実行し、Azure リソースを作成するため。
2. React、Static Web Apps、Functions、Cosmos DB、Key Vault、Monitor の役割を、構成図から読み取るため。
3. 第8回の Cost Management を操作するため。
4. 第10回の AI エージェントを実装するため。

正解: 2

### Q7

公式サンプルアプリを本回で実行しない理由として最も適切なものはどれですか。

1. Azure では Static Web Apps が利用できないため。
2. サンプルは Azure Developer CLI と Bicep によるデプロイ前提であり、本講座の座学回と Portal-first/no-IaC 制約に合わないため。
3. サンプルには Azure サービスが含まれていないため。
4. サンプルは第11回の監視回でのみ利用できるため。

正解: 2

## 講師向け補足

- 本回は SPA と関連サービスの入口を扱う回であり、Static Web Apps の操作手順回にしない。
- Web 3層と SPA は優劣ではなく、処理の置き場所、デプロイ単位、開発体験が異なる構成として説明する。
- Static Web Apps は便利だが、認証、API 保護、データストア、シークレット、監視、コストは別途設計が必要であることを必ず補足する。
- 公式サンプル `Azure-Samples/todo-nodejs-mongo-swa-func` は、2026年5月13日時点で README を確認済み。公開前に README、アーキテクチャ図、対応リージョン、利用サービスが変わっていないか再確認する。
- 公式サンプルは Azure Developer CLI と Bicep 前提のため、本講座の受講者には実行させない。受講者が興味を持った場合は、個人環境で実行する場合の前提として Contributor 権限、対応リージョン、コスト、削除手順が必要だと伝える。
- README では対応リージョンとして Central US、East Asia、East US 2、West Europe、West US 2 が示されていた。Japan East 既定ではない点に注意する。
- サンプルでは Azure Key Vault と Azure Monitor が登場するが、Key Vault は第8回、Azure Monitor は第11回の範囲に接続する程度に留める。
- Event Grid、Event Hubs、Service Bus は情報量が多いため、詳細な SDK、リトライ、順序保証、パーティション設計には入らない。
- Cosmos DB の RU、パーティションキー、整合性レベル、Azure SQL Database のインデックスや可用性設計は、初心者には深追いしない。

## 参考資料

- [Microsoft Learn: Azure Static Web Apps とは](https://learn.microsoft.com/ja-jp/azure/static-web-apps/overview)
- [Microsoft Learn: Azure Functions とは](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-overview)
- [Microsoft Learn: Azure Cosmos DB の概要](https://learn.microsoft.com/ja-jp/azure/cosmos-db/introduction)
- [Microsoft Learn: Azure Cosmos DB for MongoDB とは](https://learn.microsoft.com/ja-jp/azure/cosmos-db/mongodb/introduction)
- [Microsoft Learn: Azure SQL Database ドキュメント](https://learn.microsoft.com/ja-jp/azure/azure-sql/database/)
- [Microsoft Learn: Azure SQL Database と Azure SQL Managed Instance の機能比較](https://learn.microsoft.com/ja-jp/azure/azure-sql/database/features-comparison)
- [Microsoft Learn: Azure Event Grid とは](https://learn.microsoft.com/ja-jp/azure/event-grid/overview)
- [Microsoft Learn: Azure Event Hubs とは](https://learn.microsoft.com/ja-jp/azure/event-hubs/event-hubs-about)
- [Microsoft Learn: Azure Service Bus とは](https://learn.microsoft.com/ja-jp/azure/service-bus-messaging/service-bus-messaging-overview)
- [GitHub: Azure-Samples/todo-nodejs-mongo-swa-func](https://github.com/Azure-Samples/todo-nodejs-mongo-swa-func/tree/main/)

参考資料は教材本文の主軸にはせず、受講者が復習するときの入口として提示します。