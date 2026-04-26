export type DocCategory = 'registry' | 'privacy' | 'tech' | 'standard';

export interface DocItem {
  category: DocCategory;
  categoryLabel: string;
  title: string;
  desc: string;
  format: string;
  size: string;
  date: string;
  href: string;
}

export const documents: DocItem[] = [
  {
    category: 'registry',
    categoryLabel: 'Реестр РПО',
    title: 'Свидетельство о включении в Единый реестр российского ПО',
    desc: 'Реестровая запись № 28543 от 23.06.2025. Классификатор: ПО для оценки и тестирования персонала. Подтверждение включения системы ЭРА в реестр.',
    format: 'PDF',
    size: '~ 240 КБ',
    date: '23.06.2025',
    href: '/docs/era-rpo-svidetelstvo.pdf',
  },
  {
    category: 'privacy',
    categoryLabel: '152-ФЗ',
    title: 'Политика конфиденциальности',
    desc: 'Политика обработки персональных данных в системе ЭРА. Состав ПДн, цели обработки, сроки хранения, права субъекта ПДн, порядок обращений.',
    format: 'PDF',
    size: '~ 180 КБ',
    date: '01.04.2026',
    href: '/docs/era-privacy-policy.pdf',
  },
  {
    category: 'privacy',
    categoryLabel: '152-ФЗ',
    title: 'Согласие на обработку персональных данных',
    desc: 'Шаблон согласия для подписи респондентом перед прохождением оценки. Соответствует требованиям ст. 9 152-ФЗ для обработки специальных категорий.',
    format: 'PDF',
    size: '~ 110 КБ',
    date: '01.04.2026',
    href: '/docs/era-consent-pdn.pdf',
  },
  {
    category: 'tech',
    categoryLabel: 'Технические характеристики',
    title: 'Функциональные характеристики ПО',
    desc: 'Технический паспорт системы ЭРА: архитектура, функциональные модули, требования к среде, перечень API, интеграционные возможности.',
    format: 'PDF',
    size: '~ 320 КБ',
    date: '15.03.2026',
    href: '/docs/era-tech-spec.pdf',
  },
  {
    category: 'tech',
    categoryLabel: 'Технические характеристики',
    title: 'Руководство пользователя платформы',
    desc: 'Инструкция для администратора и пользователя личного кабинета: назначение оценки, выгрузка отчётов, работа с командными профилями.',
    format: 'PDF',
    size: '~ 4.2 МБ',
    date: '20.03.2026',
    href: '/docs/era-user-guide.pdf',
  },
  {
    category: 'standard',
    categoryLabel: 'Стандарты',
    title: 'Сертификат соответствия ГОСТ Р 71009-2023',
    desc: 'Соответствие национальному стандарту психологического тестирования персонала. Подтверждение валидности и надёжности шкал.',
    format: 'PDF',
    size: '~ 280 КБ',
    date: '12.10.2025',
    href: '/docs/era-gost-certificate.pdf',
  },
  {
    category: 'standard',
    categoryLabel: 'Стандарты',
    title: 'Методический отчёт ЭРА (краткая версия)',
    desc: 'Описание методологии: HEXACO, мотивационные шкалы, деструкторы, валидность, надёжность, нормативная база. Полная версия (86 страниц) — по запросу.',
    format: 'PDF',
    size: '~ 1.8 МБ',
    date: '01.04.2026',
    href: '/docs/era-methodology-report-short.pdf',
  },
  {
    category: 'standard',
    categoryLabel: 'Стандарты',
    title: 'Протокол интерпретации результатов',
    desc: 'Стандартный протокол работы эксперта с результатами оценки: алгоритм интерпретации, типовые сложные случаи, рекомендации по обратной связи.',
    format: 'PDF',
    size: '~ 520 КБ',
    date: '15.02.2026',
    href: '/docs/era-interpretation-protocol.pdf',
  },
];

export const docCategories: { key: DocCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Все документы' },
  { key: 'registry', label: 'Реестр РПО' },
  { key: 'privacy', label: '152-ФЗ' },
  { key: 'tech', label: 'Технические' },
  { key: 'standard', label: 'Стандарты' },
];
