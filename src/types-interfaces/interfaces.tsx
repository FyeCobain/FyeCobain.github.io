export interface ImagesContextValueInterface {
  images: string[]
  currentImageIndex: number
  maxHeight: boolean
  setCurrentImageIndex: (index: number) => void
  setImages: (images: string[]) => void
  setMaxHeight: (maxHeight: boolean) => void
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

export interface ContentSliderPropsInterface {
  className: string
  children: React.ReactNode
}
