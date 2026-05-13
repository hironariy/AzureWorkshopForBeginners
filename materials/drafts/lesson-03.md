# 第3回 Azure IaaS サービス紹介、Azure VM をつかった Web サーバ構築 ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第3回
- タイトル: Azure IaaS サービス紹介、Azure VM をつかった Web サーバ構築
- 形式: オンライン座学 + ハンズオン
- 時間: 60分 (50分レクチャー/ハンズオン、10分QA)
- 想定日: 2026年7月2日

## この回の位置づけ

第3回は、受講者が初めて Azure Portal で実際の Azure リソースを作成する回です。
第2回で学んだ Web 3層アーキテクチャのうち、本回では Web 層に相当する Web サーバを Azure VM 上に構築し、インターネットからアクセスできることを確認します。

VM を作るだけでなく、VM を動かすために VNet、サブネット、NIC、Managed Disk、Public IP、NSG などが一緒に作成されることを体験し、クラウド上のサーバがネットワークやストレージと組み合わさって動くことを理解します。

## 受講前提

- 第2回で Web 3層アプリケーションの基本を学んでいることが望ましい。
- Azure Portal の利用経験は不要。
- Web サーバ、IP アドレス、ファイアウォール、仮想マシンという言葉を聞いたことがあることが望ましい。
- 受講者には、講師が用意する Azure サブスクリプションをスコープとして Contributor ロールが付与されている。
- 受講者番号として `s01`、`s02` のような値が講師から案内されている。

## 到達目標

- Azure VM を使って、インターネットからアクセスできる簡単な Web サーバを構築できる。
- Azure VM を作成するときに、VM だけでなくネットワーク、ディスク、NIC、Public IP、NSG が関係することを説明できる。
- VNet、サブネット、NSG、Public IP が Web サーバ公開にどう関係するかを概要レベルで説明できる。
- VM 作成時のカスタムデータを使って、起動時に NGINX をインストールし、初期ページをカスタマイズする流れを理解できる。
- ハンズオンで作成したリソースをリソースグループごと削除し、課金を止める必要があることを理解できる。

## 受講後に説明できること/操作できること

- Azure Portal でリソースグループを作成できる。
- Azure Portal で Linux VM を作成し、HTTP アクセスを許可できる。
- VM 作成時に作られる NIC、Managed Disk、Public IP、NSG の役割を説明できる。
- VM の Public IP アドレスを確認し、ブラウザーから NGINX の画面を表示できる。
- 作成したリソースグループを削除し、不要な課金対象を残さないようにできる。

## 本回で扱う範囲

- Azure IaaS の基本的な考え方
- Azure VM の構成要素
- OS イメージ、サイズ/SKU、管理者アカウント、認証方式
- Managed Disk、NIC、VNet、サブネット、NSG、Public IP
- Route Table/UDR の概要。作成はしない。
- Azure Portal でのリソースグループ作成
- Azure Portal での Linux VM 作成
- VM 作成時のカスタムデータを使った NGINX インストール
- ブラウザーからの HTTP アクセス確認
- リソースグループ削除によるクリーンアップ

## 本回で扱わない範囲

