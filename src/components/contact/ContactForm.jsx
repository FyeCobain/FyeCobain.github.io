export default function ContactForm({ strings} ){
  function sendEmail(){
    document.getElementById("emailSendTooltip").innerText = 'Gracias';
  }

  return(
    <form action="" className="form">
      <input type="email" name="email" placeholder={strings.yourEmail} required />
      <textarea name="message" rows="4" placeholder={strings.yourMessage} required></textarea>
      <div className="button-container">
        <button className="button" onClick={() => sendEmail}>{strings.send}</button>
      </div>
    </form>
  );
}