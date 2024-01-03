import { BsCheck } from 'react-icons/bs'

interface SkillProps {
  title: string
  skillsArray: string[]
  icon?: any
}

export default function Skills({ title, skillsArray, icon }: SkillProps) {
  return (
    <div className="skills-container">
      <div className="skills-container__header">
        <h4>{ title }</h4>
        { icon }
      </div>
        <ul className="skills-container__list">
          {
            skillsArray.map((skill, index) => <li key={ index }><BsCheck />{ skill }</li>)
          }
        </ul>
    </div>
  )
}
