import * as Loaders from './loadFromDB.js'

const mockFn = jest.fn();
jest.mock('firebase', () => ({database: () => ({ref: mockFn})}));

describe('test firebase calls', function () {
    beforeEach(() => {
        mockFn.mockReset();
        mockFn.mockImplementation(t => ({once: () => new Promise((resolve) => resolve({val: () => 72}))}))
    });

    it('should load question by category', async function () {
        const type = 'tender';

        const res = await Loaders.loadDataQuestions(type);
        expect(res).toEqual(72);
        expect(mockFn).toHaveBeenCalledWith(`/${type}/questions`)
    });

    it('should load categories', async function () {
        const res = await Loaders.loadDataCategories();
        expect(res).toEqual(72);
        expect(mockFn).toHaveBeenCalledWith('/category')
    });
});