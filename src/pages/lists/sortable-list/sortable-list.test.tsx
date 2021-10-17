import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SortableList } from '.';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';

const store = createStore(Reducer());
const createRenderer = (): any =>
    render(
        <Provider store={store}>
            <SortableList />
        </Provider>
    );

describe('Sortable List', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Sortable List')).toBeInTheDocument();
    });

    it('should render all the list items', () => {
        createRenderer();
        expect(screen.getByTestId('list')).toBeInTheDocument();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
    });

    it('should display Sort button, when not sorting', () => {
        createRenderer();
        expect(screen.getByText('Sort')).toBeInTheDocument();
        expect(screen.queryByText('Done')).not.toBeInTheDocument();
    });

    it('should enable edit mode, when Sort button is clicked', () => {
        createRenderer();
        expect(screen.queryByTestId('sortableListEdit')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Sort'));
        expect(screen.getByTestId('sortableListEdit')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('should disable edit mode, when Done button is clicked', () => {
        createRenderer();
        expect(screen.queryByText('Done')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Sort'));
        fireEvent.click(screen.getByText('Done'));
        expect(screen.getByTestId('list')).toBeInTheDocument();
        expect(screen.queryByTestId('sortableListEdit')).not.toBeInTheDocument();
    });
});
