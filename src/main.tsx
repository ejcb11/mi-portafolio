import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initSecurityGuard } from './utils/security'

// Initialize runtime security protections (HTTPS, URL sanitization, frame-busting, cookie shield)
initSecurityGuard()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
