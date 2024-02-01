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

export function copyText(text: string, onFulfilledCallback: any, onRejectCallback?: any, onErrorCallback?: any) {
  try {
    navigator.clipboard.writeText(text)
      .then(res => onFulfilledCallback(res))
      .catch(err => onRejectCallback !== undefined ? onRejectCallback(err) : '')
  }
  catch (err) {
    if (onErrorCallback !== undefined)
      onErrorCallback(err)
  }
}

export function getQueryParam(paramName: string): string | null {
  const queryParams: URLSearchParams = new URLSearchParams(window.location.search)
  return queryParams.get(paramName)
}
