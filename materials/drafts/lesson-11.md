# 第11回 Azure の監視サービス ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第11回
- タイトル: Azure の監視サービス
- 形式: オンライン座学
- 時間: 60分 (50分レクチャー、10分QA)
- 想定日: 2026年9月10日

## この回の位置づけ

第11回は、第3回から第10回までに扱った Azure リソースやアプリケーション構成を、運用と監視の観点で見直す回です。
第6回までに VM、コンテナ、Container Apps、PostgreSQL を使ってアプリケーション基盤を作り、第7回から第10回ではネットワーク、管理系サービス、SPA、AI サービスへ視野を広げました。
本回では、それらのリソースが動いているか、遅くなっていないか、エラーが起きていないか、誰かが設定を変えていないかを、Azure Portal 上のどこで確認するのかを整理します。

中心に扱うのは Azure Monitor です。
Azure Monitor を軸に、メトリック、ログ、Log Analytics、Application Insights、診断設定、Azure Monitor Agent、アラート、Workbooks、Activity log、Service Health/Resource Health の関係を、初心者が混同しやすい点に注意しながら説明します。

Azure Landing Zone の設計領域で見ると、本回は主に「管理」を対象とします。
監視データの集約、アラート、可視化、運用時の確認フローは「管理」の中心的なテーマです。
あわせて、ログの収集範囲や保持期間は「ガバナンス」と「コスト管理」、監査ログや権限の確認は「セキュリティ」と「ID 管理とアクセス管理」、ワークスペースやタグの考え方は「リソースの編成」にも関係します。

本回では Azure リソースは作成しません。
Azure Portal の画面は、講師が取得したスクリーンショットまたはデモ環境を使って確認します。
KQL の詳細や本格的な監視基盤設計には踏み込まず、障害や性能問題が起きたときに「まずどこを見るか」を説明できる状態を目指します。

## 受講前提

- 第2回で、Web 3層アーキテクチャ、Web 層、AP 層、DB 層の役割を学んでいることが望ましい。
- 第3回から第6回までで、VM、ACI、Container Apps、ACR、PostgreSQL、GitHub Actions などの名前を見たことがあることが望ましい。
- 第7回で、VNet、NSG、Private Endpoint、Private DNS Zone などネットワークの基本を学んでいることが望ましい。
- 第8回で、Microsoft Entra ID、Azure RBAC、Policy、Defender for Cloud、Key Vault、Cost Management、Backup、Site Recovery、Service Health などの入口を学んでいることが望ましい。
- 第9回で、Static Web Apps、Functions、Cosmos DB、イベント系サービスを組み合わせた SPA 構成を学んでいることが望ましい。
- 第10回で、AI アプリケーションや AI エージェントにも評価、トレース、監視が必要であることを概要レベルで学んでいることが望ましい。
- 監視設計、ログ分析、KQL、SRE、SIEM/SOAR の経験は不要。
- 本回は座学のみで、Azure Portal、Azure CLI、SDK、IaC の操作は行わない。

## 到達目標

- Azure Monitor が、Azure リソース、アプリケーション、インフラストラクチャの監視データを集め、分析し、可視化し、アラートにつなげる中心的なサービスであることを説明できる。
- メトリックとログの違いを、数値の時系列データと詳細なイベント/記録データの違いとして説明できる。
- Log Analytics が、Azure Monitor Logs に格納されたログを Azure Portal 上で探索、集計、分析するための入口であることを説明できる。
- Application Insights が、アプリケーションの要求、例外、依存関係、応答時間、可用性を追跡する APM 機能であることを説明できる。
- 診断設定と Azure Monitor Agent の違いを、PaaS/リソースログを送る設定と、VM/Arc のゲスト OS からデータを集めるエージェントの違いとして説明できる。
- VM、Container Apps、Azure Database for PostgreSQL、ネットワーク、アプリケーションで、代表的に確認すべき監視項目が異なることを理解できる。
- 障害や性能問題が発生したときに、Azure Portal で Overview、Metrics、Activity log、Logs、Application Insights、Alerts、Service Health/Resource Health を確認する流れを説明できる。

## 受講後に説明できること/操作できること

- Azure Monitor、Azure Monitor Metrics、Azure Monitor Logs、Log Analytics、Application Insights、診断設定、Azure Monitor Agent、アラート、Workbooks の役割を説明できる。
- メトリックは「すばやく状態や傾向を見る」、ログは「原因や詳細を調べる」と説明できる。
- Activity log は Azure リソースに対する管理操作、リソースログはリソース内部やデータプレーンの動作を記録するものだと説明できる。
- 診断設定は、リソースログ、プラットフォームメトリック、Activity log を Log Analytics、Storage、Event Hubs などへ送る設定だと説明できる。
- Azure Monitor Agent は、VM や Azure Arc 対応サーバーのゲスト OS からイベントログ、Syslog、パフォーマンスカウンターなどを集めるために使うと説明できる。
- VM ではホストレベルとゲスト OS レベル、Container Apps ではリビジョン、レプリカ、コンテナログ、PostgreSQL では CPU、メモリ、ストレージ、接続数、クエリ/サーバーログを見る、と説明できる。
- 障害時には、Azure 全体の問題、リソースの状態、最近の変更、メトリックの変化、アプリケーション例外、ログの詳細を順に切り分けると説明できる。

## 本回で扱う範囲

