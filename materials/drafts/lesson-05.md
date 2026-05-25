# 第5回 Azure Container Apps と Azure Database for PostgreSQL を利用した Todo アプリの構築 1 ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第5回
- タイトル: Azure Container Apps と Azure Database for PostgreSQL を利用した Todo アプリの構築 1
- 形式: オンライン座学 + ハンズオン
- 時間: 60分 (50分レクチャー/ハンズオン、10分QA)
- 想定日: 2026年7月16日

## この回の位置づけ

第5回は、第3回と第4回で体験した単体 Web サーバ構築を、Web/API/DB を持つ実用的な Todo アプリケーション構成へ発展させる回です。
本回ではアプリケーションのデプロイ完了までは行わず、第6回でデプロイするために必要な Azure リソースを Azure Portal で作成し、後続手順で使う名前、URL、ID、接続情報を整理します。

第5回と第6回は連続したハンズオンです。
第5回の最後にリソースグループは削除せず、Azure Database for PostgreSQL Flexible Server を停止して第6回に引き継ぎます。

## 受講前提

- 第2回で Web 3層アプリケーションの基本を学んでいることが望ましい。
- 第3回で Azure VM とネットワーク/ストレージの関係を体験していることが望ましい。
- 第4回でコンテナ、コンテナイメージ、ACR、ACI の基本を学んでいることが望ましい。
- Azure Portal でリソースグループを作成し、リソースの Overview を確認した経験があることが望ましい。
- 受講者には、講師が用意する Azure サブスクリプションをスコープとして Contributor ロールが付与されている。
- 受講者は Microsoft Entra ID アプリ登録と Service Principal 作成を実行できる前提とする。
- 受講者個人の GitHub アカウントを利用できることが望ましい。組織端末やネットワーク制限がある場合は、講師が代替手順またはデモ手順を案内する。
- 受講者番号として `s01`、`s02` のような値が講師から案内されている。

## 到達目標

- Todo アプリケーションを構成する Web、API、DB が、Azure 上のどのサービスに対応するかを説明できる。
- Azure Container Apps、Azure Container Registry、Azure Database for PostgreSQL、VNet、Managed Identity、Entra ID アプリ登録の役割を概要レベルで説明できる。
- DBaaS として Azure Database for PostgreSQL を利用すると、通常の PostgreSQL サーバ運用のどの部分を Azure に任せられるかを理解できる。
- 第5回で作る範囲と、第6回でデプロイする範囲を区別できる。
- Azure Portal で第6回に必要な主要リソースを作成し、後続手順で必要になる値を整理できる。
- PostgreSQL の停止と削除の違いを理解し、第5回終了時に停止してコストを抑える理由を説明できる。

## 受講後に説明できること/操作できること

- Todo アプリの Web 層、API 層、DB 層を Azure Container Apps と Azure Database for PostgreSQL に対応付けて説明できる。
- Azure Portal でリソースグループ、VNet、ACR、プレースホルダー API/Web Container App、Container Apps Environment、PostgreSQL Flexible Server、Managed Identity、Entra ID アプリ登録を作成または確認できる。
- ACR 名、Container Apps Environment 名、API/Web Container App の URL、PostgreSQL サーバー名、DB 名、Managed Identity、Entra アプリの Client ID/Tenant ID などを記録できる。
- PostgreSQL Flexible Server を停止し、停止中もストレージなどの課金が残る可能性を説明できる。
- 第6回に引き継ぐ情報と、公開資料やスクリーンショットに残してはいけない秘密情報を区別できる。

## 本回で扱う範囲

- 第5回と第6回で構築する Todo アプリの全体アーキテクチャ
- 第5回で作る範囲と第6回で作る範囲の切り分け
- DBaaS と Azure Database for PostgreSQL Flexible Server の概要
- PostgreSQL の基本的な役割
- Azure Container Apps Environment の概要
- プレースホルダー API/Web Container App の作成と URL 記録
- Azure Container Registry の受講者ごとの作成
- VNet、サブネット、PostgreSQL 接続の基本
- Managed Identity の概要
- Microsoft Entra ID アプリ登録の概要
- Azure Portal での主要 Azure リソース作成
- 第6回に引き継ぐ値の記録
- PostgreSQL Flexible Server の停止

## 本回で扱わない範囲

