import foto from '../img/endlc.jpg';
import { GiDiploma } from 'react-icons/gi';
import { SiCsharp } from 'react-icons/si';

function Header({ language, globalValues, strings }){
  return(
    <div className="container">
      <header id="header" className="header">
        <p className="header__hello"><span>{strings.helloPart1}</span>{strings.helloPart2}</p>
        <h1 className="header__dev-name">{globalValues.devName}</h1>
        <div className="header__photo">
          <img src={foto} alt={strings.photoAlt} className="photo" width="200" height="200" />
          <div className="bubble-container">
            <div className="bubble">
              <p>{strings.welcome}</p>
            </div>
          </div>
        </div>
        <div className={`header__dev-title ${language}`}>
          <GiDiploma className="dev-title-icon" />
          <p className="dev-title-text">{strings.devTitle}</p>
        </div>
        <div className={`header__dev-work ${language}`}>
          <SiCsharp className="dev-work-icon" />
          <p className="dev-work-text">{strings.devWork}</p>
        </div>
        <p className="header__welcome">{strings.welcome}</p>
      </header>
    </div>
  );
}

export default Header;