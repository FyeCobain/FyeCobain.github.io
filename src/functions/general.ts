export function isURL(str: string): boolean {
  return str.trim().toLowerCase().startsWith('http')
}
