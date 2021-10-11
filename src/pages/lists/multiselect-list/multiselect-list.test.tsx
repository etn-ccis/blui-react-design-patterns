import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MultiselectList } from '.';

import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { InfoListItem } from '@pxblue/react-components';
import { Reducer } from '../../../redux/reducers';
import { Checkbox } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Multi-select list', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <MultiselectList />
            </Provider>
        );
    });

    it('should render 10 list items by default', () => {
        const multiselectList = mount(
            <Provider store={store}>
                <MultiselectList />
            </Provider>
        );
        expect(multiselectList.find('.list').hostNodes().children(InfoListItem)).toHaveLength(10);
    });

    xit('should add an item', () => {
        const multiselectList = mount(
            <Provider store={store}>
                <MultiselectList />
            </Provider>
        );
        expect(multiselectList.find('#add-item-button').hostNodes()).toHaveLength(1);
        multiselectList.find('#add-item-button').hostNodes().at(0).simulate('click');
        expect(multiselectList.find('.list').children(InfoListItem)).toHaveLength(11);
    });

    xit('should remove item', () => {
        const multiselectList = mount(
            <Provider store={store}>
                <MultiselectList />
            </Provider>
        );

        let boxes = multiselectList.find(Checkbox);
        const firstBox = boxes.at(0);
        const cb = firstBox.find('input');
        cb.simulate('change', { target: { checked: true } });
        boxes = multiselectList.find(Checkbox);

        expect(multiselectList.find('#remove-items-button').hostNodes()).toHaveLength(1);
        multiselectList.find('#remove-items-button').hostNodes().at(0).simulate('click');
        expect(multiselectList.find('.list').children(InfoListItem)).toHaveLength(9);
    });

    xit('should cancel selected items', () => {
        const multiselectList = mount(
            <Provider store={store}>
                <MultiselectList />
            </Provider>
        );

        let boxes = multiselectList.find(Checkbox);
        const firstBox = boxes.at(0);
        const cb = firstBox.find('input');
        cb.simulate('change', { target: { checked: true } });
        boxes = multiselectList.find(Checkbox);

        expect(multiselectList.find('#cancel-button').hostNodes()).toHaveLength(1);
        multiselectList.find('#cancel-button').hostNodes().at(0).simulate('click');
        expect(multiselectList.find('.list').children(InfoListItem)).toHaveLength(10);

        boxes = multiselectList.find(Checkbox);
        expect(boxes.at(0).props().checked).toBeFalsy();
    });
});
