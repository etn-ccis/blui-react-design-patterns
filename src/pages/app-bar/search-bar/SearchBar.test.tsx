import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';

import { SearchBar, searchResults } from '.';
import { listItems as presidents } from '../../../assets/list';

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

it('returns nothing for when nothing matches the query string', (): void => {
    const queries = ['asdf', '!', '"', 'Jamse', 'Democratic-Whig'];
    queries.forEach((query) => {
        expect(searchResults(query).length).toBe(0);
    });
});

it('returns the correct number of results when the query string matches', (): void => {
    const queries = {
        asdf: 0,
        '!': 0,
        '"': 0,
        jamse: 0,
        'Democratic-Whig': 0,
        Adams: 2,
        '2017': 1,
        Nix: 1,
        Republican: 23,
        '': presidents.length,
    };
    Object.keys(queries).forEach((query): void => {
        expect(searchResults(query).length).toBe(
            //@ts-ignore
            queries[query]
        );
    });
});
