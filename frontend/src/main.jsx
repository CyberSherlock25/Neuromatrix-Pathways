import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/editorial.css'
import App from "./App";
import "./index.css";
import "./App.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
