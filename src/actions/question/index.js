export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';


export const getQuestions = (loadData, payload) => async dispatch => {
    dispatch({type: GET_QUESTIONS_REQUEST});

    try {
        const receivedData = await loadData(payload);
        dispatch({type: GET_QUESTIONS_SUCCESS, payload: receivedData})
    } catch (e) {
        dispatch({type: GET_QUESTIONS_ERROR, payload: e})
    }
};


export const SELECT_QUESTION = 'SELECT_QUESTION';
export const selectQuestion = payload => ({type: SELECT_QUESTION, payload});

export const ANSWER_QUESTION_REQUEST = 'ANSWER_QUESTION_REQUEST';
export const ANSWER_QUESTION_SUCCESS = 'ANSWER_QUESTION_SUCCESS';
export const ANSWER_QUESTION_ERROR = 'ANSWER_QUESTION_ERROR';

export const answerQuestion = payload => dispatch => {
    const fake = {...payload, isRight: true};

    dispatch({type: ANSWER_QUESTION_REQUEST});
    // https://firebase.google.com/docs/functions/http-events
    setTimeout(() => dispatch({type: ANSWER_QUESTION_SUCCESS, payload: fake}), 10);
};