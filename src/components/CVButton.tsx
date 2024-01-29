import { useTranslation } from 'react-i18next'
import { type MutableRefObject, useRef } from 'react'
import { isEnglish } from '@app/functions'
import { PATH_NAME, CV_FILE_NAME, CV_ENGLISH, CV_SPANISH } from '@app/consts'

export default function CVButton({ className }: { className: string }) {
  const { t, i18n } = useTranslation()
  const downloadLinkRef: MutableRefObject<HTMLAnchorElement | null> = useRef(null)
  const CV = isEnglish(i18n.language) ? CV_ENGLISH : CV_SPANISH

  function downloadCV() {
    if (downloadLinkRef.current !== null)
      downloadLinkRef.current.click()
  }

  return (
    <div className={ className }>
      <a ref={ downloadLinkRef } className="display-none" download={ CV_FILE_NAME } href={ `${ PATH_NAME }/files/${ CV }` }></a>
      <button onClick={ downloadCV }>{ t('info.getMy') } <span>CV</span></button>
    </div>
  )
}