- 本番向けの冗長化構成
- Load Balancer、Application Gateway、WAF、CDN の詳細
- HTTPS/TLS、独自ドメイン、証明書設定
- SSH による詳細な Linux 操作
- OS パッチ運用、バックアップ、監視の詳細
- Route Table/UDR の詳細設計
- IaC による構築
- Azure CLI による構築。CLI が必要な場合も本講座では Azure Cloud Shell に限定する。

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | 前回の振り返りと今回のゴール | Web 3層のうち Web 層を VM で作る位置づけを確認する |
| 5-15分 | Azure VM と周辺リソースの概要 | VM、ディスク、NIC、VNet、NSG、Public IP の関係を理解する |
| 15-20分 | 完成アーキテクチャ確認 | これから作る構成と作業範囲を先に示す |
| 20-42分 | ハンズオン | Azure Portal で VM を作成し、NGINX にアクセスする |
| 42-47分 | 構築した構成の振り返り | 作成されたリソースの役割をアーキテクチャ図で確認する |
| 47-50分 | クリーンアップ確認 | リソースグループ削除と課金停止の考え方を確認する |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は46枚です。ハンズオン中心の回として35枚から55枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | Azure VM をつかった Web サーバ構築 | この回では、Azure Portal で VM を作成し、インターネットからアクセスできる Web サーバを構築します。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | 今日は Azure VM だけでなく、VM を動かすためのネットワークとストレージも一緒に見ます。 | 到達目標、完成状態、クリーンアップまで行うこと | L03-D01 |
| 3 | 前回の振り返り | 第2回では、Web 層、AP 層、DB 層という役割の分け方を学びました。 | Web 3層の簡単な復習、今回の対象は Web 層 | L03-D02 |
| 4 | いきなり3層すべてを作らない理由 | 初めての Azure ハンズオンでは、まず入口となる Web サーバに集中します。 | Web 層だけを作る理由、AP/DB は後続回で扱うこと | L03-D03 |
| 5 | Azure IaaS とは何か | IaaS では、クラウド上に仮想的なサーバやネットワークを用意して利用します。 | IaaS の基本、利用者が管理する範囲 | L03-D04 |
| 6 | Azure VM の全体像 | Azure VM は単体で存在するのではなく、ディスク、NIC、ネットワークと組み合わせて動きます。 | VM、OS、ディスク、NIC、VNet、Public IP | L03-D05 |
| 7 | OS イメージとサイズ | VM 作成時には、OS と性能の大きさを選びます。 | Ubuntu Server、Windows Server、サイズ/SKU、コストとの関係 | L03-D06 |
| 8 | Managed Disk | VM の OS やデータは、Azure が管理するディスクに保存されます。 | OS ディスク、データディスク、削除漏れと課金 | L03-D07 |
| 9 | NIC と IP アドレス | VM がネットワークに参加するには、NIC と IP アドレスが必要です。 | NIC、Private IP、Public IP の違い | L03-D08 |
| 10 | VNet とサブネット | VNet はクラウド上のネットワーク空間で、サブネットはその中の区画です。 | VNet、サブネット、住所と区画の比喩 | L03-D09 |
| 11 | NSG | NSG は、どの通信を許可するかを制御する入口のルールです。 | HTTP 80、SSH 22、本番では最小許可が基本 | L03-D10 |
| 12 | Route Table/UDR | 通信の通り道を明示的に制御したい場合に Route Table を使います。 | 本回では作成しない、存在だけ紹介、第7回への接続 | L03-D11 |
| 13 | 今日作るアーキテクチャ | ブラウザーから Public IP 経由で Azure VM 上の NGINX にアクセスします。 | 完成構成、今回作る範囲、未作成の AP/DB | L03-D12 |
| 14 | ハンズオンで使う値 | 入力値をそろえると、後から確認や削除がしやすくなります。 | 受講者番号、リージョン、リソースグループ名、VM 名 | 表 L03-T01 |
| 15 | ハンズオンの流れ | まずリソースグループを作り、その中に VM と関連リソースを作成します。 | 作業ステップ全体、最後に削除すること | L03-D13 |
| 16 | Azure Portal にサインイン | まず講師が案内したアカウントで Azure Portal にサインインします。 | Portal URL、サブスクリプション確認 | L03-SS01 |
| 17 | リソースグループを作成する | ハンズオン用のリソースは、受講者ごとのリソースグループにまとめます。 | リソースグループ作成、命名規則、Japan East | L03-SS02 |
| 18 | リソースグループ作成を確認する | 作成したリソースグループが表示されることを確認します。 | Overview、タグ、場所 | L03-SS03 |
| 19 | VM 作成を開始する | リソースグループ内で Linux VM の作成を開始します。 | Create、Virtual machine、Basics タブ | L03-SS04 |
| 20 | VM の基本情報を入力する | VM 名、リージョン、イメージ、サイズを指定します。 | Ubuntu、Japan East、Standard_B1s、可用性オプションは本回では使わない | L03-SS05 |
| 21 | 管理者アカウントを指定する | VM には管理者ユーザーが必要ですが、本回では SSH 操作を主目的にしません。 | ユーザー名、SSH public key、キー保存の注意 | L03-SS06 |
| 22 | HTTP アクセスを許可する | ブラウザーから NGINX を表示するため、HTTP の受信を許可します。 | Inbound ports、HTTP 80、SSH は最小限 | L03-SS07 |
| 23 | ディスク設定を確認する | 本回では既定の OS ディスクを利用し、詳細なディスク設計には入りません。 | OS Disk、Premium/Standard、コスト注意 | L03-SS08 |
| 24 | ネットワーク設定を確認する | Portal は VM に必要な VNet、サブネット、NIC、Public IP、NSG を一緒に作成します。 | Networking タブ、VNet、Subnet、Public IP、NSG | L03-SS09 |
| 25 | カスタムデータを設定する | VM 起動時のスクリプトで NGINX をインストールし、初期ページをカスタマイズします。 | Advanced タブ、Custom data、cloud-init | L03-SS10 |
| 26 | タグを設定する | タグを付けると、講師がリソースの用途や削除予定を確認しやすくなります。 | Course、Lesson、StudentId、Environment、DeleteAfter | L03-SS11 |
| 27 | 内容を確認して作成する | 作成前に、名前、リージョン、サイズ、HTTP 許可を確認します。 | Review + create、Validation passed | L03-SS12 |
| 28 | デプロイ完了を待つ | VM と関連リソースの作成には数分かかります。 | Deployment in progress、完了画面 | L03-SS13 |
| 29 | VM の Overview を確認する | VM の状態と Public IP アドレスを確認します。 | Running、Public IP、Resource group | L03-SS14 |
| 30 | 作成された関連リソースを見る | VM 作成により、ディスク、NIC、Public IP、NSG なども作成されています。 | リソースグループ内のリソース一覧 | L03-SS15 |
| 31 | ブラウザーでアクセスする | Public IP に HTTP でアクセスし、NGINX のページが表示されることを確認します。 | `http://<Public IP>`、カスタムページ | L03-SS16 |
| 32 | 表示されないときの見方 | 画面が出ない場合は、VM の状態、Public IP、NSG、スクリプトの実行を順に確認します。 | よくある原因、確認順 | L03-D14 |
| 33 | NSG の受信ルールを確認する | HTTP 80 が許可されているかを見ると、通信の入口を確認できます。 | NSG inbound security rules | L03-SS17 |
| 34 | カスタムデータが失敗した場合 | NGINX が入っていない場合は、講師の判断で Portal の Run command を使って補助できます。 | Run command は復旧用、通常手順では使わない | L03-SS18 |
| 35 | 構築した構成を振り返る | 作成したリソースをアーキテクチャ図に戻して、何が何を担当しているか確認します。 | VM、NIC、Disk、VNet、NSG、Public IP | L03-D15 |
| 36 | 第2回の Web 層との関係 | 今日作った NGINX on VM は、Web 3層の Web 層を単純化して体験したものです。 | Web 層、AP/DB は未作成 | L03-D16 |
| 37 | コストが発生する場所 | VM、Public IP、Managed Disk などは作成したままにすると課金対象になります。 | コスト注意、削除対象 | L03-D17 |
| 38 | リソースグループを削除する | 本回のリソースは、受講者ごとのリソースグループごと削除します。 | Delete resource group、入力確認 | L03-SS19 |
| 39 | 削除完了を確認する | リソースグループが消えたことを確認して、不要な課金を残さないようにします。 | 削除後の一覧、反映待ち | L03-SS20 |
| 40 | 早く終えた人向け | 余裕がある人は、Apache 版やカスタムデータの中身を読み物として確認します。 | 追加課題、実施は任意 | なし |
| 41 | よくある失敗 | リージョン、名前、クォータ、NSG、Public IP、削除漏れは特につまずきやすいポイントです。 | 失敗パターン一覧 | 表 L03-T02 |
| 42 | 復旧できない場合 | 時間内に直せない場合でも、講師デモで完成状態を見て構成理解に戻ります。 | デモ環境、スキップ手順 | L03-D18 |
| 43 | 今日のまとめ | Azure VM は、ネットワークやストレージと組み合わせて初めて Web サーバとして動きます。 | 3つのまとめ | L03-D19 |
| 44 | 確認クイズ | 自分の言葉で、VM と周辺リソースの関係を説明できるか確認します。 | クイズ3問 | なし |
| 45 | 次回予告 | 次回はコンテナを使い、VM と比べて何が簡略化されるのかを体験します。 | 第4回 ACI への接続 | L03-D20 |
| 46 | QA | 操作で詰まった点と、構成で分からない点を確認します。 | 質疑応答 | なし |

