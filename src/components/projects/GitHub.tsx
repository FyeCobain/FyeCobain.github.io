import { GITHUB_PROFILE_URL } from '@app/consts/my.info'
import { isEnglish } from '@app/functions'
import { useTranslation } from 'react-i18next'
import { type ImagesContextValueInterface } from '@app/types-interfaces'
import { useContext } from 'react'
import { ImagesContext } from '@app/contexts'
import contributions from '/img/projects/github.png'

export default function GitHub() {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  const { t, i18n } = useTranslation()

  const alt = isEnglish(i18n.language)
    ? `GitHub ${ t('projects.contributions') }`
    : `${ t('projects.contributions') } GitHub`

  const gitHubLink = <a href={ GITHUB_PROFILE_URL } target="_blank" rel="noreferrer">GitHub</a>

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
