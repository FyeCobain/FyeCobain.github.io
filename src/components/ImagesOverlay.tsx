import { type MouseEvent, useContext, useEffect } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'
import { ImagesContext } from '@app/contexts'
import { IoMdCloseCircleOutline } from 'react-icons/io'

// Removes images if any element but the current image is clicked
function removeImages(imageState: ImagesContextValueInterface, targetElement: Element) {
  if (targetElement.tagName !== 'IMG')
    imageState.setImages([])
}

export default function ImagesOverlay() {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  useEffect(() => {
    if (imagesState.images.length > 0)
      document.body.classList.add('overflow-hidden')
    else
      document.body.classList.remove('overflow-hidden')
  })

  if (imagesState.images.length === 0)
    return <></>

  return (
    <div
      className="images-overlay"
      onClick={ (e: MouseEvent) => removeImages(imagesState, e.target as Element) } >

      <div className="images-overlay__slider">
      {
        imagesState.images.map((image: string, index: number) => <img key={ index } src={ image }></img>)
      }
      </div>

      <div className="images-overlay__close-button">
        <IoMdCloseCircleOutline className />
      </div>

    </div>
  )
}
