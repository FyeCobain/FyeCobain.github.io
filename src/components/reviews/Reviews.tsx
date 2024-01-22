import { useTranslation } from 'react-i18next'
import { IoStarHalf } from 'react-icons/io5'

export default function Reviews() {
  const { t } = useTranslation()

  return (
    <section id="reviews" className="reviews">
      <div className="section-heading">
        <h2>{ t('reviews.value') }</h2>
        <IoStarHalf />
      </div>
    </section>
  )
}
