import Project from './Project';
import Slider from '../ui/Slider';

function Projects({ setOverlayImg, language, strings }){
  const projects = [
    {
      title: 'Dracula Junior',
      url: 'https://marketplace.visualstudio.com/items?itemName=FyeCobain.dracula-junior',
      image: 'dracula_junior.png',
      footer: language === 'es' ? 'Tema de Visual Studio Code' : 'Visual Studio Code theme',
      programmingLanguage: null
    },
    {
      title: 'Rozen Maiden',
      url: null,
      image: 'rozen_maiden.jpg',
      footer: language === 'es' ? 'Página con APIs' : 'Page with API',
      programmingLanguage: 'Vanilla PHP'
    },
    {
      title: 'ITCH Binario',
      url: 'https://apkcombo.com/es/itch-binario/com.isc.itchbinario/',
      image: 'itch_binario.png',
      footer: language === 'es' ? 'Videojuego' : 'Videogame',
      programmingLanguage: 'Android'
    },
    {
      title: language === 'es' ? 'Club Amaliche' : 'Amaliche Club',
      url: `https://play.google.com/store/apps/details?id=club.amaliche&hl=${language}`,
      image: `amaliche_${language}.png`,
      footer: language === 'es' ? 'App de chat' : 'Chatting App',
      programmingLanguage: 'Android'
    },
    {
      title: 'AHKlicker',
      url: 'https://github.com/FyeCobain/AHKlicker',
      image: `ahklicker_${language}.png`,
      footer: 'Auto clicker',
      programmingLanguage: 'AutoHotkey'
    },
    {
      title: 'Scenes Getter',
      url: null,
      image: 'scenes_getter.png',
      footer: language === 'es' ? 'Extractor de escenas' : 'Scenes extractor',
      programmingLanguage: 'Python'
    }
  ]

  return(
    <section id="projects" className="projects">
      <h2>{strings.myProjects}</h2>

      <Slider elements=
      {
        projects.map(({ title, url, image, footer, programmingLanguage }, index) => <div className="project" key={index}><Project setOverlayImg={setOverlayImg} language={language} title={title} url={url} image={image} footer={footer} programmingLanguage={programmingLanguage} /></div>)
      } 
      />

      <ul className="projects-container">
      {
        projects.map(({ title, url, image, footer, programmingLanguage }, index) => <li className="project" key={index}><Project setOverlayImg={setOverlayImg} language={language} title={title} url={url} image={image} footer={footer} programmingLanguage={programmingLanguage} /></li>)
      }
      </ul>

    </section>
  );
}
  
export default Projects;