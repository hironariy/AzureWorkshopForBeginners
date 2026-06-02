# Lesson 4 講師準備: ACR と NGINX カスタムイメージ作成手順

この手順は、第4回の教材スクリーンショット取得とワークショップ当日の講師準備用です。
第4回の受講者ハンズオンでは Dockerfile の作成やイメージのビルドは扱わず、講師が事前に Azure Container Registry に格納した NGINX イメージを Azure Container Instances から利用します。

## ゴール

- 講師共有の Azure Container Registry を作成する。
- Lesson 3 の VM で表示したカスタムトップページに近い見た目の NGINX コンテナイメージを作成する。
- 作成したイメージを ACR の `azbeg/nginx-l04` リポジトリに格納する。
- ACI から pull して HTTP 80 で表示できることを講師が事前確認する。
- スクリーンショットに秘密情報、サブスクリプション ID、テナント ID、ユーザー名、認証情報を残さない。

## 方針

Cloud Shell から `az acr build` を使って ACR 側でコンテナイメージをビルドします。
この方法では講師 PC に Docker Desktop を入れる必要がなく、教材作成環境をそろえやすくなります。

第4回の受講者は Azure Portal から ACI を作成し、Image source で Azure Container Registry を選択します。
Portal の ACI 作成画面では、ACR を選択してイメージを参照するために ACR admin user が有効であることを求められる場合があります。
そのため、本手順では Lesson 4 専用の共有 ACR に限って admin user を有効化します。
また、ACI から資格情報なしでも pull できるよう、匿名 pull も有効化したままにします。
ACR admin user はレジストリ全体に対する資格情報であり、匿名 pull は ACR 内のイメージを認証なしで取得できる設定です。
共有 ACR には教材用の公開してよい静的 NGINX イメージだけを格納し、パスワードやアクセスキーはスクリーンショットや公開資料に残しません。

## 作成するリソース

| 種類 | 名前の例 | 用途 |
| --- | --- | --- |
| Resource group | `rg-azbeg-shared` | 講師共有リソース置き場 |
| Azure Container Registry | `acrazbegshared<接尾辞>` | Lesson 4 の共有イメージ保管先 |
| Repository | `azbeg/nginx-l04` | Lesson 4 の NGINX イメージ |
| Tag | `20260709`、`latest` | 講座日付タグと既定タグ |
| 検証用 Resource group | `rg-azbeg-l04-instructor-test` | ACI 動作確認用。確認後に削除 |
| 検証用 ACI | `aci-azbeg-l04-instructor-test` | NGINX 表示確認用。確認後に削除 |

## 事前確認

- 講座用または検証用の Azure サブスクリプションを使う。
- 講師アカウントに、共有リソースグループと ACR を作成できる権限がある。
- Azure Cloud Shell は Bash を使う。
- ACR 名はグローバルで一意にする必要があるため、短い接尾辞を用意する。
- ACR admin user と匿名 pull を有効化するため、ACR は Lesson 4 専用にし、公開してよい教材用イメージだけを格納する。
- ACR の Access keys 画面、password、secret、token はスクリーンショットに写さない。

## 手順1: Cloud Shell で変数を設定する

Azure Portal で Cloud Shell を Bash として開き、次の変数を設定します。
`ACR_SUFFIX` は講師環境で一意になる短い英小文字・数字に置き換えます。

```bash
LOCATION="japaneast"
SHARED_RESOURCE_GROUP="rg-azbeg-shared"
TEST_RESOURCE_GROUP="rg-azbeg-l04-instructor-test"

ACR_SUFFIX="<一意な接尾辞>"
ACR_NAME="acrazbegshared${ACR_SUFFIX}"

IMAGE_REPOSITORY="azbeg/nginx-l04"
IMAGE_TAG="20260709"

TEST_ACI_NAME="aci-azbeg-l04-instructor-test"
DNS_SUFFIX="<一意なDNS接尾辞>"
DNS_LABEL="aci-azbeg-l04-instructor-test-${DNS_SUFFIX}"
```

設定例です。

```bash
ACR_SUFFIX="a1b2"
DNS_SUFFIX="a1b2"
```

## 手順2: ACR 名が使えることを確認する

```bash
az acr check-name --name "$ACR_NAME" --query "{nameAvailable:nameAvailable, reason:reason, message:message}" -o table
```

`nameAvailable` が `true` であることを確認します。
`false` の場合は `ACR_SUFFIX` を変更し、もう一度確認します。

## 手順3: 共有リソースグループを作成する

