import { type stringNullable } from './types'

export interface ImageContextValueInterface {
  image: stringNullable
  setImage: (image: stringNullable) => void
}
