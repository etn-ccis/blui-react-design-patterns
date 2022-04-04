import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

import { SearchBar, searchResults } from '.';
import { createTheme, ThemeProvider } from '@mui/material';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Search bar', () => {
    afterEach(cleanup);
    it('renders without crashing', (): void => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SearchBar />
                </Provider>
            </ThemeProvider>
        );
    });

    it('returns the correct number of results when the query string matches', (): void => {
        const queries = [
            { text: 'e', results: 5 },
            { text: 'apple', results: 2 },
            { text: 'watermelon', results: 1 },
            { text: 'pear', results: 0 },
        ];
        queries.forEach(({ text }, index): void => {
            expect(searchResults(text).length).toBe(
                //@ts-ignore
                queries[index].results
            );
        });
    });
});
