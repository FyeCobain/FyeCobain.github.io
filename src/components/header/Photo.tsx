import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'
import { ImagesContext } from '@app/contexts'
import photo from '/img/endlc.jpg'

export default function Photo() {
  const { t } = useTranslation()
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  function setImage() {
    imagesState.setImages([ photo ])
  }

  return (
    <div className="header__photo content-center">

      <div className="header__photo-container">
        <img width="200" height="200" alt={ t('alts.photo') } src={ photo } onClick={ setImage } />
        <div className="header__photo-container--overlay"></div>
      </div>

      <div className="dialog-bubble">
        <p className="text-center">{ t('header.welcome') }</p>
      </div>

    </div>
  )
}
