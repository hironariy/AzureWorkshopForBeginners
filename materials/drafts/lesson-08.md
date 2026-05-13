# 第8回 Azure のその他サービス紹介 ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第8回
- タイトル: Azure のその他サービス紹介
- 形式: オンライン座学
- 時間: 60分 (50分レクチャー、10分QA)
- 想定日: 2026年8月20日

## この回の位置づけ

第8回は、第3回から第7回までで扱った VM、コンテナ、データベース、ネットワーク以外に、Azure を実際のシステムで使うときに必要になる管理系サービスを俯瞰する回です。
ここまでの講座では「アプリケーションをどこで動かすか」「サービス同士をどうつなぐか」を中心に扱いました。

本回では新しい Azure リソースは作成せず、ID、権限、セキュリティ、ガバナンス、コスト、シークレット、ストレージ、バックアップ、サービス正常性の観点で、どの課題にどの Azure サービスが関係するかを整理します。
サービス名を暗記するのではなく、要件を聞いたときに「まずどのカテゴリを調べるべきか」を判断できる状態を目指します。

第9回では Static Web Apps、Functions、データストア、イベント系サービスを SPA の構成として扱います。
第10回では AI と Microsoft Foundry、第11回では Azure Monitor を中心とした監視を扱うため、本回ではそれらの詳細には入りません。

## 受講前提

- 第3回から第6回までのハンズオンで、リソースグループ、VM、ACI、ACR、Container Apps、PostgreSQL、GitHub Actions、Service Principal などの名前を見たことがあることが望ましい。
- 第7回で、Azure のネットワーク、VNet、NSG、Private Endpoint、Private DNS Zone の概要を学んでいることが望ましい。
- Microsoft Entra ID、RBAC、Cost Management、Key Vault などを実際に操作した経験は不要。
- セキュリティ設計、ID 管理、コスト管理、バックアップ設計の詳細経験は不要。
- 本回は座学のみで、Azure Portal の操作や Azure CLI 実行は行わない。

## 到達目標

- Azure を利用するシステムでは、実行基盤、データベース、ネットワークに加えて、ID、権限、セキュリティ、コスト、ガバナンス、保護の設計が必要になることを理解できる。
- Microsoft Entra ID と Azure RBAC の関係を、認証と認可の違いとして説明できる。
- Azure Policy、Microsoft Defender for Cloud、Cost Management、Azure Advisor が、運用・管理・改善においてどのような役割を持つかを説明できる。
- Azure Key Vault、Azure Storage、Azure Backup の代表的な利用場面を説明できる。
- 後続回で扱う Static Web Apps、AI、監視と、本回で扱う管理系サービスの境界を説明できる。
- 要件や困りごとから、調べるべき Azure サービスカテゴリを大まかに選べる。

## 受講後に説明できること/操作できること

- Microsoft Entra ID はユーザー、アプリケーション、ワークロードなどの ID を扱い、Azure RBAC は Azure リソースに対する操作権限を扱うと説明できる。
- RBAC のロール割り当ては、セキュリティプリンシパル、ロール定義、スコープの組み合わせであると説明できる。
- Azure Policy は「作ってよい状態を組織ルールとして評価する仕組み」であり、Azure RBAC とは役割が違うと説明できる。
- Microsoft Defender for Cloud は、クラウド環境のセキュリティ体制やワークロード保護の推奨事項を確認する入口であると説明できる。
- Cost Management とタグを使うと、誰が、何のために、どのくらい Azure コストを使っているかを追いやすくなると説明できる。
- Key Vault は、シークレット、キー、証明書をアプリケーションコードや手順書から分離して管理するためのサービスであると説明できる。
- Azure Storage と Azure Backup の代表的な利用場面を挙げられる。
- 新しい要件を聞いたときに、ID、権限、ポリシー、コスト、シークレット、ストレージ、バックアップ、正常性確認のどれを先に調べるべきかを判断できる。

## 本回で扱う範囲

- Azure Resource Manager、管理グループ、サブスクリプション、リソースグループ、リソース、タグの関係
- Microsoft Entra ID の役割
- Azure RBAC の基本概念
- Service Principal、Managed Identity、Workload Identity の入口
- Azure Policy によるガバナンスの考え方
- Microsoft Defender for Cloud の位置づけ
- Cost Management + Billing、Cost Analysis、予算、タグによるコスト把握
- Azure Advisor による推奨事項の見方
- Azure Key Vault によるシークレット、キー、証明書管理の考え方
- Azure Storage の主要データサービスの概要
- Azure Backup と復旧ポイント、保持、ランサムウェア対策の入口
- Azure Service Health、Azure Status、Resource Health の位置づけ
- 第8回、第9回、第10回、第11回で扱うサービス範囲の境界

## 本回で扱わない範囲

