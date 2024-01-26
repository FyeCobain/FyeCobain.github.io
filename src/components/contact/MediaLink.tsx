import { useRef, useState, type MutableRefObject } from 'react'
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import { LuCopy, LuCopyCheck } from 'react-icons/lu'
import { copyText } from '@app/functions'

interface MediaLinkProps {
  icon: any
  url: string
  ariaLabel: string
  text: string
  copyText?: string
}

export default function MediaLink(props: MediaLinkProps) {
  const [ linkCopied, setLinkCopied ] = useState<boolean>(false)
  const resetLinkCopiedTimeOutRef: MutableRefObject<number | null> = useRef(null)

  // Tries to copy the text to the clipboard, after 10 seconds, resets the copiedLink value
  function copy(text: string | undefined) {
    if (text === undefined) return

    copyText(text, () => {
      setLinkCopied(true)

      if (resetLinkCopiedTimeOutRef.current !== null)
        clearTimeout(resetLinkCopiedTimeOutRef.current)

      resetLinkCopiedTimeOutRef.current = window.setTimeout(() => {
        setLinkCopied(false)
        resetLinkCopiedTimeOutRef.current = null
      }, 10000)
    })
  }

  return (
    <div className="media-link content-center">
      <a className="media-link__icon" aria-label={ props.ariaLabel } href={ props.url } target="_blank" rel="noreferrer">
        { props.icon }
        <LiaExternalLinkSquareAltSolid />
      </a>
      <div className="media-link__text">
      {
      props.copyText === undefined || !window.isSecureContext
        ? <p>{ props.text }</p>
        : <div className="cursor-pointer" onClick={ () => copy(props.copyText) }>
          <p>{ props.text }</p>
          { !linkCopied ? <LuCopy /> : <LuCopyCheck />}
        </div>
      }
      </div>
    </div>
  )
}
