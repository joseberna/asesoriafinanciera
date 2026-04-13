import React from 'react';
import { ConferenceApp } from './components/pages/ConferenceApp';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <ConferenceApp />
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;
