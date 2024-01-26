import { useTranslation } from 'react-i18next'
import { NAME, EMAIL, TELEGRAM_USER, LINKEDIN_SLUG } from '@app/consts'
import MediaLink from './MediaLink'
import { FaTelegram, FaLinkedin } from 'react-icons/fa'
import { LuMailPlus } from 'react-icons/lu'

export default function MediainksContainer() {
  const { t } = useTranslation()

  return (
    <div className="media-links-container">
      <MediaLink
        icon={ <FaLinkedin /> }
        url={ `https://www.linkedin.com/in/${ LINKEDIN_SLUG }` }
        ariaLabel='LinkedIn'
        text="LinkedIn"
      />

      <MediaLink
        icon={ <FaTelegram /> }
        url={ `https://t.me/${ TELEGRAM_USER }` }
        ariaLabel='Telegram'
        text={ `@${ TELEGRAM_USER }` }
        copyText={ `@${ TELEGRAM_USER }` }
      />

      <MediaLink
        icon={ <LuMailPlus /> }
        url={ `mailto:${ EMAIL }?subject=${ t('header.hello') } ${ NAME }` }
        ariaLabel='email'
        text={ EMAIL }
        copyText={ EMAIL }
      />
    </div>
  )
}
