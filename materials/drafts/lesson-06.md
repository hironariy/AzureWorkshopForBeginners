# 第6回 Azure Container Apps と Azure Database for PostgreSQL を利用した Todo アプリの構築 2 ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第6回
- タイトル: Azure Container Apps と Azure Database for PostgreSQL を利用した Todo アプリの構築 2
- 形式: オンライン座学 + ハンズオン
- 時間: 60分 (50分レクチャー/ハンズオン、10分QA)
- 想定日: 2026年7月23日

## この回の位置づけ

第6回は、第5回で作成した Azure リソースに Todo アプリケーションをデプロイし、Web、API、DB が連携して動く完成形を確認する回です。
第5回では Azure 側の土台を作り、プレースホルダーの Web/API Container App と PostgreSQL、ACR、Managed Identity、Entra ID アプリ登録を準備しました。

本回では、元の Todo アプリ手順のフェーズ2からフェーズ4を扱います。
受講者個人の GitHub アカウントでテンプレートリポジトリを作成し、GitHub Actions の Secret と Repository variables を設定し、ワークフローで ACR と Azure Container Apps へデプロイします。
最後に Web アプリへアクセスしてサインインし、Todo の作成、編集、削除、更新後の保持を確認します。

## 受講前提

- 第5回を受講し、同じリソースグループに必要な Azure リソースを作成済みであること。
- 第5回で記録した接続情報一覧を手元で参照できること。
- 第5回終了時に停止した Azure Database for PostgreSQL Flexible Server を、本回で再開できること。
- 受講者には、講師が用意する Azure サブスクリプションをスコープとして Contributor ロールが付与されている。
- 受講者は Microsoft Entra ID アプリ登録と Service Principal 作成を実行できる前提とする。
- GitHub Actions 用 Service Principal にロールを割り当てる操作は、テナント/RBAC 設定によって追加権限が必要になる場合がある。講師は事前に権限を検証し、必要に応じてサンプル資格情報またはデモ環境を用意する。
- 受講者個人の GitHub アカウントを利用できること。組織端末やネットワーク制限がある場合は、講師が代替手順またはデモ手順を案内する。
- GitHub リポジトリは、元ガイドの初心者向けフローに合わせて Public を想定する。
- Azure CLI や git コマンドを使う箇所は、講師の指示に従い Azure Cloud Shell から実行する。

## 到達目標

- 第5回で作成した Azure リソースを使って、Todo アプリケーションを Azure Container Apps にデプロイする流れを理解できる。
- GitHub Actions が、コンテナイメージのビルド、ACR への push、Container Apps の更新を自動化していることを説明できる。
- GitHub Actions Secret と Repository variables の違いを説明できる。
- Service Principal、GitHub Actions、Azure Resource Manager、ACR、Container Apps の関係を概要レベルで説明できる。
- デプロイ後の Web アプリにアクセスし、Microsoft Entra ID でサインインして Todo の基本操作を確認できる。
- アプリケーション動作確認後、PostgreSQL の停止またはリソース削除により課金を抑える必要性を説明できる。

## 受講後に説明できること/操作できること

- GitHub テンプレートから受講者個人の Todo アプリリポジトリを作成できる。
- Azure Cloud Shell で GitHub Actions 用 Service Principal の資格情報を作成する意味を説明できる。
- GitHub リポジトリに `AZURE_CREDENTIALS` Secret と、デプロイに必要な Repository variables を設定できる。
- GitHub Actions の実行結果を確認し、失敗時にログを見る場所を説明できる。
- ACR にイメージが作成され、Container Apps の revision が更新されていることを確認できる。
- Web Container App URL、Entra ID redirect URI、GitHub Repository variables の URL が一致しているか確認できる。
- Todo アプリで作成、編集、削除、ページ更新後の保持を確認できる。
- 第6回終了後に、PostgreSQL の停止、リソースグループ削除、Service Principal と GitHub Secret の扱いを判断できる。

## 本回で扱う範囲

- 第5回で作成したリソースと接続情報の確認
- Azure Database for PostgreSQL Flexible Server の再開
- GitHub テンプレートからのリポジトリ作成
- GitHub Actions 用 Service Principal と `AZURE_CREDENTIALS` の作成
- GitHub Actions Secret の設定
- GitHub Repository variables の設定
- ワークフローファイルの有効化
- GitHub Actions ワークフローの実行確認
- ACR、Container Apps、Revisions、Application URL の確認
- Entra ID redirect URI と GitHub variables の URL 確認
- Web アプリへのサインインと Todo 操作確認
- 完成アーキテクチャの振り返り
- PostgreSQL 停止、または講師指示によるリソース削除

## 本回で扱わない範囲

