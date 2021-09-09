export const PAGES: Routes = {
    ACCOUNT_MENU: {
        title: 'Account Menu',
        IN_AN_APP_BAR: {
            title: 'In an App Bar',
            route: 'in-an-app-bar',
        },
        IN_A_DRAWER: {
            title: 'In a Drawer',
            route: 'in-a-drawer',
        },
    },
    APP_BAR: {
        title: 'App Bars',
        COLLAPSIBLE: {
            title: 'Collapsible',
            route: 'collapsible',
        },
        DROPDOWN_COLLAPSIBLE: {
            title: 'Dropdown Toolbar',
            route: 'dropdown-toolbar',
        },
        SEARCH: {
            title: 'Search',
            route: 'search',
        },
    },
    FORM_VALIDATION: {
        title: 'Forms and Validation',
        LIST: {
            title: 'In a List',
            route: 'in-a-list',
        },
        FIXED_LENGTH_PASSCODE: {
            title: 'Fixed Length Passcode',
            route: 'fixed-length-passcode',
        },
        SECTIONED_FORM: {
            title: 'Sectioned Form',
            route: 'in-a-sectioned-form',
        },
    },
    I18N: {
        title: 'Internationalization',
        route: 'i18n',
    },
    LISTS: {
        title: 'Lists',
        ACTION_LIST: {
            title: 'Action List',
            route: 'action-list',
        },
        DATA_LIST: {
            title: 'Data List',
            route: 'data-list',
        },
        MULTISELECT_LIST: {
            title: 'Multiselect List',
            route: 'multiselect-list',
        },
        SORTABLE_LIST: {
            title: 'Sortable List',
            route: 'sortable-list',
        },
        STATUS_LIST: {
            title: 'Status List',
            route: 'status-list',
        },
        RESPONSIVE_TABLE: {
            title: 'Responsive Table',
            route: 'responsive-table',
        },
    },
    LOADING_WAITING_STATES: {
        title: 'Loading & Waiting',
        SPINNER_OVERLAYS: {
            title: 'Spinner Overlays',
            route: 'spinner-overlays',
        },
        CONTEXTUAL_SPINNER: {
            title: 'Contextual Spinner',
            route: 'contextual-spinner',
        },
        SKELETONS: {
            title: 'Skeletons',
            route: 'skeletons',
        },
        PROGRESS_BAR: {
            title: 'Progress Bars',
            route: 'progress-bar',
        },
        PROGRESS_BAR_INDETERMINATE: {
            title: 'Progress Bars (Indet.)',
            route: 'progress-bar-indeterminate',
        },
    },
    OVERLAYS: {
        title: 'Overlays',
        // DIALOG: {
        //     title: 'Dialog',
        //     route: 'dialog',
        // },
        BASIC_BOTTOM_SHEET: {
            title: 'Basic Bottom Sheet',
            route: 'basic-bottom-sheet',
        },
        COMPLEX_BOTTOM_SHEET: {
            title: 'Complex Bottom Sheet',
            route: 'complex-bottom-sheet',
        },
    },
    DYNAMIC_STEPPER: {
        title: 'Dynamic Stepper',
        route: 'dynamic-stepper',
    },
    // VISUALIZATIONS: {
    //     title: 'Visualizations',
    //     CHARTJS: {
    //         title: 'ChartJS',
    //         route: 'chartjs',
    //     },
    //     MAPBOX: {
    //         title: 'MapBox',
    //         route: 'mapbox',
    //     },
    //     HIGHCHARTS: {
    //         title: 'Highcharts',
    //         route: 'highcharts',
    //     },
    // },
};

export type RouteMetaData = {
    title: string;
    route?: string;
};

export type Routes = {
    ACCOUNT_MENU: RouteMetaData & {
        IN_AN_APP_BAR: RouteMetaData;
        IN_A_DRAWER: RouteMetaData;
    };
    APP_BAR: RouteMetaData & {
        COLLAPSIBLE: RouteMetaData;
        DROPDOWN_COLLAPSIBLE: RouteMetaData;
        SEARCH: RouteMetaData;
    };
    FORM_VALIDATION: RouteMetaData & {
        LIST: RouteMetaData;
        SECTIONED_FORM: RouteMetaData;
        FIXED_LENGTH_PASSCODE: RouteMetaData;
    };
    I18N: RouteMetaData;
    LISTS: RouteMetaData & {
        ACTION_LIST: RouteMetaData;
        DATA_LIST: RouteMetaData;
        MULTISELECT_LIST: RouteMetaData;
        SORTABLE_LIST: RouteMetaData;
        STATUS_LIST: RouteMetaData;
        RESPONSIVE_TABLE: RouteMetaData;
    };
    LOADING_WAITING_STATES: RouteMetaData & {
        PROGRESS_BAR: RouteMetaData;
        PROGRESS_BAR_INDETERMINATE: RouteMetaData;
        CONTEXTUAL_SPINNER: RouteMetaData;
        SKELETONS: RouteMetaData;
        SPINNER_OVERLAYS: RouteMetaData;
    };
    OVERLAYS: RouteMetaData & {
        // DIALOG: RouteMetaData;
        BASIC_BOTTOM_SHEET: RouteMetaData;
        COMPLEX_BOTTOM_SHEET: RouteMetaData;
    };
    DYNAMIC_STEPPER: RouteMetaData;
    // VISUALIZATIONS: RouteMetaData & {
    //     HIGHCHARTS: RouteMetaData;
    //     CHARTJS: RouteMetaData;
    //     MAPBOX: RouteMetaData;
    // };
};
