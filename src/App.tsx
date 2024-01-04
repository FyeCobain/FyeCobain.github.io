import ImageOverlay from './components/ImageOverlay'
import Nav from './components/Nav'
import Header from './components/header/Header'
import AboutMe from './components/aboutMe/AboutMe'
import { ImageContext } from './contexts'
import { useState } from 'react'
import { type stringNullable, type ImageContextValueInterface } from './types-interfaces'

function App() {
  const [ image, setImage ] = useState<stringNullable>(null)
  const imageState: ImageContextValueInterface = {
    image,
    setImage,
  }

  return (
    <ImageContext.Provider value={ imageState }>
      <ImageOverlay />
      <Nav />
      <Header />
      <AboutMe />
    </ImageContext.Provider>
  )
}

export default App
