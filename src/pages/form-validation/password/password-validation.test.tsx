/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore } from 'redux';
import { Reducer } from '../../../redux/reducers';
import { Provider } from 'react-redux';
import {
    PasswordFormValidation,
    upperCharRegex,
    lowerCharRegex,
    numberRegex,
    splCharRegex,
} from '.';

Enzyme.configure({ adapter: new Adapter() });
const store = createStore(Reducer());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <PasswordFormValidation />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('recognizes valid password correctly', () => {
    // At least 1 uppercase letter
    let correctPasswords = ['A', 'Ab', 'AaaAAAAaaNjL', '&A!'];
    let incorrectPasswords = ['', 'a', '1', '.', 'null', 'undefined'];
    correctPasswords.forEach((val): void => {
        expect(upperCharRegex.test(val)).toBeTruthy();
    });
    incorrectPasswords.forEach((val): void => {
        expect(upperCharRegex.test(val)).toBeFalsy();
    });

    // At least 1 lowercase letter
    correctPasswords = ['a', 'Ab', 'AaaAAAAaaNjL', '^a@$', 'NaN', 'null', 'undefined'];
    incorrectPasswords = ['', 'A', '1', '.'];
    correctPasswords.forEach((val): void => {
        expect(lowerCharRegex.test(val)).toBeTruthy();
    });
    incorrectPasswords.forEach((val): void => {
        expect(lowerCharRegex.test(val)).toBeFalsy();
    });

    // At least 1 special character: (valid: ! @ # $ ^ &)
    correctPasswords = ['!', '@', '#', '$', '^', '&', '1!', ' as&', '!!^'];
    incorrectPasswords = ['', 'A', '1', '.', '"', ',', 'a'];
    correctPasswords.forEach((val): void => {
        expect(splCharRegex.test(val)).toBeTruthy();
    });
    incorrectPasswords.forEach((val): void => {
        expect(splCharRegex.test(val)).toBeFalsy();
    });

    // At least 1 digit
    correctPasswords = ['1', '2', '1234', 'aa1bds;:!', '$!0', '0'];
    incorrectPasswords = ['', 'b', '!', '.', 'NaN', 'undefined', 'TheSuperWomanBulecat!'];
    correctPasswords.forEach((val): void => {
        expect(numberRegex.test(val)).toBeTruthy();
    });
    incorrectPasswords.forEach((val): void => {
        expect(numberRegex.test(val)).toBeFalsy();
    });
});
