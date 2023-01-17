export default function Review({ setOverlayImg, language, reviewIndex }){
  return(
    <img
      className="review__img"
      src={require(`../../img/review${reviewIndex}.png`)}
      alt={language === 'es' ? 'Imagen reseña' : 'Review image'}
      onClick={e => setOverlayImg(e.target)}
    />
  );
}