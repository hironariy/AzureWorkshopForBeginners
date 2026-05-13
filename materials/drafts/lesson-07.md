# 第7回 Azure のネットワークの仕組み ドラフト

## 表紙

- 講座名: Azure Workshop for Beginners
- 回: 第7回
- タイトル: Azure のネットワークの仕組み
- 形式: オンライン座学
- 時間: 60分 (50分レクチャー、10分QA)
- 想定日: 2026年7月30日

## この回の位置づけ

第7回は、第3回から第6回までのハンズオンで断片的に登場した Azure ネットワークの要素を、設計の観点で整理する回です。
第3回では VM、Public IP、NSG を使い、第5回から第6回では VNet、サブネット、Private Endpoint、Private DNS Zone に近い考え方が登場しました。

本回では新しい Azure リソースは作成せず、通信経路、分離、制御、名前解決を図で追います。
特に Private Endpoint と DNS は、作成画面だけを見ても理解しにくいため、単一 VNet、Hub & Spoke、オンプレミス接続を含む3つのシナリオで処理の流れを確認します。

## 受講前提

- 第3回から第6回までのハンズオンで、VNet、サブネット、NSG、Container Apps、PostgreSQL などの名前を見たことがあることが望ましい。
- IP アドレス、サブネット、DNS という言葉を聞いたことがあることが望ましい。
- ネットワーク設計、ルーティング、DNS サーバー運用の経験は不要。
- AWS の経験は不要。ただし AWS 経験者が混乱しやすい Azure との差分は、補足として扱う。
- 本回は座学のみで、Azure Portal の操作は行わない。

## 到達目標

- Azure Virtual Network、サブネット、NSG、Route Table、VNet peering の基本的な役割を説明できる。
- Azure のネットワーク設計が、単体リソースの設定ではなく、通信経路、セキュリティ、運用、コストの設計であることを理解できる。
- Azure Well-Architected Framework と Azure Landing Zone の文脈で、なぜ Hub & Spoke 構成がよく使われるのかを説明できる。
- Private Endpoint が Azure サービスへのプライベート接続を実現する仕組みを理解できる。
- Private Endpoint 利用時に、Private DNS Zone や DNS Private Resolver の設計が重要になる理由を説明できる。
- AWS 経験者向けに、Azure の VNet、サブネット、NSG、Private Endpoint で特に意識すべき違いを概要レベルで説明できる。

## 受講後に説明できること/操作できること

- VNet は Azure 上のプライベートネットワークの基本単位であり、サブネットはその中で役割や配置を分ける単位であると説明できる。
- NSG は通信を許可または拒否する制御、Route Table は通信の向き先を変える制御であると説明できる。
- VNet peering は VNet 同士を Microsoft バックボーン上で接続する仕組みであり、既定では推移的な接続ではないことを説明できる。
- Hub & Spoke 構成で、Hub が共有ネットワーク機能、Spoke がワークロードを担当する理由を説明できる。
- Private Endpoint では、PaaS サービスに VNet 内のプライベート IP で到達するため、FQDN をそのプライベート IP に解決する DNS 設計が必要になると説明できる。
- 単一 VNet、Hub & Spoke、オンプレミス接続を含む構成で、Private Endpoint への名前解決の流れを概要レベルで追える。

## 本回で扱う範囲

- 第3回から第6回で登場したネットワーク要素の振り返り
- Azure Virtual Network とサブネット
- IP アドレス空間とアドレス重複の注意点
- Network Security Group と既定ルールの考え方
- Route Table、システムルート、User Defined Route の概要
- VNet peering と Hub & Spoke 構成
- Azure Well-Architected Framework と Azure Landing Zone におけるネットワーク設計の位置づけ
- AWS の VPC、サブネット、Security Group、PrivateLink と比較したときの注意点
- Private Endpoint と Private DNS Zone
- Private Endpoint の DNS 構成シナリオ
- DNS Private Resolver を使ったオンプレミス連携の概要

## 本回で扱わない範囲

- Azure Portal でのネットワークリソース作成手順
- ExpressRoute、VPN Gateway、Virtual WAN の詳細設計
- Azure Firewall、Application Gateway、Web Application Firewall の詳細設定
- Network Virtual Appliance の製品比較や高可用性設計
- DNS サーバー製品の構築、運用、ゾーン管理の詳細
- BGP、ルート伝播、強制トンネリングの詳細
- Private Endpoint の全サービス別設定値の網羅
- 本番移行プロジェクトにおける詳細なネットワークアセスメント
- IaC によるネットワーク構築

## セクション構成と時間配分

| 時間 | セクション | 狙い |
| --- | --- | --- |
| 0-5分 | 過去回との接続 | 第3回から第6回で見たネットワーク要素を思い出す |
| 5-14分 | VNet、サブネット、NSG、Route Table | Azure ネットワークの基本部品を整理する |
| 14-21分 | Azure と AWS の違い | AWS 経験者も未経験者も混乱しやすい差分を押さえる |
| 21-31分 | WAF、Landing Zone、Hub & Spoke | ネットワーク設計がなぜ標準化されるのかを理解する |
| 31-47分 | Private Endpoint と DNS | 3つのシナリオで名前解決と通信経路を追う |
| 47-50分 | 振り返り | 重要な判断軸を言語化する |
| 50-60分 | QA | 質疑応答 |

