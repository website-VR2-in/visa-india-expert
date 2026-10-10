import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { reportVitals } from './lib/vitals';
import './index.css';

// Field Core Web Vitals → GA4 (INP/LCP/CLS/TTFB)
reportVitals();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
