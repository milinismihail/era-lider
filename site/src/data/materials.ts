export type MaterialType = 'paper' | 'benchmark' | 'article' | 'podcast' | 'telegram';
export type MaterialMod = 'pers' | 'mot' | 'destr' | null;

export interface FeaturedMaterial {
  type: MaterialType;
  typeLabel: string;
  mod?: MaterialMod;
  large?: boolean;
  title: string;
  desc: string;
  meta: string[];
  link: { label: string; href: string };
}

export interface MaterialItem {
  type: MaterialType;
  typeLabel: string;
  year: string;
  title: string;
  source: string;
  meta: string;
  pages: string;
  href: string;
}

export const featuredMaterials: FeaturedMaterial[] = [
  {
    type: 'paper',
    typeLabel: 'White Paper',
    mod: 'pers',
    large: true,
    title: 'Адаптация HEXACO-PI-R на&nbsp;российской выборке руководителей.',
    desc:
      'Полный методический разбор: факторная структура на выборке 5 127 профилей, корреляции с HPI/HDS/MVPI, шкалы валидности, нормы по 8 отраслям. Базовый документ для HR-методолога и психометриста.',
    meta: ['2025', '·', '24 стр.', '·', 'Боровикова, Белоуско'],
    link: { label: 'Читать в методологии', href: '/methodology' },
  },
  {
    type: 'benchmark',
    typeLabel: 'Бенчмарк',
    mod: 'destr',
    title: 'Паттерны выгорания топ-менеджеров.',
    desc:
      'Кросс-секционное исследование на 5 000+ профилей: какие сочетания деструкторов и мотивационного истощения предсказывают уход с C-level позиции в горизонте 12 месяцев.',
    meta: ['2024', '·', '28 стр.'],
    link: { label: 'Скачать (PDF)', href: '/contact' },
  },
  {
    type: 'article',
    typeLabel: 'Статья',
    title: 'Личностные опросники для&nbsp;бизнеса.',
    desc:
      'Какими бывают личностные опросники, чем отличаются HEXACO и Big Five, почему важна конфиденциальность результатов и как читать профиль без клинических ярлыков.',
    meta: ['blog.bitobe.ru'],
    link: { label: 'Читать ↗', href: 'https://blog.bitobe.ru/article/lichnostnye-oprosniki-dlya-biznesa/' },
  },
];

export const materialsList: MaterialItem[] = [
  {
    type: 'paper',
    typeLabel: 'White Paper',
    year: '2025',
    title: 'Адаптация модели HEXACO-PI-R на российской выборке руководителей: факторная структура и предиктивная валидность',
    source: 'Боровикова Н., Белоуско Е.',
    meta: 'Вестник психометрии',
    pages: '24 стр.',
    href: '/contact',
  },
  {
    type: 'paper',
    typeLabel: 'White Paper',
    year: '2024',
    title: 'Конкурентная валидность ЭРА: сопоставление с инструментами Hogan (HPI, HDS, MVPI)',
    source: 'BITOBE Research',
    meta: 'Методический отчёт',
    pages: '42 стр.',
    href: '/contact',
  },
  {
    type: 'benchmark',
    typeLabel: 'Бенчмарк',
    year: '2024',
    title: 'Паттерны выгорания топ-менеджеров: данные 5 000+ профилей',
    source: 'Лагутина С., Боровикова Н.',
    meta: 'BITOBE White Paper',
    pages: '28 стр.',
    href: '/contact',
  },
  {
    type: 'benchmark',
    typeLabel: 'Бенчмарк',
    year: '2023',
    title: '16 мотиваторов российских лидеров: кросс-секционное исследование 2020–2023',
    source: 'BITOBE Research',
    meta: 'Отраслевой бенчмарк',
    pages: '36 стр.',
    href: '/contact',
  },
  {
    type: 'article',
    typeLabel: 'Статья',
    year: '2024',
    title: 'Личностные опросники для бизнеса',
    source: 'blog.bitobe.ru',
    meta: 'Какими бывают опросники и почему важна их конфиденциальность',
    pages: '↗',
    href: 'https://blog.bitobe.ru/article/lichnostnye-oprosniki-dlya-biznesa/',
  },
  {
    type: 'article',
    typeLabel: 'Статья',
    year: '2024',
    title: 'Лучшие остаются',
    source: 'blog.bitobe.ru',
    meta: 'Три ситуации, когда нужна диагностика бизнес-лидера и его команды',
    pages: '↗',
    href: 'https://blog.bitobe.ru/article/luchshie-ostayutsya/',
  },
  {
    type: 'article',
    typeLabel: 'Статья',
    year: '2024',
    title: 'ЭРА — командный отчёт',
    source: 'blog.bitobe.ru',
    meta: 'Как спрогнозировать риск ухода «талантов» с помощью оценки',
    pages: '↗',
    href: 'https://blog.bitobe.ru/article/era-komandnyy-otchet/',
  },
  {
    type: 'article',
    typeLabel: 'Статья',
    year: '2023',
    title: 'Практика преемственности: методологические выводы из 50 кейсов',
    source: 'Боровикова Н.',
    meta: 'Журнал HR-практики',
    pages: '18 стр.',
    href: '/contact',
  },
  {
    type: 'podcast',
    typeLabel: 'Подкаст',
    year: '2024',
    title: 'Стрессовые паттерны C-level: как распознать до того, как сломается',
    source: 'Подкаст BITOBE о лидерстве',
    meta: 'с участием Е. Белоуско',
    pages: '42 мин',
    href: '/contact',
  },
  {
    type: 'podcast',
    typeLabel: 'Подкаст',
    year: '2024',
    title: 'Команда как система: что показывает командный профиль ЭРА',
    source: 'Подкаст BITOBE о лидерстве',
    meta: 'с участием С. Лагутиной',
    pages: '38 мин',
    href: '/contact',
  },
  {
    type: 'telegram',
    typeLabel: 'Telegram',
    year: '2026',
    title: 'Серия разборов: «Когда деструкторы не равно проблема»',
    source: '@era_lider',
    meta: 'Короткие материалы от действующих экспертов',
    pages: '↗',
    href: 'https://t.me/era_lider',
  },
  {
    type: 'telegram',
    typeLabel: 'Telegram',
    year: '2026',
    title: 'Разбор анонимного профиля: «Почему преемник может быть не готов»',
    source: '@era_lider',
    meta: 'Действующий эксперт ЭРА',
    pages: '↗',
    href: 'https://t.me/era_lider',
  },
  {
    type: 'benchmark',
    typeLabel: 'Бенчмарк',
    year: '2024',
    title: 'Профиль HiPo в российской промышленности: что отличает кандидатов в кадровый резерв',
    source: 'BITOBE Research',
    meta: 'Отраслевой бенчмарк',
    pages: '22 стр.',
    href: '/contact',
  },
  {
    type: 'paper',
    typeLabel: 'White Paper',
    year: '2023',
    title: 'Шкала социальной желательности в ассессмент-практике',
    source: 'Белоуско Е.',
    meta: 'Методический разбор',
    pages: '14 стр.',
    href: '/contact',
  },
  {
    type: 'benchmark',
    typeLabel: 'Бенчмарк',
    year: '2024',
    title: 'Распределение деструкторов в нефтегазовой и металлургической отраслях',
    source: 'BITOBE Research',
    meta: 'Отраслевой бенчмарк',
    pages: '19 стр.',
    href: '/contact',
  },
];