- Azure Monitor の全体像
- Azure Monitor Metrics と Azure Monitor Logs
- メトリック、ログ、トレース、Activity log、Resource Health、Service Health の大まかな違い
- Log Analytics ワークスペースと Log Analytics 画面の位置づけ
- Application Insights の位置づけと代表的な確認項目
- 診断設定の役割、送信元、送信先、注意点
- Azure Monitor Agent と Data Collection Rule の入口
- アラート、アクション グループ、推奨アラートの入口
- Workbooks、Azure ダッシュボード、Grafana など可視化の入口
- VM、Container Apps、Azure Database for PostgreSQL、ネットワーク、アプリケーションの代表的な監視観点
- 障害時、性能問題時、デプロイ後確認時に Azure Portal で見る場所
- ログ収集と保持期間がコストに影響するという基本的な注意点

## 本回で扱わない範囲

- KQL の詳細な構文、クエリ最適化、ログテーブル設計
- 本番向けの監視基盤アーキテクチャ設計、複数ワークスペース設計、長期保持設計
- SRE プラクティス全般、SLO/SLI/Error Budget の詳細設計
- SIEM/SOAR、Microsoft Sentinel、Defender XDR の詳細
- OpenTelemetry SDK、Application Insights SDK、自動インストルメンテーションの実装手順
- Prometheus、Managed Prometheus、Azure Managed Grafana の詳細設計
- Network Watcher、NSG flow logs、Connection Monitor などネットワーク監視機能の詳細操作
- Azure Monitor Agent のデプロイ手順、Data Collection Rule の詳細設定
- アラートの大規模展開、Azure Monitor Baseline Alerts、Azure Policy による監視設定の自動化
- ログコスト最適化の詳細設計、テーブルプラン、変換、アーカイブ、検索ジョブの深掘り
- Azure Portal 操作ハンズオン、Azure CLI、PowerShell、Bicep、Terraform による構築

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | 運用と監視の必要性 | 作って終わりではなく、動き続ける状態を確認する必要があることを理解する |
| 5-15分 | Azure Monitor 全体像 | 監視データ、分析、可視化、アラートの関係をつかむ |
| 15-25分 | メトリック、ログ、Log Analytics | メトリックとログの違い、Log Analytics の役割を整理する |
| 25-35分 | Application Insights、診断設定、AMA | アプリ監視、リソースログ収集、VM ゲストデータ収集の違いを理解する |
| 35-45分 | リソース別監視観点 | VM、Container Apps、PostgreSQL、ネットワーク、アプリケーションで見る場所を整理する |
| 45-50分 | 障害時の確認フロー | 障害時に Azure Portal で順に確認する流れを持ち帰る |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は35枚です。座学中心の回として25枚から35枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | Azure の監視サービス | この回では、Azure 上のシステムを運用するときに何をどこで確認するかを学びます。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | 今日は監視サービス名を覚えるよりも、障害時に見る場所を持ち帰ります。 | 到達目標、座学のみ、ハンズオンなし | L11-D01 |
| 3 | 第3回から第12回への接続 | これまで作った VM、コンテナ、DB、SPA、AI アプリは、運用時には監視対象として見直します。 | 既習リソースと本回の接続、第12回への橋渡し | L11-D01 |
| 4 | 作った後に必要なこと | クラウドではリソースを作成できても、正常に動き続けているとは限りません。 | 可用性、性能、エラー、設定変更、利用状況、コスト | L11-D02 |
| 5 | 監視で答えたい問い | 監視は、正常か、何が変わったか、どこが遅いか、誰に知らせるかを答えるために行います。 | 状態確認、原因調査、傾向把握、通知、改善 | L11-T01 |
| 6 | Landing Zone で見る監視 | 監視は Azure Landing Zone の「管理」を中心に、ガバナンス、セキュリティ、コストにも関係します。 | 管理、ガバナンス、セキュリティ、リソース編成、コスト管理 | L11-D03 |
| 7 | Azure Monitor の全体像 | Azure Monitor は、メトリック、ログ、トレース、イベントを集めて分析と通知につなげる中心です。 | Azure Monitor、データソース、分析、可視化、アラート | L11-D04 |
| 8 | 監視データの入口 | Azure リソース、VM のゲスト OS、アプリケーション、Azure の管理操作では、データの出どころが異なります。 | プラットフォームメトリック、リソースログ、Activity log、Application Insights、AMA | L11-D05 |
| 9 | メトリックとは | メトリックは、CPU 使用率や要求数のように、時間ごとに変化する数値データです。 | 時系列、数値、グラフ、しきい値、メトリックアラート | L11-T02 |
| 10 | メトリックで見るもの | メトリックは、今の状態や傾向をすばやく把握するのに向いています。 | CPU、メモリ、ディスク、接続数、要求数、応答時間、エラー率 | L11-SS02 |
| 11 | ログとは | ログは、何が起きたかを詳しく調べるためのイベントや記録の集まりです。 | リソースログ、アプリログ、イベントログ、Syslog、トレース | L11-T02 |
| 12 | ログで調べること | ログは、エラーの詳細、例外、アクセス、設定変更、依存関係を追うときに使います。 | 原因調査、相関、履歴、KQL は入口だけ | L11-SS03 |
| 13 | メトリックとログの使い分け | まずメトリックで異常の場所と時間を絞り、ログで原因を掘り下げます。 | 使い分け、調査の順番、同じ時間範囲で見る | L11-D06 / L11-T02 |
| 14 | Log Analytics の役割 | Log Analytics は、ログを保存する場所そのものではなく、Azure Portal でログを調べる入口です。 | Log Analytics ワークスペース、Logs 画面、スコープ、簡易モード、KQL モード | L11-D07 |
| 15 | Activity log | Activity log は、Azure リソースに対する作成、更新、削除などの管理操作を確認する場所です。 | コントロールプレーン、誰が何を変えたか、デプロイ失敗、90日保持の入口 | L11-SS07 |
| 16 | Resource Health と Service Health | 障害時は、自分の設定だけでなく Azure 側のサービス影響も確認します。 | Azure Status、Service Health、Resource Health、サービス停止、計画メンテナンス | L11-D08 |
| 17 | Application Insights | Application Insights は、アプリケーションの要求、例外、依存関係、応答時間を追うための APM 機能です。 | Requests、Failures、Performance、Application Map、Availability | L11-D09 / L11-SS05 |
| 18 | アプリケーション マップ | アプリのどこで失敗しているかを見るには、外形ではなく依存関係も含めて追います。 | フロント、API、DB、外部サービス、依存関係、例外 | L11-D09 |
| 19 | 診断設定 | 診断設定は、Azure リソースのログやメトリックを Log Analytics などへ送るための設定です。 | リソースログ、プラットフォームメトリック、Activity log、送信先 | L11-D10 / L11-SS04 |
| 20 | 診断設定の注意点 | リソースログは既定では集まらないことが多く、集めるカテゴリと送信先を選ぶ必要があります。 | Log Analytics、Storage、Event Hubs、カテゴリ、コスト、反映待ち | L11-T03 |
| 21 | Azure Monitor Agent | Azure Monitor Agent は、VM や Arc 対応サーバーのゲスト OS から監視データを集めるために使います。 | VM/Arc、イベントログ、Syslog、パフォーマンス、Data Collection Rule | L11-D11 |
| 22 | 診断設定と AMA の違い | どちらも監視データを送りますが、対象と設定場所が違います。 | PaaS/リソースログと VM ゲスト OS、診断設定、AMA、DCR | L11-T03 |
| 23 | アラート | アラートは、監視データが条件に一致したときに通知や自動アクションへつなげる仕組みです。 | アラートルール、シグナル、条件、アクショングループ、状態 | L11-D12 / L11-SS06 |
| 24 | アラートの種類 | メトリック、ログ、Activity log など、何を条件にするかでアラートの種類が変わります。 | メトリックアラート、ログ検索アラート、Activity log アラート、Service Health アラート | L11-T04 |
| 25 | 可視化の選択肢 | 一覧で見たい情報は、Workbooks、Azure ダッシュボード、Grafana などに集約できます。 | Workbooks、Dashboard、Grafana、Power BI、まずは組み込み画面 | L11-T05 |
| 26 | VM の監視観点 | VM は、Azure ホスト側のメトリックと、ゲスト OS 内部の状態を分けて見ます。 | ホストメトリック、ゲストメトリック、VM insights、ブート診断、AMA | L11-T06 |
| 27 | Container Apps の監視観点 | Container Apps は、リビジョン、レプリカ、ログ、スケール、イングレスを合わせて確認します。 | メトリック、ログストリーミング、Log Analytics、リビジョン、ヘルスプローブ | L11-T06 |
| 28 | PostgreSQL の監視観点 | PostgreSQL は、CPU やストレージだけでなく、接続数、I/O、可用性、サーバーログを確認します。 | CPU、メモリ、ストレージ、IOPS、接続数、is_db_alive、PostgreSQLLogs | L11-T06 |
| 29 | ネットワークの監視観点 | 通信できない問題では、メトリックだけでなく、経路、NSG、DNS、最近の変更を確認します。 | NSG、Public IP、Private Endpoint、DNS、Activity log、Network Watcher の入口 | L11-T06 |
| 30 | アプリケーションの監視観点 | アプリの問題は、インフラの正常性だけではなく、要求、例外、依存関係、ユーザー影響で見ます。 | Application Insights、HTTP 5xx、依存関係失敗、応答時間、可用性 | L11-T06 |
| 31 | 障害時の最初の確認 | 障害時は、Azure 側の影響、リソースの状態、最近の変更、メトリック、ログの順に絞り込みます。 | 確認順序、Service Health、Overview、Activity log、Metrics、Logs | L11-D13 |
| 32 | 性能問題の確認 | 遅いときは、利用者が感じる遅さとリソースの負荷を同じ時間帯で比較します。 | 応答時間、CPU、メモリ、I/O、接続数、依存関係、時間範囲 | L11-D14 |
| 33 | デプロイ後の確認 | デプロイ直後は、成功表示だけでなく、エラー率、起動状態、ログ、アラートを確認します。 | GitHub Actions 後、Container Apps revision、App Insights、PostgreSQL、Activity log | L11-D14 |
| 34 | 監視の落とし穴 | すべてのログを集めれば安心ではなく、必要なデータ、通知、コスト、見直しを考えます。 | 収集しすぎ、通知過多、誰も見ないダッシュボード、保持期間、マスク | L11-T07 |
| 35 | 今日のまとめと確認クイズ | 監視は、サービス名ではなく、異常を見つけ、原因を調べ、次の対応につなげるための流れです。 | 3つのまとめ、確認クイズ、QA への導入 | なし |

