import { useTranslation } from 'react-i18next'
import { BsChatDots } from 'react-icons/bs'
import MediaLinksContainer from './MediaLinksContainer'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="contact content-center">
      <div className="section-heading">
        <h2>{ t('contact.value') }</h2>
        <BsChatDots />
      </div>
      <div className="contact-container">
        <MediaLinksContainer />
      </div>
    </section>
  )
}