- アプリケーションコードの詳細
- Dockerfile の詳細
- GitHub Actions の詳細な仕組み。第6回で扱う。
- GitHub Actions 用 Service Principal、Client secret、ロール割り当ての作成。第6回で扱う。
- Container Apps への本格的なアプリケーションデプロイ。第6回で扱う。
- PostgreSQL の詳細なチューニング、バックアップ、レプリケーション設計
- Private Endpoint、Private DNS、VNet 統合の詳細設計。第7回で深掘りする。
- 本番向けの可用性、ゾーン冗長、DR、監視、セキュリティレビュー
- IaC による構築
- Azure CLI による構築。CLI が必要な場合も本講座では Azure Cloud Shell に限定する。

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | 前回までの振り返り | VM/ACI の単体 Web サーバから複合アプリへ進む位置づけを確認する |
| 5-12分 | Todo アプリ全体像 | Web/API/DB と Azure サービスの対応を理解する |
| 12-20分 | DBaaS と PostgreSQL | DB をマネージドサービスで利用する意味を理解する |
| 20-25分 | 本回で作る範囲 | 第5回の作業と第6回への引き継ぎを明確にする |
| 25-43分 | ハンズオン | Azure Portal で主要リソースを作成する |
| 43-47分 | 接続情報整理 | 第6回で使う値を記録し、秘密情報の扱いを確認する |
| 47-50分 | PostgreSQL 停止確認 | 第6回に向けて削除せず停止する理由を理解する |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は50枚です。ハンズオン中心の回として35枚から55枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | Todo アプリの構築 1 | この回では、第6回でアプリをデプロイするための Azure リソースを作成します。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | 今日はアプリを完成させるのではなく、完成に必要な土台を作って値を記録します。 | 到達目標、作る範囲、停止まで行うこと | L05-D01 |
| 3 | 第3回から第4回の振り返り | これまでは Web サーバ単体を VM と ACI で動かしました。 | VM、ACI、Web 層単体の復習 | L05-D02 |
| 4 | 今回から複合アプリへ進む | Todo アプリでは、画面、API、データベースが連携して動きます。 | Web/API/DB の導入 | L05-D03 |
| 5 | Todo アプリの完成形 | 完成形では Web と API が Container Apps で動き、Todo データは PostgreSQL に保存されます。 | Web Container App、API Container App、PostgreSQL、ACR | L05-D04 |
| 6 | 第5回と第6回の分担 | 第5回は土台作り、第6回はデプロイと動作確認に集中します。 | 第5回で作るもの、第6回で行うこと | L05-D05 |
| 7 | Web/API/DB と Azure サービス | Web 層、API 層、DB 層を Azure の具体的なサービスに対応付けます。 | Web/API/DB、ACA、PostgreSQL、ACR | L05-T01 |
| 8 | DBaaS とは | DBaaS は、データベース運用の一部をクラウドサービスに任せる考え方です。 | 自分で管理する範囲、Azure に任せる範囲 | L05-D06 |
| 9 | PostgreSQL の役割 | PostgreSQL は、Todo データを表として保存し、API から問い合わせられるデータベースです。 | RDBMS、テーブル、接続、トランザクション | L05-D07 |
| 10 | Azure Database for PostgreSQL | Azure Database for PostgreSQL は、PostgreSQL をマネージドサービスとして利用する選択肢です。 | Flexible Server、バックアップ、パッチ、停止 | L05-D08 |
| 11 | 停止と削除の違い | 停止は第6回に引き継ぐための一時停止で、削除とは違います。 | コンピュート課金、ストレージ課金、再開 | L05-D09 |
| 12 | Container Apps Environment | Container Apps Environment は、複数の Container Apps を動かすための環境です。 | Environment、Web/API の実行場所、境界 | L05-D10 |
| 13 | ACR の役割 | 第5回から第6回では、受講者ごとに ACR を作成してアプリのコンテナイメージを置きます。 | 第4回の共有 ACR との違い、受講者ごとの ACR | L05-D11 |
| 14 | VNet とサブネット | アプリとデータベースを安全につなぐため、ネットワークの区画を意識します。 | VNet、サブネット、DB 接続、第7回への接続 | L05-D12 |
| 15 | Managed Identity | Managed Identity は、資格情報を直接持たずに Azure リソースへアクセスするための仕組みです。 | シークレット削減、Azure 内の認証 | L05-D13 |
| 16 | Entra ID アプリ登録 | Web サインインには、Microsoft Entra ID のアプリ登録が必要になります。 | App registration、SPA redirect URI、Client ID、Tenant ID | L05-D14 |
| 17 | 秘密情報の扱い | 接続文字列や資格情報は、スクリーンショットや公開資料に残してはいけません。 | 記録する値、記録しない値、マスク対象 | L05-D15 |
| 18 | ハンズオンで使う値 | 名前をそろえると、複数リソースの関係と第6回への引き継ぎが分かりやすくなります。 | RG、VNet、ACR、CAE、PostgreSQL、Identity | L05-T02 |
| 19 | ハンズオンの流れ | リソースを作成し、値を記録し、最後に PostgreSQL を停止します。 | 作業ステップ全体 | L05-D16 |
| 20 | Azure Portal にサインイン | 講師が案内したアカウントで Azure Portal にサインインします。 | Portal URL、サブスクリプション確認 | L05-SS01 |
| 21 | リソースグループを作成する | 第5回から第6回で使うリソースは、同じリソースグループにまとめます。 | RG 作成、Japan East、削除しない注意 | L05-SS02 |
| 22 | リソースグループ作成を確認する | 作成したリソースグループが表示されることを確認します。 | Overview、場所、タグ | L05-SS03 |
| 23 | VNet を作成する | Container Apps と PostgreSQL の接続を考える土台として VNet を作成します。 | VNet 名、アドレス空間 | L05-SS04 |
| 24 | サブネットを作成する | アプリ実行環境、Private Endpoint、PostgreSQL の区画を分けて考えます。 | `snet-container-apps`、`snet-private-endpoints`、`snet-postgresql` | L05-SS05 |
| 25 | ACR を作成する | 元のガイドの「オプション A: 特定公開アクセスを有効にする」に従って、受講者ごとの ACR を作成します。 | ACR 名、Premium SKU、Private endpoint、特定公開アクセス。HTML版では1スライド内に2枚のスクリーンショットを並べる | L05-SS06a / L05-SS06b |
| 26 | ACR の Overview を確認する | 第6回で使うログインサーバー名を確認します。 | Login server、Registry name | L05-SS07 |
| 27 | API Container App と Environment を作成する | 元ガイドどおり、まずプレースホルダー API Container App を作成し、この中で Environment も作成します。 | API app、CAE、VNet、プレースホルダーイメージ | L05-SS09 |
| 28 | API Container App の URL を記録する | 第6回の設定で使う内部 API URL を記録します。 | Application URL、internal URL、マスク注意 | L05-SS10 |
| 29 | Web Container App を作成する | 同じ Environment にプレースホルダー Web Container App を作成します。 | Web app、CAE 選択、Ingress、プレースホルダーイメージ | L05-SS29 |
| 30 | Web Container App の URL を記録する | Entra ID アプリ登録の redirect URI と第6回の設定で使う Web URL を記録します。 | Web Application URL、redirect URI | L05-SS30 |
| 31 | PostgreSQL Flexible Server を作成する | Todo データを保存する PostgreSQL サーバーを作成します。 | Server name、Region、Version、Compute | L05-SS11 |
| 32 | PostgreSQL の認証を設定する | 元ガイドに合わせて、Microsoft Entra authentication only を選択します。 | 認証方式、Entra administrator、シークレット注意 | L05-SS12 |
| 33 | PostgreSQL のネットワークを設定する | Container Apps から PostgreSQL へ接続できるよう、ネットワーク設定を確認します。 | Private access、VNet Integration、Private DNS | L05-SS13 |
| 34 | PostgreSQL の作成内容を確認する | 作成前に、リージョン、SKU、ネットワーク、認証方式を確認します。 | Review + create、Validation passed | L05-SS14 |
| 35 | PostgreSQL の Overview を確認する | サーバー名、状態、接続に必要な値を確認します。 | Server name、FQDN、Status | L05-SS15 |
| 36 | Managed Identity を作成する | DB への権限付与に使う User-assigned Managed Identity を作成します。 | User-assigned managed identity | L05-SS17 |
| 37 | Managed Identity の値を記録する | DB 権限付与と第6回の設定で使う Client ID などを確認します。 | Client ID、Resource ID、マスク注意 | L05-SS18 |
| 38 | データベースを作成し権限を付与する | Todo アプリ用 DB を作成し、作成した Managed Identity に DB のパーミッションを付与します。 | Database name、`tododb`、Managed Identity 権限。HTML版では1スライド内に2枚のスクリーンショットを並べる | L05-SS16a / L05-SS16b |
| 39 | Entra ID アプリ登録を作成する | Web サインイン用のアプリ登録を作成し、Web Container App URL を redirect URI に設定します。 | App registration、SPA redirect URI | L05-SS19 |
| 40 | アプリ登録の ID を記録する | Application client ID と Tenant ID を記録します。 | Client ID、Tenant ID、Directory ID | L05-SS20 |
| 41 | 接続情報一覧に記録する | フェーズ1.9のサマリーとして、必要な値を一覧にまとめます。 | 記録テンプレート、元ガイドのステップ1.9、秘密情報の扱い | L05-T03 / L05-SS27 |
| 42 | 記録すべき値と隠す値 | 第6回で必要な値と、公開してはいけない値を分けます。 | 接続文字列、サーバー名、ID、URL | L05-T04 |
| 43 | 作成済みリソースを確認する | リソースグループ内に必要なリソースがそろっているか確認します。 | RG リソース一覧 | L05-SS24 |
| 44 | 第5回終了時点のアーキテクチャ | まだ実アプリのイメージは動いていませんが、フェーズ1.9までの土台ができました。 | 作成済み/第6回で更新する範囲の色分け | L05-D17 |
| 45 | PostgreSQL を停止する | 第6回までリソースは残しつつ、DB のコンピュート課金を抑えます。 | Stop、状態確認、削除しない | L05-SS25 |
| 46 | 停止後の課金注意 | 停止してもストレージなどの課金が残る可能性があります。 | 停止中の課金、再開、削除は第6回後 | L05-D18 |
| 47 | よくある失敗 | 名前重複、権限不足、記録漏れ、PostgreSQL 停止忘れがつまずきやすいポイントです。 | 失敗パターン一覧 | L05-T05 |
| 48 | 復旧できない場合 | 時間内に直せない場合は、講師のサンプル値とデモ環境で第6回へつなぎます。 | スキップ手順、デモ環境 | L05-D19 |
| 49 | 今日のまとめ | 今日は Todo アプリの土台を作り、第6回で使う値をそろえました。 | 3つのまとめ | L05-D20 |
| 50 | QA | 作成したリソースと、第6回に持ち越す値を確認します。 | 質疑応答 | なし |

## 図表・スクリーンショット素材一覧