## 図表・スクリーンショット素材一覧

本回は座学回のため、受講者が操作するためのスクリーンショットはありません。
ただし、Azure Portal のどこを見るかを理解する回であるため、主要画面のスクリーンショットを任意または準必須の参照画像として用意します。
`L11-Dxx` は AI または draw.io で作成する図表、`L11-Txx` は表、`L11-SSxx` は筆者が提供する Azure Portal スクリーンショットとして管理します。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L11-D01 | 図表 | 必須 | AI で作成 | 第3回から第12回への接続と本回の位置づけ |
| L11-D02 | 図表 | 必須 | AI で作成 | 作った後に必要な運用確認の全体像 |
| L11-D03 | 図表 | 必須 | AI で作成 | Azure Landing Zone の設計領域と監視の関係 |
| L11-D04 | 図表 | 必須 | AI/draw.io で作成 | Azure Monitor 関連サービスの関係図 |
| L11-D05 | 図表 | 必須 | AI/draw.io で作成 | 監視データの入口と流れ |
| L11-D06 | 図表 | 必須 | AI で作成 | メトリックで絞り、ログで掘る調査イメージ |
| L11-D07 | 図表 | 必須 | AI/draw.io で作成 | Log Analytics ワークスペースと Logs 画面の関係 |
| L11-D08 | 図表 | 必須 | AI で作成 | Azure Status、Service Health、Resource Health の粒度の違い |
| L11-D09 | 図表 | 必須 | AI/draw.io で作成 | Application Insights とアプリケーション依存関係 |
| L11-D10 | 図表 | 必須 | AI/draw.io で作成 | 診断設定によるログ/メトリックの送信先 |
| L11-D11 | 図表 | 必須 | AI/draw.io で作成 | Azure Monitor Agent と Data Collection Rule の関係 |
| L11-D12 | 図表 | 必須 | AI/draw.io で作成 | アラートルール、条件、アクショングループの流れ |
| L11-D13 | 図表 | 必須 | AI で作成 | 障害時の確認フロー |
| L11-D14 | 図表 | 必須 | AI で作成 | 性能問題とデプロイ後確認のタイムライン |
| L11-T01 | 表 | 必須 | AI で作成 | 監視で答えたい問いと見る場所 |
| L11-T02 | 表 | 必須 | AI で作成 | メトリックとログの比較 |
| L11-T03 | 表 | 必須 | AI で作成 | 診断設定と Azure Monitor Agent の比較 |
| L11-T04 | 表 | 必須 | AI で作成 | アラート種別の比較 |
| L11-T05 | 表 | 任意 | AI で作成 | Workbooks、Dashboard、Grafana、Power BI の使い分け |
| L11-T06 | 表 | 必須 | AI で作成 | VM、Container Apps、PostgreSQL、ネットワーク、アプリケーションの監視観点一覧 |
| L11-T07 | 表 | 必須 | AI で作成 | 監視の落とし穴と回避策 |
| L11-SS01 | スクリーンショット | 必須 | 筆者が提供 | Azure Monitor Overview 画面 |
| L11-SS02 | スクリーンショット | 必須 | 筆者が提供 | 任意リソースの Metrics 画面 |
| L11-SS03 | スクリーンショット | 必須 | 筆者が提供 | Logs / Log Analytics 画面 |
| L11-SS04 | スクリーンショット | 必須 | 筆者が提供 | Diagnostic settings 画面 |
| L11-SS05 | スクリーンショット | 必須 | 筆者が提供 | Application Insights Overview または Application Map 画面 |
| L11-SS06 | スクリーンショット | 必須 | 筆者が提供 | Azure Monitor Alerts 画面 |
| L11-SS07 | スクリーンショット | 任意 | 筆者が提供 | Activity log 画面 |
| L11-SS08 | スクリーンショット | 任意 | 筆者が提供 | Service Health または Resource Health 画面 |
| L11-SS09 | スクリーンショット | 任意 | 筆者が提供 | Container Apps の Logs または Log stream 画面 |
| L11-SS10 | スクリーンショット | 任意 | 筆者が提供 | Azure Database for PostgreSQL の Metrics または埋め込みダッシュボード画面 |

