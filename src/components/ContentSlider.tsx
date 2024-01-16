import React from 'react'
import type { ContentSliderPropsInterface } from '@app/types-interfaces'

export default function ContentSlider(props: ContentSliderPropsInterface) {
  let classes: string[] = [ 'content-slider' ]
  classes = classes.concat(props.className.split(' '))

  return (
    <div className={ classes.join(' ') }>
      {
        React.Children.map(props.children, (child: React.ReactNode) =>
        <div className="content-slider__element">
        { child }
        </div>)
      }
    </div>
  )
}
