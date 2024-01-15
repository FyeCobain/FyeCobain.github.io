export interface ImagesContextValueInterface {
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  setImages: (images: string[]) => void
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
  languages: string[]
}
