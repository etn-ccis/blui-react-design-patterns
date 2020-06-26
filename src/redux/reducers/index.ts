import { combineReducers } from 'redux';
import { TOGGLE_DRAWER } from '../actions';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';
// import { AppActions } from '../actions/actionTypes';

export type AppState = {
    app: CommonState;
};
type CommonState = {
    drawerOpen: boolean;
};
const initialAppState: CommonState = {
    drawerOpen: false,
};
const appReducer = (state = initialAppState, action: any): CommonState => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload,
            };
        default:
            return state;
    }
};
export const Reducer = (): any =>
    combineReducers<AppState>({
        app: appReducer,
    });
