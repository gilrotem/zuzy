export const locales = ['he', 'en', 'ru', 'ar', 'fr', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'he'

export const rtlLocales: Locale[] = ['he', 'ar']

export const isRTL = (locale: Locale): boolean => rtlLocales.includes(locale)

export const localeNames: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
  ru: 'Русский',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español',
}
