import React from 'react';
import { Routes, Route } from 'react-router-dom';

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
    <Routes>
        <Route path={'/'} element={<LandingPage />} />

        <Route path={`/${PAGES.APP_BAR.SEARCH.route || ''}`} element={<SearchBar />} />
        <Route path={`/${PAGES.APP_BAR.COLLAPSIBLE.route || ''}`} element={<Collapsible />} />
        <Route path={`/${PAGES.APP_BAR.CONTEXTUAL_ACTION.route || ''}`} element={<ContextualAction />} />
        <Route path={`/${PAGES.APP_BAR.PAGE_WIDE_SEARCH.route || ''}`} element={<PageWideSearch />} />
        <Route path={`/${PAGES.APP_BAR.DROPDOWN_COLLAPSIBLE.route || ''}`} element={<BluiToolbarMenu />} />

        <Route path={`/${PAGES.FORM_VALIDATION.LIST.route || ''}`} element={<ListFormValidation />} />
        <Route path={`/${PAGES.FORM_VALIDATION.PASSWORD.route || ''}`} element={<PasswordFormValidation />} />
        <Route
            path={`/${PAGES.FORM_VALIDATION.PHONE_NUMBER_FORMAT.route || ''}`}
            element={<PhoneNumberFormatValidation />}
        />
        <Route path={`/${PAGES.FORM_VALIDATION.SECTIONED_FORM.route || ''}`} element={<SectionedFormValidation />} />
        <Route path={`/${PAGES.FORM_VALIDATION.TABLE.route || ''}`} element={<TableFormValidation />} />
        <Route
            path={`/${PAGES.FORM_VALIDATION.FIXED_LENGTH_PASSCODE.route || ''}`}
            element={<FixedLengthPasscodeValidation />}
        />
        <Route path={`/${PAGES.FORM_VALIDATION.VERIFY_ON_SUBMIT.route || ''}`} element={<VerifyOnSubmitValidation />} />
        <Route path={`/${PAGES.I18N.route || ''}`} element={<I18N />} />

        <Route path={`/${PAGES.LISTS.ACTION_LIST.route || ''}`} element={<ActionList />} />
        <Route path={`/${PAGES.LISTS.ACTION_LIST.IN_PANEL_HEADER.route || ''}`} element={<ActionListPanelHeader />} />
        <Route path={`/${PAGES.LISTS.ACTION_LIST.INLINE.route || ''}`} element={<ActionListInline />} />
        <Route path={`/${PAGES.LISTS.ACTION_LIST.IN_BUTTON_PANEL.route || ''}`} element={<ActionListButtonPanel />} />
        <Route
            path={`/${PAGES.LISTS.ACTION_LIST.WITH_LOCAL_ACTIONS.route || ''}`}
            element={<ActionListLocalActions />}
        />
        <Route path={`/${PAGES.LISTS.DATA_LIST.route || ''}`} element={<DataList />} />
        <Route path={`/${PAGES.LISTS.MULTISELECT_LIST.route || ''}`} element={<MultiselectList />} />
        <Route path={`/${PAGES.LISTS.STATUS_LIST.route || ''}`} element={<StatusList />} />
        <Route path={`/${PAGES.LISTS.SORTABLE_LIST.route || ''}`} element={<SortableList />} />
        <Route path={`/${PAGES.LISTS.RESPONSIVE_TABLE.route || ''}`} element={<ResponsiveTable />} />
        <Route path={`/${PAGES.LISTS.TREE_STRUCTURE.route || ''}`} element={<TreeStructureList />} />

        <Route path={`/${PAGES.OVERLAYS.BASIC_BOTTOM_SHEET.route || ''}`} element={<BasicBottomSheet />} />
        <Route path={`/${PAGES.OVERLAYS.COMPLEX_BOTTOM_SHEET.route || ''}`} element={<ComplexBottomSheet />} />

        <Route path={`/${PAGES.DYNAMIC_STEPPER.route || ''}`} element={<DynamicStepper />} />
        <Route path={`/${PAGES.DYNAMIC_STEPPER.route || ''}`} element={<DynamicStepper />} />
        <Route path={`/${PAGES.LOADING_WAITING_STATES.PROGRESS_BAR.route || ''}`} element={<ProgressBar />} />
        <Route
            path={`/${PAGES.LOADING_WAITING_STATES.PROGRESS_BAR_INDETERMINATE.route || ''}`}
            element={<ProgressBarIndeterminate />}
        />
        <Route
            path={`/${PAGES.LOADING_WAITING_STATES.CONTEXTUAL_SPINNER.route || ''}`}
            element={<ContextualSpinner />}
        />
        <Route path={`/${PAGES.LOADING_WAITING_STATES.SKELETONS.route || ''}`} element={<Skeletons />} />
        <Route path={`/${PAGES.LOADING_WAITING_STATES.SPINNER_OVERLAYS.route || ''}`} element={<SpinnerOverlays />} />
        <Route path={`/${PAGES.ACCOUNT_MENU.IN_AN_APP_BAR.route || ''}`} element={<InAnAppBar />} />
        <Route path={`/${PAGES.ACCOUNT_MENU.IN_A_DRAWER.route || ''}`} element={<InADrawer />} />
    </Routes>
);
