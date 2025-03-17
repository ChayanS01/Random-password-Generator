import { StrictMode } from 'react'
import PassGenerator from './passGenerator'
import { createRoot } from 'react-dom/client'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PassGenerator/>
  </StrictMode>,
)
