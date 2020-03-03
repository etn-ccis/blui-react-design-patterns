import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import * as PXBThemes from '@pxblue/themes/react';
import React from 'react';
import { render } from 'react-dom';

import 'typeface-open-sans';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

render(
    <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root')
);
