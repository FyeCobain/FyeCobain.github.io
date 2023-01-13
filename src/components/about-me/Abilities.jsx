import { BsCheck } from 'react-icons/bs';

function Abilities({ className, heading, icon, abilities }){
  return(
    <div className={`abilities ${className}`}>
      <div className="heading">
        <h4>{heading}</h4>
        {icon}
      </div>
      <ul>
        {
          abilities.map((abilitie, index) => {
          return(
          <li key={index}>
            <BsCheck className="icon" />
            {abilitie}
          </li>)
          })
        }
      </ul>
    </div>
  );
}

export default Abilities;