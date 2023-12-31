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
            degree: 'Computer Systems Engineer',
            job: 'Software Developer',
          },
          header: {
            hello: 'Hello',
            im: "I am",
            welcome: 'Welcome to my webpage!',
          },
          alts: {
            photo: 'my photo',
          },
          info: {
            yearsOfExperience: 'Years of experience as a software developer',
            graduatedFrom: 'Graduated from',
            englishLevel: 'B2 English',
            top1: '#1 AutoHotkey programmer in Latin America',
          },
        },
      },
      es: {
        translation: {
          aboutMe: {
            value: 'Sobre mí',
            degree: 'Ingeniero en Sistemas Computacionales',
            job: 'Desarrollador de Software',
          },
          header: {
            hello: 'Hola',
            im: 'soy',
            welcome: '¡Bienvenido(a) a mi página!',
          },
          alts: {
            photo: 'mi foto',
          },
          info: {
            yearsOfExperience: 'Años de experiencia como desarrollador de software',
            graduatedFrom: 'Egresado del',
            englishLevel: 'Inglés Intermedio-Alto (B2)',
            top1: 'Programador #1 de AutoHotkey en América Latina',
          },
        },
      },
    },
  },
)
