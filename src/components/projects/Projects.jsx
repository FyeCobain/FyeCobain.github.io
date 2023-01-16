import Project from './Project';
import Slider from '../ui/Slider';

function Projects({ setOverlayImg, language, strings }){
  const projects = [
    {
      title: 'Dracula Junior',
      url: 'https://marketplace.visualstudio.com/items?itemName=FyeCobain.dracula-junior',
      image: 'dracula_junior.png',
      footer: language === 'es' ? 'Tema de Visual Studio Code' : 'Visual Studio Code theme',
    },
    {
      title: 'ITCH Binario',
      url: 'https://apkcombo.com/es/itch-binario/com.isc.itchbinario/',
      image: 'itch_binario.png',
      footer: language === 'es' ? 'Videojuego para Android' : 'Android Videogame',
    },
    {
      title: 'Rozen Maiden Info',
      url: '/',
      image: 'rozen_maiden.jpg',
      footer: language === 'es' ? 'Página vanilla PHP con APIs' : 'Vanilla PHP APIs page',
    },
    {
      title: language === 'es' ? 'Página de constructora' : 'Construction company',
      url: '/',
      image: 'constr.png',
      footer: language === 'es' ? 'Página con slider en vanilla JavaScript' : 'Slider vanilla JavaScript page',
    },
    {
      title: 'AHKlicker',
      url: 'https://github.com/FyeCobain/AHKlicker',
      image: `ahklicker_${language}.png`,
      footer: language === 'es' ? 'Auto clicker con AutoHotkey' : 'AutoHotkey autoclicker',
    },
    {
      title: 'Battery Monitor',
      url: 'https://github.com/FyeCobain/Battery-monitor',
      image: 'battery_monitor.png',
      footer: language === 'es' ? 'Monitor de batería para Windows (Python)' : 'Windows Battery monitor (Python)',
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