## 図表・スクリーンショット素材一覧

本回はハンズオン回のため、Azure Portal のスクリーンショットが必須です。
`L03-Dxx` は AI または draw.io で作成する図表、`L03-Txx` は表、`L03-SSxx` は筆者が取得するスクリーンショットとして管理します。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L03-D01 | 図表 | 必須 | AI/draw.io で作成 | 今日のゴールと完成状態 |
| L03-D02 | 図表 | 必須 | AI/draw.io で作成 | 第2回 Web 3層の振り返り |
| L03-D03 | 図表 | 必須 | AI/draw.io で作成 | 今回は Web 層に集中する理由 |
| L03-D04 | 図表 | 必須 | AI/draw.io で作成 | IaaS の責任分界 |
| L03-D05 | 図表 | 必須 | AI/draw.io で作成 | Azure VM と周辺リソースの関係 |
| L03-D06 | 表 | 任意 | AI で作成 | OS イメージとサイズ/SKU の比較 |
| L03-D07 | 図表 | 必須 | AI/draw.io で作成 | Managed Disk の役割 |
| L03-D08 | 図表 | 必須 | AI/draw.io で作成 | NIC、Private IP、Public IP の関係 |
| L03-D09 | 図表 | 必須 | AI/draw.io で作成 | VNet とサブネットの関係 |
| L03-D10 | 図表 | 必須 | AI/draw.io で作成 | NSG による受信制御 |
| L03-D11 | 図表 | 任意 | AI/draw.io で作成 | Route Table/UDR の概要 |
| L03-D12 | 図表 | 必須 | AI/draw.io で作成 | NGINX on Azure VM の完成アーキテクチャ |
| L03-D13 | 図表 | 必須 | AI/draw.io で作成 | ハンズオン進行図 |
| L03-D14 | 図表 | 必須 | AI で作成 | 表示されないときの確認順 |
| L03-D15 | 図表 | 必須 | AI/draw.io で作成 | 構築後のリソース関係振り返り |
| L03-D16 | 図表 | 必須 | AI/draw.io で作成 | Web 3層における今回の作成範囲 |
| L03-D17 | 表 | 必須 | AI で作成 | コストが発生する主なリソース |
| L03-D18 | 図表 | 任意 | AI で作成 | スキップ手順の判断フロー |
| L03-D19 | 図表 | 必須 | AI で作成 | 今日のまとめ |
| L03-D20 | 図表 | 任意 | AI/draw.io で作成 | 第4回 ACI への接続 |
| L03-T01 | 表 | 必須 | AI で作成 | ハンズオン入力値一覧 |
| L03-T02 | 表 | 必須 | AI で作成 | よくある失敗一覧 |
| L03-SS01 | スクリーンショット | 必須 | 筆者が提供 | Azure Portal サインイン後のホームまたはサブスクリプション確認 |
| L03-SS02 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ作成画面 |
| L03-SS03 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ Overview |
| L03-SS04 | スクリーンショット | 必須 | 筆者が提供 | VM 作成開始画面 |
| L03-SS05 | スクリーンショット | 必須 | 筆者が提供 | VM Basics の基本情報入力 |
| L03-SS06 | スクリーンショット | 必須 | 筆者が提供 | VM 管理者アカウント設定 |
| L03-SS07 | スクリーンショット | 必須 | 筆者が提供 | HTTP 受信許可設定 |
| L03-SS08 | スクリーンショット | 任意 | 筆者が提供 | VM Disks タブ |
| L03-SS09 | スクリーンショット | 必須 | 筆者が提供 | VM Networking タブ |
| L03-SS10 | スクリーンショット | 必須 | 筆者が提供 | Advanced タブの Custom data |
| L03-SS11 | スクリーンショット | 任意 | 筆者が提供 | Tags タブ |
| L03-SS12 | スクリーンショット | 必須 | 筆者が提供 | Review + create 画面 |
| L03-SS13 | スクリーンショット | 必須 | 筆者が提供 | Deployment succeeded 画面 |
| L03-SS14 | スクリーンショット | 必須 | 筆者が提供 | VM Overview と Public IP |
| L03-SS15 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ内の関連リソース一覧 |
| L03-SS16 | スクリーンショット | 必須 | 筆者が提供 | ブラウザーで NGINX カスタムページが表示された状態 |
| L03-SS17 | スクリーンショット | 必須 | 筆者が提供 | NSG inbound security rules |
| L03-SS18 | スクリーンショット | 任意 | 筆者が提供 | VM Run command 画面。復旧用 |
| L03-SS19 | スクリーンショット | 必須 | 筆者が提供 | リソースグループ削除確認画面 |
| L03-SS20 | スクリーンショット | 必須 | 筆者が提供 | 削除後のリソースグループ一覧 |

