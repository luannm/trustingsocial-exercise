import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';
import HomePage from './containers/HomePage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
