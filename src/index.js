import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { rootReducer } from './redux/reducers';
import IOWrapper from './IOWrapper';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <IOWrapper>
      <App />
    </IOWrapper>
  </Provider>,
  document.getElementById('root')
);
