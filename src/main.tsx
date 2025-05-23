import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import Popup from './popup'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App developerMode={false}>
      <Popup />
    </App>
  </StrictMode>,
)
