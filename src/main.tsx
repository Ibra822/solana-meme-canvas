import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Buffer globally before rendering the app
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(<App />);