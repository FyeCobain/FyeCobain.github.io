import { useContext, useEffect, useRef, useCallback, useState, type MutableRefObject } from 'react'
import type { DragCallbacksInterface, DivNullable, ImagesContextValueInterface } from '@app/types-interfaces'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { GrPrevious } from 'react-icons/gr'
import { ImagesContext } from '@app/contexts'
import { onDrag } from '@app/functions'

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
    prevButton.classList.add('hide')
  else
    prevButton.classList.remove('hide')

  if (currentImageIndex === imagesState.images.length - 1)
    nextButton.classList.add('hide')
  else
    nextButton.classList.remove('hide')
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
  const [ mouseDownEvent, setMouseDownEvent ] = useState<React.MouseEvent>()
  const [ touchStartEvent, setTouchStartEvent ] = useState<React.TouchEvent>()
  const [ touchEndEvent, setTouchEndEvent ] = useState<React.TouchEvent>()

  // Creating the keydown callback
  const onKeyDownCallback = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        removeImages(imagesState)
        break
      case 'ArrowLeft':
        previousImg(imagesState, sliderRef.current)
        break
      case 'ArrowRight':
        nextImg(imagesState, sliderRef.current)
        break
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

  const dragCallbakks: DragCallbacksInterface = {
    onUpDrag: null,
    onRightDrag: () => previousImg(imagesState, sliderRef.current),
    onDownDrag: null,
    onLeftDrag: () => nextImg(imagesState, sliderRef.current),
  }

  return (
    <div
      className="images-overlay"
      onClick={ (event: React.MouseEvent) => removeImages(imagesState, event.target as Element) }
    ><div ref={ sliderRef } className="images-overlay__slider">
      {
        imagesState.images.map((image: string, index: number) =>
          <img
            key={ index }

            src={ image }

            onTouchStart={ (event: React.TouchEvent) => {
              event.preventDefault()
              setTouchStartEvent(event)
            } }

            onTouchMove={(event: React.TouchEvent) => {
              event.preventDefault()
              setTouchEndEvent(event)
            } }

            onTouchEnd={ () => {
              if (touchStartEvent === undefined || touchEndEvent === undefined) return
              onDrag(touchStartEvent.touches[0].clientX, touchStartEvent.touches[0].clientY, touchEndEvent.touches[0].clientX, touchEndEvent.touches[0].clientY, dragCallbakks, 65, 40)
            } }

            onMouseDown={ (event: React.MouseEvent) => {
              if (imagesState.images.length <= 1) return

              event.preventDefault()
              if (event.target instanceof HTMLImageElement)
                event.target.classList.add('cursor-grab')
              setMouseDownEvent(event)
            } }

            onMouseUp={ (event: React.MouseEvent) => {
              if (imagesState.images.length <= 1) return

              if (event.target instanceof HTMLImageElement)
                event.target.classList.remove('cursor-grab')
              if (mouseDownEvent === undefined) return
              onDrag(mouseDownEvent.clientX, mouseDownEvent.clientY, event.clientX, event.clientY, dragCallbakks, 70, 50)
            } }
          ></img>)
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
        onClick={ () => previousImg(imagesState, sliderRef.current) }
      ><GrPrevious />
      </div>

      <div
        className={'images-overlay__next-button content-center' + (imagesState.images.length <= 1 ? ' display-none' : '')}
        onClick={ () => nextImg(imagesState, sliderRef.current) }
      ><GrPrevious />
      </div>

    </div>
  )
}
