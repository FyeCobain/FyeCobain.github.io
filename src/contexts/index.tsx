import { createContext } from 'react'
import { type ImageContextValueInterface, type stringNullable } from '@app/types-interfaces'

const defaultImageContextValue: ImageContextValueInterface = {
  image: null,
  setImage: (_image: stringNullable) => {},
}

export const ImageContext = createContext<ImageContextValueInterface>(defaultImageContextValue)
