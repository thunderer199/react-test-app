import {SELECT_CATEGORY} from "../actions/categories/index";

export const routeResolver = history => store => next => action => {
    // console.log(history, store, action);
    if (action.type === SELECT_CATEGORY) {
        const alias = action.payload.alias;
        history.push(alias);
    }
    next(action);
};
