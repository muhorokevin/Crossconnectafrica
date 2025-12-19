
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Cross Connect Africa
 * Main Entry Point - Initializing character-forged experiences.
 */

const mountApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("CCA Critical: Root element #root not found.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.info("CCA: Application bootstrap complete.");
  } catch (err) {
    console.error("CCA Bootstrap Failure:", err);
    // Fallback UI in case of total crash
    rootElement.innerHTML = `
      <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:serif; color:#022c22; text-align:center; padding:20px;">
        <h1 style="font-size:2rem; margin-bottom:1rem;">The signal on the ridge is weak.</h1>
        <p style="color:#666;">We encountered a technical hurdle while loading the mission deck. Please refresh the page or check your connection.</p>
        <button onclick="window.location.reload()" style="margin-top:20px; padding:10px 20px; background:#022c22; color:#d97706; border:none; cursor:pointer; font-weight:bold; letter-spacing:0.1em;">RE-ESTABLISH CONNECTION</button>
      </div>
    `;
  }
};

// Start the mission
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
