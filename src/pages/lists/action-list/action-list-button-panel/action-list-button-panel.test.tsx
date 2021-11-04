import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ActionListButtonPanel } from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../../redux/reducers';

const store = createStore(Reducer());

const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <ActionListButtonPanel />
        </Provider>
    );

describe('Action list with panel header', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Global Action List')).toBeInTheDocument();
        expect(screen.getByText('In Button Panel')).toBeInTheDocument();
    });
});
