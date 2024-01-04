import { useTranslation } from 'react-i18next'
import photo from '/img/endlc.jpg'
import { useContext } from 'react'
import { type ImageContextValueInterface } from '@app/types-interfaces'
import { ImageContext } from '@app/contexts'

export default function Photo() {
  const { t } = useTranslation()
  const imageState: ImageContextValueInterface = useContext(ImageContext)

  return (
    <div className="header__photo content-center">

      <div className="header__photo-container">
        <img width="200" height="200" src={ photo } alt={ t('alts.photo') } onClick={ () => imageState.setImage(photo) } />
        <div className="header__photo-container--overlay"></div>
      </div>

      <div className="dialog-bubble">
        <p className="text-center">{ t('header.welcome') }</p>
      </div>

    </div>
  )
}
