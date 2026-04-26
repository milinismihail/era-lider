# План реализации сайта era-lider.ru

## Общий обзор проекта

В `C:\Users\milin\SiteEra\` находятся:
- `docs/TZ.docx` — стратегическое ТЗ на редизайн сайта продукта ЭРА. Описывает 12 разделов сайта, систему позиционирования, дизайн-систему (chevron-7, три цветовых модуля, без скруглений), требования к воронке и техтребования.
- `templates/` — 7 свёрстанных HTML-шаблонов (главная + 6 дочерних) и общий `era-style.css`. Стилистика соответствует ТЗ, но шаблоны имеют значительное дублирование (SVG-спрайты × 7, шапка/подвал × 7, JS-обработчики × 7) и битые ссылки. Из 12 разделов ТЗ покрыто только 7.

**Цель этапа.** Превратить разрозненные HTML-шаблоны в компонентный сайт на Astro, дополнить недостающими маркетинговыми страницами из ТЗ, устранить расхождения. Личный кабинет, CMS-админка, сложные интерактивные виджеты (конфигуратор отчёта, калькулятор бюджета, командная карта) — за рамками этого этапа. Формы — клиентские заглушки + отправка на webhook.

**Решённые развилки** (зафиксированы по ответам пользователя):
- Стек: **Astro**.
- Объём: все маркетинговые страницы (12 разделов ТЗ за вычетом ЛК и CMS-админки).
- Формы: заглушки + email через простой webhook (Formspree / Cloudflare Worker / Bitrix24 webhook).

**Что остаётся за рамками этапа** (явно):
- Раздел 11 ТЗ — Личный кабинет (требует авторизации, БД, ролей).
- Конфигуратор отчёта (ТЗ 8.2), калькулятор бюджета (ТЗ 8.3), интерактивная командная карта (ТЗ 7.7).
- Полная интеграция Bitrix24 / Unisender / Roistat (ТЗ 8.5) — пока webhook-заглушка.
- Headless CMS (Strapi/Directus). Контент — TS-файлы в `data/`, версионируется в git.
- Английская версия сайта (ТЗ 8.8) — задел в архитектуре, реализация позже.
- API-интеграция с платформой ЭРА для авторизованных клиентов.

---

## Технологический стек

- **Astro 4.x** — SSG, file-based routing, `.astro`-компоненты со scoped CSS.
- **TypeScript** — для props компонентов.
- **Шрифты**: Onest + JetBrains Mono через self-hosted (`@fontsource-variable/onest`, `@fontsource/jetbrains-mono`). Не Google Fonts (ТЗ 9.3, санкционный риск).
- **Минимум клиентского JS.** Astro по умолчанию рендерит на сервере; `client:load`/`client:visible` подключаются только для интерактивных островков: фильтры на `cases`/`materials`, FAQ-аккордеон на `certification`, sticky scenario-nav на `scenarios`, форма на `index`/`contact`.
- **Schema.org JSON-LD** — компонент `SchemaOrg.astro`, инжектится в `<head>` через `Base.astro`. Типы: Organization, Product, FAQPage, Article, BreadcrumbList (ТЗ 8.6).
- **OG / Twitter Card** — стандартные мета-теги через slot в `Base.astro`.
- **Sitemap** — `@astrojs/sitemap`, `robots.txt` в `public/`.
- **Webhook форм** — переменная среды `PUBLIC_FORM_ENDPOINT`, по умолчанию заглушка; задокументировано в `.env.example`.
- **Аналитика** — Yandex.Metrika через `PUBLIC_YA_METRIKA_ID`, опциональная.
- **Деплой** — пока агностично (build → `dist/`); финальное решение по хостингу (Selectel/Я.Облако согласно ТЗ 9.1) — после готовности контента.

---

## Список страниц

| # | Раздел ТЗ | URL | Статус | Краткое описание |
|---|---|---|---|---|
| 1 | Главная | `/` | Мигрировать | Hero «Оценка для решений, где нельзя ошибиться» → 4 метрики доверия → лента логотипов клиентов → 6 карточек сценариев → таймлайн «Как работает ЭРА» (5 шагов) → 3 опросника (HEXACO/мотиваторы/деструкторы) → флагманский кейс → 2 компактных кейса → блок экспертов → плашка РПО → форма заявки. Источник: `templates/era-lider.html`. |
| 2 | Что такое ЭРА | `/about` | **Создать** | Подробная продуктовая страница для HR-директора. Структура: «Философия продукта» → «Что измеряем и почему именно это» → «Методологический фундамент» (со ссылками на `/methodology`) → «Что отличает ЭРА от других инструментов» → «Интеграция с развитием: коучинг, команды, программы» → «Безопасность и регуляторика». Сравнительная таблица с Hogan/Zetic/BASE!PRO/ЭКОПСИ. Источник: бриф 6.2 ТЗ. |
| 3 | Сценарии — обзор | `/scenarios` | Мигрировать | Sticky-навигация по 6 сценариям. Шесть длинных секций: подбор C-level, преемники и кадровый резерв, диагностика команды, M&A и реструктуризация, выгорание и риск ухода, стратегическая трансформация. Финальный CTA «Разберём ваш кейс на 60-минутной сессии». Источник: `templates/era-scenarios.html`. |
| 3a | Сценарий — детали | `/scenarios/[slug]` | **Создать × 6** | Динамические страницы под каждый из 6 сценариев. Структура каждой: задача → что показывает ЭРА в этом контексте → релевантные отчёты → 1 кейс с цифрами → CTA «Обсудить ваш сценарий». Источник: бриф 6.3 ТЗ. |
| 4 | Отчёты | `/reports` | Мигрировать | 5 форматов отчётов: индивидуальный полный, сводный краткий, командный профиль, профиль роли, 360°-совместимость. Для каждого — превью с аннотациями, что показывает блок, как читать. Принципы «что отличает отчёт ЭРА от типового ассессмента». Источник: `templates/era-reports.html`. |
| 5 | Методология | `/methodology` | Мигрировать | Самая объёмная техническая страница. HEXACO (6 факторов), 16 мотиваторов, 11 деструкторов, корреляции с HPI/HDS/MVPI, α-Кронбаха по шкалам, шкала социальной желательности, российская нормативная выборка, регуляторика, публикации. Источник: `templates/era-methodology.html` (1689 строк inline-стилей разнести в компоненты). |
| 6 | Кейсы — обзор | `/cases` | Мигрировать | Фильтр по отрасли/задаче. Два уровня: 3–5 flagship-кейсов в формате HBR + 12+ компактных благодарностей со ссылками на PDF. Источник: `templates/era-cases.html`. |
| 6a | Кейс — детали | `/cases/[slug]` | **Создать × 3–5** | Динамические страницы flagship-кейсов в формате HBR (бриф 6.6): задача, контекст, что сделали, как ЭРА повлияла на решения, цифровой результат (NPS команды, скорость назначений, retention HiPo). |
| 7 | Сертификация | `/certification` | Мигрировать | Программа подготовки экспертов (4 дня, 7 модулей), целевая аудитория, что получает выпускник, календарь семинаров, преподаватели, что включено в стоимость, FAQ. Источник: `templates/era-certification.html`. |
| 8 | Эксперты | `/experts` | **Создать** | Два блока (бриф 6.8 ТЗ): «Архитекторы методологии» (Боровикова, Белоуско, Лагутина — создатели системы) и «Действующие эксперты» (те, кто сегодня ведёт разговоры с клиентами, обратную связь, кейсы — face-of-product). Карточки с фото, опытом, отраслями, проектами, контактом. |
| 9 | Исследования и материалы | `/materials` | Мигрировать | Витрина экспертного контента: 3 рекомендуемых материала, фильтр по типу (white papers / бенчмарки / статьи / подкаст / Telegram), блок Telegram @era_lider, форма подписки, CTA «Бенчмарк по вашей отрасли». Источник: `templates/era-materials.html`. |
| 10 | Контакты / Заявка | `/contact` | **Создать** | 5 ступеней воронки (ТЗ 8.1): подписка / контент-магнит / презентация с ценами / демо-сессия / разбор кейса. Каждая ступень — отдельный CTA с собственной формой. Заглушки + email через webhook. |
| 12 | Документация | `/documents` | **Создать** | Статическая страница без форм (бриф 6.10). Свидетельство РПО №28543, политика конфиденциальности, политика обработки ПДн (152-ФЗ), функциональные характеристики ПО, руководство пользователя, сертификаты соответствия. PDF-файлы — в `public/docs/`. |
| — | 404 | `/404` | **Создать** | Служебная страница «Не найдено» в фирменной стилистике. |
| — | Спасибо | `/thanks` | **Создать** | Служебная страница после успешной отправки формы. |

Раздел 11 ТЗ (Личный кабинет) — за рамками этапа.

---

## Файловая структура

```
SiteEra/
├─ docs/
│  ├─ TZ.docx                      (без изменений)
│  ├─ PLAN.md                      (этот файл)
│  └─ PROGRESS.md                  (трекер прогресса)
├─ templates/                       (оставить как референс, не удалять)
│  ├─ era-lider.html
│  ├─ era-scenarios.html
│  ├─ era-reports.html
│  ├─ era-methodology.html
│  ├─ era-cases.html
│  ├─ era-certification.html
│  ├─ era-materials.html
│  └─ era-style.css
├─ site/                            (новый Astro-проект)
│  ├─ astro.config.mjs
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ .env.example                 (PUBLIC_FORM_ENDPOINT, PUBLIC_YA_METRIKA_ID)
│  ├─ public/
│  │  ├─ favicon.svg               (chevron-7)
│  │  ├─ og-default.png            (плейсхолдер)
│  │  ├─ robots.txt
│  │  └─ docs/                     (PDF: РПО, политики, отчёты)
│  └─ src/
│     ├─ layouts/
│     │  └─ Base.astro             (<html>, <head>, Nav, Footer, JSON-LD slot, OG-теги)
│     ├─ components/
│     │  ├─ nav/
│     │  │  ├─ Nav.astro           (общая шапка, prop activeKey)
│     │  │  └─ Footer.astro        (общий футер из data/nav.ts)
│     │  ├─ icons/
│     │  │  ├─ Sprite.astro        (единые SVG <symbol> chev-7/chev-mark/chev-arrow)
│     │  │  └─ Chev.astro          (helper: <svg><use href="#chev-..."/></svg>)
│     │  ├─ hero/
│     │  │  ├─ PageHero.astro      (бредкрамбы + h1 + lead + meta-grid 2×2)
│     │  │  └─ HomeHero.astro      (специальный hero главной)
│     │  ├─ blocks/
│     │  │  ├─ CTABlock.astro      (тёмный CTA с двумя кнопками)
│     │  │  ├─ EyebrowLabel.astro  (chev-mark + uppercase-надпись)
│     │  │  ├─ Tile.astro          (универсальная карточка с mod-цветами)
│     │  │  ├─ AccentLine.astro    (текстовый акцент с подчёркиванием)
│     │  │  ├─ MetaGrid.astro      (4× метрики на главной)
│     │  │  ├─ StepsTimeline.astro (5 шагов «Как работает ЭРА»)
│     │  │  └─ LogoStrip.astro     (лента логотипов клиентов)
│     │  ├─ forms/
│     │  │  ├─ LeadForm.astro      (multi-step lead form, client:load)
│     │  │  └─ SubscribeForm.astro (минимальная форма для подписки)
│     │  ├─ scenarios/
│     │  │  ├─ ScenarioCard.astro
│     │  │  ├─ ScenarioSection.astro
│     │  │  └─ ScenariosNav.astro  (sticky, client:load)
│     │  ├─ reports/
│     │  │  └─ ReportFormat.astro
│     │  ├─ cases/
│     │  │  ├─ CaseDeepCard.astro      (flagship)
│     │  │  ├─ CaseCompactCard.astro   (благодарность с PDF)
│     │  │  └─ CasesFilter.astro       (client:load)
│     │  ├─ materials/
│     │  │  ├─ MaterialCard.astro
│     │  │  └─ MaterialsFilter.astro   (client:load)
│     │  ├─ methodology/
│     │  │  ├─ ModuleSection.astro
│     │  │  ├─ CorrelationsTable.astro
│     │  │  └─ ReliabilityTable.astro
│     │  ├─ certification/
│     │  │  ├─ ProgramTable.astro
│     │  │  ├─ CalendarItem.astro
│     │  │  └─ FaqAccordion.astro      (client:load)
│     │  ├─ experts/
│     │  │  ├─ ExpertCard.astro
│     │  │  └─ ExpertsGrid.astro
│     │  └─ seo/
│     │     └─ SchemaOrg.astro
│     ├─ data/                     (контент в TS — без CMS, версионируется в git)
│     │  ├─ nav.ts                 (структура шапки и футера)
│     │  ├─ scenarios.ts           (6 сценариев)
│     │  ├─ reports.ts             (5 форматов отчётов)
│     │  ├─ cases.ts               (3–5 flagship + 12+ благодарностей)
│     │  ├─ experts.ts             (две группы: архитекторы / действующие)
│     │  ├─ certification.ts       (программа, календарь, преподаватели, FAQ)
│     │  ├─ materials.ts           (white papers, статьи, подкасты)
│     │  ├─ documents.ts           (РПО, политики, регуляторика)
│     │  └─ logos.ts               (логотипы клиентов)
│     ├─ pages/
│     │  ├─ index.astro            (1: главная)
│     │  ├─ about.astro            (2: что такое ЭРА — новая)
│     │  ├─ scenarios/
│     │  │  ├─ index.astro         (3: обзор сценариев)
│     │  │  └─ [slug].astro        (3a: детали сценария — новые)
│     │  ├─ reports.astro          (4: отчёты)
│     │  ├─ methodology.astro      (5: методология)
│     │  ├─ cases/
│     │  │  ├─ index.astro         (6: обзор кейсов)
│     │  │  └─ [slug].astro        (6a: детали кейсов — новые)
│     │  ├─ certification.astro    (7: сертификация)
│     │  ├─ experts.astro          (8: эксперты — новая)
│     │  ├─ materials.astro        (9: материалы)
│     │  ├─ contact.astro          (10: контакты — новая)
│     │  ├─ documents.astro        (12: документация — новая)
│     │  ├─ thanks.astro           (служебная)
│     │  └─ 404.astro
│     ├─ styles/
│     │  ├─ era-style.css          (глобальные токены/типографика — из existing era-style.css)
│     │  ├─ tokens.css             (CSS-переменные)
│     │  └─ reset.css
│     └─ scripts/
│        ├─ nav-scroll.ts          (общий: nav.scrolled при scroll>40)
│        └─ reveal.ts              (общий: IntersectionObserver для [data-reveal])
└─ README.md                        (краткая инструкция dev/build/preview)
```

---

## Чек-лист задач

### Фаза A. Скаффолдинг и общая инфраструктура

- [ ] A1. Создать Astro-проект в `site/` (`npm create astro@latest`), TypeScript strict, Prettier.
- [ ] A2. Перенести `templates/era-style.css` в `site/src/styles/era-style.css`, подключить в `Base.astro`.
- [ ] A3. Установить `@fontsource-variable/onest`, `@fontsource/jetbrains-mono`. Подключить в `Base.astro`. Удалить ссылки на Google Fonts.
- [ ] A4. Реализовать `Sprite.astro` (вынести три `<symbol>` из любого существующего шаблона). Включить в `Base.astro` сразу после `<body>`.
- [ ] A5. Реализовать `Chev.astro` (helper).
- [ ] A6. Реализовать `Nav.astro` с поддержкой `activeKey` и mobile-burger. Структура шапки и список пунктов — из `data/nav.ts`. Битые ссылки (`href="#"`) исправить на корректные `/scenarios`, `/cases` и т. п.
- [ ] A7. Реализовать `Footer.astro` единообразно (4 колонки), привязка к `data/nav.ts`. Починить ссылку «Отчёты» в footer-секции «Продукт» (была `#`, должна быть `/reports`).
- [ ] A8. Реализовать `Base.astro` layout с props (title, description, ogImage, breadcrumbs, schemaType) и slot для дополнительного `<head>`.
- [ ] A9. Реализовать `SchemaOrg.astro` с шаблонами Organization, Product, FAQPage, Article, BreadcrumbList.
- [ ] A10. Перенести общий JS (`nav-scroll.ts`, `reveal.ts`) в `site/src/scripts/`, подключать через `<script>` теги в `Base.astro`.
- [ ] A11. Реализовать общие блоки: `PageHero`, `HomeHero`, `CTABlock`, `EyebrowLabel`, `Tile`, `AccentLine`, `MetaGrid`, `StepsTimeline`, `LogoStrip`.
- [ ] A12. Создать `.env.example` (`PUBLIC_FORM_ENDPOINT`, `PUBLIC_YA_METRIKA_ID`) и `README.md` с инструкцией dev/build/preview.

