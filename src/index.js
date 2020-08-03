import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {logger, reducers} from './app/reducers';

// Styling
import './assets/scss/styles.scss';
import App from './app/components/App';
import {apiMiddleware} from './app/middleware/api.middleware';
import {loadApiKey} from './app/actions/settings.actions';

// Redux store
const middleware = [thunkMiddleware, apiMiddleware, logger];
const store = Redux.createStore(reducers, Redux.compose(
    Redux.applyMiddleware(...middleware)
));

// Create the main component.
const mainComponent = (
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>
);

// Load the credentials from the local storage.
store.dispatch(loadApiKey());

ReactDOM.render(mainComponent, document.getElementById('root'));
