import Abilities from './Abilities';
import githubContributions from '../../img/github.png';
import { BiMedal } from 'react-icons/bi';
import { MdOutlineSchool } from 'react-icons/md';
import { FaFlagUsa, FaPhp } from 'react-icons/fa';
import { GiPodiumWinner } from 'react-icons/gi';
import { VscFileBinary } from 'react-icons/vsc';
import { AiOutlineLaptop, AiOutlineHtml5 } from 'react-icons/ai';

function Me({ language, globalValues, strings }){
  let topOneAHKP = null;
  let ghContributionsP = null;
  if(language === 'es'){
    topOneAHKP = <p>Programador <a href="https://www.freelancer.com/freelancers/mexico/autohotkey" target="_blank" rel="noopener noreferrer">#1</a> de <a href="https://www.autohotkey.com/" target="_blank" rel="noopener noreferrer">AutoHotkey</a> en América Latina</p>
    ghContributionsP = <p>Contribuciones en <a href={globalValues.devGitHub} target="_blank" rel="noopener noreferrer">Github</a> ({strings.includingPrivate})</p>
  }
  else{
    topOneAHKP = <p><a href="https://www.freelancer.com/freelancers/mexico/autohotkey" target="_blank" rel="noopener noreferrer">#1</a> <a href="https://www.autohotkey.com/" target="_blank" rel="noopener noreferrer">AutoHotkey</a> programmer in Latin America</p>
    ghContributionsP = <p><a href={globalValues.devGitHub} target="_blank" rel="noopener noreferrer">Github</a> Contributions ({strings.includingPrivate})</p>
  }

  const generalAbilities = ['Android (Java)', 'Unity', 'GameMaker: Studio', language === 'es' ? 'Automatización' : 'Automation', 'Web Scraping', 'Git + GitHub']
  const desktopAbilities = ['Python', 'Java', 'Ruby', 'C#', 'AutoHotkey', 'AutoIt']
  const frontendAbilities = ['HTML5', 'JavaScript > TypeScript', 'CSS > SASS', 'Node.js > Gulp', 'Angular', 'React', language==='es' ? 'Consumo de APIs / Endpoints' : 'API consumption']
  const backendAbilities = ['PHP > Composer', 'Node.js', 'Django', 'MySQL', 'Firebase', 'MVC', 'APIs / Endpoints']

  return(
    <section id="about-me" className="about-me">
      <h2>{strings.aboutMe}</h2>
      <ul className="about-me__info">
        <li className="about-me__info-container experience">
          <BiMedal className="icon" />
          <p>{language === 'es' ? 'Programador con 6+ años de experiencia' : 'Developer with 6+ years of experience'}</p>
        </li>
        <li className="about-me__info-container alma-mater">
          <MdOutlineSchool className="icon" />
          <p>{language === 'es' ? 'Egresado del ' : 'Graduated from '}<a href="http://chilpancingo.tecnm.mx/" target="_blank" rel="noreferrer">Tecnológico Nacional de México</a></p>
        </li>
        <li className="about-me__info-container languages">
          <FaFlagUsa className="icon" />
          <p>{language === 'es' ? 'Inglés Intermedio-Alto (B2)' : 'B2 English'}</p>
        </li>
        <li className="about-me__info-container top-one">
          <GiPodiumWinner className="icon" />
          {topOneAHKP}
        </li>
      </ul>

      <div className="abilities-container">
        <h3>{strings.domain}</h3>
        <div className="abilities-grid">
          <Abilities
            className="general"
            heading="General"
            icon={<VscFileBinary className="icon" />}
            abilities = {generalAbilities}
          />

          <Abilities
            className="desktop"
            heading="Desktop"
            icon={<AiOutlineLaptop className="icon" />}
            abilities = {desktopAbilities}
          />

          <Abilities
            className="frontend"
            heading="Frontend"
            icon={<AiOutlineHtml5 className="icon" />}
            abilities = {frontendAbilities}
          />

          <Abilities
            className="backend"
            heading="Backend"
            icon={<FaPhp className="icon" />}
            abilities = {backendAbilities}
          />
        </div>
      </div>

    <div className="resume-container">
      <div className="abilities-chart">
        <h3>{strings.abilitiesResume}</h3>
        <img src={require(`../../img/${language === 'es' ? 'habilidades' : 'abilities'}.png`)} alt={strings.abilitiesChartAlt}></img>
      </div>
      <div className="github-graph">
        <img src={githubContributions} alt={strings.gitHubGraphAlt} />
        {ghContributionsP}
      </div>

    </div>

    </section>
  );
}
  
export default Me;