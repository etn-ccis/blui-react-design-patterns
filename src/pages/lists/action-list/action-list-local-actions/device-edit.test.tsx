import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DeviceEdit } from './device-edit';
import { createStore } from 'redux';
import { Reducer } from '../../../../redux/reducers';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Action list local', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <DeviceEdit
                        open={false}
                        handleClose={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                        subTitle={''}
                        updateSubTitle={function (): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                </Provider>
            </ThemeProvider>
        );
    });
});
