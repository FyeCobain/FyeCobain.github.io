// Returns true if the element or some ancestor is an anchor element
export function isAnAnchor(element: HTMLElement): boolean {
  if (element.tagName === 'A') return true

  let parentNode: HTMLElement | null = element.parentNode as HTMLElement
  while (parentNode !== null) {
    if (parentNode.tagName === 'A')
      return true
    parentNode = parentNode.parentNode as HTMLElement
  }
  return false
}

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

// Returns the 'clientX' value of the mouse or touch event
export function getClientX(event: React.MouseEvent | React.TouchEvent): number {
  if ('clientX' in event)
    return event.clientX
  else
    return event.touches[0].clientX
}

// Returns the 'clientY' value of the mouse or touch event
export function getClientY(event: React.MouseEvent | React.TouchEvent): number {
  if ('clientY' in event)
    return event.clientY
  else
    return event.touches[0].clientY
}

// Adds or removes the 'no-transitions' and 'pointer-grab' classes
export function setGrabClasses(element: HTMLElement, on: boolean) {
  if (on && !element.classList.contains('cursor-grab')) {
    element.classList.add('no-transitions')
    element.classList.add('cursor-grab')
    document.documentElement.classList.add('overscroll-none')
  }
  else if (!on && element.classList.contains('cursor-grab')) {
    element.classList.remove('no-transitions')
    element.classList.remove('cursor-grab')
    document.documentElement.classList.remove('overscroll-none')
  }
}
