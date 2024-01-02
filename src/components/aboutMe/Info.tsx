import { FaMedal, FaFlagUsa } from 'react-icons/fa'
import { IoSchoolOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { GiPodiumWinner } from 'react-icons/gi'
import { ALMA_MATER, ALMA_MATER_URL } from '@app/consts'
import { isEnglish } from '@app/functions'

export default function Info() {
  const { t, i18n } = useTranslation()
  const EXPERIENCE_YEARS: number = new Date().getFullYear() - 2017
  const LANGUAGE_LEVEL: string = t('info.english')
  const ALMA_MATER_ANCHOR = <a href={ ALMA_MATER_URL } target="_blank" rel="noreferrer">{ ALMA_MATER }</a>
  const AHK_ANCHOR = <a href="https://www.autohotkey.com/" target="_blank" rel="noreferrer">AutoHotkey</a>
  const FREELANCER_TOP_ANCHOR = <a href="https://www.freelancer.com/freelancers/mexico/autohotkey" target="_blank" rel="noreferrer">{ t('info.latinAmerica') }</a>

  return (
    <ul className="about-me__info">
      <li className="about-me__info-container experience">
        <FaMedal />
        <p>+<span>{ EXPERIENCE_YEARS }</span> { t('info.yearsOfExperience') }</p>
      </li>

      <li className="about-me__info-container alma-mater">
        <IoSchoolOutline />
        <p>{ `${ t('info.graduatedFrom') }` } { ALMA_MATER_ANCHOR}</p>
      </li>

      <li className="about-me__info-container english">
        <FaFlagUsa />
        <p>
        {
          isEnglish(i18n.language) ? <>B2 { LANGUAGE_LEVEL }</> : <>{ LANGUAGE_LEVEL } (B2)</>
        }
        </p>
      </li>

      <li className="about-me__info-container top-1">
        <GiPodiumWinner />
        <p>
        {
          isEnglish(i18n.language)
            ? <>#1 { AHK_ANCHOR } programmer in { FREELANCER_TOP_ANCHOR }</>
            : <>Programador #1 de { AHK_ANCHOR } en { FREELANCER_TOP_ANCHOR }</>
        }
        </p>
      </li>
    </ul>
  )
}