## 図表案

### L03-D01 今日のゴールと完成状態

目的: 本回で作るものを最初に示し、受講者が完成形をイメージできるようにする。

構成:

- 受講者のブラウザー
- Internet
- Public IP
- NSG
- Azure VM
- NGINX
- ゴール: ブラウザーでカスタム NGINX ページを表示する

### L03-D02 第2回 Web 3層の振り返り

目的: 第2回で学んだ Web 3層のうち、本回は Web 層に集中することを示す。

構成:

- Web 層、AP 層、DB 層の3つの論理ブロック
- Web 層を強調
- AP 層、DB 層は後続回で扱うとラベル付け

### L03-D03 今回は Web 層に集中する理由

目的: VM、ネットワーク、ストレージを初めて学ぶため、3層すべてを同時に扱わない理由を説明する。

構成:

- 左: Web/AP/DB を一度に作ろうとして複雑になる図
- 右: Web サーバに集中し、VM と周辺リソースを理解する図

### L03-D04 IaaS の責任分界

目的: Azure VM では Azure が管理する範囲と利用者が管理する範囲があることを示す。

構成:

- Azure が管理: 物理データセンター、物理サーバ、基盤ネットワーク
- 利用者が管理: OS 設定、ミドルウェア、アプリ、パッチ、公開設定
- 本回は利用者が VM と NGINX を構成することを強調

### L03-D05 Azure VM と周辺リソースの関係

目的: VM が単体ではなく、ディスク、NIC、ネットワークと組み合わさって動くことを示す。

構成:

- Azure VM
- Managed Disk
- NIC
- VNet とサブネット
- NSG
- Public IP
- 矢印で依存関係を示す

### L03-D06 OS イメージとサイズ/SKU の比較

目的: VM 作成時に OS とサイズを選ぶ意味を簡単に説明する。

構成:

| 項目 | 意味 | 本回の選択 |
| --- | --- | --- |
| OS イメージ | VM に入れる OS | Ubuntu Server 24.04 LTS |
| サイズ/SKU | CPU/メモリ/価格の大きさ | Standard_B1s を想定 |
| リージョン | 配置する地域 | Japan East |

### L03-D07 Managed Disk の役割

目的: VM の OS が Managed Disk に保存されることを示す。

構成:

- Azure VM
- OS Disk
- 削除しないと課金が残る可能性があることを注記

### L03-D08 NIC、Private IP、Public IP の関係

目的: VM への通信に NIC と IP アドレスが関係することを示す。

構成:

- VM
- NIC
- Private IP
- Public IP
- ブラウザーから Public IP にアクセスする流れ

### L03-D09 VNet とサブネットの関係

目的: Azure の仮想ネットワーク空間と区画の考え方を示す。

構成:

- VNet を大きな枠として表示
- その中にサブネットを配置
- VM がサブネット内に配置されることを表示

### L03-D10 NSG による受信制御

目的: HTTP 通信が NSG の許可ルールによって VM に届くことを示す。

構成:

- Internet からの HTTP 80
- NSG inbound rule
- VM
- 許可されない通信はブロックされることを線種で示す

### L03-D11 Route Table/UDR の概要

目的: 通信経路を制御するサービスがあることを紹介する。

構成:

- VNet
- サブネット
- Route Table
- 次回以降、特に第7回で深掘りするラベル

### L03-D12 NGINX on Azure VM の完成アーキテクチャ

目的: ハンズオンで作る最終構成を示す。

構成:

- Resource group
- VNet とサブネット
- Azure VM
- Managed Disk
- NIC
- Public IP
- NSG
- NGINX
- ブラウザーから `http://<Public IP>` でアクセス

### L03-D13 ハンズオン進行図

目的: どの手順でどのリソースが増えるかを示す。

構成:

1. リソースグループ作成
2. VM 作成開始
3. ネットワークとディスクを確認
4. カスタムデータで NGINX 設定
5. Public IP でアクセス確認
6. リソースグループ削除

### L03-D14 表示されないときの確認順

目的: HTTP アクセス失敗時に、確認すべき場所を順番で示す。

構成:

