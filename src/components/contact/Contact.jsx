import SocialMedia from './SocialMedia';
import ContactForm from './ContactForm';

function Contact({ globalValues, strings }){
  return(
    <section id="contact" className="contact">
      <h2>{strings.contactMe}</h2>
      <div className="contact-container">
        <SocialMedia
          globalValues={globalValues}
          strings={strings}
        />
        <div className="form-container">
          <ContactForm
            globalValues={globalValues}
            strings={strings}
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;