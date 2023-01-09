import foto from '../img/endlc.jpg';
import { GiDiploma } from 'react-icons/gi';
import { SiCsharp } from 'react-icons/si';
import { SlBubble } from 'react-icons/sl';

function Header({ globalStrings, strings}){
  return(
    <div className="container">
      <div className="header">
        <p className="header__hello"><span>{strings.helloPart1}</span>{strings.helloPart2}</p>
        <h1 className="header__dev-name">{globalStrings.devName}</h1>
        <div className="header__photo">
          <img className='photo' src={foto} alt={strings.photoAlt} width="200" height="200" />
          <SlBubble className='bubble' />
          <p className="welcome">{strings.welcome}</p>
        </div>
        <div className="header__dev-title">
          <GiDiploma className='dev-title-icon' />
          <p>{strings.devTitle}</p>
        </div>
        <div className="header__dev-work">
          <SiCsharp className="dev-work-icon" />
          <p>{strings.devWork}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;