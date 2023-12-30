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
      <div className="nav__icons">

        <div id="icon-lang" className="nav__icon">
          <IoLanguageOutline onClick = { () => toggleLanguage()} />
        </div>

        <div className="nav__icon">
          <AiOutlineHome />
        </div>

        <div className="nav__icon">
          <AiOutlineUser />
        </div>

        <div className="nav__icon">
          <VscFolder />
        </div>

        <div className="nav__icon">
          <IoStarHalf />
        </div>

        <div id="icon-chat" className="nav__icon">
          <BsChatDots />
        </div>

      </div>
    </div>
  )
}