- アプリケーションコードの詳細な実装解説
- Dockerfile の詳細な書き方
- GitHub Actions YAML の高度な設計
- 本番向けの CI/CD ブランチ戦略、環境分離、承認フロー
- OpenID Connect による本格的なシークレットレス認証設計。存在は補足に留める。
- Azure Container Apps の本番運用設計、スケール設計、監視設計
- PostgreSQL の詳細なチューニング、バックアップ、レプリケーション設計
- Private Endpoint、Private DNS、VNet 統合の詳細設計。第7回で扱う。
- IaC による構築
- ローカル端末での Azure CLI 実行。CLI が必要な場合は Azure Cloud Shell に限定する。

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | 第5回の振り返り | 作成済みリソースと本回の開始状態を確認する |
| 5-10分 | 本回のゴールとデプロイの流れ | GitHub Actions から ACR、Container Apps へ進む全体像を理解する |
| 10-15分 | 事前値確認と PostgreSQL 再開 | 第5回の記録値と停止中の DB をハンズオン開始状態に戻す |
| 15-30分 | GitHub Actions 設定 | リポジトリ、Secret、Variables、Service Principal、ワークフローを設定する |
| 30-40分 | デプロイ確認 | GitHub Actions、ACR、Container Apps の状態を確認する |
| 40-47分 | アプリケーション動作確認 | Web サインインと Todo の作成、編集、削除を確認する |
| 47-50分 | クリーンアップ方針確認 | PostgreSQL 停止またはリソース削除を判断する |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は48枚です。ハンズオン中心の回として35枚から55枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | Todo アプリの構築 2 | この回では、第5回で作った Azure リソースへ Todo アプリをデプロイして動作確認します。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | 今日は GitHub Actions で Web/API をデプロイし、Todo アプリが動くところまで確認します。 | 到達目標、完成条件、クリーンアップ | L06-D01 |
| 3 | 第5回の終了状態 | 前回は Azure 側の土台を作り、PostgreSQL を停止して引き継ぎました。 | 作成済みリソース、停止中 DB、記録済み値 | L06-D02 |
| 4 | 第6回で完成させる範囲 | 本回ではリポジトリ、GitHub Actions、実イメージのデプロイ、動作確認を行います。 | 第5回と第6回の分担 | L06-D03 |
| 5 | 元ガイドとの対応 | 第6回では元ガイドのフェーズ2からフェーズ4を扱います。 | フェーズ2、3、4の対応表 | L06-T01 |
| 6 | GitHub Actions が行うこと | GitHub Actions は、手作業で行うビルド、push、デプロイをワークフローとして実行します。 | build、ACR push、Container Apps update | L06-D04 |
| 7 | デプロイの通信経路 | GitHub Actions は Azure にログインし、ACR と Container Apps を更新します。 | GitHub、Service Principal、ACR、ACA | L06-D05 |
| 8 | Secret と Variables | 秘密情報と設定値は、GitHub 上で分けて管理します。 | Secret、Repository variables、マスク対象 | L06-D06 |
| 9 | Service Principal の役割 | GitHub Actions は人の代わりに Azure を操作するための ID を使います。 | Service Principal、RBAC、スコープ | L06-D07 |
| 10 | 今日使う値を確認する | 第5回の接続情報一覧が、GitHub Actions 設定の入力値になります。 | 接続情報テンプレート、値の再確認 | L06-T02 |
| 11 | PostgreSQL を再開する | 前回停止した DB を、デプロイと動作確認のために Running に戻します。 | Start、Status、容量不足の注意 | L06-SS01 |
| 12 | テンプレートからリポジトリを作成する | 元ガイドに従い、テンプレートリポジトリから受講者用リポジトリを作成します。 | Use this template、Public、repo name | L06-SS03 |
| 13 | リポジトリ作成を確認する | 作成したリポジトリが第6回の作業場所になります。 | Repository URL、Settings、Actions | L06-SS05 |
| 14 | Cloud Shell を開く | Service Principal 作成とワークフロー有効化は、講師指示に従い Cloud Shell で行います。 | Cloud Shell、PowerShell、サブスクリプション確認 | L06-SS06 |
| 15 | Service Principal を作成する | GitHub Actions が Azure にログインするための資格情報を作成します。 | `az ad sp create-for-rbac`、JSON、ロール | L06-SS08 |
| 16 | `AZURE_CREDENTIALS` を登録する | Service Principal の JSON は Secret として登録し、画面や資料に残しません。 | Repository secret、値の扱い | L06-SS10 |
| 17 | Repository variables の全体 | デプロイに必要なリソース名や URL は Variables として登録します。 | Variables タブ、一覧 | L06-SS11 |
| 18 | Azure リソース系の変数 | Resource Group、ACR、Container Apps Environment はリソース更新先を示します。 | `RESOURCE_GROUP`、`ACR_NAME`、`CONTAINER_APP_ENVIRONMENT` | L06-T03 |
| 19 | PostgreSQL 系の変数 | API が DB に接続するため、サーバー、DB 名、ユーザーを指定します。 | `POSTGRES_SERVER`、`POSTGRES_DB`、`POSTGRES_USER` | L06-T03 |
| 20 | Entra ID 系の変数 | Web サインインには Entra ID アプリ登録の Client ID と Tenant ID を使います。 | `AZURE_CLIENT_ID`、`AZURE_TENANT_ID` | L06-T03 |
| 21 | Managed Identity と URL の変数 | API の DB アクセスと Web/API の連携に必要な値を設定します。 | Managed Identity、Redirect URI、API target | L06-T03 |
| 22 | ワークフローファイルを有効化する | テンプレートとして置かれた workflow ファイルを有効な YAML ファイルとして配置します。 | `.template`、コピー、commit、push | L06-SS13 |
| 23 | Actions タブを確認する | push 後に、API と Web の2つのワークフローが表示されることを確認します。 | Actions タブ、workflow 名 | L06-SS16 |
| 24 | ワークフロー実行を監視する | 失敗時は Portal ではなく、まず GitHub Actions のログを確認します。 | 実行中、成功、失敗ログ | L06-SS17 |
| 25 | ACR の Repositories を確認する | ワークフローが成功すると、ACR に API/Web のイメージが作成されます。 | Repositories、タグ、ACR 名 | L06-SS20 |
| 26 | API Container App の revision を確認する | API のプレースホルダーが、実アプリのイメージを使う revision に更新されます。 | Revision、image、Status | L06-SS22 |
| 27 | Web Container App の revision を確認する | Web 側も新しいイメージの revision に更新されます。 | Revision、image、Status | L06-SS23 |
| 28 | Web URL を確認する | 利用者がアクセスする入口は Web Container App の Application URL です。 | Web Application URL | L06-SS24 |
| 29 | Entra ID redirect URI を確認する | Web URL と Entra ID の SPA redirect URI が一致していることを確認します。 | Authentication、SPA redirect URI、tokens | L06-SS25 |
| 30 | GitHub variables の URL を確認する | `AZURE_REDIRECT_URI` と `API_PROXY_TARGET` が実際の URL と一致しているか確認します。 | Repository variables、URL 確認 | L06-SS26 |
| 31 | Web アプリにアクセスする | ブラウザーで Web URL を開き、アプリが表示されることを確認します。 | Web app、Login ボタン | L06-SS27 |
| 32 | Entra ID でサインインする | Microsoft Entra ID 認証を通って Todo 画面に入ります。 | サインイン、同意、マスク注意 | L06-SS28 |
| 33 | Todo を作成する | 新しい Todo を追加し、API と DB が連携していることを確認します。 | Todo 作成、保存 | L06-SS30 |
| 34 | Todo を編集・削除する | 更新と削除が成功することで、API と DB の基本動作を確認します。 | 編集、削除 | L06-SS31 |
| 35 | 更新後も保持されることを確認する | ページ更新後に Todo の状態が残ることで、DB 保存を確認します。 | ページ更新、保持 | L06-SS29 |
| 36 | 完成した通信経路を振り返る | Web、API、PostgreSQL、Entra ID、ACR、GitHub Actions の役割を整理します。 | 完成アーキテクチャ | L06-D08 |
| 37 | よくある失敗: Azure ログイン | `AZURE_CREDENTIALS` の JSON や権限が違うと、ワークフローは Azure にログインできません。 | 症状、確認箇所、対応 | L06-T04 |
| 38 | よくある失敗: 変数 | 変数名や値が違うと、正しいリソースにデプロイできません。 | `.azurecr.io` 有無、URL、DB 名 | L06-T04 |
| 39 | よくある失敗: DB 接続 | API から PostgreSQL に接続できない場合は、ネットワーク、DB 権限、変数を順に確認します。 | PostgreSQL、Managed Identity、ログ | L06-T04 |
| 40 | よくある失敗: サインイン | Web ログイン失敗時は、redirect URI と Entra ID 変数を確認します。 | Client ID、Tenant ID、redirect URI | L06-T04 |
| 41 | よくある失敗: デプロイが見えない | Container Apps に更新が見えない場合は、まず Actions と ACR を確認します。 | Workflow、ACR、Revision | L06-T04 |
| 42 | スキップ判断 | 時間内に直せない場合は、講師デモ環境で完成形と通信経路を確認します。 | スキップ手順 | L06-D09 |
| 43 | クリーンアップ方針 | 第6回終了後は、残す、停止する、削除する対象を明確にします。 | PostgreSQL、RG、GitHub Secret、SP | L06-D10 |
| 44 | PostgreSQL を停止する | リソースを残す場合でも、DB のコンピュート課金を抑えるため停止します。 | Stop、Status | L06-SS32 |
| 45 | リソースを削除する場合 | 講師指示がある場合は、リソースグループと外部の認証情報も整理します。 | RG 削除、App registration、Secret | L06-T05 |
| 46 | 今日のまとめ | 複数サービスをつなぐときは、デプロイ、認証、接続情報、コスト管理をまとめて考えます。 | 3つのまとめ | L06-D11 |
| 47 | 確認クイズ | 自分の言葉で、GitHub Actions と Azure リソースの関係を確認します。 | クイズ | なし |
| 48 | QA | 第5回から第6回で完成したアーキテクチャについて質問を受けます。 | 質疑応答 | なし |

## 図表・スクリーンショット素材一覧

