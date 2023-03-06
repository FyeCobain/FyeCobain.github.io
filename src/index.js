import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';

//Renderizando el componente principal en el elemento raíz
ReactDOM.createRoot(document.getElementById('root')).render(
  <App initialLanguage={window.location.href.toLowerCase().includes('#es') ? 'es' : 'en'} />
);