## 図表案

### L11-D01 第3回から第12回への接続と本回の位置づけ

目的: これまで作った構成を、運用時には監視対象として見ることを示す。

構成:

- 第3回: VM 上の Web サーバ
- 第4回: ACI 上のコンテナ
- 第5回から第6回: ACA + PostgreSQL Todo アプリ
- 第7回: ネットワークと Private Endpoint
- 第8回: 管理、セキュリティ、コスト、バックアップ/DR
- 第9回: Static Web Apps + Functions + データサービス
- 第10回: AI アプリ/AI エージェント
- 第11回: 監視と障害時の確認
- 第12回: 統合実践

### L11-D02 作った後に必要な運用確認の全体像

目的: 作成、デプロイ、運用の間に監視が必要であることを説明する。

構成:

- 左: リソース作成、デプロイ、公開
- 中央: 運用中の問い。動いているか、遅くないか、エラーはないか、変更多発はないか、コストは増えていないか。
- 右: 監視で見る場所。Overview、Metrics、Logs、Application Insights、Alerts、Service Health。

### L11-D03 Azure Landing Zone の設計領域と監視の関係

目的: 本回が主に「管理」を対象にし、周辺設計領域にも関係することを示す。

構成:

- 中央: 管理
- 周辺: ガバナンス、セキュリティ、ID 管理とアクセス管理、リソースの編成、コスト管理
- 例: アラート、ログ保持、監査、RBAC、タグ、ワークスペース、アクション グループ

### L11-D04 Azure Monitor 関連サービスの関係図

目的: Azure Monitor、Metrics、Logs、Log Analytics、Application Insights、診断設定、AMA、Alerts、Workbooks の関係を一枚で示す。

構成:

- 左: データソース
  - Azure リソース
  - VM/Arc サーバー
  - アプリケーション
  - Azure 管理操作
