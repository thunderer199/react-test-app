import React from "react";

import logo from './logo.png';
import {connect} from "react-redux";

const HeaderComponent = ({name}) => {
    return <div className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>{name}</h2>
    </div>;
};

export default connect(
    store => ({name: store.categories.selectedCategory && store.categories.selectedCategory.name})
)(HeaderComponent);