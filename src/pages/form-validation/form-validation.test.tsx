/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Reducer } from '../../redux/reducers';
import { Provider } from 'react-redux';
import {
    FormValidation,
    emailRegex,
    phoneNumberRegex,
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
            <FormValidation />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});

it('recognizes emails correctly', () => {
    const correctEmails = ['a@a.co', 'A_a.vb@eaton.com.us', 'a+@123.com'];
    const incorrectEmails = ['', '@', 'a@c', 'a@a.c', 'a@', '@bc.com', '"help@etn.com"'];
    // .@eaton.com is getting recognized as a valid email address,
    // to correct it might give you a "write-only" regex
    correctEmails.forEach((val): void => {
        expect(emailRegex.test(val)).toBeTruthy();
    });
    incorrectEmails.forEach((val): void => {
        expect(emailRegex.test(val)).toBeFalsy();
    });
});

it('recognizes phone numbers correctly', () => {
    const correctPhoneNumbers = ['1111111111', '123-123-1234', '(123) 123 1234', '123 123 1234', '123.123.1234'];
    const incorrectPhoneNumbers = ['', '1', '+', ' ', '          ', '   -   -    ', '123(123)1234'];
    correctPhoneNumbers.forEach((val): void => {
        expect(phoneNumberRegex.test(val)).toBeTruthy();
    });
    incorrectPhoneNumbers.forEach((val): void => {
        expect(phoneNumberRegex.test(val)).toBeFalsy();
    });
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