## 解説スライド案

想定スライド数は35枚です。座学中心の回として25枚から35枚程度に収めます。

| No. | タイトル | リード文 | 主な内容 | 図表/メディア |
| --- | --- | --- | --- | --- |
| 1 | Azure のネットワークの仕組み | この回では、Azure 上のリソースがどのようにつながり、どこで制御されるのかを整理します。 | 表紙、講座名、回数、タイトル | なし |
| 2 | 今日のゴール | 今日はネットワークを作るのではなく、通信経路と名前解決を追えるようになることを目指します。 | 到達目標、扱う範囲、座学のみであること | L07-D01 |
| 3 | 過去回で触れたネットワーク | これまでのハンズオンでも、通信の入口、分離、許可、名前解決が少しずつ登場していました。 | VM、Public IP、NSG、VNet、サブネット、PostgreSQL、Container Apps | L07-D02 |
| 4 | ネットワークは地図として見る | Azure ネットワークは、リソースの一覧ではなく、誰がどこへ、どの名前で、どの経路を通るかの地図です。 | 通信元、通信先、名前解決、経路、制御点 | L07-D03 |
| 5 | VNet はプライベートネットワークの基本 | VNet は Azure 上でプライベートなアドレス空間を持つネットワークの基本単位です。 | VNet、アドレス空間、リージョン、分離 | L07-D04 |
| 6 | サブネットは役割を分ける単位 | サブネットは、同じ VNet の中で役割や制御を分けるための単位です。 | Web/AP/DB、管理用、Private Endpoint 用、委任サブネット | L07-D05 |
| 7 | IP アドレスは後から効いてくる | アドレス空間の重複は、VNet 接続やオンプレミス接続を考える段階で大きな制約になります。 | CIDR、重複禁止、将来拡張、オンプレミスとの整合 | L07-T01 |
| 8 | NSG は通信を許可・拒否する | NSG は、サブネットまたは NIC に対して、受信と送信の通信を制御します。 | 送信元、宛先、ポート、プロトコル、優先順位、Allow/Deny | L07-D06 |
| 9 | NSG はステートフルに動く | NSG は新しい通信に対してルールを評価し、戻り通信は別途開けなくても扱えます。 | 既定ルール、優先順位、ステートフル、変更の影響 | L07-T02 |
| 10 | Route Table は行き先を決める | Route Table は、通信をどの次ホップへ向けるかを変えるための仕組みです。 | システムルート、UDR、0.0.0.0/0、NVA、Gateway | L07-D07 |
| 11 | NSG と Route Table は役割が違う | NSG は通すかどうか、Route Table はどこへ向けるかを決めます。 | フィルタリングとルーティングの違い、よくある混同 | L07-T03 |
| 12 | VNet peering は VNet 同士をつなぐ | Peering により、別の VNet のリソースと Microsoft バックボーン上で通信できます。 | ピアリング、非推移性、NSG、アドレス重複不可 | L07-D08 |
| 13 | AWS 経験者が混乱しやすい違い | Azure と AWS は似た概念を持ちますが、サブネット、セキュリティ制御、プライベート接続の粒度が異なります。 | VPC/VNet、AZ とサブネット、SG/NSG、PrivateLink/Private Endpoint | L07-T04 |
| 14 | WAF で見るネットワーク | ネットワーク設計は、信頼性、セキュリティ、コスト、運用、性能のすべてに影響します。 | Azure Well-Architected Framework の柱とネットワーク観点 | L07-D09 |
| 15 | Landing Zone とネットワーク | Landing Zone では、各ワークロードが勝手にネットワークを作るのではなく、接続と分離を設計します。 | 接続サブスクリプション、Corp/Online、共有基盤 | L07-D10 |
| 16 | Hub & Spoke の目的 | Hub & Spoke は、共有するネットワーク機能とワークロードを分けて管理するための代表的な構成です。 | Hub、Spoke、共有サービス、オンプレミス接続 | L07-D11 |
| 17 | Hub が担当するもの | Hub には、組織で共通に使う接続、検査、名前解決、管理の機能を集めます。 | VPN/ExpressRoute、Firewall、DNS、Bastion、監視 | L07-D12 |
| 18 | Spoke が担当するもの | Spoke には、アプリケーションや環境ごとのワークロードを分けて配置します。 | 本番/検証、業務ごとの分離、サブスクリプション分離 | L07-D13 |
| 19 | Virtual WAN は存在を知る | 大規模・広域のネットワークでは Virtual WAN も選択肢になりますが、本回では Hub & Spoke の理解を優先します。 | Virtual WAN の位置づけ、深掘りしない理由 | L07-T05 |
| 20 | Private Endpoint が必要になる理由 | PaaS サービスへパブリック経路ではなく、VNet 内のプライベート IP でアクセスしたい場面があります。 | PaaS、プライベート接続、公開範囲の縮小 | L07-D14 |
| 21 | Private Endpoint の構成要素 | Private Endpoint は、宛先サービスに対応するプライベート IP を VNet 内に作る考え方です。 | Private Endpoint、NIC、Private Link resource、target subresource | L07-D15 |
| 22 | プライベート IP だけでは足りない | アプリは通常 FQDN で接続するため、FQDN が Private Endpoint の IP に解決される必要があります。 | FQDN、CNAME、A レコード、接続 URL を変えない考え方 | L07-D16 |
| 23 | Private DNS Zone の役割 | Private DNS Zone は、VNet 内の名前解決をプライベート IP に向けるための要素です。 | Private DNS Zone、VNet link、A レコード、ゾーン名 | L07-D17 |
| 24 | サービスごとにゾーン名が違う | Private Endpoint の DNS ゾーン名はサービスごとに異なるため、暗記ではなく参照する前提で扱います。 | PostgreSQL、ACR、Container Apps、Storage、Key Vault の例 | L07-T06 |
| 25 | シナリオ1: 単一 VNet | 単一 VNet では、Private DNS Zone を対象 VNet にリンクする構成が基本です。 | クライアント、Private DNS Zone、Private Endpoint、Azure DNS | L07-D18 |
| 26 | 単一 VNet の名前解決シーケンス | クライアントは FQDN を問い合わせ、Private DNS Zone の A レコードからプライベート IP を得ます。 | 1から6の処理順序、168.63.129.16 の位置づけ | L07-D19 |
| 27 | シナリオ2: Hub & Spoke | Hub & Spoke では、名前解決が必要な VNet へ Private DNS Zone をどうリンクするかが重要です。 | Hub、Spoke、Private DNS Zone、VNet link、共有 Private Endpoint | L07-D20 |
| 28 | Hub & Spoke の名前解決シーケンス | Spoke から Private Endpoint を使う場合、通信経路だけでなく DNS の参照先もそろえる必要があります。 | Spoke クライアント、DNS、Private Endpoint、Peering | L07-D21 |
| 29 | シナリオ3: オンプレミス接続 | オンプレミスから Private Endpoint を使う場合は、DNS クエリを Azure 側へ届ける仕組みが必要です。 | オンプレミス DNS、条件付きフォワーダー、DNS Private Resolver | L07-D22 |
| 30 | オンプレミスの名前解決シーケンス | オンプレミスの DNS は条件付き転送で Azure 側へ問い合わせ、Private DNS Zone の結果を返します。 | Resolver inbound endpoint、Private DNS Zone、戻り応答 | L07-D23 |
| 31 | DNS でよくある失敗 | Private Endpoint の失敗は、通信経路ではなく名前解決のずれとして現れることがよくあります。 | ゾーン未リンク、複数ゾーン、FQDN 間違い、パブリック解決 | L07-T07 |
| 32 | つながらないときの見る順番 | ネットワーク障害は、名前、経路、許可、宛先状態の順に切り分けると追いやすくなります。 | DNS、Route、NSG、Private Endpoint 接続状態、サービス側設定 | L07-D24 |
| 33 | Todo アプリをネットワークで見直す | 第5回から第6回の Todo アプリも、Web/API/DB の通信と名前解決として読み直せます。 | Container Apps、PostgreSQL、ACR、Entra ID、外部アクセス | L07-D25 |
| 34 | 今日のまとめ | Azure ネットワークでは、どこに置くか、どう通すか、何という名前で解決するかをセットで考えます。 | 3つのまとめ、次回への接続 | L07-D26 |
| 35 | 確認クイズ | 自分の言葉で、VNet、Hub & Spoke、Private Endpoint と DNS の関係を確認します。 | クイズ、QA への導入 | なし |

