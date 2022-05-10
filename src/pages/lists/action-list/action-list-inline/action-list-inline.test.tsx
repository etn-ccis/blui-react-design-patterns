import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ActionListInline } from '.';
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
                <ActionListInline />
            </Provider>
        </ThemeProvider>
    );

describe('Action list with panel header', () => {
    afterEach(cleanup);
    it('should render', () => {
        createRenderer();
        expect(screen.getByText('Local Item Actions')).toBeInTheDocument();
        expect(screen.getByText('Inline Actions')).toBeInTheDocument();
    });

    it('should render 3 items by default', () => {
        createRenderer();
        expect(screen.getAllByTestId('infoListItem').length).toBe(3);
    });

    it('should display actions for an item, when hovered', () => {
        createRenderer();
        fireEvent.mouseEnter(screen.getAllByTestId('infoListItem')[0]);

        expect(screen.getByTestId('deleteIcon')).toBeInTheDocument();
        expect(screen.getByTestId('saveIcon')).toBeInTheDocument();
        expect(screen.getByTestId('archiveIcon')).toBeInTheDocument();
    });
});