1. VM が Running か
2. Public IP を見ているか
3. `http://` でアクセスしているか
4. NSG で HTTP 80 が許可されているか
5. カスタムデータが成功しているか
6. 復旧できない場合は講師デモへ切り替える

### L03-D15 構築後のリソース関係振り返り

目的: 作成後のリソース一覧をアーキテクチャに戻して理解する。

構成:

- リソースグループ内に、VM、Disk、NIC、Public IP、NSG、VNet を配置
- それぞれの一言説明を添える

### L03-D16 Web 3層における今回の作成範囲

目的: 今回作ったものが Web 層に相当することを示す。

構成:

- Web 層: NGINX on VM を強調
- AP 層: 未作成
- DB 層: 未作成
- 第5回から第6回で複合アプリへ進むラベル

### L03-D17 コストが発生する主なリソース

目的: 作成したままにすると課金対象になるものを整理する。

構成:

| リソース | 課金注意 | 本回の扱い |
| --- | --- | --- |
| Azure VM | 実行中はコンピュート課金 | 最後に削除 |
| Managed Disk | VM 停止後も残ると課金 | リソースグループ削除 |
| Public IP | SKU や状態により課金 | リソースグループ削除 |
| Log/診断関連 | 有効化した場合に課金 | 本回では詳細に扱わない |

### L03-D18 スキップ手順の判断フロー

目的: 時間内に復旧できないときの進め方を講師が判断しやすくする。

構成:

- VM 作成失敗
- HTTP 表示失敗
- カスタムデータ失敗
- 講師デモへ切り替え
- アーキテクチャ図で理解を継続

### L03-D19 今日のまとめ

目的: 第3回で押さえるべき要点を3つに絞る。

構成:

- VM はサーバの実行場所
- ネットワークとストレージがセットで必要
- 作成したリソースは最後に削除する

### L03-D20 第4回 ACI への接続

目的: 次回は VM ではなくコンテナで Web サーバを動かすことを予告する。

構成:

- 第3回: VM + NGINX
- 第4回: ACI + NGINX コンテナ
- 比較軸: OS 管理、起動速度、作成手順、管理対象

## スクリーンショット取得指示

スクリーンショットは、講座用または検証用のサブスクリプションで取得します。
公開用に利用する可能性があるため、サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID、秘密情報、課金情報は写さないか、公開前にマスクします。

| スクリーンショットID | 対象画面 | 用途 | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- |
| L03-SS01 | Azure Portal ホームまたはサブスクリプション確認画面 | Portal サインイン後の確認 | 講師が用意したサブスクリプションを選択できることを示す | ユーザー名、メールアドレス、サブスクリプション ID、テナント ID |
| L03-SS02 | Resource groups > Create | リソースグループ作成 | `rg-azbeg-l03-s01` のようなサンプル名で取得する | サブスクリプション ID、ユーザー名 |
| L03-SS03 | Resource group Overview | 作成確認 | 場所が Japan East であることを確認できる状態 | リソース ID、サブスクリプション ID |
| L03-SS04 | Virtual machine 作成開始画面 | VM 作成導入 | Create > Azure virtual machine の導線が分かるようにする | ユーザー名、サブスクリプション ID |
| L03-SS05 | VM Basics タブ | 基本情報入力 | VM 名、リージョン、Ubuntu、サイズを示す | サブスクリプション ID、実ユーザー名 |
| L03-SS06 | VM Basics タブの管理者アカウント欄 | 管理者アカウント設定 | SSH キーの秘密鍵内容は写さない | ユーザー名、秘密鍵、メールアドレス |
| L03-SS07 | VM Basics タブの inbound ports 欄 | HTTP 許可 | HTTP 80 が選択されていることを示す | なし。ユーザー情報があればマスク |
| L03-SS08 | VM Disks タブ | OS ディスク確認 | 本回では既定値利用でよいことを示す | サブスクリプション ID |
| L03-SS09 | VM Networking タブ | ネットワーク確認 | VNet、Subnet、Public IP、NSG が作られることを示す | 実リソース ID、サブスクリプション ID |
| L03-SS10 | VM Advanced タブの Custom data | NGINX 起動時スクリプト設定 | 貼り付けた cloud-init の先頭と意図が分かるようにする | 秘密情報がないことを確認 |
| L03-SS11 | VM Tags タブ | タグ設定 | Course、Lesson、StudentId などの例を示す | 実ユーザー名、内部情報 |
| L03-SS12 | Review + create | 作成前確認 | Validation passed と主要設定が見える状態 | サブスクリプション ID、ユーザー名 |
| L03-SS13 | Deployment succeeded | デプロイ完了確認 | Go to resource へ進める状態 | サブスクリプション ID、リソース ID |
| L03-SS14 | VM Overview | Public IP 確認 | VM が Running、Public IP が表示されている状態 | Public IP は講座用なら可。公開時は必要に応じてマスク |
| L03-SS15 | Resource group 内のリソース一覧 | 関連リソース確認 | VM、Disk、NIC、Public IP、NSG、VNet が見える状態 | リソース ID、サブスクリプション ID |
| L03-SS16 | ブラウザーで NGINX カスタムページ表示 | 動作確認 | `http://<Public IP>` で表示されたページを取得する | Public IP は必要に応じてマスク |
| L03-SS17 | NSG inbound security rules | HTTP 80 確認 | `Allow`、`TCP`、`80` が分かるようにする | リソース ID、サブスクリプション ID |
| L03-SS18 | VM > Run command | 復旧用 | 通常手順では使わず、カスタムデータ失敗時の講師向け参考とする | 実行結果にユーザー名や内部情報があればマスク |
| L03-SS19 | Delete resource group 確認画面 | クリーンアップ | リソースグループ名入力欄と削除確認を示す | サブスクリプション ID、ユーザー名 |
| L03-SS20 | Resource groups 一覧 | 削除確認 | 対象リソースグループが消えた状態または削除中であることを示す | サブスクリプション ID、ユーザー名 |