## 図表・スクリーンショット素材一覧

本回は座学回のため、スライド本文で必須となる Azure Portal 操作スクリーンショットはありません。
ネットワーク構成と DNS シーケンスの理解を重視するため、`L07-Dxx` は AI または draw.io で作成する図表、`L07-Txx` は表として管理します。
Azure Portal の画面例は任意の参考画像として `L07-SSxx` を割り当てます。

| 素材ID | 種別 | HTML版での扱い | 提供/作成者 | 備考 |
| --- | --- | --- | --- | --- |
| L07-D01 | 図表 | 必須 | AI で作成 | 今日のゴール。通信経路、制御、名前解決の3要素 |
| L07-D02 | 図表 | 必須 | AI/draw.io で作成 | 第3回から第6回で登場したネットワーク要素 |
| L07-D03 | 図表 | 必須 | AI で作成 | ネットワークを地図として読む見方 |
| L07-D04 | 図表 | 必須 | AI/draw.io で作成 | VNet とアドレス空間 |
| L07-D05 | 図表 | 必須 | AI/draw.io で作成 | VNet 内の複数サブネットと役割 |
| L07-D06 | 図表 | 必須 | AI/draw.io で作成 | NSG の適用位置とルール評価 |
| L07-D07 | 図表 | 必須 | AI/draw.io で作成 | Route Table と次ホップ |
| L07-D08 | 図表 | 必須 | AI/draw.io で作成 | VNet peering と非推移性 |
| L07-D09 | 図表 | 必須 | AI で作成 | WAF の柱とネットワーク設計の関係 |
| L07-D10 | 図表 | 必須 | AI/draw.io で作成 | Landing Zone におけるネットワーク設計領域 |
| L07-D11 | 図表 | 必須 | AI/draw.io で作成 | Hub & Spoke 全体構成 |
| L07-D12 | 図表 | 必須 | AI/draw.io で作成 | Hub に集約する共有ネットワーク機能 |
| L07-D13 | 図表 | 必須 | AI/draw.io で作成 | Spoke に配置するワークロード |
| L07-D14 | 図表 | 必須 | AI/draw.io で作成 | Public endpoint と Private Endpoint の違い |
| L07-D15 | 図表 | 必須 | AI/draw.io で作成 | Private Endpoint の構成要素 |
| L07-D16 | 図表 | 必須 | AI/draw.io で作成 | FQDN と Private Endpoint IP の関係 |
| L07-D17 | 図表 | 必須 | AI/draw.io で作成 | Private DNS Zone、VNet link、A レコード |
| L07-D18 | 図表 | 必須 | AI/draw.io で作成 | 単一 VNet の Private Endpoint DNS 構成 |
| L07-D19 | 図表 | 必須 | AI/draw.io で作成 | 単一 VNet の名前解決シーケンス |
| L07-D20 | 図表 | 必須 | AI/draw.io で作成 | Hub & Spoke の Private Endpoint DNS 構成 |
| L07-D21 | 図表 | 必須 | AI/draw.io で作成 | Hub & Spoke の名前解決シーケンス |
| L07-D22 | 図表 | 必須 | AI/draw.io で作成 | オンプレミス接続を含む DNS 構成 |
| L07-D23 | 図表 | 必須 | AI/draw.io で作成 | オンプレミスから Private Endpoint への名前解決シーケンス |
| L07-D24 | 図表 | 必須 | AI で作成 | ネットワーク切り分け順序 |
| L07-D25 | 図表 | 任意 | AI/draw.io で作成 | Todo アプリのネットワーク振り返り |
| L07-D26 | 図表 | 必須 | AI で作成 | 今日のまとめ |
| L07-T01 | 表 | 必須 | AI で作成 | IP アドレス設計の注意点 |
| L07-T02 | 表 | 必須 | AI で作成 | NSG の基本ルールと確認観点 |
| L07-T03 | 表 | 必須 | AI で作成 | NSG と Route Table の違い |
| L07-T04 | 表 | 必須 | AI で作成 | Azure と AWS のネットワーク比較 |
| L07-T05 | 表 | 任意 | AI で作成 | Hub & Spoke と Virtual WAN の使い分け入口 |
| L07-T06 | 表 | 必須 | AI で作成 | Private Endpoint の代表的な DNS ゾーン名 |
| L07-T07 | 表 | 必須 | AI で作成 | DNS でよくある失敗と確認箇所 |
| L07-SS01 | スクリーンショット | 任意 | 筆者が提供 | Azure Portal の Virtual networks 一覧 |
| L07-SS02 | スクリーンショット | 任意 | 筆者が提供 | VNet Overview とサブネット一覧 |
| L07-SS03 | スクリーンショット | 任意 | 筆者が提供 | Network Security Group のルール画面 |
| L07-SS04 | スクリーンショット | 任意 | 筆者が提供 | Route table の Routes 画面 |
| L07-SS05 | スクリーンショット | 任意 | 筆者が提供 | Private Endpoint Overview |
| L07-SS06 | スクリーンショット | 任意 | 筆者が提供 | Private DNS Zone の record sets と virtual network links |

