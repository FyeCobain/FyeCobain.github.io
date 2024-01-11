import { useState } from 'react'
import ImagesOverlay from './components/ImagesOverlay'
import Nav from './components/Nav'
import Header from './components/header/Header'
import AboutMe from './components/aboutMe/AboutMe'
import { ImagesContext } from './contexts'
import { type ImagesContextValueInterface } from './types-interfaces'

function App() {
  // Image state context for the image overlay
  const [ images, setImages ] = useState<string[]>([])
  const [ currentImageIndex, setCurrentImageIndex ] = useState<number>(0)
  const imagesState: ImagesContextValueInterface = {
    images,
    currentImageIndex,
    setImages,
    setCurrentImageIndex,
  }

  return (
    <ImagesContext.Provider value={ imagesState }>
      <ImagesOverlay />
      <Nav />
      <Header />
      <AboutMe />
    </ImagesContext.Provider>
  )
}

export default App
