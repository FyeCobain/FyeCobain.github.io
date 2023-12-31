import { FaMedal, FaFlagUsa } from 'react-icons/fa'
import { IoSchoolOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { GiPodiumWinner } from 'react-icons/gi'
import { UNI } from '@app/consts'

export default function Info() {
  const { t } = useTranslation()
  const yearsOfExperience: number = new Date().getFullYear() - 2017

  return (
    <ul className="about-me__info">
      <li className="about-me__info-container experience">
        <FaMedal />
        <p>+{ `${yearsOfExperience} ${t('info.yearsOfExperience')}` }</p>
      </li>

      <li className="about-me__info-container alma-mater">
        <IoSchoolOutline />
        <p>{ `${t('info.graduatedFrom')}` } <span>{ UNI }</span></p>
      </li>

      <li className="about-me__info-container english">
        <FaFlagUsa />
        <p>{ t('info.englishLevel') }</p>
      </li>

      <li className="about-me__info-container top-1">
        <GiPodiumWinner />
        <p>{ t('info.top1') }</p>
      </li>
    </ul>
  )
}