## 図表案

### L07-D01 今日のゴール

目的: 本回で理解する3つの軸を示す。

構成:

- 軸1: どこに置くか。VNet、サブネット、Hub & Spoke。
- 軸2: どう通すか。NSG、Route Table、Peering。
- 軸3: 何という名前で到達するか。Private Endpoint、Private DNS Zone、DNS Private Resolver。
- 「作業手順ではなく、通信の読み方を学ぶ」と明記する。

### L07-D02 第3回から第6回で登場したネットワーク要素

目的: 過去回のハンズオンと本回を接続する。

構成:

- 第3回: VM、Public IP、NSG、VNet、サブネット。
- 第4回: ACI の公開エンドポイントとコンテナイメージ取得。
- 第5回: VNet、サブネット、ACR、Container Apps Environment、PostgreSQL。
- 第6回: Web/API/DB、GitHub Actions、外部アクセス、認証リダイレクト。
- 「すべてネットワークの入口、経路、名前に関係する」とまとめる。

### L07-D03 ネットワークを地図として読む見方

目的: リソース名ではなく通信の問いでネットワークを見る姿勢を作る。

構成:

- 通信元はどこか。
- 通信先はどこか。
- どの名前を引いているか。
- どの経路を通るか。
- どこで許可または拒否されるか。

### L07-D04 VNet とアドレス空間

目的: VNet がプライベートネットワークの基本単位であることを説明する。

構成:

- Azure リージョン内の VNet 枠。
- VNet アドレス空間例: `10.10.0.0/16`。
- VNet 内のリソースはプライベート IP を持つ。
- インターネットやオンプレミスとは、別の接続要素を通じてつながる。

### L07-D05 VNet 内のサブネットと役割

目的: サブネットが単なる分割ではなく、制御と配置の境界になることを示す。

構成:

- Web サブネット、API サブネット、DB 関連サブネット、Private Endpoint サブネット。
- NSG や Route Table をサブネット単位で関連付ける例。
- DNS Private Resolver のように専用/委任サブネットが必要なサービスがあることを注記。

### L07-D06 NSG の適用位置とルール評価

目的: NSG が通信を許可または拒否する場所を示す。

