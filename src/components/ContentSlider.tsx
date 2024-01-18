import React, { type MutableRefObject, useRef, useState, useEffect } from 'react'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, DivNullable, ElementOnClick } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'
import { getClientX } from '@app/functions'

// Returns the index of the onClick element
function findOnClickElement(currentOnClicks: ElementOnClick[], element: HTMLElement | null) {
  return currentOnClicks.findIndex((currentOnClick: ElementOnClick) => currentOnClick.element === element)
}

// Removes the unnecessary classes from the slider element containers
function removeInitialClasses(sliderElements: HTMLDivElement[]) {
  sliderElements[0].classList.remove('next')
  setTimeout(() => {
    sliderElements.forEach((sliderElement: HTMLDivElement) => {
      sliderElement.classList.remove('no-transitions')
    })
  }, 0)
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
function dragElement(element: HTMLDivElement, currentLeft: number, event: React.MouseEvent | React.TouchEvent, startEvent: React.MouseEvent | React.TouchEvent) {
  element.style.left = `${ currentLeft + getClientX(event) - getClientX(startEvent) }px`
}

export default function ContentSlider(props: ContentSliderPropsInterface) {
  const [ onClicks, setOnClicks ] = useState<ElementOnClick[]>([])
  const [ sliderElements, setSliderElements ] = useState<HTMLDivElement[]>([])
  const [ currentSliderElement, setCurrentSliderElement ] = useState<DivNullable>(null)
  const [ currentLeft, setCurrentLeft ] = useState<number>(0)
  const [ dragInProgress, setDragInProgress ] = useState<boolean>(false)
  const [ mouseDownEvent, setMouseDownEvent ] = useState<React.MouseEvent | null>(null)
  const sliderRef: MutableRefObject<DivNullable> = useRef(null)

  // Getting al the slider elements and setting up them initil styles
  useEffect(() => {
    if (sliderRef.current === null) return

    const elems: HTMLDivElement[] = Array.from(sliderRef.current.querySelectorAll(':scope > DIV'))
      .map((element: Node) => element as HTMLDivElement)

    setSliderElements(elems)
    removeInitialClasses(elems)
  }, [])

  // Adds a new onClick callbacks to the context
  function addOnClick(newElement: ElementOnClick) {
    setOnClicks((currentOnClicks: ElementOnClick[]) => {
      return findOnClickElement(currentOnClicks, newElement.element) === -1
        ? currentOnClicks.concat([ newElement ])
        : currentOnClicks
    })
  }

  // Returns the index of the element
  function findContainerIndex(targetElement: HTMLElement) {
    return sliderElements.findIndex(sliderElement =>
      sliderElement === targetElement || sliderElement.contains(targetElement))
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
    if (event.button !== 0) return

    event.preventDefault()
    setDragInProgress(true)
    setMouseDownEvent(event)
    const element: HTMLDivElement = sliderElements[findContainerIndex(event.target as HTMLElement)]
    setCurrentSliderElement(element)
    if (element.style.left !== '')
      setCurrentLeft(Number(element.style.left.replace('px', '')))
    setGrabClasses(element, true)
  }

  function handleOnMouseMove(event: React.MouseEvent) {
    if (!dragInProgress || mouseDownEvent === null || currentSliderElement === null) return
    // event.preventDefault()

    dragElement(currentSliderElement, currentLeft, event, mouseDownEvent)
  }

  function handleOnMouseLeave(event: React.MouseEvent) {
    if (!dragInProgress) return

    setDragInProgress(false)
    console.log(event.target)
  }

  function handleOnMouseUp(event: React.MouseEvent) {
    if (!dragInProgress) return

    setDragInProgress(false)
    console.log(event.target)
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
            className="content-slider__element no-transitions next"
          >
          { child }
          </div>)
        }
      </div>
    </ContentSliderContext.Provider>
  )
}
