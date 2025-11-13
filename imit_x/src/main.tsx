import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
// Forzar tema claro para evitar que el sistema aplique dark mode que pueda ocultar contenido
try {
  document.documentElement.classList.remove('dark');
  // Aplicar color de fondo según variable CSS del tema
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--ion-background-color') || '#ffffff';
  document.body.style.background = bg;
  console.log('Forced light theme, applied background:', bg);
} catch (e) {
  console.warn('No se pudo forzar tema claro', e);
}

console.log('App mounting... (main)');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);