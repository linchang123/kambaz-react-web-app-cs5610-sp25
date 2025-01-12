import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'

/**
 * The App component is invoked and rendered in the browser by the main.tsx file 
 * using the ReactDOM library. 
 * The render function invokes the App function and injects the content returned, 
 * into an element with the ID attribute equal to root, found in a static index.html file. 
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
