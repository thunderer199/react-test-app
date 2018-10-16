import {
    ANSWER_QUESTION_REQUEST,
    ANSWER_QUESTION_SUCCESS,
    answerQuestion,
    GET_QUESTIONS_ERROR,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    getQuestions,
    SELECT_QUESTION,
    selectQuestion
} from "./index";

describe('action creators test', () => {
    const fakeData = [{id: 1, name: 'Some Question', answers: [{id: 4, value: 'Some 4'}]}];

    it('should work getQuestions() with success', async () => {
        const payloadSend = 'electricity';
        const dispatch = jest.fn();

        const loadData = type => {
            expect(type).toEqual(payloadSend);
            return new Promise(resolve => resolve(fakeData));
        };
        await getQuestions(loadData, payloadSend)(dispatch);

        expect(dispatch).toHaveBeenCalledWith({type: GET_QUESTIONS_REQUEST});

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({type: GET_QUESTIONS_SUCCESS, payload: fakeData});
    });

    it('should work getQuestions() with error', async () => {
        const payloadSend = 'tender';
        const dispatch = jest.fn();

        const errorMsg = 'Something went wrong';
        const loadData = type => {
            expect(type).toEqual(payloadSend);
            return new Promise((resolve, reject) => reject(errorMsg));
        };

        await getQuestions(loadData, payloadSend)(dispatch);

        expect(dispatch).toHaveBeenCalledWith({type: GET_QUESTIONS_REQUEST});

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({type: GET_QUESTIONS_ERROR, payload: errorMsg});
    });

    it('should work selectQuestion', () => {
        const payloadSend = {a: 'test', b: 'true test'};
        const {payload, type} = selectQuestion(payloadSend);

        expect(payload).toBe(payloadSend);
        expect(type).toBe(SELECT_QUESTION);
    });

    it('should work answerQuestion()', () => {
        const payloadSend = {answer: 2, question: 1};
        const dispatch = jest.fn();

        jest.useFakeTimers();

        answerQuestion(payloadSend)(dispatch);
        expect(dispatch).toHaveBeenCalledWith({type: ANSWER_QUESTION_REQUEST});

        jest.runTimersToTime(11);

        expect(dispatch).toHaveBeenCalledWith({type: ANSWER_QUESTION_SUCCESS, payload: {...payloadSend, isRight: true}});

        jest.clearAllTimers()
    });
});