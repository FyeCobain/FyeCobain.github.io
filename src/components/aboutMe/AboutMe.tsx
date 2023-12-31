import { useTranslation } from 'react-i18next'
import Info from './Info'

export default function AboutMe() {
  const { t } = useTranslation()

  return (
    <div className="about-me content-center">
      <h2>{ t('aboutMe.value') }</h2>

      <Info />
    </div>
  )
}
