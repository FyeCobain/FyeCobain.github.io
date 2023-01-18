import { useState } from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { AiOutlineGithub } from 'react-icons/ai';
import { SiFreelancer } from 'react-icons/si';
import { MdOutlineContentCopy } from 'react-icons/md';
import { BsClipboardCheck } from 'react-icons/bs'
import { BiLink } from 'react-icons/bi';

export default function SocialMedia({ globalValues, strings }){
  // Hook para saber cuando el email ha sido copiado
  const [emailCopied, setEmailCopied] = useState(false);
  function copyEmail(){
    try{
      navigator.clipboard.writeText(globalValues.devEmail);
      setEmailCopied(true);
    }
    catch(error){ }
  }

  return(
    <div className="media-container">

      <div className="media email">
        <a className="media__header email__header"
          href={`mailto:${globalValues.devEmail}?Subject=${strings.emailSubject}`}
          target="_blank"
          rel="noopener noreferrer">
            <span className="display-none">{strings.emailLink}</span>
            <HiOutlineMailOpen className="media__icon" />
            <BiLink className="media__icon-link" />
        </a>
          <p
            className="media__text--copy"
            onClick={copyEmail}>
            {globalValues.devEmail}
            {!emailCopied ? <MdOutlineContentCopy className="media__icon-copy"/> : <BsClipboardCheck className="media__icon-copy"/>}
          </p>
      </div>

      <div className="media github">
        <a className="media__header github__header"
          href={globalValues.devGitHub}
          target="_blank"
          rel="noopener noreferrer">
            <span className="display-none">{strings.gitHubLink}</span>
            <AiOutlineGithub className="media__icon" />
            <BiLink className="media__icon-link" />
        </a>
        <p className="media__text">{globalValues.devGitHubUser}</p>
      </div>

      <div className="media freelancer">
        <a className="media__header freelancer__header"
          href={globalValues.devFL}
          target="_blank"
          rel="noopener noreferrer">
            <span className="display-none">{strings.freelancerLink}</span>
            <SiFreelancer className="media__icon" />
            <BiLink className="media__icon-link" />
        </a>
        <p className="media__text">{globalValues.devFLUser}</p>
      </div>

    </div>
  );
}