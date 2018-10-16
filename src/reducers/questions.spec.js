import {questionsReducer} from './questions';
import {
    ANSWER_QUESTION_ERROR,
    ANSWER_QUESTION_REQUEST, ANSWER_QUESTION_SUCCESS,
    GET_QUESTIONS_ERROR,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    SELECT_QUESTION
} from "../actions/question/index";

describe('questions reducer', () => {
    it('should works right for GET_QUESTIONS_REQUEST', () => {
        const payload = {test: 'rest'};
        const state = {questionsError: 'Test'};
        const newState = questionsReducer(state, {type: GET_QUESTIONS_REQUEST, payload});

        expect(newState).not.toBe(state);
        expect(newState.questionsLoading).toBeTruthy();
        expect(newState.questionsError).toBeNull();
    });

    it('should works right for GET_QUESTIONS_ERROR', () => {
        const payload = 'Error';
        const state = {};
        const newState = questionsReducer(state, {type: GET_QUESTIONS_ERROR, payload});

        expect(newState).not.toBe(state);
        expect(newState.questionsLoading).toBeFalsy();
        expect(newState.questionsError).toBe(payload);
        expect(newState.currentQuestion).toEqual({});
        expect(newState.questions).toEqual([]);
    });

    it('should works right for GET_QUESTIONS_SUCCESS', () => {
        const payload = [{test: 1}, {test: 2}];
        const state = {};
        const newState = questionsReducer(state, {type: GET_QUESTIONS_SUCCESS, payload});

        expect(newState).not.toBe(state);
        expect(newState.questionsLoading).toBeFalsy();
        expect(newState.questions).toEqual(payload);
        expect(newState.currentQuestion).toEqual(payload[0]);
    });

    it('should works right for SELECT_QUESTION', () => {
        const payload = {test: 'rest'};
        const state = {};
        const newState = questionsReducer(state, {type: SELECT_QUESTION, payload});

        expect(newState).not.toBe(state);
        expect(newState).toEqual({currentQuestion: payload})
    });

    describe('testing ANSWER_QUESTION ', () => {
        const defaultState = {
            questions: [
                {
                    id: 1,
                    name: 'Some Question',
                    answers: [
                        {id: 1, value: 'Some 1'},
                        {id: 2, value: 'Some 2'},
                        {id: 3, value: 'Some 3'},
                        {id: 4, value: 'Some 4'}
                    ]
                },
                {
                    id: 2,
                    name: 'Some Question 2',
                    answers: [
                        {id: 1, value: 'Some 1'},
                        {id: 2, value: 'Some 2'},
                        {id: 3, value: 'Some 3'},
                        {id: 4, value: 'Some 4'}
                    ]
                }
            ]
        };
        const requestState = {...defaultState, questionsLoading: true, questionsError: 'Error'};

        it('should works right for ANSWER_QUESTION_REQUEST', () => {
            const newState = questionsReducer(defaultState, {type: ANSWER_QUESTION_REQUEST});

            expect(newState).not.toBe(defaultState);
            expect(newState.questionsLoading).toBeTruthy();
            expect(newState.questionsError).toBeNull();
        });


        it('should works right for ANSWER_QUESTION_ERROR', () => {
            const payload = "Error";
            const newState = questionsReducer(defaultState, {type: ANSWER_QUESTION_ERROR, payload});

            expect(newState).not.toBe(defaultState);
            expect(newState.questionsLoading).toBeFalsy();
            expect(newState.questionsError).toEqual(payload);
        });


        it('should works right for ANSWER_QUESTION_SUCCESS with right answer', () => {
            const payload = {question: 1, isRight: true};
            const newState = questionsReducer(requestState, {type: ANSWER_QUESTION_SUCCESS, payload: payload});

            expect(newState).not.toBe(defaultState);
             expect(newState.questions.find(q => q.id === payload.question).isAnsweredCorrectly).toBeTruthy();
            expect(newState.questionsLoading).toBeFalsy();
            expect(newState.questionsError).toBeFalsy();
        });

        it('should works right for ANSWER_QUESTION_SUCCESS with wrong answer', () => {
            const payload = {question: 1, isRight: false};
            const newState = questionsReducer(requestState, {type: ANSWER_QUESTION_SUCCESS, payload: payload});

            expect(newState).not.toBe(defaultState);
            expect(newState.questions.find(q => q.id === payload.question).isAnsweredCorrectly).toBeFalsy();
            expect(newState.questionsLoading).toBeFalsy();
            expect(newState.questionsError).toBeFalsy();
        });

        it('should have answer changed also on currentQuestion field with right answer', () => {
            const payload = {question: 1, isRight: true};
            const newState = questionsReducer(requestState, {type: ANSWER_QUESTION_SUCCESS, payload: payload});

            expect(newState).not.toBe(defaultState);
            expect(newState.questions.find(q => q.id === payload.question).isAnsweredCorrectly).toBeTruthy();
            expect(newState.questions.find(q => q.id === payload.question)).toEqual(newState.currentQuestion);
            expect(newState.currentQuestion.isAnsweredCorrectly).toBeTruthy();
            expect(newState.questionsLoading).toBeFalsy();
            expect(newState.questionsError).toBeFalsy();
        });

        it('should have answer changed also on currentQuestion field with wrong answer', () => {
            const payload = {question: 1, isRight: false};
            const newState = questionsReducer(requestState, {type: ANSWER_QUESTION_SUCCESS, payload: payload});

            expect(newState).not.toBe(defaultState);
            expect(newState.questions.find(q => q.id === payload.question).isAnsweredCorrectly).toBeFalsy();
            expect(newState.questions.find(q => q.id === payload.question)).toEqual(newState.currentQuestion);
            expect(newState.currentQuestion.isAnsweredCorrectly).toBeFalsy();
            expect(newState.questionsLoading).toBeFalsy();
            expect(newState.questionsError).toBeFalsy();
        });
    })
});