本回はハンズオン回のため、Azure Portal、GitHub、Azure Cloud Shell、アプリ画面のスクリーンショットが必須です。
`L06-Dxx` は AI または draw.io で作成する図表、`L06-Txx` は表、`L06-SSxx` は筆者が取得するスクリーンショットとして管理します。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L06-D01 | 図表 | 必須 | AI/draw.io で作成 | 今日のゴールと完成条件 |
| L06-D02 | 図表 | 必須 | AI/draw.io で作成 | 第5回終了状態 |
| L06-D03 | 図表 | 必須 | AI/draw.io で作成 | 第5回と第6回の分担 |
| L06-D04 | 図表 | 必須 | AI/draw.io で作成 | GitHub Actions が自動化する作業 |
| L06-D05 | 図表 | 必須 | AI/draw.io で作成 | GitHub Actions から Azure へのデプロイフロー |
| L06-D06 | 図表 | 必須 | AI で作成 | Secret と Variables の違い |
| L06-D07 | 図表 | 必須 | AI/draw.io で作成 | Service Principal と RBAC の関係 |
| L06-D08 | 図表 | 必須 | AI/draw.io で作成 | 完成アーキテクチャと通信経路 |
| L06-D09 | 図表 | 任意 | AI で作成 | スキップ判断フロー |
| L06-D10 | 図表 | 必須 | AI で作成 | クリーンアップ対象の判断図 |
| L06-D11 | 図表 | 必須 | AI で作成 | 今日のまとめ |
| L06-D12 | 図表 | 任意 | AI/draw.io で作成 | Container Apps revision の考え方 |
| L06-D13 | 図表 | 任意 | AI/draw.io で作成 | Web サインインと redirect URI の関係 |
| L06-T01 | 表 | 必須 | AI で作成 | 元ガイド フェーズ2から4の対応表 |
| L06-T02 | 表 | 必須 | AI で作成 | 第5回から引き継ぐ値の確認表 |
| L06-T03 | 表 | 必須 | AI で作成 | GitHub Repository variables 一覧 |
| L06-T04 | 表 | 必須 | AI で作成 | よくある失敗と確認箇所 |
| L06-T05 | 表 | 必須 | AI で作成 | クリーンアップ対象一覧 |
| L06-T06 | 表 | 任意 | AI で作成 | Secret と公開不可情報の扱い |
| L06-SS01 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Start 操作画面 |
| L06-SS02 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Running 状態確認画面 |
| L06-SS03 | スクリーンショット | 必須 | 筆者が提供 | GitHub テンプレートリポジトリの Use this template |
| L06-SS04 | スクリーンショット | 必須 | 筆者が提供 | Create repository from template 画面 |
| L06-SS05 | スクリーンショット | 必須 | 筆者が提供 | 作成済み GitHub リポジトリ |
| L06-SS06 | スクリーンショット | 必須 | 筆者が提供 | Azure Cloud Shell 起動と PowerShell 選択 |
| L06-SS07 | スクリーンショット | 任意 | 筆者が提供 | Cloud Shell でのサブスクリプション確認。ID はマスク |
| L06-SS08 | スクリーンショット | 必須 | 筆者が提供 | Service Principal 作成コマンド例。出力 JSON は写さない |
| L06-SS09 | スクリーンショット | 必須 | 筆者が提供 | GitHub Settings > Secrets and variables > Actions |
| L06-SS10 | スクリーンショット | 必須 | 筆者が提供 | `AZURE_CREDENTIALS` Secret 追加画面。値は写さない |
| L06-SS11 | スクリーンショット | 必須 | 筆者が提供 | Repository variables タブ |
| L06-SS12 | スクリーンショット | 必須 | 筆者が提供 | Repository variable 追加画面。実 ID はマスク |
| L06-SS13 | スクリーンショット | 必須 | 筆者が提供 | workflow テンプレートファイル確認 |
| L06-SS14 | スクリーンショット | 任意 | 筆者が提供 | Cloud Shell で workflow ファイルをコピーするコマンド |
| L06-SS15 | スクリーンショット | 任意 | 筆者が提供 | commit/push 実行例。個人情報はマスク |
| L06-SS16 | スクリーンショット | 必須 | 筆者が提供 | GitHub Actions タブに2つの workflow が表示された状態 |
| L06-SS17 | スクリーンショット | 必須 | 筆者が提供 | workflow 実行中の画面 |
| L06-SS18 | スクリーンショット | 必須 | 筆者が提供 | workflow 成功画面 |
| L06-SS19 | スクリーンショット | 任意 | 筆者が提供 | workflow 失敗ログ例。内部情報はマスク |
| L06-SS20 | スクリーンショット | 必須 | 筆者が提供 | ACR Repositories 画面 |
| L06-SS21 | スクリーンショット | 必須 | 筆者が提供 | Container Apps Environment 内のアプリ一覧 |
| L06-SS22 | スクリーンショット | 必須 | 筆者が提供 | API Container App revisions |
| L06-SS23 | スクリーンショット | 必須 | 筆者が提供 | Web Container App revisions |
| L06-SS24 | スクリーンショット | 必須 | 筆者が提供 | Web Container App Overview と Application URL |
| L06-SS25 | スクリーンショット | 必須 | 筆者が提供 | Entra ID App registration Authentication |
| L06-SS26 | スクリーンショット | 必須 | 筆者が提供 | `AZURE_REDIRECT_URI` と `API_PROXY_TARGET` の確認画面 |
| L06-SS27 | スクリーンショット | 必須 | 筆者が提供 | Web アプリのログイン画面 |
| L06-SS28 | スクリーンショット | 任意 | 筆者が提供 | Entra ID サインイン画面。ユーザー名は写さない |
| L06-SS29 | スクリーンショット | 必須 | 筆者が提供 | Todo List 画面 |
| L06-SS30 | スクリーンショット | 必須 | 筆者が提供 | Todo 作成後の画面 |
| L06-SS31 | スクリーンショット | 必須 | 筆者が提供 | Todo 編集または削除後の画面 |
| L06-SS32 | スクリーンショット | 必須 | 筆者が提供 | PostgreSQL Stop 操作と Stopped 状態 |
| L06-SS33 | スクリーンショット | 任意 | 筆者が提供 | Resource group 削除確認画面 |

## 図表案

### L06-D01 今日のゴールと完成条件

目的: 本回が「デプロイと動作確認」の回であることを示す。

構成:

- 第5回で作成済み: Azure リソース、プレースホルダー Web/API、PostgreSQL、接続情報
- 第6回で行う: GitHub リポジトリ作成、GitHub Actions 設定、実イメージのデプロイ、アプリ動作確認
- 完了条件: Web にアクセスできる、サインインできる、Todo 操作が DB に保持される、コスト管理を判断できる

### L06-D02 第5回終了状態

目的: 受講者が自分の開始状態を確認できるようにする。

構成:

- Resource group
- VNet と3つのサブネット
- ACR
- Container Apps Environment
- プレースホルダー API/Web Container App
- PostgreSQL Flexible Server。第5回終了時は Stopped
- Managed Identity
- Web サインイン用 Entra ID アプリ登録

### L06-D03 第5回と第6回の分担

目的: 2回分のハンズオンの境界を明確にする。

構成:

| 回 | 主な作業 | 状態 |
| --- | --- | --- |
| 第5回 | Azure リソース作成、URL/ID 記録、PostgreSQL 停止 | デプロイ前 |
| 第6回 | GitHub Actions 設定、実イメージデプロイ、Todo 動作確認、停止/削除 | 完成確認 |

### L06-D04 GitHub Actions が自動化する作業

目的: GitHub Actions の役割を初心者向けに整理する。

構成:

1. リポジトリのコードを取得
2. API/Web のコンテナイメージをビルド
3. ACR に push
4. Container Apps の revision を更新
5. 実行結果をログとして残す

### L06-D05 GitHub Actions から Azure へのデプロイフロー

目的: GitHub と Azure の接続関係を示す。

構成:

- GitHub Actions
- `AZURE_CREDENTIALS` Secret
- Service Principal
- Azure Resource Manager
- ACR
- API/Web Container Apps
- PostgreSQL はデプロイ先ではなくアプリ実行時の接続先として示す

### L06-D06 Secret と Variables の違い

目的: GitHub に登録する情報を混同しないようにする。

構成:

| 種類 | 例 | 表示/扱い |
| --- | --- | --- |
| Secret | `AZURE_CREDENTIALS` | 値は再表示できない。公開資料に残さない。 |
| Repository variables | `RESOURCE_GROUP`、`ACR_NAME` | 設定値として扱う。実環境名や ID は公開時にマスクする。 |

### L06-D07 Service Principal と RBAC の関係

目的: GitHub Actions が Azure を操作できる理由を示す。

構成:

- Service Principal は GitHub Actions 用の Azure 側 ID
- RBAC role assignment により操作範囲を決める
- スコープは原則リソースグループ単位
- 元ガイドの例では広めのロールを使うため、ワークショップでは講師検証済みのロールとスコープに合わせる注記を置く

### L06-D08 完成アーキテクチャと通信経路

目的: 動作確認後に、すべてのサービスの役割を整理する。

構成:

