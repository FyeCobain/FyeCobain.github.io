import React, { useState } from 'react'
import type { ContentSliderContextValueInterface, ContentSliderPropsInterface, ElementOnClick } from '@app/types-interfaces'
import { ContentSliderContext } from '@app/contexts'

export default function ContentSlider(props: ContentSliderPropsInterface) {
  // Context for the slider onClick callbacks
  const [ onClicks, setOnClicks ] = useState<ElementOnClick[]>([])
  const contentSliderContext: ContentSliderContextValueInterface = {
    onClicks,
    addOnClick,
  }

  // Adding new onClick callbacks to the context
  function addOnClick(newElement: ElementOnClick) {
    setOnClicks((currentOnClicks: ElementOnClick[]) => {
      return findOnClickElement(currentOnClicks, newElement.element) === -1 ? currentOnClicks.concat([ newElement ]) : currentOnClicks
    })
  }

  // Return the index of the onClick element
  function findOnClickElement(currentOnClicks: ElementOnClick[], element: HTMLElement | null) {
    return currentOnClicks.findIndex((currentOnClick: ElementOnClick) => currentOnClick.element === element)
  }

  // Handles the single click event
  function handleOnClick(event: React.MouseEvent) {
    const index: number = findOnClickElement(onClicks, event.target as HTMLElement)
    if (index === -1) return
    event.preventDefault()
    const onClick = onClicks[index].onClick
    if (onClick !== null)
      onClick(event)
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

  return (
    <ContentSliderContext.Provider value={ contentSliderContext }>
      <div onClick={ handleOnClick } className={ (`content-slider--phone-${ phoneCols } content-slider--tablet-${ tabletCols } content-slider--laptop-${ laptopCols } ${ props.className }`).trim() }>
        {
          React.Children.map(props.children, (child: React.ReactNode) =>
          <div
            className="content-slider__element"
          >
          { child }
          </div>)
        }
      </div>
    </ContentSliderContext.Provider>
  )
}