- 各サービスの Azure Portal 操作手順
- Microsoft Entra ID の詳細設計、条件付きアクセス、ID ガバナンス、ハイブリッド ID 設計
- Azure RBAC のカスタムロール設計、PIM、細かな権限設計
- Microsoft Defender for Cloud の有料プラン設定、セキュリティ運用、SIEM/SOAR 連携
- Azure Policy のカスタム定義、Policy as Code、修復タスクの実装
- Cost Management の詳細な FinOps 運用、予約、Savings Plan、契約別課金設計
- Key Vault の HSM、証明書自動更新、Private Endpoint 構成
- Storage の詳細設計、アクセス層、ライフサイクル管理、データ移行
- Backup の詳細なバックアップポリシー、DR 設計、復旧訓練
- Static Web Apps、Azure Functions、Cosmos DB、SQL Database、Event Grid、Event Hubs、Service Bus の詳細。第9回で扱う。
- Microsoft Foundry、Azure OpenAI、AI エージェントの詳細。第10回で扱う。
- Azure Monitor、Log Analytics、Application Insights、診断設定の詳細。第11回で扱う。
- IaC による構築や設定

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | 過去回との接続 | これまで作った Azure リソースだけでは運用設計が完結しないことを示す |
| 5-15分 | 管理スコープ、ID、権限 | Azure Resource Manager、Entra ID、RBAC の関係を整理する |
| 15-25分 | ガバナンスとセキュリティ | Azure Policy と Defender for Cloud の役割を理解する |
| 25-35分 | コスト、シークレット、データ保護 | Cost Management、Key Vault、Storage、Backup の代表的な利用場面を知る |
| 35-45分 | 推奨事項、正常性、サービス選択 | Advisor、Service Health、シナリオ別サービス選択を扱う |
| 45-50分 | 振り返り | 後続回との境界と、本回の判断軸を確認する |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は34枚です。座学中心の回として25枚から35枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | Azure のその他サービス紹介 | この回では、アプリを動かすサービス以外に、実運用で必要になる Azure サービスを整理します。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | サービス名を暗記するのではなく、困りごとから調べるべきカテゴリを選べるようになることを目指します。 | 到達目標、座学のみ、後続回との関係 | L08-D01 |
| 3 | ここまでに扱ったもの | これまでは、実行基盤、データベース、ネットワークを中心に Azure を見てきました。 | VM、ACI、ACA、PostgreSQL、VNet、Private Endpoint | L08-D02 |
| 4 | 実運用では周辺設計が必要 | アプリが動いても、誰が操作できるか、いくらかかるか、どう守るかが未設計だと運用できません。 | ID、権限、セキュリティ、コスト、ガバナンス、保護 | L08-D03 |
| 5 | Azure の管理スコープ | Azure リソースは、管理グループ、サブスクリプション、リソースグループ、リソースという階層で管理します。 | ARM、スコープ、継承、リソースグループの役割 | L08-D04 |
| 6 | タグはあとから効いてくる | タグは、コスト、所有者、環境、削除予定を追跡するためのメタデータです。 | `Environment`、`Owner`、`CostCenter`、`DeleteAfter`、機密情報を入れない | L08-T01 |
| 7 | Microsoft Entra ID | Entra ID は、Azure を使う人、アプリ、ワークロードの ID を扱う基盤です。 | テナント、ユーザー、グループ、アプリ登録、Service Principal | L08-D05 |
| 8 | Azure RBAC | Azure RBAC は、Azure リソースに対して誰が何をどこまで操作できるかを決めます。 | 認証と認可、Azure Resource Manager、ロール割り当て | L08-D06 |
| 9 | ロール割り当ての3要素 | RBAC は、誰に、どのロールを、どのスコープで割り当てるかで決まります。 | セキュリティプリンシパル、ロール定義、スコープ | L08-T02 |
| 10 | よく使う組み込みロール | 初心者はまず、Owner、Contributor、Reader、User Access Administrator の違いを押さえます。 | 所有者、共同作成者、閲覧者、ユーザーアクセス管理者、最小権限 | L08-T03 |
| 11 | 人以外の ID | GitHub Actions やアプリケーションも、人の代わりに Azure を操作する ID を使います。 | Service Principal、Managed Identity、Workload Identity、GitHub Actions | L08-D07 |
| 12 | ハンズオン権限と本番権限 | 講座では Contributor を使いましたが、本番では必要な範囲に絞ったロール割り当てを考えます。 | 共有サブスクリプション、学習用権限、本番の最小権限 | L08-D08 |
| 13 | Azure Policy | Policy は、リソースが組織のルールに沿っているかを評価し、必要に応じて拒否や監査を行います。 | 許可リージョン、必須タグ、許可 SKU、診断設定要求 | L08-D09 |
| 14 | RBAC と Policy の違い | RBAC は誰が操作できるか、Policy は作られた状態がルールに合うかを見ます。 | 認可と準拠性、組み合わせて使う理由 | L08-T04 |
| 15 | Defender for Cloud | Defender for Cloud は、クラウド環境のセキュリティ体制とワークロード保護を確認する入口です。 | CSPM、CWPP、推奨事項、セキュリティスコア、プラン | L08-D10 |
| 16 | セキュリティ推奨事項 | 推奨事項は、今すぐ直すべき構成の弱点を見つけるための出発点です。 | 推奨事項、重大度、対象リソース、対応状況 | L08-T05 |
| 17 | Key Vault | Key Vault は、シークレット、キー、証明書をアプリケーションや手順書から分離して管理します。 | シークレット管理、キー管理、証明書管理、Entra ID と RBAC | L08-D11 |
| 18 | Secret をどこに置くか | GitHub Secret、アプリ設定、Key Vault は用途が違い、機密情報を資料やコードに残さないことが基本です。 | 第6回の GitHub Secret、接続文字列、Key Vault 参照 | L08-T06 |
| 19 | Cost Management + Billing | Cost Management はコストの分析と最適化、Billing は請求や契約の管理に関係します。 | Cost Analysis、予算、アラート、請求、権限 | L08-D12 |
| 20 | コストを追える形にする | コスト管理は後から見るだけでなく、タグ、リソースグループ、サブスクリプション設計とセットで考えます。 | タグ、CostCenter、Owner、Environment、共有サブスクリプションの注意 | L08-D13 |
| 21 | Advisor | Advisor は、信頼性、セキュリティ、パフォーマンス、コスト、運用の推奨事項を確認する入口です。 | Advisor の5カテゴリ、Defender との関係、推奨事項の扱い | L08-D14 |
| 22 | Azure Storage | Storage は、オブジェクト、ファイル、キュー、テーブル、ディスクなど、幅広いデータ保存の土台です。 | Blob、Files、Queue、Table、Managed Disk、Storage account | L08-D15 |
| 23 | Storage の代表的な使い分け | 保存したいデータの形とアクセス方法によって、Storage 内でも選ぶサービスが変わります。 | Blob、Files、Queue、Table、Disk の用途 | L08-T07 |
| 24 | Storage はセキュリティと冗長性も考える | ストレージは容量だけでなく、アクセス制御、暗号化、冗長性、コストを合わせて設計します。 | Entra/RBAC、SAS、暗号化、LRS/ZRS/GRS の存在 | L08-D16 |
| 25 | Azure Backup | Backup は、データを復旧できる形で保持するためのサービスで、削除防止だけではありません。 | Recovery Services vault、Backup vault、復旧ポイント、保持 | L08-D17 |
| 26 | 何をバックアップするか | VM、Managed Disk、Azure Files、PostgreSQL、Blob、AKS など、対象によってバックアップ方法が変わります。 | 対象リソース、サービス固有バックアップ、復旧要件 | L08-T08 |
| 27 | バックアップと冗長化の違い | 冗長化は止まりにくくする設計、バックアップは戻れる状態を残す設計です。 | HA、レプリケーション、誤削除、ランサムウェア、復旧訓練 | L08-D18 |
| 28 | Service Health | Service Health は、Azure 側の障害、計画メンテナンス、リソース正常性を確認する入口です。 | Azure Status、Service Health、Resource Health、通知 | L08-D19 |
| 29 | 後続回に回すサービス | Static Web Apps、Functions、AI、監視は重要ですが、それぞれ専用回でアーキテクチャとして扱います。 | 第9回、第10回、第11回の境界、Foundry は第10回 | L08-D20 |
| 30 | シナリオ1: 新しい社内アプリ | 新しいアプリを作るときは、実行基盤だけでなく、ID、権限、シークレット、コスト、バックアップを確認します。 | 社内 Web/API/DB、Entra、RBAC、Key Vault、Backup | L08-T09 |
| 31 | シナリオ2: 共有サブスクリプション | 複数チームで同じ Azure 環境を使う場合は、スコープ、タグ、Policy、Cost Management が効いてきます。 | 管理グループ、サブスクリプション、RG、タグ、Policy、予算 | L08-T09 |
| 32 | シナリオ3: 事故を減らす | 秘密情報の露出、不要なリソースの放置、リージョン誤り、バックアップ不足は、管理系サービスで予防できます。 | Key Vault、Policy、Defender、Advisor、Backup、Service Health | L08-T09 |
| 33 | 今日のまとめ | Azure はリソースを作るだけでなく、誰が、どのルールで、いくらで、どう守るかを設計して使います。 | 3つのまとめ、次回への接続 | L08-D21 |
| 34 | 確認クイズ | サービス名ではなく、課題からカテゴリを選べるかを確認します。 | クイズ、QA への導入 | なし |

