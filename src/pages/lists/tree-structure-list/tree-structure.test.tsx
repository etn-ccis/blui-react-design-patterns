import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TreeStructureList } from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

const store = createStore(Reducer());

const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <TreeStructureList />
        </Provider>
    );

describe('Action list with button panel', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Tree Structure')).toBeInTheDocument();
        expect(screen.getByText('Folder Structure')).toBeInTheDocument();
    });
});