本回はハンズオン回のため、Azure Portal と GitHub のスクリーンショットが必須です。
`L05-Dxx` は AI または draw.io で作成する図表、`L05-Txx` は表、`L05-SSxx` は筆者が取得するスクリーンショットとして管理します。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L05-D01 | 図表 | 必須 | AI/draw.io で作成 | 今日のゴールと完成状態 |
| L05-D02 | 図表 | 必須 | AI/draw.io で作成 | 第3回から第4回の振り返り |
| L05-D03 | 図表 | 必須 | AI/draw.io で作成 | 単体 Web サーバから複合アプリへ |
| L05-D04 | 図表 | 必須 | AI/draw.io で作成 | Todo アプリ完成アーキテクチャ |
| L05-D05 | 図表 | 必須 | AI/draw.io で作成 | 第5回と第6回の分担 |
| L05-D06 | 図表 | 必須 | AI/draw.io で作成 | DBaaS の責任分界 |
| L05-D07 | 図表 | 必須 | AI で作成 | PostgreSQL の役割 |
| L05-D08 | 図表 | 必須 | AI/draw.io で作成 | Azure Database for PostgreSQL の概要 |
| L05-D09 | 図表 | 必須 | AI で作成 | 停止と削除の違い |
| L05-D10 | 図表 | 必須 | AI/draw.io で作成 | Container Apps Environment の役割 |
| L05-D11 | 図表 | 必須 | AI/draw.io で作成 | 第4回共有 ACR と第5回個別 ACR の違い |
| L05-D12 | 図表 | 必須 | AI/draw.io で作成 | VNet とサブネットの関係 |
| L05-D13 | 図表 | 任意 | AI/draw.io で作成 | Managed Identity の概要 |
| L05-D14 | 図表 | 必須 | AI/draw.io で作成 | Entra ID アプリ登録と GitHub Actions の関係 |
| L05-D15 | 図表 | 必須 | AI で作成 | 秘密情報の扱い |
| L05-D16 | 図表 | 必須 | AI/draw.io で作成 | ハンズオン進行図 |
| L05-D17 | 図表 | 必須 | AI/draw.io で作成 | 第5回終了時点のアーキテクチャ |
| L05-D18 | 図表 | 必須 | AI で作成 | PostgreSQL 停止後の課金注意 |
| L05-D19 | 図表 | 任意 | AI で作成 | スキップ手順の判断フロー |
| L05-D20 | 図表 | 必須 | AI で作成 | 今日のまとめ |
| L05-T01 | 表 | 必須 | AI で作成 | Web/API/DB と Azure サービス対応表 |
| L05-T02 | 表 | 必須 | AI で作成 | ハンズオン入力値一覧 |
| L05-T03 | 表 | 必須 | AI で作成 | 第6回に引き継ぐ接続情報テンプレート |
| L05-T04 | 表 | 必須 | AI で作成 | 記録すべき値と隠す値 |
| L05-T05 | 表 | 必須 | AI で作成 | よくある失敗一覧 |
| L05-SS01 | スクリーンショット | 必須 | 筆者が提供 | Azure Portal サインイン後のホームまたはサブスクリプション確認 |
| L05-SS02 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ作成画面 |
| L05-SS03 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ Overview |
| L05-SS04 | スクリーンショット | 必須 | 筆者が提供 | VNet 作成画面 |
| L05-SS05 | スクリーンショット | 必須 | 筆者が提供 | サブネット作成または確認画面 |
| L05-SS06a | スクリーンショット | 必須 | 筆者が提供 | ACR 作成画面の基本設定。スライド25で L05-SS06b と同一スライドに配置する |
| L05-SS06b | スクリーンショット | 必須 | 筆者が提供 | ACR 作成画面のネットワーク設定。特定公開アクセス設定を含む。スライド25で L05-SS06a と同一スライドに配置する |
| L05-SS07 | スクリーンショット | 必須 | 筆者が提供 | ACR Overview と login server |
| L05-SS09 | スクリーンショット | 必須 | 筆者が提供 | API Container App と Container Apps Environment 作成画面 |
| L05-SS10 | スクリーンショット | 必須 | 筆者が提供 | API Container App Overview と Application URL |
| L05-SS11 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Flexible Server 作成 Basics |
| L05-SS12 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL 認証設定画面 |
| L05-SS13 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL ネットワーク設定画面 |
| L05-SS14 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Review + create |
| L05-SS15 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Overview とサーバー名 |
| L05-SS16a | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Database 作成画面。スライド38で L05-SS16b と同一スライドに配置する |
| L05-SS16b | スクリーンショット | 必須 | 筆者が提供 | Managed Identity への DB パーミッション付与画面。スライド38で L05-SS16a と同一スライドに配置する |
| L05-SS17 | スクリーンショット | 必須 | 筆者が提供 | Managed Identity 作成画面 |
| L05-SS18 | スクリーンショット | 必須 | 筆者が提供 | Managed Identity Overview |
| L05-SS19 | スクリーンショット | 必須 | 筆者が提供 | Entra ID App registration 作成画面 |
| L05-SS20 | スクリーンショット | 必須 | 筆者が提供 | App registration Overview と Client ID/Tenant ID |
| L05-SS24 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ内の作成済みリソース一覧 |
| L05-SS25 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Stop 操作画面 |
| L05-SS26 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Stopped 状態確認画面 |
| L05-SS27 | スクリーンショット | 任意 | 筆者が提供 | アプリの元ガイドのステップ1.9「サマリー - すべてのリソース詳細を収集」の該当箇所。L05-T03 の補助として参照する |
| L05-SS29 | スクリーンショット | 必須 | 筆者が提供 | Web Container App 作成画面 |
| L05-SS30 | スクリーンショット | 必須 | 筆者が提供 | Web Container App Overview と Application URL |

## 図表案

### L05-D01 今日のゴールと完成状態

目的: 本回が「土台作り」であり、アプリ完成は第6回であることを示す。

構成:

- 第5回で作る: Resource group、VNet、ACR、プレースホルダー API/Web Container App、Container Apps Environment、PostgreSQL、Managed Identity、Entra アプリ登録
- 第6回で行う: GitHub Actions、Container Apps への実イメージデプロイ、Todo アプリ動作確認
- 第5回の完了条件: 値を記録し、PostgreSQL を停止する

### L05-D02 第3回から第4回の振り返り

目的: 単体 Web サーバから複合アプリへ進む流れを示す。

構成:

- 第3回: VM + NGINX
- 第4回: ACI + NGINX コンテナ
- 第5回から第6回: Web/API/DB の Todo アプリ

### L05-D03 単体 Web サーバから複合アプリへ

目的: Web サーバだけでは Todo の保存や API 処理が不足することを説明する。

構成:

- 単体 Web サーバ: 画面表示中心
- Todo アプリ: Web、API、DB の連携
- データ保存が必要になることを強調

### L05-D04 Todo アプリ完成アーキテクチャ

目的: 第6回終了時の完成形を先に示す。

構成:

- 利用者ブラウザー
- Web Container App
- API Container App
- Azure Database for PostgreSQL Flexible Server
- Azure Container Registry
- Container Apps Environment
- VNet とサブネット
- Managed Identity
- GitHub Actions

### L05-D05 第5回と第6回の分担

目的: 2回連続ハンズオンの進行を明確にする。

構成:

- 第5回: Azure リソース作成、値の記録、PostgreSQL 停止
- 第6回: PostgreSQL 再開、Service Principal と GitHub Actions 設定、実イメージへの更新、動作確認、最終停止/削除

### L05-D06 DBaaS の責任分界

目的: DBaaS で Azure に任せられる範囲と、利用者が決める範囲を示す。

構成:

- Azure が管理: 物理基盤、マネージド DB 基盤、バックアップ機能、パッチ機能
- 利用者が管理: データモデル、接続元、認証、ネットワーク、コスト、アプリからの利用

### L05-D07 PostgreSQL の役割

目的: PostgreSQL が Todo データを保存する場所であることを示す。

構成:

- API Container App
- PostgreSQL database
- Todo テーブルの抽象図
- 作成、更新、削除、検索の矢印

### L05-D08 Azure Database for PostgreSQL の概要

目的: 通常の PostgreSQL と Azure Database for PostgreSQL の違いを簡単に示す。

構成:

- PostgreSQL エンジン
- Flexible Server
- バックアップ、パッチ、停止/開始、スケール
- 本回では詳細設計に入らない注記

### L05-D09 停止と削除の違い

目的: 第5回終了時に削除せず停止する理由を示す。

構成:

- 停止: 第6回で再開して利用する。コンピュート課金を抑える。
- 削除: リソースとデータを消す。第6回前には行わない。
- 停止中もストレージ課金などが残る可能性を注記

### L05-D10 Container Apps Environment の役割

目的: Web/API の Container App を動かす共通環境として理解させる。

構成:

