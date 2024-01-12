import { useContext } from 'react'
import { ImagesContext } from '@app/contexts'
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import type { ProjectInterface, ImagesContextValueInterface } from '@app/types-interfaces'

export default function Project({ project }: { project: ProjectInterface }) {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  function setImages() {
    imagesState.setImages(project.images)
  }

  return (
    <div className="project" >
      <div className="project__heading">
        {
        project.link === null
          ? <p>{ project.title }</p>
          : <><a target="_blank" rel="noreferrer" href={ project.link }>{ project.title } <LiaExternalLinkSquareAltSolid /></a></>
        }
      </div>
      <img src={ project.images[0] } alt={ project.title } onClick={ setImages } />
      <div className="project__footer">
        <p className="description">{ project.description }</p>
      </div>
    </div>
  )
}
