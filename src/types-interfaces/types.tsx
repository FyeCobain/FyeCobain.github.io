import type React from 'react'

export type DivNullable = HTMLDivElement | null

export type MouseOrTouchEvent = React.MouseEvent | React.TouchEvent

export type NullableMouseOrTouchEvent = MouseOrTouchEvent | null

export type MessageIconType = 'info' | 'warning' | 'error' | null

export interface ElementOnClick {
  element: HTMLElement | null
  onClick: ((e: React.MouseEvent | React.TouchEvent) => void) | null
}