- 利用者ブラウザー
- Web Container App
- API Container App
- Azure Database for PostgreSQL
- Microsoft Entra ID
- ACR
- GitHub Actions
- Managed Identity
- VNet とサブネット

通信:

1. 利用者が Web Container App にアクセス
2. Web が Entra ID でサインイン
3. Web が API にリクエスト
4. API が Managed Identity を使って PostgreSQL にアクセス
5. GitHub Actions はデプロイ時に ACR と Container Apps を更新

### L06-D09 スキップ判断フロー

目的: 時間内に復旧できない場合でも学習目標に到達するための判断を示す。

構成:

- GitHub アカウント利用不可
- Service Principal 作成不可
- GitHub Actions 失敗
- DB 接続不可
- サインイン不可
- 講師デモ環境へ切り替え
- 図上で役割と通信経路を確認

### L06-D10 クリーンアップ対象の判断図

目的: 第6回終了後に残すもの、停止するもの、削除するものを整理する。

構成:

- 残す場合: PostgreSQL は停止、GitHub Secret は必要性を確認
- 削除する場合: Resource group 削除、GitHub Secret 削除、Service Principal/App registration 削除
- 注意: Entra ID App registration と Service Principal は Resource group 削除だけでは消えない

### L06-D11 今日のまとめ

目的: 本回の学びを3点に絞る。

構成:

- GitHub Actions はビルドとデプロイを自動化する
- Azure リソース同士は ID、URL、ネットワーク、権限でつながる
- 完成後は動作確認とコスト管理まで含めてハンズオンを閉じる

### L06-T01 元ガイド フェーズ2から4の対応表

目的: 外部ガイドのどの部分を第6回で扱うかを明確にする。

構成:

| 元ガイドの範囲 | 第6回での扱い | 備考 |
| --- | --- | --- |
| フェーズ2: リポジトリを作成 | 扱う | テンプレートから Public リポジトリを作成 |
| ステップ3.1: Service Principal と認証情報 | 扱う | Cloud Shell から実行。権限不足時は講師サンプルへ切り替え |
| ステップ3.2: GitHub Actions Secret | 扱う | `AZURE_CREDENTIALS` を登録 |
| ステップ3.3: Repository variables | 扱う | 第5回の接続情報を登録 |
| ステップ3.4: workflow ファイル準備 | 扱う | `.template` を `.yml` として有効化 |
| ステップ3.5: workflow 実行 | 扱う | API/Web 2つの workflow を確認 |
| フェーズ4: デプロイメント検証 | 扱う | Container Apps、redirect URI、Todo 操作確認 |
| 完了サマリー/トラブルシューティング | 扱う | 講師確認ポイントと復旧手順へ反映 |

### L06-T02 第5回から引き継ぐ値の確認表

目的: 第5回の接続情報一覧が埋まっているか確認する。

構成:

| 項目 | 第6回で使う場所 | 注意 |
| --- | --- | --- |
| Subscription ID | Service Principal 作成 | 公開資料ではマスク |
| Tenant ID | `AZURE_TENANT_ID` | 公開資料ではマスク |
| Entra app client ID | `AZURE_CLIENT_ID` | Web サインイン用。GitHub Actions 認証用 SP とは別 |
| Resource group | `RESOURCE_GROUP`、SP scope | 第5回の RG を使う |
| ACR name | `ACR_NAME` | `.azurecr.io` を含めない |
| Container Apps Environment | `CONTAINER_APP_ENVIRONMENT` | 第5回で作成済み |
| PostgreSQL FQDN | `POSTGRES_SERVER` | サーバー名だけでなく FQDN を使う |
| PostgreSQL database | `POSTGRES_DB` | `tododb` |
| Managed Identity name | `POSTGRES_USER` | `postgres` ではない |
| Managed Identity client ID | `USER_ASSIGNED_IDENTITY_CLIENT_ID` | 公開資料ではマスク |
| Managed Identity resource ID | `USER_ASSIGNED_IDENTITY_RESOURCE_ID` | 公開資料ではマスク |
| Web Container App URL | `AZURE_REDIRECT_URI` | Entra ID redirect URI と一致させる |
| API Container App URL | `API_PROXY_TARGET` | 内部 API URL を使う |
| Repository URL | `REPOSITORY` | 受講者個人の GitHub repo URL |

### L06-T03 GitHub Repository variables 一覧

目的: GitHub に設定する変数名と値の対応を示す。

構成:

| 変数名 | 値 | 注意 |
| --- | --- | --- |
| `RESOURCE_GROUP` | 第5回の Resource Group 名 | 例: `rg-azbeg-l05-s01` |
| `ACR_NAME` | ACR 名 | `.azurecr.io` は含めない |
| `CONTAINER_APP_ENVIRONMENT` | Container Apps Environment 名 | 例: `cae-azbeg-l05-s01` |
| `POSTGRES_SERVER` | PostgreSQL サーバー FQDN | 例: `psql-...postgres.database.azure.com` |
| `POSTGRES_USER` | Managed Identity 名 | 元ガイドでは管理対象 ID 名 |
| `POSTGRES_DB` | `tododb` | 固定値 |
| `DATABASE_TYPE` | `postgresql` | 固定値 |
| `AZURE_CLIENT_ID` | Web サインイン用 Entra app client ID | GitHub Actions 用 SP の client ID ではない |
| `AZURE_TENANT_ID` | Tenant ID | 公開時はマスク |
| `USER_ASSIGNED_IDENTITY_CLIENT_ID` | Managed Identity client ID | 公開時はマスク |
| `USER_ASSIGNED_IDENTITY_RESOURCE_ID` | Managed Identity resource ID | 公開時はマスク |
| `AZURE_REDIRECT_URI` | Web Container App URL | `/callback` は付けない |
| `API_PROXY_TARGET` | API Container App URL | 内部 API URL |
| `REPOSITORY` | GitHub repository URL | 受講者の repo |

### L06-T04 よくある失敗と確認箇所

目的: 講師が短時間で症状から確認先へ誘導できるようにする。

構成:

| 失敗 | 症状 | 確認箇所 | 対応 |
| --- | --- | --- | --- |
| Azure ログイン失敗 | workflow が Azure にログインできない | `AZURE_CREDENTIALS`、SP 権限 | JSON を再確認し、必要なら講師サンプルへ切り替え |
| 変数名ミス | workflow がリソースを見つけられない | Repository variables | 変数名と値を元ガイドの表に合わせる |
| ACR 名ミス | image push/pull が失敗 | `ACR_NAME` | `.azurecr.io` を含める/含めない箇所を確認 |
| DB 接続失敗 | Todo 画面で API エラー | `POSTGRES_SERVER`、`POSTGRES_USER`、Managed Identity 権限 | FQDN、DB 権限、PostgreSQL Running を確認 |
| Web サインイン失敗 | Login 後にエラー | redirect URI、`AZURE_CLIENT_ID`、`AZURE_TENANT_ID` | Web URL と SPA redirect URI を一致させる |
| デプロイが見えない | Container Apps revision が更新されない | Actions、ACR Repositories | workflow 成功と image 作成を確認 |
| PostgreSQL 起動失敗 | Start 後に Running にならない | PostgreSQL Overview、Activity log | 容量不足やリージョン問題を講師が確認 |

### L06-T05 クリーンアップ対象一覧

目的: 第6回終了後に何を消すか、何を停止するかを整理する。

構成:

| 対象 | 残す場合 | 削除する場合 | 注意 |
| --- | --- | --- | --- |
| PostgreSQL Flexible Server | Stop する | RG 削除で消える | 停止中もストレージ課金が残る可能性あり |
| ACR | 残す | RG 削除で消える | イメージ保存課金に注意 |
| Container Apps/Environment | 残す | RG 削除で消える | Revision とログを確認してから削除 |
| Managed Identity | 残す | RG 削除で消える | DB 権限設定との関係に注意 |
| Web サインイン用 App registration | 必要なら残す | Entra ID 側で削除 | RG 削除だけでは消えない |
| GitHub Actions 用 Service Principal | 必要なら残す | Entra ID 側で削除 | Secret の有効期限と権限に注意 |
| GitHub repository secret | 必要なら残す | GitHub で削除 | `AZURE_CREDENTIALS` は公開しない |
| GitHub repository | 必要なら残す | GitHub で削除 | Public repo の公開範囲に注意 |

