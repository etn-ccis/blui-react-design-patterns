import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Different App Pages/Routes
import { LandingPage } from '../pages/LandingPage';
import { PAGES } from './routes';
import { SearchBar } from '../pages/app-bar/search-bar';
import { Collapsible } from '../pages/app-bar/collapsible';
import { ContextualAction } from '../pages/app-bar/contextual-action';
import { I18N } from '../pages/i18n';
import { ActionList } from '../pages/lists/action-list';
import { ActionListButtonPanel } from '../pages/lists/action-list/action-list-button-panel';
import { ActionListPanelHeader } from '../pages/lists/action-list/action-list-panel-header';
import { ActionListLocalActions } from '../pages/lists/action-list/action-list-local-actions';
import { DataList } from '../pages/lists/data-list';
import { MultiselectList } from '../pages/lists/multiselect-list';
import { StatusList } from '../pages/lists/status-list';
import { SortableList } from '../pages/lists/sortable-list';
import { ResponsiveTable } from '../pages/lists/responsive-table';
import { BasicBottomSheet } from '../pages/overlays/basic-bottom-sheet';
import { ComplexBottomSheet } from '../pages/overlays/complex-bottom-sheet';
import { DynamicStepper } from '../pages/dynamic-stepper';
import { ProgressBarIndeterminate } from '../pages/loading-waiting-states/progress-bar-indeterminate';
import { ProgressBar } from '../pages/loading-waiting-states/progress-bar';
import { SpinnerOverlays } from '../pages/loading-waiting-states/spinner-overlays';
import { ContextualSpinner } from '../pages/loading-waiting-states/contextual-spinner/ContextualSpinner';
import { Skeletons } from '../pages/loading-waiting-states/skeletons/Skeletons';
import { InAnAppBar } from '../pages/account-menu/in-an-app-bar';
import { InADrawer } from '../pages/account-menu/in-a-drawer';
import { BluiToolbarMenu } from '../pages/app-bar/toolbar-menu';
import { ListFormValidation } from '../pages/form-validation/list';
import { FixedLengthPasscodeValidation } from '../pages/form-validation/fixed-length-passcode';
import { SectionedFormValidation } from '../pages/form-validation/sectioned-form';
import { VerifyOnSubmitValidation } from '../pages/form-validation/verify-on-submit';
import { PhoneNumberFormatValidation } from '../pages/form-validation/phone-number-format';
import { TableFormValidation } from '../pages/form-validation/table';
import { PageWideSearch } from '../pages/app-bar/page-wide-search/PageWideSearch';
import { PasswordFormValidation } from '../pages/form-validation/password';
import { ActionListInline } from '../pages/lists/action-list/action-list-inline';
import { TreeStructureList } from '../pages/lists/tree-structure-list';
/*
The main page body, which contains the route definitions
*/
export const Main = (): JSX.Element => (
    <Switch>
        <Route exact path={'/'} component={LandingPage} />

        <Route exact path={`/${PAGES.APP_BAR.SEARCH.route || ''}`} component={SearchBar} />
        <Route exact path={`/${PAGES.APP_BAR.COLLAPSIBLE.route || ''}`} component={Collapsible} />
        <Route exact path={`/${PAGES.APP_BAR.CONTEXTUAL_ACTION.route || ''}`} component={ContextualAction} />
        <Route exact path={`/${PAGES.APP_BAR.PAGE_WIDE_SEARCH.route || ''}`} component={PageWideSearch} />
        <Route exact path={`/${PAGES.APP_BAR.DROPDOWN_COLLAPSIBLE.route || ''}`} component={BluiToolbarMenu} />

        <Route exact path={`/${PAGES.FORM_VALIDATION.LIST.route || ''}`} component={ListFormValidation} />
        <Route exact path={`/${PAGES.FORM_VALIDATION.PASSWORD.route || ''}`} component={PasswordFormValidation} />
        <Route
            exact
            path={`/${PAGES.FORM_VALIDATION.PHONE_NUMBER_FORMAT.route || ''}`}
            component={PhoneNumberFormatValidation}
        />
        <Route
            exact
            path={`/${PAGES.FORM_VALIDATION.SECTIONED_FORM.route || ''}`}
            component={SectionedFormValidation}
        />
        <Route exact path={`/${PAGES.FORM_VALIDATION.TABLE.route || ''}`} component={TableFormValidation} />
        <Route
            exact
            path={`/${PAGES.FORM_VALIDATION.FIXED_LENGTH_PASSCODE.route || ''}`}
            component={FixedLengthPasscodeValidation}
        />
        <Route
            exact
            path={`/${PAGES.FORM_VALIDATION.VERIFY_ON_SUBMIT.route || ''}`}
            component={VerifyOnSubmitValidation}
        />
        <Route exact path={`/${PAGES.I18N.route || ''}`} component={I18N} />

        <Route exact path={`/${PAGES.LISTS.ACTION_LIST.route || ''}`} component={ActionList} />
        <Route
            exact
            path={`/${PAGES.LISTS.ACTION_LIST.IN_PANEL_HEADER.route || ''}`}
            component={ActionListPanelHeader}
        />
        <Route exact path={`/${PAGES.LISTS.ACTION_LIST.INLINE.route || ''}`} component={ActionListInline} />
        <Route
            exact
            path={`/${PAGES.LISTS.ACTION_LIST.IN_BUTTON_PANEL.route || ''}`}
            component={ActionListButtonPanel}
        />
        <Route
            exact
            path={`/${PAGES.LISTS.ACTION_LIST.WITH_LOCAL_ACTIONS.route || ''}`}
            component={ActionListLocalActions}
        />
        <Route exact path={`/${PAGES.LISTS.DATA_LIST.route || ''}`} component={DataList} />
        <Route exact path={`/${PAGES.LISTS.MULTISELECT_LIST.route || ''}`} component={MultiselectList} />
        <Route exact path={`/${PAGES.LISTS.STATUS_LIST.route || ''}`} component={StatusList} />
        <Route exact path={`/${PAGES.LISTS.SORTABLE_LIST.route || ''}`} component={SortableList} />
        <Route exact path={`/${PAGES.LISTS.RESPONSIVE_TABLE.route || ''}`} component={ResponsiveTable} />
        <Route exact path={`/${PAGES.LISTS.TREE_STRUCTURE.route || ''}`} component={TreeStructureList} />

        <Route exact path={`/${PAGES.OVERLAYS.BASIC_BOTTOM_SHEET.route || ''}`} component={BasicBottomSheet} />
        <Route exact path={`/${PAGES.OVERLAYS.COMPLEX_BOTTOM_SHEET.route || ''}`} component={ComplexBottomSheet} />

        <Route exact path={`/${PAGES.DYNAMIC_STEPPER.route || ''}`} component={DynamicStepper} />
        <Route exact path={`/${PAGES.DYNAMIC_STEPPER.route || ''}`} component={DynamicStepper} />
        <Route exact path={`/${PAGES.LOADING_WAITING_STATES.PROGRESS_BAR.route || ''}`} component={ProgressBar} />
        <Route
            exact
            path={`/${PAGES.LOADING_WAITING_STATES.PROGRESS_BAR_INDETERMINATE.route || ''}`}
            component={ProgressBarIndeterminate}
        />
        <Route
            exact
            path={`/${PAGES.LOADING_WAITING_STATES.CONTEXTUAL_SPINNER.route || ''}`}
            component={ContextualSpinner}
        />
        <Route exact path={`/${PAGES.LOADING_WAITING_STATES.SKELETONS.route || ''}`} component={Skeletons} />
        <Route
            exact
            path={`/${PAGES.LOADING_WAITING_STATES.SPINNER_OVERLAYS.route || ''}`}
            component={SpinnerOverlays}
        />
        <Route exact path={`/${PAGES.ACCOUNT_MENU.IN_AN_APP_BAR.route || ''}`} component={InAnAppBar} />
        <Route exact path={`/${PAGES.ACCOUNT_MENU.IN_A_DRAWER.route || ''}`} component={InADrawer} />
    </Switch>
);
