import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from '../../redux/reducers';
import { DynamicStepper } from '.';
import { StepButton } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <DynamicStepper />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('removes all the steps when the remove all button is clicked', () => {
    const dynamicStepper = mount(
        <Provider store={store}>
            <DynamicStepper />
        </Provider>
    );
    // on init, there is an expanded button waiting for user input
    // and an "add a step" button at the bottom
    expect(dynamicStepper.find(StepButton)).toHaveLength(2);

    // After clicking the 'remove all' button, there should only be the 'add a step' left
    dynamicStepper
        .find('#remove-all')
        .hostNodes()
        .simulate('click');
    expect(dynamicStepper.find(StepButton)).toHaveLength(1);
    expect(dynamicStepper.find(StepButton).text()).toBe('Add a Step');
});