## 図表・スクリーンショット素材一覧

本回は座学回のため、スライド本文で必須となる Azure Portal 操作スクリーンショットはありません。
サービスの関係と利用場面を理解するため、`L08-Dxx` は AI または draw.io で作成する図表、`L08-Txx` は表として管理します。
Azure Portal の画面例は任意の参考画像として `L08-SSxx` を割り当てます。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L08-D01 | 図表 | 必須 | AI で作成 | 今日のゴール。困りごとからサービスカテゴリを選ぶ地図 |
| L08-D02 | 図表 | 必須 | AI/draw.io で作成 | 第3回から第7回で扱ったサービスと本回の位置づけ |
| L08-D03 | 図表 | 必須 | AI で作成 | 実運用で必要になる管理領域 |
| L08-D04 | 図表 | 必須 | AI/draw.io で作成 | ARM の管理スコープ階層 |
| L08-D05 | 図表 | 必須 | AI/draw.io で作成 | Entra ID、テナント、サブスクリプション、ユーザーの関係 |
| L08-D06 | 図表 | 必須 | AI/draw.io で作成 | Azure RBAC のロール割り当て構造 |
| L08-D07 | 図表 | 必須 | AI/draw.io で作成 | 人の ID とワークロード ID の違い |
| L08-D08 | 図表 | 必須 | AI で作成 | 学習用 Contributor と本番最小権限の違い |
| L08-D09 | 図表 | 必須 | AI/draw.io で作成 | Azure Policy の評価と効果 |
| L08-D10 | 図表 | 必須 | AI/draw.io で作成 | Defender for Cloud の CSPM/CWPP 整理 |
| L08-D11 | 図表 | 必須 | AI/draw.io で作成 | Key Vault とアプリケーションのシークレット参照 |
| L08-D12 | 図表 | 必須 | AI で作成 | Cost Management と Billing の関係 |
| L08-D13 | 図表 | 必須 | AI/draw.io で作成 | タグとコスト配賦の関係 |
| L08-D14 | 図表 | 必須 | AI で作成 | Advisor の5カテゴリ |
| L08-D15 | 図表 | 必須 | AI/draw.io で作成 | Azure Storage データサービスの整理 |
| L08-D16 | 図表 | 必須 | AI で作成 | Storage の設計観点。アクセス制御、暗号化、冗長性、コスト |
| L08-D17 | 図表 | 必須 | AI/draw.io で作成 | Azure Backup と復旧ポイント |
| L08-D18 | 図表 | 必須 | AI で作成 | 冗長化、バックアップ、削除防止、復旧訓練の違い |
| L08-D19 | 図表 | 必須 | AI/draw.io で作成 | Azure Status、Service Health、Resource Health の関係 |
| L08-D20 | 図表 | 必須 | AI で作成 | 第8回から第11回のサービス境界 |
| L08-D21 | 図表 | 必須 | AI で作成 | 今日のまとめ。誰が、どのルールで、いくらで、どう守るか |
| L08-T01 | 表 | 必須 | AI で作成 | タグ設計の代表例と注意点 |
| L08-T02 | 表 | 必須 | AI で作成 | RBAC の3要素 |
| L08-T03 | 表 | 必須 | AI で作成 | 初心者が押さえる組み込みロール |
| L08-T04 | 表 | 必須 | AI で作成 | Azure RBAC と Azure Policy の違い |
| L08-T05 | 表 | 必須 | AI で作成 | Defender for Cloud の推奨事項を見る観点 |
| L08-T06 | 表 | 必須 | AI で作成 | GitHub Secret、アプリ設定、Key Vault の違い |
| L08-T07 | 表 | 必須 | AI で作成 | Azure Storage の代表的な使い分け |
| L08-T08 | 表 | 必須 | AI で作成 | Azure Backup の代表的な対象 |
| L08-T09 | 表 | 必須 | AI で作成 | シナリオ別サービス選択ガイド |
| L08-SS01 | スクリーンショット | 任意 | 筆者が提供 | Microsoft Entra 管理センターまたは Azure Portal の Entra ID 概要 |
| L08-SS02 | スクリーンショット | 任意 | 筆者が提供 | Azure Portal の Access control (IAM) 画面 |
| L08-SS03 | スクリーンショット | 任意 | 筆者が提供 | Azure Policy の Compliance 画面 |
| L08-SS04 | スクリーンショット | 任意 | 筆者が提供 | Microsoft Defender for Cloud の Overview または Recommendations 画面 |
| L08-SS05 | スクリーンショット | 任意 | 筆者が提供 | Cost Management の Cost analysis 画面 |
| L08-SS06 | スクリーンショット | 任意 | 筆者が提供 | Key Vault の Secrets 画面 |
| L08-SS07 | スクリーンショット | 任意 | 筆者が提供 | Storage account Overview 画面 |
| L08-SS08 | スクリーンショット | 任意 | 筆者が提供 | Backup center または Recovery Services vault 画面 |
| L08-SS09 | スクリーンショット | 任意 | 筆者が提供 | Azure Advisor の Recommendations 画面 |
| L08-SS10 | スクリーンショット | 任意 | 筆者が提供 | Azure Service Health 画面 |

