import { MdOutlineLanguage } from 'react-icons/md';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { VscFolder } from 'react-icons/vsc';
import { ImStarHalf } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';
import { header, aboutMe, projects, testimonials, contact } from '../js/variables';
import { isInViewport, itsBellow } from '../js/functions';
 
// Variable para activar / desactivar la verificación de scroll
let checkScrollState = true;

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
  
  const aboutMeElement = document.querySelector(aboutMe.elementId);
  const projectsElement = document.querySelector(projects.elementId);
  const testimonialsElement = document.querySelector(testimonials.elementId);
  const contactElement = document.querySelector(contact.elementId);

  // Realizar efecto de aparición de las secciones
  let marginTop = 75;
  if(aboutMeElement)
    if(aboutMeElement.classList.contains('hide') && !itsBellow(aboutMeElement, marginTop))
      aboutMeElement.classList.add('unhide');
  if(projectsElement)
    if(projectsElement.classList.contains('hide') && !itsBellow(projectsElement, marginTop))
      projectsElement.classList.add('unhide');
  if(testimonialsElement)
    if(testimonialsElement.classList.contains('hide') && !itsBellow(testimonialsElement, marginTop))
      testimonialsElement.classList.add('unhide');
  if(contactElement)
    if(contactElement.classList.contains('hide') && !itsBellow(contactElement, marginTop))
      contactElement.classList.add('unhide');

  const currentIcon = document.querySelector('.current');
  let newCurrentIcon = null;

  // Verificar si una sección está dentro del viewport (de abajo hacia arriba)
  // Para resaltar el ícono asociado
  marginTop = 300;
  if(isInViewport(contactElement, marginTop))
    newCurrentIcon = document.querySelector(contact.iconId);
  else if(isInViewport(testimonialsElement, marginTop))
    newCurrentIcon = document.querySelector(testimonials.iconId);
  else if(isInViewport(projectsElement, marginTop))
    newCurrentIcon = document.querySelector(projects.iconId);
  else if(isInViewport(aboutMeElement, marginTop))
    newCurrentIcon = document.querySelector(aboutMe.iconId);
  else if(isInViewport(document.querySelector(header.elementId), marginTop))
    newCurrentIcon = document.querySelector(header.iconId);

  if(currentIcon && currentIcon !== newCurrentIcon)
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
          <AiOutlineUser onClick={() => scroll(aboutMe)} />
        </div>
        <div id="icon-card" className="nav__icon">
          <VscFolder onClick={() => scroll(projects)} />
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