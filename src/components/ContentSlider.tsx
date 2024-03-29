import React, { type MutableRefObject, useRef, useState, useEffect } from 'react'
import { GoDotFill } from 'react-icons/go'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, SliderElement, DivNullable, ElementOnClick, MouseOrTouchEvent, NullableMouseOrTouchEvent } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'
import { getClientX, getClientY, setGrabClasses, isPhoneSize, isTabletSize, isLaptopSize, isDesktopSize } from '@app/functions'
import { getElementOfType, hasClass } from '@app/functions/elements'
import { GrPrevious } from 'react-icons/gr'

// Returns true if the element is part of the slider's UI components
function isUIElement(element: HTMLElement): boolean {
  return hasClass(element, 'content-slider-nav__icons') ||
  hasClass(element, 'content-slider-nav__icon') ||
  hasClass(element, 'content-slider-button--prev') ||
  hasClass(element, 'content-slider-button--next')
}

// Checks if the click or touch is not a drag and is short
function isShortClickOrTouch(startTime: number, xDifference: number, yDifference: number): boolean {
  return Date.now() - startTime <= 400 && Math.abs(xDifference) < 3 && Math.abs(yDifference) < 3
}

// Returns true if the slider should be active
function sliderIsActive(slider: HTMLDivElement | null): boolean {
  if (slider === null) return false
  return (isPhoneSize() && slider.classList.contains('content-slider--phone-0')) ||
  (isTabletSize() && slider.classList.contains('content-slider--tablet-0')) ||
  ((isLaptopSize() || isDesktopSize()) && slider.classList.contains('content-slider--laptop-0'))
}

// Returns the index of the onClick element
function findOnClickElement(currentOnClicks: ElementOnClick[], element: HTMLElement | null) {
  return currentOnClicks.findIndex((currentOnClick: ElementOnClick) => currentOnClick.element === element)
}

// Sets and returns the intial elements values
function initialStyleValues(slider: HTMLDivElement, elements: HTMLDivElement[]): SliderElement[] {
  const sliderElements: SliderElement[] = []

  elements.forEach((htmlElement: HTMLDivElement, index: number) => {
    const leftPercentage = index * 110
    sliderElements.push({
      htmlElement,
      initialLeftPercentage: leftPercentage,
      currentLeftPixels: leftPercentage * slider.clientWidth / 100,
    })
    htmlElement.style.left = `${ sliderElements[sliderElements.length - 1].currentLeftPixels }px`
  })

  setTimeout(() => {
    elements.forEach((sliderElement: HTMLDivElement) => {
      sliderElement.classList.remove('no-transitions')
    })
  }, 0)

  return sliderElements
}

// Drags the elemets
function dragElements(elements: SliderElement[], event: MouseOrTouchEvent, startEvent: MouseOrTouchEvent): boolean {
  let dragged = false
  elements.forEach((element: SliderElement) => {
    const xDifference = getClientX(event) - getClientX(startEvent)
    const yDifference = getClientY(event) - getClientY(startEvent)
    if (
      ((isPhoneSize() || isTabletSize()) && Math.abs(xDifference) >= 25 && Math.abs(yDifference) <= 10) ||
      ((isLaptopSize() || isDesktopSize()) && Math.abs(xDifference) >= 3)) {
      dragged = true
      element.htmlElement.style.left = `${ element.currentLeftPixels + xDifference }px`
    }
  })
  return dragged
}

// Sets the new elements positions
function setElementsPositions(currentElementIndex: number, sliderElements: SliderElement[], slider: HTMLDivElement) {
  const offsetPercentage = sliderElements[currentElementIndex].initialLeftPercentage
  sliderElements.forEach((sliderElement: SliderElement) => {
    sliderElement.htmlElement.style.left = `${ (sliderElement.initialLeftPercentage - offsetPercentage) * slider.clientWidth / 100 }px`
  })
}