## 図表案

### L08-D01 今日のゴール

目的: 本回がサービスカタログ暗記ではなく、課題からサービスカテゴリを選ぶ回であることを示す。

構成:

- 中央: 「Azure を実案件で使うときの周辺設計」。
- 周囲に8カテゴリを配置する。
- ID と権限: Entra ID、RBAC。
- ガバナンス: Policy、管理グループ、タグ。
- セキュリティ: Defender for Cloud、Key Vault。
- コスト: Cost Management、Advisor。
- データ保護: Storage、Backup。
- 正常性: Service Health。

### L08-D02 第3回から第7回で扱ったサービスと本回の位置づけ

目的: これまでの講座と第8回を接続する。

構成:

- 第3回: VM、Disk、NIC、Public IP、NSG。
- 第4回: ACI、ACR。
- 第5回から第6回: ACA、ACR、PostgreSQL、Managed Identity、GitHub Actions。
- 第7回: VNet、Private Endpoint、DNS。
- 第8回: ID、権限、ガバナンス、セキュリティ、コスト、保護。

### L08-D03 実運用で必要になる管理領域

目的: アプリケーション実行基盤だけでは運用設計が完結しないことを説明する。

構成:

- 左: アプリが動く構成。Web/API/DB/Network。
- 右: 運用に必要な問い。
- 誰が使うか。Entra ID。
- 何を許可するか。RBAC。
- 何を作ってよいか。Policy。
- どう守るか。Defender、Key Vault。
- いくらか。Cost Management。
- どう戻すか。Backup。

### L08-D04 ARM の管理スコープ階層

目的: Azure の管理操作がスコープ階層で考えられることを説明する。

構成:

- 管理グループ。
- サブスクリプション。
- リソースグループ。
- リソース。
- 右側に RBAC、Policy、タグ、コスト分析がどのスコープで効くかを示す。
- リソースグループは「同じライフサイクルで管理する単位」と注記する。

### L08-D05 Entra ID、テナント、サブスクリプション、ユーザーの関係

目的: ID と Azure リソース管理の関係を初心者向けに整理する。

構成:

- Microsoft Entra テナント。
- テナント内のユーザー、グループ、アプリ登録、Service Principal。
- テナントを信頼する Azure サブスクリプション。
- サブスクリプション配下のリソースグループとリソース。
- 「Entra ID はサインインする相手を管理する」とラベル付けする。

### L08-D06 Azure RBAC のロール割り当て構造

目的: RBAC の3要素を視覚的に理解する。

構成:

- セキュリティプリンシパル: ユーザー、グループ、Service Principal、Managed Identity。
- ロール定義: Reader、Contributor、Owner など。
- スコープ: 管理グループ、サブスクリプション、リソースグループ、リソース。
- 3つを結ぶ線に「ロール割り当て」と表示する。

### L08-D07 人の ID とワークロード ID の違い

目的: 第6回の GitHub Actions と Service Principal の意味を振り返る。

構成:

- 人: 受講者、講師、管理者。
- ワークロード: GitHub Actions、Container Apps、アプリケーション。
- 人はサインインして操作する。
- ワークロードは Service Principal や Managed Identity で Azure を操作する。
- どちらも権限は RBAC で制御する。

### L08-D08 学習用 Contributor と本番最小権限の違い

目的: 講座の権限設定が本番設計の推奨そのものではないことを説明する。

構成:

- 左: 講座。受講者にサブスクリプションスコープ Contributor を付与。短時間で学習するための前提。
- 右: 本番。チーム、環境、リソースグループ、ワークロードごとに必要最小限のロールを付与。
- 強調: 「広い権限は学習効率のため。本番では例外扱い」。

### L08-D09 Azure Policy の評価と効果

目的: Policy がルールに沿った状態を評価する仕組みであることを説明する。

構成:

- ポリシー定義。
- 割り当てスコープ。
- リソース作成または更新。
- 評価。
- 効果: Audit、Deny、Modify、DeployIfNotExists。
- 例: Japan East 以外を拒否、必須タグ不足を監査。

### L08-D10 Defender for Cloud の CSPM/CWPP 整理

目的: Defender for Cloud を単なるウイルス対策ではなく、クラウドセキュリティの入口として説明する。

構成:

