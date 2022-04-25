/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import * as BLUIThemes from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Reducer } from './redux/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line
    interface DefaultTheme extends Theme {}
}

const store = createStore(Reducer());

render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(BLUIThemes.blue)}>
            <BrowserRouter>
                <Provider store={store}>
                    <CssBaseline />
                    <App />
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById('root')
);
