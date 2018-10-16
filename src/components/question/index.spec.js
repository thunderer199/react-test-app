import React from "react";

import renderer from 'react-test-renderer'

import Question from "./index";
import {shallow} from "enzyme";

describe('Question', () => {
    it('should be rendered', () => {
        const div = document.createElement('div');
        const payload = {name: 'test', answers: []};
        shallow(<Question question={payload}/>, div);
    });

    it('should render payload right without answers', () => {
        const payload = {name: 'test'};
        const snapshot = renderer.create(
            <Question question={payload}/>
        ).toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should render payload right with answers', () => {
        const payload = {name: 'test', answers: [{id: 1, value: 'some answer'}, {id: 2, value: 'some answer'}]};
        const snapshot = renderer.create(
            <Question question={payload}/>
        ).toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should render payload right with answers', () => {
        const fn = jest.fn();
        const payload = {id: 1, name: 'test', answers: [{id: 1, value: 'some answer'}, {id: 2, value: 'some answer'}]};
        const component = shallow(<Question question={payload} dispatch={fn}/>);
        component.find('li').at(1).simulate('click');

        expect(fn).toHaveBeenCalledWith({question: 1, answer: 2});
    });
});