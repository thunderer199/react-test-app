import {
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    getCategories,
    SELECT_CATEGORY,
    selectCategory
} from "./index";


describe('categories action creators test', () => {
    const fakeCategories = [
        {
            "name": "Электробезопасность",
            "alias": "electricity"
        },
        {
            "name": "Тендеры",
            "alias": "tender"
        }
    ];

    it('should work with getCategories() with success', async () => {
        const dispatch = jest.fn();
        const loadData = () => new Promise(resolve => resolve(fakeCategories));

        await getCategories(loadData, {})(dispatch);

        expect(dispatch).toHaveBeenCalledWith({type: GET_CATEGORIES_REQUEST});

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({type: GET_CATEGORIES_SUCCESS, payload: fakeCategories});
    });

    it('should work with getCategories() with error', async () => {
        const dispatch = jest.fn();
        const loadData = () => new Promise((resolve, reject) => reject(fakeCategories));

        await getCategories(loadData, {})(dispatch);

        expect(dispatch).toHaveBeenCalledWith({type: GET_CATEGORIES_REQUEST});

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({type: GET_CATEGORIES_ERROR, payload: fakeCategories});
    });

    it('should work SELECT_CATEGORY', function () {
        const payloadSend = {...fakeCategories[0]};
        const {payload, type} = selectCategory(payloadSend);

        expect(payload).toBe(payloadSend);
        expect(type).toBe(SELECT_CATEGORY);
    });
});