### Фаза B. Миграция существующих 7 шаблонов

- [ ] B1. **Главная (`/`)** — мигрировать `era-lider.html`. HomeHero, 6 ScenarioCard, StepsTimeline, 3 опросника, флагманский CaseDeepCard, 2 компактных кейса, ExpertsGrid, плашка РПО, LeadForm. Разнести 1475 строк inline-стилей в scoped-CSS компонентов.
- [ ] B2. **Сценарии — обзор (`/scenarios`)** — мигрировать `era-scenarios.html`. Sticky `ScenariosNav` (island), 6 `ScenarioSection`, CTA. Контент — `data/scenarios.ts`.
- [ ] B3. **Отчёты (`/reports`)** — мигрировать `era-reports.html`. 5 `ReportFormat`, принципы, CTA. Контент — `data/reports.ts`.
- [ ] B4. **Методология (`/methodology`)** — мигрировать `era-methodology.html`. Самая трудная: 1689 строк inline-стилей разнести в `ModuleSection`, `CorrelationsTable`, `ReliabilityTable`. Контент — встроенный.
- [ ] B5. **Кейсы — обзор (`/cases`)** — мигрировать `era-cases.html`. `CasesFilter` (island), `CaseDeepCard`, стена `CaseCompactCard`. Контент — `data/cases.ts`.
- [ ] B6. **Сертификация (`/certification`)** — мигрировать `era-certification.html`. `ProgramTable`, `CalendarItem`, преподаватели, `FaqAccordion` (island). Контент — `data/certification.ts`.
- [ ] B7. **Материалы (`/materials`)** — мигрировать `era-materials.html`. `MaterialsFilter` (island), `MaterialCard`, Telegram-блок, `SubscribeForm`. Контент — `data/materials.ts`.

