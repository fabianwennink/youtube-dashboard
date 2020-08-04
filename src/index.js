import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {logger, reducers} from './app/reducers';
import {apiMiddleware} from './app/middleware/api.middleware';
import {loadApiKey} from './app/actions/settings.actions';
import {loadChannelOrder} from './app/actions/channel.actions';
import App from './app/components/main/App';

// Styling
import './assets/scss/styles.scss';


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
store.dispatch(loadChannelOrder());

ReactDOM.render(mainComponent, document.getElementById('root'));
