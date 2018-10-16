
import {categoriesReducer} from "./categories";
import {
    GET_CATEGORIES_ERROR, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS,
    SELECT_CATEGORY
} from "../actions/categories/index";

describe('categories reducer', () => {
    const fakedList = [
        {
            "name": "Электробезопасность",
            "alias": "electricity"
        },
        {
            "name": "Тендеры",
            "alias": "tender"
        }
    ];

    it('should works right with GET_CATEGORIES_REQUEST', () => {
        const state = {selectedCategory: null, list: []};
        const payload = {type: GET_CATEGORIES_REQUEST};

        const newState = categoriesReducer(state, payload);

        expect(newState).not.toBe(state);
        expect(newState).toEqual({selectedCategory: null, list: [], isLoading: true, error: null});
    });

    it('should works right with GET_CATEGORIES_SUCCESS', () => {
        const state = {selectedCategory: null, list: []};
        const payload = {type: GET_CATEGORIES_SUCCESS, payload: fakedList};

        const newState = categoriesReducer(state, payload);

        expect(newState).not.toBe(state);
        expect(newState).toEqual({selectedCategory: null, list: fakedList, isLoading: false, error: null});
    });

    it('should works right with GET_CATEGORIES_ERROR', () => {
        const state = {selectedCategory: null, list: []};
        const payload = {type: GET_CATEGORIES_ERROR, payload: 'something went wrong'};

        const newState = categoriesReducer(state, payload);

        expect(newState).not.toBe(state);
        expect(newState).toEqual({selectedCategory: null, list: [], isLoading: false, error: 'something went wrong'});
    });

    it('should works right with SELECT_CATEGORY', () => {
        const state = {selectedCategory: null, list: [...fakedList]};
        const payload = {type: SELECT_CATEGORY, payload: {...fakedList[0]}};

        const newState = categoriesReducer(state, payload);

        expect(newState).not.toBe(state);
        expect(newState).toEqual({...state, selectedCategory: {...fakedList[0]}});
    });
});