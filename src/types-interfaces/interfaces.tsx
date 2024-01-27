import type { MessageIconType, ElementOnClick } from '.'

export interface ImagesContextValueInterface {
  images: string[]
  currentImageIndex: number
  maxHeight: boolean
  setCurrentImageIndex: (index: number) => void
  setImages: (images: string[]) => void
  setMaxHeight: (maxHeight: boolean) => void
}

export interface MessageContextValueInterface {
  type: MessageIconType
  title: string | null
  text: string | null
  onOK: any
  setMessage: (type: MessageIconType, title?: string | null, text?: string | null, onOK?: any) => void
}

export interface ContentSliderContextValueInterface {
  onClicks: ElementOnClick[]
  addOnClick: (newOnClick: ElementOnClick) => void
}

export interface ContentSliderPropsInterface {
  className: string
  children: React.ReactNode
  phoneCols?: number
  tabletCols?: number
  laptopCols?: number
}

export interface DragCallbacksInterface {
  onUpDrag: (() => void) | null
  onRightDrag: (() => void) | null
  onDownDrag: (() => void) | null
  onLeftDrag: (() => void) | null
}

export interface ProjectInterface {
  title: string
  link: string | null
  description: string
  image: string
  slider_images: string[]
  maxHeight: boolean
  languages: string[]
}

export interface ReviewInterface {
  id: number
  projectTitle: string
  reviewerPhoto: string | null
  reviewerName: string
  reviewerCountry: string | null
  reviewText: string
  starsQuantity: number
}

export interface SliderElement {
  htmlElement: HTMLDivElement
  initialLeftPercentage: number
  currentLeftPixels: number
}
