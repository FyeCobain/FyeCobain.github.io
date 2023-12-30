import { useTranslation } from 'react-i18next'
import Nav from './components/Nav'

function App() {
  const { t } = useTranslation()

  return (
    <>
      <Nav />
      <h1>{ t('header.welcome') }</h1>
    </>
  )
}

export default App
