import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          aboutMe: {
            value: 'About me',
            degreePart1: 'Computer Systems',
            degreePart2: 'Engineer',
            job: 'Software Developer',
          },
          header: {
            hello: 'Hello',
            im: "I am",
            welcome: 'Welcome to my webpage',
          },
          info: {
            yearsOfExperience: 'Years of experience as a software developer',
            graduatedFrom: 'Graduated from',
            english: 'English',
            latinAmerica: 'Latin America',
            getMy: 'Download my',
          },
          skills: {
            value: 'Skills',
            softSkills: 'Soft skills',
            advancedRegex: 'Advanced Regex',
            teamwork: 'Teamwork',
            creative: 'Creative',
            patiente: 'Patient',
            curiosity: 'Curiosity',
            organized: 'Organized',
            critical: 'Critical thinking',
            logical: 'Logical-mathematical thinking',
            time: 'Time management',
            troubleshooting: 'Ease to troubleshooting',
          },
          hobbies: {
            myHobbies: 'My hobbies',
            books: 'Read and write',
            learn: 'Learn (about anything)',
            nature: 'Nature',
            games: 'Games',
          },
          projects: {
            myProjects: 'My projects',
            vscTheme: 'Visual Studio Code theme',
            game: 'Videogame',
            chatApp: 'Chat app',
            scenesGetter: 'Scenes extractor',
            contributions: 'contributions',
          },
          reviews: {
            value: 'Reviews',
          },
          contact: {
            value: 'Contact',
            sendMeAMessage: 'Send me a message',
            yourEmailAddress: 'Your email address',
            message: 'Message',
            send: 'Send',
            email: {
              ok: 'OK',
              sent: 'Message sent',
              error: 'ERROR',
              alert: 'Alert',
              sendingOK: 'Message sent successfully. Thank you!',
              sendingError: 'Error while sending the message :(',
              tooShort: 'Message is too short',
              writeYours: 'Please write your email address',
            }
          },
        },
      },
      es: {
        translation: {
          aboutMe: {
            value: 'Sobre mí',
            degreePart1: 'Ingeniero en Sistemas',
            degreePart2: 'Computacionales',
            job: 'Desarrollador de Software',
          },
          header: {
            hello: 'Hola',
            im: 'soy',
            welcome: 'Bienvenido(a) a mi página',
          },
          info: {
            yearsOfExperience: 'Años de experiencia como desarrollador de software',
            graduatedFrom: 'Egresado del',
            english: 'Inglés Intermedio-Alto',
            latinAmerica: 'América Latina',
            getMy: 'Descarga mi',
          },
          skills: {
            value: 'Habilidades',
            softSkills: 'Habilidades suaves',
            advancedRegex: 'Regex avanzado',
            teamwork: 'Trabajo en equipo',
            creative: 'Creatividad',
            patiente: 'Paciencia',
            curiosity: 'Curiosidad',
            organized: 'Organización',
            critical: 'Pensamiento crítico',
            logical: 'Pensamiento logico-matemático',
            time: 'Gestión del tiempo',
            troubleshooting: 'Resolución de problemas',
          },
          hobbies: {
            myHobbies: 'Mis aficiones',
            books: 'Leer y escribir',
            learn: 'Aprender (de todo)',
            nature: 'Naturaleza',
            games: 'Videojuegos',
          },
          projects: {
            myProjects: 'Mis proyectos',
            vscTheme: 'Tema de Visual Studio Code',
            game: 'Videojuego',
            chatApp: 'App de chat',
            scenesGetter: 'Extractor de escenas',
            contributions: 'Contribuciones en',
          },
          reviews: {
            value: 'Reseñas',
          },
          contact: {
            value: 'Contacto',
            sendMeAMessage: 'Envíame un mensaje',
            yourEmailAddress: 'Tu dirección de correo',
            message: 'Mensaje',
            send: 'Enviar',
            email: {
              ok: 'Aceptar',
              sent: 'Mensaje enviado',
              error: 'ERROR',
              alert: 'Atención',
              sendingOK: 'Mensaje enviado correctamente. ¡Gracias!',
              sendingError: 'Error al enviar el mensaje :(',
              tooShort: 'El mensaje es demasiado corto',
              writeYours: 'Por favor escribe tu dirección de correo',
            }
          },
        },
      },
    },
  },
)
