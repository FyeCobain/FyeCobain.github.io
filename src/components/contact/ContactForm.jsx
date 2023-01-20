import { useRef } from "react";
import emailjs from 'emailjs-com';

export default function ContactForm({ strings} ){
  const form = useRef();

  // Enviar mensaje
  function sendEmail(e){
    e.preventDefault();
    
    //Verificar que el campo de email no esté vacío
    form.current.children[0].value = form.current.children[0].value.trim();
    if(!form.current.children[0].value){
      alert(strings.fieldRequired);
      form.current.children[0].focus();
      return;
    }

    //Verificar que el campo mensaje no esté vacío
    form.current.children[1].value = form.current.children[1].value.trim();
    if(!form.current.children[1].value){
      alert(strings.fieldRequired);
      form.current.children[1].focus();
      return;
    }

    // Verificar que el mensaje no sea demasiado corto
    form.current.children[1].value = form.current.children[1].value.trim();
    if(form.current.children[1].value.length < 5){
      form.current.children[1].focus();
      alert(strings.messageTooShort);
      return;
    }

    // Enviar mensaje y resetear el formulario
    emailjs.sendForm('service_a3x9cea', 'template_nak6c74', form.current, 'IwA1l1tFp_LeGHs0a');
    e.target.reset();
    window.scrollTo(0, window.scrollY - document.getElementById("contact").getBoundingClientRect().y * -1 - 50)
    alert(strings.sended);
  }

  return(
    <form className="form" ref={form} onSubmit={sendEmail}>
      <input type="email" name="email" placeholder={strings.yourEmail} required/>
      <textarea name="message" rows="4" placeholder={strings.yourMessage} required ></textarea>
      <div className="button-container">
        <button className="button" onClick={() => sendEmail}>{strings.send}</button>
      </div>
    </form>
  );
}