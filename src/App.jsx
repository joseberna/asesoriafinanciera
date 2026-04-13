import React from 'react';
import { Provider } from 'react-redux';
import { ConferenceApp } from './components/pages/ConferenceApp';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import { store } from './store';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ProgressProvider>
          <ConferenceApp />
        </ProgressProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
