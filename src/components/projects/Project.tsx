import { useContext } from 'react'
import type { ProjectInterface, ImagesContextValueInterface } from '@app/types-interfaces'
import { ImagesContext } from '@app/contexts'
import { isURL } from '@app/functions'
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import { IoMdDownload } from 'react-icons/io'

export default function Project({ project }: { project: ProjectInterface }) {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  function setImages() {
    imagesState.setMaxHeight(project.maxHeight)
    imagesState.setImages(project.slider_images)
  }

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
      <img width="290" height="310" src={ project.image } alt={ project.title } onClick={ setImages } />
      <div className="project__footer">
        <p className="description">{ project.description }{ project.languages.length === 0 ? <></> : <> - <span>{ project.languages.join(' / ') }</span></> }</p>
      </div>
    </div>
  )
}
