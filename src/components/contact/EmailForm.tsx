import { useState, useRef, type ChangeEvent, useContext, type FormEvent, type MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import type { MessageContextValueInterface } from '@app/types-interfaces'
import { MessageContext } from '@app/contexts'
import { EMAIL } from '@app/consts'

export default function EmailForm() {
  const { t } = useTranslation()
  const messageState: MessageContextValueInterface = useContext(MessageContext)
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const messageTextAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
  const [ email, setEmail ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')

  // Clears the email field an puts the focus on it
  function clearEmailInput(focus: boolean = true) {
    if (emailInputRef.current === null) return

    setEmail('')
    emailInputRef.current.value = ''
    if (focus)
      emailInputRef.current.focus()
  }

  // Puts the focus on the message text area
  function focusMessageTextArea() {
    if (messageTextAreaRef.current !== null)
      messageTextAreaRef.current.focus()
  }

  // Clears the message text area
  function clearMessageTextArea(focus: boolean = true) {
    if (messageTextAreaRef.current === null) return

    setMessage('')
    messageTextAreaRef.current.value = ''
    if (focus)
      focusMessageTextArea()
  }

  // On submit function
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (emailInputRef.current === null || messageTextAreaRef.current === null)
      return

    const emailValue = email.trim().toLowerCase()
    if (emailValue === '' || emailValue === EMAIL) {
      if (emailValue !== EMAIL)
        clearEmailInput()
      else
        messageState.setMessage('error', t('contact.email.error'), t('contact.email.writeYours'), clearEmailInput)
      return
    }
    emailInputRef.current.value = emailValue

    const messageValue = message.trim()
    if (messageValue === '') {
      clearMessageTextArea()
      return
    }
    else if (messageValue.length < 6) {
      messageState.setMessage('warning', t('contact.email.alert'), t('contact.email.tooShort'), focusMessageTextArea)
      return
    }
    messageTextAreaRef.current.value = messageValue

    // TODO
    messageState.setMessage('info', t('contact.email.sended'), t('contact.email.sendingOK'), () => {
      if (emailInputRef.current !== null && messageTextAreaRef.current !== null) {
        clearEmailInput(false)
        clearMessageTextArea(false)
      }
    })
  }

  return (
    <div className="email-form-container content-center">
      <p>{ t('contact.sendMeAMessage') }</p>
      <form onSubmit={ onSubmit } className="email-form">
        <input ref={ emailInputRef } type="email" placeholder={ t('contact.yourEmailAddress') } onChange={ (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) } />
        <textarea ref={ messageTextAreaRef } placeholder={ `${ t('contact.message') }... ` } rows={ 4 } onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value) }></textarea>
        <button type="submit">{ t('contact.send') }</button>
      </form>
    </div>
  )
}
