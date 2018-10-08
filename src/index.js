import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reducers from './reducers';

// const preloadedState = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;
const store = createStore(reducers, {}, applyMiddleware(thunk));

hydrate(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);