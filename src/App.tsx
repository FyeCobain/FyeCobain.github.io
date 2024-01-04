import ImageOverlay from './components/ImageOverlay'
import Nav from './components/Nav'
import Header from './components/header/Header'
import AboutMe from './components/aboutMe/AboutMe'
import { ImageContext } from './contexts'

function App() {
  return (
    <ImageContext.Provider value={ null }>
      <ImageOverlay />
      <Nav />
      <Header />
      <AboutMe />
    </ImageContext.Provider>
  )
}

export default App
