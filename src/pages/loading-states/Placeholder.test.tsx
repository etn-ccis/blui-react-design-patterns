import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Placeholder } from './Placeholder';

Enzyme.configure({ adapter: new Adapter() });

describe('Placeholder Component Tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Placeholder />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
