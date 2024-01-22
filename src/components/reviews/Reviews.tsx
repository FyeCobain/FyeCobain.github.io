import { useTranslation } from 'react-i18next'
import { IoStarHalf } from 'react-icons/io5'
import ReviewsContainer from './ReviewsContainer'

export default function Reviews() {
  const { t } = useTranslation()

  return (
    <section id="reviews" className="reviews content-center">
      <div className="section-heading">
        <h2>{ t('reviews.value') }</h2>
        <IoStarHalf />
      </div>
      <ReviewsContainer />
    </section>
  )
}
