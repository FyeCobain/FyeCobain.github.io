import type { ReviewInterface } from '@app/types-interfaces'
import Review from './Review'
import reviewer2 from '/img/reviewers/2.webp'
import { useTranslation } from 'react-i18next'
import { isEnglish } from '@app/functions'
import { NAME } from '@app/consts'

export default function ReviewsContainer() {
  const { i18n } = useTranslation()

  const reviews: ReviewInterface[] = [
    {
      id: 34026008,
      reviewerName: 'Matheus M.',
      reviewerPhoto: reviewer2,
      reviewerCountry: isEnglish(i18n.language) ? 'Brazil' : 'Brasil',
      projectTitle: 'Write a program to look for a string in several txt files',
      reviewText: isEnglish(i18n.language) ? `I am very lucky, that among so many proposals, ${ NAME }'s caught my attention and was chosen. The result could not be better, it exceeded my expectations by far. Besides, the communication during the development was very good. An excellent professional in all aspects.` : `Soy muy afortunado de que, entre tantas propuestas, la de ${ NAME } haya captado mi atención y fuera elegida. El resultado no podría ser mejor, superó mis expectativas por mucho. Además, la comunicación durante el desarrollo fue muy buena. Un excelente profesional en todos los aspectos.`,
      starsQuantity: 5,
    },
  ]

  return (
    <div className="reviews-container content-center">
      <Review review={ reviews[0] } />
    </div>
  )
}
