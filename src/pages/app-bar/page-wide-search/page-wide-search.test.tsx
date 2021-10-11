import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { PageWideSearch } from './PageWideSearch';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Page wide search appbar', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <PageWideSearch />
            </Provider>
        );
    });
});