- Defender for Cloud を中央に配置。
- CSPM: セキュリティ体制、推奨事項、セキュリティスコア、規制コンプライアンス。
- CWPP: サーバー、コンテナ、ストレージ、データベースなどのワークロード保護。
- DevSecOps は存在紹介に留める。

### L08-D11 Key Vault とアプリケーションのシークレット参照

目的: シークレットをアプリケーションコードや資料から分離する理由を示す。

構成:

- アプリケーション。
- Managed Identity または Service Principal。
- Key Vault。
- シークレット、キー、証明書。
- Entra ID による認証と RBAC による認可。
- 「コードに接続文字列を直書きしない」と注記する。

### L08-D12 Cost Management と Billing の関係

目的: コスト分析と請求管理の違いを整理する。

構成:

- Azure 利用量。
- Cost Management: Cost Analysis、予算、アラート、エクスポート、最適化。
- Billing: 請求書、支払い、契約、課金アカウント。
- 受講者が見る範囲と、組織の管理者が見る範囲を分ける。

### L08-D13 タグとコスト配賦の関係

目的: タグがコスト分析や責任分界に効くことを説明する。

構成:

- 複数リソースにタグを付与。
- `Course=AzureWorkshopForBeginners`、`Lesson=L08`、`Environment=Workshop`、`Owner`、`DeleteAfter` の例。
- Cost Analysis でタグ別に集計。
- 注意: タグに秘密情報、個人情報、接続文字列を入れない。

### L08-D14 Advisor の5カテゴリ

目的: Azure Advisor を改善提案の入口として説明する。

構成:

- Advisor を中央に置く。
- 信頼性。
- セキュリティ。
- パフォーマンス。
- コスト。
- オペレーショナルエクセレンス。
- 「推奨事項は自動適用ではなく、判断材料」と注記する。

### L08-D15 Azure Storage データサービスの整理

目的: Storage が単一サービスではなく、複数のデータ保存パターンを含むことを示す。

構成:

- Storage account を入口にする。
- Blob: オブジェクト。
- Files: SMB/NFS ファイル共有。
- Queue: 非同期メッセージ。
- Table: キー/属性型 NoSQL。
- Managed Disk: VM のディスク。
- Data Lake Storage は Blob の拡張として補足。

### L08-D16 Storage の設計観点

目的: Storage を容量だけで選ばないことを説明する。

構成:

- 4象限。
- アクセス制御: Entra ID、RBAC、SAS。
- 保護: 暗号化、Key Vault 連携。
- 可用性: LRS、ZRS、GRS の存在。
- コスト: アクセス頻度、保持期間、転送量。

### L08-D17 Azure Backup と復旧ポイント

目的: Backup が復旧できる状態を保持するサービスであることを示す。

構成:

- 対象リソース。
- Backup policy。
- Backup vault または Recovery Services vault。
- 復旧ポイント。
- 復元。
- 保持期間と復旧訓練をラベルで示す。

### L08-D18 冗長化、バックアップ、削除防止、復旧訓練の違い

目的: 初心者が混同しやすいデータ保護概念を切り分ける。

構成:

- 冗長化: 障害時に止まりにくくする。
- バックアップ: 過去の状態に戻せるようにする。
- 削除防止: 誤削除や悪意ある削除を防ぐ。
- 復旧訓練: 本当に戻せるか確認する。

### L08-D19 Azure Status、Service Health、Resource Health の関係

目的: Azure 側の障害や計画メンテナンスをどこで確認するかを示す。

構成:

- Azure Status: グローバルな公開状態。
- Service Health: 自分の利用サービスとリージョンに関係する通知。
- Resource Health: 個別リソースの正常性。
- 通知先設定は存在紹介に留める。

### L08-D20 第8回から第11回のサービス境界

目的: 本回で扱う範囲と後続回の深掘り範囲を明確にする。

構成:

- 第8回: ID、RBAC、Policy、Defender、Cost、Key Vault、Storage、Backup、Service Health。
- 第9回: Static Web Apps、Functions、DB、イベント系サービス。
- 第10回: Microsoft Foundry、Azure OpenAI、AI エージェント。
- 第11回: Azure Monitor、Log Analytics、Application Insights、診断設定。

### L08-D21 今日のまとめ

目的: 本回の判断軸を短く持ち帰らせる。

構成:

- 誰が使うか。Entra ID、RBAC。
- どのルールで使うか。Policy、Defender。
- いくらで使うか。Cost Management、Advisor、タグ。
- どう守り戻すか。Key Vault、Storage、Backup、Service Health。

### L08-T01 タグ設計の代表例と注意点

| タグ例 | 用途 | 注意点 |
| --- | --- | --- |
| `Environment` | 本番、検証、開発を区別する | 値の表記ゆれを防ぐ |
| `Owner` | 管理責任者やチームを示す | 個人メールアドレスは公開教材や画面では避ける |
| `CostCenter` | コスト配賦に使う | 組織側のコード体系と合わせる |
| `DeleteAfter` | 削除予定日を示す | 自動削除ではない。運用と組み合わせる |
| `Course`、`Lesson` | 講座用リソースを識別する | 本講座ではハンズオン回で利用する |

### L08-T02 RBAC の3要素

| 要素 | 意味 | 例 |
| --- | --- | --- |
| セキュリティプリンシパル | 権限を受け取る主体 | ユーザー、グループ、Service Principal、Managed Identity |
| ロール定義 | 許可される操作のまとまり | Reader、Contributor、Owner |
| スコープ | 権限が効く範囲 | 管理グループ、サブスクリプション、リソースグループ、リソース |

### L08-T03 初心者が押さえる組み込みロール

| ロール | できること | 注意点 |
| --- | --- | --- |
| Reader | リソースを閲覧できる | 変更はできない |
| Contributor | 多くのリソースを作成、更新、削除できる | 権限付与はできない |
| Owner | Contributor に加えて権限付与もできる | 強力なため本番では付与対象を絞る |
| User Access Administrator | アクセス権管理ができる | リソース操作権限とは別に考える |

