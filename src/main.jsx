import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css';
import './styles/index.css';
import './styles/TopHeader.css';
import './styles/Navbar.css';
import './styles/Product.css';
import './styles/ProductQueryForm.css';
import './styles/MegaMenu.css';
import './styles/Sidebar.css';
import './styles/Card.css';
import './styles/Homepage.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
