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
        <div className="abilities-grid">
          <div className="abilities general">
            <div className="heading">
              <h4>General</h4>
              <VscFileBinary className="icon" />
            </div>
            <ul>
              <li>
                <BsCheck className="icon" />
                Android (Java)
              </li>
              <li>
                <BsCheck className="icon" />
                Unity
              </li>
              <li>
                <BsCheck className="icon" />
                GameMaker: Studio
              </li>
              <li>
                <BsCheck className="icon" />
                {language === 'es' ? 'Automatización' : 'Automation'}
              </li>
              <li>
                <BsCheck className="icon" />
                Web Scraping
              </li>
            </ul>
          </div>

          <div className="abilities desktop">
            <div className="heading">
              <h4>Desktop</h4>
              <AiOutlineLaptop className="icon" />
            </div>
            <ul>
              <li>
                <BsCheck className="icon" />
                AutoHotkey
              </li>
              <li>
                <BsCheck className="icon" />
                Python
              </li>
              <li>
                <BsCheck className="icon" />
                Java
              </li>
              <li>
                <BsCheck className="icon" />
                Ruby
              </li>
              <li>
                <BsCheck className="icon" />
                C#
              </li>
            </ul>
          </div>

          <div className="abilities frontend">
            <div className="heading">
              <h4>Frontend</h4>
              <AiOutlineHtml5 className="icon" />
            </div>
            <ul className="abilities__fontend">
              <li>
                <BsCheck className="icon" />
                HTML5
              </li>
              <li>
                <BsCheck className="icon" />
                JavaScript &#8827; TypeScript
              </li>
              <li>
                <BsCheck className="icon" />
                CSS &#8827; SASS
              </li>
              <li>
                <BsCheck className="icon" />
                Gulp
              </li>
              <li>
                <BsCheck className="icon" />
                Angular
              </li>
              <li>
                <BsCheck className="icon" />
                React.js
              </li>
              <li>
                <BsCheck className="icon" />
                { language === 'es' ? 'Consumo de APIs / Endpoints' : 'API consumption'}
              </li>
            </ul>
          </div>
        
          <div className="abilities backend">
            <div className="heading">
              <h4>Backend</h4>
              <FaPhp className="icon" />
            </div>
            <ul className="abilities__backend">
              <li>
                <BsCheck className="icon" />
                PHP
              </li>
              <li>
                <BsCheck className="icon" />
                Django
              </li>
              <li>
                <BsCheck className="icon" />
                Node.js
              </li>
              <li>
                <BsCheck className="icon" />
                MySQL
              </li>
              <li>
                <BsCheck className="icon" />
                FireBase
              </li>
              <li>
                <BsCheck className="icon" />
                MVC
              </li>
              <li>
                <BsCheck className="icon" />
                APIs / Endpoints
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
  
export default Me;