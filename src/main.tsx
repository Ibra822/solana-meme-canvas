import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize Buffer globally for Solana wallet adapter
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(<App />);