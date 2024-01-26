import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { GITHUB_USER } from '@app/consts'
import { isEnglish } from '@app/functions'
import { type ImagesContextValueInterface } from '@app/types-interfaces'
import { ImagesContext } from '@app/contexts'
import contributions from '/img/projects/github.png'

export default function GitHubInfo() {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  const { t, i18n } = useTranslation()

  const alt = isEnglish(i18n.language)
    ? `GitHub ${ t('projects.contributions') }`
    : `${ t('projects.contributions') } GitHub`

  const gitHubLink = <a href={ `https://github.com/${ GITHUB_USER }` } target="_blank" rel="noreferrer">GitHub</a>

  return (
    <div className="projects__github">
        <img src={ contributions } alt={ alt } onClick={ () => imagesState.setImages([ contributions ]) }></img>
        {
          isEnglish(i18n.language)
            ? <p>{ gitHubLink } { t('projects.contributions') }</p>
            : <p>{ t('projects.contributions') } { gitHubLink }</p>
        }
      </div>
  )
}
