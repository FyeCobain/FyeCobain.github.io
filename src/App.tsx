import { useState } from 'react'
import { ImagesContext } from './contexts'
import { type ImagesContextValueInterface } from './types-interfaces'
import ImagesOverlay from '@components/ImagesOverlay'
import Nav from '@components/Nav'
import Header from '@components/header/Header'
import AboutMe from '@components/aboutMe/AboutMe'
import Projects from '@components/projects/Projects'
import Reviews from '@components/reviews/Reviews'
import Contact from '@components/contact/Contact'

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

  return (
    <ImagesContext.Provider value={ imagesState }>
      <ImagesOverlay />
      <Nav />
      <Header />
      <AboutMe />
      <Projects />
      <Reviews />
      <Contact />
    </ImagesContext.Provider>
  )
}

export default App
