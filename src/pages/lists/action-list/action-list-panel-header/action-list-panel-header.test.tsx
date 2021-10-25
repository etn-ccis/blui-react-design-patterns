import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ActionListPanelHeader } from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../../redux/reducers';

const store = createStore(Reducer());

const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <ActionListPanelHeader />
        </Provider>
    );

describe('Action list with panel header', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Global Action Lists')).toBeInTheDocument();
        expect(screen.getByText('On Panel Header')).toBeInTheDocument();
    });

    it('should render 3 items by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
    });

    it('should render filtered items, when the range is selected', () => {
        createRenderer();
        expect(screen.getByText('30 Days')).toBeInTheDocument();
        expect(screen.queryByText('15 Days')).not.toBeInTheDocument();
        fireEvent.mouseDown(screen.getByRole('button'));

        expect(screen.getByText('15 Days')).toBeInTheDocument();
        fireEvent.click(screen.getByText('15 Days'));
        expect(screen.getAllByTestId('infoListItem').length).toBe(2);
    });
});
