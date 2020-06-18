import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18N } from '.';
import { Reducer } from '../../redux/reducers';
import { Checkbox } from '@material-ui/core';
import { InfoListItem } from '@pxblue/react-components';
import { english } from './translations/english';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <I18N />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('should cancel selected items', () => {
    const i18nPattern = mount(
        <Provider store={store}>
            <I18N />
        </Provider>
    );

    let boxes = i18nPattern.find(Checkbox);
    const firstBox = boxes.at(0);
    const cb = firstBox.find('input');
    cb.simulate('change', { target: { checked: true } });
    boxes = i18nPattern.find(Checkbox);

    expect(i18nPattern.find('#deselect-all-button').hostNodes()).toHaveLength(1);
    i18nPattern
        .find('#deselect-all-button')
        .hostNodes()
        .at(0)
        .simulate('click');
    expect(i18nPattern.find('#item-list').children(InfoListItem)).toHaveLength(
        Object.keys(english.translations.FRUITS).length
    );

    boxes = i18nPattern.find(Checkbox);
    expect(boxes.at(0).props().checked).toBeFalsy();
});
