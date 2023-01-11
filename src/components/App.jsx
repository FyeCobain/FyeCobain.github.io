import { useState } from 'react';
import { globalStrings, esStrings, enStrings } from '../js/variables';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Me from './Me';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';

//Aplicación principal
const App = function(){
  //Hooks para el idioma del sitio web
  const [language, setLanguage] = useState('es');
  const [strings, setStrings] = useState(language == 'es' ? esStrings : enStrings)

  //Establecer el título y la descripción de la página web
  document.querySelector('meta[name="description"]').content = strings.pageTitle;
  document.querySelector('title').innerText = strings.pageDescription;

  //Función para cambiar el idioma de la página web
  function changeLanguage(){
    switch(language){
      case 'es':
        setLanguage('en')
        setStrings(enStrings);
        break;
      case 'en':
        setLanguage('es')
        setStrings(esStrings);
    }
  }

  return(
    <div className="App">
      <Nav changeLanguage={changeLanguage} />
      <Header
        language={language}
        globalStrings={globalStrings}
        strings={strings}
      />
      <Me />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;