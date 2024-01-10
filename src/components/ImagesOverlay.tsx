import { type MouseEvent, useContext, useEffect, useRef, type MutableRefObject } from 'react'
import { type DivNullable, type ImagesContextValueInterface } from '@app/types-interfaces'
import { ImagesContext } from '@app/contexts'
import { IoMdCloseCircleOutline } from 'react-icons/io'

// Removes the images from the slider
function removeImages(imagesState: ImagesContextValueInterface, targetElement: Element | null) {
  if (targetElement === null || targetElement.tagName !== 'IMG')
    imagesState.setImages([])
}

// Handles the key pressing
function onKeyDown(event: KeyboardEvent, imagesState: ImagesContextValueInterface, sliderDiv: DivNullable) {
  switch (event.key) {
    case 'Escape':
      removeImages(imagesState, null)
      break
    case 'ArrowLeft':
      previous(sliderDiv)
      break
    case 'ArrowRight':
      next(sliderDiv)
      break
  }
}

// Returns an array of the slider's img elments
function getImgs(sliderDiv: DivNullable): HTMLImageElement[] {
  if (sliderDiv === null) return []
  return Array.from(sliderDiv.querySelectorAll('img'))
}

// Returns the current's image index
function getCurrentImageIndex(imgs: HTMLImageElement[]): number {
  return imgs.findIndex((img: HTMLImageElement) => !img.classList.contains('prev') && !img.classList.contains('next'))
}

// Show previous image
function previous(sliderDiv: DivNullable) {
  const imgs: HTMLImageElement[] = getImgs(sliderDiv)
  if (imgs.length <= 1) return
  const currentImgIndex = getCurrentImageIndex(imgs)
  if (currentImgIndex === 0) return

  imgs[currentImgIndex].classList.add('next')
  imgs[currentImgIndex - 1].classList.remove('prev')
}

// show next image
function next(sliderDiv: DivNullable) {
  const imgs: HTMLImageElement[] = getImgs(sliderDiv)
  if (imgs.length <= 1) return
  const currentImgIndex = getCurrentImageIndex(imgs)
  if (currentImgIndex === imgs.length - 1) return

  imgs[currentImgIndex].classList.add('prev')
  imgs[currentImgIndex + 1].classList.remove('next')
}

export default function ImagesOverlay() {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const sliderRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const keyListenerAddedRef: MutableRefObject<boolean> = useRef(false)

  useEffect(() => {
    // Adding the keydown listener
    if (!keyListenerAddedRef.current)
      document.addEventListener('keydown', (event: KeyboardEvent) => onKeyDown(event, imagesState, sliderRef.current))

    return () => {
      keyListenerAddedRef.current = true
    }
  }, [])

  useEffect(() => {
    if (imagesState.images.length > 0)
      document.body.classList.add('overflow-hidden')
    else
      document.body.classList.remove('overflow-hidden')

    if (sliderRef.current === null) return

    // Adding the 'next' class to the images starting from the second one
    sliderRef.current.querySelectorAll('img:not(:first-of-type)').forEach((img: Element) => {
      img.classList.add('next')
    })
  }, [ imagesState ])

  if (imagesState.images.length === 0)
    return <></>

  return (
    <div
      className="images-overlay"
      onClick={ (e: MouseEvent) => removeImages(imagesState, e.target as Element) } >

      <div ref={ sliderRef } className="images-overlay__slider">
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
