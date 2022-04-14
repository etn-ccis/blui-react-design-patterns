import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ActionList } from '.';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { InfoListItem } from '@brightlayer-ui/react-components';
import { createTheme, ThemeProvider } from '@mui/material';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Action list', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ActionList />
                </Provider>
            </ThemeProvider>
        );
    });

    it('renders 10 items by default', () => {
        const actionList = mount(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ActionList />
                </Provider>
            </ThemeProvider>
        );
        expect(actionList.find('.list').hostNodes().children(InfoListItem)).toHaveLength(10);
    });

    it('adds an item correctly', () => {
        const actionList = mount(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ActionList />
                </Provider>
            </ThemeProvider>
        );
        expect(actionList.find('#add-item-button').hostNodes()).toHaveLength(1);
        actionList.find('#add-item-button').hostNodes().at(0).simulate('click');
        expect(actionList.find('.list').hostNodes().children(InfoListItem)).toHaveLength(11);
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

    it('removes all and clears the list', () => {
        const actionList = mount(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ActionList />
                </Provider>
            </ThemeProvider>
        );
        expect(actionList.find('#remove-all-button').hostNodes()).toHaveLength(1);
        actionList.find('#remove-all-button').hostNodes().at(0).simulate('click');
        expect(actionList.find('.list').hostNodes().children(InfoListItem)).toHaveLength(0);
    });
});
