import { BiMedal } from 'react-icons/bi';
import { MdOutlineSchool } from 'react-icons/md';
import { FaFlagUsa, FaPhp } from 'react-icons/fa';
import { GiPodiumWinner } from 'react-icons/gi';
import { BsCheck } from 'react-icons/bs';
import { VscFileBinary } from 'react-icons/vsc';
import { AiOutlineLaptop, AiOutlineHtml5 } from 'react-icons/ai';

function Me({ language, strings }){
  let topOneAHKP = null;
  if(language === 'es')
    topOneAHKP = <p>Programador <span>#1</span> de <a href="https://www.autohotkey.com/" target="_blank" rel="noopener noreferrer">AutoHotkey</a> en América Latina</p>
  else
    topOneAHKP = <p><span>#1</span> <a href="https://www.autohotkey.com/" target="_blank" rel="noopener noreferrer">AutoHotkey</a> programmer in Latin America</p>

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
          <p>{language === 'es' ? 'Egresado del ' : 'Graduated from '}<a href="http://chilpancingo.tecnm.mx/" target="_blank">Tecnológico Nacional de México</a></p>
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
        <h3>{strings.myAbilities}</h3>

        <div className="abilities general">
          <div className="general__heading">
            <h4>General</h4>
            <VscFileBinary />
          </div>
          <ul>
            <li>
              <BsCheck />
              Android (Java)
            </li>
            <li>
              <BsCheck />
              Unity
            </li>
            <li>
              <BsCheck />
              GameMaker: Studio
            </li>
            <li>
              <BsCheck />
              {language === 'es' ? 'Automatización' : 'Automation'}
            </li>
            <li>
              <BsCheck />
              Web Scraping
            </li>
          </ul>
        </div>

        <div className="abilities desktop">
          <div className="desktop__heading">
            <h4>Desktop</h4>
            <AiOutlineLaptop />
          </div>
          <ul>
            <li>
              <BsCheck />
              AutoHotkey
            </li>
            <li>
              <BsCheck />
              Python
            </li>
            <li>
              <BsCheck />
              Java
            </li>
            <li>
              <BsCheck />
              C#
            </li>
          </ul>
        </div>

        <div className="abilities frontend">
          <div className="desktop__frontend">
            <h4>Frontend</h4>
            <AiOutlineHtml5 />
          </div>
          <ul className="abilities__fontend">
            <li>
              <BsCheck />
              HTML 5
            </li>
            <li>
              <BsCheck />
              JavaScript &#8827; TypeScript
            </li>
            <li>
              <BsCheck />
              CSS &#8827; SASS
            </li>
            <li>
              <BsCheck />
              Gulp
            </li>
            <li>
              <BsCheck />
              Angular
            </li>
            <li>
              <BsCheck />
              React.js
            </li>
            <li>
              <BsCheck />
              { language === 'es' ? 'Consumo de APIs / Endpoints' : 'API consumption'}
            </li>
          </ul>
        </div>
        
        <div className="abilities backend">
          <div className="desktop__backend">
            <h4>Backend</h4>
            <FaPhp />
          </div>
          <ul className="abilities__backend">
            <li>
              <BsCheck />
              PHP
            </li>
            <li>
              <BsCheck />
              Django
            </li>
            <li>
              <BsCheck />
              Node.js
            </li>
            <li>
              <BsCheck />
              MySQL
            </li>
            <li>
              <BsCheck />
              FireBase
            </li>
            <li>
              <BsCheck />
              MVC
            </li>
            <li>
              <BsCheck />
              APIs / Endpoints
            </li>
          </ul>
        </div>
        
      </div>
    </section>
  );
}
  
export default Me;