### L08-T04 Azure RBAC と Azure Policy の違い

| 観点 | Azure RBAC | Azure Policy |
| --- | --- | --- |
| 主な問い | 誰が操作できるか | 作られた状態がルールに合っているか |
| 対象 | ユーザー、グループ、アプリ、ワークロード ID | Azure リソースの構成やプロパティ |
| 例 | 受講者がリソースグループを作成できる | Japan East 以外を拒否する、タグ必須にする |
| 関係 | 操作権限を与える | 権限があってもルール違反なら拒否または監査できる |

### L08-T05 Defender for Cloud の推奨事項を見る観点

| 観点 | 確認すること | 初心者向けの言い換え |
| --- | --- | --- |
| 対象 | どのリソースに対する推奨か | 何が危ないと言われているか |
| 重大度 | High、Medium、Low など | どれから対応すべきか |
| 影響 | 変更するとアプリに影響するか | すぐ直してよいか、検証が必要か |
| 費用 | 有料プランが必要か | 有効化前にコストを見る |
| 所有者 | 誰が対応するか | セキュリティだけでなくアプリ担当も関係する |

### L08-T06 GitHub Secret、アプリ設定、Key Vault の違い

| 保管場所 | 主な用途 | 注意点 |
| --- | --- | --- |
| GitHub Secret | GitHub Actions がデプロイ時に使う秘密情報 | リポジトリごとの管理。Azure 内の実行時秘密情報とは分ける |
| アプリ設定 | 実行時の設定値をアプリに渡す | シークレットを置く場合はアクセス管理と表示範囲に注意する |
| Key Vault | シークレット、キー、証明書を集中管理する | アプリから参照するには ID と権限設計が必要 |

### L08-T07 Azure Storage の代表的な使い分け

| サービス | 向いているデータ | 例 |
| --- | --- | --- |
| Blob Storage | 非構造化データ、ファイル、画像、ログ | 画像、PDF、バックアップファイル、データレイク |
| Azure Files | SMB/NFS で共有するファイル | 共有フォルダ、既存アプリのファイル共有 |
| Queue Storage | 小さなメッセージの非同期処理 | 画像処理依頼、バックグラウンド処理のキュー |
| Table Storage | シンプルなキー/属性データ | メタデータ、軽量な NoSQL データ |
| Managed Disk | VM に接続するディスク | OS ディスク、データディスク |

### L08-T08 Azure Backup の代表的な対象

| 対象 | 説明 | 注意点 |
| --- | --- | --- |
| Azure VM | VM 全体またはファイル単位の復元に使う | アプリ整合性や復元手順を検証する |
| Managed Disk | ディスク単位の保護 | VM バックアップとの使い分けを確認する |
| Azure Files | ファイル共有を保護する | 誤削除対策と保持期間を考える |
| Azure Database for PostgreSQL | サービス側のバックアップ機能や Azure Backup の対応を確認する | Flexible Server の種類や要件で使える機能が変わる |
| Blob Storage | オペレーショナルバックアップや保管型バックアップを検討する | バージョン管理、論理削除、保持要件と合わせる |

### L08-T09 シナリオ別サービス選択ガイド

| シナリオ | まず確認するカテゴリ | 関連サービス |
| --- | --- | --- |
| 新しい社内 Web アプリを作る | ID、権限、シークレット、バックアップ | Entra ID、Azure RBAC、Key Vault、Backup |
| 複数チームでサブスクリプションを使う | スコープ、タグ、ガバナンス、コスト | 管理グループ、タグ、Policy、Cost Management |
| 秘密情報をコードに入れたくない | シークレット管理、ワークロード ID | Key Vault、Managed Identity、RBAC |
| コストが増えている | 分析、予算、推奨事項 | Cost Management、タグ、Advisor |
| セキュリティの弱点を把握したい | セキュリティ体制、推奨事項 | Defender for Cloud、Policy、Advisor |
| Azure 側の障害か確認したい | サービス正常性 | Azure Status、Service Health、Resource Health |

## スクリーンショット取得指示

本回は座学のみのため、スクリーンショットは必須ではありません。
HTML 詳細版やスライドで画面例を添える場合は、次の任意素材を取得します。
いずれもサブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、課金金額、シークレット、接続文字列、顧客名、組織名が写らないようにマスクします。

| スクリーンショットID | 対象画面 | 用途 | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- |
| L08-SS01 | Microsoft Entra 管理センターまたは Azure Portal の Entra ID 概要 | Entra ID が ID 管理の入口であることを示す | テナント名やドメインが見えない画角にする | テナント ID、ドメイン、ユーザー名、メールアドレス |
| L08-SS02 | Azure Portal の Access control (IAM) | RBAC の画面例を示す | 既存ロール割り当ての個人名を写さない | ユーザー名、グループ名、メールアドレス、サブスクリプション ID |
| L08-SS03 | Azure Policy の Compliance 画面 | Policy の準拠性確認イメージを示す | 実環境の非準拠内容が特定されないようにする | サブスクリプション名、リソース名、組織ルール名 |
| L08-SS04 | Defender for Cloud の Overview または Recommendations | セキュリティ推奨事項の入口を示す | セキュリティスコアや具体的な脆弱性が公開されないようにする | スコア、リソース名、推奨事項詳細、サブスクリプション ID |
| L08-SS05 | Cost Management の Cost analysis | コスト分析の入口を示す | 実金額を公開しない。可能ならデモ環境で取得する | 金額、請求情報、サブスクリプション名、タグ値 |
| L08-SS06 | Key Vault の Secrets 画面 | シークレット管理の入口を示す | Secret 名や値が写らない画角にする | Secret 名、Secret 値、証明書名、リソース ID |
| L08-SS07 | Storage account Overview | Storage account がデータサービスの入口であることを示す | アクセスキーや接続文字列画面は撮らない | ストレージアカウント名、リソース ID、エンドポイント |
| L08-SS08 | Backup center または Recovery Services vault | バックアップ管理の入口を示す | 実バックアップ対象や保持ポリシーが特定されないようにする | VM 名、DB 名、Vault 名、リソース ID |
| L08-SS09 | Azure Advisor の Recommendations | 推奨事項の画面例を示す | 具体的なリスクやコスト削減額が公開されないようにする | リソース名、金額、推奨事項詳細 |
| L08-SS10 | Azure Service Health | Azure 側の正常性確認の入口を示す | 実利用中のサブスクリプションや地域影響が特定されないようにする | サブスクリプション名、通知名、リソース名 |

