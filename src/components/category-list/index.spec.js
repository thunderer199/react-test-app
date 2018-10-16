import React from 'react';

import renderer from 'react-test-renderer'
import {CategoryList} from "./index";
import {shallow} from "enzyme";

jest.mock('material-ui', () => ({
    List: ({children}) => <ul>{children}</ul>,
    ListItem: ({primaryText, onClick}) => <li onClick={onClick}>{primaryText}</li>,
    Divider: () => <hr/>
}), {virtual: true});

describe('testing category list component', () => {
    const noop = () => {};

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


    it('should rendering spinner when loading', () => {
        const snapshot = renderer.create(
            <CategoryList isLoading={true} getCategories={noop}/>
        ).toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should rendering with empty list', () => {
        const snapshot = renderer.create(
            <CategoryList categories={[]} getCategories={noop}/>
        ).toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should rendering with list', () => {
        const snapshot = renderer.create(
            <CategoryList categories={fakeCategories} getCategories={noop}/>
        ).toJSON();

        expect(snapshot).toMatchSnapshot();
    });

    it('should trigger get categories action', () => {
        const fn = jest.fn();
        shallow(
            <CategoryList categories={fakeCategories} getCategories={fn}/>
        );

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should trigger select category action', () => {
        const fn = jest.fn();
        const element = shallow(
            <CategoryList categories={fakeCategories} getCategories={noop} selectCategory={fn}/>
        );

        const elem = element.find('List').first().childAt(0).find('ListItem');
        elem.simulate('click');

        expect(fn).toHaveBeenCalledWith({...fakeCategories[0]});
    });
});