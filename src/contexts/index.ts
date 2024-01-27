import { createContext } from 'react'
import type { ImagesContextValueInterface, ContentSliderContextValueInterface, ElementOnClick, MessageContextValueInterface, MessageIconType } from '@app/types-interfaces'

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

// Message overlay context
const defaultMessageContextValue: MessageContextValueInterface = {
  type: null,
  title: null,
  text: null,
  onOK: () => {},
  setMessage: (_type: MessageIconType, _title?: string | null, _text?: string | null, _onOk?: any) => {},
}
export const MessageContext = createContext<MessageContextValueInterface>(defaultMessageContextValue)

// Content slider context
const defaultContentSliderContextValue: ContentSliderContextValueInterface = {
  onClicks: [],
  addOnClick: (_newOnClick: ElementOnClick) => {},
}
export const ContentSliderContext = createContext<ContentSliderContextValueInterface>(defaultContentSliderContextValue)
