# era-lider.ru

Сайт продукта **ЭРА** — российской системы оценки руководителей и команд (продукт BITOBE).
Реестровая запись № 28543 от 23.06.2025.

- **Staging:** https://era-lider.vercel.app
- **Production:** ожидает развёртывания на Selectel/Я.Облако (см. [docs/DEPLOY.md](docs/DEPLOY.md))
- **Repository:** https://github.com/milinismihail/era-lider

## Структура репозитория

```
SiteEra/
├─ docs/                    Документация и стратегические артефакты
│  ├─ TZ.docx              Стратегическое ТЗ на редизайн
│  ├─ PLAN.md              План реализации, контракт работ
│  └─ PROGRESS.md          Журнал прогресса по плану
├─ templates/               Исходные HTML-шаблоны (референс, не используется в сборке)
├─ site/                    Astro-проект (исходники сайта)
└─ README.md
```

## Технологический стек

- **[Astro 4](https://astro.build/)** — статический генератор, file-based routing.
- **TypeScript** strict.
- Шрифты: **Onest Variable** + **JetBrains Mono** через `@fontsource-variable/onest` и `@fontsource/jetbrains-mono` (self-hosted, без Google Fonts — ТЗ 9.3).
- **`@astrojs/sitemap`** — автоматическая генерация sitemap при сборке.
- Минимум клиентского JS — только в местах интерактива (фильтры, аккордеоны, формы).

## Команды

Все команды запускаются из директории `site/`.

| Команда | Что делает |
|---|---|
| `npm install` | Установить зависимости |
| `npm run dev` | Dev-сервер с HMR на http://localhost:8080 |
| `npm run build` | Прод-сборка в `site/dist/` (включая sitemap) |
| `npm run preview` | Превью прод-сборки на http://localhost:8080 |
| `npm run astro -- check` | Type-check `.astro` и `.ts` файлов |

## Переменные окружения

Файл `.env` (не коммитится) или `.env.local`. Шаблон — `site/.env.example`.

| Ключ | Назначение |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | URL webhook для приёма форм заявки и подписки. Без него формы показывают «Отправлено ✓» и редиректят на `/thanks` без реальной отправки. |
| `PUBLIC_YA_METRIKA_ID` | Counter ID Яндекс.Метрики (опционально, не подключено пока). |

## Структура сайта (24 страницы)

**Статические:**
- `/` — главная
- `/about` — Что такое ЭРА
- `/scenarios` — обзор 6 сценариев
- `/reports` — 5 форматов отчётов
- `/methodology` — научная методология
- `/cases` — кейсы и благодарности
- `/certification` — программа сертификации
- `/experts` — действующие эксперты + архитекторы методологии
- `/materials` — открытые материалы и публикации
- `/contact` — 5 ступеней воронки + форма
- `/documents` — реестр PDF-документов
- `/thanks`, `/404` — служебные

**Динамические** (генерируются из `data/`):
- `/scenarios/[slug]` — 6 страниц
- `/cases/[slug]` — 5 страниц flagship-кейсов

## Архитектура `site/src/`

```
src/
├─ layouts/Base.astro              Общий <html>/<head>, OG-теги, JSON-LD, Nav, Footer
├─ components/
│  ├─ icons/Sprite.astro           Единый SVG-спрайт (chev-7, chev-mark, chev-arrow)
│  ├─ icons/Chev.astro             Helper для <use href="#chev-...">
│  ├─ nav/Nav.astro                Шапка
│  ├─ nav/Footer.astro             Подвал
│  ├─ seo/SchemaOrg.astro          JSON-LD: Organization, Product, FAQPage, Article, BreadcrumbList
│  ├─ scenarios/                   Компоненты страниц сценариев
│  ├─ cases/                       Компоненты страниц кейсов
│  ├─ reports/                     Компоненты страниц отчётов
│  ├─ methodology/                 Sticky-TOC, заголовок секции
│  ├─ certification/FaqAccordion.astro
│  └─ materials/                   FeatCard, MaterialRow, MaterialsFilter
├─ data/                            Типизированный контент (источник правды)
│  ├─ nav.ts                       Структура шапки и подвала
│  ├─ scenarios.ts                 6 сценариев
│  ├─ reports.ts                   5 форматов отчётов + 6 принципов
│  ├─ cases.ts                     5 flagship + 12 благодарностей
│  ├─ experts.ts                   3 действующих + 3 архитектора
│  ├─ certification.ts             Программа, семинары, FAQ, преподаватели
│  ├─ materials.ts                 3 featured + 15 публикаций
│  ├─ documents.ts                 8 PDF-документов
│  └─ methodology.ts               HEXACO, мотиваторы, деструкторы, корреляции, α-Кронбаха
├─ pages/                           File-based routing (24 страницы)
├─ scripts/
│  ├─ nav-scroll.ts                Подсветка nav.scrolled при scrollY > 40
│  └─ reveal.ts                    IntersectionObserver для [data-reveal]
└─ styles/era-style.css            Глобальные токены, типографика, nav, footer, btn,
                                   .page-hero, .cta-block, .accent-line, [data-reveal]
```

## Дизайн-система

Базовая чёрно-белая палитра + три цветовых акцента, жёстко привязанных к модулям ЭРА:
- `--accent-pers: #A8B3D9` — личность (HEXACO)
- `--accent-mot: #A5C0A5` — мотивация (16 драйверов)
- `--accent-destr: #C2B299` — деструкторы (11 паттернов)

На странице, посвящённой деструкторам, — только бежевый акцент. На мотивации — салатовый. На личности — сиреневый. Смешение допустимо только на обзорных экранах (главная, страница «Отчёты»).

Носитель идентичности — **chevron-7** (графический элемент в виде угла-стрелки). SVG-символ один на весь сайт, используется через `<Chev kind="7|mark|arrow" />`.

## SEO

- Полный набор JSON-LD на всех страницах (Organization базово; Product, FAQPage, Article, BreadcrumbList — per-page).
- OG / Twitter Card теги.
- Sitemap автоматически (`sitemap-index.xml` + `sitemap-0.xml`) при `npm run build`.
- `robots.txt` в `site/public/`.
- Canonical URLs.

## Деплой

Сборка статическая (`dist/`). Подходит для любого статического хостинга:

- Selectel / Cloudflare Pages / Vercel / GitHub Pages.
- Для прод-стейджа ТЗ предполагает российский дата-центр (Selectel или Я.Облако) — по факту коммерческого решения.

После `npm run build`:
1. `dist/` — артефакт для деплоя.
2. `dist/sitemap-index.xml` — для Yandex Webmaster и Google Search Console.
3. Прописать `PUBLIC_FORM_ENDPOINT` в среде хостинга для активации форм.

## Контент

Контент — версионированный в TS-файлах в `src/data/`. Изменение текста = git-коммит.

Когда коммерческий блок будет править контент часто, разумно мигрировать в headless CMS (Strapi/Directus). Это запланировано в фазе после контентного наполнения.

## Документы / источники

- [docs/PLAN.md](docs/PLAN.md) — полный план реализации с чек-листом.
- [docs/PROGRESS.md](docs/PROGRESS.md) — текущий прогресс по плану.
- `docs/TZ.docx` — стратегическое ТЗ.