## スクリーンショット取得指示

スクリーンショットは、講座用または検証用のサブスクリプションと GitHub アカウントで取得します。
公開用に利用する可能性があるため、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、Service Principal の JSON、client secret、接続文字列、内部 FQDN、課金情報は写さないか、公開前にマスクします。

| スクリーンショットID | 対象画面 | 用途 | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- |
| L06-SS01 | PostgreSQL Flexible Server Overview | DB Start 操作 | Start ボタンと Status が分かる状態 | サブスクリプション ID、サーバー名 |
| L06-SS02 | PostgreSQL Flexible Server Overview | Running 確認 | Status が Running または Ready になった状態 | サブスクリプション ID、サーバー名 |
| L06-SS03 | GitHub template repository | テンプレート利用 | Use this template の位置が分かる状態 | GitHub ユーザー名 |
| L06-SS04 | Create repository from template | repo 作成 | Repository name と Public 選択が分かる状態 | GitHub ユーザー名、メール |
| L06-SS05 | 作成済み GitHub repository | repo 作成確認 | Actions と Settings に移動できる状態 | GitHub ユーザー名、private 情報 |
| L06-SS06 | Azure Cloud Shell | Cloud Shell 起動 | PowerShell を選択していることを示す | ユーザー名、サブスクリプション ID |
| L06-SS07 | Cloud Shell `az account show` | サブスクリプション確認 | 出力は ID をマスクする | Subscription ID、Tenant ID、ユーザー名 |
| L06-SS08 | Cloud Shell SP 作成コマンド | SP 作成手順 | JSON 出力は写さず、コマンド構造だけを示す | clientSecret、clientId、tenantId、subscriptionId |
| L06-SS09 | GitHub Settings > Secrets and variables > Actions | 設定画面入口 | Secrets タブと Variables タブが分かる状態 | GitHub ユーザー名 |
| L06-SS10 | New repository secret | `AZURE_CREDENTIALS` 登録 | Secret value は絶対に写さない | Secret value、JSON、clientSecret |
| L06-SS11 | Repository variables タブ | variables 登録 | 変数一覧が分かる状態。実 ID はマスク | Tenant ID、Client ID、Resource ID、URL |
| L06-SS12 | New repository variable | 変数追加 | 変数名と値欄の位置を示す。値はダミー化 | 実 ID、内部 URL、FQDN |
| L06-SS13 | workflow template files | workflow 有効化前 | `.template` ファイルがある状態 | GitHub ユーザー名 |
| L06-SS14 | Cloud Shell workflow copy | workflow 有効化コマンド | `cp` コマンドの例を示す | GitHub ユーザー名、repo URL |
| L06-SS15 | Cloud Shell commit/push | workflow push | commit/push の流れを示す | GitHub ユーザー名、メール |
| L06-SS16 | GitHub Actions タブ | workflow 表示確認 | API/Web workflow が表示された状態 | GitHub ユーザー名 |
| L06-SS17 | GitHub Actions 実行中 | デプロイ監視 | 実行中の job が分かる状態 | GitHub ユーザー名、内部ログ |
| L06-SS18 | GitHub Actions 成功 | デプロイ成功 | 緑色チェックや成功状態を示す | GitHub ユーザー名 |
| L06-SS19 | GitHub Actions 失敗ログ | トラブル例 | エラー詳細に秘密情報がないことを確認 | Secret、ID、内部 URL |
| L06-SS20 | ACR Repositories | image 確認 | API/Web の repository または tag が分かる状態 | Registry 名、Subscription ID |
| L06-SS21 | Container Apps Environment | アプリ一覧確認 | API/Web Container App が並ぶ状態 | リソース ID、Subscription ID |
| L06-SS22 | API Container App revisions | API revision 確認 | image と Status が分かる状態 | 内部 FQDN、リソース ID |
| L06-SS23 | Web Container App revisions | Web revision 確認 | image と Status が分かる状態 | FQDN、リソース ID |
| L06-SS24 | Web Container App Overview | Web URL 確認 | Application URL が分かる状態 | FQDN、リソース ID、Subscription ID |
| L06-SS25 | Entra ID App registration > Authentication | redirect URI 確認 | SPA redirect URI と token 設定が分かる状態 | Tenant ID、Client ID、ユーザー名 |
| L06-SS26 | GitHub Repository variables | URL variables 確認 | `AZURE_REDIRECT_URI` と `API_PROXY_TARGET` の存在を示す | URL、GitHub ユーザー名 |
| L06-SS27 | Web アプリログイン画面 | アプリ表示確認 | Login ボタンとアプリ名が分かる状態 | URL、ユーザー情報 |
| L06-SS28 | Entra ID サインイン画面 | 認証確認 | ユーザー名やメールは写さない | ユーザー名、メール、テナント名 |
| L06-SS29 | Todo List 画面 | ログイン後確認 | Todo 一覧が表示された状態 | ユーザー名、メール、Todo 内容 |
| L06-SS30 | Todo 作成後 | 作成確認 | ダミー Todo を追加した状態 | 個人情報、業務情報 |
| L06-SS31 | Todo 編集/削除後 | 更新・削除確認 | 編集または削除が反映された状態 | 個人情報、業務情報 |
| L06-SS32 | PostgreSQL Stop / Stopped | コスト抑制 | Stop 操作と Stopped 状態を示す | サブスクリプション ID、サーバー名 |
| L06-SS33 | Resource group delete | 最終削除 | 講師指示がある場合のみ取得 | Resource ID、Subscription ID、実リソース名 |

## ハンズオン手順案

### ハンズオンのゴール

第5回で作成した Azure リソースに、GitHub Actions を使って Todo アプリの Web/API をデプロイします。
デプロイ後に Web アプリへアクセスし、Microsoft Entra ID サインインと Todo の基本操作を確認します。
最後に、講師の指示に従って PostgreSQL を停止するか、不要なリソースを削除します。

### 入力値

| 項目 | 値の例 | 備考 |
| --- | --- | --- |
| リージョン | Japan East | 第5回と同じ |
| 受講者番号 | `s01` | 講師が事前に採番 |
| リソースグループ名 | `rg-azbeg-l05-s01` | 第5回で作成済み |
| ACR 名 | `acrazbegl05s01<接尾辞>` | `.azurecr.io` は variables の `ACR_NAME` には含めない |
| API Container App | `app-todomanagement-api` | 第5回でプレースホルダー作成済み |
| Web Container App | `app-todomanagement-web` | 第5回でプレースホルダー作成済み |
| Container Apps Environment | `cae-azbeg-l05-s01` | API/Web を配置 |
| PostgreSQL server FQDN | `psql-...postgres.database.azure.com` | 第5回の記録値 |
| PostgreSQL database | `tododb` | 元ガイドの固定値 |
| Managed Identity | `id-azbeg-l05-s01` | `POSTGRES_USER` に使う |
| Entra app client ID | 第5回の記録値 | `AZURE_CLIENT_ID` に使う |
| Tenant ID | 第5回の記録値 | `AZURE_TENANT_ID` に使う |
| Web Container App URL | 第5回の記録値 | `AZURE_REDIRECT_URI` に使う |
| API Container App URL | 第5回の記録値 | `API_PROXY_TARGET` に使う |
| GitHub repository name | `my-todo-app-s01` など | Public を想定 |

### 元ガイド フェーズ2から4の対応確認

第6回では、元ガイドのフェーズ2からフェーズ4までに相当する作業を扱います。
元ガイドの簡略 Step 5 から Step 7 は、フェーズ3とフェーズ4の要約として扱います。

