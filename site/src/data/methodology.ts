export interface HexacoFactor {
  code: string;
  name: string;
  en: string;
  desc: string;
  alpha: string;
  width: number;
}

export interface Motivator {
  code: string;
  name: string;
  dim: string;
}

export interface Destructor {
  num: string;
  name: string;
  desc: string;
}

export type CorrLevel = 'low' | 'med' | 'high';
export interface CorrCell { level: CorrLevel; val: string; }
export interface CorrRow { scale: string; cells: CorrCell[]; }

export interface AlphaRow {
  scale: string;
  items: string;
  alpha: string;
  width: number;
}

export interface NormBreakdown { name: string; pct: string; }

export interface ComplianceItem {
  label: string;
  title: string;
  desc: string;
  link: { label: string; href: string };
}

export interface Publication {
  year: string;
  title: string;
  meta: string;
  href: string;
}

export const tocSections: { id: string; title: string }[] = [
  { id: 'philosophy', title: 'Философия измерения' },
  { id: 'hexaco', title: 'Модель HEXACO' },
  { id: 'motivation', title: '16 мотиваторов' },
  { id: 'destructors', title: '11 деструкторов' },
  { id: 'validity', title: 'Валидность: корреляции с&nbsp;HPI/HDS/MVPI' },
  { id: 'reliability', title: 'Надёжность: α-Кронбаха' },
  { id: 'lie', title: 'Шкала социальной желательности' },
  { id: 'normative', title: 'Нормативная база' },
  { id: 'compliance', title: 'Соответствие стандартам' },
  { id: 'publications', title: 'Публикации и исследования' },
];

export const hexacoFactors: HexacoFactor[] = [
  { code: 'H', name: 'Честность — Смирение', en: '(Honesty-Humility)', desc: 'Искренность, справедливость, скромность, избегание соблазнов. Ключевой предиктор этичности в управлении.', alpha: 'α .86', width: 78 },
  { code: 'E', name: 'Эмоциональность', en: '(Emotionality)', desc: 'Тревожность, зависимость, сентиментальность. Не равно нейротизму Big Five — смещена шкала.', alpha: 'α .84', width: 82 },
  { code: 'X', name: 'Экстраверсия', en: '(Extraversion)', desc: 'Социальная смелость, энергия, позитивная аффективность. Связана со стилем коммуникации.', alpha: 'α .89', width: 88 },
  { code: 'A', name: 'Доброжелательность', en: '(Agreeableness)', desc: 'Прощение, мягкость, терпение, гибкость. Определяет стиль разрешения конфликтов.', alpha: 'α .81', width: 74 },
  { code: 'C', name: 'Добросовестность', en: '(Conscientiousness)', desc: 'Организованность, дисциплина, перфекционизм, целеустремлённость. Предиктор исполнительской результативности.', alpha: 'α .91', width: 91 },
  { code: 'O', name: 'Открытость опыту', en: '(Openness to Experience)', desc: 'Эстетическая восприимчивость, любознательность, креативность, нестандартность мышления.', alpha: 'α .83', width: 76 },
];

export const motivators: Motivator[] = [
  { code: '01', name: 'Власть и влияние', dim: 'Желание направлять и контролировать' },
  { code: '02', name: 'Автономия', dim: 'Свобода от контроля и зависимости' },
  { code: '03', name: 'Достижение', dim: 'Ориентация на результат и победу' },
  { code: '04', name: 'Признание', dim: 'Потребность в социальном одобрении' },
  { code: '05', name: 'Принадлежность', dim: 'Включённость в группу, командность' },
  { code: '06', name: 'Статус', dim: 'Позиция в иерархии, престиж' },
  { code: '07', name: 'Безопасность', dim: 'Стабильность, предсказуемость' },
  { code: '08', name: 'Структурированность', dim: 'Порядок, ясность правил' },
  { code: '09', name: 'Интеллектуальный вызов', dim: 'Сложные задачи, новизна' },
  { code: '10', name: 'Развитие', dim: 'Рост компетенций, обучение' },
  { code: '11', name: 'Творчество', dim: 'Самовыражение, нестандартность' },
  { code: '12', name: 'Справедливость', dim: 'Этичность решений, честность' },
  { code: '13', name: 'Помощь другим', dim: 'Просоциальная ориентация' },
  { code: '14', name: 'Материальное благополучие', dim: 'Финансовая мотивация' },
  { code: '15', name: 'Комфорт', dim: 'Баланс работы и жизни' },
  { code: '16', name: 'Активность', dim: 'Динамика, энергия, темп' },
];