```bash
az group create \
  --name "$SHARED_RESOURCE_GROUP" \
  --location "$LOCATION" \
  --tags \
    Course=AzureWorkshopForBeginners \
    Lesson=L04 \
    Environment=WorkshopShared \
    Purpose=ContainerImagePreparation
```

## 手順4: ACR を作成する

Azure Portal の ACI 作成画面から ACR を選択できるようにするため、admin user を有効化して ACR を作成します。
作成後に匿名 pull も有効化します。
この ACR には教材用の公開してよいイメージだけを格納します。

```bash
az acr create \
  --resource-group "$SHARED_RESOURCE_GROUP" \
  --name "$ACR_NAME" \
  --location "$LOCATION" \
  --sku Standard \
  --admin-enabled true \
  --tags \
    Course=AzureWorkshopForBeginners \
    Lesson=L04 \
    Environment=WorkshopShared \
    Purpose=ContainerImagePreparation
```

ACR のログインサーバー名を確認します。

```bash
ACR_LOGIN_SERVER=$(az acr show --name "$ACR_NAME" --query loginServer -o tsv)
echo "$ACR_LOGIN_SERVER"
```

続く手順5で、作成した ACR の admin user と匿名 pull がどちらも有効であることを確認します。

## 手順5: ACR admin user と匿名 pull を有効化する

Azure Portal で受講者が ACI を作成するときに、Image source で Azure Container Registry を選択できるよう、ACR admin user が有効であることを確認します。
また、ACI から資格情報なしでも pull できる状態を維持するため、匿名 pull も有効化します。
作成済み ACR でどちらかが無効の場合は、有効化します。

```bash
az acr update \
  --name "$ACR_NAME" \
  --admin-enabled true \
  --anonymous-pull-enabled true
```

設定を確認します。

```bash
az acr show \
  --name "$ACR_NAME" \
  --query "{loginServer:loginServer, adminUserEnabled:adminUserEnabled, anonymousPullEnabled:anonymousPullEnabled, sku:sku.name}" \
  -o table
```

注意:
ACR admin user はレジストリ全体に対する資格情報です。
匿名 pull は ACR 内のイメージを認証なしで取得できる設定です。
この ACR には、秘密情報、社内限定のアプリケーション、公開できないイメージを入れないでください。
Azure Portal の Access keys 画面や password の値は、スクリーンショットや公開資料に残しません。

## 手順6: ビルド用ディレクトリを作成する

Cloud Shell 上にビルドコンテキストを作ります。

```bash
mkdir -p ~/azbeg-l04-nginx-image
cd ~/azbeg-l04-nginx-image
```

## 手順7: Dockerfile を作成する

Lesson 3 の VM では起動時のスクリプトで Ubuntu に NGINX をインストールしました。
Lesson 4 の講師準備では、その作業を Dockerfile のビルド時に行い、NGINX とトップページをコンテナイメージに含めます。

```bash
cat > Dockerfile <<'DOCKERFILE'
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY index.html /var/www/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
DOCKERFILE
```

## 手順8: カスタムトップページを作成する

Azure Portal や Cloud Shell の入力で文字化けや貼り付けエラーを避けるため、HTML 内の日本語タイトルは Lesson 3 と同じく文字参照で表現します。
ブラウザーでは日本語として表示されます。

```bash
cat > index.html <<'HTML'
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Azure &#x521D;&#x5FC3;&#x8005;&#x8B1B;&#x5EA7;</title>
  <style>
    :root {
      color-scheme: light;
      font-family: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #f4f8fb;
      color: #102033;
    }

    main {
      width: min(920px, calc(100% - 32px));
      padding: 48px;
      border-top: 8px solid #0078d4;
      background: #ffffff;
      box-shadow: 0 18px 45px rgba(16, 32, 51, 0.12);
    }

    .label {
      margin: 0 0 16px;
      color: #0078d4;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.4rem, 7vw, 4.8rem);
      line-height: 1.08;
    }

    p {
      margin: 24px 0 0;
      font-size: 1.2rem;
      line-height: 1.8;
    }

    .status {
      display: inline-block;
      margin-top: 32px;
      padding: 10px 14px;
      border: 1px solid #a8d5ff;
      background: #eef7ff;
      color: #064f8f;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <p class="label">Lesson 4 | ACR + ACI + NGINX</p>
    <h1>Azure &#x521D;&#x5FC3;&#x8005;&#x8B1B;&#x5EA7;</h1>
    <p>This custom top page was packaged into a container image and stored in Azure Container Registry.</p>
    <p class="status">NGINX container on Azure Container Instances is working</p>
  </main>
</body>
</html>
HTML
```

## 手順9: ACR Tasks でイメージをビルドして push する

