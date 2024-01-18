import React, { type MutableRefObject, useRef, useState, useEffect } from 'react'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, DivNullable, ElementOnClick } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'

// Returns the index of the onClick element
function findOnClickElement(currentOnClicks: ElementOnClick[], element: HTMLElement | null) {
  return currentOnClicks.findIndex((currentOnClick: ElementOnClick) => currentOnClick.element === element)
}

// Removes the unnecessary classes from the slider element containers
function addClasses(sliderElements: HTMLDivElement[]) {
  sliderElements[0].classList.remove('next')
  setTimeout(() => {
    sliderElements.forEach((sliderElement: HTMLDivElement) => {
      sliderElement.classList.remove('no-transitions')
    })
  }, 0)
}

export default function ContentSlider(props: ContentSliderPropsInterface) {
  // Context for the slider onClick callbacks
  const [ onClicks, setOnClicks ] = useState<ElementOnClick[]>([])
  const [ sliderElements, setSliderElements ] = useState<HTMLDivElement[]>([])
  const sliderRef: MutableRefObject<DivNullable> = useRef(null)

  useEffect(() => {
    if (sliderRef.current === null) return

    const elems: HTMLDivElement[] = Array.from(sliderRef.current.querySelectorAll(':scope > DIV'))
      .map((element: Node) => element as HTMLDivElement)

    setSliderElements(elems)
    addClasses(elems)
  }, [])

  // Adds a new onClick callbacks to the context
  function addOnClick(newElement: ElementOnClick) {
    setOnClicks((currentOnClicks: ElementOnClick[]) => {
      return findOnClickElement(currentOnClicks, newElement.element) === -1
        ? currentOnClicks.concat([ newElement ])
        : currentOnClicks
    })
  }

  // Handles the single click event
  function handleOnClick(event: React.MouseEvent) {
    console.log(sliderElements)

    const index: number = findOnClickElement(onClicks, event.target as HTMLElement)
    if (index === -1) return

    event.preventDefault()
    const onClick = onClicks[index].onClick
    if (onClick !== null) onClick(event)
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
        onClick={ handleOnClick }
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
