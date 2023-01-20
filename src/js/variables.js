const globalValues = {
  devName: 'Michel Bracamontes',
  devEmail: 'hereisnirvana@hotmail.com',
  devGitHub: 'https://github.com/FyeCobain',
  devGitHubUser: 'FyeCobain',
  devFL: 'https://www.freelancer.com/u/RozenBracamontes',
  devFLUser: 'RozenBracamontes',
}

const esStrings = {
  pageTitle: `${globalValues.devName} - Portafolio web`,
  pageDescription: `${globalValues.devName} - Portafolio web`,
  helloPart1: 'Hola',
  helloPart2: ', soy',
  devTitle: 'Ingeniero en Sistemas Computacionales',
  devWork: 'Desarrollador de software',
  photoAlt: 'Foto del desarrollador',
  welcome: '¡Bienvenido(a) a mi página!',
  aboutMe: 'Sobre mí',
  domain: 'Dominio',
  abilitiesResume: 'Resumen de habilidades',
  abilitiesChartAlt: 'Gráfica de habilidades',
  abilitiesGraph: 'Gráfica estimada de habilidades',
  programming: 'Programación',
  troubleshooting: 'Solución de problemas',
  creativity: 'Creatividad',
  design: 'Diseño',
  social: 'Social',
  teamwork: 'Trabajo en equipo',
  gitHubGraphAlt:'Contribuciones en GitHub',
  includingPrivate: 'incluyendo proyectos privados',
  myProjects: 'Proyectos',
  reviews: 'Reseñas',
  contact: 'Contacto',
  contactMe: 'Contáctame',
  socialMedia: 'Mis redes',
  messageMe: 'Envía un mensaje',
  yourEmail: 'Tu dirección de correo',
  emailSubjectPlaceholder: 'Asunto',
  emailSubject: `Hola Ing. ${globalValues.devName.substring(7)}`,
  emailLink: 'Link email',
  yourMessage: 'Tu mensaje',
  send: 'Enviar',
  fieldRequired: 'El campo es obligatorio',
  messageTooShort: 'El mensaje es demasiado corto',
  sended: '¡Gracias por tu mensaje!',
  gitHubLink: 'Link GitHub',
  freelancerLink: 'Link Freelancer',
  rights: 'Todos los derechos reservados'
}

const enStrings = {
  pageTitle: `${globalValues.devName} - Portfolio website`,
  pageDescription: `${globalValues.devName} - Portfolio`,
  helloPart1: 'Hello',
  helloPart2: ', I\'m',
  devTitle: 'Computer Systems engineer',
  devWork: 'Software developer',
  photoAlt: 'Developer\'s photo',
  welcome: 'Welcome to my webpage!',
  aboutMe: 'About me',
  domain: 'Domain',
  abilitiesResume: 'Abilities resume',
  abilitiesChartAlt: 'Abilities chart',
  abilitiesGraph: 'Estimated abilities chart',
  programming: 'Programming',
  troubleshooting: 'Troubleshooting',
  creativity: 'Creativity',
  design: 'Design',
  social: 'Social',
  teamwork: 'Teamwork',
  gitHubGraphAlt:'GitHub contributions',
  includingPrivate: 'including private projects',
  myProjects: 'Projects',
  reviews: 'Reviews',
  contact: 'Contact',
  socialMedia: 'Social media',
  contactMe: 'Contact me',
  messageMe: 'Email me',
  yourEmail: 'Your email address',
  emailSubjectPlaceholder: 'Subject',
  emailSubject: `Hello Ing. ${globalValues.devName.substring(7)}`,
  emailLink: 'Email link',
  yourMessage: 'Your message',
  send: 'Send',
  fieldRequired: 'The field is required',
  messageTooShort:'The message is too short',
  sended: 'Thanks for your message!',
  gitHubLink: 'GitHub link',
  freelancerLink: 'Freelancer link',
  rights: 'All rights reserved'
}

const header = {
  iconId: '#icon-home',
  elementId: '#header'
}

const aboutMe = {
  iconId: '#icon-user',
  elementId: '#about-me'
}

const projects = {
  iconId: '#icon-card',
  elementId: '#projects'
}

const reviews = {
  iconId: '#icon-star',
  elementId: '#reviews'
}

const contact = {
  iconId: '#icon-chat',
  elementId: '#contact'
}

export { globalValues, esStrings, enStrings, header, aboutMe, projects, reviews, contact };