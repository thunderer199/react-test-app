import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";

import HeaderComponent from './components/header';


class App extends Component {

    render() {
        return (
            <div className="App">
                <HeaderComponent/>
                {this.props.children}
            </div>
        );
    }
}

App = connect()(App);


export default App;