`az acr build` は、現在のディレクトリにある Dockerfile と `index.html` を ACR 側へ送信し、ビルド結果を同じ ACR に push します。

```bash
az acr build \
  --registry "$ACR_NAME" \
  --image "$IMAGE_REPOSITORY:$IMAGE_TAG" \
  --image "$IMAGE_REPOSITORY:latest" \
  .
```

ビルドが成功すると、次の2つのタグが ACR に作成されます。

- `$ACR_LOGIN_SERVER/azbeg/nginx-l04:$IMAGE_TAG`
- `$ACR_LOGIN_SERVER/azbeg/nginx-l04:latest`

## 手順10: ACR のリポジトリとタグを確認する

```bash
az acr repository list \
  --name "$ACR_NAME" \
  -o table
```

```bash
az acr repository show-tags \
  --name "$ACR_NAME" \
  --repository "$IMAGE_REPOSITORY" \
  -o table
```

受講者へ案内する完全なイメージ名を表示します。

```bash
FULL_IMAGE_NAME="$ACR_LOGIN_SERVER/$IMAGE_REPOSITORY:$IMAGE_TAG"
echo "$FULL_IMAGE_NAME"
```

教材内の表記例です。

```text
<共有ACRログインサーバー>/azbeg/nginx-l04:20260709
```

## 手順11: 検証用 ACI を作成する

スクリーンショット取得前に、ACR から ACI がイメージを pull できることと、HTTP 80 でカスタムページが表示されることを確認します。
検証用 ACI は CLI で作成しますが、受講者向けの本番手順では Azure Portal の ACI 作成画面から ACR を選択します。
CLI で検証するときは、対話プロンプトに入力せず、ACR admin user のユーザー名とパスワードを変数として明示的に渡します。
これにより、`Image registry username:` のプロンプトや、空の資格情報による `AmbiguousImageResitryCredentialType` エラーを避けます。

```bash
az group create \
  --name "$TEST_RESOURCE_GROUP" \
  --location "$LOCATION" \
  --tags \
    Course=AzureWorkshopForBeginners \
    Lesson=L04 \
    Environment=InstructorTest \
    Purpose=ContainerImageVerification
```

以前の作成試行が残っている可能性がある場合は、同名の検証用 ACI を削除してから進めます。

```bash
if az container show --resource-group "$TEST_RESOURCE_GROUP" --name "$TEST_ACI_NAME" >/dev/null 2>&1; then
  az container delete \
    --resource-group "$TEST_RESOURCE_GROUP" \
    --name "$TEST_ACI_NAME" \
    --yes
fi
```

ACR admin user の資格情報を変数に読み込みます。
パスワードの値は画面に表示しません。

```bash
ACR_USERNAME=$(az acr credential show --name "$ACR_NAME" --query username -o tsv)
ACR_PASSWORD=$(az acr credential show --name "$ACR_NAME" --query passwords[0].value -o tsv)
```

検証用 ACI を作成します。

```bash
az container create \
  --resource-group "$TEST_RESOURCE_GROUP" \
  --name "$TEST_ACI_NAME" \
  --location "$LOCATION" \
  --image "$FULL_IMAGE_NAME" \
  --registry-login-server "$ACR_LOGIN_SERVER" \
  --registry-username "$ACR_USERNAME" \
  --registry-password "$ACR_PASSWORD" \
  --dns-name-label "$DNS_LABEL" \
  --ports 80 \
  --os-type Linux \
  --cpu 1 \
  --memory 1.5 \
  --restart-policy Always \
  --tags \
    Course=AzureWorkshopForBeginners \
    Lesson=L04 \
    Environment=InstructorTest
```

この手順で `Image registry username:` が表示された場合は、`--registry-login-server`、`--registry-username`、`--registry-password` のいずれかが不足しています。
何も入力せずに `Ctrl+C` で中断し、上記の変数設定と作成コマンドを確認します。
Cloud Shell の画面を撮影する場合、`ACR_PASSWORD` の取得コマンドや値が写らないようにします。

## 手順12: ACI の起動状態と FQDN を確認する

```bash
az container show \
  --resource-group "$TEST_RESOURCE_GROUP" \
  --name "$TEST_ACI_NAME" \
  --query "{state:instanceView.state, fqdn:ipAddress.fqdn, ip:ipAddress.ip, ports:ipAddress.ports}" \
  -o json
```

`state` が `Running` になり、`fqdn` が表示されることを確認します。

ブラウザーで次の URL にアクセスします。

```bash
echo "http://$(az container show --resource-group "$TEST_RESOURCE_GROUP" --name "$TEST_ACI_NAME" --query ipAddress.fqdn -o tsv)"
```

