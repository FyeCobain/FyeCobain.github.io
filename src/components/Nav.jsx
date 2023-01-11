import { MdOutlineLanguage } from 'react-icons/md';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
import { ImStarHalf } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';
import { isInViewport } from '../js/functions';

// Variable para activar / desactivar la verificación de scroll
let checkScrollState = true;

// Elementos para vigilar el scroll
const header = {
  iconId: '#icon-home',
  elementId: '#header'
}
const about_me = {
  iconId: '#icon-user',
  elementId: '#about-me'
}
const projects = {
  iconId: '#icon-card',
  elementId: '#projects'
}
const testimonials = {
  iconId: '#icon-star',
  elementId: '#testimonials'
}  
const contact = {
  iconId: '#icon-email',
  elementId: '#contact'
}

// Hacer scroll al presionar un botón de la navegación
function scroll(elementObject){
  // Desactivar estado de checkScroll
  checkScrollState = false;

  // Realizar scroll
  document.querySelector(elementObject.elementId).scrollIntoView();

  //Reactivar scroll con un timer
  setTimeout(() => {
    checkScrollState = true;
    checkScroll();
  }, 250);
}

//Verificar scroll al cargarse la página
document.addEventListener('DOMContentLoaded', checkScroll);

// Verificar scroll con cada evento de scroll en la ventana
window.addEventListener('scroll', checkScroll);

// Verificar si una sección está en el viewport para resaltar su icono
function checkScroll(){
  //Si la verificación de scroll está desactivada, salir
  if(!checkScrollState)
    return;

  const currentIcon = document.querySelector('.current');
  let newCurrentIcon = null;

  //Verificar si una sección está dentro del viewport (de abajo hacia arriba)
  if(isInViewport(contact.elementId))
    newCurrentIcon = document.querySelector(contact.iconId)
  else if(isInViewport(testimonials.elementId))
    newCurrentIcon = document.querySelector(testimonials.iconId)
  else if(isInViewport(projects.elementId))
    newCurrentIcon = document.querySelector(projects.iconId)
  else if(isInViewport(about_me.elementId))
    newCurrentIcon = document.querySelector(about_me.iconId)
  else if(isInViewport(header.elementId))
    newCurrentIcon = document.querySelector(header.iconId)

  if(currentIcon && currentIcon != newCurrentIcon)
    currentIcon.classList.remove('current');
  if(newCurrentIcon)
    newCurrentIcon.classList.add('current');
}

function Nav({ changeLanguage }){
  return(
    <div className="nav">
      <div className="nav__icons">
      <div className="nav__icon nav__language">
          <MdOutlineLanguage onClick={changeLanguage} />
        </div>
        <div id="icon-home" className="nav__icon">
          <AiOutlineHome onClick={() => scroll(header)} />
        </div>
        <div id="icon-user" className="nav__icon">
          <AiOutlineUser onClick={() => scroll(about_me)} />
        </div>
        <div id="icon-card" className="nav__icon">
          <BsCardChecklist onClick={() => scroll(projects)} />
        </div>
        <div id="icon-star" className="nav__icon">
          <ImStarHalf onClick={() => scroll(testimonials)} />
        </div>
        <div id="icon-email" className="nav__icon">
          <HiOutlineMail onClick={() => scroll(contact)} />
        </div>
      </div>
    </div>
  );
}

export default Nav;