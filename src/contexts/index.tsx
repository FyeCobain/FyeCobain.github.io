import { createContext } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'

const defaultImageContextValue: ImagesContextValueInterface = {
  images: [],
  setImages: (_images: string[]) => {},
}

export const ImageContext = createContext<ImagesContextValueInterface>(defaultImageContextValue)
