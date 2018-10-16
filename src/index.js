import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {Redirect, Route, Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {routeResolver} from "./middleware/router-redux-resolver";

import reducer from './reducers';

import firebase from 'firebase';
import CategoryList from "./components/category-list/index";
import QuestionList from "./components/question-list/index";

import {createMuiTheme, MuiThemeProvider} from 'material-ui@/core/styles';
import purple from 'material-ui@/core/colors/purple';
import green from 'material-ui@/core/colors/green';

// import {MuiThemeProvider} from "material-ui";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        primary: {
            light: purple[300],
            main: purple[500],
            dark: purple[700],
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
    },
});

// todo Initialize Firebase
const config = {
};
firebase.initializeApp(config);

const history = createHistory();


const reduxStore = createStore(
    reducer,
    compose(
        applyMiddleware(thunk, routeResolver(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : _ => _
    )
);

ReactDOM.render(
    <Provider store={reduxStore}>
        <App>
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <div>
                        <Route exact default path="/" component={CategoryList}/>
                        <Route exact path="/:category" component={QuestionList}/>
                        <Redirect to={{
                            state: {error: true}
                        }} />
                    </div>
                </Router>
            </MuiThemeProvider>
        </App>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
