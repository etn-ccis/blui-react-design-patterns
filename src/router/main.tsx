import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CollapsibleAppBar } from '../pages/app-bar';
import { EmptyStatePage } from '../pages/empty-state';
import { FormValidation } from '../pages/form-validation';
import { ValidationForm } from '../pages/form-validation-class';
import { ActionList } from '../pages/action-list';
import { AlarmList } from '../pages/bottom-sheet';
import { ListValues } from '../pages/data-list';

// Different App Pages/Routes
import Home from '../pages/home';

/*
The main page body, which contains the route definitions
*/
const Main = (): JSX.Element => (
    <div>
        <Switch>
            <Route exact path="/action-list" component={ActionList} />
            <Route exact path="/app-bar" component={CollapsibleAppBar} />
            <Route exact path="/bottom-sheet" component={AlarmList} />
            <Route exact path="/data-list" component={ListValues} />
            <Route exact path="/empty-state" component={EmptyStatePage} />
            <Route exact path="/form-validation" component={FormValidation} />
            <Route exact path="/form-validation-class" component={ValidationForm} />
            <Route path="*" component={Home} />
        </Switch>
    </div>
);
export default Main;