- 中央: 収集/格納
  - Azure Monitor Metrics
  - Azure Monitor Logs / Log Analytics ワークスペース
  - Application Insights
- 右: 利用
  - Metrics Explorer
  - Log Analytics
  - Workbooks / Dashboard
  - Alerts / Action group

### L11-D05 監視データの入口と流れ

目的: どのデータが自動で入り、どのデータは設定が必要かを整理する。

構成:

- プラットフォームメトリック: 多くの Azure リソースから自動収集
- Activity log: 管理操作として自動収集
- リソースログ: 診断設定で送信先を構成
- VM ゲストデータ: Azure Monitor Agent + Data Collection Rule
- アプリテレメトリ: Application Insights / OpenTelemetry / SDK

### L11-D06 メトリックで絞り、ログで掘る調査イメージ

目的: メトリックとログの役割の違いを、調査の流れとして理解させる。

構成:

- 上段: CPU、応答時間、接続数などのメトリックグラフ
- 下段: 同じ時間帯のログ、例外、依存関係エラー
- 矢印: 異常な時間帯を特定する、該当時刻のログを確認する、原因候補を絞る

### L11-D07 Log Analytics ワークスペースと Logs 画面の関係

目的: Log Analytics ワークスペースと Log Analytics 画面を混同しないようにする。

構成:

- Log Analytics ワークスペース: ログデータを格納する場所
- Logs 画面: ワークスペースまたはリソース単位でログを調べる Azure Portal の入口
- テーブル: AzureActivity、ContainerAppConsoleLogs、AppRequests、PGSQLServerLogs などの例を小さく表示

### L11-D08 Azure Status、Service Health、Resource Health の粒度の違い

目的: Azure 側の問題と自分のリソースの問題を切り分ける入口を示す。

構成:

- Azure Status: 全世界/全リージョンの公開状態
- Service Health: 自分のサブスクリプション、利用サービス、リージョンに関係する通知
- Resource Health: 個々のリソースの可用性や状態

### L11-D09 Application Insights とアプリケーション依存関係

目的: Application Insights がインフラではなくアプリケーションの振る舞いを見るための機能であることを示す。

構成:

- ブラウザー/クライアント
- Web/API アプリ
- DB
- 外部 API または AI サービス
- 矢印に request、dependency、exception、trace、availability をラベル付け

### L11-D10 診断設定によるログ/メトリックの送信先

目的: 診断設定はデータの宛先を決める設定であり、分析ツールそのものではないことを示す。

構成:

- 対象リソース: PostgreSQL、Key Vault、Container Apps Environment など
- 診断設定
- 送信先: Log Analytics ワークスペース、Storage account、Event Hubs、パートナーソリューション
- 注意ラベル: 収集カテゴリ、保持期間、コスト

### L11-D11 Azure Monitor Agent と Data Collection Rule の関係

目的: VM 内部のログやパフォーマンスを集めるには、エージェントと収集ルールが必要であることを示す。

構成:

- VM または Azure Arc 対応サーバー
- Azure Monitor Agent
- Data Collection Rule
- 収集対象: Windows Event Logs、Syslog、Performance counters、custom logs
- 送信先: Log Analytics ワークスペース

### L11-D12 アラートルール、条件、アクショングループの流れ

目的: アラートは通知そのものではなく、ルール、条件、通知先を組み合わせることを示す。

構成:

- 監視対象リソース
- シグナル: メトリック、ログ、Activity log
- 条件: しきい値、クエリ条件、イベント条件
- アラート発火
- アクショングループ: メール、Webhook、Logic Apps など

### L11-D13 障害時の確認フロー

目的: 受講者が障害時に見る順番を持ち帰れるようにする。

構成:

1. 影響範囲を確認する
2. Service Health/Resource Health を見る
3. 対象リソースの Overview を見る
4. Activity log で最近の変更を見る
5. Metrics で異常時間帯を絞る
6. Application Insights/Logs で詳細を見る
7. ネットワーク、DB、認証、外部依存を確認する
8. 復旧またはエスカレーションする

### L11-D14 性能問題とデプロイ後確認のタイムライン

目的: 時間軸をそろえて確認する重要性を示す。

構成:

- 横軸: デプロイ前、デプロイ時刻、デプロイ後
- 上段: 応答時間、エラー率
- 中段: CPU、メモリ、接続数、I/O
- 下段: Activity log、GitHub Actions、Container Apps revision、PostgreSQL ログ

## スクリーンショット取得指示

本回のスクリーンショットは、Azure Portal 上で「どこを見るか」を説明するための参照画像です。
実画面を掲載する場合は、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、接続文字列、シークレット、課金情報、実環境名が写らないようにします。

