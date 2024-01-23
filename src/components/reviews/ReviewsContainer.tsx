import type { ReviewInterface } from '@app/types-interfaces'
import { useTranslation } from 'react-i18next'
import { isEnglish } from '@app/functions'
import { NAME } from '@app/consts'
import ContentSlider from '@components/ContentSlider'
import Review from './Review'
import reviewer1 from '/img/reviewers/1.webp'
import reviewer2 from '/img/reviewers/2.webp'
import reviewer4 from '/img/reviewers/4.webp'
import reviewer5 from '/img/reviewers/5.webp'

export default function ReviewsContainer() {
  const { i18n } = useTranslation()

  const reviews: ReviewInterface[] = [
    {
      id: 34026008,
      projectTitle: 'Write a program to look for a string in several txt files',
      reviewerName: 'Matheus M.',
      reviewerPhoto: reviewer1,
      reviewerCountry: isEnglish(i18n.language) ? 'Brazil' : 'Brasil',
      reviewText: isEnglish(i18n.language) ? `I am very lucky, that among so many proposals, ${ NAME }'s caught my attention and was chosen. The result could not be better, it exceeded my expectations by far. Besides, the communication was very good. An excellent professional in all aspects.` : `Tuve mucha suerte de que, entre tantas propuestas, la de ${ NAME } llamara mi atención y fuera elegida. El resultado no podría ser mejor, superó mis expectativas por mucho. Además, la comunicación fue bastante buena. Un excelente profesional en todos los aspectos.`,
      starsQuantity: 5,
    },
    {
      id: 29330808,
      projectTitle: 'Autohotkey: auto print folder script',
      reviewerName: 'Sérgio A.',
      reviewerPhoto: reviewer2,
      reviewerCountry: isEnglish(i18n.language) ? 'Luxembourg' : 'Luxemburgo',
      reviewText: isEnglish(i18n.language) ? `It was a pleasure working with ${ NAME } and would gladly hire him again. He understood the project brief perfectly and it was easy to communicate him, which allowed us to quickly overcome the challenges that we met. ` : `Fue un placer trabajar con ${ NAME } y con gusto lo contrataría de nuevo. Entendió perfectamente el resumen del proyecto y la comunicación con él fue sencilla, lo que nos permitió superar rápidamente los desafíos que nos encontramos.`,
      starsQuantity: 5,
    },
    {
      id: 31008049,
      projectTitle: 'Convert my HTML code into responsive format',
      reviewerName: 'Jaswant K.',
      reviewerPhoto: null,
      reviewerCountry: isEnglish(i18n.language) ? 'USA' : 'EE. UU.',
      reviewText: isEnglish(i18n.language) ? 'ABSOLUTELY FABULOUS WORK, THANK YOU VERY MUCH!' : 'UN TRABAJO ABSOLUTAMENTE FABULOSO, ¡MUCHAS GRACIAS!',
      starsQuantity: 5,
    },
    {
      id: 34288508,
      projectTitle: 'AutoHotKey Gmail Login Script',
      reviewerName: 'Todd R.',
      reviewerPhoto: reviewer4,
      reviewerCountry: isEnglish(i18n.language) ? 'USA' : 'EE. UU.',
      reviewText: isEnglish(i18n.language) ? 'This guy knows his stuff and did an awesome job!' : '¡Este tipo sabe lo que hace e hizo un trabajo asombroso!',
      starsQuantity: 5,
    },
    {
      id: 30135321,
      projectTitle: 'Create a software to request an API and save the result to a file',
      reviewerName: 'Bilal S.',
      reviewerPhoto: reviewer5,
      reviewerCountry: null,
      reviewText: isEnglish(i18n.language) ? 'He made a difference, will find a way to get it done well, has experience in coding, quiet professional and Flexible while talking about the project.' : 'Él hizo la diferencia, encuentra la manera de hacerlo bien, tiene experiencia codificando, bastante profesional y flexible al hablar sobre el proyecto.',
      starsQuantity: 5,
    },
    {
      id: 29455764,
      projectTitle: 'Looking for an AutoHotKey editor for simple automation',
      reviewerName: 'Gautam K.',
      reviewerPhoto: null,
      reviewerCountry: 'india',
      reviewText: isEnglish(i18n.language) ? 'Very experienced in the automation project, I call him AutoHotkey Wzard! Thanks a lot brother for your great work and very helpful approach. Will surely like to work with you in near future. :)' : 'Muy experimentado en el projecto de automatización. ¡Yo lo llamo el mago de AutoHotkey! Muchas gracias hermano por tu gran trabajo y tu útil enfoque. Sin duda me gustará trabajar contigo en el futuro. :)',
      starsQuantity: 5,
    },
  ]

  return (
    <ContentSlider className="reviews-container content-center" phoneCols={ 0 } tabletCols={ 0 } laptopCols={ 0 }>
    {
      reviews.map((review: ReviewInterface, index: number) => <Review key={ index } review={ review } />)
    }
    </ContentSlider>
  )
}