## ハンズオン手順案

### ハンズオンのゴール

Azure Portal から Ubuntu Server の Azure VM を作成し、VM 起動時のカスタムデータで NGINX をインストールします。
最後にブラウザーから `http://<Public IP>` へアクセスし、カスタマイズされた NGINX ページが表示されることを確認します。

### 入力値

| 項目 | 値の例 | 備考 |
| --- | --- | --- |
| リージョン | Japan East | 利用できない場合は講師が代替リージョンを指定 |
| 受講者番号 | `s01` | 講師が事前に採番 |
| リソースグループ名 | `rg-azbeg-l03-s01` | `s01` は自分の受講者番号に置き換える |
| VM 名 | `vm-azbeg-l03-s01` | 受講者番号を含める |
| OS イメージ | Ubuntu Server 24.04 LTS x64 Gen2 | Portal 表示に合わせて講師が事前確認 |
| サイズ | Standard_B1s | クォータ不足時は講師が代替 SKU を指定 |
| 管理者ユーザー名 | `azureuser` | 講座用の固定値。実務では組織ルールに従う |
| 認証方式 | SSH public key | Generate new key pair を想定。秘密鍵は公開しない |
| 受信ポート | HTTP 80 | SSH 22 は原則開けない。講師が必要と判断した場合のみ扱う |
| タグ | `Course=AzureWorkshopForBeginners`, `Lesson=L03`, `StudentId=s01`, `Environment=Workshop` | `StudentId` は自分の番号に置き換える |

### カスタムデータ案

VM 作成時の Advanced タブで、Custom data に以下の cloud-init を貼り付けます。
本ドラフト段階の案であり、講師は講座前に Ubuntu イメージと Portal UI で動作確認します。

```yaml
#cloud-config
package_update: true
packages:
  - nginx
write_files:
  - path: /var/www/html/index.html
    content: |
      <!doctype html>
      <html lang="ja">
      <head>
        <meta charset="utf-8">
        <title>Azure Workshop for Beginners</title>
      </head>
      <body>
        <h1>Azure VM の Web サーバに到達できました</h1>
        <p>第3回のハンズオンで作成した NGINX on Azure VM です。</p>
      </body>
      </html>
runcmd:
  - systemctl enable nginx
  - systemctl restart nginx
```

### 手順1: Azure Portal にサインインする

- 目的: 講師が用意したサブスクリプションで作業できる状態にする。
- アーキテクチャ上の位置: まだリソースは作らない。
- Azure Portal 操作: `https://portal.azure.com/` にアクセスし、講師指定のアカウントでサインインする。
- 入力値: なし。
- 期待状態: 対象サブスクリプションが選択できる。
- よくある失敗: 個人の別アカウントでサインインしている。対象サブスクリプションが見えない。

### 手順2: リソースグループを作成する

- 目的: 本回のリソースをまとめて管理し、最後にまとめて削除できるようにする。
- アーキテクチャ上の位置: すべてのハンズオンリソースを入れる外枠。
- Azure Portal 操作: Resource groups > Create を選ぶ。
- 入力値: `rg-azbeg-l03-<受講者番号>`、Region は Japan East。
- 期待状態: リソースグループの Overview が表示される。
- よくある失敗: 受講者番号を入れ忘れる。別リージョンを選ぶ。既存名と衝突する。

### 手順3: VM 作成を開始する

- 目的: Azure VM を作成し、Web サーバの実行場所を用意する。
- アーキテクチャ上の位置: Web 層に相当する VM。
- Azure Portal 操作: 作成したリソースグループ内で Create > Virtual machine を選ぶ。
- 入力値: VM 名、Region、Image、Size。
- 期待状態: VM 作成ウィザードの Basics タブで入力を進められる。
- よくある失敗: リソースグループを選び間違える。高価なサイズを選ぶ。

### 手順4: VM の基本情報を入力する

- 目的: VM の配置場所、OS、サイズを決める。
- アーキテクチャ上の位置: VM 本体と OS イメージ。
- Azure Portal 操作: Basics タブで Subscription、Resource group、VM name、Region、Image、Size を指定する。
- 入力値: Ubuntu Server 24.04 LTS、Standard_B1s を想定。
- 期待状態: 講師指定の値で次へ進める。
- よくある失敗: Japan East 以外を選ぶ。Standard_B1s が表示されない。Windows イメージを選ぶ。

### 手順5: 管理者アカウントと受信ポートを設定する

- 目的: VM の管理者ユーザーと、ブラウザーからの HTTP アクセスを設定する。
- アーキテクチャ上の位置: VM への管理情報と NSG の入口設定。
- Azure Portal 操作: Authentication type は SSH public key、Public inbound ports は HTTP 80 を許可する。
- 入力値: 管理者ユーザー名 `azureuser`。SSH キーは Generate new key pair を想定。
- 期待状態: HTTP 80 が許可され、VM 作成を続行できる。
- よくある失敗: HTTP を許可し忘れる。SSH 秘密鍵を公開してしまう。不要なポートを開ける。

