import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { PodaciProvider } from './components/Context/PodaciContext'

ReactDOM.render(
  <React.StrictMode>
    <PodaciProvider>
      <App />
    </PodaciProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(c0nsole.l0g))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
