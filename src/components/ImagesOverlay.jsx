import { useEffect } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';

function ImagesOverlay({ img, setOverlayImg }){
  // Agregar la imagen al overlay
  const imgCopy = img.cloneNode();

  useEffect(() => {
    imgCopy.removeAttribute('class');

    const overlay = document.querySelector('.overlay');
    overlay.appendChild(imgCopy);
  });

  // Cerrar overlay
  function close(event){
    if(event === null){
      setOverlayImg(null);
      return;
    }
    else if(event.target !== imgCopy)
      setOverlayImg(null);
  }

  // Cerrar overlay al detectar la tecla escape
  window.addEventListener('keyup', (event) => {
    if(event.key === "Escape")
      close(null);
  })

  return(
    <div className="overlay" onClick={close}>
      <AiOutlineCloseCircle className="close-button" onClick={close} />
    </div>
  );
}

export default ImagesOverlay;