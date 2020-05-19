export const PAGES: Routes = {
    APP_BAR: {
        title: 'App Bar',
        COLLAPSIBLE: {
            title: 'Collapsible',
            route: 'collapsible',
        },
        SEARCH: {
            title: 'Search',
            route: 'search',
        },
    },
    EMPTY_STATES: {
        title: 'Empty States',
        LOADING: {
            title: 'Loading',
            route: 'loading',
        },
    },
    FORM_VALIDATION: {
        title: 'Form Validation',
        route: 'form-validation',
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
            title: 'Selection List',
            route: 'selection-list',
        },
        SORTABLE_LIST: {
            title: 'Sortable List',
            route: 'sortable-list',
        },
        STATUS_LIST: {
            title: 'Status List',
            route: 'status-list',
        },
        TABLES: {
            title: 'Tables',
            route: 'tables',
        },
    },
    OVERLAYS: {
        title: 'Overlays',
        DIALOG: {
            title: 'Dialog',
            route: 'dialog',
        },
        BOTTOM_SHEET: {
            title: 'Bottom Sheet',
            route: 'bottom-sheet',
        },
        COMPLEX_BOTTOM_SHEET: {
            title: 'Complex Bottom Sheet',
            route: 'complex-bottom-sheet',
        },
    },
    STEPPERS: {
        title: 'Steppers',
        DYNAMIC: {
            title: 'Dynamic',
            route: 'dynamic',
        },
    },
    VISUALIZATIONS: {
        title: 'Visualizations',
        CHARTJS: {
            title: 'ChartJS',
            route: 'chartjs',
        },
        MAPBOX: {
            title: 'MapBox',
            route: 'mapbox',
        },
        HIGHCHARTS: {
            title: 'Highcharts',
            route: 'highcharts',
        },
    },
};

export type RouteMetaData = {
    title: string;
    route?: string;
};

type Routes = {
    APP_BAR: RouteMetaData & {
        COLLAPSIBLE: RouteMetaData;
        SEARCH: RouteMetaData;
    };
    EMPTY_STATES: RouteMetaData & {
        LOADING: RouteMetaData;
    };
    FORM_VALIDATION: RouteMetaData;
    I18N: RouteMetaData;
    LISTS: RouteMetaData & {
        ACTION_LIST: RouteMetaData;
        DATA_LIST: RouteMetaData;
        MULTISELECT_LIST: RouteMetaData;
        SORTABLE_LIST: RouteMetaData;
        STATUS_LIST: RouteMetaData;
        TABLES: RouteMetaData;
    };
    OVERLAYS: RouteMetaData & {
        DIALOG: RouteMetaData;
        BOTTOM_SHEET: RouteMetaData;
        COMPLEX_BOTTOM_SHEET: RouteMetaData;
    };
    STEPPERS: RouteMetaData & {
        DYNAMIC: RouteMetaData;
    };
    VISUALIZATIONS: RouteMetaData & {
        HIGHCHARTS: RouteMetaData;
        CHARTJS: RouteMetaData;
        MAPBOX: RouteMetaData;
    };
};
