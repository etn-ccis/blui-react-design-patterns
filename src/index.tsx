import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as PXBThemes from '@pxblue/react-themes';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Reducer } from './redux/reducers';
import { Provider } from 'react-redux';

import 'typeface-open-sans';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const store = createStore(Reducer());

render(
    <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
        <BrowserRouter>
            <Provider store={store}>
                <CssBaseline />
                <App />
            </Provider>
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
);
