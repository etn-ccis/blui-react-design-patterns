import React from 'react';
import ReactDOM from 'react-dom';
import { CollapsibleAppBar } from '.';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <CollapsibleAppBar />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