export const destructors: Destructor[] = [
  { num: 'D.01', name: 'Эмоциональная нестабильность', desc: 'Резкие перепады настроения, импульсивные реакции на раздражители.' },
  { num: 'D.02', name: 'Скептицизм и недоверие', desc: 'Поиск скрытых мотивов, интерпретация действий окружающих как враждебных.' },
  { num: 'D.03', name: 'Отстранённость', desc: 'Уход от контакта, закрытие от команды, формальная коммуникация.' },
  { num: 'D.04', name: 'Пассивная агрессия', desc: 'Саботаж через невыполнение, молчаливое сопротивление, ирония вместо диалога.' },
  { num: 'D.05', name: 'Самонадеянность', desc: 'Переоценка собственных возможностей, обесценивание чужого вклада.' },
  { num: 'D.06', name: 'Манипулятивность', desc: 'Использование других как инструмента, игра на слабостях, политические интриги.' },
  { num: 'D.07', name: 'Драматичность', desc: 'Эмоциональные преувеличения, театральность реакций, привлечение внимания.' },
  { num: 'D.08', name: 'Эксцентричность', desc: 'Нестандартные решения в ущерб практичности, игнорирование конвенций.' },
  { num: 'D.09', name: 'Перфекционизм', desc: 'Микроменеджмент, зацикленность на деталях, неспособность делегировать.' },
  { num: 'D.10', name: 'Угодничество', desc: 'Зависимость от одобрения руководства, избегание конфликтов даже ценой дела.' },
  { num: 'D.11', name: 'Ригидность', desc: 'Неспособность пересмотреть позицию, застревание в решениях, догматизм.' },
];

export const correlationRows: CorrRow[] = [
  { scale: 'Честность-Смирение (H)', cells: [
    { level: 'low', val: '0.34' }, { level: 'med', val: '−0.58' }, { level: 'low', val: '0.29' }, { level: 'low', val: '0.38' },
  ]},
  { scale: 'Эмоциональность (E)', cells: [
    { level: 'med', val: '−0.64' }, { level: 'high', val: '0.72' }, { level: 'low', val: '0.18' }, { level: 'high', val: '0.78' },
  ]},
  { scale: 'Экстраверсия (X)', cells: [
    { level: 'high', val: '0.81' }, { level: 'low', val: '0.22' }, { level: 'med', val: '0.54' }, { level: 'high', val: '0.83' },
  ]},
  { scale: 'Доброжелательность (A)', cells: [
    { level: 'med', val: '0.61' }, { level: 'med', val: '−0.52' }, { level: 'low', val: '0.31' }, { level: 'high', val: '0.77' },
  ]},
  { scale: 'Добросовестность (C)', cells: [
    { level: 'high', val: '0.79' }, { level: 'med', val: '−0.48' }, { level: 'med', val: '0.56' }, { level: 'high', val: '0.82' },
  ]},
  { scale: 'Открытость (O)', cells: [
    { level: 'med', val: '0.57' }, { level: 'low', val: '0.14' }, { level: 'high', val: '0.74' }, { level: 'high', val: '0.80' },
  ]},
  { scale: 'Мотивация: Власть', cells: [
    { level: 'low', val: '0.28' }, { level: 'low', val: '0.19' }, { level: 'high', val: '0.76' }, { level: 'low', val: '0.23' },
  ]},
  { scale: 'Мотивация: Признание', cells: [
    { level: 'low', val: '0.34' }, { level: 'med', val: '0.41' }, { level: 'high', val: '0.71' }, { level: 'low', val: '0.27' },
  ]},
  { scale: 'Деструктор: Скептицизм (D.02)', cells: [
    { level: 'low', val: '−0.22' }, { level: 'high', val: '0.78' }, { level: 'low', val: '0.11' }, { level: 'low', val: '−0.31' },
  ]},
  { scale: 'Деструктор: Самонадеянность (D.05)', cells: [
    { level: 'low', val: '0.31' }, { level: 'high', val: '0.74' }, { level: 'med', val: '0.48' }, { level: 'low', val: '0.17' },
  ]},
];

