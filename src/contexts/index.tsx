import { createContext } from 'react'
import type { ImagesContextValueInterface, ContentSliderContextValueInterface, ElementOnClick } from '@app/types-interfaces'

// Images overlay context
const defaultImagesContextValue: ImagesContextValueInterface = {
  images: [],
  currentImageIndex: 0,
  maxHeight: false,
  setCurrentImageIndex: (_index: number) => {},
  setImages: (_images: string[]) => {},
  setMaxHeight: (_maxHeight: boolean) => {},
}
export const ImagesContext = createContext<ImagesContextValueInterface>(defaultImagesContextValue)

// Content slider context
const defaultContentSliderContextValue: ContentSliderContextValueInterface = {
  onClicks: [],
  addOnClick: (_newOnClick: ElementOnClick) => {},
}
export const ContentSliderContext = createContext<ContentSliderContextValueInterface>(defaultContentSliderContextValue)
