import { useContext, useEffect, useRef, useCallback, useState, type MutableRefObject } from 'react'
import type { DragCallbacksInterface, DivNullable, ImagesContextValueInterface } from '@app/types-interfaces'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { GrPrevious } from 'react-icons/gr'
import { ImagesContext } from '@app/contexts'
import { onDrag, getClientX } from '@app/functions'

// Removes all the images from the slider
function removeImages(imagesState: ImagesContextValueInterface, targetElement: Element | null = null) {
  if (targetElement === null || targetElement.classList.contains('images-overlay__slider') || targetElement.classList.contains('images-overlay__close-button')) {
    imagesState.setImages([])
    imagesState.setCurrentImageIndex(0)
    imagesState.setMaxHeight(false)
  }
}

// Returns an array of the slider's img containers
function getImgsContainers(): HTMLDivElement[] {
  return Array.from(document.querySelectorAll('.images-overlay__slider > DIV'))
}

// Returns the current's img index
function getCurrentImgIndex(imgsContainers: HTMLDivElement[]): number {
  return imgsContainers.findIndex((imgContainer: HTMLDivElement) =>
    !imgContainer.classList.contains('prev') && !imgContainer.classList.contains('next'))
}

// Checks if the 'previous' and the 'next' buttons must be visible
function checkButtons(currentImageIndex: number, imagesCount: number) {
  const prevButton: HTMLElement | null = document.querySelector('[class*="images-overlay__prev-button"]')
  const nextButton: HTMLElement | null = document.querySelector('[class*="images-overlay__next-button"]')
  if (prevButton === null || nextButton === null) return

  if (currentImageIndex === 0)
    prevButton.classList.add('hide')
  else
    prevButton.classList.remove('hide')

  if (currentImageIndex === imagesCount - 1)
    nextButton.classList.add('hide')
  else
    nextButton.classList.remove('hide')
}

// Show previous image
function previousImg(imagesState: ImagesContextValueInterface) {
  const imgsContainers: HTMLDivElement[] = getImgsContainers()
  if (imgsContainers.length <= 1) return
  const currentImageIndex = getCurrentImgIndex(imgsContainers)
  if (currentImageIndex === 0) return

  imgsContainers[currentImageIndex].classList.add('next')
  imgsContainers[currentImageIndex - 1].classList.remove('prev')
  imagesState.setCurrentImageIndex(currentImageIndex - 1)
  checkButtons(currentImageIndex - 1, imgsContainers.length)
}

// show next image
function nextImg(imagesState: ImagesContextValueInterface) {
  const imgsContainers: HTMLDivElement[] = getImgsContainers()
  if (imgsContainers.length <= 1) return
  const currentImageIndex = getCurrentImgIndex(imgsContainers)
  if (currentImageIndex === imgsContainers.length - 1) return

  imgsContainers[currentImageIndex].classList.add('prev')
  imgsContainers[currentImageIndex + 1].classList.remove('next')
  imagesState.setCurrentImageIndex(currentImageIndex + 1)
  checkButtons(currentImageIndex + 1, imgsContainers.length)
}

// Performs the drag movement
function dragImg(event: React.MouseEvent | React.TouchEvent, startEvent: React.MouseEvent | React.TouchEvent) {
  const imgContainer: HTMLDivElement = (event.target as HTMLImageElement).parentNode as HTMLDivElement
  imgContainer.style.left = `${ getClientX(event) - getClientX(startEvent) }px`
}

// Adds or removes the 'cursor-grab' and 'no-transitions' classes
function addDragClasses(image: HTMLImageElement, add: boolean) {
  add ? image.classList.add('cursor-grab') : image.classList.remove('cursor-grab')
  const container: HTMLDivElement = image.parentNode as HTMLDivElement
  add ? container.classList.add('no-transitions') : container.classList.remove('no-transitions')
}

// Restores the image original position
function restoreImgPosition(mouseDownEvent: React.TouchEvent | React.MouseEvent | undefined) {
  if (mouseDownEvent !== undefined)
    ((mouseDownEvent.target as HTMLImageElement).parentNode as HTMLDivElement).style.left = ''
}

