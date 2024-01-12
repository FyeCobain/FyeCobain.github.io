import type { ProjectInterface } from '@app/types-interfaces'
import { useTranslation } from 'react-i18next'
import Project from './Project'
import dracula_junior from '/img/projects/dracula-junior.png'

export default function ProjectsContainer() {
  const { t } = useTranslation()

  const projects: ProjectInterface[] = [
    {
      title: 'Dracula Junior',
      link: 'https://marketplace.visualstudio.com/items?itemName=FyeCobain.dracula-junior',
      images: [ dracula_junior ],
      description: t('projects.vscTheme'),
    },
    {
      title: 'Dracula Junior',
      link: null,
      images: [ dracula_junior ],
      description: t('projects.vscTheme'),
    },
  ]

  return (
    <div className="projects-container">
      <Project project={ projects[0] } />
      <Project project={ projects[1] } />
      <Project project={ projects[0] } />
    </div>
  )
}
