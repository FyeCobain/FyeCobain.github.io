import { useTranslation } from 'react-i18next'

export default function CVButton() {
  const { t } = useTranslation()

  return (
    <div className="cv-button">
      <button>{ t('info.getMy') } <span>CV</span></button>
    </div>
  )
}
