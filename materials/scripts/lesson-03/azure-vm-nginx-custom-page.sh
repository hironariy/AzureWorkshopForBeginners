#!/bin/bash
set -eux

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nginx

install -d -m 0755 /var/www/html

cat > /var/www/html/index.html <<'HTML'
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Azure 初心者講座</title>
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
    <p class="label">Lesson 3 | Azure VM + NGINX</p>
    <h1>Azure 初心者講座</h1>
    <p>このページは、Azure VM の起動時に Custom Script で NGINX をインストールし、配置したカスタムトップページです。</p>
    <p class="status">HTTP で Azure VM に到達できています</p>
  </main>
</body>
</html>
HTML

chown root:root /var/www/html/index.html
chmod 644 /var/www/html/index.html

systemctl enable nginx
systemctl restart nginx