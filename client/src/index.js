import React, { StrictMode } from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
