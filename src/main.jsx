import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="welcome">
      <h1>Chirathma Flora</h1>
      <p>Floral artistry for life’s most meaningful celebrations.</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

