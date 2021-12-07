import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { StatusList } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());
const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <StatusList />
        </Provider>
    );

describe('Status list', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        createRenderer();
        expect(screen.getByText('Status Lists')).toBeInTheDocument();
    });

    it('should render 3 lists', () => {
        createRenderer();
        expect(screen.getAllByTestId('statusListAccordion').length).toBe(3);
    });

    it('should render total 7 list items', () => {
        createRenderer();
        expect(screen.getAllByTestId('statusListInfoListItem').length).toBe(7);
    });
});
