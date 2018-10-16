import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadDataCategories} from "../../firebase/loadFromDB";

import {getCategories, selectCategory} from "../../actions/categories";

import {CircularProgress, List, ListItem, ListItemText} from 'material-ui'

// import './question-list.css'


export class CategoryList extends Component {
    componentWillMount() {
        this.props.getCategories();
    }

    getCategoryList(categories, selectCategory) {
        return categories.map((cat, idx) => {
            return (
                <ListItem key={idx} onClick={() => selectCategory(cat)} divider={true}>
                    <ListItemText disableTypography={true} primary={cat.name}/>
                </ListItem>
            );
        });
    }

    render() {
        const {categories, isLoading, selectCategory} = this.props;

        return isLoading
            ? <CircularProgress variant="indeterminate" size={200}/>
            : this.renderList(categories, selectCategory);
    }

    renderList(list = [], selectCategory) {
        return (
            <div>
                <List>
                    {this.getCategoryList(list, selectCategory)}
                </List>
            </div>
        );
    }
}

export default connect(
    store => ({
        categories: store.categories.list,
        isLoading: store.categories.isLoading
    }),
    dispatch => ({
        getCategories: () => dispatch(getCategories(loadDataCategories)),
        selectCategory: category => dispatch(selectCategory(category))
    })
)(CategoryList)