### Фаза C. Создание недостающих страниц

- [ ] C1. **Что такое ЭРА (`/about`)** — структура из брифа 6.2 ТЗ. Сравнительная таблица с Hogan/Zetic/BASE!PRO. Контент — встроенный.
- [ ] C2. **Эксперты (`/experts`)** — два блока: «Архитекторы методологии» и «Действующие эксперты». Карточки `ExpertCard`. Контент — `data/experts.ts`.
- [ ] C3. **Контакты / Заявка (`/contact`)** — 5 ступеней воронки (ТЗ 8.1): подписка / магнит / презентация с ценами / демо-сессия / разбор кейса. Каждая ступень — отдельный CTA с формой. Заглушки + webhook (`PUBLIC_FORM_ENDPOINT`).
- [ ] C4. **Документация (`/documents`)** — статическая страница без форм (бриф 6.10). Список PDF из `data/documents.ts`. Файлы — в `public/docs/`.
- [ ] C5. **Сценарии — детали (`/scenarios/[slug]`)** — динамические страницы (6 шт.) на основе `data/scenarios.ts`. Структура: задача → что показывает ЭРА → релевантные отчёты → кейс с цифрами → CTA «Обсудить ваш сценарий».
- [ ] C6. **Кейсы — детали (`/cases/[slug]`)** — динамические страницы flagship-кейсов (3–5 шт.) на основе `data/cases.ts`. Формат HBR (бриф 6.6 ТЗ).
- [ ] C7. **Служебные** — `/404` и `/thanks` (страница «Заявка отправлена»).