### 手順6: ディスクとネットワークを確認する

- 目的: VM に必要な Managed Disk、NIC、VNet、サブネット、Public IP、NSG が作られることを確認する。
- アーキテクチャ上の位置: VM のストレージとネットワーク。
- Azure Portal 操作: Disks タブ、Networking タブを確認する。
- 入力値: 原則として既定値を利用する。講師が指定した値がある場合はそれに従う。
- 期待状態: VNet、Subnet、Public IP、NSG が作成予定になっている。
- よくある失敗: Public IP をなしにしてしまう。NSG の受信ルールを意図せず変更する。

### 手順7: カスタムデータを貼り付ける

- 目的: VM 起動時に NGINX を自動インストールし、確認用ページを配置する。
- アーキテクチャ上の位置: VM 内の Web サーバ設定。
- Azure Portal 操作: Advanced タブの Custom data に cloud-init を貼り付ける。
- 入力値: 上記のカスタムデータ案。
- 期待状態: VM 作成後に NGINX が起動し、カスタムページが表示される。
- よくある失敗: `#cloud-config` を消してしまう。インデントを崩す。貼り付け漏れがある。

### 手順8: タグを設定し、作成する

- 目的: 講師がハンズオンリソースを識別しやすくし、作成前に設定を確認する。
- アーキテクチャ上の位置: すべての作成リソースの管理情報。
- Azure Portal 操作: Tags タブでタグを入力し、Review + create で検証後に Create を選ぶ。
- 入力値: Course、Lesson、StudentId、Environment、DeleteAfter。
- 期待状態: Validation passed になり、Deployment succeeded まで進む。
- よくある失敗: タグの `StudentId` を自分の番号に置き換え忘れる。Validation エラーを読まずに進もうとする。

### 手順9: VM の Public IP を確認する

- 目的: ブラウザーからアクセスする宛先を確認する。
- アーキテクチャ上の位置: Internet から VM に到達するための公開アドレス。
- Azure Portal 操作: VM Overview を開き、Status と Public IP address を確認する。
- 入力値: なし。
- 期待状態: VM が Running で、Public IP が表示されている。
- よくある失敗: Private IP をコピーする。VM がまだ起動中なのにアクセスする。

### 手順10: ブラウザーで NGINX にアクセスする

- 目的: Web サーバとして動作していることを確認する。
- アーキテクチャ上の位置: ブラウザーから Public IP、NSG、NIC、VM、NGINX への通信。
- Azure Portal 操作: Portal ではなくブラウザーの別タブで `http://<Public IP>` にアクセスする。
- 入力値: VM Overview で確認した Public IP。
- 期待状態: カスタマイズされた NGINX ページが表示される。
- よくある失敗: `https://` でアクセスする。Public IP を間違える。HTTP 80 が許可されていない。

### 手順11: 関連リソースを確認する

- 目的: VM 作成により、周辺リソースも作られたことを確認する。
- アーキテクチャ上の位置: リソースグループ内の VM、Disk、NIC、Public IP、NSG、VNet。
- Azure Portal 操作: リソースグループの一覧に戻り、作成されたリソースを確認する。
- 入力値: なし。
- 期待状態: VM 以外の関連リソースが表示されている。
- よくある失敗: VM だけを見て、Disk や Public IP などの課金対象を意識しない。

### 手順12: リソースグループを削除する

- 目的: ハンズオンで作成した課金対象を削除する。
- アーキテクチャ上の位置: 本回のすべてのリソース。
- Azure Portal 操作: リソースグループの Delete resource group を選び、名前を入力して削除する。
- 入力値: `rg-azbeg-l03-<受講者番号>`。
- 期待状態: リソースグループが削除中または削除済みになる。
- よくある失敗: VM だけ停止して削除したつもりになる。別のリソースグループを削除しようとする。

## よくある失敗

### リージョンを間違える

原因:
Japan East 以外を選ぶと、講師の説明やクォータ確認とずれる場合があります。

対応:
作成前なら Japan East に戻します。作成後に気づいた場合は、講師に確認して続行するか削除して作り直します。

### VM サイズが選べない、またはクォータ不足になる

原因:
対象リージョンで Standard_B1s が利用できない、または同時参加人数に対して vCPU クォータが不足している可能性があります。

対応:
講師が代替 SKU または代替リージョンを指定します。受講者は自己判断で高価なサイズを選ばないようにします。

### HTTP でアクセスできない

原因:
VM がまだ起動していない、Public IP ではなく Private IP にアクセスしている、NSG で HTTP 80 が許可されていない、カスタムデータが失敗している可能性があります。

対応:
VM Overview、Public IP、NSG inbound rules、`http://` の指定を順に確認します。復旧に時間がかかる場合は講師デモに切り替えます。

### NGINX の既定ページまたはエラー画面が表示される

原因:
NGINX は起動しているが、カスタムデータで HTML を上書きできていない可能性があります。

対応:
本回の主目的は VM とネットワークの理解のため、NGINX が表示されていれば到達確認として扱えます。カスタムページの差分は講師補足に回します。

### リソースグループを削除し忘れる

原因:
ブラウザー表示で達成感があり、削除手順を飛ばしてしまうことがあります。

対応:
講師は最後に全員へ削除確認を促し、リソースグループ一覧で対象が消えたことを確認します。

## 講師が見る確認ポイント