| 元ガイドの範囲 | 本ドラフトの対応 | 第6回での完了状態 |
| --- | --- | --- |
| フェーズ2: リポジトリを作成 | 手順3 | 完了 |
| ステップ3.1: Azure Service Principal と認証情報を作成 | 手順5 | 完了。ただし権限不足時は講師サンプルへ切り替え |
| ステップ3.2: GitHub Actions シークレットを追加 | 手順6 | 完了 |
| ステップ3.3: GitHub Repository 変数を追加 | 手順7 | 完了 |
| ステップ3.4: ワークフローファイルを準備 | 手順8 | 完了 |
| ステップ3.5: GitHub Actions ワークフローを実行 | 手順9 | 完了 |
| フェーズ4: Container App デプロイメントを確認 | 手順10 | 完了 |
| フェーズ4: Entra ID redirect URI と URL 変数を確認 | 手順11 | 完了 |
| フェーズ4: アプリケーションをテスト | 手順12 | 完了 |
| 完了サマリーとクリーンアップ | 手順13、手順14 | 完了 |

### 手順1: 第5回の接続情報と作成済みリソースを確認する

- 目的: 第6回で使う値がそろっていることを確認する。
- アーキテクチャ上の位置: デプロイ前の確認。
- Azure Portal/GitHub/Cloud Shell 操作: 第5回の接続情報メモと Azure Portal の Resource group を開く。
- 入力値: 第5回の接続情報一覧。
- 期待状態: ACR、API/Web Container App、Container Apps Environment、PostgreSQL、Managed Identity、Entra ID アプリ登録の値を参照できる。
- よくある失敗: API URL と Web URL を取り違える。ACR name と ACR login server を混同する。

### 手順2: PostgreSQL Flexible Server を再開する

- 目的: デプロイ後の API が DB に接続できる状態にする。
- アーキテクチャ上の位置: DB 層の再開。
- Azure Portal/GitHub/Cloud Shell 操作: Azure Portal で PostgreSQL Flexible Server の Overview を開き、Start を選ぶ。
- 入力値: なし。
- 期待状態: PostgreSQL の Status が Running または Ready になる。
- よくある失敗: 第5回で作ったサーバーとは別のサーバーを開く。Start 後の完了を待たずにデプロイ確認へ進む。

### 手順3: テンプレートから GitHub リポジトリを作成する

- 目的: 受講者ごとの Todo アプリコードと GitHub Actions 設定場所を用意する。
- アーキテクチャ上の位置: CI/CD とアプリコードの入口。
- Azure Portal/GitHub/Cloud Shell 操作: 元ガイドのテンプレートリポジトリを開き、Use this template > Create a new repository を選ぶ。
- 入力値: Repository name は `my-todo-app-<受講者番号>` など。Visibility は Public を想定。
- 期待状態: 受講者個人の GitHub アカウントにリポジトリが作成される。
- よくある失敗: Private を選ぶ。組織アカウントに作成して権限や課金設定で詰まる。Repository URL を記録し忘れる。

### 手順4: Azure Cloud Shell を開き、対象サブスクリプションを確認する

- 目的: Service Principal 作成と workflow 有効化を、講師が想定する環境で実行する。
- アーキテクチャ上の位置: GitHub Actions が Azure を操作するための準備。
- Azure Portal/GitHub/Cloud Shell 操作: Azure Portal 右上から Cloud Shell を開く。元ガイドの PowerShell 形式に合わせ、Cloud Shell は PowerShell を利用する。
- 入力値: 必要に応じて対象 subscription ID。
- 期待状態: `az account show` で講師指定のサブスクリプションを参照している。
- よくある失敗: 別のサブスクリプションで作業する。ローカル端末で Azure CLI を実行する。

CLI が必要な操作は、講師の指示に従って Azure Cloud Shell から実行します。

### 手順5: GitHub Actions 用 Service Principal と認証情報を作成する

- 目的: GitHub Actions が Azure にログインし、ACR と Container Apps を更新できるようにする。
- アーキテクチャ上の位置: GitHub Actions から Azure Resource Manager への認証入口。
- Azure Portal/GitHub/Cloud Shell 操作: Azure Cloud Shell で、講師指定のロールとリソースグループスコープを使って Service Principal を作成する。
- 入力値: subscription ID、resource group name、Service Principal 名、講師指定ロール。
- 期待状態: `AZURE_CREDENTIALS` に登録する JSON を取得できる。
- よくある失敗: ロール割り当て権限が不足する。JSON を途中までしかコピーしない。出力をスクリーンショットに残す。

講座用のコマンド例:

```powershell
$subscriptionId = $(az account show --query id -o tsv)
$spName = "github-todomanagement-ci-<受講者番号>"
$resourceGroupName = "rg-azbeg-l05-<受講者番号>"

$sp = az ad sp create-for-rbac `
  --name $spName `
  --role "<講師指定ロール>" `
  --scopes "/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName" `
  --json-auth | ConvertFrom-Json

$sp | ConvertTo-Json
```

元ガイドでは広めのロール例が使われますが、ワークショップでは講師が検証したロールとスコープに合わせます。
この JSON には secret が含まれるため、公開資料やスクリーンショットには残しません。

### 手順6: GitHub Actions Secret を追加する

- 目的: GitHub Actions が Azure にログインするための資格情報を安全に登録する。
- アーキテクチャ上の位置: GitHub Actions 実行時の認証情報。
- Azure Portal/GitHub/Cloud Shell 操作: GitHub リポジトリで Settings > Secrets and variables > Actions > New repository secret を開く。
- 入力値: Name は `AZURE_CREDENTIALS`、Secret は手順5の JSON 全体。
- 期待状態: `AZURE_CREDENTIALS` Secret が作成される。
- よくある失敗: Secret value に JSON の一部だけを貼る。Name を間違える。Secret value を画面共有やスクリーンショットに写す。

### 手順7: GitHub Repository variables を追加する

- 目的: workflow がデプロイ先リソースとアプリ設定値を参照できるようにする。
- アーキテクチャ上の位置: GitHub Actions から Azure リソースとアプリ設定をつなぐ値。
- Azure Portal/GitHub/Cloud Shell 操作: GitHub リポジトリで Settings > Secrets and variables > Actions > Variables > New repository variable を開く。
- 入力値: `RESOURCE_GROUP`、`ACR_NAME`、`CONTAINER_APP_ENVIRONMENT`、`POSTGRES_SERVER`、`POSTGRES_USER`、`POSTGRES_DB`、`DATABASE_TYPE`、`AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`USER_ASSIGNED_IDENTITY_CLIENT_ID`、`USER_ASSIGNED_IDENTITY_RESOURCE_ID`、`AZURE_REDIRECT_URI`、`API_PROXY_TARGET`、`REPOSITORY`。
- 期待状態: 元ガイドのステップ3.3にある Repository variables が登録される。
- よくある失敗: `ACR_NAME` に `.azurecr.io` を含める。`POSTGRES_USER` に `postgres` を入れる。`AZURE_CLIENT_ID` に GitHub Actions 用 SP の client ID を入れる。Web URL と API URL を取り違える。

### 手順8: ワークフローファイルを有効化する

- 目的: テンプレートとして置かれている GitHub Actions workflow を実行対象にする。
- アーキテクチャ上の位置: CI/CD 定義の有効化。
- Azure Portal/GitHub/Cloud Shell 操作: Azure Cloud Shell で受講者リポジトリを clone し、`.template` ファイルを `.yml` としてコピーして commit/push する。
- 入力値: 受講者の repository URL。
- 期待状態: `.github/workflows/build-deploy-api.yml` と `.github/workflows/build-deploy-web.yml` が `main` ブランチに存在する。
- よくある失敗: repo URL を間違える。commit/push 前に Actions タブを見て workflow がないと判断する。GitHub 認証で止まる。

講座用のコマンド例:

```powershell
git clone <your-repo-url>
cd <your-repo-name>

cp .github/workflows/build-deploy-api.yml.template .github/workflows/build-deploy-api.yml
cp .github/workflows/build-deploy-web.yml.template .github/workflows/build-deploy-web.yml

