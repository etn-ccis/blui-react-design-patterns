import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18N } from '.';
import { Reducer } from '../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <I18N />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
