import { useTranslation } from 'react-i18next'
import { GiDiploma } from 'react-icons/gi'
import { SiCsharp } from 'react-icons/si'
import { isEnglish } from '@app/functions'

export default function Info() {
  const { t, i18n } = useTranslation()

  return (
    <div className="header-info">
      <div className="header-info__degree">
        <GiDiploma className="icon-degree" />
        <div className={ `content-center header-info__degree-text${ !isEnglish(i18n.language) ? '--long' : '' }` }>
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
