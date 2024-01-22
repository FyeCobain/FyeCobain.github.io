import { useContext } from 'react'
import { IoStarSharp } from 'react-icons/io5'
import { FREELANCER_PROFILE_URL } from '@app/consts/my.info'
import { ImagesContext } from '@app/contexts'
import type { ImagesContextValueInterface, ReviewInterface } from '@app/types-interfaces'

export default function Review({ review }: { review: ReviewInterface }) {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const photo: string = review.reviewerPhoto ?? 'https://www.f-cdn.com/assets/main/en/assets/unknown.png'

  return (
    <div className="review">
      <div className="review__user">
        <img src={ photo } alt="User" onClick={ () => imagesState.setImages([ photo ]) } />
        <p>{ review.reviewerName } <span>&#9866;</span> <span>{ review.reviewerCountry }</span></p>
      </div>
      <div className="review__details">
        <a target="_blank" rel="noreferrer" href={ `${ FREELANCER_PROFILE_URL }?review_context_id=${ review.id }&review_type=project` }>
          <h3>{ review.projectTitle }</h3>
        </a>
        <blockquote>{ review.reviewText }</blockquote>
        <div className="review__stars">
        {
          Array.from(Array(review.starsQuantity).keys()).map((index: number) => <IoStarSharp key={ index } />)
        }
        </div>
      </div>
    </div>
  )
}
