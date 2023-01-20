import { BiLinkExternal } from 'react-icons/bi';

function Project({ setOverlayImg, language, title, url, image, footer, programmingLanguage }){
  return(
    <>
    <div className={`project__header${url === null ? '--no-link' : ''}`}>
      <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      <a href={url} target="_blank" rel="noopener noreferrer"><span className="display-none">{language === 'es' ? 'URL del projecto' : 'Project URL'}</span><BiLinkExternal /></a>
    </div>
    <img className="project__image" src={require(`../../img/${image}`)} alt={language === 'es' ? 'Imagen ' + title : title + ' image'} height="200" onClick = {e => setOverlayImg(e.target)} />
    <p className="project__footer">{footer}{programmingLanguage !== null ? <span> - <span>{programmingLanguage}</span></span> : <></>}</p>
    </>
  );
}

export default Project;