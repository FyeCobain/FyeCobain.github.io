import { VscFolder } from 'react-icons/vsc'
import { useTranslation } from 'react-i18next'
import ProjectsContainer from './ProjectsContainer'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <div id="projects" className="projects content-center">
      <div className="section-heading">
        <h2>{ t('projects.myProjects') }</h2>
        <VscFolder />
      </div>
      <ProjectsContainer />
    </div>
  )
}
