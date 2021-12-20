import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ActionListLocalActions } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../../redux/reducers';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());
const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <ActionListLocalActions />
        </Provider>
    );

describe('Action list local', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <ActionListLocalActions />
            </Provider>
        );
    });
    it('should render header title', () => {
        createRenderer();
        expect(screen.getByText('Local Item Actions')).toBeInTheDocument();
    });
    it('should render 6 list items by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(6);
    });
    it('should render 3 accordions by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('accordion').length).toBe(3);
    });
});
