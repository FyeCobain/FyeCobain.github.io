import { VscFolder } from 'react-icons/vsc'
import { useTranslation } from 'react-i18next'
import ProjectsContainer from './ProjectsContainer'
import GitHub from './GitHub'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="projects content-center">
      <div className="section-heading">
        <h2>{ t('projects.myProjects') }</h2>
        <VscFolder />
      </div>
      <ProjectsContainer />
      <GitHub />
    </section>
  )
}
