import { type MutableRefObject, useRef, useEffect } from 'react'
import { type i18n } from 'i18next'
import { useTranslation } from 'react-i18next'
import { IoLanguageOutline, IoStarHalf } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { VscFolder } from 'react-icons/vsc'
import { BsChatDots, BsMenuDown } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { isEnglish, getQueryParam } from '@app/functions'
import { ENGLISH_US, SPANISH_MX } from '@app/consts'

interface ScrollCheckInterface {
  section: HTMLElement
  icon: HTMLElement
  unhideOffsetPercentage: number
  activeOffsetPercentage: number
}

let navBar: HTMLElement
let scrollCheckObjects: ScrollCheckInterface[]
let scrollCallback: () => void

// Inits the scroll listener
const setScrollListenerInterval = setInterval(() => {
  if (document.readyState !== 'loading') {
    // Adding background green to the html
    document.documentElement.classList.add('bg-greene')

    // Getting nav bar
    const NAV_BAR = document.getElementById('nav')
    if (NAV_BAR === null) return
    navBar = NAV_BAR
    checkNavBarShrink(true)

    // Getting sections and them nav-bar icons
    const HEADER = document.getElementById('header')
    const HOME_ICON = document.getElementById('icon-home')
    const ABOUT_ME = document.getElementById('about-me')
    const USER_ICON = document.getElementById('icon-user')
    const PROJECTS = document.getElementById('projects')
    const FOLDER_ICON = document.getElementById('icon-folder')
    const REVIEWS = document.getElementById('reviews')
    const STAR_ICON = document.getElementById('icon-star')
    const CONTACT = document.getElementById('contact')
    const CHAT_ICON = document.getElementById('icon-chat')

    // If some element is null, do nothing
    if (HEADER === null || HOME_ICON === null || ABOUT_ME === null || USER_ICON === null || PROJECTS === null || FOLDER_ICON === null || REVIEWS === null || STAR_ICON === null || CONTACT === null || CHAT_ICON === null) {
      clearInterval(setScrollListenerInterval)
      return
    }

    // Creating the scroll check objects
    scrollCheckObjects = [
      {
        section: HEADER,
        icon: HOME_ICON,
        unhideOffsetPercentage: 0,
        activeOffsetPercentage: 0,
      },
      {
        section: ABOUT_ME,
        icon: USER_ICON,
        unhideOffsetPercentage: 12,
        activeOffsetPercentage: 40,
      },
      {
        section: PROJECTS,
        icon: FOLDER_ICON,
        unhideOffsetPercentage: 10,
        activeOffsetPercentage: 53.5,
      },
      {
        section: REVIEWS,
        icon: STAR_ICON,
        unhideOffsetPercentage: 15,
        activeOffsetPercentage: 53.5,
      },
      {
        section: CONTACT,
        icon: CHAT_ICON,
        unhideOffsetPercentage: 13,
        activeOffsetPercentage: 53.5,
      },
    ]

    // Adding the 'hide' class to the sections below
    scrollCheckObjects.slice(1).forEach((scrollCheckObject: ScrollCheckInterface) => {
      if (isBelow(scrollCheckObject.section)) scrollCheckObject.section.classList.add('hide')
    })

    checkCurrentActiveSection()

    // Setting and adding the scroll callback
    scrollCallback = () => {
      checkShowableSections()
      checkNavBarShrink()
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
  }
  else {
    icon.classList.add('nav__icon--active')
    icon.classList.remove('nav__icon')
  }
}

// Checks if the nav bar must be shrinked
function checkNavBarShrink(firstCheck = false) {
  if (window.scrollY === 0)
    navBar.classList.add('auto-shrinked')
  else
    navBar.classList.remove('auto-shrinked')

  if (!firstCheck && !navBar.classList.contains('auto-shrink-smooth'))
    navBar.classList.add('auto-shrink-smooth')
}

// Checks if the sections must have the 'unhide' class (the fade-in effect)
function checkShowableSections() {
  // Getting hidden sections
  const HIDDEN_SECTIONS: ScrollCheckInterface[] = scrollCheckObjects.slice(1).filter((scrollCheckObject: ScrollCheckInterface) =>
    scrollCheckObject.section.classList.contains('hide') && !scrollCheckObject.section.classList.contains('unhide'))

  // If there aren't hidden sections, remove this function from the scroll callback...
  if (HIDDEN_SECTIONS.length === 0) {
    document.removeEventListener('scroll', scrollCallback)
    document.addEventListener('scroll', () => {
      checkNavBarShrink()
      checkCurrentActiveSection()
    })
    return
  }

  // Unhide sections
  HIDDEN_SECTIONS.forEach((scrollCheckObject: ScrollCheckInterface) => {
    if (isVisible(scrollCheckObject.section, scrollCheckObject.unhideOffsetPercentage)) {
      scrollCheckObject.section.classList.add('unhide')
      setTimeout(() => {
        scrollCheckObject.section.classList.remove('hide')
        scrollCheckObject.section.classList.remove('unhide')
      }, 1000)
    }
  })
}

// Searchs for the new active icon (from bottom to top)
function checkCurrentActiveSection() {
  let currentActiveIndex = -1
  for (let i = scrollCheckObjects.length - 1; i >= 0; i--)
    if (isVisible(scrollCheckObjects[i].section, scrollCheckObjects[i].activeOffsetPercentage)) {
      currentActiveIndex = i
      break
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

function scrollTo(sectionId: string, offsetTop = 0) {
  const section: HTMLElement | undefined = scrollCheckObjects.find((value: ScrollCheckInterface) => value.section.id === sectionId)?.section
  if (section !== undefined)
    window.scrollTo(0, window.scrollY + section.getBoundingClientRect().y + offsetTop)
}

function toggleLanguage(i18n: i18n) {
  void i18n.changeLanguage(isEnglish(i18n.language) ? SPANISH_MX : ENGLISH_US)
}

export default function Nav() {
  const navRef: MutableRefObject<null> = useRef(null)
  const { i18n } = useTranslation()

  useEffect(() => {
    // Selecting the current section
    const section: string | null = getQueryParam('section')
    if (section !== null) {
      const interval: number = window.setInterval(() => {
        if (document.readyState !== 'loading') {
          clearInterval(interval)
          setTimeout(() => {
            if (section !== null)
              scrollTo(section)
          }, 10)
        }
      }, 10)
    }
  }, [])

  function shrink(shrinked: boolean) {
    if (navRef.current === null) return
    const NAV: HTMLElement = navRef.current

    if (shrinked)
      NAV.classList.add('manually-shrinked')
    else
      NAV.classList.remove('manually-shrinked')
  }

  return (
    <div ref = { navRef } id="nav" className="nav auto-shrinked manually-shrinked">
      <div className="nav__icons text-center">

        <div id="icon-language" className="nav__icon" onClick = { () => toggleLanguage(i18n)}>
          <IoLanguageOutline />
        </div>

        <div id="icon-home" className="nav__icon" onClick={ () => scrollTo('header', 1) }>
          <AiOutlineHome />
        </div>

        <div id="icon-user" className="nav__icon" onClick={ () => scrollTo('about-me') }>
          <AiOutlineUser />
        </div>

        <div id="icon-folder" className="nav__icon" onClick={ () => scrollTo('projects') }>
          <VscFolder />
        </div>

        <div id="icon-star" className="nav__icon" onClick={ () => scrollTo('reviews') }>
          <IoStarHalf />
        </div>

        <div id="icon-chat" className="nav__icon" onClick={ () => scrollTo('contact') }>
          <BsChatDots />
        </div>

        <div id="icon-open-nav" onClick={ () => shrink(false) }>
          <BsMenuDown />
        </div>

        <div id="icon-close-nav" onClick={ () => shrink(true) }>
          <GrClose />
        </div>

      </div>
    </div>
  )
}
