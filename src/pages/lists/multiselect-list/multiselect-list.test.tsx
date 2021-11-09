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
});