export default function ImagesOverlay() {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const sliderRef: MutableRefObject<DivNullable> = useRef(null)
  const listenerAddedRef: MutableRefObject<boolean> = useRef(false)
  const [ mouseDownEvent, setMouseDownEvent ] = useState<React.MouseEvent>()
  const [ touchStartEvent, setTouchStartEvent ] = useState<React.TouchEvent>()
  const [ touchEndEvent, setTouchEndEvent ] = useState<React.TouchEvent>()
  const [ dragInProgress, setDragInProgress ] = useState<boolean>(false)

  // Creating the keydown callback
  const onKeyDownCallback = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        removeImages(imagesState)
        break
      case 'ArrowUp':
        sliderRef.current?.scrollTo({
          left: sliderRef.current.scrollLeft,
          top: sliderRef.current.scrollTop - 105,
          behavior: 'smooth',
        })
        break
      case 'ArrowLeft':
        previousImg(imagesState)
        break
      case 'ArrowDown':
        sliderRef.current?.scrollTo({
          left: sliderRef.current.scrollLeft,
          top: sliderRef.current.scrollTop + 105,
          behavior: 'smooth',
        })
        break
      case 'ArrowRight':
        nextImg(imagesState)
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
    if (imagesState.images.length > 0) {
      document.documentElement.classList.add('overflow-hidden')
      document.documentElement.classList.add('overscroll-none')
    }
    else {
      document.documentElement.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overscroll-none')
      return
    }

    // Adding the 'next' class to the image containers starting from the second one
    sliderRef?.current?.querySelectorAll('.images-overlay__image:not(:first-of-type)')
      .forEach((imgContainer: Element) => {
        imgContainer.classList.add('next')
      })

    // Removing the style attribute
    sliderRef?.current?.querySelectorAll('.images-overlay__image')
      .forEach((imgContainer: Element) => {
        (imgContainer as HTMLElement).removeAttribute('style')
      })
  }, [ imagesState.images ])

  // Returns true if there is only one image (or less)
  function singleImage(): boolean {
    return imagesState.images.length <= 1
  }

  // If the touch event was cancelled or has finished
  function touchEndedHandler(event: React.TouchEvent) {
    if (singleImage()) return

    if (touchStartEvent === undefined || touchEndEvent === undefined) return

    addDragClasses(event.target as HTMLImageElement, false)
    restoreImgPosition(touchStartEvent)

    onDrag(touchStartEvent.touches[0].clientX, touchStartEvent.touches[0].clientY, touchEndEvent.touches[0].clientX, touchEndEvent.touches[0].clientY, dragCallbakks, 60, 40)
  }

  if (imagesState.images.length === 0)
    return <></>

  const dragCallbakks: DragCallbacksInterface = {
    onUpDrag: null,
    onRightDrag: () => previousImg(imagesState),
    onDownDrag: null,
    onLeftDrag: () => nextImg(imagesState),
  }

  return (
    <div
      className="images-overlay"

      onClick={ (event: React.MouseEvent) => {
        if (!dragInProgress)
          removeImages(imagesState, event.target as Element)
        else
          setDragInProgress(false)
      } }
    >
    <div ref={ sliderRef } className="images-overlay__slider">
    {
      imagesState.images.map((image: string, index: number) =>
      <div key={ index } className="images-overlay__image" style={ { left: index === 0 ? '0%' : '100%' } }>
        <img
          src={ image }

          className={ ((imagesState.images.length <= 1 ? '' : 'cursor-pointer') + (!imagesState.maxHeight ? '' : ' max-height-100vh')).trim() }

          // When the TOUCH event starts inside the element
          onTouchStart={ (event: React.TouchEvent) => {
            if (singleImage()) return

            addDragClasses(event.target as HTMLImageElement, true)
            setTouchStartEvent(event)
          } }

          // When a drag TOUCH occurs inside the element
          onTouchMove={(event: React.TouchEvent) => {
            if (singleImage() || event.touches.length > 1) return

            setTouchEndEvent(event)
            if (touchStartEvent === undefined) return
            dragImg(event, touchStartEvent)
          } }

          // When the TOUCH is cancelled or finished
          onTouchCancel={ touchEndedHandler }

          onTouchEnd={ touchEndedHandler }

          // When the MOUSE button is pressed inside the element
          onMouseDown={ (event: React.MouseEvent) => {
            if (singleImage() || event.button !== 0) return

            event.preventDefault()
            addDragClasses(event.target as HTMLImageElement, true)
            setMouseDownEvent(event)
            setDragInProgress(true)
          } }

          // When moving the MOUSE inside the element
          onMouseMove={ (event: React.MouseEvent) => {
            if (singleImage()) return

            if (dragInProgress && mouseDownEvent !== undefined)
              dragImg(event, mouseDownEvent)
          } }

          // When the MOUSE leaves the element
          onMouseLeave={ (event: React.MouseEvent) => {
            if (singleImage()) return

            if (dragInProgress) {
              addDragClasses(event.target as HTMLImageElement, false)
              restoreImgPosition(mouseDownEvent)
              setMouseDownEvent(undefined)
            }
          } }

          // When the MOUSE button is released inside the element
          onMouseUp={ (event: React.MouseEvent) => {
            if (singleImage()) return

            addDragClasses(event.target as HTMLImageElement, false)
            restoreImgPosition(mouseDownEvent)
            setDragInProgress(false)

            if (mouseDownEvent === undefined) return
            onDrag(mouseDownEvent.clientX, mouseDownEvent.clientY, event.clientX, event.clientY, dragCallbakks, 70, 50)
          } }
        ></img>
      </div>
      )
    }
    </div>

      <div className="images-overlay__close-button" >
        <IoMdCloseCircleOutline className />
      </div>

      <div className={'images-overlay__current-info' + (singleImage() ? ' display-none' : '')} >
        <p>{ `${ imagesState.currentImageIndex + 1 } / ${ imagesState.images.length }` }</p>
      </div>

      <div
        className={'images-overlay__prev-button content-center hide' + (singleImage() ? ' display-none' : '')}
        onClick={ () => previousImg(imagesState) }
      ><GrPrevious />
      </div>

      <div
        className={'images-overlay__next-button content-center' + (singleImage() ? ' display-none' : '')}
        onClick={ () => nextImg(imagesState) }
      ><GrPrevious />
      </div>

    </div>
  )
}
