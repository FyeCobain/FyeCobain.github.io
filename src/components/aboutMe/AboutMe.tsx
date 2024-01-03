import CVButton from '@app/components/CVButton'
import Info from './Info'
import SkillsContainer from './skills/SkillsContainer'
import { useTranslation } from 'react-i18next'

export default function AboutMe() {
  const { t } = useTranslation()

  return (
    <main className="about-me content-center">
      <h2>{ t('aboutMe.value') }</h2>
      <CVButton className="cv-button--about-me" />
      <Info />
      <SkillsContainer />
    </main>
  )
}
