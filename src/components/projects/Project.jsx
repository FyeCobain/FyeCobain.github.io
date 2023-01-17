import { BiLinkExternal } from 'react-icons/bi';

function Project({ setOverlayImg, language, projectData }){
  return(
    <>
    <div className="project__header">
      <a href={projectData.url} target="_blank" rel="noopener noreferrer">{projectData.title}</a>
      <a href={projectData.url} target="_blank" rel="noopener noreferrer"><span className="display-none">{language === 'es' ? 'URL del projecto' : 'Project URL'}</span><BiLinkExternal /></a>
    </div>
    <img className="project__image" src={require(`../../img/${projectData.image}`)} alt={language === 'es' ? 'Imagen ' + projectData.title : projectData.title + ' image'} height="200" onClick = {e => setOverlayImg(e.target)} />
    <p className="project__footer">{projectData.footer}{projectData.language !== null ? <> - <span>{projectData.language}</span></> : <></>}</p>
    </>
  );
}

export default Project;