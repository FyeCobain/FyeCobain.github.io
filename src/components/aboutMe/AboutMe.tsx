import CVButton from '@app/components/CVButton'
import Info from './Info'
import SkillsContainer from './skills/SkillsContainer'
import { useTranslation } from 'react-i18next'
import { AiOutlineUser } from 'react-icons/ai'

export default function AboutMe() {
  const { t } = useTranslation()

  return (
    <main id="about-me" className="about-me content-center">
      <div className="section-heading">
        <h2>{ t('aboutMe.value') }</h2>
        <AiOutlineUser />
      </div>
      <CVButton className="cv-button--about-me" />
      <Info />
      <SkillsContainer />
    </main>
  )
}
