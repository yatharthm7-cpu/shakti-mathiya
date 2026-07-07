import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { NavigationProvider } from './context/NavigationContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <NavigationProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </NavigationProvider>
    </LanguageProvider>
  </StrictMode>,
);
