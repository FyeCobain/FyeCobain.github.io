import { useTranslation } from 'react-i18next'
import { GiDiploma } from 'react-icons/gi'
import { SiCsharp } from 'react-icons/si'

export default function Info() {
  const { t } = useTranslation()

  return (
    <div className="header-info">
      <div className="header-info__degree">
        <GiDiploma className="icon-degree" />
        <div className="header-info__degree-text content-center">
          <p>{ `${ t('aboutMe.degreePart1') }` }</p>
          <p><span className="space">&nbsp;</span>{ t('aboutMe.degreePart2') }</p>
        </div>
      </div>

      <div className="header-info__job">
        <SiCsharp className="icon-job" />
        <p>{ t('aboutMe.job') }</p>
      </div>
    </div>
  )
}
