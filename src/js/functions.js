// Devuelve verdadero si un elemento está en el viewport
function isInViewport(elementSelector){
  let element = document.querySelector(elementSelector);
  if(!element)
    return false;
  const clientRect = element.getBoundingClientRect();
  return clientRect.y <= 225 && clientRect.y * -1 < clientRect.height;
}

export { isInViewport };