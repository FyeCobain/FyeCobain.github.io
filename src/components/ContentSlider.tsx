import React from 'react'
import type { ContentSliderPropsInterface } from '@app/types-interfaces'

export default function ContentSlider(props: ContentSliderPropsInterface) {
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
    <div className={ (`content-slider--phone-${ phoneCols } content-slider--tablet-${ tabletCols } content-slider--laptop-${ laptopCols } ${ props.className }`).trim() }>
      {
        React.Children.map(props.children, (child: React.ReactNode) =>
        <div
          className="content-slider__element"
        >
        { child }
        </div>)
      }
    </div>
  )
}
