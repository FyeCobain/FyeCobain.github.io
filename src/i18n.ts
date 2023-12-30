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
            degree: 'Computer Systems Engineer',
            job: 'Software Developer',
          },
          header: {
            hello: 'Hello',
            im: "I'm",
            welcome: 'Welcome to my webpage!',
          },
          alts: {
            photo: 'my photo',
          },
        },
      },
      es: {
        translation: {
          aboutMe: {
            degree: 'Ingeniero en Sistemas Computacionales',
            job: 'Desarrollador de Software',
          },
          header: {
            hello: 'Hola',
            im: 'yo soy',
            welcome: '¡Bienvenido(a) a mi página!',
          },
          alts: {
            photo: 'mi foto',
          },
        },
      },
    },
  },
)
