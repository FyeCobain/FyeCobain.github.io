import photo from '/img/endlc.jpg'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()

  return (
    <div className="content-center">
      <header className="header content-center">
        <p className="header__hello text-center"><span>{ t('header.hello') }</span>, { t('header.im') }</p>

        <h1 className="text-center">Michel Bracamontes</h1>

        <div className="header__photo content-center">
          <img src={ photo } alt={ t('alts.photo') } />
          <div className="dialog-bubble">
            <p className="text-center">{ t('header.welcome') }</p>
          </div>
        </div>

      </header>
    </div>
  )
}
