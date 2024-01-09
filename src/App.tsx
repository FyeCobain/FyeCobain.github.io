import { useState } from 'react'
import ImagesOverlay from './components/ImagesOverlay'
import Nav from './components/Nav'
import Header from './components/header/Header'
import AboutMe from './components/aboutMe/AboutMe'
import { ImageContext } from './contexts'
import { type ImagesContextValueInterface } from './types-interfaces'

function App() {
  // Image state context for the image oberlay
  const [ images, setImages ] = useState<string[]>([])
  const imageState: ImagesContextValueInterface = {
    images,
    setImages,
  }

  return (
    <ImageContext.Provider value={ imageState }>
      <ImagesOverlay />
      <Nav />
      <Header />
      <AboutMe />
    </ImageContext.Provider>
  )
}

export default App
