import { type MutableRefObject, useContext, useEffect, useRef } from 'react'
import type { ProjectInterface, ImagesContextValueInterface, ContentSliderContextValueInterface } from '@app/types-interfaces'
import { ImagesContext, ContentSliderContext } from '@app/contexts'
import { isURL } from '@app/functions'
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import { IoMdDownload } from 'react-icons/io'

export default function Project({ project }: { project: ProjectInterface }) {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const contentSliderState: ContentSliderContextValueInterface = useContext(ContentSliderContext)
  const imageRef: MutableRefObject<HTMLImageElement | null> = useRef(null)

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
