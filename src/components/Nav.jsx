import { MdOutlineLanguage } from 'react-icons/md';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
import { ImStarHalf } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';

function Nav({ changeLanguage }){
  
  //TODO UTILIZAR hooks
  // Hacer scroll al presionar un botón
  function scroll(iconId, elementId){
    document.querySelector('.current').classList.remove('current');
    document.querySelector(elementId).scrollIntoView();
    document.querySelector(iconId).classList.add('current');
  }

  return(
    <div className="nav">
      <div className="nav__icons">
      <div className="nav__icon nav__language">
          <MdOutlineLanguage onClick={changeLanguage} />
        </div>
        <div id="icon-home" className="nav__icon current">
          <AiOutlineHome onClick={(e) => scroll('#icon-home', '#header')} />
        </div>
        <div id="icon-user" className="nav__icon">
          <AiOutlineUser onClick={(e) => scroll('#icon-user','#about-me')} />
        </div>
        <div id="icon-card" className="nav__icon">
          <BsCardChecklist onClick={(e) => scroll('#icon-card','#projects')} />
        </div>
        <div id="icon-start" className="nav__icon">
          <ImStarHalf onClick={(e) => scroll('#icon-start','#testimonials')} />
        </div>
        <div id="icon-email" className="nav__icon">
          <HiOutlineMail onClick={(e) => scroll('#icon-email','#contact')} />
        </div>
      </div>
    </div>
  );
}

export default Nav;