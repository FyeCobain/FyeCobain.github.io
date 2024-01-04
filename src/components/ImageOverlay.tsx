import { ImageContext } from '@app/contexts'
import { useContext, useEffect } from 'react'

export default function ImageOverlay() {
  const image: string | null = useContext(ImageContext)

  useEffect(() => {
    if (image !== null) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  })

  if (image === null) return <></>

  return (
    <div className="image-overlay">
      <div className="image-overlay__container">
        <img src={ image }></img>
      </div>
    </div>
  )
}
