import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Collapsible } from '.';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Collapsible appbar', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <Collapsible />
            </Provider>
        );
    });
});
