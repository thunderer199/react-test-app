import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'

import reducer from './reducers';
import thunk from "redux-thunk";

const reduxStore = createStore(reducer, applyMiddleware(thunk));

jest.mock(
    'firebase',
    () => ({
        initializeApp: () => ({
        }),
        database: () => ({
            ref: () => ({
                once: () => new Promise(() => ({
                    val: () => 'x'
                }))
            })
        }),
    }),
    {virtual: true}
);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={reduxStore}>
            <App/>
        </Provider>
        , div);
});