- 受講者が正しいサブスクリプションを選べていること。
- リソースグループ名に第3回と受講者番号が含まれていること。
- リージョンが Japan East、または講師指定の代替リージョンになっていること。
- VM サイズが講師指定の低コスト SKU になっていること。
- HTTP 80 が NSG で許可されていること。
- VM Overview で VM が Running になっていること。
- ブラウザーで NGINX のページが表示されること。
- リソースグループ内に VM 以外の関連リソースが作成されていることを受講者が見ていること。
- 最後にリソースグループを削除できていること。

## 復旧できない場合のスキップ手順

時間内に復旧できない場合は、手順の完了よりもアーキテクチャ理解を優先します。

1. VM 作成前の Validation エラーで止まる場合は、講師が画面を確認し、名前、リージョン、サイズ、権限のどれが原因かを切り分ける。
2. クォータ不足の場合は、講師指定の代替 SKU または講師デモに切り替える。
3. VM は作成できたが HTTP 表示できない場合は、講師の完成済みデモ環境で NGINX 画面を見せる。
4. 受講者には L03-D12 または L03-D15 を使って、ブラウザー、Public IP、NSG、VM、NGINX の関係を確認させる。
5. 自分の環境で作成途中のリソースがある場合は、講師と一緒にリソースグループ削除だけは完了させる。

## クリーンアップ手順

本回のハンズオンはその回で完結するため、原則として最後に受講者ごとのリソースグループを削除します。

1. Azure Portal で Resource groups を開く。
2. `rg-azbeg-l03-<受講者番号>` を開く。
3. 削除対象が本回のリソースだけであることを確認する。
4. Delete resource group を選ぶ。
5. 確認欄にリソースグループ名を入力する。
6. Delete を実行する。
7. Resource groups 一覧で対象リソースグループが削除済み、または削除中であることを確認する。

注意:
VM を停止するだけでは、Managed Disk や Public IP などの課金対象が残る可能性があります。本回では VM 停止ではなく、リソースグループ削除を完了状態とします。

## 振り返り

最後に受講者へ次の問いを投げかけます。

1. Azure VM を作成したとき、VM 以外にどのようなリソースが作られたか。
2. ブラウザーから NGINX にアクセスできたとき、通信はどのリソースを通ったか。
3. HTTP でアクセスできない場合、最初にどこを確認するか。
4. VM を停止することと、リソースグループを削除することは何が違うか。

## 確認クイズ案

### 問1

Azure VM がネットワークに接続するために必要なリソースとしてもっとも近いものはどれですか。

- A. NIC
- B. Azure Policy
- C. Key Vault

正解: A

### 問2

ブラウザーから VM 上の NGINX にアクセスするため、本回で許可した代表的な受信ポートはどれですか。

- A. TCP 22
- B. TCP 80
- C. TCP 443

正解: B

### 問3

VM を停止すれば、Managed Disk や Public IP なども必ず削除される。正しいですか。

- A. 正しい
- B. 正しくない

正解: B

### 問4

本回の最後に推奨するクリーンアップ方法はどれですか。

- A. ブラウザーのタブを閉じる
- B. VM を停止するだけにする
- C. 受講者ごとのリソースグループを削除する

正解: C

## 講師向け補足

- 第3回は、受講者が初めて Azure Portal でリソースを作る回であるため、説明を急ぎすぎない。
- VM 作成画面は Azure Portal の更新で表示名やタブ構成が変わる可能性があるため、講座前にスクリーンショットと手順を通しで確認する。
- Standard_B1s や Ubuntu Server 24.04 LTS が Japan East で選択できることを事前に確認する。利用できない場合は代替 SKU または代替イメージを教材に追記する。
- 最大受講者数50名に対して、VM vCPU、Public IP、ネットワークリソースのクォータを少なくとも1週間前に確認する。
- HTTP 80 の公開は学習目的であり、本番環境では HTTPS、最小権限、管理ポートの制限、監視、パッチ運用などを検討する必要があることを短く補足する。
- SSH 秘密鍵や画面内のサブスクリプション ID、テナント ID、ユーザー名、メールアドレスはスクリーンショットに含めない。
- カスタムデータが失敗した場合でも、NGINX の既定ページが表示できていれば本回の主目的である「VM とネットワークの到達確認」は達成したものとして扱える。
- 早く終えた受講者向けの Apache 版やカスタムデータ解説は任意とし、全員の削除確認を優先する。

## 参考資料

- [Microsoft Learn: Azure Virtual Machines](https://learn.microsoft.com/ja-jp/azure/virtual-machines/)
- [Microsoft Learn: Linux 仮想マシンを Azure Portal で作成する](https://learn.microsoft.com/ja-jp/azure/virtual-machines/linux/quick-create-portal)
- [Microsoft Learn: Azure Virtual Network](https://learn.microsoft.com/ja-jp/azure/virtual-network/virtual-networks-overview)
- [Microsoft Learn: Network security groups](https://learn.microsoft.com/ja-jp/azure/virtual-network/network-security-groups-overview)
- [Microsoft Learn: Azure Managed Disks](https://learn.microsoft.com/ja-jp/azure/virtual-machines/managed-disks-overview)
- [Microsoft Learn: cloud-init support for virtual machines in Azure](https://learn.microsoft.com/ja-jp/azure/virtual-machines/linux/using-cloud-init)

参考資料は教材本文の主軸にはせず、受講者が復習するときの入口として提示します。
