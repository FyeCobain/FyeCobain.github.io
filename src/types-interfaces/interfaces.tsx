export interface ImagesContextValueInterface {
  images: string[]
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  setImages: (images: string[]) => void
}