export const alphaRows: AlphaRow[] = [
  { scale: 'Честность-Смирение (H)', items: '32 пункта', alpha: '0.86', width: 86 },
  { scale: 'Эмоциональность (E)', items: '30 пунктов', alpha: '0.84', width: 84 },
  { scale: 'Экстраверсия (X)', items: '34 пункта', alpha: '0.89', width: 89 },
  { scale: 'Доброжелательность (A)', items: '28 пунктов', alpha: '0.81', width: 81 },
  { scale: 'Добросовестность (C)', items: '36 пунктов', alpha: '0.91', width: 91 },
  { scale: 'Открытость опыту (O)', items: '32 пункта', alpha: '0.83', width: 83 },
  { scale: 'Мотивационные шкалы (среднее)', items: '16 шкал', alpha: '0.79', width: 79 },
  { scale: 'Деструкторы (среднее)', items: '11 шкал', alpha: '0.76', width: 76 },
  { scale: 'Шкала социальной желательности', items: '16 пунктов', alpha: '0.72', width: 72 },
];

export const normBreakdown: NormBreakdown[] = [
  { name: 'Нефтегаз и энергетика', pct: '21%' },
  { name: 'Металлургия и добыча', pct: '17%' },
  { name: 'Финансы и банковский сектор', pct: '14%' },
  { name: 'Промышленность и производство', pct: '13%' },
  { name: 'Транспорт и логистика', pct: '10%' },
  { name: 'ИТ и телеком', pct: '9%' },
  { name: 'Ритейл и FMCG', pct: '8%' },
  { name: 'Профессиональные услуги', pct: '8%' },
];

export const complianceItems: ComplianceItem[] = [
  {
    label: 'Реестр РПО',
    title: 'Единый реестр российского ПО',
    desc: 'Реестровая запись № 28543 от 23.06.2025. Классификатор — ПО для оценки и тестирования персонала.',
    link: { label: 'Свидетельство', href: '/documents' },
  },
  {
    label: '152-ФЗ',
    title: 'Защита персональных данных',
    desc: 'Серверы и резервные копии — в российских дата-центрах. Обработка ПДн в соответствии с требованиями 152-ФЗ.',
    link: { label: 'Политика ПДн', href: '/documents' },
  },
  {
    label: 'ГОСТ',
    title: 'Росстандарт тестирования',
    desc: 'Соответствие национальному стандарту психологического тестирования персонала (ГОСТ Р 71009-2023).',
    link: { label: 'Сертификат', href: '/documents' },
  },
  {
    label: 'APA & ITC',
    title: 'Международные стандарты',
    desc: 'Разработка и валидация в соответствии со стандартами APA (2014) и ITC Guidelines on Test Use (2019).',
    link: { label: 'Методический отчёт', href: '/contact' },
  },
];

export const methodologyPublications: Publication[] = [
  { year: '2025', title: 'Адаптация модели HEXACO-PI-R на российской выборке руководителей: факторная структура и предиктивная валидность', meta: 'Боровикова Н., Белоуско Е. · Вестник психометрии · 24 с.', href: '/contact' },
  { year: '2024', title: 'Конкурентная валидность ЭРА: сопоставление с инструментами Hogan (HPI, HDS, MVPI)', meta: 'BITOBE Research · Методический отчёт · 42 с.', href: '/contact' },
  { year: '2024', title: 'Паттерны выгорания топ-менеджеров: данные 5 000+ профилей', meta: 'Лагутина С., Боровикова Н. · BITOBE White Paper · 28 с.', href: '/contact' },
  { year: '2023', title: '16 мотиваторов российских лидеров: кросс-секционное исследование 2020–2023', meta: 'BITOBE Research · Отраслевой бенчмарк · 36 с.', href: '/contact' },
  { year: '2023', title: 'Практика преемственности: методологические выводы из 50 кейсов', meta: 'Боровикова Н. · Журнал HR-практики · 18 с.', href: '/contact' },
  { year: '2022', title: 'Стрессовые паттерны C-level: как распознать до того, как сломается', meta: 'Белоуско Е. · Подкаст BITOBE о лидерстве · транскрипт 12 с.', href: '/contact' },
];