### Фаза D. Контент, SEO, формы

- [ ] D1. Заполнить `data/*.ts` плейсхолдер-контентом, перенесённым из текущих шаблонов. Реальный финальный контент готовится коммерческим блоком (Фаза 4 ТЗ).
- [ ] D2. JSON-LD на каждой странице через `SchemaOrg.astro` (Organization на `Base`, Product на `/about`/`/methodology`/`/reports`, FAQPage на `/certification`, Article на детальных кейсах, BreadcrumbList везде).
- [ ] D3. Open Graph + Twitter Card в `Base.astro`. По умолчанию — `og-default.png`; per-page override через props.
- [ ] D4. `sitemap.xml` через `@astrojs/sitemap`. `robots.txt` в `public/`.
- [ ] D5. Форма заявки (`LeadForm`) — POST на `import.meta.env.PUBLIC_FORM_ENDPOINT`. На успех — редирект на `/thanks`. На ошибку — inline-сообщение. UTM-параметры из `window.location.search` подкладываются в payload.
- [ ] D6. Подписка (`SubscribeForm`) — отдельный endpoint, payload минимальный (email + source).
- [ ] D7. `meta description` на каждой странице. Базовая semantic-разметка (`<main>`, `<article>`, `<aside>`).
- [ ] D8. Yandex.Metrika — слот в `Base.astro` под counter ID из env. Включается, если `PUBLIC_YA_METRIKA_ID` задан.