- Container Apps Environment
- 第5回でプレースホルダー API/Web Container App を作成
- 第6回で GitHub Actions から実アプリのイメージへ更新
- 監視用ワークスペースは単独スライドにせず、元ガイドの Environment 作成手順内で扱う
- VNet との関係

### L05-D11 第4回共有 ACR と第5回個別 ACR の違い

目的: 第4回では共有 ACR、第5回以降では受講者ごとの ACR を使う違いを示す。

構成:

- 第4回: 講師共有 ACR、受講者は pull のみ
- 第5回から第6回: 受講者ごとの ACR、GitHub Actions から push/pull

### L05-D12 VNet とサブネットの関係

目的: アプリ実行環境と DB 接続のネットワーク区画を示す。

構成:

- VNet
- Container Apps Environment 用サブネット
- DB 接続用サブネットまたは Private Endpoint 用サブネット
- 参照手順と講師検証に合わせて最終値を確定する注記

### L05-D13 Managed Identity の概要

目的: Azure リソース間の認証で、秘密情報の扱いを減らす考え方を示す。

構成:

- Managed Identity
- Azure Container Apps
- ACR または他 Azure リソース
- シークレットを直接持たない認証の入口

### L05-D14 Entra ID アプリ登録と GitHub Actions の関係

目的: 第6回の GitHub Actions が Azure にアクセスするための認証の入口を示す。

構成:

- GitHub Actions
- Entra ID App registration / Service Principal
- Azure Resource Manager
- Resource group / ACR / Container Apps

### L05-D15 秘密情報の扱い

目的: どの値を教材やスクリーンショットに残してはいけないかを示す。

構成:

- 残してよい例: リソース名、リージョン、ACR 名
- 注意して扱う例: Client ID、Tenant ID、Subscription ID
- 残してはいけない例: 接続文字列、Service Principal の secret、認証情報

### L05-D16 ハンズオン進行図

目的: 第5回の操作順序を示す。

構成:

1. リソースグループ作成
2. VNet/サブネット作成
3. ACR 作成
4. API Container App と Container Apps Environment 作成
5. API URL 記録
6. Web Container App 作成
7. Web URL 記録
8. PostgreSQL Flexible Server 作成
9. Managed Identity 作成
10. データベース作成と Managed Identity への DB 権限付与
11. Entra ID アプリ登録
12. 接続情報整理
13. PostgreSQL 停止

### L05-D17 第5回終了時点のアーキテクチャ

目的: 第5回終了時点で何ができ、何が未完成かを示す。

構成:

- 作成済み: RG、VNet、ACR、プレースホルダー API/Web Container App、Container Apps Environment、PostgreSQL、Managed Identity、Entra アプリ登録
- 第6回で更新: GitHub Actions デプロイ、実アプリのコンテナイメージ、動作確認

### L05-D18 PostgreSQL 停止後の課金注意

目的: 停止してもすべての課金が消えるわけではないことを説明する。

構成:

| 状態 | コンピュート課金 | ストレージ等 | 第5回の扱い |
| --- | --- | --- | --- |
| Running | 発生する | 発生する可能性あり | ハンズオン中のみ |
| Stopped | 抑えられる | 残る可能性あり | 第6回までの状態 |
| Deleted | 消える | 消える | 第6回終了後の判断 |

### L05-D19 スキップ手順の判断フロー

目的: 権限やクォータで進めない場合でも、第6回の理解につなげる。

構成:

- 権限不足
- 名前重複
- PostgreSQL 作成失敗
- Entra アプリ登録失敗
- 講師サンプル値へ切り替え
- 第6回のデモ環境へ接続

### L05-D20 今日のまとめ

目的: 第5回で押さえるべき要点を3つに絞る。

構成:

- Todo アプリは複数サービスで構成する
- 第5回は土台作りと値の記録がゴール
- PostgreSQL は削除せず停止して第6回に引き継ぐ

### L05-T01 Web/API/DB と Azure サービス対応表

目的: Web 3層の役割と Azure サービスの対応を整理する。

構成:

| 役割 | Azure サービス | 第5回での状態 |
| --- | --- | --- |
| Web 層 | Azure Container Apps | 第5回でプレースホルダー作成、第6回で実イメージへ更新 |
| API 層 | Azure Container Apps | 第5回でプレースホルダー作成、第6回で実イメージへ更新 |
| DB 層 | Azure Database for PostgreSQL Flexible Server | 第5回で作成 |
| イメージ保管 | Azure Container Registry | 第5回で作成 |
| 実行環境 | Container Apps Environment | 第5回で作成 |
| 認証/権限 | Managed Identity、Entra ID アプリ登録 | 第5回で作成または確認 |

### L05-T02 ハンズオン入力値一覧

目的: リソース名と第6回への引き継ぎ値をそろえる。

構成:

| 項目 | 値の例 | 注意 |
| --- | --- | --- |
| リソースグループ名 | `rg-azbeg-l05-s01` | 第6回まで削除しない |
| VNet 名 | `vnet-azbeg-l05-s01` | 参照手順に合わせてアドレス範囲を確定 |
| ACR 名 | `acrazbegl05s01<接尾辞>` | 小文字英数字、グローバル一意、ハイフン不可。元ガイドどおり Premium SKU を想定 |
| API Container App | `app-todomanagement-api` | 元ガイド推奨名。第6回で実イメージへ更新 |
| Web Container App | `app-todomanagement-web` | 元ガイド推奨名。Entra ID redirect URI に利用 |
| Container Apps Environment | `cae-azbeg-l05-s01` | API/Web を配置 |
| PostgreSQL server | `psql-azbeg-l05-s01-<接尾辞>` | グローバル一意 |
| Database name | `tododb` | 参照手順に合わせる |
| Managed Identity | `id-azbeg-l05-s01` | 第6回で利用 |
| Entra app registration | `app-azbeg-l05-s01` | Web サインイン用 |

### L05-T03 第6回に引き継ぐ接続情報テンプレート

目的: 第6回でデプロイ時に使う値を整理する。

構成:

| 項目 | 記録欄 | 秘密情報か |
| --- | --- | --- |
| Subscription ID | 講師指定または Portal で確認 | 公開資料ではマスク |
| Tenant ID | App registration Overview で確認 | 公開資料ではマスク |
| Entra app client ID | App registration Overview で確認 | 公開資料ではマスク |
| Resource group | `rg-azbeg-l05-<受講者番号>` | 秘密ではない |
| Virtual Network | VNet Overview で確認 | 秘密ではないが実環境名は注意 |
| Container Apps subnet | VNet Subnets で確認 | 元ガイドでは `snet-container-apps` |
| Private Endpoints subnet | VNet Subnets で確認 | 元ガイドでは `snet-private-endpoints` |
| PostgreSQL subnet | VNet Subnets で確認 | 元ガイドでは `snet-postgresql` |
| ACR login server | ACR Overview で確認 | 秘密ではないが実環境名は注意 |
| Web Container App URL | Web Container App Overview で確認 | 公開時は必要に応じてマスク |
| API Container App URL | API Container App Overview で確認 | 公開時は必要に応じてマスク |
| PostgreSQL server name | PostgreSQL Overview で確認 | 公開時は必要に応じてマスク |
| Container Apps Environment | CAE Overview で確認 | 秘密ではない |

### L05-T04 記録すべき値と隠す値

目的: 第6回で必要な情報と、公開してはいけない情報を分ける。

構成:

| 分類 | 例 | 扱い |
| --- | --- | --- |
| 記録する値 | リソース名、ACR login server、DB 名 | 第6回用メモに記録 |
| 公開時にマスクする値 | Subscription ID、Tenant ID、Client ID、FQDN | 教材化時はマスク |
| 絶対に公開しない値 | 接続文字列、認証情報、Service Principal の secret | スクリーンショットにも残さない |

### L05-T05 よくある失敗一覧

目的: 講師が短時間で症状から確認先へ誘導できるようにする。

構成:

