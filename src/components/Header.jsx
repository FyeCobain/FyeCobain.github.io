import foto from '../img/endlc.jpg';

function Header({ globalStrings, strings}){
  return(
    <div className="container">
      <div className="header">
        <p>{strings.hello}</p>
        <h1>{globalStrings.devName}</h1>
        <p>{strings.devTitle}</p>
        <p>{strings.devWork}</p>
        <img className="photo" src={foto} alt={strings.photoAlt} />
      </div>
    </div>
  );
}

export default Header;