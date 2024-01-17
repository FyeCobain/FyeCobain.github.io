import React from 'react'
import type { ContentSliderPropsInterface } from '@app/types-interfaces'

export default function ContentSlider(props: ContentSliderPropsInterface) {
  let phoneCols: string = 'n'
  if (props.phoneCols !== undefined)
    phoneCols = props.phoneCols.toString()
  console.log('thoneCols', phoneCols)

  let tabletCols: string = 'n'
  if (props.tabletCols !== undefined)
    tabletCols = props.tabletCols.toString()
  console.log('tabletCols', tabletCols)

  let laptopCols: string = 'n'
  if (props.laptopCols !== undefined)
    laptopCols = props.laptopCols.toString()
  console.log('laptopCols', laptopCols)

  const classes = (`content-slider--phone-${ phoneCols } content-slider--tablet-${ tabletCols } content-slider--laptop-${ laptopCols } ${ props.className }`).trim()

  return (
    <div className={ classes }>
      {
        React.Children.map(props.children, (child: React.ReactNode) =>
        <div className="content-slider__element">
        { child }
        </div>)
      }
    </div>
  )
}
