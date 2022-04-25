import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from '../../redux/reducers';
import { DynamicStepper } from '.';
import { createTheme, ThemeProvider, StepButton } from '@mui/material';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Dynamic stepper', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <DynamicStepper />
                </Provider>
            </ThemeProvider>
        );
    });

    it('removes all the steps when the remove all button is clicked', () => {
        const dynamicStepper = mount(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <DynamicStepper />
                </Provider>
            </ThemeProvider>
        );
        // on init, there is an expanded button waiting for user input
        // and an "add a step" button at the bottom
        expect(dynamicStepper.find(StepButton)).toHaveLength(2);

        // After clicking the 'remove all' button, there should only be the 'add a step' left
        dynamicStepper.find('#remove-all').hostNodes().simulate('click');
        expect(dynamicStepper.find(StepButton)).toHaveLength(1);
        expect(dynamicStepper.find(StepButton).text()).toBe('Add a Step');
    });
});
