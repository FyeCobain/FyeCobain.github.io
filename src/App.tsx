import { useState } from 'react'
import { ImagesContext, MessageContext } from './contexts'
import type { MessageContextValueInterface, ImagesContextValueInterface, MessageIconType } from './types-interfaces'
import MessageOverlay from '@components/MessageOverlay'
import ImagesOverlay from '@components/ImagesOverlay'
import Nav from '@components/Nav'
import Header from '@components/header/Header'
import AboutMe from '@components/aboutMe/AboutMe'
import Projects from '@components/projects/Projects'
import Reviews from '@components/reviews/Reviews'
import Contact from '@components/contact/Contact'
import Footer from '@components/Footer'

function App() {
  // Image state context for the image overlay
  const [ images, setImages ] = useState<string[]>([])
  const [ currentImageIndex, setCurrentImageIndex ] = useState<number>(0)
  const [ maxHeight, setMaxHeight ] = useState<boolean>(false)
  const imagesState: ImagesContextValueInterface = {
    images,
    currentImageIndex,
    setImages,
    setCurrentImageIndex,
    maxHeight,
    setMaxHeight,
  }

  // Mesage state context for the message overlay
  const [ messageIconType, setMessageIconType ] = useState<MessageIconType>(null)
  const [ messageTitle, setMessageTitle ] = useState<string | null>(null)
  const [ messageText, setMessageText ] = useState<string | null>(null)
  const [ onOKCallback, setOnOKCallback ] = useState<any>()
  const messageState: MessageContextValueInterface = {
    type: messageIconType,
    title: messageTitle,
    text: messageText,
    onOK: onOKCallback,
    setMessage: (type: MessageIconType, title?: string | null, text?: string | null, onOK?: any) => {
      setMessageIconType(type)
      setMessageTitle(title !== undefined ? title : null)
      setMessageText(text !== undefined ? text : null)
      setOnOKCallback(() => onOK !== undefined ? onOK : null)
    },
  }

  return (
    <ImagesContext.Provider value={ imagesState }>
      <MessageContext.Provider value={ messageState }>
        <ImagesOverlay />
        <MessageOverlay />
        <Nav />
        <Header />
        <AboutMe />
        <Projects />
        <Reviews />
        <Contact />
        <Footer />
      </MessageContext.Provider>
    </ImagesContext.Provider>
  )
}

export default App
