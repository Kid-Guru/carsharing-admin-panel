import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.scss';
import rootReducer from './redux/rootReducer';

const actionSanitizer = (action) => (
  action.type === 'SET_CARS' && action.payload
    ? { ...action, payload: '<<LONG_BLOB>>' } : action
);

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionSanitizer,
    stateSanitizer: (state) => (state.payload ? { ...state, payload: '<<LONG_BLOB>>' } : state),
  }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
