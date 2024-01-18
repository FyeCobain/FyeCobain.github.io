import React, { type MutableRefObject, useRef, useState, useEffect } from 'react'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, DivNullable, ElementOnClick } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'
import { getClientX } from '@app/functions'

interface SliderElement {
  htmlElement: HTMLDivElement
  initialLeftPercentage: number
  currentLeftPixels: number
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

// Adds or removes the 'no-transitions' and 'pointer-grab' classes
function setGrabClasses(element: HTMLDivElement, on: boolean) {
  if (on) {
    element.classList.add('no-transitions')
    element.classList.add('cursor-grab')
  }
  else {
    element.classList.remove('no-transitions')
    element.classList.remove('cursor-grab')
  }
}

// Drags the elemet
function dragElements(elements: SliderElement[], event: React.MouseEvent | React.TouchEvent, startEvent: React.MouseEvent | React.TouchEvent) {
  elements.forEach((element: SliderElement) => {
    element.htmlElement.style.left = `${ element.currentLeftPixels + getClientX(event) - getClientX(startEvent) }px`
  })
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

  // TODO Handles the single click event
  /* function handleOnClick(event: React.MouseEvent) {
    console.log(sliderElements)

    const index: number = findOnClickElement(onClicks, event.target as HTMLElement)
    if (index === -1) return

    event.preventDefault()
    const onClick = onClicks[index].onClick
    if (onClick !== null) onClick(event)
  } */

  function handleOnMouseDown(event: React.MouseEvent) {
    if (event.button !== 0 || sliderRef.current === null) return

    const clickClientX = getClientX(event)
    if (
      clickClientX < elementsValues[0].htmlElement.offsetLeft ||
      clickClientX > elementsValues[elementsValues.length - 1].htmlElement.offsetLeft + elementsValues[elementsValues.length - 1].htmlElement.clientWidth
    ) return

    event.preventDefault()
    setDragInProgress(true)
    setMouseDownEvent(event)
    setGrabClasses(sliderRef.current, true)
  }

  function handleOnMouseMove(event: React.MouseEvent) {
    if (!dragInProgress || mouseDownEvent === null) return

    dragElements(elementsValues, event, mouseDownEvent)
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
