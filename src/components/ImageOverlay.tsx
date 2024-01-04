import { useContext, useEffect } from 'react'
import { type ImageContextValueInterface } from '@app/types-interfaces'
import { ImageContext } from '@app/contexts'

export default function ImageOverlay() {
  const imageState: ImageContextValueInterface = useContext(ImageContext)

  useEffect(() => {
    if (imageState.image !== null) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  })

  if (imageState.image === null) return <></>

  return (
    <div className="image-overlay" onClick={ () => imageState.setImage(null) }>
      <div className="image-overlay__container">
        <img src={ imageState.image }></img>
      </div>
    </div>
  )
}
