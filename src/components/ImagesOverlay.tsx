import { type MouseEvent, useContext, useEffect, useRef, type MutableRefObject, useCallback } from 'react'
import { type DivNullable, type ImagesContextValueInterface } from '@app/types-interfaces'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { GrPrevious } from 'react-icons/gr'
import { ImagesContext } from '@app/contexts'

// Removes all the images from the slider
function removeImages(imagesState: ImagesContextValueInterface, targetElement: Element | null = null) {
  if (targetElement === null || targetElement.classList.contains('images-overlay__slider') || targetElement.classList.contains('images-overlay__close-button')) {
    imagesState.setImages([])
    imagesState.setCurrentImageIndex(0)
  }
}

// Returns an array of the slider's img elments
function getImgs(sliderDiv: DivNullable): HTMLImageElement[] {
  if (sliderDiv === null) return []
  return Array.from(sliderDiv.querySelectorAll('img'))
}

// Returns the current's img index
function getCurrentImgIndex(imgs: HTMLImageElement[]): number {
  return imgs.findIndex((img: HTMLImageElement) => !img.classList.contains('prev') && !img.classList.contains('next'))
}

// Checks if the 'previous' or the 'next' button must be disabled
function checkButtons(imagesState: ImagesContextValueInterface, currentImageIndex: number) {
  const prevButton: HTMLElement | null = document.querySelector('[class*="images-overlay__prev-button"]')
  const nextButton: HTMLElement | null = document.querySelector('[class*="images-overlay__next-button"]')
  if (prevButton === null || nextButton === null) return

  if (currentImageIndex === 0)
    prevButton.classList.add('display-none')
  else
    prevButton.classList.remove('display-none')

  if (currentImageIndex === imagesState.images.length - 1)
    nextButton.classList.add('display-none')
  else
    nextButton.classList.remove('display-none')
}

// Show previous image
function previousImg(imagesState: ImagesContextValueInterface, sliderDiv: DivNullable) {
  const imgs: HTMLImageElement[] = getImgs(sliderDiv)
  if (imgs.length <= 1) return
  const currentImageIndex = getCurrentImgIndex(imgs)
  if (currentImageIndex === 0) return

  imgs[currentImageIndex].classList.add('next')
  imgs[currentImageIndex - 1].classList.remove('prev')
  imagesState.setCurrentImageIndex(currentImageIndex - 1)
  checkButtons(imagesState, currentImageIndex - 1)
}

// show next image
function nextImg(imagesState: ImagesContextValueInterface, sliderDiv: DivNullable) {
  const imgs: HTMLImageElement[] = getImgs(sliderDiv)
  if (imgs.length <= 1) return
  const currentImageIndex = getCurrentImgIndex(imgs)
  if (currentImageIndex === imgs.length - 1) return

  imgs[currentImageIndex].classList.add('prev')
  imgs[currentImageIndex + 1].classList.remove('next')
  imagesState.setCurrentImageIndex(currentImageIndex + 1)
  checkButtons(imagesState, currentImageIndex + 1)
}

export default function ImagesOverlay() {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const sliderRef: MutableRefObject<DivNullable> = useRef(null)
  const listenerAddedRef: MutableRefObject<boolean> = useRef(false)

  // Creating the keydown callback
  const onKeyDownCallback = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        removeImages(imagesState)
        break
      case 'ArrowUp':
        previousImg(imagesState, sliderRef.current)
        break
      case 'ArrowLeft':
        previousImg(imagesState, sliderRef.current)
        break
      case 'ArrowRight':
        nextImg(imagesState, sliderRef.current)
        break
      case 'ArrowDown':
        nextImg(imagesState, sliderRef.current)
    }
  }, [ imagesState.images ])

  // Adding / removing the keydown callback
  useEffect(() => {
    if (!listenerAddedRef.current && imagesState.images.length > 0)
      document.addEventListener('keydown', onKeyDownCallback)

    return () => {
      if (imagesState.images.length > 0)
        listenerAddedRef.current = true
      document.removeEventListener('keydown', onKeyDownCallback, true)
    }
  }, [ onKeyDownCallback ])

  useEffect(() => {
    // Adding the 'overflow-hidden' class to the body
    if (imagesState.images.length > 0)
      document.body.classList.add('overflow-hidden')
    else {
      document.body.classList.remove('overflow-hidden')
      return
    }

    // Checking if buttons must be enabled or disabled
    checkButtons(imagesState, imagesState.currentImageIndex)

    // Adding the 'next' class to the images starting from the second one
    sliderRef?.current?.querySelectorAll('img:not(:first-of-type)').forEach((img: Element) => {
      img.classList.add('next')
    })
  }, [ imagesState.images ])

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

      <div className="images-overlay__close-button" >
        <IoMdCloseCircleOutline className />
      </div>

      <div className={'images-overlay__current-info' + (imagesState.images.length <= 1 ? ' display-none' : '')} >
        <p>{ `${ imagesState.currentImageIndex + 1 } / ${ imagesState.images.length }` }</p>
      </div>

      <div
        className={'images-overlay__prev-button content-center' + (imagesState.images.length <= 1 ? ' display-none' : '')}
        onClick={ () => previousImg(imagesState, sliderRef.current) } >
        <GrPrevious />
      </div>

      <div
        className={'images-overlay__next-button content-center' + (imagesState.images.length <= 1 ? ' display-none' : '')}
        onClick={ () => nextImg(imagesState, sliderRef.current) } >
        <GrPrevious />
      </div>

    </div>
  )
}
