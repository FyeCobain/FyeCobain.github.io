import { createContext } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'

const defaultImagesContextValue: ImagesContextValueInterface = {
  images: [],
  setImages: (_images: string[]) => {},
}

export const ImagesContext = createContext<ImagesContextValueInterface>(defaultImagesContextValue)
