export function isEnglish(language: string): boolean {
  return language.trim().toLowerCase().startsWith('en')
}