期待する表示は次のとおりです。

- `Lesson 4 | ACR + ACI + NGINX`
- `Azure 初心者講座`
- `NGINX container on Azure Container Instances is working`

## 手順13: ACI のログを確認する

```bash
az container logs \
  --resource-group "$TEST_RESOURCE_GROUP" \
  --name "$TEST_ACI_NAME"
```

ブラウザーでアクセスしたあとに NGINX のアクセスログが表示されれば、コンテナ内の NGINX まで通信が届いています。

## 手順14: スクリーンショット取得時に確認する画面

教材用に撮影する場合は、必要に応じて次の画面を取得します。

| 画面 | 用途 | 注意 |
| --- | --- | --- |
| ACR Overview | ログインサーバー名の確認 | サブスクリプション ID、リソース ID、ユーザー名を写さない |
| ACR Repositories | `azbeg/nginx-l04` が存在することの確認 | 実環境名を公開しない場合は ACR 名をマスク |
| ACR Repository tags | `20260709`、`latest` の確認 | 不要なタグが写る場合はトリミングまたは再取得 |
| ACI Create - Image | Azure Container Registry とイメージ指定 | ACR admin user が有効な状態で撮影する。Access keys や password は写さない |
| ACI Overview | Running、FQDN、IP の確認 | FQDN/IP は必要に応じてマスク |
| ブラウザー表示 | NGINX カスタムページの確認 | URL バーの FQDN/IP は必要に応じてマスク |
| ACI Logs/Events | 起動確認またはトラブル説明 | 内部情報、ユーザー名、エラー詳細を公開しない |

認証情報、パスワード、アクセスキー、トークン、サブスクリプション ID、テナント ID、メールアドレスは公開資料に残しません。

## 手順15: 受講者へ案内する値を記録する

Lesson 4 の教材または講師メモには、次の値だけを残します。

| 項目 | 値 |
| --- | --- |
| 共有 ACR ログインサーバー | `$ACR_LOGIN_SERVER` |
| イメージ名 | `azbeg/nginx-l04` |
| タグ | `$IMAGE_TAG` |
| 完全なイメージ名 | `$FULL_IMAGE_NAME` |
| 公開ポート | `TCP 80` |
| ACR admin user | 有効。受講者が Portal で ACR を選択するために利用 |
| ACR anonymous pull | 有効。ACI から資格情報なしでも pull できる状態を維持 |
| 受講者が削除してよいリソース | `rg-azbeg-l04-<受講者番号>` のみ |
| 受講者が削除してはいけないリソース | `rg-azbeg-shared`、共有 ACR |

Cloud Shell 上で値を再表示する場合は次を使います。

```bash
cat <<EOF
Shared ACR login server: $ACR_LOGIN_SERVER
Image repository: $IMAGE_REPOSITORY
Image tag: $IMAGE_TAG
Full image name: $FULL_IMAGE_NAME
ACR admin user enabled: $(az acr show --name "$ACR_NAME" --query adminUserEnabled -o tsv)
ACR anonymous pull enabled: $(az acr show --name "$ACR_NAME" --query anonymousPullEnabled -o tsv)
EOF
```

## 手順16: 検証用 ACI を削除する

スクリーンショット取得と動作確認が終わったら、検証用 ACI のリソースグループを削除します。
共有 ACR は Lesson 4 当日まで残します。

```bash
az group delete \
  --name "$TEST_RESOURCE_GROUP" \
  --yes
```

削除後、検証用リソースグループが消えたことを確認します。

```bash
az group exists --name "$TEST_RESOURCE_GROUP"
```

`false` が返れば削除済みです。

## ACR admin user と匿名 pull の扱い

第4回では、受講者が Azure Portal から ACI を作成し、Image source で Azure Container Registry を選択します。
この Portal UI では、ACR admin user が有効でないと次のエラーが表示される場合があります。

```text
Admin user must first be enabled for this registry in order to access the image during the container instance creation.
```

そのため、Lesson 4 専用の共有 ACR では admin user を有効化した状態でスクリーンショット取得と講座本番を行います。
同時に、ACI から資格情報なしでも pull できるよう、匿名 pull も有効化したままにします。
ただし、admin user はレジストリ全体に対する資格情報であり、匿名 pull は ACR 内のイメージを認証なしで取得できる設定であるため、次の扱いを守ります。

