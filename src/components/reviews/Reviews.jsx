import Review from './Review';
import Slider from '../ui/Slider';

function Reviews({ setOverlayImg, language,  strings }){
  return(

    <section id="reviews" className="reviews">
      <h2>{strings.reviews}</h2>

      <div className="reviews-container">

      <Slider 
        elements=
        {
          [...Array(10).keys()].map(element => <Review setOverlayImg={setOverlayImg} language={language} reviewIndex={element + 1} />)
        }
      />
        
      </div>
    </section>
  );
}
  
export default Reviews;