git add .github/workflows/*.yml
git commit -m "Enable API and Web build-deploy workflows"
git push origin main
```

GitHub 認証で詰まる場合は、講師の指示に従って GitHub Web UI でファイルを作成する代替手順、または講師デモ環境に切り替えます。

### 手順9: GitHub Actions workflow を実行・監視する

- 目的: API と Web のコンテナイメージをビルドし、ACR と Container Apps にデプロイする。
- アーキテクチャ上の位置: CI/CD 実行。
- Azure Portal/GitHub/Cloud Shell 操作: GitHub リポジトリの Actions タブを開き、`Build and Deploy API to ACR` と `Build and Deploy Web to ACR` を確認する。
- 入力値: なし。
- 期待状態: 2つの workflow が成功する。
- よくある失敗: `AZURE_CREDENTIALS` の JSON が壊れている。variables が不足している。Azure リソース名が第5回の値と一致していない。

### 手順10: ACR と Container Apps のデプロイ結果を確認する

- 目的: GitHub Actions の成功が Azure 側の状態変化に反映されていることを確認する。
- アーキテクチャ上の位置: イメージ保管と実行環境の確認。
- Azure Portal/GitHub/Cloud Shell 操作: Azure Portal で ACR Repositories、Container Apps Environment、API/Web Container App の Revisions または Overview を確認する。
- 入力値: 第5回の ACR 名、Container Apps Environment 名、API/Web Container App 名。
- 期待状態: ACR にイメージがあり、API/Web Container App の revision が実アプリのイメージに更新されている。
- よくある失敗: GitHub Actions が成功していないのに Portal だけ確認する。別のリソースグループを見る。プレースホルダー revision と実アプリ revision を見分けられない。

### 手順11: Web URL、Entra ID redirect URI、GitHub variables を確認する

- 目的: Web サインインと Web/API 連携に使う URL が一致していることを確認する。
- アーキテクチャ上の位置: Web 認証と Web/API 接続の設定確認。
- Azure Portal/GitHub/Cloud Shell 操作: Web Container App Overview、Entra ID App registration > Authentication、GitHub Repository variables を順に確認する。
- 入力値: Web Container App URL、API Container App URL。
- 期待状態: Entra ID の SPA redirect URI が Web URL と一致し、`AZURE_REDIRECT_URI` と `API_PROXY_TARGET` が正しい。
- よくある失敗: redirect URI に `/callback` を付ける。API URL を redirect URI に設定する。`API_PROXY_TARGET` に Web URL を入れる。

### 手順12: Web アプリにアクセスし、Todo の基本操作を確認する

- 目的: Web、API、DB、Entra ID が連携していることを利用者目線で確認する。
- アーキテクチャ上の位置: 完成アプリの動作確認。
- Azure Portal/GitHub/Cloud Shell 操作: ブラウザーで Web Container App URL を開き、Login から Microsoft Entra ID でサインインする。
- 入力値: ダミーの Todo タイトルと説明。
- 期待状態: Todo の作成、編集、削除ができ、ページ更新後も保存状態が確認できる。
- よくある失敗: ブラウザーに古いキャッシュが残る。サインインユーザーが想定テナントと違う。API エラーを Web 画面だけで判断し、Container Apps logs や Actions logs を見ない。

### 手順13: 完成アーキテクチャを振り返る

- 目的: 作業したリソースの役割を、Web 3層と Azure サービスの関係で整理する。
- アーキテクチャ上の位置: 学習の定着。
- Azure Portal/GitHub/Cloud Shell 操作: 完成アーキテクチャ図を見ながら、各サービスの役割を確認する。
- 入力値: なし。
- 期待状態: Web、API、DB、ACR、GitHub Actions、Entra ID、Managed Identity の役割を説明できる。
- よくある失敗: GitHub Actions を「アプリの実行場所」と誤解する。ACR を「アプリの公開 URL」と誤解する。

### 手順14: PostgreSQL 停止またはリソース削除を行う

- 目的: ハンズオン終了後の不要な課金と資格情報の残置を防ぐ。
- アーキテクチャ上の位置: コスト管理とセキュリティ整理。
- Azure Portal/GitHub/Cloud Shell 操作: 講師指示に従い、PostgreSQL を停止する。講座後に不要な場合は Resource group 削除、GitHub Secret 削除、Service Principal/App registration 削除を検討する。
- 入力値: なし。
- 期待状態: 少なくとも PostgreSQL が Stopped になっている。削除する場合は Resource group と外部認証情報の扱いを確認できている。
- よくある失敗: Resource group を削除しても Entra ID App registration や GitHub Secret が残ることを忘れる。PostgreSQL を Running のまま放置する。

## よくある失敗

### PostgreSQL を再開し忘れる

原因:
第5回の最後に停止した PostgreSQL を Running に戻さないままデプロイや動作確認を進めると、API から DB に接続できません。

対応:
ハンズオン開始時に PostgreSQL Overview を全員で確認します。Status が Running または Ready になるまで待ってからアプリ確認へ進みます。

### Service Principal 作成またはロール割り当てができない

原因:
Service Principal 作成権限、RBAC role assignment 権限、テナント設定が想定どおりではない可能性があります。

対応:
講師が権限を確認します。時間内に復旧できない場合は、講師が事前作成した `AZURE_CREDENTIALS` サンプルまたは完成済みデモ環境に切り替えます。

### `AZURE_CREDENTIALS` の JSON が壊れている

原因:
JSON の一部だけをコピーした、改行や引用符が崩れた、余計な文字を含めた可能性があります。

対応:
GitHub Actions の失敗ログを確認します。Secret は値を再表示できないため、必要に応じて Service Principal を再作成し、Secret を更新します。

### Repository variables の値を取り違える

原因:
Web URL と API URL、Entra app client ID と GitHub Actions 用 Service Principal client ID、ACR name と login server を混同することがあります。

対応:
第5回の接続情報一覧と L06-T03 を見比べて確認します。`ACR_NAME` には `.azurecr.io` を含めず、`AZURE_CLIENT_ID` には Web サインイン用 Entra app client ID を入れます。

### GitHub Actions workflow が表示されない

原因:
`.github/workflows/build-deploy-api.yml` と `.github/workflows/build-deploy-web.yml` が `main` に存在していない可能性があります。

対応:
手順8の workflow 有効化が commit/push まで完了しているか確認します。GitHub Web UI で `.template` のままになっていないか確認します。

### API が PostgreSQL に接続できない

原因:
`POSTGRES_SERVER`、`POSTGRES_USER`、Managed Identity の DB パーミッション、PostgreSQL のネットワーク設定、PostgreSQL の Running 状態のいずれかが誤っている可能性があります。

対応:
GitHub Actions のログ、Container Apps のログ、PostgreSQL Overview、Managed Identity の DB 権限を順に確認します。時間内に復旧できない場合は講師デモで通信経路を確認します。

### Web サインインが失敗する

原因:
Entra ID App registration の redirect URI、`AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、Web URL が一致していない可能性があります。

対応:
Entra ID App registration > Authentication で SPA redirect URI を確認します。Web Container App URL と `AZURE_REDIRECT_URI` が一致しているか確認します。`/callback` は付けません。

### Container Apps にデプロイ結果が見えない

原因:
workflow が失敗している、ACR にイメージが作成されていない、別のリソースグループや Environment を見ている可能性があります。

対応:
最初に GitHub Actions の成功/失敗を確認し、次に ACR Repositories、最後に Container Apps revisions を確認します。

### Secret や個人情報が画面共有に写る

原因:
Service Principal の JSON、GitHub Secret、サインイン画面、Azure Portal の Overview には、公開してはいけない情報が含まれることがあります。

対応:
Secret value は画面共有しません。スクリーンショット取得時は、ID、メール、リソース ID、内部 URL、client secret を必ずマスクします。

## 講師が見る確認ポイント

- 受講者が第5回と同じサブスクリプション、リソースグループを参照していること。
- PostgreSQL Flexible Server が Running または Ready になっていること。
- 受講者の GitHub リポジトリがテンプレートから作成され、Public になっていること。
- `AZURE_CREDENTIALS` Secret が作成されていること。値は表示しない。
- Repository variables が元ガイドのステップ3.3と一致していること。
- `ACR_NAME`、`AZURE_CLIENT_ID`、`POSTGRES_USER`、`AZURE_REDIRECT_URI`、`API_PROXY_TARGET` の取り違えがないこと。
- `Build and Deploy API to ACR` と `Build and Deploy Web to ACR` の workflow が表示され、成功していること。
- ACR に API/Web のイメージが作成されていること。
- API/Web Container App の revision が更新されていること。
- Entra ID redirect URI が Web Container App URL と一致していること。
- Web アプリにアクセスでき、サインインと Todo の作成、編集、削除ができること。
- 最後に PostgreSQL を停止するか、講師指示に従ってリソース削除方針を確認していること。
- Service Principal の JSON、client secret、接続文字列、実 ID がスクリーンショットや公開資料に残っていないこと。

## 復旧できない場合のスキップ手順

時間内に復旧できない場合は、アプリの完成作業そのものよりも「どのサービスが何を担当したか」の理解を優先します。

1. GitHub アカウントや Public リポジトリ作成で止まる場合は、講師が用意したサンプルリポジトリを画面共有し、受講者は variables の意味を確認する。
2. Service Principal 作成やロール割り当てで止まる場合は、講師が事前作成した資格情報またはデモ環境で workflow の流れを説明する。
3. `AZURE_CREDENTIALS` や variables の設定ミスが多い場合は、全員で L06-T03 の表に戻り、値の意味だけを確認する。
4. workflow が失敗し続ける場合は、講師の成功済み Actions 実行画面、ACR、Container Apps revision を見せる。
5. Web サインインが復旧しない場合は、講師デモ環境で Entra ID redirect URI と Web URL の一致を確認する。
6. API/DB 接続が復旧しない場合は、Todo 操作は講師デモ環境で確認し、受講者は Web/API/DB の通信経路を図上で追う。
7. PostgreSQL が作成済みで Running の場合は、最後に停止だけは完了させる。

## クリーンアップ手順

第6回終了後は、講師の方針に従って「残して復習に使う」または「削除して課金を止める」を判断します。
どちらの場合も、PostgreSQL と Secret の扱いは必ず確認します。

### リソースを残す場合

1. Azure Portal で PostgreSQL Flexible Server を開く。
2. Overview で対象サーバー名が自分の第5回リソースであることを確認する。
3. Stop を選ぶ。
4. Status が Stopped になるまで待つ。
5. GitHub repository の `AZURE_CREDENTIALS` Secret を残す必要があるか講師に確認する。
6. 残す場合でも、Secret value や Service Principal の JSON を手元メモやスクリーンショットに残さない。

### リソースを削除する場合

1. Azure Portal で `rg-azbeg-l05-<受講者番号>` を開く。
2. 削除対象が第5回から第6回のハンズオン用リソースだけであることを確認する。
3. Resource group を削除する。
4. GitHub リポジトリの `AZURE_CREDENTIALS` Secret を削除する。
5. GitHub Actions 用 Service Principal/App registration を講師指示に従って削除する。
6. 第5回で作成した Web サインイン用 Entra ID App registration も不要であれば削除する。
7. 受講者個人の GitHub repository を残すか削除するかを確認する。

注意:
Resource group を削除しても、Entra ID App registration、Service Principal、GitHub repository、GitHub Secret は自動では削除されません。
公開リポジトリに秘密情報や実環境 ID を commit していないことも確認します。

## 振り返り

最後に受講者へ次の問いを投げかけます。

1. GitHub Actions は、今回のデプロイでどの作業を自動化したか。
2. `AZURE_CREDENTIALS` Secret と Repository variables は何が違うか。
3. `AZURE_CLIENT_ID` と GitHub Actions 用 Service Principal の client ID を取り違えると、何が起きるか。
4. Todo の作成結果がページ更新後も残ることで、どの層が動いていることを確認できるか。
5. Resource group を削除しても残る可能性があるものは何か。

## 確認クイズ案

### 問1

GitHub Actions の主な役割として最も近いものはどれですか。

- A. Todo データを保存する
- B. コンテナイメージのビルド、ACR への push、Container Apps 更新を自動化する
- C. Microsoft Entra ID のテナントを作成する

正解: B

### 問2

`AZURE_CREDENTIALS` はどこに登録しますか。

- A. GitHub Actions Secret
- B. GitHub Repository variables
- C. Azure Container Apps の Application URL

正解: A

### 問3

`ACR_NAME` に設定する値として正しいものはどれですか。

- A. `acrazbegl05s01` のような ACR 名
- B. `acrazbegl05s01.azurecr.io` のような login server
- C. Web Container App URL

正解: A

### 問4

Web サインインが失敗する場合に、まず確認すべきものはどれですか。

- A. Entra ID の redirect URI と `AZURE_REDIRECT_URI`
- B. PostgreSQL の SKU
- C. ACR のタグ一覧だけ

正解: A

### 問5

第6回終了後、Resource group を削除しても自動では削除されない可能性があるものはどれですか。

- A. Entra ID App registration や GitHub repository secret
- B. 同じ Resource group 内の Container Apps
- C. 同じ Resource group 内の ACR

正解: A

## 講師向け補足

- 第6回は GitHub、Azure Portal、Cloud Shell を行き来するため、講師は画面遷移のテンポを事前に確認する。
- 元ガイドのステップ3.1は Service Principal とロール割り当てを含む。受講者の権限で実行できるか、少なくとも1週間前に検証する。
- 受講者が Contributor のみの場合、ロール割り当てで止まる可能性がある。必要に応じて講師が事前作成した資格情報、追加権限、またはデモ環境を用意する。
- `AZURE_CREDENTIALS` の JSON は画面共有しない。講師デモでも secret value を表示しない。
- GitHub repository を Public にする理由は初心者向けフローを簡略化するためであり、実務では組織ポリシーとセキュリティ要件に従うことを補足する。
- GitHub Actions の失敗時は、Portal 側だけでなく Actions の job log を最初に確認させる。
- `AZURE_CLIENT_ID` は Web サインイン用 Entra app client ID であり、GitHub Actions 用 Service Principal の client ID とは別であることを強調する。
- ACR、Container Apps、PostgreSQL は受講者50名分でコスト影響が大きいため、講師は終了後の削除/停止方針を明確にする。
- 第7回のネットワーク回につなげるため、DB 接続失敗の話は Private DNS、VNet、サブネットの詳細に深入りせず、名前だけ予告する。

## 参考資料

- [Todo アプリ ハンズオン手順](https://github.com/Liminghao0922/todomanagement/blob/main/handson/DEPLOY_GUIDE_GUI-ja_JP.md)
- [GitHub Docs: Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [GitHub Docs: Using secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [GitHub Docs: Store information in variables](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables)
- [Microsoft Learn: GitHub Actions を使用して Azure に接続する](https://learn.microsoft.com/ja-jp/azure/developer/github/connect-from-azure)
- [Microsoft Learn: az ad sp](https://learn.microsoft.com/ja-jp/cli/azure/ad/sp?view=azure-cli-latest)
- [Microsoft Learn: Azure Container Apps](https://learn.microsoft.com/ja-jp/azure/container-apps/overview)
- [Microsoft Learn: Azure Container Registry](https://learn.microsoft.com/ja-jp/azure/container-registry/container-registry-intro)
- [Microsoft Learn: Azure Database for PostgreSQL Flexible Server](https://learn.microsoft.com/ja-jp/azure/postgresql/flexible-server/overview)
- [Microsoft Learn: Azure Database for PostgreSQL Flexible Server のコンピューティングを開始する](https://learn.microsoft.com/ja-jp/azure/postgresql/configure-maintain/how-to-start-server?tabs=portal-start-server)
- [Microsoft Learn: Azure Database for PostgreSQL Flexible Server のコンピューティングを停止する](https://learn.microsoft.com/ja-jp/azure/postgresql/configure-maintain/how-to-stop-server)

参考資料は教材本文の主軸にはせず、受講者が復習するときの入口として提示します。