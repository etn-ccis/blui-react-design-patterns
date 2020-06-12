import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Different App Pages/Routes
import { PAGES } from './routes';
import { ActionList } from '../pages/lists/action-list/action-list';
import { DataList } from '../pages/lists/data-list/data-list';
import { MultiselectList } from '../pages/lists/multiselect-list/multiselect-list';
import { StatusList } from '../pages/lists/status-list/status-list';
import { SortableList } from '../pages/lists/sortable-list/sortable-list';
/*
The main page body, which contains the route definitions
*/
export const Main = (): JSX.Element => (
    <Switch>
        <Route exact path={`/${PAGES.LISTS.ACTION_LIST.route}`} component={ActionList} />
        <Route exact path={`/${PAGES.LISTS.DATA_LIST.route}`} component={DataList} />
        <Route exact path={`/${PAGES.LISTS.MULTISELECT_LIST.route}`} component={MultiselectList} />
        <Route exact path={`/${PAGES.LISTS.STATUS_LIST.route}`} component={StatusList} />
        <Route exact path={`/${PAGES.LISTS.SORTABLE_LIST.route}`} component={SortableList} />
    </Switch>
);
