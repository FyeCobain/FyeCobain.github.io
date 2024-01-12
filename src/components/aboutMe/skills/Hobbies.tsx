import { useTranslation } from 'react-i18next'
import { GiBookmarklet, GiMagnifyingGlass, GiTreeBranch } from 'react-icons/gi'
import { PiTelevisionBold } from 'react-icons/pi'
import { FaGamepad } from 'react-icons/fa'

export default function Hobbies() {
  const { t } = useTranslation()

  return (
    <div className="hobbies-container">
      <div className="hobbies-container__heading">
        <h4>{ t('hobbies.myHobbies') }</h4>
      </div>
      <div className="hobbies-container__list">
        <ul>
          <li><GiBookmarklet /> { t('hobbies.books') }</li>
          <li><GiMagnifyingGlass /> { t('hobbies.learn') }</li>
          <li><GiTreeBranch /> { t('hobbies.nature') }</li>
          <li><PiTelevisionBold /> Anime</li>
          <li><FaGamepad /> { t('hobbies.games') }</li>
        </ul>
      </div>
    </div>
  )
}
