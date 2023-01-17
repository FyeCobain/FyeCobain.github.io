import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import AboutMe from './about-me/AboutMe';
import Projects from './projects/Projects';
import Reviews from './reviews/Reviews';
import Contact from './Contact';
import ImagesOverlay from './ui/ImagesOverlay';
import { isInViewport, itsBellow } from '../js/functions';
import { globalValues, esStrings, enStrings, aboutMe, projects, reviews, contact } from '../js/variables';

// Aplicación principal
const App = function(){
  // Hook para mostrar una imagen en overlay
  const [overlayImg, setOverlayImg] = useState(null);

  // Al iniciar la aplicación, ocultar secciones que estén bajo el viewport
  document.addEventListener('DOMContentLoaded', () => {
    const aboutMeElement = document.querySelector(aboutMe.elementId);
    const projectsElement = document.querySelector(projects.elementId);
    const reviewsElement = document.querySelector(reviews.elementId);
    const contactElement = document.querySelector(contact.elementId);

    if(!isInViewport(aboutMeElement) && itsBellow(aboutMeElement))
      aboutMeElement.classList.add('hide');
    if(!isInViewport(projectsElement) && itsBellow(projectsElement))
      projectsElement.classList.add('hide');
    if(!isInViewport(reviewsElement) && itsBellow(reviewsElement))
      reviewsElement.classList.add('hide');
    if(!isInViewport(contactElement) && itsBellow(contactElement))
      contactElement.classList.add('hide');
  });

  //Hooks para el idioma del sitio web
  const [language, setLanguage] = useState('es');
  const [strings, setStrings] = useState(language === 'es' ? esStrings : enStrings)

  //Establecer el título y la descripción de la página web
  document.title = strings.pageTitle;
  document.querySelector('meta[name="description"]').innerText = strings.pageDescription;

  //Función para cambiar el idioma de la página web
  function changeLanguage(){
    switch(language){
      case 'en':
        setLanguage('es')
        setStrings(esStrings);
        break;
      default:
        setLanguage('en')
        setStrings(enStrings);
    }
  }

  return(
    <div className="App">
      {overlayImg !== null ? <ImagesOverlay img={overlayImg} setOverlayImg = {setOverlayImg} /> : <></>}
      <Nav changeLanguage={changeLanguage} />
      <Header
        language={language}
        globalValues={globalValues}
        strings={strings}
      />
      <AboutMe
        language={language}
        globalValues={globalValues}
        strings={strings}
        setOverlayImg={setOverlayImg}
      />
      <Projects
        language={language}
        globalValues={globalValues}
        strings={strings}
        setOverlayImg={setOverlayImg}
      />
      <Reviews
        language={language}
        globalValues={globalValues}
        strings={strings}
        setOverlayImg={setOverlayImg}
      />
      <Contact
        globalValues={globalValues}
        strings={strings}
      />
    </div>
  );
}

export default App;