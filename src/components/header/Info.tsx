import { useTranslation } from 'react-i18next'
import { GiDiploma } from 'react-icons/gi'
import { SiCsharp } from 'react-icons/si'

export default function Info() {
  const { t, i18n } = useTranslation()

  // "header-info__degree-text--long content-center"

  return (
    <div className="header-info">
      <div className="header-info__degree">
        <GiDiploma className="icon-degree" />
        <div className={ `content-center header-info__degree-text${ i18n.language === 'es' ? '--long' : '' }` }>
          <p>{ `${ t('aboutMe.degreePart1') }` }</p>
          <p><span className="space">&nbsp;</span>{ t('aboutMe.degreePart2') }</p>
        </div>
      </div>

      <div className="header-info__job">
        <SiCsharp className="icon-job" />
        <p className="header-info__job-text">{ t('aboutMe.job') }</p>
      </div>
    </div>
  )
}
