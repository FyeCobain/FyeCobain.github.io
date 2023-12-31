import { useTranslation } from 'react-i18next'
import photo from '/img/endlc.jpg'

export default function Photo() {
  const { t } = useTranslation()

  return (
    <div className="header__photo content-center">
      <img width="200" height="200" src={ photo } alt={ t('alts.photo') } />
      <div className="dialog-bubble">
        <p className="text-center">{ t('header.welcome') }</p>
      </div>
    </div>
  )
}
