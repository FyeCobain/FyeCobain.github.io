import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { type ImagesContextValueInterface } from '@app/types-interfaces'
import { ImagesContext } from '@app/contexts'
import me from '/img/me.jpg'
import myself from '/img/myself.jpg'

export default function Photo() {
  const { t } = useTranslation()
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)

  function setImage() {
    imagesState.setImages([ myself ])
    imagesState.setMaxHeight(true)
  }

  return (
    <div className="header__photo content-center">

      <div className="header__photo-container">
        <img width="200" height="200" alt={ t('alts.photo') } src={ me } onClick={ setImage } />
        <div className="header__photo-container--overlay"></div>
      </div>

      <div className="dialog-bubble">
        <p className="text-center">{ t('header.welcome') }</p>
      </div>

    </div>
  )
}
