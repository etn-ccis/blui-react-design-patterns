import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Different App Pages/Routes
import { PAGES } from './routes';
import { I18N } from '../pages/i18n';
import { FormValidation } from '../pages/form-validation';
import { ActionList } from '../pages/lists/action-list/action-list';
import { DataList } from '../pages/lists/data-list/data-list';
import { MultiselectList } from '../pages/lists/multiselect-list/multiselect-list';
import { StatusList } from '../pages/lists/status-list/status-list';
import { SortableList } from '../pages/lists/sortable-list/sortable-list';
import { BottomSheet } from '../pages/overlays/bottom-sheet/bottom-sheet';
/*
The main page body, which contains the route definitions
*/
export const Main = (): JSX.Element => (
    <Switch>
        <Route exact path={`/${PAGES.FORM_VALIDATION.route}`} component={FormValidation} />
        <Route exact path={`/${PAGES.I18N.route}`} component={I18N} />

        <Route exact path={`/${PAGES.LISTS.ACTION_LIST.route}`} component={ActionList} />
        <Route exact path={`/${PAGES.LISTS.DATA_LIST.route}`} component={DataList} />
        <Route exact path={`/${PAGES.LISTS.MULTISELECT_LIST.route}`} component={MultiselectList} />
        <Route exact path={`/${PAGES.LISTS.STATUS_LIST.route}`} component={StatusList} />
        <Route exact path={`/${PAGES.LISTS.SORTABLE_LIST.route}`} component={SortableList} />

        <Route exact path={`/${PAGES.OVERLAYS.BOTTOM_SHEET.route}`} component={BottomSheet} />
    </Switch>
);
