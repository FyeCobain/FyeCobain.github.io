import { createContext } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'

const defaultImagesContextValue: ImagesContextValueInterface = {
  images: [],
  currentImageIndex: 0,
  maxHeight: false,
  setCurrentImageIndex: (_index: number) => {},
  setImages: (_images: string[]) => {},
  setMaxHeight: (_maxHeight: boolean) => {},
}

export const ImagesContext = createContext<ImagesContextValueInterface>(defaultImagesContextValue)
