import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('sorts events correctly', () => {
    const wrapper = shallow(<App></App>)
        .dive()
        .instance();
    const data = [
        { type: 'alarm', date: 0, active: 0 },
        { type: 'alarm', date: 10, active: 1 },
        { type: 'settings', date: 4 },
        { type: 'session', date: 8 },
    ];
    const sortedTime = [
        { type: 'alarm', date: 10, active: 1 },
        { type: 'session', date: 8 },
        { type: 'settings', date: 4 },
        { type: 'alarm', date: 0, active: 0 },
    ];
    const sortedType = [
        { type: 'alarm', date: 10, active: 1 },
        { type: 'alarm', date: 0, active: 0 },
        { type: 'session', date: 8 },
        { type: 'settings', date: 4 },
    ];
    wrapper.state = {
        showMenu: false,
        alarmList: data,
        currentSort: 'time',
    };
    let sorted = wrapper.sortedEvents();
    expect(sorted).toEqual(sortedTime);
    wrapper.setState({ currentSort: 'type' });
    sorted = wrapper.sortedEvents();
    expect(sorted).toEqual(sortedType);
});

it('filters events correctly', () => {
    const wrapper = shallow(<App></App>)
        .dive()
        .instance();
    const data = [
        { type: 'alarm', date: 0, active: 0 },
        { type: 'alarm', date: 10, active: 1 },
        { type: 'settings', date: 4 },
        { type: 'session', date: 8 },
    ];

    // show all
    const all = [
        { type: 'alarm', date: 10, active: 1 },
        { type: 'alarm', date: 0, active: 0 },
        { type: 'session', date: 8 },
        { type: 'settings', date: 4 },
    ];

    // show alarms
    const alarms = [
        { type: 'alarm', date: 10, active: 1 },
        { type: 'alarm', date: 0, active: 0 },
    ];

    // show sessions
    const sessions = [{ type: 'session', date: 8 }];

    // show settings and active alarms
    const settingsandactive = [
        { type: 'alarm', date: 10, active: 1 },
        { type: 'settings', date: 4 },
    ];

    wrapper.state = {
        showMenu: false,
        alarmList: data,
        currentSort: 'type',
        showAlarms: true,
        showActiveAlarms: true,
        showEvents: true,
        showSessions: true,
    };

    // all
    let sorted = wrapper.filteredEvents(wrapper.sortedEvents());
    expect(sorted).toEqual(all);

    // alarms
    wrapper.setState({ showAlarms: true, showActiveAlarms: true, showEvents: false, showSessions: false });
    sorted = wrapper.filteredEvents(wrapper.sortedEvents());
    expect(sorted).toEqual(alarms);

    // sessions
    wrapper.setState({ showAlarms: false, showActiveAlarms: false, showEvents: false, showSessions: true });
    sorted = wrapper.filteredEvents(wrapper.sortedEvents());
    expect(sorted).toEqual(sessions);

    // settings and active
    wrapper.setState({ showAlarms: false, showActiveAlarms: true, showEvents: true, showSessions: false });
    sorted = wrapper.filteredEvents(wrapper.sortedEvents());
    expect(sorted).toEqual(settingsandactive);
});
