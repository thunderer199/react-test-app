import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
import {loadDataQuestions} from "../../firebase/loadFromDB";

import {answerQuestion, getQuestions, selectQuestion} from "../../actions/question/index";

import QuestionIndicator from "../question-indicator/index";
import Question from "../question/index";

import './question-list.css';
import {CircularProgress} from "material-ui@/core";

export class QuestionListComponent extends Component {
    componentWillMount() {
        const {getQuestions} = this.props;

        const type = this.props.match && this.props.match.params && this.props.match.params.category;
        getQuestions(type);
    }

    render() {
        const {selectQuestion, store} = this.props;

        const questionIndicators = (store.questions).map((question, idx) => {
            const {id, isAnsweredCorrectly} = question;

            return (
                <QuestionIndicator
                    className={classNames({selected: id === store.currentQuestion.id})}
                    key={id}
                    questionNumber={idx + 1}
                    isAnsweredCorrectly={isAnsweredCorrectly}
                    click={() => QuestionListComponent.isUntouched(question) && selectQuestion(question)}
                />
            );
        });


        return store.questionsLoading ?
            <CircularProgress variant="indeterminate" size={200}/>            :
            QuestionListComponent.view(questionIndicators, this.props);
    }

    static isUntouched(question) {
        return question.isAnsweredCorrectly === void 0;
    }

    static view(questionIndicators, {store, answerQuestion}) {
        return (
            <div>
                <div className="App-intro">{questionIndicators}</div>
                <Question question={store.currentQuestion}
                          dispatch={(id) => QuestionListComponent.isUntouched(store.currentQuestion) && answerQuestion(id)}
                />
            </div>
        );
    }
}

export default connect(
    store => ({
        store: store.questions
    }),
    dispatch => ({
        getQuestions: type => dispatch(getQuestions(loadDataQuestions, type)),
        selectQuestion: question => dispatch(selectQuestion(question)),
        answerQuestion: id => dispatch(answerQuestion(id))
    })
)(QuestionListComponent);

