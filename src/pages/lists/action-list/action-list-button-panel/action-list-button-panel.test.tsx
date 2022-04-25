import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ActionListButtonPanel } from '.';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../../redux/reducers';
import { createTheme, ThemeProvider } from '@mui/material';
import * as BLUIThemes from '@brightlayer-ui/react-themes';

const theme = createTheme(BLUIThemes.blue);
const store = createStore(Reducer());

const createRenderer = (): any =>
    render(
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ActionListButtonPanel />
            </Provider>
        </ThemeProvider>
    );

describe('Action list with button panel', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Global Action List')).toBeInTheDocument();
        expect(screen.getByText('In Button Panel')).toBeInTheDocument();
    });

    it('should render 3 items by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
    });

    it('should render additional items on "Add an Item" button press', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
        fireEvent.click(screen.getAllByTestId('addItemButton')[0]);
        expect(screen.getAllByTestId('infoListItem').length).toBe(4);
    });

    it('should open dialog on "Delete" button press', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
        fireEvent.click(screen.getAllByTestId('deleteButton')[0]);
        expect(screen.getByText('Delete all items?')).toBeInTheDocument();
        expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
        expect(screen.getAllByTestId('dialogDeleteButton').length).toBe(1);
    });

    it('should remove all items', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
        fireEvent.click(screen.getAllByTestId('deleteButton')[0]);
        expect(screen.getAllByTestId('dialogDeleteButton').length).toBe(1);
        fireEvent.click(screen.getAllByTestId('dialogDeleteButton')[0]);
        expect(screen.getByText('No Items Found')).toBeInTheDocument();
    });
});
