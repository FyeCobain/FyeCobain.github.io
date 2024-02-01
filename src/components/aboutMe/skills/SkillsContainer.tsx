import { GrHtml5 } from 'react-icons/gr'
import { FaNodeJs } from 'react-icons/fa'
import { VscFileBinary } from 'react-icons/vsc'
import { IoExtensionPuzzleOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import Skills from './Skills'
import Hobbies from './Hobbies'

export default function SkillsContainer() {
  const { t } = useTranslation()

  const skills: string[][] = [
    [ // Frontend
      'HTML',
      'JavaScript / TypeScript',
      'React.js / Next.js',
      'CSS / SASS',
      'Tailwind',
      'Bootstrap / Bulma',
      'Angular',
      'Gulp',
      'Jest',
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
      'Swagger',
    ],
    [ // General
      'Docker',
      'Java Core',
      'C#',
      'Python',
      'AutoHotkey',
      'Android Studio',
      'Prolog',
      'Unity',
      t('skills.advancedRegex'),
    ],
    [ // Soft skills
      t('skills.teamwork'),
      t('skills.creative'),
      t('skills.patiente'),
      t('skills.curiosity'),
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
        <Skills title="Frontend" icon={ <GrHtml5 /> } skillsArray={ skills[0] } />
        <Skills title="Backend" icon={ <FaNodeJs /> } skillsArray={ skills[1] } />
        <Skills title="Desktop / General" icon={ <VscFileBinary /> } skillsArray={ skills[2] } />
        <Skills title={ t('skills.softSkills') } icon={ <IoExtensionPuzzleOutline /> } skillsArray={ skills[3] } />
        <Hobbies />
      </div>
    </div>
  )
}
