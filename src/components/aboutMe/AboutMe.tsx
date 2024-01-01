import { useTranslation } from 'react-i18next'
import Info from './Info'
import CVButton from '@app/components/CVButton'

export default function AboutMe() {
  const { t } = useTranslation()

  return (
    <div className="about-me content-center">
      <h2>{ t('aboutMe.value') }</h2>
      <CVButton className="cv-button--about-me" />
      <Info />
    </div>
  )
}
