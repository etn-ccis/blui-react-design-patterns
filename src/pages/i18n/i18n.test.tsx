import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18N } from '.';
import { Reducer } from '../../redux/reducers';
import { Checkbox } from '@mui/material';
import { InfoListItem } from '@brightlayer-ui/react-components';
import { english } from './translations/english';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('I18N', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <I18N />
            </Provider>
        );
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
        i18nPattern.find('#deselect-all-button').hostNodes().at(0).simulate('click');
        expect(i18nPattern.find('#item-list').children(InfoListItem)).toHaveLength(
            Object.keys(english.translations.FRUITS).length
        );

        boxes = i18nPattern.find(Checkbox);
        expect(boxes.at(0).props().checked).toBeFalsy();
    });
});