構成:

- サブネットと NIC に関連付けられる NSG。
- 受信ルールと送信ルール。
- 優先順位の小さいルールから評価。
- 最初に一致したルールで決まる。
- 既定ルールがあることをラベルで示す。

### L07-D07 Route Table と次ホップ

目的: ルートが通信の向き先を決めることを示す。

構成:

- サブネットから出る通信。
- 宛先 IP に対して最長プレフィックス一致でルートを選ぶ。
- 次ホップ例: Virtual network、Internet、Virtual appliance、Virtual network gateway、None。
- UDR で既定ルートを上書きできることを示す。

### L07-D08 VNet peering と非推移性

目的: VNet peering は便利だが、すべてが自動的につながるわけではないことを説明する。

構成:

- VNet A と VNet B の peering。
- VNet B と VNet C の peering。
- A から C へは既定では推移的につながらないことを示す。
- Hub 経由で通信させる場合はルーティング設計が必要と注記。

### L07-D09 WAF の柱とネットワーク設計

目的: ネットワーク設計が品質属性に影響することを示す。

構成:

- 信頼性: 冗長経路、リージョン、依存先。
- セキュリティ: 境界、最小公開、Private Endpoint。
- コスト: Firewall、Private Endpoint、データ転送料。
- 運用: 監視、ログ、標準化。
- 性能: 経路、待機時間、名前解決。

### L07-D10 Landing Zone のネットワーク設計領域

目的: 組織で Azure を使うときに、ネットワークが共通基盤になることを示す。

構成:

- 接続/Connectivity 領域。
- 接続サブスクリプション。
- Corp と Online の管理グループの考え方。
- ワークロード用サブスクリプション。
- 本講座では概念の入口に留める注記。

### L07-D11 Hub & Spoke 全体構成

目的: Hub & Spoke の基本形を示す。

構成:

- 中央に Hub VNet。
- 周囲に複数の Spoke VNet。
- Hub に共有サービス、オンプレミス接続、DNS、Firewall。
- Spoke に業務アプリ、環境、チームごとのワークロード。
- Peering は Hub と各 Spoke の間に表示。

### L07-D12 Hub に集約する共有機能

目的: Hub が単なる中継点ではなく、共通機能の配置場所であることを示す。

構成:

- VPN Gateway または ExpressRoute Gateway。
- Azure Firewall または NVA。
- DNS Private Resolver または DNS フォワーダー。
- Azure Bastion。
- 監視ログの集約先。

### L07-D13 Spoke に配置するワークロード

目的: Spoke が分離と所有の単位になることを示す。

構成:

- 本番 Spoke、検証 Spoke、部門別 Spoke。
- 各 Spoke に Web/API/DB などのワークロード。
- Spoke 同士の直接接続は必要性を判断して設計することを注記。

### L07-D14 Public endpoint と Private Endpoint の違い

目的: Private Endpoint が何を変えるのかを直感的に示す。

構成:

- 左: クライアントから PaaS の public endpoint へ到達する図。
- 右: VNet 内の Private Endpoint IP へ到達し、そこから対象 PaaS インスタンスに接続する図。
- Public network access の制御はサービス側設定も関係することを注記。

### L07-D15 Private Endpoint の構成要素

目的: Private Endpoint が NIC、プライベート IP、対象サービスの関連付けとして理解できるようにする。

構成:

- VNet とサブネット。
- Private Endpoint の NIC。
- 割り当てられるプライベート IP。
- 接続先の Private Link resource。
- Target subresource。
- Connection state。

### L07-D16 FQDN と Private Endpoint IP の関係

目的: Private Endpoint では DNS が重要になる理由を示す。

構成:

- アプリケーションは `server.postgres.database.azure.com` のような FQDN に接続する。
- Public DNS では public endpoint 側へ解決される。
- Private DNS Zone では Private Endpoint の private IP に解決される。
- 接続文字列の FQDN を変えないで済む利点を示す。

### L07-D17 Private DNS Zone、VNet link、A レコード

目的: 名前解決に必要な Azure リソースの関係を示す。

構成:

- Private DNS Zone。
- A レコード。
- VNet link。
- Private Endpoint DNS zone group。
- クライアント VNet がリンクされているかどうかで結果が変わることを示す。

### L07-D18 単一 VNet の Private Endpoint DNS 構成

目的: 一番単純な構成を示し、後続シナリオの基準にする。

構成:

- 1つの VNet。
- クライアント VM またはアプリ。
- Private Endpoint。
- Private DNS Zone が同じ VNet にリンクされている。
- Azure 提供 DNS が名前解決する。

### L07-D19 単一 VNet の名前解決シーケンス

目的: 単一 VNet での名前解決と通信の順序を説明する。

構成:

1. クライアントがサービス FQDN を問い合わせる。
2. Azure 提供 DNS が VNet にリンクされた Private DNS Zone を参照する。
3. Private DNS Zone の A レコードが Private Endpoint IP を返す。
4. クライアントが Private Endpoint IP へ通信する。
5. Private Endpoint から対象 PaaS インスタンスへ接続される。
6. サービス側の認証やファイアウォール設定も評価される。

### L07-D20 Hub & Spoke の Private Endpoint DNS 構成

目的: VNet が複数ある場合に、DNS Zone link の設計が重要になることを示す。