## ハンズオン手順案

本回はハンズオンは行いません。
Azure Portal で新しいリソースを作成せず、Azure CLI や IaC も利用しません。

HTML 詳細版では、操作完了チェックリストではなく、次の理解確認チェックリストを用意します。

| チェック項目 | 確認する内容 | 期待状態 |
| --- | --- | --- |
| 1 | Entra ID と Azure RBAC の違い | Entra ID は ID、RBAC は Azure リソース操作権限と説明できる |
| 2 | RBAC の3要素 | セキュリティプリンシパル、ロール定義、スコープを挙げられる |
| 3 | Azure Policy の役割 | 権限があっても、ルール違反のリソース作成を拒否または監査できると説明できる |
| 4 | Key Vault の使いどころ | シークレット、キー、証明書をコードや手順書から分離する用途を説明できる |
| 5 | コストとタグの関係 | タグやリソースグループ設計が Cost Management での分析に役立つと説明できる |
| 6 | シナリオ別の入口 | コスト増、秘密情報管理、権限管理、バックアップ不足、Azure 側障害のそれぞれで調べるサービスカテゴリを選べる |

## よくある理解のつまずき

| つまずき | 起きやすい誤解 | 講師の説明 |
| --- | --- | --- |
| Entra ID と Azure RBAC を混同する | Entra ID でユーザーを作れば Azure リソース権限も自動で決まると思う | Entra ID は ID の基盤、Azure RBAC は Azure リソースへの認可であると分ける |
| Owner と Contributor の違いが曖昧 | Contributor は何でもできると思う | Contributor は多くのリソース操作ができるが、原則として権限付与はできないと説明する |
| RBAC と Policy を混同する | Policy も権限付与の仕組みだと思う | RBAC は操作できる人、Policy は作られる状態のルールと説明する |
| Defender for Cloud をウイルス対策だけだと思う | VM に入れる保護製品だけの話だと思う | セキュリティ体制管理、推奨事項、ワークロード保護の入口として説明する |
| Cost Management を請求書確認だけだと思う | 月末に金額を見るサービスだと思う | 予算、アラート、タグ、推奨事項と組み合わせて事前に管理するものと説明する |
| Key Vault があれば秘密情報が自動で安全になると思う | 置くだけでアプリの設計が不要だと思う | Key Vault にアクセスする ID、権限、ネットワーク、監査も合わせて設計する必要があると説明する |
| Storage と Database を混同する | どちらもデータを置く場所として同じだと思う | Blob や Files はファイルやオブジェクト、DB は検索・更新・整合性を扱うと分ける |
| バックアップと冗長化を混同する | 冗長化していれば誤削除からも戻せると思う | 冗長化は止まりにくくする設計、バックアップは戻れる状態を残す設計と説明する |
| Advisor の推奨事項をすべて即時適用すべきと思う | 推奨事項は正解なので自動反映すべきと思う | 推奨事項は判断材料であり、影響、費用、運用方針を確認して適用するものと説明する |

## 講師が見る確認ポイント

- 受講者が「認証」と「認可」を分けて説明できているか。
- RBAC のロール割り当てを、誰に、何を、どこで、という言い方で説明できているか。
- Azure Policy を、権限管理ではなくガバナンスと準拠性の仕組みとして理解しているか。
- Defender for Cloud、Advisor、Cost Management の推奨事項を、自動適用する答えではなく判断材料として受け取れているか。
- Key Vault を、秘密情報の置き場所だけでなく、ID と権限でアクセスするサービスとして理解しているか。
- Storage、Backup、Database、冗長化の違いを混同していないか。
- 第9回から第11回で扱うサービスを、本回で詳細に覚えようとしていないか。

## 復旧できない場合のスキップ手順

本回は座学のみのため、Azure リソース作成失敗による復旧手順はありません。
ただし、時間不足や受講者の理解負荷が高い場合は、次の順に扱います。

1. 必須として、Microsoft Entra ID と Azure RBAC の違いを説明する。
2. 必須として、Azure Policy と Defender for Cloud の役割を説明する。
3. 必須として、Cost Management、Key Vault、Backup の代表的な利用場面を説明する。
4. 時間が不足した場合、Storage の詳細な使い分け、Advisor、Service Health は図表と参考資料への誘導に留める。
5. さらに時間が不足した場合、シナリオ別サービス選択表 `L08-T09` を使い、受講者があとで復習できるようにする。

Azure Portal の画面例を見せる予定で Portal が利用できない場合は、スクリーンショット素材または図表のみで進行します。
本回では実操作がないため、Portal 障害や権限不足があっても講義内容は継続できます。

## クリーンアップ手順

本回では Azure リソースを作成しないため、受講者によるクリーンアップはありません。

講師がデモ用に Azure Portal を開いた場合は、次を確認します。

- Defender for Cloud、Policy、Cost Management、Backup などの有料プランや設定を講義中に有効化していないこと。
- 誤って Key Vault の Secret、Storage access key、接続文字列、Service Principal の認証情報を表示していないこと。
- スクリーンショットや録画に、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、金額、リソース ID、秘密情報が写っていないこと。
- デモ用に一時的に作成したリソースや画面表示用のリソースがある場合は、講師が講座後に削除すること。

## 振り返り

本回のまとめは次の3点です。

