import { type MutableRefObject, useContext, useEffect, useRef } from 'react'
import { IoStarSharp } from 'react-icons/io5'
import { ContentSliderContext, ImagesContext } from '@app/contexts'
import type { ContentSliderContextValueInterface, ImagesContextValueInterface, ReviewInterface } from '@app/types-interfaces'
import { FREELANCER_PROFILE_URL } from '@app/consts/my.info'

export default function Review({ review }: { review: ReviewInterface }) {
  const imagesState: ImagesContextValueInterface = useContext(ImagesContext)
  const contentSliderState: ContentSliderContextValueInterface = useContext(ContentSliderContext)
  const imageRef: MutableRefObject<HTMLImageElement | null> = useRef(null)
  const photo: string = review.reviewerPhoto ?? 'https://www.f-cdn.com/assets/main/en/assets/unknown.png'

  useEffect(() => {
    contentSliderState.addOnClick({
      element: imageRef.current,
      onClick: () => {
        imagesState.setImages([ photo ])
      },
    })
  }, [])

  return (
    <div className="review">
      <div className="review__user">
        <img ref={ imageRef } src={ photo } alt="User" />
        <p className="review__user--info"><span>{ review.reviewerName }</span>{ review.reviewerCountry === null ? <></> : <><span>&nbsp;&#9866;&nbsp;</span><span>{ review.reviewerCountry }</span></> }</p>
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
