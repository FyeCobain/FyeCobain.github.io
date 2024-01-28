import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IoInformationCircle, IoWarning, IoCloseCircle } from 'react-icons/io5'
import type { MessageContextValueInterface } from '@app/types-interfaces'
import { MessageContext } from '@app/contexts'

export default function MessageOverlay() {
  const { t } = useTranslation()
  const messageState: MessageContextValueInterface = useContext(MessageContext)

  useEffect(() => {
    // Adding or removing the 'overscroll-none' class to the body
    if (messageState.type !== null)
      document.documentElement.classList.add('overscroll-none')
    else
      document.documentElement.classList.remove('overscroll-none')
  }, [ messageState.type ])

  if (messageState.type === null)
    return <></>

  // Clears the message and executes the callback
  function onOKClick() {
    messageState.setMessage(null)

    if (messageState.onOK !== null)
      messageState.onOK()
  }

  let icon: any
  switch (messageState.type) {
    case 'info':
      icon = <IoInformationCircle className="color-info" />
      break
    case 'warning':
      icon = <IoWarning className="color-warning" />
      break
    case 'error':
      icon = <IoCloseCircle className="color-danger" />
      break
  }

  return (
    <div className="message-overlay">
      <div className="message">
        <div className="message__heading">
          { icon }
          <div className="message__heading__title">
            <p>{ messageState.title }</p>
          </div>
        </div>
        <div className="message__body">
          <p className="message__text">{ messageState.text }</p>
          <button onClick={ onOKClick }>{ t('contact.email.ok') }</button>
        </div>
      </div>
    </div>
  )
}
