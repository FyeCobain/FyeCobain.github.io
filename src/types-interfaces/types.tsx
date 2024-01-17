export type DivNullable = HTMLDivElement | null

export interface ElementOnClick {
  element: HTMLElement | null
  onClick: ((e: React.MouseEvent | React.TouchEvent) => void) | null
}
