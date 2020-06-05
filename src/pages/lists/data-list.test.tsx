import React from 'react';
import { DataList, unCamelCase, ObjectToList } from './data-list';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../redux/reducers';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <DataList />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('should capitalize separate the word based on Camel Case', () => {
    expect(unCamelCase('camelCase')).toBe('Camel Case');
});

it('should display values in object as list', () => {
    const obj = {
        georgeWashington: 1789,
        johnAdams: 1796,
    };
    const output = [
        { key: 'georgeWashington', value: 1789 },
        { key: 'johnAdams', value: 1796 },
    ];
    expect(ObjectToList(obj)).toEqual(output);
});