export default function ContentSlider(props: ContentSliderPropsInterface) {
  const [ elementsValues, setElementsValues ] = useState<SliderElement[]>([])
  const [ onClicks, setOnClicks ] = useState<ElementOnClick[]>([])
  const [ dragInProgress, setDragInProgress ] = useState<boolean>(false)
  const [ dragPerformed, setDragPerformed ] = useState<boolean>(false)
  const [ startEvent, setStartEvent ] = useState<NullableMouseOrTouchEvent>(null)
  const [ lastMoveEvent, setLastMoveEvent ] = useState<NullableMouseOrTouchEvent>(null)
  const [ startEventTime, setStartEventTime ] = useState<number>(0)
  const [ currentElementIndex, setCurrentElementIndex ] = useState<number>(0)
  const [ mouseDownScrollY, setMouseDownScrollY ] = useState<number>(0)
  const [ dragStartScrollY, setDragStartScrollY ] = useState<number>(-1)
  const sliderRef: MutableRefObject<DivNullable> = useRef(null)
  const navRef: MutableRefObject<DivNullable> = useRef(null)
  const prevButtonRef: MutableRefObject<DivNullable> = useRef(null)
  const nextButtonRef: MutableRefObject<DivNullable> = useRef(null)

  // Getting al the slider elements and setting up them initial styles
  useEffect(() => {
    if (sliderRef.current === null || navRef.current === null || prevButtonRef.current === null || nextButtonRef.current === null) return

    const elems: HTMLDivElement[] = Array.from(sliderRef.current.querySelectorAll(':scope > .content-slider__element'))
      .map((element: Node) => element as HTMLDivElement)

    if (elems.length > 1) {
      navRef.current.classList.remove('display-none')
      nextButtonRef.current.classList.remove('display-none')
    }

    setElementsValues(initialStyleValues(sliderRef.current, elems))
  }, [])

  // Adds a new onClick callbacks to the context
  function addOnClick(newElement: ElementOnClick) {
    setOnClicks((currentOnClicks: ElementOnClick[]) => {
      const findedIndex = findOnClickElement(currentOnClicks, newElement.element)
      if (findedIndex === -1)
        return currentOnClicks.concat([ newElement ]) // Adding a new element and it's onClick
      else {
        currentOnClicks[findedIndex].onClick = newElement.onClick // Updating an element's onClick
        return currentOnClicks
      }
    })
  }

  function updateLeftValues() {
    elementsValues.forEach((elementValue: SliderElement) => {
      elementValue.currentLeftPixels = Number(elementValue.htmlElement.style.left.replace('px', ''))
    })
  }

  // Handles the single click event
  function performClick(event: MouseOrTouchEvent) {
    const element: HTMLElement | null = event.target as HTMLElement
    const anchorElement: HTMLAnchorElement | null = getElementOfType<HTMLAnchorElement>(element, 'A')

    if (anchorElement !== null) {
      ((anchorElement.cloneNode() as HTMLAnchorElement)).click()
      return
    }

    const index: number = findOnClickElement(onClicks, element)
    if (index === -1) return

    const onClick = onClicks[index].onClick
    if (onClick !== null)
      onClick(event)
  }

  function handleOnMouseOrTouchDown(event: MouseOrTouchEvent) {
    if (singleElement() || sliderRef.current === null || isUIElement(event.target as HTMLElement)) return

    if ('clientX' in event && event.button !== 0) return
    else if ('touches' in event && event.touches.length > 1) return

    // Checking if the click / touch was made between the first and the last slider element
    const clickClientX = getClientX(event) - sliderRef.current.offsetLeft

    if (
      clickClientX < elementsValues[0].htmlElement.offsetLeft ||
      clickClientX > elementsValues[elementsValues.length - 1].htmlElement.offsetLeft + elementsValues[elementsValues.length - 1].htmlElement.clientWidth
    ) return

    event.preventDefault()
    setDragInProgress(sliderIsActive(sliderRef.current))
    setStartEvent(event)
    setLastMoveEvent(event)
    setStartEventTime(Date.now())
    setMouseDownScrollY(window.scrollY)
  }

  function handleOnMouseOrTouchMove(event: MouseOrTouchEvent) {
    if (startEvent === null || sliderRef.current === null) return
    if ('touches' in event && event.touches.length > 1) return
    setLastMoveEvent(event)

    if (!dragInProgress) return
    event.preventDefault()
    const dragged = dragElements(elementsValues, event, startEvent)
    if (dragged) {
      setGrabClasses(sliderRef.current, dragged)
      if (dragStartScrollY === -1)
        setDragStartScrollY(window.scrollY)
      else
        window.scrollTo(window.scrollX, dragStartScrollY)
    }
    else if (dragStartScrollY === -1 && Math.abs(getClientY(event) - getClientY(startEvent)) < 5)
      setDragStartScrollY(mouseDownScrollY)
    setDragPerformed(dragged)
  }

  function handleOnMouseOrTouchDragEnd(event: MouseOrTouchEvent) {
    if (singleElement()) {
      performClick(event)
      event.preventDefault()
    }

    setDragStartScrollY(-1)

    if (startEvent === null || lastMoveEvent === null) return

    // In touch screens event.touches.length is 0
    let endEvent: MouseOrTouchEvent = event
    if ('touches' in endEvent && endEvent.touches.length === 0)
      endEvent = lastMoveEvent
    if ('touches' in endEvent && endEvent.touches.length > 1)
      return

    const xDifference = getClientX(startEvent) - getClientX(endEvent)
    const yDifference = getClientY(startEvent) - getClientY(endEvent)

    if (!dragInProgress || sliderRef.current === null) {
      if (isShortClickOrTouch(startEventTime, xDifference, yDifference) && getElementOfType<HTMLAnchorElement>(event.target as HTMLElement, 'A') === null) {
        performClick(endEvent)
        event.preventDefault()
      }
      return
    }

    updateLeftValues()
    setDragInProgress(false)
    setGrabClasses(sliderRef.current, false)
    if (dragPerformed)
      setDragPerformed(false)
    else if (isShortClickOrTouch(startEventTime, xDifference, yDifference)) {
      performClick(endEvent)
      event.preventDefault()
    }

    let index = currentElementIndex
    if (xDifference <= -60) // Previous element
      index--
    else if (xDifference >= 60) // Next element
      index++
    setCurrentElement(index)
  }

  // Sets the current element
  function setCurrentElement(newElementIndex: number, event?: MouseOrTouchEvent) {
    if (event !== undefined && 'clientX' in event && event.button !== 0) return

    if (sliderRef.current === null) return

    newElementIndex = Math.min(Math.max(0, newElementIndex), elementsValues.length - 1)
    setCurrentElementIndex(newElementIndex)
    setElementsPositions(newElementIndex, elementsValues, sliderRef.current)
    updateLeftValues()

    if (prevButtonRef.current === null || nextButtonRef.current === null)
      return

    // Hide / show 'previous' button
    if (newElementIndex === 0) {
      if (!prevButtonRef.current.classList.contains('display-none'))
        prevButtonRef.current.classList.add('display-none')
    }
    else if (prevButtonRef.current.classList.contains('display-none'))
      prevButtonRef.current.classList.remove('display-none')

    // Hide / show 'next' button
    if (newElementIndex === elementsValues.length - 1) {
      if (!nextButtonRef.current.classList.contains('display-none'))
        nextButtonRef.current.classList.add('display-none')
    }
    else if (nextButtonRef.current.classList.contains('display-none'))
      nextButtonRef.current.classList.remove('display-none')
  }

  // Returns true if there's only one element
  function singleElement(): boolean {
    return elementsValues.length <= 1
  }

  // Grid columns
  let phoneCols: string = 'n'
  if (props.phoneCols !== undefined)
    phoneCols = props.phoneCols.toString()

  let tabletCols: string = 'n'
  if (props.tabletCols !== undefined)
    tabletCols = props.tabletCols.toString()

  let laptopCols: string = 'n'
  if (props.laptopCols !== undefined)
    laptopCols = props.laptopCols.toString()

  const contentSliderContext: ContentSliderContextValueInterface = {
    onClicks,
    addOnClick,
  }

  return (
    <ContentSliderContext.Provider value={ contentSliderContext }>
      <div
        ref={ sliderRef }
        className={ (`${ !singleElement() ? 'cursor-pointer' : '' } content-slider--phone-${ phoneCols } content-slider--tablet-${ tabletCols } content-slider--laptop-${ laptopCols } ${ props.className }`).trim() }
        onClick={ (event: React.MouseEvent) => sliderIsActive(sliderRef.current) ? event.preventDefault() : '' }

        onMouseDown={ handleOnMouseOrTouchDown }
        onMouseMove={ handleOnMouseOrTouchMove }
        onMouseLeave={ handleOnMouseOrTouchDragEnd }
        onMouseUp={ handleOnMouseOrTouchDragEnd }

        onTouchStart={ handleOnMouseOrTouchDown }
        onTouchMove={ handleOnMouseOrTouchMove }
        onTouchCancel={ handleOnMouseOrTouchDragEnd }
        onTouchEnd={ handleOnMouseOrTouchDragEnd }
      >
        {
          React.Children.map(props.children, (child: React.ReactNode) =>
          <div
            className="content-slider__element no-transitions"
          >
          { child }
          </div>)
        }
        <div ref={ navRef } className="content-slider-nav display-none">
          <div className="content-slider-nav__icons">
          {
            Array.from((Array(elementsValues.length).keys()))
              .map((index: number) =>
                <GoDotFill
                  key={ index }
                  className={ 'content-slider-nav__icon' + (index !== currentElementIndex ? '' : ' current')}
                  onClick={(event: MouseOrTouchEvent) => setCurrentElement(index, event)}
                />
              )
          }
          </div>
        </div>
        <div
          ref={ prevButtonRef }
          className={ 'content-slider-button--prev display-none' }
          onMouseDown={ (event: MouseOrTouchEvent) => setCurrentElement(currentElementIndex - 1, event) }
        ><GrPrevious />
        </div>
        <div
          ref={ nextButtonRef }
          className={ 'content-slider-button--next display-none' }
          onMouseDown={ (event: MouseOrTouchEvent) => setCurrentElement(currentElementIndex + 1, event) }
        ><GrPrevious />
        </div>
      </div>
    </ContentSliderContext.Provider>
  )
}