| 失敗 | 症状 | 確認箇所 | 対応 |
| --- | --- | --- | --- |
| 名前重複 | ACR/PostgreSQL の作成に失敗 | リソース名 | 接尾辞を追加する |
| 権限不足 | 作成やアプリ登録、DB 権限付与に失敗 | RBAC、Entra ID 設定、PostgreSQL Authentication | 講師が権限を確認 |
| DB パーミッション不足 | 第6回で API から DB 接続に失敗する | PostgreSQL の DB 権限、Managed Identity | 元ガイドに従って対象 ID へ権限を付与 |
| ネットワーク設定ミス | DB へ接続できない可能性 | PostgreSQL Networking、VNet | 参照手順に合わせて修正 |
| 記録漏れ | 第6回で値が分からない | 接続情報テンプレート | Overview から再確認 |
| 秘密情報漏えい | スクリーンショットに secret が写る | 画像、メモ | 画像を使わず再取得 |
| 停止忘れ | PostgreSQL が Running のまま | PostgreSQL Overview | Stop を実行 |

## スクリーンショット取得指示

スクリーンショットは、講座用または検証用のサブスクリプションで取得します。
公開用に利用する可能性があるため、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、接続文字列、認証情報、課金情報は写さないか、公開前にマスクします。

| スクリーンショットID | 対象画面 | 用途 | 推奨サイズ | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- | --- |
| L05-SS01 | Azure Portal ホームまたはサブスクリプション確認画面 | Portal サインイン後の確認 | 1600 x 900 (16:9) | 対象サブスクリプションを選択できることを示す | ユーザー名、メールアドレス、サブスクリプション ID、テナント ID |
| L05-SS02 | Resource groups > Create | リソースグループ作成 | 1440 x 900 (16:10) | `rg-azbeg-l05-s01` のようなサンプル名で取得する | サブスクリプション ID、ユーザー名 |
| L05-SS03 | Resource group Overview | 作成確認 | 1600 x 900 (16:9) | 第6回まで削除しない旨を本文で補足する | リソース ID、サブスクリプション ID |
| L05-SS04 | Virtual networks > Create | VNet 作成 | 1440 x 900 (16:10) | 名前、リージョン、アドレス空間が分かるようにする | サブスクリプション ID、ユーザー名 |
| L05-SS05 | VNet の Subnets | サブネット作成/確認 | 1600 x 900 (16:9) | サブネット名と用途が分かる状態で取得する | リソース ID、サブスクリプション ID |
| L05-SS06a | Container registry > Create > Basics | ACR 作成の基本設定 | 1440 x 900 (16:10) | ACR 名、Premium SKU、リージョンが分かる状態で取得する。HTML版では L05-SS06b と同じスライドに左右または上下で配置する | サブスクリプション ID、ユーザー名 |
| L05-SS06b | Container registry > Create > Networking | ACR 作成のネットワーク設定 | 1440 x 900 (16:10) | Private endpoint と、元のガイドの「オプション A: 特定公開アクセスを有効にする」に従ったネットワーク設定が分かる状態で取得する。HTML版では L05-SS06a と同じスライドに左右または上下で配置する | サブスクリプション ID、ユーザー名、Private IP、内部ネットワーク情報 |
| L05-SS07 | ACR Overview | ACR 値記録 | 1600 x 900 (16:9) | Login server が分かる状態。実環境名は公開時に必要に応じてマスク | リソース ID、サブスクリプション ID |
| L05-SS09 | Container Apps > Create | API Container App と CAE 作成 | 1200 x 1600 (3:4) | `app-todomanagement-api`、新規 Container Apps Environment、VNet、プレースホルダーイメージが分かるようにする。監視用ワークスペースは Environment 作成手順内の設定として扱い、単独スライドにしない | サブスクリプション ID、リソース ID |
| L05-SS10 | API Container App Overview | API URL 記録 | 1600 x 900 (16:9) | Application URL が分かる状態。内部 URL は公開時に必要に応じてマスク | リソース ID、サブスクリプション ID、内部 FQDN |
| L05-SS11 | PostgreSQL Flexible Server Basics | DB 作成 | 1440 x 900 (16:10) | Server name、Region、Version、Compute が分かるようにする | サブスクリプション ID、実サーバー名 |
| L05-SS12 | PostgreSQL Authentication | 認証設定 | 1440 x 900 (16:10) | Entra administrator と認証方式が分かる状態。個人情報は写さない | ユーザー名、メールアドレス、認証情報 |
| L05-SS13 | PostgreSQL Networking | DB ネットワーク設定 | 1200 x 1600 (3:4) | 参照手順に合わせた接続方式が分かるようにする | サブスクリプション ID、Private IP、内部情報 |
| L05-SS14 | PostgreSQL Review + create | 作成前確認 | 1200 x 1600 (3:4) | Validation passed と主要設定が見える状態 | サブスクリプション ID、パスワード、内部情報 |
| L05-SS15 | PostgreSQL Overview | DB 値記録 | 1600 x 900 (16:9) | Server name、Status が分かる状態 | リソース ID、サブスクリプション ID、必要に応じてサーバー名 |
| L05-SS16a | PostgreSQL Databases | DB 作成 | 1200 x 1600 (3:4) | `tododb` などの DB 名が分かる状態で取得する。HTML版では L05-SS16b と同じスライドに左右または上下で配置する | リソース ID、サブスクリプション ID、DB ユーザー名 |
| L05-SS16b | PostgreSQL 権限設定 / 実行結果 | Managed Identity への権限付与 | 1200 x 1600 (3:4) | 作成した Managed Identity に DB のパーミッションを付与する操作または結果が分かる状態で取得する。コマンドや値を写す場合は秘密情報を含めない。HTML版では L05-SS16a と同じスライドに左右または上下で配置する | リソース ID、サブスクリプション ID、DB ユーザー名、内部情報 |
| L05-SS17 | Managed Identities > Create | Managed Identity 作成 | 1440 x 900 (16:10) | 名前とリージョンが分かるようにする | サブスクリプション ID、ユーザー名 |
| L05-SS18 | Managed Identity Overview | ID 値記録 | 1600 x 900 (16:9) | Client ID、Resource ID などを確認する。公開時はマスク | Client ID、Resource ID、Subscription ID |
| L05-SS19 | Microsoft Entra ID > App registrations > New registration | App registration 作成 | 1440 x 900 (16:10) | 名前と supported account type が分かる状態 | テナント ID、ユーザー名 |
| L05-SS20 | App registration Overview | Client ID/Tenant ID 記録 | 1600 x 900 (16:9) | IDs が分かる状態。公開時は必ずマスク | Client ID、Tenant ID、Object ID |
| L05-SS24 | Resource group 内のリソース一覧 | 作成済み確認 | 1600 x 900 (16:9) | 第5回で作成したリソースが並ぶ状態 | リソース ID、サブスクリプション ID |
| L05-SS25 | PostgreSQL Stop 操作画面 | 停止操作 | 1440 x 900 (16:10) | Stop ボタンまたは確認ダイアログが分かる状態 | サブスクリプション ID、サーバー名 |
| L05-SS26 | PostgreSQL Stopped 状態 | 停止確認 | 1600 x 900 (16:9) | Status が Stopped であることを示す | サブスクリプション ID、サーバー名 |
| L05-SS27 | アプリの元ガイド ステップ1.9「サマリー - すべてのリソース詳細を収集」 | 第6回引き継ぎ値の参照元を示す | 1600 x 900 (16:9) | GitHub 上の `DEPLOY_GUIDE_GUI-ja_JP.md` のステップ1.9該当セクションを表示して取得する。Azure Portal の一覧画面ではなく、元ガイドのサマリー項目を参照して値を集める意図が分かる画角にする | ブラウザーのアカウント情報、リポジトリ外の個人情報、表示される実 ID や secret |
| L05-SS29 | Container Apps > Create | Web Container App 作成 | 1200 x 1600 (3:4) | `app-todomanagement-web`、既存 Container Apps Environment、Ingress、プレースホルダーイメージが分かるようにする | サブスクリプション ID、リソース ID |
| L05-SS30 | Web Container App Overview | Web URL 記録 | 1600 x 900 (16:9) | Application URL が分かる状態。Entra ID redirect URI に使うことを本文で補足する | リソース ID、サブスクリプション ID、FQDN |

