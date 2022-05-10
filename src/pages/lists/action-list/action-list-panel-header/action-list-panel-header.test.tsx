import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ActionListPanelHeader } from '.';
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
                <ActionListPanelHeader />
            </Provider>
        </ThemeProvider>
    );

describe('Action list with panel header', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Global Action List')).toBeInTheDocument();
        expect(screen.getByText('In Panel Header')).toBeInTheDocument();
    });

    it('should render 3 items by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
    });

    it('should render filtered items, when the range is selected', () => {
        createRenderer();
        expect(screen.getByText('30 Days')).toBeInTheDocument();
        expect(screen.queryByText('15 Days')).not.toBeInTheDocument();
        fireEvent.mouseDown(screen.getByText('30 Days'));

        expect(screen.getByText('15 Days')).toBeInTheDocument();
        fireEvent.click(screen.getByText('15 Days'));
        expect(screen.getAllByTestId('infoListItem').length).toBe(2);
    });
});