1. Azure では、リソースを作るだけでなく、誰が、どこまで、何を操作できるかを Entra ID と Azure RBAC で考える。
2. 組織で Azure を使うには、Policy、Defender for Cloud、Cost Management、タグ、Advisor によって、ルール、セキュリティ、コスト、改善を継続的に見える化する。
3. 実アプリでは、Key Vault、Storage、Backup、Service Health などを組み合わせて、秘密情報、データ、復旧、Azure 側の状態確認も設計に含める。

次回は、Web 3層アーキテクチャとは異なる Web アプリケーション構成として、静的 Web サイト、SPA、Azure Static Web Apps、Azure Functions、データストア、イベント系サービスを扱います。

## 確認クイズ案

### Q1

Microsoft Entra ID と Azure RBAC の説明として正しいものはどれですか。

1. Entra ID は Azure リソースの課金を管理し、RBAC はバックアップを管理する。
2. Entra ID は ID とサインインを扱い、RBAC は Azure リソースへの操作権限を扱う。
3. Entra ID は VM のネットワークを作り、RBAC は DNS を管理する。
4. Entra ID と RBAC は同じもので、名前だけが違う。

正解: 2

### Q2

Azure RBAC のロール割り当てを構成する3つの要素はどれですか。

1. リージョン、SKU、タグ
2. VNet、サブネット、NSG
3. セキュリティプリンシパル、ロール定義、スコープ
4. メトリック、ログ、アラート

正解: 3

### Q3

Azure Policy の利用例として最も適切なものはどれですか。

1. 利用者のパスワードを保存する。
2. Japan East 以外へのリソース作成を拒否する。
3. Web アプリの HTML を配信する。
4. PostgreSQL の SQL クエリを高速化する。

正解: 2

### Q4

Azure Key Vault の主な利用場面として最も適切なものはどれですか。

1. シークレット、キー、証明書を安全に管理する。
2. VM の CPU 使用率をグラフ表示する。
3. 静的 Web サイトをホストする。
4. VNet peering の通信経路を作る。

正解: 1

### Q5

バックアップと冗長化の違いとして正しいものはどれですか。

1. 冗長化は過去の状態に戻すための仕組みで、バックアップは止まりにくくする仕組みである。
2. 冗長化とバックアップは同じなので片方だけでよい。
3. 冗長化は止まりにくくする設計で、バックアップは戻れる状態を残す設計である。
4. どちらも Cost Management の機能である。

正解: 3

### Q6

コストがどのチームや環境で発生しているかを追いやすくするために、設計時点から意識すべきものはどれですか。

1. タグとリソースグループの分け方
2. VM の OS イメージだけ
3. DNS の TTL だけ
4. ブラウザーのキャッシュだけ

正解: 1

## 講師向け補足

- 本回はサービス紹介の範囲が広いため、サービス名の網羅ではなく「困りごとからカテゴリを選ぶ」説明に寄せる。
- 講座中の Contributor 付与は学習効率のための運営上の判断であり、本番環境の推奨権限モデルではないことを明確にする。
- Microsoft Entra ID と Azure RBAC の違いは、過去回の GitHub Actions 用 Service Principal や Entra ID アプリ登録に接続して説明すると理解しやすい。
- 第6回で扱った GitHub Secret は GitHub Actions のデプロイ用秘密情報であり、実行時のシークレット管理では Key Vault を検討する、という切り分けを入れる。
- Defender for Cloud や一部のセキュリティプランは有料機能を含むため、講義中に設定を有効化しない。画面例はデモ環境またはマスク済みスクリーンショットを使う。
- Cost Management の画面には実金額、契約、請求情報が表示される可能性があるため、公開教材や録画では必ずマスクまたはデモデータを利用する。
- Microsoft Foundry は第10回で重点的に扱う。本回では「AI 関連の詳細は第10回」と境界を示すに留める。
- Azure Monitor、Log Analytics、Application Insights、診断設定は第11回で扱う。本回では Service Health と Advisor を運用入口として軽く触れるだけにする。
- Azure Storage は第9回の SPA 構成で再登場する可能性があるが、本回では汎用ストレージのカテゴリ理解に留める。

## 参考資料

- [Microsoft Learn: Microsoft Entra とは](https://learn.microsoft.com/ja-jp/entra/fundamentals/what-is-entra)
- [Microsoft Learn: Azure ロールベースのアクセス制御とは](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/overview)
- [Microsoft Learn: Azure Resource Manager とは](https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/management/overview)
- [Microsoft Learn: Azure 管理グループとは](https://learn.microsoft.com/ja-jp/azure/governance/management-groups/overview)
- [Microsoft Learn: タグを使用して Azure リソースと整理階層を整理する](https://learn.microsoft.com/ja-jp/azure/azure-resource-manager/management/tag-resources)
- [Microsoft Learn: Azure Policy とは](https://learn.microsoft.com/ja-jp/azure/governance/policy/overview)
- [Microsoft Learn: Microsoft Defender for Cloud とは](https://learn.microsoft.com/ja-jp/azure/defender-for-cloud/defender-for-cloud-introduction)
- [Microsoft Learn: Microsoft Cost Management + Billing の概要](https://learn.microsoft.com/ja-jp/azure/cost-management-billing/cost-management-billing-overview)
- [Microsoft Learn: Azure Advisor の概要](https://learn.microsoft.com/ja-jp/azure/advisor/advisor-overview)
- [Microsoft Learn: Azure Key Vault について](https://learn.microsoft.com/ja-jp/azure/key-vault/general/overview)
- [Microsoft Learn: Azure Storage の概要](https://learn.microsoft.com/ja-jp/azure/storage/common/storage-introduction)
- [Microsoft Learn: Azure Backup サービスとは](https://learn.microsoft.com/ja-jp/azure/backup/backup-overview)
- [Microsoft Learn: Azure Service Health とは](https://learn.microsoft.com/ja-jp/azure/service-health/overview)

参考資料は教材本文の主軸にはせず、受講者が復習するときの入口として提示します。