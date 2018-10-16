import React from 'react';
import renderer from "react-test-renderer";
import {QuestionListComponent} from "./index";
import {mount} from "enzyme";

describe('testing question list component', () => {
    const noop = () => null;
    const fake = [
        {
            id: 1,
            name: 'Some Question',
            answers: [
                {id: 1, value: 'Some 1'}
            ]
        },
        {
            id: 2,
            name: 'Some Question 2',
            answers: [
                {id: 1, value: 'Some 2'}
            ]
        }
    ];


    it('should rendering with loader', () => {
        const store = {questions: [], questionsLoading: true};
        const snapshot = renderer
            .create(<QuestionListComponent store={store} getQuestions={noop}/>)
            .toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should rendering with questions', () => {
        const store = {questions: [...fake], questionsLoading: false, currentQuestion: {...fake[0]}};
        const snapshot = renderer
            .create(<QuestionListComponent store={store} getQuestions={noop}/>)
            .toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    describe('testing view question functionality', () => {
        it('should not change to right answered question', () => {
            const fakedQuestions = [
                ...fake.slice(0, 1),
                {...fake[1], isAnsweredCorrectly: true},
                ...fake.slice(2)
            ];

            const store = {questions: fakedQuestions, questionsLoading: false, currentQuestion: fakedQuestions[0]};
            const selectQuestion = jest.fn();
            const component = mount(
                <QuestionListComponent store={store}
                                       getQuestions={noop}
                                       selectQuestion={selectQuestion}
                                       answerQuestion={noop}
                />
            );

            component.find('QuestionIndicator').at(1).simulate('click');

            expect(selectQuestion).not.toHaveBeenCalled()
        });

        it('should not change to wrong answered question', () => {
            const fakedQuestions = [
                ...fake.slice(0, 1),
                {...fake[1], isAnsweredCorrectly: false},
                ...fake.slice(2)
            ];
            const store = {questions: fakedQuestions, questionsLoading: false, currentQuestion: fakedQuestions[0]};
            const selectQuestion = jest.fn();
            const component = mount(
                <QuestionListComponent store={store}
                                       getQuestions={noop}
                                       selectQuestion={selectQuestion}
                                       answerQuestion={noop}
                />
            );

            component.find('QuestionIndicator').at(1).simulate('click');

            expect(selectQuestion).not.toHaveBeenCalled()
        });

        it('should change to unanswered question', () => {
            const store = {questions: [...fake], questionsLoading: false, currentQuestion: {...fake[0]}};
            const selectQuestion = jest.fn();
            const component = mount(
                <QuestionListComponent store={store}
                                       getQuestions={noop}
                                       selectQuestion={selectQuestion}
                                       answerQuestion={noop}
                />
            );
            component.find('QuestionIndicator').at(1).simulate('click');

            expect(selectQuestion).toHaveBeenCalled()
        });

        describe('testing question answering', () => {
            it('should answer to unanswered question', () => {
                const store = {questions: [...fake], questionsLoading: false, currentQuestion: {...fake[0]}};
                const answerQuestion = jest.fn();
                const component = mount(
                    <QuestionListComponent store={store}
                                           getQuestions={noop}
                                           selectQuestion={noop}
                                           answerQuestion={answerQuestion}
                    />
                );

                component.find('Question').first().find('.answer-element').first().simulate('click');

                expect(answerQuestion).toHaveBeenCalled()
            });

            it('should answer to right answered question', () => {
                const questions = [{...fake[0], isAnsweredCorrectly: true}, ...fake.slice(1)];
                const store = {questions: questions, questionsLoading: false, currentQuestion: {...questions[0]}};
                const answerQuestion = jest.fn();
                const component = mount(
                    <QuestionListComponent store={store}
                                           getQuestions={noop}
                                           selectQuestion={noop}
                                           answerQuestion={answerQuestion}
                    />
                );

                component.find('Question').first().find('.answer-element').first().simulate('click');

                expect(answerQuestion).not.toHaveBeenCalled()
            });

            it('should answer to wrong answered question', () => {
                const questions = [{...fake[0], isAnsweredCorrectly: false}, ...fake.slice(1)];
                const store = {questions: questions, questionsLoading: false, currentQuestion: {...questions[0]}};
                const answerQuestion = jest.fn();
                const component = mount(
                    <QuestionListComponent store={store}
                                           getQuestions={noop}
                                           selectQuestion={noop}
                                           answerQuestion={answerQuestion}
                    />
                );

                component.find('Question').first().find('.answer-element').first().simulate('click');

                expect(answerQuestion).not.toHaveBeenCalled()
            });
        });
    });
});