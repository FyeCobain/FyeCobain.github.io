import React from 'react'
import type { ContentSliderPropsInterface } from '@app/types-interfaces'

export default function ContentSlider(props: ContentSliderPropsInterface) {
  return (
    <div className={ ('content-slider ' + props.className).trim() }>
      {
        React.Children.map(props.children, (child: React.ReactNode) =>
        <div className="content-slider__element">
        { child }
        </div>)
      }
    </div>
  )
}
