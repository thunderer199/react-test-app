export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const getCategories = (loadData, payload) => async dispatch => {
    dispatch({type: GET_CATEGORIES_REQUEST});

    try {
        const payload = await loadData();
        dispatch({type: GET_CATEGORIES_SUCCESS, payload: payload})
    } catch (e) {
        dispatch({type: GET_CATEGORIES_ERROR, payload: e})
    }
};

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const selectCategory = payload => ({type: SELECT_CATEGORY, payload});