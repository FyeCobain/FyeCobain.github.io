import React from 'react'
import type { ContentSliderPropsInterface } from '@app/types-interfaces'

export default function ContentSlider({ className, children }: ContentSliderPropsInterface) {
  return (
    <div className={ ('content-slider ' + className).trim() }>
      {
        React.Children.map(children, (child: React.ReactNode) =>
        <div className="content-slider__element">
        { child }
        </div>)
      }
    </div>
  )
}
