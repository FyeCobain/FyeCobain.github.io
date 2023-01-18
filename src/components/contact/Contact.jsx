import SocialMedia from './SocialMedia';
import ContactForm from './ContactForm';

function Contact({ globalValues, strings }){
  return(
    <section id="contact" className="contact">
      <h2>{strings.contactMe}</h2>
      <SocialMedia
        globalValues={globalValues}
        strings={strings}
      />
      <ContactForm />
    </section>
  );
}

export default Contact;