構成:

- Hub VNet。
- Spoke A と Spoke B。
- Private DNS Zone は共有管理領域に配置。
- Private Endpoint は Hub または対象 Spoke に配置するパターンを注記。
- 名前解決が必要な VNet へ Private DNS Zone をリンクする。

### L07-D21 Hub & Spoke の名前解決シーケンス

目的: Spoke から Private Endpoint に到達する場合の順序を説明する。

構成:

1. Spoke のアプリが FQDN を問い合わせる。
2. Spoke が Azure 提供 DNS またはカスタム DNS を使う。
3. Private DNS Zone への VNet link により private IP が返る。
4. 通信は Peering とルートに従って Private Endpoint IP へ向かう。
5. NSG とサービス側設定が通信を許可する必要がある。

### L07-D22 オンプレミス接続を含む DNS 構成

目的: オンプレミスから Private Endpoint を利用するには DNS クエリを Azure 側へ届ける必要があることを示す。

構成:

- オンプレミスネットワークとオンプレミス DNS。
- VPN または ExpressRoute の存在を抽象的に示す。
- Hub VNet に DNS Private Resolver inbound endpoint。
- Private DNS Zone。
- Private Endpoint。
- 条件付きフォワーダーを使うことを示す。

### L07-D23 オンプレミスから Private Endpoint への名前解決シーケンス

目的: ハイブリッド構成での名前解決の順序を説明する。

構成:

1. オンプレミスのクライアントが Azure サービス FQDN を問い合わせる。
2. オンプレミス DNS が条件付きフォワーダーで Azure 側へ転送する。
3. DNS Private Resolver inbound endpoint が問い合わせを受ける。
4. Azure 側で Private DNS Zone を参照する。
5. Private Endpoint の private IP を返す。
6. オンプレミスから Azure への通信経路を通って Private Endpoint IP に到達する。

### L07-D24 ネットワーク切り分け順序

目的: つながらないときに、どこから確認するかを示す。

構成:

1. FQDN が期待した IP に解決されるか。
2. その IP へのルートが期待どおりか。
3. NSG や Firewall が拒否していないか。
4. Private Endpoint の connection state が承認済みか。
5. 宛先サービス側の公開設定、認証、ファイアウォールが合っているか。

### L07-D25 Todo アプリのネットワーク振り返り

目的: 第5回から第6回の実体験をネットワークの見方に接続する。

構成:

- 利用者から Web Container App へのアクセス。
- Web から API へのアクセス。
- API から PostgreSQL へのアクセス。
- ACR から Container Apps へのイメージ取得。
- Entra ID リダイレクト URI。
- 第7回では詳細な修正作業はしない。

### L07-D26 今日のまとめ

目的: 受講者が持ち帰る3つの判断軸を固定する。

構成:

- 配置: VNet、サブネット、Hub & Spoke。
- 制御: NSG、Route Table、Peering。
- 名前解決: Private DNS Zone、DNS Private Resolver。
- 次回はネットワーク以外の周辺サービスへ視野を広げる。

## スクリーンショット取得指示

本回は座学のみのため、スクリーンショットは必須ではありません。
HTML 詳細版で参考画像を入れる場合のみ、以下を取得します。

| スクリーンショットID | 対象画面 | 用途 | 取得時の注意 | マスク対象 |
| --- | --- | --- | --- | --- |
| L07-SS01 | Azure Portal の Virtual networks 一覧 | VNet がネットワークの基本単位であることを示す参考画像 | 講座用または検証用の安全なリソースだけを表示する | サブスクリプション ID、テナント ID、ユーザー名、メールアドレス、リソース ID |
| L07-SS02 | VNet Overview と Subnets | VNet とサブネットの関係を示す参考画像 | アドレス空間はサンプル値にする。実環境の IP 計画を写さない | サブスクリプション ID、リソース ID、実環境のアドレス範囲 |
| L07-SS03 | Network Security Group の Inbound security rules | NSG ルールの構造を示す参考画像 | 実運用の許可 IP や管理用ポートを写さない | 実 IP アドレス、組織名、サブスクリプション ID、リソース ID |
| L07-SS04 | Route table の Routes | Route Table と UDR の参考画像 | 実環境の経路やオンプレミス IP を写さない | 実 IP アドレス、オンプレミス範囲、サブスクリプション ID |
| L07-SS05 | Private Endpoint Overview | Private Endpoint の接続状態を示す参考画像 | Private Link resource の実リソース ID を写さない | リソース ID、サブスクリプション ID、接続先リソース名 |
| L07-SS06 | Private DNS Zone の Record sets と Virtual network links | Private DNS Zone と VNet link の参考画像 | 実サービス名や内部ドメイン名を避け、講座用サンプルに限定する | 実ドメイン名、リソース ID、サブスクリプション ID、内部ネットワーク名 |

## ハンズオン手順案

本回ではハンズオンは行いません。
受講者操作ではなく、講師の図解に沿って通信経路と名前解決シーケンスを追います。

HTML 詳細版では、受講者向けの理解確認チェックリストとして次を用意します。