| 項目 | 扱い |
| --- | --- |
| 利用範囲 | Lesson 4 専用の共有 ACR に限定する |
| 格納するイメージ | 教材用の公開してよい静的 NGINX イメージだけにする |
| 匿名 pull | 有効のままにする。公開不可のイメージは入れない |
| スクリーンショット | ACR の Access keys、password、secret、token は写さない |
| 受講者への説明 | Portal で ACR を選択できるよう講師が事前設定している、と説明する。パスワードは配布しない |
| 講座後 | 後続回で不要なら共有 ACR を削除する。残す場合は admin user と匿名 pull を無効化する |

講座後に ACR を残す場合は、admin user と匿名 pull を無効化します。

```bash
az acr update \
  --name "$ACR_NAME" \
  --admin-enabled false \
  --anonymous-pull-enabled false
```

再度 Lesson 4 のスクリーンショットを取得する場合や講座本番で使う場合は、手順5で両方を有効化し直します。

## 講座後のクリーンアップ

Lesson 4 のスクリーンショット取得と講座本番が完了し、後続回でこの ACR を使わないことを確認できたら、共有リソースグループを削除します。

```bash
az group delete \
  --name "$SHARED_RESOURCE_GROUP" \
  --yes
```

第5回以降の教材で同じ共有 ACR を参照する可能性がある場合は、削除前に Lesson 5 以降の手順とスクリーンショット一覧を確認します。

## トラブルシューティング

### ACR 名が使えない

原因:
ACR 名は Azure 全体で一意である必要があります。

対応:
`ACR_SUFFIX` を変更して、`az acr check-name` を再実行します。

### `az acr build` が失敗する

原因:
ACR 作成直後で準備が完了していない、Dockerfile の貼り付けに失敗している、権限が不足している可能性があります。

対応:
ACR が作成済みであること、`Dockerfile` と `index.html` が現在のディレクトリにあること、講師アカウントに ACR への push 権限があることを確認します。

```bash
pwd
ls -la
az acr show --name "$ACR_NAME" --query loginServer -o tsv
```

### ACI が `ImagePullBackOff` 相当の状態になる

原因:
イメージ名、タグ、ACR ログインサーバー名、pull 権限のどれかが正しくない可能性があります。
また、CLI 検証で `az container create --image "$FULL_IMAGE_NAME"` の形式だけを使うと、Azure CLI が ACR 資格情報の入力を促し、空の `imageRegistryCredentials` が送信される場合があります。
この場合は `AmbiguousImageResitryCredentialType` エラーになります。

対応:
`FULL_IMAGE_NAME` と ACR のタグ一覧を確認します。
Portal から作成する場合は、ACR admin user が有効であることを確認します。
匿名 pull を使う確認や、資格情報なしの pull 経路も残す場合は、`anonymousPullEnabled` も `true` であることを確認します。
CLI で検証する場合は、`--registry-login-server`、`--registry-username`、`--registry-password` を明示的に指定します。

```bash
echo "$FULL_IMAGE_NAME"
az acr repository show-tags --name "$ACR_NAME" --repository "$IMAGE_REPOSITORY" -o table
az acr show --name "$ACR_NAME" --query "{adminUserEnabled:adminUserEnabled, anonymousPullEnabled:anonymousPullEnabled}" -o table
```

### Portal で ACR を選ぶと admin user エラーになる

原因:
Azure Portal の ACI 作成画面で Azure Container Registry を選択したとき、対象 ACR の admin user が無効だと次のエラーが表示される場合があります。

```text
Admin user must first be enabled for this registry in order to access the image during the container instance creation.
```

対応:
Lesson 4 の共有 ACR で admin user と匿名 pull を有効化します。

```bash
az acr update \
  --name "$ACR_NAME" \
  --admin-enabled true \
  --anonymous-pull-enabled true
```

確認します。

```bash
az acr show \
  --name "$ACR_NAME" \
  --query "{loginServer:loginServer, adminUserEnabled:adminUserEnabled, anonymousPullEnabled:anonymousPullEnabled}" \
  -o table
```

その後、Portal の ACI 作成画面で Image source に Azure Container Registry を選び、共有 ACR、`azbeg/nginx-l04`、講師指定タグを選択します。
Access keys や password の値は、スクリーンショットや公開資料に写しません。

### ブラウザーで表示できない

原因:
ACI がまだ Running ではない、FQDN を間違えている、`https://` でアクセスしている、TCP 80 が公開されていない可能性があります。

対応:
ACI の状態、FQDN、ポートを確認します。

```bash
az container show \
  --resource-group "$TEST_RESOURCE_GROUP" \
  --name "$TEST_ACI_NAME" \
  --query "{state:instanceView.state, fqdn:ipAddress.fqdn, ports:ipAddress.ports}" \
  -o json
```

`http://<FQDN>` でアクセスします。`https://` は Lesson 4 では扱いません。