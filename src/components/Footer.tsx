import { IoLogoGithub } from 'react-icons/io'
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import { GITHUB_USER } from '@app/consts'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <a className="footer__icon" aria-label="GitHub" href={ `https://github.com/${ GITHUB_USER }` } target="_blank" rel="noreferrer">
          <IoLogoGithub />
          <LiaExternalLinkSquareAltSolid />
        </a>{ GITHUB_USER }
      </p>
    </footer>
  )
}
