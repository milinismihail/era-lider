# Деплой era-lider.ru

Сайт — статическая Astro-сборка (`site/dist/`), деплоится на любой статический хостинг.

---

## 0. Предварительные шаги — публикация репозитория на GitHub

Локальный git уже инициализирован (3 коммита). Нужно создать пустой удалённый репо и запушить.

### Если у вас есть GitHub-аккаунт

1. Зайдите на https://github.com/new
2. Имя репозитория: `era-lider` или `SiteEra` (без описания, **без** README/license/`.gitignore` — у нас уже всё есть)
3. Нажмите **Create repository**
4. На странице созданного репо скопируйте URL вида `https://github.com/YOUR_USERNAME/era-lider.git`
5. В терминале из корня проекта (`C:\Users\milin\SiteEra`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/era-lider.git
git branch -M main
git push -u origin main
```

После пуша CI workflow `.github/workflows/ci.yml` автоматически запустится: соберёт сайт и проверит:
- `dist/sitemap-index.xml`, `dist/og-default.png`, `dist/robots.txt` присутствуют
- Нет обращений к `fonts.googleapis.com` (требование ТЗ 9.3)
- Нет битых `href="#"`

Зелёный билд — сигнал, что можно подключать хостинг.

---

## 1. Vercel — рекомендуется для staging (10 минут)

**Почему:** работает в РФ без VPN, нативная поддержка Astro, автодеплой при `git push`, бесплатный тир покрывает demo-нагрузку.

### Подключение

1. Зайдите на https://vercel.com/signup → войдите через GitHub.
2. На дашборде нажмите **Add New → Project**.
3. Импортируйте репозиторий `era-lider`.
4. В настройках:
   - **Framework Preset:** Astro (определится автоматически).
   - **Root Directory:** `site` (важно! Astro-проект в подпапке).
   - **Build Command:** `npm run build` (по умолчанию).
   - **Output Directory:** `dist` (по умолчанию).
5. **Environment Variables** (опционально):
   - `PUBLIC_FORM_ENDPOINT` — URL вашего webhook (Formspree/Bitrix24/Cloudflare Worker)
   - `PUBLIC_YA_METRIKA_ID` — counter ID Яндекс.Метрики
6. Нажмите **Deploy**.

Через 1–2 минуты получите URL вида `https://era-lider-{hash}.vercel.app`.

### Дальше

- Каждый `git push` в `main` → автодеплой.
- PR → деплой preview-окружения с уникальным URL.
- Custom-домен (если будет): `era-lider.ru` → Settings → Domains → добавить → следовать инструкции по DNS.

---

## 2. Netlify — альтернатива

1. https://app.netlify.com/signup → GitHub-логин.
2. **Add new site → Import existing project → GitHub** → выбрать репо.
3. Настройки сборки:
   - **Base directory:** `site`
   - **Build command:** `npm run build`
   - **Publish directory:** `site/dist`
4. **Environment variables:** те же `PUBLIC_*` ключи, что и для Vercel.
5. **Deploy site**.

URL вида `https://{random-name}.netlify.app`.

---

## 3. Cloudflare Pages — лучший CDN, но нестабильный доступ из РФ

Для российской аудитории **не рекомендуется как primary**. Подходит для тестового staging для команды с VPN.

1. https://dash.cloudflare.com → Workers & Pages → Create → Pages → **Connect to Git**.
2. Авторизуйте GitHub, выберите репо.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `cd site && npm run build`
   - **Build output directory:** `site/dist`
   - **Root directory** (production): `/` (оставить пустым)
4. **Save and Deploy**.

URL: `https://era-lider.pages.dev`.

---

## 4. GitHub Pages — бесплатно, без сторонних сервисов

Подходит для совсем простого staging. Через готовый workflow `deploy-pages.yml`.

1. В репо на GitHub: **Settings → Pages → Source → GitHub Actions**.
2. На странице **Actions** запустите workflow **Deploy to GitHub Pages** вручную (`Run workflow`).
3. После завершения URL вида `https://YOUR_USERNAME.github.io/era-lider/`.

⚠ Ограничение: Astro `site` URL прописан как `https://era-lider.ru`, поэтому sitemap и canonical будут указывать на production-домен, а не на github.io. Для staging это допустимо.

---

## 5. Production — Selectel или Я.Облако

Согласно ТЗ 9.1, production должен быть в российском дата-центре.

### Вариант A. Selectel S3 + CDN

1. Создать bucket в Selectel Object Storage (Санкт-Петербург / Москва).
2. Включить публичный доступ.
3. Загрузить содержимое `site/dist/` через `s3cmd` / `aws s3 sync` / Selectel UI.
4. Подключить Selectel CDN перед bucket'ом для ускорения и SSL.
5. Привязать домен `era-lider.ru` (DNS A/CNAME → CDN).

Команды для CI на GitHub Actions (требует AWS_ACCESS_KEY/SECRET в secrets):

```yaml
- name: Deploy to Selectel S3
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.SELECTEL_KEY }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.SELECTEL_SECRET }}
  run: |
    aws s3 sync site/dist s3://era-lider/ \
      --endpoint-url=https://s3.ru-1.storage.selcloud.ru \
      --delete
```

### Вариант B. Yandex Cloud Object Storage

Аналогично Selectel — Object Storage + CDN. Endpoint `https://storage.yandexcloud.net`.

### Вариант C. VPS (Selectel/Yandex)

Если предпочитаете полный контроль: VPS + nginx + certbot. Сборка на CI, копирование `dist/` на сервер через rsync, nginx раздаёт статику.

---

## Переменные окружения

Файл `site/.env.example` содержит шаблон. Никогда не коммитить `.env`/`.env.local`.

| Ключ | Назначение | Где задаётся |
|---|---|---|
| `PUBLIC_FORM_ENDPOINT` | URL webhook для форм заявки и подписки | Vercel/Netlify env vars |
| `PUBLIC_YA_METRIKA_ID` | Counter ID Яндекс.Метрики (опционально) | Vercel/Netlify env vars |

---

## Чек-лист перед публикацией production

- [ ] Реальный контент в `data/*.ts` (имена экспертов, согласованные кейсы) — задача коммерческого блока (D1)
- [ ] OG-картинка от дизайнера (заменить `public/og-default.png`)
- [ ] PDF-документы в `public/docs/` (свидетельство РПО, политики 152-ФЗ, и т. д.) — D1
- [ ] Webhook для форм работает (Bitrix24 / Formspree / Cloudflare Worker)
- [ ] Yandex.Metrika counter подключён
- [ ] Lighthouse Core Web Vitals в зелёной зоне (E1)
- [ ] WCAG 2.1 AA проверка через axe (E2)
- [ ] Кросс-браузер: Chrome / Firefox / Safari / Edge (E3)
- [ ] Финальная вычитка контента (E6)

---

## Откат (rollback)

Vercel/Netlify — на дашборде у каждого деплоя есть кнопка **Rollback to this deployment**.

Selectel/Я.Облако — храните последние 3–5 версий `dist/` в отдельных bucket'ах с датой, переключение через смену CDN-источника.

GitHub — если плохой коммит ушёл в main:

```bash
git revert HEAD
git push
```

CI пересоберёт и переразвернёт с откаченным состоянием.
