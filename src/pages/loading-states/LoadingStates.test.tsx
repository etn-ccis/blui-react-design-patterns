import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from '../../redux/reducers';

import { LoadingStates } from '.';

const store = createStore(Reducer());
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <LoadingStates />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
