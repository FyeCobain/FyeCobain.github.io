import { GrHtml5 } from 'react-icons/gr'
import { FaNodeJs } from 'react-icons/fa'
import { VscFileBinary } from 'react-icons/vsc'
import { useTranslation } from 'react-i18next'
import Skill from './Skills'

export default function SkillsContainer() {
  const { t } = useTranslation()

  const skills: string[][] = [
    [ // Frontend
      'HTML 5',
      'CSS / SASS',
      'Tailwind',
      'Bootstrap / Bulma',
      'JavaScript / TypeScript',
      'Angular',
      'React.js / Next.js',
      'Gulp',
    ],
    [ // Backend
      'PHP / Laravel',
      'Java / Spring Boot / Reactor',
      'Node.js / Nest.js',
      'GraphQL',
      'MySQL',
      'MongoDB',
      'Heroku',
      'Amazon Web Services',
    ],
    [ // General
      'C#',
      'AutoHotkey',
      'Python',
      'Java Core',
      'Android Studio (Java)',
      'GameMaker: Studio',
      'Unity',
      t('skills.advancedRegex'),
    ],
    [ // Soft skills
      t('skills.teamwork'),
      t('skills.creative'),
      t('skills.patiente'),
      t('skills.organized'),
      t('skills.time'),
      t('skills.critical'),
      t('skills.logical'),
      t('skills.troubleshooting'),
    ],
  ]

  return (
    <div className="skills content-center">
      <h3>{ t('skills.value') }</h3>
      <div className="skills-parent-container">
        <Skill title="Frontend" icon={ <GrHtml5 /> } skillsArray={ skills[0] } />
        <Skill title="Backend" icon={ <FaNodeJs /> } skillsArray={ skills[1] } />
        <Skill title="General" icon={ <VscFileBinary /> } skillsArray={ skills[2] } />
        <Skill title={ t('skills.softSkills') } skillsArray={ skills[3] } />
      </div>
    </div>
  )
}
