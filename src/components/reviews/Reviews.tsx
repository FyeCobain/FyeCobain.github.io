import { useTranslation } from 'react-i18next'
import { IoStarHalf } from 'react-icons/io5'
import { FREELANCER_PROFILE_URL } from '@app/consts/my.info'
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
      <div className="reviews__footer">
        <p>{ t('reviews.go') } <a href={ FREELANCER_PROFILE_URL } target="_blank" rel="noreferrer">{ t('reviews.here') }</a> { t('reviews.forMore') }</p>
      </div>
    </section>
  )
}
