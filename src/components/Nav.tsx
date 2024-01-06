import { type i18n } from 'i18next'
import { useTranslation } from 'react-i18next'
import { IoLanguageOutline, IoStarHalf } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { VscFolder } from 'react-icons/vsc'
import { BsChatDots } from 'react-icons/bs'
import { ENGLISH_US, SPANISH_MX } from '@app/consts'
import { isEnglish } from '@app/functions'

interface ScrollCheckInterface {
  section: HTMLElement
  icon: HTMLElement
  activeOffsetPercentage: number
}

let scrollCheckObjects: ScrollCheckInterface[]
let scrollCallback: () => void

// Inits the scroll listener
const setScrollListenerInterval = setInterval(() => {
  if (document.readyState !== 'loading') {
    const HEADER = document.getElementById('header')
    const HOME_ICON = document.getElementById('icon-home')
    const ABOUT_ME = document.getElementById('about-me')
    const USER_ICON = document.getElementById('icon-user')

    // If some element is null, do nothing
    if (HEADER === null || HOME_ICON === null || ABOUT_ME === null || USER_ICON === null) {
      clearInterval(setScrollListenerInterval)
      return
    }

    // Creating the scroll check objects
    scrollCheckObjects = [
      {
        section: HEADER,
        icon: HOME_ICON,
        activeOffsetPercentage: 0,
      },
      {
        section: ABOUT_ME,
        icon: USER_ICON,
        activeOffsetPercentage: 40,
      },
    ]

    // Adding the 'hide' to sections below
    scrollCheckObjects.slice(1).forEach((scrollCheckObject: ScrollCheckInterface) => {
      if (isBelow(scrollCheckObject.section)) scrollCheckObject.section.classList.add('hide')
    })

    // Checking current active class
    checkCurrentActiveSection()

    // Setting and adding the scroll callback
    scrollCallback = () => {
      checkShowableSections()
      checkCurrentActiveSection()
    }
    document.addEventListener('scroll', scrollCallback)
    clearInterval(setScrollListenerInterval)
  }
}, 0)

// Returns true if the element is visible
function isVisible(element: HTMLElement, offsetPercentage: number): boolean {
  const clientHeight: number = (100 - offsetPercentage) * window.innerHeight / 100
  const elementRect: DOMRect = element.getBoundingClientRect()
  return elementRect.top < clientHeight && elementRect.top + elementRect.height > 0
}

// Returns true if the element is below in the screen
function isBelow(element: HTMLElement): boolean {
  const elementRect: DOMRect = element.getBoundingClientRect()
  return elementRect.top >= window.innerHeight
}

// Toggles the active state of an icon
function toggleActive(icon: HTMLElement | null) {
  if (icon === null) return

  if (icon.classList.contains('nav__icon--active')) {
    icon.classList.add('nav__icon')
    icon.classList.remove('nav__icon--active')
  } else {
    icon.classList.add('nav__icon--active')
    icon.classList.remove('nav__icon')
  }
}

// Checks if the sections must have the 'unhide' class (the fade-in effect)
function checkShowableSections() {
  const HIDDEN_SECTIONS: HTMLElement[] = Array.from(document.querySelectorAll('.hide:not(.unhide)'))

  if (HIDDEN_SECTIONS.length === 0) {
    document.removeEventListener('scroll', scrollCallback)
    document.addEventListener('scroll', checkCurrentActiveSection)
    return
  }

  // Unhide sections
  HIDDEN_SECTIONS.forEach((section: HTMLElement) => {
    if (isVisible(section, 10)) {
      section.classList.add('unhide')
      setTimeout(() => {
        section.classList.remove('hide')
        section.classList.remove('unhide')
      }, 1000)
    }
  })
}

// Checks for the new active icon (from bottom to top)
function checkCurrentActiveSection() {
  let currentActiveIndex = -1
  for (let i = scrollCheckObjects.length - 1; i >= 0; i--) {
    if (isVisible(scrollCheckObjects[i].section, scrollCheckObjects[i].activeOffsetPercentage)) {
      currentActiveIndex = i
      break
    }
  }

  // Getting current active icon
  const CURRENT_ACTIVE_ICON: HTMLElement | null = document.querySelector('.nav__icon--active')

  // If no new active icon
  if (currentActiveIndex === -1) {
    toggleActive(CURRENT_ACTIVE_ICON)
    return
  }

  // If a new icon is active
  if (CURRENT_ACTIVE_ICON !== scrollCheckObjects[currentActiveIndex].icon) {
    toggleActive(CURRENT_ACTIVE_ICON)
    toggleActive(scrollCheckObjects[currentActiveIndex].icon)
  }
}

function scrollTo(elementId: string) {
  scrollCheckObjects.find((value: ScrollCheckInterface) =>
    value.section.id === elementId)?.section.scrollIntoView()
}

function toggleLanguage(i18n: i18n) {
  void i18n.changeLanguage(isEnglish(i18n.language) ? SPANISH_MX : ENGLISH_US)
}

export default function Nav() {
  const { i18n } = useTranslation()

  return (
    <div className="nav">
      <div className="nav__icons text-center">

        <div id="icon-language" className="nav__icon" onClick = { () => toggleLanguage(i18n)}>
          <IoLanguageOutline />
        </div>

        <div id="icon-home" className="nav__icon" onClick={ () => scrollTo('header') }>
          <AiOutlineHome />
        </div>

        <div id="icon-user" className="nav__icon" onClick={ () => scrollTo('about-me') }>
          <AiOutlineUser />
        </div>

        <div id="icon-folder" className="nav__icon">
          <VscFolder />
        </div>

        <div id="icon-star" className="nav__icon">
          <IoStarHalf />
        </div>

        <div id="icon-chat" className="nav__icon">
          <BsChatDots />
        </div>

      </div>
    </div>
  )
}
