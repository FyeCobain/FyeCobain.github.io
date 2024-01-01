import { useTranslation } from 'react-i18next'

export default function CVButton({ className }: { className: string }) {
  const { t } = useTranslation()

  return (
    <div className={ className }>
      <button>{ t('info.getMy') } <span>CV</span></button>
    </div>
  )
}