| スクリーンショットID | 対象画面 | 用途 | 推奨サイズ | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- | --- |
| L11-SS01 | Azure Portal > Monitor > Overview | Azure Monitor の入口を示す | 1600 x 900 (16:9) | 左メニューと主要カードが見える状態で取得する。実運用のアラート件数が見えすぎないデモ環境を使う。 | サブスクリプション名、テナント名、ユーザー名、メールアドレス |
| L11-SS02 | 任意の VM または Container Apps > Metrics | メトリックのグラフ画面を示す | 1600 x 900 (16:9) | CPU や要求数など、値が出ている期間を選ぶ。リソース名が顧客名を含まないことを確認する。 | サブスクリプション名、リソース名、リソースグループ名、内部 IP |
| L11-SS03 | Monitor > Logs または Log Analytics Workspace > Logs | Log Analytics 画面を示す | 1600 x 900 (16:9) | 簡易モードまたはサンプルクエリ画面を使い、実データのログ本文が見えすぎないようにする。 | ログ本文の個人情報、IP アドレス、ホスト名、ユーザー名、メールアドレス |
| L11-SS04 | 任意のリソース > Diagnostic settings | 診断設定の位置を示す | 1440 x 900 (16:10) | 設定済みの送信先名が実環境を示す場合はマスクする。新規追加画面でもよい。 | ワークスペース名、Storage account 名、Event Hubs 名、サブスクリプション ID |
| L11-SS05 | Application Insights > Overview または Application Map | アプリケーション監視の入口を示す | 1600 x 900 (16:9) | デモアプリのメトリックが表示される期間を選ぶ。依存関係名に内部システム名が出ない画面を使う。 | アプリ名、URL、ホスト名、内部 API 名、ユーザー情報 |
| L11-SS06 | Monitor > Alerts | アラート一覧と状態を示す | 1600 x 900 (16:9) | 実インシデント名が出ないよう、デモ用または空に近い環境を使う。 | アラート名、リソース名、アクショングループ名、通知先メール |
| L11-SS07 | 任意のリソースまたは Monitor > Activity log | 最近の変更確認画面を示す | 1600 x 900 (16:9) | 操作者名やメールアドレスが表示される列を非表示にするかマスクする。 | イベント開始者、メールアドレス、リソース ID、相関 ID |
| L11-SS08 | Service Health または Resource Health | Azure 側/リソース側の正常性確認を示す | 1600 x 900 (16:9) | 実際の障害情報が不適切に見えないよう、公開可能なデモまたは Microsoft Learn の例を参考にする。 | サブスクリプション名、リージョン利用状況、サポート情報 |
| L11-SS09 | Container Apps > Log stream または Logs | Container Apps のログ確認入口を示す | 1600 x 900 (16:9) | アプリケーションログに個人情報や接続文字列が出ていないことを確認する。 | ログ本文、環境変数、URL、IP アドレス、ユーザー情報 |
| L11-SS10 | Azure Database for PostgreSQL > Metrics または Monitoring dashboard | DB 監視の入口を示す | 1600 x 900 (16:9) | CPU、接続数、ストレージなどが見える画面を選ぶ。サーバー名が顧客名を含まないことを確認する。 | サーバー名、リソースグループ名、接続情報、IP アドレス |

## ハンズオン手順案

本回では受講者によるハンズオン操作は行いません。
監視サービスは、実際の障害や負荷がないと画面上の意味が伝わりにくいため、講師が用意したデモ環境またはスクリーンショットを使って、確認先を説明します。

### 講師デモを行う場合の観察手順

1. Azure Monitor Overview を開き、Azure Monitor が監視の入口であることを示す。
2. VM または Container Apps の Metrics を開き、時間範囲、メトリック名、集計、分割の見方を示す。
3. Logs 画面を開き、テーブル、時間範囲、簡易モード/KQL モードの存在だけを紹介する。
4. Diagnostic settings を開き、リソースログのカテゴリと送信先を選ぶ画面であることを示す。
5. Application Insights を開き、Requests、Failures、Performance、Application Map の入口を示す。
6. Alerts を開き、アラートルール、発生中のアラート、アクショングループの関係を示す。
7. Activity log を開き、作成、更新、削除、デプロイ失敗などの管理操作を確認できることを示す。
8. Service Health/Resource Health を開き、自分の設定変更ではなく Azure 側の影響を見る入口を示す。

### 理解確認チェックリスト

- メトリックとログの違いを、自分の言葉で説明できる。
- 診断設定と Azure Monitor Agent の違いを説明できる。
- Application Insights がアプリケーションの要求、例外、依存関係を追うための機能だと説明できる。
- Activity log で確認することと、リソースログで確認することを区別できる。
- VM、Container Apps、PostgreSQL では見るべき監視項目が異なることを説明できる。
- 障害時に、Service Health、Resource Health、Overview、Activity log、Metrics、Logs、Application Insights の順で確認する流れを説明できる。

## よくある理解のつまずき

| つまずき | 起きやすい誤解 | 講師の補足 |
| --- | --- | --- |
| Azure Monitor が何を指すのか分からない | Azure Monitor は単一の画面名だと思ってしまう | Azure Monitor は、メトリック、ログ、アラート、可視化、Application Insights などを含む監視の中心サービスとして説明する |
| メトリックとログが混ざる | CPU 使用率もエラーメッセージも同じ「ログ」だと思う | メトリックは数値の時系列、ログは詳細な記録。まずメトリックで絞り、ログで掘ると説明する |
| Log Analytics をストレージ名だと思う | Log Analytics がログの保存場所そのものだと思う | 保存場所は Log Analytics ワークスペース、調べる Azure Portal の入口が Log Analytics/Logs 画面だと分ける |
| Activity log とリソースログが混ざる | アプリのアクセスや DB クエリも Activity log に出ると思う | Activity log は管理操作、リソースログはリソース内部やデータプレーンの動作。リソースログは診断設定が必要なことが多い |
| 診断設定と AMA が混ざる | どちらもログを送るので同じものだと思う | 診断設定は Azure リソース側のログ/メトリック送信設定、AMA は VM/Arc のゲスト OS に入るエージェントと説明する |
| Application Insights を Azure Monitor と別物だと思う | App Insights は独立した別系統の監視製品だと思う | Application Insights は Azure Monitor の APM 機能として、アプリケーションのテレメトリを扱うと説明する |
| すべてのログを集めればよいと思う | ログは多いほど安全だと思う | ログ量、保持期間、送信先はコストに影響するため、必要なカテゴリを選ぶ考え方を示す |
| アラートを作れば運用できると思う | 通知先や対応者を決めなくてもアラートだけで解決すると考える | アラートは気づくための入口であり、誰が確認し、何をするかを決める必要がある |
| KQL が分からないと監視できないと思う | ログ調査は全部 KQL を書けないと無理だと思う | 本回では KQL 詳細は扱わず、簡易モード、組み込みクエリ、画面の見方から始めればよいと伝える |
| 監視対象ごとの違いを見落とす | VM も DB も Container Apps も同じメトリックを見ればよいと思う | VM はホスト/ゲスト、Container Apps はリビジョン/レプリカ、DB は接続数/ストレージ/I/O など観点が違うと表で整理する |

