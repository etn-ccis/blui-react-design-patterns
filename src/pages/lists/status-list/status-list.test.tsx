import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { StatusList } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';
import { InfoListItem } from '@pxblue/react-components';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Status list', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <StatusList />
            </Provider>
        );
    });

    it('should render 20 list items by default', () => {
        const multiselectList = mount(
            <Provider store={store}>
                <StatusList />
            </Provider>
        );
        expect(multiselectList.find('.list').hostNodes().children(InfoListItem)).toHaveLength(20);
    });
});
