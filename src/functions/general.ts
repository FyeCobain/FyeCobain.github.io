export function isURL(str: string): boolean {
  return str.trim().toLowerCase().startsWith('http')
}

// Returns the 'clientX' value of the mouse or touch event
export function getClientX(event: React.MouseEvent | React.TouchEvent) {
  if ('clientX' in event)
    return event.clientX
  else
    return event.touches[0].clientX
}

// Returns the 'clientY' value of the mouse or touch event
export function getClientY(event: React.MouseEvent | React.TouchEvent) {
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
    document.body.classList.add('overflow-hidden')
  }
  else if (!on && element.classList.contains('cursor-grab')) {
    element.classList.remove('no-transitions')
    element.classList.remove('cursor-grab')
    document.body.classList.remove('overflow-hidden')
  }
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
