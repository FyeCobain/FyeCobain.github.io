import React, { type MutableRefObject, useRef, useState, useEffect } from 'react'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, SliderElement, DivNullable, ElementOnClick } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'
import { getClientX, setGrabClasses, isPhoneSize, isTabletSize, isLaptopSize, isDesktopSize } from '@app/functions'

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
    if (Math.abs(xDifference) > 3) {
      dragged = true
      element.htmlElement.style.left = `${ element.currentLeftPixels + xDifference }px`
    }
  })
  return dragged
}

export default function ContentSlider(props: ContentSliderPropsInterface) {
  const [ elementsValues, setElementsValues ] = useState<SliderElement[]>([])
  const [ onClicks, setOnClicks ] = useState<ElementOnClick[]>([])
  const [ dragInProgress, setDragInProgress ] = useState<boolean>(false)
  const [ mouseDownEvent, setMouseDownEvent ] = useState<React.MouseEvent | null>(null)
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

  // Returns the container index of the targeted element
  /* function findContainerIndex(targetElement: HTMLElement) {
    return elementsValues.findIndex(sliderElement =>
      sliderElement.htmlElement === targetElement || sliderElement.htmlElement.contains(targetElement))
  } */

  function updateLeftValues() {
    elementsValues.forEach((elementValue: SliderElement) => {
      elementValue.currentLeftPixels = Number(elementValue.htmlElement.style.left.replace('px', ''))
    })
  }

  // Handles the single click event
  /* function handleOnClick(event: React.MouseEvent) {
    console.log(sliderElements)

    const index: number = findOnClickElement(onClicks, event.target as HTMLElement)
    if (index === -1) return

    event.preventDefault()
    const onClick = onClicks[index].onClick
    if (onClick !== null) onClick(event)
  } */

  function handleOnMouseDown(event: React.MouseEvent) {
    if (event.button !== 0 || sliderRef.current === null || !sliderIsActive(sliderRef.current)) return

    const clickClientX = getClientX(event)
    if (
      clickClientX < elementsValues[0].htmlElement.offsetLeft ||
      clickClientX > elementsValues[elementsValues.length - 1].htmlElement.offsetLeft + elementsValues[elementsValues.length - 1].htmlElement.clientWidth
    ) return

    event.preventDefault()
    setDragInProgress(true)
    setMouseDownEvent(event)
  }

  function handleOnMouseMove(event: React.MouseEvent) {
    if (!dragInProgress || mouseDownEvent === null || sliderRef.current === null) return

    const dragged = dragElements(elementsValues, event, mouseDownEvent)
    if (dragged)
      setGrabClasses(sliderRef.current, true)
  }

  function handleOnMouseLeave(_event: React.MouseEvent) {
    if (!dragInProgress || sliderRef.current === null) return

    updateLeftValues()
    setDragInProgress(false)
    setGrabClasses(sliderRef.current, false)
  }

  function handleOnMouseUp(_event: React.MouseEvent) {
    if (!dragInProgress || sliderRef.current === null) return

    updateLeftValues()
    setDragInProgress(false)
    setGrabClasses(sliderRef.current, false)
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
        onMouseDown={ handleOnMouseDown }
        onMouseMove={ handleOnMouseMove }
        onMouseLeave={ handleOnMouseLeave }
        onMouseUp={ handleOnMouseUp }
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