## ハンズオン手順案

### ハンズオンのゴール

Azure Portal を使って、第6回の Todo アプリデプロイに必要な Azure リソースを作成します。
本回の最後に、必要な値を接続情報一覧に記録し、Azure Database for PostgreSQL Flexible Server を停止します。

### 入力値

| 項目 | 値の例 | 備考 |
| --- | --- | --- |
| リージョン | Japan East | 利用できない場合は講師が代替リージョンを指定 |
| 受講者番号 | `s01` | 講師が事前に採番 |
| リソースグループ名 | `rg-azbeg-l05-s01` | 第6回まで削除しない |
| VNet 名 | `vnet-azbeg-l05-s01` | アドレス空間は講師指定値を利用 |
| Container Apps 用サブネット | `snet-container-apps` | 元ガイドに合わせる |
| Private Endpoint 用サブネット | `snet-private-endpoints` | ACR の Private Endpoint で利用 |
| PostgreSQL 用サブネット | `snet-postgresql` | PostgreSQL Flexible Server で利用 |
| ACR 名 | `acrazbegl05s01<接尾辞>` | 小文字英数字、グローバル一意、ハイフン不可。SKU は Premium を想定 |
| API Container App | `app-todomanagement-api` | 元ガイド推奨名 |
| Web Container App | `app-todomanagement-web` | 元ガイド推奨名 |
| Container Apps Environment | `cae-azbeg-l05-s01` | API/Web を配置 |
| PostgreSQL server | `psql-azbeg-l05-s01-<接尾辞>` | グローバル一意 |
| PostgreSQL database | `tododb` | 参照手順に合わせる |
| Managed Identity | `id-azbeg-l05-s01` | 第6回で利用 |
| Entra app registration | `app-azbeg-l05-s01` | Web サインイン用 |
| タグ | `Course=AzureWorkshopForBeginners`, `Lesson=L05`, `StudentId=s01`, `Environment=Workshop` | `StudentId` は自分の番号に置き換える |

### 元ガイド フェーズ1.9までの対応確認

第5回では、元ガイドのフェーズ1.9までに相当する Azure 側の土台作りを完了する想定です。
監視用ワークスペースを単独で作成する手順は含めず、Container Apps Environment は元ガイドで指定された設定に従って作成します。

| 元ガイドの範囲 | 本ドラフトの対応 | 第5回での完了状態 |
| --- | --- | --- |
| リソースグループ作成 | 手順2 | 完了 |
| VNet とサブネット作成 | 手順3 | 完了 |
| ACR 作成。オプション A の特定公開アクセス設定を含む | 手順4 | 完了 |
| API Container App と Container Apps Environment 作成 | 手順5 | 完了 |
| API Container App URL 記録 | 手順5 | 完了 |
| Web Container App 作成と URL 記録 | 手順6 | 完了 |
| PostgreSQL Flexible Server 作成 | 手順7 | 完了 |
| User-assigned Managed Identity 作成 | 手順8 | 完了 |
| データベース作成と Managed Identity への DB パーミッション付与 | 手順9 | 完了 |
| Entra ID アプリ登録 | 手順10 | 完了 |
| フェーズ1.9のサマリー値収集 | 手順11 | 完了 |
| フェーズ1.9までの終了確認 | 手順12、手順13 | リソース確認後、PostgreSQL を停止して第6回へ引き継ぐ |

### 接続情報記録テンプレート

第6回で使うため、次の値を受講者ごとに記録します。
この表は受講者の手元メモとして扱い、公開資料やスクリーンショットには実値を残しません。

| 項目 | 記録欄 | 注意 |
| --- | --- | --- |
| Subscription ID |  | 公開時はマスク |
| Tenant ID |  | 公開時はマスク |
| Entra app client ID |  | 公開時はマスク |
| Resource group |  | 第6回で利用 |
| Virtual Network |  | 第6回で利用 |
| Container Apps subnet |  | 第6回で利用 |
| Private Endpoints subnet |  | 第6回で利用 |
| PostgreSQL subnet |  | 第6回で利用 |
| ACR name |  | 第6回で利用 |
| ACR login server |  | 第6回で利用 |
| Container Apps Environment name |  | 第6回で利用 |
| Web Container App URL |  | Entra ID redirect URI と第6回で利用 |
| API Container App URL |  | 第6回で利用 |
| PostgreSQL server name/FQDN |  | 公開時はマスク |
| PostgreSQL database name |  | 第6回で利用 |
| Managed Identity name |  | 第6回で利用 |
| Managed Identity client ID |  | 公開時はマスク |
| Managed Identity resource ID |  | 公開時はマスク |

### 手順1: Azure Portal にサインインする

- 目的: 講師が用意したサブスクリプションで作業できる状態にする。
- アーキテクチャ上の位置: まだリソースは作らない。
- Azure Portal 操作: `https://portal.azure.com/` にアクセスし、講師指定のアカウントでサインインする。
- 入力値: なし。
- 期待状態: 対象サブスクリプションが選択できる。
- よくある失敗: 個人の別アカウントでサインインしている。対象サブスクリプションが見えない。

### 手順2: リソースグループを作成する

- 目的: 第5回と第6回で利用するリソースをまとめて管理する。
- アーキテクチャ上の位置: Todo アプリ用 Azure リソースの外枠。
- Azure Portal 操作: Resource groups > Create を選ぶ。
- 入力値: `rg-azbeg-l05-<受講者番号>`、Region は Japan East。
- 期待状態: リソースグループの Overview が表示される。
- よくある失敗: 第4回のリソースグループ名を使う。第6回前に削除してしまう。

### 手順3: VNet とサブネットを作成する

- 目的: Container Apps と PostgreSQL の接続を整理するためのネットワークを作る。
- アーキテクチャ上の位置: アプリ実行環境と DB 接続のネットワーク土台。
- Azure Portal 操作: Virtual networks > Create を選び、講師指定のアドレス空間とサブネットを設定する。
- 入力値: `vnet-azbeg-l05-<受講者番号>`、`snet-container-apps`、`snet-private-endpoints`、`snet-postgresql` など。
- 期待状態: VNet と必要なサブネットが作成される。
- よくある失敗: サブネット名を間違える。参照手順と異なるアドレス範囲にする。

### 手順4: ACR を作成する

