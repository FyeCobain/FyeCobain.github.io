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
