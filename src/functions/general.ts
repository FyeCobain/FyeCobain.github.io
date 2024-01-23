export function isPhoneSize(): boolean {
  return window.innerWidth <= 767
}

export function isTabletSize(): boolean {
  return window.innerWidth >= 768 && window.innerWidth <= 1023
}

export function isLaptopSize(): boolean {
  return window.innerWidth >= 1024 && window.innerWidth <= 1366
}

export function isDesktopSize(): boolean {
  return window.innerWidth >= 1367
}

export function isURL(str: string): boolean {
  return str.trim().toLowerCase().startsWith('http')
}
