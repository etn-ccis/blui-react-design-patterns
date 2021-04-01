import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { StatusList } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';
import { InfoListItem } from '@pxblue/react-components';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <StatusList />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('should render 20 list items by default', () => {
    const multiselectList = mount(
        <Provider store={store}>
            <StatusList />
        </Provider>
    );
    expect(multiselectList.find('.list').hostNodes().children(InfoListItem)).toHaveLength(20);
});
