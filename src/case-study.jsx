import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import CityInsightCaseStudy from './pages/CityInsightCaseStudy'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CityInsightCaseStudy />
  </StrictMode>,
)
