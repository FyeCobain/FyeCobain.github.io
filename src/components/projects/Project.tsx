import { type MutableRefObject, useContext, useEffect, useRef } from 'react'
import type { ProjectInterface, ImagesContextValueInterface, ContentSliderContextValueInterface } from '@app/types-interfaces'
import { ImagesContext, ContentSliderContext } from '@app/contexts'
import { getQueryParam, isURL } from '@app/functions'
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import { IoMdDownload } from 'react-icons/io'

export default function Project({ index, project }: { index: number, project: ProjectInterface }) {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const contentSliderState: ContentSliderContextValueInterface = useContext(ContentSliderContext)
  const imageRef: MutableRefObject<HTMLImageElement | null> = useRef(null)

  useEffect(() => {
    if (index > 0) return

    // Selecting the current image to show
    let imageId: number | null = Number(getQueryParam('image'))
    if (imageId !== null && !isNaN(imageId)) {
      imageId = Math.floor(imageId)
      if (imageId >= 1 && imageId <= project.slider_images.length) {
        imagesState.setMaxHeight(project.maxHeight)
        imagesState.setCurrentImageIndex(imageId - 1)
        imagesState.setImages(project.slider_images)
      }
    }
  }, [])

  useEffect(() => {
    contentSliderState.addOnClick({
      element: imageRef.current,
      onClick: () => {
        imagesState.setMaxHeight(project.maxHeight)
        imagesState.setImages(project.slider_images)
      },
    })
  }, [ project.slider_images ])

  return (
    <div className="project" >
      <div className="project__heading">
      {
      project.link === null
        ? <p>{ project.title }</p>
        : <a
            rel="noreferrer"
            target={ isURL(project.link) ? '_blank' : '' }
            href={ project.link }>{ project.title } { isURL(project.link) ? <LiaExternalLinkSquareAltSolid /> : <IoMdDownload /> }
          </a>
      }
      </div>
      <img ref={ imageRef } width="290" height="310" src={ project.image } alt={ project.title } />
      <div className="project__footer">
        <p className="description">{ project.description }{ project.languages.length === 0 ? <></> : <> - <span>{ project.languages.join(' / ') }</span></> }</p>
      </div>
    </div>
  )
}
