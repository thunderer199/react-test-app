import React from "react";
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer'

import QuestionIndicator from "./index";

describe('QuestionIndicator', () => {

    it('should render right basic example', () => {
        const snapshot = renderer
            .create(<QuestionIndicator questionNumber={1}/>)
            .toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should render right for wrong answered questions', () => {
        const snapshot = renderer
            .create(<QuestionIndicator questionNumber={1} isAnsweredCorrectly={false}/>)
            .toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should render right for right answered questions', () => {
        const snapshot = renderer
            .create(<QuestionIndicator questionNumber={1} isAnsweredCorrectly={true}/>)
            .toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should trigger click when QuestionIndicator clicked', () => {
        const fn = jest.fn();
        const component = shallow(<QuestionIndicator questionNumber={1} click={fn}/>);
        component.simulate('click');

        expect(fn).toHaveBeenCalledTimes(1);
    })
});