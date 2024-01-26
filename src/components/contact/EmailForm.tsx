import { useTranslation } from 'react-i18next'

export default function EmailForm() {
  const { t } = useTranslation()

  return (
    <div className="email-form-container content-center">
      <p>{ t('contact.sendMeAMessage') }</p>
      <form action="" className="email-form">
        <input type="email" placeholder={ t('contact.yourEmailAddress') } />
        <textarea placeholder={ `${ t('contact.message') }... ` } rows={ 4 }></textarea>
        <button>{ t('contact.send') }</button>
      </form>
    </div>
  )
}
