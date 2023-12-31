import { useTranslation } from 'react-i18next'
import { GiDiploma } from 'react-icons/gi'
import { SiCsharp } from 'react-icons/si'
import { NAME } from '@app/consts'
import photo from '/img/endlc.jpg'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="header content-center">
      <p className="header__hello text-center"><span>{ t('header.hello') }</span>, { t('header.im') }</p>

      <h1 className="text-center">{ NAME }</h1>

      <div className="header__photo content-center">
        <img src={ photo } alt={ t('alts.photo') } />
        <div className="dialog-bubble">
          <p className="text-center">{ t('header.welcome') }</p>
        </div>
      </div>

      <div className="header-info">
        <div className="header-info__degree">
          <GiDiploma className="icon-degree" />
          <p>{ t('aboutMe.degree') }</p>
        </div>

        <div className="header-info__job">
          <SiCsharp className="icon-job" />
          <p>{ t('aboutMe.job') }</p>
        </div>
      </div>

      <div className="dialog">
        <p className="text-center">{ t('header.welcome') }</p>
      </div>

    </header>
  )
}
