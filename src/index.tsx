/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as BLUIThemes from '@brightlayer-ui/react-themes';
import '@brightlayer-ui/react-themes/open-sans';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Reducer } from './redux/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const store = createStore(Reducer());

render(
    <MuiThemeProvider theme={createTheme(BLUIThemes.blue)}>
        <BrowserRouter>
            <Provider store={store}>
                <CssBaseline />
                <App />
            </Provider>
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
);
