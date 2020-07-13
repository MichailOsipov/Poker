import * as React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { MainPage } from 'components/main'
import { rootReducer } from './store/reducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__  ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <MainPage/>
    </Provider>,
    document.getElementById('root')
);