| チェック項目 | 対応する内容 | 完了条件 |
| --- | --- | --- |
| VNet、サブネット、NSG、Route Table の役割を1文で説明できる | スライド5から11 | それぞれの役割を「配置」「許可/拒否」「経路」の言葉で説明できる |
| Hub & Spoke で Hub と Spoke の役割を分ける理由を説明できる | スライド16から18 | Hub は共有機能、Spoke はワークロード分離と説明できる |
| Private Endpoint で DNS が必要になる理由を説明できる | スライド20から24 | FQDN が private IP に解決される必要があると説明できる |
| 単一 VNet と Hub & Spoke の名前解決の違いを説明できる | スライド25から28 | Private DNS Zone の VNet link が重要と説明できる |
| オンプレミスから Private Endpoint を使う場合の DNS 転送先を説明できる | スライド29から30 | 条件付きフォワーダーと DNS Private Resolver の役割を説明できる |

## よくある理解のつまずき

### VNet をオンプレミスの物理 LAN と同じものだと思ってしまう

説明方針:
VNet は Azure 上のソフトウェア定義ネットワークであり、物理スイッチやラックそのものではないと説明する。
ただし、プライベート IP、サブネット、ルーティングといった考え方はオンプレミスの知識を活かせる。

### サブネットは IP 範囲を分けるだけだと思ってしまう

説明方針:
サブネットは IP 範囲の分割であると同時に、NSG、Route Table、サービス委任、Private Endpoint 配置などの制御単位にもなると説明する。

### NSG と Firewall と Route Table を混同する

説明方針:
NSG は「通すか止めるか」、Route Table は「どこへ向けるか」、Firewall は「より高度に検査・制御する中継点」と分けて説明する。
本回では Firewall の詳細設定には入らない。

### VNet peering すればすべての VNet が自動的につながると思ってしまう

説明方針:
VNet peering は2つの VNet 間の関係であり、既定では推移的ではないと説明する。
Hub & Spoke で Spoke 間通信を許可するかどうかは、ルーティング、Firewall、運用ポリシーを含めて設計する。

### Private Endpoint を作れば DNS は自動でどこからでも解決されると思ってしまう

説明方針:
Private Endpoint の private IP が作成されても、クライアントが使う FQDN がその IP に解決されなければ意図した経路にならないと説明する。
Private DNS Zone と VNet link、オンプレミスの場合は DNS 転送の設計が必要であることを強調する。

### DNS とアクセス制御を同じものとして理解してしまう

説明方針:
DNS は名前を IP に変換する仕組みであり、アクセス許可そのものではないと説明する。
名前解決が private IP を返しても、NSG、Route Table、Private Endpoint の接続状態、サービス側の認証やファイアウォール設定が合っていなければ接続できない。

### AWS の知識をそのまま当てはめてしまう

説明方針:
AWS の VPC、Subnet、Security Group、PrivateLink と似た名前や役割はあるが、Azure ではサブネットが Availability Zone に固定されないこと、NSG の関連付け単位、Private Endpoint と Private DNS Zone の設計を分けて見る必要があることを説明する。
AWS 未経験者には比較表を補足として扱い、Azure 側の考え方を主軸にする。

## 講師が見る確認ポイント

講義中またはQAで、受講者が次を説明できるか確認します。

- VNet、サブネット、NSG、Route Table の役割を、それぞれ短く説明できるか。
- NSG と Route Table の違いを「許可/拒否」と「経路」で説明できるか。
- VNet peering が既定では推移的な接続ではないことを理解しているか。
- Hub & Spoke 構成で、Hub に共有ネットワーク機能を集める理由を説明できるか。
- Private Endpoint と Private DNS Zone がセットで重要になる理由を説明できるか。
- 単一 VNet、Hub & Spoke、オンプレミス接続の3シナリオで、DNS クエリがどこへ向かうかを大まかに追えるか。
- DNS が解決できることと、アプリケーションが接続できることは別の確認であると理解しているか。

## 復旧できない場合のスキップ手順

本回は座学のみのため、Azure 操作の復旧手順はありません。
理解が追いつかない受講者が多い場合は、次の順序に絞って進行します。

1. VNet は Azure のプライベートネットワーク、サブネットは役割と制御を分ける単位。
2. NSG は通信を許可または拒否する。Route Table は通信の向き先を変える。
3. Hub & Spoke は、共有ネットワーク機能とワークロードを分けるための代表的な構成。
4. Private Endpoint は PaaS サービスへのプライベート IP を作る。
5. Private Endpoint を使うには、FQDN が private IP に解決される DNS 設計が必要。

時間が足りない場合は、AWS 比較、Virtual WAN、オンプレミス DNS の詳細シーケンスを参考扱いに切り替えます。

## クリーンアップ手順

本回では Azure リソースを作成しないため、受講者によるクリーンアップはありません。

講師がデモ環境を用意する場合は、講座後に次を確認します。

- デモ用の VNet、Private Endpoint、Private DNS Zone、DNS Private Resolver を作成した場合は、不要なものを削除する。
- Azure Firewall、VPN Gateway、DNS Private Resolver、Private Endpoint は課金が発生しやすいため、デモで作成したままにしない。
- 第5回から第6回の Todo アプリ環境を残している場合は、PostgreSQL が停止済みか、講師指示どおり削除済みかを確認する。
- 参考スクリーンショットにサブスクリプション ID、テナント ID、リソース ID、内部 IP 計画が含まれていないか確認する。

## 振り返り

