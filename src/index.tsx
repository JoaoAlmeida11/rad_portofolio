import React from 'react';
import { render } from 'react-dom';
import './css/main.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