## 講師が見る確認ポイント

| 確認ポイント | 見る場所 | 期待する理解 |
| --- | --- | --- |
| メトリックとログの違いを説明できるか | スライド9から13、L11-T02 | 数値の時系列と詳細な記録を分けて説明できる |
| Log Analytics の位置づけを誤解していないか | スライド14、L11-D07 | ワークスペースと Logs 画面を区別できる |
| Activity log の用途を説明できるか | スライド15、L11-SS07 | 誰がいつリソースを変更したか、デプロイが失敗したかを見る場所だと理解している |
| 診断設定と AMA の違いを説明できるか | スライド19から22、L11-T03 | PaaS/リソースログ送信と VM ゲスト OS 収集の違いを説明できる |
| Application Insights の用途を説明できるか | スライド17から18、L11-D09 | 要求、例外、依存関係、応答時間を追う機能だと理解している |
| リソース別監視観点を説明できるか | スライド26から30、L11-T06 | VM、Container Apps、PostgreSQL、ネットワーク、アプリで見る項目が違うと理解している |
| 障害時の確認順序を持てているか | スライド31、L11-D13 | Service Health、Resource Health、Overview、Activity log、Metrics、Logs の順で切り分ける考え方を説明できる |
| コストと通知過多の注意を理解しているか | スライド34、L11-T07 | 収集範囲、保持期間、アラート条件は見直す必要があると理解している |

## 復旧できない場合のスキップ手順

本回では受講者が Azure リソースを操作しないため、個別環境の復旧は原則発生しません。
ただし、講師デモ環境や Azure Portal 表示に問題がある場合は、次の順で進行を継続します。

1. Azure Portal にサインインできない場合は、L11-SS01 から L11-SS10 のスクリーンショットで画面説明に切り替える。
2. デモ環境に監視データが表示されない場合は、メトリックが出ている別リソース、または事前取得したグラフ画像を使う。
3. Logs 画面でデータが空の場合は、Log Analytics の画面構成だけを説明し、具体的な KQL 実行は省略する。
4. Application Insights のデータがない場合は、Application Map や Failures の Microsoft Learn 画面例を参考に、見方だけを説明する。
5. Service Health に現在のイベントがない場合は、正常時の画面として説明し、障害時にはここに影響通知が出ると説明する。
6. 講師デモが長引く場合は、VM、Container Apps、PostgreSQL の個別画面デモを省略し、L11-T06 の監視観点表で説明する。
7. QA 時間が不足する場合は、KQL、アラート詳細、コスト最適化、Grafana などの質問は参考資料に誘導し、講座内では確認場所に絞る。

## クリーンアップ手順

本回は受講者が Azure リソースを作成しないため、受講者によるクリーンアップはありません。

講師がデモ環境を用意した場合は、講座終了後に次を確認します。

- 講座用に作成した Log Analytics ワークスペース、Application Insights、アラートルール、アクショングループ、サンプル VM、Container Apps、PostgreSQL が不要であれば削除する。
- 継続利用するデモ環境では、診断設定で収集しているログカテゴリ、保持期間、送信先を確認し、不要なログ収集を停止する。
- アラートの通知先に講師個人メール、受講者メール、実顧客の連絡先が含まれていないことを確認する。
- デモ用アプリケーションログに、接続文字列、認証トークン、ユーザー情報、個人情報が出力されていないことを確認する。
- スクリーンショット公開前に、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、シークレット、接続文字列、課金情報をマスクする。
- Log Analytics、Application Insights、PostgreSQL、Public IP、Container Apps など課金が継続する可能性があるリソースは、講師用チェックリストで削除または停止方針を確認する。

## 振り返り

本回のまとめ:

- Azure Monitor は、Azure 上のリソース、アプリケーション、インフラストラクチャの監視データを集め、分析、可視化、アラートにつなげる中心です。
- メトリックは状態や傾向をすばやく見るための数値データ、ログは原因や詳細を調べるための記録データです。
- 診断設定は Azure リソースのログやメトリックを送信する設定、Azure Monitor Agent は VM/Arc のゲスト OS データを収集するエージェントです。
- Application Insights は、アプリケーションの要求、例外、依存関係、応答時間、可用性を見るための機能です。
- 障害時は、Service Health/Resource Health、Overview、Activity log、Metrics、Logs、Application Insights を順に確認し、影響範囲と原因候補を絞ります。
- 監視は一度設定して終わりではなく、収集範囲、保持期間、アラート条件、通知先、コストを継続的に見直す必要があります。

## 確認クイズ案

