import React from 'react';
import ReactDOM from 'react-dom';
import { ActionList } from './action-list';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from '@material-ui/core/ListItem';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <ActionList />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('renders a single list component', () => {
    const actionList = mount(
        <Provider store={store}>
            <ActionList />
        </Provider>
    );
    expect(actionList.find('.list').hostNodes()).toHaveLength(1);
});

it('renders 10 items by default', () => {
    const actionList = mount(
        <Provider store={store}>
            <ActionList />
        </Provider>
    );
    expect(
        actionList
            .find('.list')
            .hostNodes()
            .children(ListItem)
    ).toHaveLength(10);
});

it('add item functions correctly', () => {
    const actionList = mount(
        <Provider store={store}>
            <ActionList />
        </Provider>
    );
    expect(actionList.find('#add-item-button').hostNodes()).toHaveLength(1);
    actionList
        .find('#add-item-button')
        .hostNodes()
        .at(0)
        .simulate('click');
    expect(actionList.find('.list').children(ListItem)).toHaveLength(11);
});

// @TODO: figure out how to do this for a functional component
// it('remove item functions correctly', () => {
//   const wrapper = mount(<Provider store={store}>
//     <ActionList />
//   </Provider>);

//   const list = wrapper.state().list;

//   // we will delete the first item
//   const todelete = list[0];
//   const count = list.filter((item: any) => item.id === todelete.id).length;

//   // simulate a delete on the first item
//   wrapper.instance().onMenuItemClick('Delete', 0);

//   // make sure the array length is reduced and the item we expected to delete was deleted
//   expect(list).toHaveLength(9);
//   expect(list.filter((item) => item.id === todelete.id).length).toEqual(count -1);
// });

it('remove all clears the list', () => {
    const actionList = mount(
        <Provider store={store}>
            <ActionList />
        </Provider>
    );
    expect(actionList.find('#remove-all-button').hostNodes()).toHaveLength(1);
    actionList
        .find('#remove-all-button')
        .hostNodes()
        .at(0)
        .simulate('click');
    expect(actionList.find('.list').children(ListItem)).toHaveLength(0);
});