### Фаза E. Проверка и сдача

- [ ] E1. Lighthouse / PageSpeed Insights на всех маркетинговых страницах: Core Web Vitals в зелёной зоне (ТЗ 8.6, 9.2). LCP < 2.5s, CLS < 0.1.
- [ ] E2. Чек-лист доступности (ТЗ 9.4): контрастность ≥ 4.5:1, клавиатурная навигация (Tab по всем CTA), aria-атрибуты у iconography, alt у `<img>`.
- [ ] E3. Кросс-браузерный smoke-тест: Chrome, Firefox, Safari, mobile Safari, Edge.
- [ ] E4. Проверка всех ссылок: `npx linkinator dist` (после build) — ноль битых.
- [ ] E5. Проверка корректности модульного цветового кода: на странице сценариев/методологии — `mod-destr` только в блоках про деструкторы, `mod-mot` — мотивация, `mod-pers` — личность.
- [ ] E6. Финальная вычитка пробелов: проверить, что все 12 разделов ТЗ (за вычетом ЛК) представлены и переходы между ними работают.

### Сквозная проверка end-to-end (после E)

- [ ] Путь 1 ТЗ (раздел 5.2): главная → клик на «Подбор преемника» → `/scenarios/succession` → клик на кейс → `/cases/[slug]` → CTA «Обсудить разговор» → `/contact` → отправка формы → `/thanks`.
- [ ] Путь 2 ТЗ: главная → `/about` → `/methodology` → `/reports` → `/cases` → `/contact` (демо).
- [ ] Путь 5 ТЗ: главная → `/certification` → клик на дату семинара → форма записи.

