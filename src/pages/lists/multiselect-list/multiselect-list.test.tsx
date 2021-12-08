import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MultiselectList } from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

const store = createStore(Reducer());

const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <MultiselectList />
        </Provider>
    );

describe('Multiselect List', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Multiselect List')).toBeInTheDocument();
    });

    it('should render 5 items by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(5);
    });
});