- 目的: 第6回で Web/API のコンテナイメージを格納するレジストリを用意する。
- アーキテクチャ上の位置: コンテナイメージの保管場所。
- Azure Portal 操作: Container registries > Create を選び、元のガイドの [ステップ 1.3 Azure Container Registry (ACR) を作成](https://github.com/Liminghao0922/todomanagement/blob/main/handson/DEPLOY_GUIDE_GUI-ja_JP.md#%E3%82%B9%E3%83%86%E3%83%83%E3%83%97-13-azure-container-registry-acr-%E3%82%92%E4%BD%9C%E6%88%90) と [オプション A: 特定公開アクセスを有効にする](https://github.com/Liminghao0922/todomanagement/blob/main/handson/DEPLOY_GUIDE_GUI-ja_JP.md#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-a-%E7%89%B9%E5%AE%9A%E5%85%AC%E9%96%8B%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%82%92%E6%9C%89%E5%8A%B9%E3%81%AB%E3%81%99%E3%82%8B) に従って設定する。
- 入力値: `acrazbegl05<受講者番号><接尾辞>`、SKU は元ガイドに合わせて Premium を想定。
- 期待状態: ACR が作成され、Overview で login server を確認できる。
- よくある失敗: ACR 名にハイフンを入れる。名前がグローバル重複する。第4回の共有 ACR と混同する。

### 手順5: API Container App と Container Apps Environment を作成する

- 目的: 第6回で実アプリの API イメージに更新するため、プレースホルダー API Container App と実行環境を作る。
- アーキテクチャ上の位置: API 層の仮配置と、Web/API を動かす Container Apps Environment。
- Azure Portal 操作: 元ガイドのステップ1.4に従い、Container Apps > Create > Container App から `app-todomanagement-api` を作成する。この操作の中で新しい Container Apps Environment も作成する。
- 入力値: `app-todomanagement-api`、`cae-azbeg-l05-<受講者番号>`、Japan East、`snet-container-apps`、プレースホルダーイメージ `mcr.microsoft.com/k8se/quickstart:latest`。
- 期待状態: API Container App と Container Apps Environment が作成され、API の Application URL を確認できる。
- よくある失敗: Container Apps Environment だけを作って API Container App を作らない。サブネットを `snet-container-apps` 以外にする。プレースホルダー作成を実アプリの完成と誤解する。

監視用ワークスペースは Environment 作成手順内の設定として扱い、単独の教材トピックにはしません。

### 手順6: Web Container App を作成し、Web/API URL を記録する

- 目的: Web サインイン用 redirect URI と第6回の GitHub Actions 変数に使う URL をそろえる。
- アーキテクチャ上の位置: Web 層の仮配置。API 層と同じ Container Apps Environment に配置する。
- Azure Portal 操作: 元ガイドのステップ1.4に従い、`app-todomanagement-web` を作成し、既存の Container Apps Environment を選択する。
- 入力値: `app-todomanagement-web`、既存の `cae-azbeg-l05-<受講者番号>`、プレースホルダーイメージ `mcr.microsoft.com/k8se/quickstart:latest`、Ingress は元ガイドの指定に合わせる。
- 期待状態: Web Container App が作成され、Web Application URL と API Application URL を接続情報テンプレートに記録できる。
- よくある失敗: API と別の Environment に Web を作る。Web URL を記録し忘れる。URL に余計なパスを付けて Entra ID redirect URI に使う。

### 手順7: PostgreSQL Flexible Server を作成する

- 目的: Todo データを保存するマネージド PostgreSQL を作る。
- アーキテクチャ上の位置: DB 層。
- Azure Portal 操作: Azure Database for PostgreSQL flexible servers > Create を選ぶ。
- 入力値: `psql-azbeg-l05-<受講者番号>-<接尾辞>`、Japan East、PostgreSQL 17、Development、Microsoft Entra authentication only、`snet-postgresql`、Private access。
- 期待状態: PostgreSQL Flexible Server が作成され、Overview を確認できる。
- よくある失敗: 高価な SKU を選ぶ。認証方式を参照手順と変える。ネットワーク設定を誤る。Private DNS の選択を見落とす。

### 手順8: Managed Identity を作成する

- 目的: DB のパーミッション付与と、第6回で利用する Azure リソース間の認証に使う ID を用意する。
- アーキテクチャ上の位置: 認証と権限の要素。
- Azure Portal 操作: Managed Identities > Create を選ぶ。
- 入力値: `id-azbeg-l05-<受講者番号>`、Japan East。
- 期待状態: Managed Identity が作成され、Client ID などを確認できる。
- よくある失敗: System-assigned と User-assigned の違いで迷う。値を記録し忘れる。

### 手順9: データベースを作成し、Managed Identity に DB パーミッションを付与する

- 目的: Todo アプリが利用するデータベースを作成し、作成した Managed Identity が DB にアクセスできる状態にする。
- アーキテクチャ上の位置: PostgreSQL サーバー内のアプリ用 DB と、DB にアクセスする ID の権限設定。
- Azure Portal 操作: PostgreSQL の Databases 画面で、講師指定の DB 名を作成または確認する。続けて元ガイドに従い、作成した Managed Identity に DB のパーミッションを付与する。
- 入力値: `tododb` など、元ガイドに合わせた DB 名と Managed Identity。
- 期待状態: Todo アプリ用 DB が存在し、Managed Identity に必要な DB パーミッションが付与されている。
- よくある失敗: Managed Identity 作成前に DB 権限付与へ進む。サーバー名と DB 名を混同する。権限付与対象の ID を選び間違える。Cloud Shell を使う必要がある操作をローカル端末で実行しようとする。

CLI や `psql` コマンドが必要な場合は、講師の指示に従って Azure Cloud Shell から実行します。

### 手順10: Entra ID アプリ登録を作成する

- 目的: Web Container App で Microsoft Entra ID サインインを使うためのアプリ登録を用意する。
- アーキテクチャ上の位置: Web 層のユーザー認証入口。
- Azure Portal 操作: Microsoft Entra ID > App registrations > New registration を選ぶ。
- 入力値: `app-azbeg-l05-<受講者番号>`、講師指定の supported account type、Redirect URI は Single-page application とし、手順6で記録した Web Container App URL を指定する。
- 期待状態: App registration が作成され、Client ID と Tenant ID を確認できる。
- よくある失敗: Entra ID の権限が不足する。別テナントで作成する。Redirect URI に API URL を指定する。URL に `/callback` を付ける。

### 手順11: 接続情報一覧を完成させる

- 目的: 元ガイドのステップ1.9に従い、第6回でデプロイ時に必要な値をそろえる。
- アーキテクチャ上の位置: GitHub Actions、ACR、Container Apps、PostgreSQL、Entra ID をつなぐ設定情報。
- Azure Portal 操作: 各リソースの Overview から値を確認する。
- 入力値: 接続情報記録テンプレートに沿って記録する。
- 期待状態: 第6回で参照する値がそろっている。
- よくある失敗: Web/API URL、Tenant ID、ACR login server、Managed Identity Resource ID を記録し忘れる。

### 手順12: リソースグループ内の作成済みリソースを確認する

- 目的: 第5回で作るべきリソースがそろっているか確認する。
- アーキテクチャ上の位置: 第5回終了時点の Azure リソース群。
- Azure Portal 操作: リソースグループの一覧に戻り、作成済みリソースを確認する。
- 入力値: なし。
- 期待状態: VNet、ACR、API/Web Container App、Container Apps Environment、PostgreSQL、Managed Identity などが確認できる。
- よくある失敗: 作成途中のリソースが失敗状態のまま残っている。別リソースグループに作ってしまう。

### 手順13: PostgreSQL Flexible Server を停止する

- 目的: 第6回に引き継ぐためリソースは残しつつ、コンピュート課金を抑える。
- アーキテクチャ上の位置: DB 層の一時停止。
- Azure Portal 操作: PostgreSQL Flexible Server の Overview で Stop を選び、停止後の Status を確認する。
- 入力値: なし。
- 期待状態: PostgreSQL の Status が Stopped になる。
- よくある失敗: リソースグループを削除してしまう。Stop ではなく Delete を選ぶ。停止後もストレージ課金が残る可能性を忘れる。

## よくある失敗

### ACR 名や PostgreSQL サーバー名が重複する

原因:
ACR 名や PostgreSQL サーバー名はグローバルに一意である必要があります。

対応:
受講者番号に加えて、講師指定の接尾辞を付けます。ACR 名は小文字英数字のみで、ハイフンを使わないようにします。

### リージョンを間違える

原因:
Japan East 以外を選ぶと、講師の説明、ネットワーク設定、クォータ確認とずれる場合があります。

対応:
作成前なら Japan East に戻します。作成後に気づいた場合は、講師に確認して続行するか作り直します。

### PostgreSQL の認証方式やネットワーク設定を間違える

原因:
参照手順と異なる認証方式やネットワーク方式にすると、第6回でアプリから接続できない可能性があります。

対応:
講師が事前検証した設定値に合わせます。分からない場合は自己判断で変更せず、講師に確認します。

### Managed Identity への DB パーミッション付与を忘れる

原因:
データベース作成を Managed Identity 作成前に進めたり、権限付与対象の ID を取り違えたりすると、第6回で API から DB に接続できない可能性があります。

対応:
元ガイドに従い、手順8で作成した Managed Identity に対して、手順9で DB のパーミッションを付与します。CLI や `psql` コマンドが必要な場合は Azure Cloud Shell から実行します。

### Entra ID アプリ登録ができない

原因:
受講者の権限、テナント設定、Entra ID アプリ登録許可が想定どおり反映されていない可能性があります。

対応:
講師が権限を確認します。時間内に復旧できない場合は、講師のサンプル値とデモ環境で進めます。

### URL や ID を記録し忘れる

原因:
元ガイドのステップ1.9では、Web/API URL、ACR 名、PostgreSQL FQDN、Managed Identity ID、Entra app client ID など多くの値を集めます。

対応:
接続情報テンプレートを使い、各リソースの Overview を見ながら最後に全員で確認します。公開資料やスクリーンショットには実 ID を残しません。

### 接続情報を記録し忘れる

原因:
作成操作に集中し、ACR login server、PostgreSQL server name、Tenant ID などの値を記録し忘れることがあります。

対応:
接続情報テンプレートを使い、各リソースの Overview を見ながら最後に全員で確認します。

### PostgreSQL を停止し忘れる

原因:
作成済みリソース確認で安心して、停止手順を飛ばしてしまうことがあります。

対応:
講師は最後に全員へ PostgreSQL の Status を確認させます。Stopped になっていることを完了条件にします。

## 講師が見る確認ポイント

- 受講者が正しいサブスクリプションを選べていること。
- リソースグループ名に第5回と受講者番号が含まれていること。
- 第5回から第6回で使うリソースを同じリソースグループに作成していること。
- リージョンが Japan East、または講師指定の代替リージョンになっていること。
- ACR 名が命名規則を満たし、受講者ごとの ACR になっていること。
- Container Apps Environment が作成済みであること。
- PostgreSQL Flexible Server が作成済みで、認証方式とネットワーク設定が参照手順と合っていること。
- Managed Identity と Entra ID アプリ登録が作成済みであり、Managed Identity に DB のパーミッションが付与されていること。
- 接続文字列、認証情報、実 ID がスクリーンショットや公開資料に残っていないこと。
- 第6回に引き継ぐ接続情報一覧が埋まっていること。
- PostgreSQL Flexible Server が最後に Stopped になっていること。

## 復旧できない場合のスキップ手順

時間内に復旧できない場合は、リソース作成の完了よりも「どの値が何に使われるか」の理解を優先します。

1. 名前重複で作成できない場合は、講師指定の接尾辞を追加して再試行する。
2. クォータ不足の場合は、講師指定の代替 SKU、代替リージョン、または講師デモに切り替える。
3. PostgreSQL 作成で止まる場合は、講師がサンプル PostgreSQL の画面を見せ、受講者は接続情報テンプレートにサンプル値を記入する。
4. Entra ID アプリ登録で止まる場合は、講師が事前作成したサンプル app registration の値を使って説明を継続する。
5. Web/API Container App 作成で止まる場合は、講師デモ環境の Application URL を使い、URL が第6回の変数や redirect URI に使われることだけ確認する。
6. 作成途中のリソースがある場合は、削除してよいものと第6回に残すものを講師が判断する。
7. PostgreSQL が作成済みの場合は、最後に停止だけは完了させる。

## クリーンアップ手順

第5回は第6回に続くため、原則としてリソースグループは削除しません。
本回終了時のコスト抑制として、PostgreSQL Flexible Server を停止し、第6回で再開して利用します。

1. Azure Portal で PostgreSQL Flexible Server を開く。
2. Overview で対象サーバー名が自分の `psql-azbeg-l05-<受講者番号>-<接尾辞>` であることを確認する。
3. Stop を選ぶ。
4. 確認ダイアログが表示された場合は内容を確認して停止する。
5. Status が Stopped になるまで待つ。
6. 接続情報一覧に、PostgreSQL を停止済みであることをメモする。
7. `rg-azbeg-l05-<受講者番号>` は削除しない。
8. ACR、API/Web Container App、Container Apps Environment、Managed Identity、App registration も第6回で使うため削除しない。

注意:
PostgreSQL を停止しても、ストレージなど停止中も課金が残る可能性があります。第6回終了後に、最終的に停止するか削除するかを改めて判断します。

## 振り返り

最後に受講者へ次の問いを投げかけます。

1. Todo アプリの Web、API、DB は、それぞれどの Azure サービスに対応するか。
2. 第5回で作成したリソースのうち、第6回で直接使う値はどれか。
3. 接続文字列や実 ID をスクリーンショットに残すと何が問題になるか。
4. PostgreSQL を停止することと、リソースグループを削除することは何が違うか。
5. 第6回で何を行えば Todo アプリが完成するか。

## 確認クイズ案

### 問1

第5回で作成する Azure Container Registry の主な役割はどれですか。

- A. コンテナイメージを保管する
- B. Todo データを保存する
- C. DNS の名前解決を行う

正解: A

### 問2

Todo データを保存する DB 層として本回で作成するサービスはどれですか。

- A. Azure Container Instances
- B. Azure Database for PostgreSQL Flexible Server
- C. Azure Static Web Apps

正解: B

### 問3

第5回の最後に、受講者ごとのリソースグループを削除する。正しいですか。

- A. 正しい
- B. 正しくない

正解: B

### 問4

接続文字列や認証情報の扱いとして正しいものはどれですか。

- A. スクリーンショットに残してもよい
- B. 公開資料に載せてよい
- C. 必要な場合だけ安全な一時メモに記録し、公開資料には残さない

正解: C

### 問5

第6回に引き継ぐため、本回で特に重要な作業はどれですか。

- A. 接続情報を記録する
- B. すべてのリソースを削除する
- C. PostgreSQL の詳細チューニングを行う

正解: A

## 講師向け補足

- 第5回は操作量が多いため、講師は参照手順を講座前に通し実行し、50分で可能な範囲に絞る。
- 本ドラフトでは、Portal-first を前提にする。DB パーミッション付与などで CLI や `psql` が必要な場合は Azure Cloud Shell に限定する。
- PostgreSQL のネットワーク方式、Container Apps Environment の VNet 設定、Managed Identity の利用範囲は、参照する GitHub 手順の最新状態と講師検証結果に合わせて最終確定する。
- ACR、PostgreSQL、Container Apps は受講者50名分でコストとクォータ影響が大きいため、少なくとも1週間前に確認する。
- 受講者が Entra ID アプリ登録を実行できることを事前確認する。第6回で Service Principal 作成を扱う場合は、その権限も別途確認する。
- 接続文字列、認証情報、実 ID は、画面共有やスクリーンショットに写らないよう特に注意する。
- 第5回終了時に削除してはいけないリソースを明確にする。削除は原則第6回終了後の判断とする。
- GitHub アカウント制限がある受講者に備えて、講師デモ環境とサンプル値を用意する。

## 参考資料

- [Todo アプリ ハンズオン手順](https://github.com/Liminghao0922/todomanagement/blob/main/handson/DEPLOY_GUIDE_GUI-ja_JP.md)
- [Todo アプリ ハンズオン手順: ACR の特定公開アクセス設定](https://github.com/Liminghao0922/todomanagement/blob/main/handson/DEPLOY_GUIDE_GUI-ja_JP.md#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-a-%E7%89%B9%E5%AE%9A%E5%85%AC%E9%96%8B%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%82%92%E6%9C%89%E5%8A%B9%E3%81%AB%E3%81%99%E3%82%8B)
- [Microsoft Learn: Azure Container Apps](https://learn.microsoft.com/ja-jp/azure/container-apps/overview)
- [Microsoft Learn: Azure Container Registry](https://learn.microsoft.com/ja-jp/azure/container-registry/container-registry-intro)
- [Microsoft Learn: Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/ja-jp/azure/postgresql/flexible-server/overview)
- [Microsoft Learn: Azure Virtual Network](https://learn.microsoft.com/ja-jp/azure/virtual-network/virtual-networks-overview)
- [Microsoft Learn: Azure managed identities](https://learn.microsoft.com/ja-jp/entra/identity/managed-identities-azure-resources/overview)
- [Microsoft Learn: Microsoft ID プラットフォームにアプリケーションを登録する](https://learn.microsoft.com/ja-jp/entra/identity-platform/quickstart-register-app)
- [Microsoft Learn: Azure Database for PostgreSQL Flexible Server を停止および起動する](https://learn.microsoft.com/ja-jp/azure/postgresql/flexible-server/how-to-stop-start-server-portal)

参考資料は教材本文の主軸にはせず、受講者が復習するときの入口として提示します。
