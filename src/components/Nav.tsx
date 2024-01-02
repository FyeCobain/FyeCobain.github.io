import { useTranslation } from 'react-i18next'
import { IoLanguageOutline, IoStarHalf } from 'react-icons/io5'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { VscFolder } from 'react-icons/vsc'
import { BsChatDots } from 'react-icons/bs'

export default function Nav() {
  const { i18n } = useTranslation()

  // English / spanish
  function toggleLanguage() {
    void i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  }

  return (
    <div className="nav">
      <div className="nav__icons text-center">

        <div id="icon-language" className="nav__icon" onClick = { () => toggleLanguage()}>
          <IoLanguageOutline />
        </div>

        <div id="icon-home" className="nav__icon">
          <AiOutlineHome />
        </div>

        <div id="icon-user" className="nav__icon">
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
