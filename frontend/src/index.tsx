import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next'
import i18n from './internalization/i18n';
import App from './App';

const rootElement = document.getElementById('app')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </I18nextProvider>
);
