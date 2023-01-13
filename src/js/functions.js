// Devuelve verdadero si un elemento está en el viewport (en la parte superior)
function isInViewport(element, marginTop=0){
  if(!element)
    return false;
  const clientRect = element.getBoundingClientRect();
  return clientRect.y <= marginTop && clientRect.y * -1 < clientRect.height;
}

// Devuelve verdadero si un elemento está bajo el viewport
function itsBellow(element, marginTop=0){
  if(!element)
    return false;
  const clientRect = element.getBoundingClientRect();
  return clientRect.y >= window.innerHeight - marginTop;
}

export { isInViewport, itsBellow };