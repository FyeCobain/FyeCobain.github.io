import { type MouseEvent, useContext, useEffect } from 'react'
import { type ImageContextValueInterface } from '@app/types-interfaces'
import { ImageContext } from '@app/contexts'
import { IoMdCloseCircleOutline } from 'react-icons/io'

function removeImage(imageState: ImageContextValueInterface, targetElement: Element) {
  if (targetElement.tagName !== 'IMG') imageState.setImage(null)
}

export default function ImageOverlay() {
  const imageState: ImageContextValueInterface = useContext(ImageContext)

  useEffect(() => {
    if (imageState.image !== null) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  })

  if (imageState.image === null) return <></>

  return (
    <div
      className="image-overlay"
      onClick={ (e: MouseEvent) => removeImage(imageState, e.target as Element) } >

      <div className="image-overlay__container">
        <img src={ imageState.image }></img>
      </div>

      <div className="image-overlay__close-button">
        <IoMdCloseCircleOutline className />
      </div>

    </div>
  )
}
