import {
    ANSWER_QUESTION_ERROR,
    ANSWER_QUESTION_REQUEST,
    ANSWER_QUESTION_SUCCESS,
    GET_QUESTIONS_ERROR,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    SELECT_QUESTION
} from "../actions/question";


const defaultState = {questions: [], currentQuestion: {}, questionsLoading: false};

export function questionsReducer(state = {...defaultState}, {type, payload}) {
    switch (type) {
        case GET_QUESTIONS_REQUEST:
            return {...state, questionsLoading: true, questionsError: null};
        case GET_QUESTIONS_SUCCESS:
            return {...state, questions: payload, currentQuestion: payload[0], questionsLoading: false};
        case GET_QUESTIONS_ERROR:
            return {...state, questionsError: payload, questions: [], questionsLoading: false, currentQuestion: {}};
        case SELECT_QUESTION:
            return {...state, currentQuestion: payload};
        case ANSWER_QUESTION_REQUEST:
            return {...state, questionsLoading: true, questionsError: null};
        case ANSWER_QUESTION_ERROR:
            return {...state, questionsLoading: false, questionsError: payload};
        case ANSWER_QUESTION_SUCCESS:
            const questions = state.questions.map(q => q.id === payload.question ? {...q, isAnsweredCorrectly: payload.isRight} : q);
            const currentQuestion = {...state.questions.find(q => q.id === payload.question), isAnsweredCorrectly: payload.isRight};
            return {...state, questions: questions, questionsLoading: false, questionsError: null, currentQuestion: currentQuestion};
        default:
            return state;
    }
}