import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CollapsibleAppBar } from '../pages/app-bar';
import { EmptyStatePage } from '../pages/empty-state';
import { FormValidation } from '../pages/form-validation';
import { MultiSelectList } from '../pages/multiselect-list';

// Different App Pages/Routes
import Home from '../pages/home';

/*
The main page body, which contains the route definitions
*/
const Main = (): JSX.Element => (
    <div style={{ padding: '16px' }}>
        <Switch>
            <Route exact path="/app-bar" component={CollapsibleAppBar} />
            <Route exact path="/empty-state" component={EmptyStatePage} />
            <Route exact path="/form-validation" component={FormValidation} />
            <Route exact path="/multiselect-list" component={MultiSelectList} />
            <Route path="*" component={Home} />
        </Switch>
    </div>
);
export default Main;
