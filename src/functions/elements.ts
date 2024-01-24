// Returns the element or some ancestor that is of the given 'tagName' type
export function getElementOfType<T extends HTMLElement | null>(element: HTMLElement | null, tagName: string): T {
  if (element === null) return element as T

  tagName = tagName.trim().toUpperCase()
  if (element.tagName === tagName) return element as T

  let parentElement: T = element.parentElement as T
  while (parentElement !== null) {
    if (parentElement.tagName === tagName)
      return parentElement
    parentElement = parentElement.parentElement as T
  }

  return parentElement
}

// Returns true if the element or an ancestor has the class gived
export function hasClass(element: HTMLElement, className: string): boolean {
  if (element.classList.contains(className)) return true

  let parentElement: HTMLElement | null = element.parentElement
  while (parentElement !== null) {
    if (parentElement.classList.contains(className))
      return true
    parentElement = parentElement.parentElement
  }

  return false
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