1. メトリックとログの違いは何ですか。
   - 解答例: メトリックは CPU 使用率や要求数のような時系列の数値データで、状態や傾向をすばやく見るのに向いている。ログはエラー、イベント、例外、操作記録のような詳細データで、原因調査に向いている。
2. 診断設定と Azure Monitor Agent の違いは何ですか。
   - 解答例: 診断設定は Azure リソースのリソースログ、プラットフォームメトリック、Activity log を Log Analytics などへ送る設定。Azure Monitor Agent は VM や Arc 対応サーバーのゲスト OS からイベントログ、Syslog、パフォーマンスデータなどを集めるエージェント。
3. Application Insights で代表的に確認するものを3つ挙げてください。
   - 解答例: 要求数、応答時間、失敗した要求、例外、依存関係、Application Map、可用性テストなど。
4. Azure リソースの設定変更やデプロイ失敗を確認したいとき、まず見る場所はどこですか。
   - 解答例: Activity log。作成、更新、削除、デプロイ、権限変更などの管理操作を確認できる。
5. VM の監視で、追加設定なしで見える情報と、AMA などが必要になる情報の違いは何ですか。
   - 解答例: ホストレベルのプラットフォームメトリックは多くの場合追加設定なしで見える。ゲスト OS 内部のイベントログ、Syslog、プロセス、詳細なパフォーマンスカウンターなどは Azure Monitor Agent と Data Collection Rule が必要になる。
6. 障害時に Azure 側の広域影響を疑う場合、どの画面を確認しますか。
   - 解答例: Service Health や Resource Health。全体の公開状態を見る場合は Azure Status も参考になる。
7. なぜ「すべてのログを長期間保存する」だけではよい監視とは言えないのですか。
   - 解答例: ログ量と保持期間はコストに影響し、不要なデータが多いと調査しにくくなる。必要なデータを選び、アラートや可視化、対応手順と組み合わせる必要がある。

## 講師向け補足

- 本回はサービス紹介ではなく、「障害時にどこを見るか」を受講者に持ち帰らせる回として進める。
- Azure Monitor という言葉が広いため、最初に「データを集める」「調べる」「可視化する」「知らせる」の4つに分けて説明すると理解しやすい。
- メトリックとログの違いは、CPU 使用率の折れ線グラフと、同じ時間帯のエラー詳細を対比して説明すると伝わりやすい。
- 診断設定と Azure Monitor Agent は混同されやすいため、PaaS/リソースログと VM ゲスト OS という対象の違いを何度か繰り返す。
- Application Insights は第10回の AI エージェント監視にも接続できるが、本回では一般的な Web/API アプリの要求、例外、依存関係を中心にする。
- 第5回から第6回の ACA + PostgreSQL Todo アプリを例に、「ユーザーが画面を開けない」「Todo 保存が遅い」「DB 接続エラーが出る」というシナリオで確認場所を説明すると、既習内容とつながりやすい。
- KQL の質問が出た場合は、ログ調査では重要だが本回では詳細に入らないと伝え、簡易モード、組み込みクエリ、参考資料への誘導に留める。
- アラートは作ることよりも、誰に、どの条件で、どの頻度で通知し、どの手順で対応するかが大事だと補足する。
- 監視コストは深掘りしないが、Log Analytics、Application Insights、診断設定、長期保持はコストに影響することを必ず触れる。
- 講師デモでは、実顧客名、メールアドレス、IP アドレス、接続文字列、エラーメッセージに含まれる内部情報が画面に出やすい。公開用スクリーンショットとは必ず分ける。

## 参考資料

- [Azure Monitor の概要](https://learn.microsoft.com/ja-jp/azure/azure-monitor/overview)
- [Azure Monitor メトリックの概要](https://learn.microsoft.com/ja-jp/azure/azure-monitor/essentials/data-platform-metrics)
- [Azure Monitor ログの概要](https://learn.microsoft.com/ja-jp/azure/azure-monitor/logs/data-platform-logs)
- [Azure Monitor の Log Analytics の概要](https://learn.microsoft.com/ja-jp/azure/azure-monitor/logs/log-analytics-overview)
- [Azure Monitor の診断設定](https://learn.microsoft.com/ja-jp/azure/azure-monitor/essentials/diagnostic-settings)
- [Azure Monitor エージェントの概要](https://learn.microsoft.com/ja-jp/azure/azure-monitor/agents/azure-monitor-agent-overview)
- [Application Insights の概要](https://learn.microsoft.com/ja-jp/azure/azure-monitor/app/app-insights-overview)
- [Azure Monitor の警告とは](https://learn.microsoft.com/ja-jp/azure/azure-monitor/alerts/alerts-overview)
- [Azure Monitor のアクティビティ ログ](https://learn.microsoft.com/ja-jp/azure/azure-monitor/essentials/activity-log)
- [Azure Service Health とは](https://learn.microsoft.com/ja-jp/azure/service-health/overview)
- [Azure Virtual Machines を監視する](https://learn.microsoft.com/ja-jp/azure/virtual-machines/monitor-vm)
- [Azure Container Apps での可観測性](https://learn.microsoft.com/ja-jp/azure/container-apps/observability)
- [Azure Database for PostgreSQL でメトリックを監視する](https://learn.microsoft.com/ja-jp/azure/postgresql/flexible-server/concepts-monitoring)
- [Azure ワークブック](https://learn.microsoft.com/ja-jp/azure/azure-monitor/visualize/workbooks-overview)
- [Azure Monitor でデータを視覚化する](https://learn.microsoft.com/ja-jp/azure/azure-monitor/visualize/best-practices-visualize)