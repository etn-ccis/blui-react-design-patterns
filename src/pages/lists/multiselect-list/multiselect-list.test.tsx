import React from 'react';
import ReactDOM from 'react-dom';
import { MultiselectList } from './multiselect-list';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { InfoListItem } from '@pxblue/react-components';
import { Reducer } from '../../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <MultiselectList />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('should render 10 list items by default', () => {
    const multiselectList = mount(
        <Provider store={store}>
            <MultiselectList />
        </Provider>
    );
    expect(
        multiselectList
            .find('.list')
            .hostNodes()
            .children(InfoListItem)
    ).toHaveLength(10);
});

it('should add an item', () => {
    const multiselectList = mount(
        <Provider store={store}>
            <MultiselectList />
        </Provider>
    );
    expect(multiselectList.find('#add-item-button').hostNodes()).toHaveLength(1);
    multiselectList
        .find('#add-item-button')
        .hostNodes()
        .at(0)
        .simulate('click');
    expect(multiselectList.find('.list').children(InfoListItem)).toHaveLength(11);
});

// @TODO: fix the following tests after doing a deeper dive into testing functional components

// it('should remove item', () => {
//   const multiselectList = mount(
//     <Provider store={store}>
//       <MultiselectList />
//     </Provider>
//   );

//   // @TODO click checkbox or setstate of selected items directly
//   multiselectList.find('.checkbox').hostNodes().at(0).simulate('click');

//   act(() => {
//     multiselectList.find('.checkbox').hostNodes().at(0).simulate('click');
//     multiselectList.find('.checkbox').at(0).props().checked=true;
//     multiselectList.find('.checkbox').hostNodes().at(0).simulate('change',{ currentTarget: { checked: true } });
//     multiselectList.find(Checkbox).at(0).prop('onChange')({}, true);
//   });

//   expect(multiselectList.find('#remove-items-button').hostNodes()).toHaveLength(1);
//   multiselectList
//     .find('#remove-items-button')
//     .hostNodes()
//     .at(0)
//     .simulate('click');
//   expect(multiselectList.find('.list').children(InfoListItem)).toHaveLength(9);
// });

// it('should cancel selected items', () => {
//   const multiselectList = mount(
//     <Provider store={store}>
//       <MultiselectList />
//     </Provider>
//   );

//   // @TODO click checkbox or set state of selected items directly

//   expect(multiselectList.find('#cancel-button').hostNodes()).toHaveLength(1);
//   multiselectList
//     .find('#cancel-button')
//     .hostNodes()
//     .at(0)
//     .simulate('click');
//   expect(multiselectList.find('.list').children(ListItem)).toHaveLength(10);

//   //  @TODO check that there are no selected items
// });
