import { useState, useRef, type ChangeEvent, type FormEvent, type MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { EMAIL } from '@app/consts'

export default function EmailForm() {
  const { t } = useTranslation()
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const messageTextAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null)
  const [ email, setEmail ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')

  // Clears the email field an puts the focus on it
  function clearEmail() {
    if (emailInputRef.current === null) return

    setEmail('')
    emailInputRef.current.value = ''
    emailInputRef.current.focus()
  }

  // Clears the message field and puts the focus on it
  function clearMessage() {
    if (messageTextAreaRef.current === null) return

    setMessage('')
    messageTextAreaRef.current.value = ''
    messageTextAreaRef.current.focus()
  }

  // On submit function
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (emailInputRef.current === null || messageTextAreaRef.current === null)
      return

    const emailValue = email.trim().toLowerCase()
    if (emailValue === '' || emailValue === EMAIL) {
      if (emailValue === EMAIL)
        alert('No puedes usar esa dirección de correo')
      clearEmail()
      return
    }
    emailInputRef.current.value = emailValue

    const messageValue = message.trim()
    if (messageValue === '') {
      clearMessage()
      return
    }
    else if (messageValue.length < 6) {
      alert('El mensaje es demasiado corto')
      messageTextAreaRef.current.focus()
      return
    }
    messageTextAreaRef.current.value = messageValue

    // TODO
    console.log('TODO')
    console.log(emailValue)
    console.log(messageValue)
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
