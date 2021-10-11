import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { InAnAppBar } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Menu in an AppBar', () => {
    afterEach(cleanup);
    xit('renders without crashing', () => {
        render(
            <Provider store={store}>
                <InAnAppBar />
            </Provider>
        );
    });
});
