import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { silenceUnavoidableWarnings } from './utils/silenceWarnings.js'

// Silence non-breaking library & network console clutter
silenceUnavoidableWarnings()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