---

## Закрытие расхождений ТЗ ↔ шаблоны (сводка)

Эти пункты явно встроены в задачи выше, но фиксирую отдельно для прозрачности:

1. Шрифты Onest через Google Fonts → self-hosted `@fontsource-variable/onest`. (A3)
2. SVG-спрайты × 7 копий → один `Sprite.astro`, инжектится через `Base.astro`. (A4)
3. Битые ссылки в footer/nav → ссылки берутся из `data/nav.ts`. (A6, A7)
4. JS дублируется → общий `nav-scroll.ts` + `reveal.ts`. (A10)
5. Нет JSON-LD → `SchemaOrg.astro`. (A9, D2)
6. Нет OG/Twitter → `Base.astro` props. (D3)
7. Нет 5 разделов сайта → создать 5 страниц + 2 динамических маршрута + 2 служебных. (Фаза C)
8. Hero главной нестандартен → `HomeHero.astro` отдельно от `PageHero.astro` для дочерних. (A11)
9. Цветовая дисциплина модулей — занесена в чек-лист E5.

---

## Критичные файлы для миграции (где смотреть исходник)

- `templates/era-lider.html` (1508 строк) — главная, **самая объёмная миграция** из-за inline-стилей.
- `templates/era-methodology.html` (1728 строк) — методология, **вторая по объёму** (1689 строк inline `<style>`).
- `templates/era-style.css` (383 строки) — глобальные токены, переносим целиком.
- `templates/era-{scenarios,reports,cases,certification,materials}.html` — типичные дочерние страницы со средним объёмом inline-стилей (245–498 строк), мигрируются однообразно.