最後に受講者へ次の問いを投げかけます。

1. NSG と Route Table の違いを一言で説明すると何か。
2. Hub & Spoke 構成で Hub に集めるもの、Spoke に置くものは何か。
3. Private Endpoint を作ったあと、なぜ Private DNS Zone の確認が必要になるのか。
4. オンプレミスから Azure の Private Endpoint にアクセスする場合、DNS クエリはどこへ転送される必要があるか。
5. 第5回から第6回で作った Todo アプリを、ネットワークの観点で見るとどの通信が重要だったか。

## 確認クイズ案

### 問1

Azure Virtual Network の説明としてもっとも近いものはどれですか。

- A. Azure 上のプライベートネットワークの基本単位
- B. Azure Portal の利用者グループ
- C. Azure サブスクリプションの課金単位

正解: A

### 問2

NSG と Route Table の説明として正しいものはどれですか。

- A. NSG は通信の向き先を決め、Route Table はユーザー認証を行う
- B. NSG は通信を許可または拒否し、Route Table は通信の次ホップを決める
- C. NSG と Route Table は同じ役割を持つため、どちらか一方だけあればよい

正解: B

### 問3

VNet peering の説明として正しいものはどれですか。

- A. 2つの VNet を接続し、既定ですべての接続が推移的になる
- B. 2つの VNet を接続するが、別の VNet への推移的接続は既定では提供されない
- C. VNet peering はインターネット経由で通信するための設定である

正解: B

### 問4

Private Endpoint を利用するときに Private DNS Zone が重要になる理由として正しいものはどれですか。

- A. FQDN を Private Endpoint の private IP に解決するため
- B. サブスクリプションの課金を止めるため
- C. NSG ルールを自動的に削除するため

正解: A

### 問5

オンプレミスから Azure の Private Endpoint にアクセスする場合、DNS 設計で必要になりやすいものはどれですか。

- A. オンプレミス DNS から Azure 側への条件付き転送
- B. すべてのクライアントに public IP を割り当てること
- C. VNet を削除してから再作成すること

正解: A

## 講師向け補足

- 本回はネットワーク専門家向けの詳細設計講座ではなく、Azure 初心者が今後の設計会話についていくための地図を作る回である。
- Private Endpoint と DNS は必ず図とシーケンスで説明する。文章だけで説明すると「作ったのに接続できない」理由が伝わりにくい。
- `ref/CAFbc17_AzureNetworking_hiyam_NoSound.pdf` は内部参考資料として存在するが、公開教材へ図や文言を転載する場合は再利用可否と引用範囲を確認する。公開版では原則として Microsoft Learn へのリンクと、AI/draw.io で作成した独自図を利用する。
- AWS 経験者向け比較は有効だが、AWS 未経験者が置いていかれないよう、Azure の概念を説明したあとに補足として扱う。
- DNS Private Resolver は概念紹介に留める。実際の構築、専用サブネット、Inbound/Outbound endpoint、ルールセットの詳細は本回の範囲外とする。
- Hub & Spoke は推奨パターンとして紹介するが、すべての学習環境や小規模構成で必須という説明にはしない。
- 2026年5月13日時点で、参考資料の Microsoft Learn ページを確認済み。公開前レビュー時に URL と記載内容を再確認する。

## 参考資料

- [Microsoft Learn: Azure Virtual Network とは](https://learn.microsoft.com/ja-jp/azure/virtual-network/virtual-networks-overview)
- [Microsoft Learn: Azure ネットワーク セキュリティ グループの概要](https://learn.microsoft.com/ja-jp/azure/virtual-network/network-security-groups-overview)
- [Microsoft Learn: Azure 仮想ネットワーク トラフィックのルーティング](https://learn.microsoft.com/ja-jp/azure/virtual-network/virtual-networks-udr-overview)
- [Microsoft Learn: Azure 仮想ネットワーク ピアリング](https://learn.microsoft.com/ja-jp/azure/virtual-network/virtual-network-peering-overview)
- [Microsoft Learn: Azure のハブスポーク ネットワーク トポロジ](https://learn.microsoft.com/ja-jp/azure/cloud-adoption-framework/ready/azure-best-practices/hub-spoke-network-topology)
- [Microsoft Learn: ネットワーク トポロジと接続](https://learn.microsoft.com/ja-jp/azure/cloud-adoption-framework/ready/landing-zone/design-area/network-topology-and-connectivity)
- [Microsoft Learn: Azure Well-Architected Framework](https://learn.microsoft.com/ja-jp/azure/well-architected/)
- [Microsoft Learn: プライベート エンドポイントとは](https://learn.microsoft.com/ja-jp/azure/private-link/private-endpoint-overview)
- [Microsoft Learn: Azure プライベート エンドポイントのプライベート DNS ゾーン値](https://learn.microsoft.com/ja-jp/azure/private-link/private-endpoint-dns)
- [Microsoft Learn: Azure プライベート エンドポイント DNS 統合シナリオ](https://learn.microsoft.com/ja-jp/azure/private-link/private-endpoint-dns-integration)
- [Microsoft Learn: Azure DNS Private Resolver とは](https://learn.microsoft.com/ja-jp/azure/dns/dns-private-resolver-overview)

参考資料は教材本文の主軸にはせず、受講者が復習するときの入口として提示します。