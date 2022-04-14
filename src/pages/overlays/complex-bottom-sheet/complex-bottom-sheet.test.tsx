import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from '../../../redux/reducers';

import { ComplexBottomSheet, sortedEvents, filteredEvents, TYPES } from '.';
import { Event } from './alarmData';

import { createTheme, ThemeProvider } from '@mui/material';
import * as BLUIThemes from '@brightlayer-ui/react-themes';
const theme = createTheme(BLUIThemes.blue);

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

describe('Complex bottom sheet', () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ComplexBottomSheet />
                </Provider>
            </ThemeProvider>
        );
    });

    it('sorts events correctly', () => {
        const data: Event[] = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, location: '', device: '', details: '' },
            { type: 'session', date: 8, location: '', device: '', details: '' },
        ];
        const sortedTime: Event[] = [
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'session', date: 8, location: '', device: '', details: '' },
            { type: 'settings', date: 4, location: '', device: '', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
        ];
        const sortedType: Event[] = [
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'session', date: 8, location: '', device: '', details: '' },
            { type: 'settings', date: 4, location: '', device: '', details: '' },
        ];

        expect(sortedEvents(data, TYPES.TIME)).toStrictEqual(sortedTime);
        expect(sortedEvents(data, TYPES.TYPE)).toStrictEqual(sortedType);
    });

    it('filters events correctly', () => {
        const data: Event[] = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, location: '', device: '', details: '' },
            { type: 'session', date: 8, location: '', device: '', details: '' },
        ];

        // show all
        const all: Event[] = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, location: '', device: '', details: '' },
            { type: 'session', date: 8, location: '', device: '', details: '' },
        ];

        // show alarms
        const alarms: Event[] = [
            { type: 'alarm', date: 0, active: false, location: '', device: '', details: '' },
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
        ];

        // show sessions
        const sessions: Event[] = [{ type: 'session', date: 8, location: '', device: '', details: '' }];

        // show settings and active alarms
        const settingsandactive: Event[] = [
            { type: 'alarm', date: 10, active: true, location: '', device: '', details: '' },
            { type: 'settings', date: 4, location: '', device: '', details: '' },
        ];

        // all
        expect(
            filteredEvents(data, { showAlarms: true, showActiveAlarms: true, showSettings: true, showSessions: true })
        ).toStrictEqual(all);

        // alarms
        expect(
            filteredEvents(data, { showAlarms: true, showActiveAlarms: true, showSettings: false, showSessions: false })
        ).toStrictEqual(alarms);

        // sessions
        expect(
            filteredEvents(data, {
                showAlarms: false,
                showActiveAlarms: false,
                showSettings: false,
                showSessions: true,
            })
        ).toStrictEqual(sessions);

        // settings and active
        expect(
            filteredEvents(data, { showAlarms: false, showActiveAlarms: true, showSettings: true, showSessions: false })
        ).toStrictEqual(settingsandactive);
    });
});
