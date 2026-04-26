export type NavKey =
  | 'home'
  | 'about'
  | 'scenarios'
  | 'reports'
  | 'methodology'
  | 'cases'
  | 'certification'
  | 'experts'
  | 'materials'
  | 'contact'
  | 'documents';

export interface NavLink {
  key: NavKey;
  label: string;
  href: string;
}

export const headerLinks: NavLink[] = [
  { key: 'scenarios', label: 'Задачи', href: '/scenarios' },
  { key: 'methodology', label: 'Методология', href: '/methodology' },
  { key: 'reports', label: 'Отчёты', href: '/reports' },
  { key: 'cases', label: 'Кейсы', href: '/cases' },
  { key: 'experts', label: 'Эксперты', href: '/experts' },
];

export const footerProductLinks: NavLink[] = [
  { key: 'scenarios', label: 'Сценарии применения', href: '/scenarios' },
  { key: 'methodology', label: 'Методология', href: '/methodology' },
  { key: 'reports', label: 'Отчёты', href: '/reports' },
  { key: 'about', label: 'Что такое ЭРА', href: '/about' },
];

export const footerCompanyLinks: NavLink[] = [
  { key: 'cases', label: 'Кейсы', href: '/cases' },
  { key: 'experts', label: 'Эксперты', href: '/experts' },
  { key: 'certification', label: 'Сертификация', href: '/certification' },
  { key: 'materials', label: 'Исследования', href: '/materials' },
];

export interface ContactItem {
  label: string;
  href: string;
  external?: boolean;
}

export const footerContacts: ContactItem[] = [
  { label: 'era@bitobe.ru', href: 'mailto:era@bitobe.ru' },
  { label: 'Telegram: @era_lider', href: 'https://t.me/era_lider', external: true },
  { label: 'bitobe.ru ↗', href: 'https://bitobe.ru', external: true },
  { label: 'Санкт-Петербург', href: '/contact' },
];

export const footerLegalLinks: NavLink[] = [
  { key: 'documents', label: 'Политика конфиденциальности', href: '/documents' },
  { key: 'documents', label: 'Обработка ПДн', href: '/documents' },
  { key: 'documents', label: 'Документация', href: '/documents' },
];
