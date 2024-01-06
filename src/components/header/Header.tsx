import { useTranslation } from 'react-i18next'
import { NAME } from '@app/consts'
import Photo from './Photo'
import Info from './Info'
import CVButton from './../CVButton'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header id="header" className="header content-center">
      <p className="header__hello text-center"><span>{ t('header.hello') }</span>, { t('header.im') }</p>

      <h1 className="text-center">{ NAME }</h1>

      <Photo />

      <Info />

      <div className="dialog">
        <p className="text-center">{ t('header.welcome') }</p>
      </div>

      <CVButton className = "cv-button--header" />

    </header>
  )
}
