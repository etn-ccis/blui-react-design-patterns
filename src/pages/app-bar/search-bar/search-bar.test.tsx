import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

import { SearchBar, searchResults } from '.';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <SearchBar />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('returns the correct number of results when the query string matches', (): void => {
    const queries = [
        { text: 'e', results: 5 },
        { text: 'apple', results: 2 },
        { text: 'watermelon', results: 1 },
        { text: 'pear', results: 0 },
    ];
    queries.forEach(({ text }, index): void => {
        expect(searchResults(text).length).toBe(
            //@ts-ignore
            queries[index].results
        );
    });
});
