import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Different App Pages/Routes
import { PAGES } from './routes';
import { ActionList } from '../pages/action-list';

/*
The main page body, which contains the route definitions
*/
export const Main = (): JSX.Element => (
    <Switch>
        <Route exact path={`/${PAGES.LISTS.ACTION_LIST.route}`} component={ActionList} />
    </Switch>
);
