import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    SELECT_CATEGORY
} from "../actions/categories/index";

const defaultState = {selectedCategory: null, list: []};

export function categoriesReducer(state = {...defaultState}, {type, payload}) {
    switch (type) {
        case GET_CATEGORIES_REQUEST:
            return {...state, isLoading: true, error: null};
        case GET_CATEGORIES_SUCCESS:
            return {...state, isLoading: false, error: null, list: payload};
        case GET_CATEGORIES_ERROR:
            return {...state, isLoading: false, error: payload, list: []};
        case SELECT_CATEGORY:
            return {...state, selectedCategory: payload};
        default:
            return state;
    }
}