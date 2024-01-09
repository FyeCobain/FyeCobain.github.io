import { type MouseEvent, useContext, useEffect } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'
import { ImageContext } from '@app/contexts'
import { IoMdCloseCircleOutline } from 'react-icons/io'

// Removes images if any element but the current image is clicked
function removeImages(imageState: ImagesContextValueInterface, targetElement: Element) {
  if (targetElement.tagName !== 'IMG')
    imageState.setImages([])
}

export default function ImagesOverlay() {
  const imageState: ImagesContextValueInterface = useContext(ImageContext)

  useEffect(() => {
    if (imageState.images.length > 0)
      document.body.classList.add('overflow-hidden')
    else
      document.body.classList.remove('overflow-hidden')
  })

  if (imageState.images.length === 0)
    return <></>

  return (
    <div
      className="image-overlay"
      onClick={ (e: MouseEvent) => removeImages(imageState, e.target as Element) } >

      <div className="image-overlay__container">
        <img src={ imageState.images[0] }></img>
      </div>

      <div className="image-overlay__close-button">
        <IoMdCloseCircleOutline className />
      </div>

    </div>
  )
}
