import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/main.scss'

// Opts the page into the scroll-reveal styles. Without it every
// [data-reveal-child] simply renders visible.
document.documentElement.classList.add('reveal-ready')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
