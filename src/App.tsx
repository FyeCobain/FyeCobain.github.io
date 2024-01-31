import { useState, Suspense, lazy, useEffect } from 'react'
import { ImagesContext, MessageContext } from './contexts'
import type { MessageContextValueInterface, ImagesContextValueInterface, MessageIconType } from './types-interfaces'
import ImagesOverlay from './components/ImagesOverlay'
import Nav from '@components/Nav'
import Header from '@components/header/Header'
import AboutMe from '@components/aboutMe/AboutMe'
import Projects from '@components/projects/Projects'
import Reviews from '@components/reviews/Reviews'
import Contact from '@components/contact/Contact'
import Footer from '@components/Footer'
const MessageOverlay = lazy(async() => await import('@components/MessageOverlay'))

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

  useEffect(() => {
    // Toggling the 'overflow-hidden' and 'overscroll-none' classes for the document
    if (imagesState.images.length > 0 || messageState.type !== null) {
      if (imagesState.images.length > 0)
        document.documentElement.classList.add('overflow-hidden')
      document.documentElement.classList.add('overscroll-none')
    }
    else {
      document.documentElement.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overscroll-none')
    }
  }, [
    imagesState.images,
    messageState.type,
  ])

  return (
    <ImagesContext.Provider value={ imagesState }>
      <MessageContext.Provider value={ messageState }>
        <ImagesOverlay />
        {
          messageState.type !== null && (
            <Suspense>
              <MessageOverlay />
            </Suspense>
          )
        }
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
