import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { SortableList } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

xdescribe('Sortable list', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <SortableList />
            </Provider>
        );
    });
});
