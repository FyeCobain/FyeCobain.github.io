import Project from './Project';
import Slider from '../ui/Slider';

function Projects({ setOverlayImg, language, strings }){
  const projects = [
    {
      title: 'Dracula Junior',
      url: 'https://marketplace.visualstudio.com/items?itemName=FyeCobain.dracula-junior',
      image: 'dracula_junior.png',
      footer: language === 'es' ? 'Tema de Visual Studio Code' : 'Visual Studio Code theme',
      language: null
    },
    {
      title: 'ITCH Binario',
      url: 'https://apkcombo.com/es/itch-binario/com.isc.itchbinario/',
      image: 'itch_binario.png',
      footer: language === 'es' ? 'Videojuego' : 'Game',
      language: 'Android'
    },
    {
      title: 'Rozen Maiden',
      url: '/',
      image: 'rozen_maiden.jpg',
      footer: language === 'es' ? 'Página con APIs' : 'APIs page',
      language: 'vanilla PHP'
    },
    {
      title: language === 'es' ? 'Constructora' : 'Construction co.',
      url: '/',
      image: 'constr.png',
      footer: language === 'es' ? 'Página con slider' : 'Page with slider',
      language: 'vanilla JS'
    },
    {
      title: 'AHKlicker',
      url: 'https://github.com/FyeCobain/AHKlicker',
      image: `ahklicker_${language}.png`,
      footer: 'Auto clicker',
      language: 'AutoHotkey'
    },
    {
      title: 'Scenes Getter',
      url: '/',
      image: 'scenes_getter.png',
      footer: language === 'es' ? 'Extractor de escenas' : 'Scenes extractor',
      language: 'Python'
    }
  ]

  return(
    <section id="projects" className="projects">
      <h2>{strings.myProjects}</h2>

      <Slider elements=
      {
        projects.map((project, index) => <div className="project" key={index}><Project setOverlayImg={setOverlayImg} language={language} projectData={project} /></div>)
      } 
      />

      <ul className="projects-container">
      {
        projects.map((project, index) => <li className="project" key={index}><Project setOverlayImg={setOverlayImg} language={language} projectData={project} /></li>)
      }
      </ul>

    </section>
  );
}
  
export default Projects;