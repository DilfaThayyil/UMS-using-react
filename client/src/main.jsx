import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {  BrowserRouter as Router, } from 'react-router-dom';
import { Provider } from 'react-redux';
import  store  from './Store/Store';
import React from 'react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
  <Provider store={store}>
      <App />
  </Provider>
  </Router>
  </React.StrictMode>
);

