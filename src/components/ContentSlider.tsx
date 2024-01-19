import React, { type MutableRefObject, useRef, useState, useEffect } from 'react'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, SliderElement, DivNullable, ElementOnClick } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'
import { getClientX, getClientY, setGrabClasses, isPhoneSize, isTabletSize, isLaptopSize, isDesktopSize } from '@app/functions'

// Returns true if the slider should be active
function sliderIsActive(slider: HTMLDivElement): boolean {
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
function dragElements(elements: SliderElement[], event: React.MouseEvent | React.TouchEvent, startEvent: React.MouseEvent | React.TouchEvent): boolean {
  let dragged = false
  elements.forEach((element: SliderElement) => {
    const xDifference = getClientX(event) - getClientX(startEvent)
    if (Math.abs(xDifference) >= 25) {
      dragged = true
      element.htmlElement.style.left = `${ element.currentLeftPixels + xDifference }px`
    }
  })
  return dragged
}

// Selects the current element based on the positions
function getCurrentElementIndex(slider: HTMLDivElement, elementsValues: SliderElement[]): number {
  let minorIndex = 0
  let minorDistance = Math.abs(slider.clientWidth / 2 - (elementsValues[minorIndex].currentLeftPixels + elementsValues[minorIndex].htmlElement.clientWidth / 2))
  elementsValues.slice(1).forEach((elementValue: SliderElement, index: number) => {
    const distance = Math.abs(slider.clientWidth / 2 - (elementValue.currentLeftPixels + elementValue.htmlElement.clientWidth / 2))
    if (distance < minorDistance) {
      minorDistance = distance
      minorIndex = index + 1
    }
  })
  return minorIndex
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
  const [ startEvent, setStartEvent ] = useState<React.MouseEvent | React.TouchEvent | null>(null)
  const [ lastMoveEvent, setLastMoveEvent ] = useState<React.MouseEvent | React.TouchEvent | null>(null)
  const sliderRef: MutableRefObject<DivNullable> = useRef(null)

  // Getting al the slider elements and setting up them initial styles
  useEffect(() => {
    if (sliderRef.current === null) return

    const elems: HTMLDivElement[] = Array.from(sliderRef.current.querySelectorAll(':scope > DIV'))
      .map((element: Node) => element as HTMLDivElement)

    setElementsValues(initialStyleValues(sliderRef.current, elems))
  }, [])

  // Adds a new onClick callbacks to the context
  function addOnClick(newElement: ElementOnClick) {
    setOnClicks((currentOnClicks: ElementOnClick[]) => {
      return findOnClickElement(currentOnClicks, newElement.element) === -1
        ? currentOnClicks.concat([ newElement ])
        : currentOnClicks
    })
  }

  function updateLeftValues() {
    elementsValues.forEach((elementValue: SliderElement) => {
      elementValue.currentLeftPixels = Number(elementValue.htmlElement.style.left.replace('px', ''))
    })
  }

  // Handles the single click event
  function performElementMouseClick(event: React.MouseEvent | React.TouchEvent) {
    const index: number = findOnClickElement(onClicks, event.target as HTMLElement)
    if (index === -1) return

    const onClick = onClicks[index].onClick
    if (onClick !== null)
      onClick(event)
  }

  function handleOnMouseOrTouchDown(event: React.MouseEvent | React.TouchEvent) {
    if (sliderRef.current === null || !sliderIsActive(sliderRef.current)) return
    if ('clientX' in event && event.button !== 0) return
    else if ('touches' in event && event.touches.length > 1) return

    // Checking if the click / touch was made between the first and the last slider element
    const clickClientX = getClientX(event)
    if (
      clickClientX < elementsValues[0].htmlElement.offsetLeft ||
      clickClientX > elementsValues[elementsValues.length - 1].htmlElement.offsetLeft + elementsValues[elementsValues.length - 1].htmlElement.clientWidth
    ) return

    event.preventDefault()
    setDragInProgress(true)
    setStartEvent(event)
    setLastMoveEvent(event)
  }

  function handleOnMouseOrTouchMove(event: React.MouseEvent | React.TouchEvent) {
    if (!dragInProgress || startEvent === null || sliderRef.current === null) return
    if ('touches' in event && event.touches.length > 1) return

    event.preventDefault()
    const dragged = dragElements(elementsValues, event, startEvent)
    if (dragged)
      setGrabClasses(sliderRef.current, dragged)
    setDragPerformed(dragged)
    setLastMoveEvent(event)
  }

  function handleOnMouseOrTouchDragEnd(event: React.MouseEvent | React.TouchEvent) {
    if (!dragInProgress || sliderRef.current === null || startEvent === null || lastMoveEvent === null) return

    // In touch screens event.touches.length is 0
    let currentEvent: React.MouseEvent | React.TouchEvent = event
    if ('touches' in currentEvent && currentEvent.touches.length === 0)
      currentEvent = lastMoveEvent
    if ('touches' in currentEvent && currentEvent.touches.length > 1)
      return

    updateLeftValues()
    setDragInProgress(false)
    setGrabClasses(sliderRef.current, false)
    if (dragPerformed)
      setDragPerformed(false)
    else if (Math.abs(getClientY(startEvent) - getClientY(currentEvent)) <= 0)
      performElementMouseClick(currentEvent)

    const currentElementIndex = getCurrentElementIndex(sliderRef.current, elementsValues)
    setElementsPositions(currentElementIndex, elementsValues, sliderRef.current)
    updateLeftValues()
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
        className={ (`content-slider--phone-${ phoneCols } content-slider--tablet-${ tabletCols } content-slider--laptop-${ laptopCols } ${ props.className }`).trim() }
        onClick={ (event: React.MouseEvent) => event.preventDefault() }

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
      </div>
    </ContentSliderContext.Provider>
  )
}
