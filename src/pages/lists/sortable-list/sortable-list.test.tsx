import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SortableList } from './sortable-list';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <SortableList />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

//  @TODO: write tests for the following test cases

// it('reorders the list correctly', () => {

// });

// it('toggles edit mode correctly', () => {

// });
