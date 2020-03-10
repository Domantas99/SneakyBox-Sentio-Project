import { ADD_NEW_PANEL, FILTER_DB_PANELS, DELETE_PANEL, REQUEST_DB_PANELS, RECEIVE_DB_PANELS, REQUEST_ALL_PANELS, RECEIVE_ALL_PANELS } from '../actions/panel-actions';

function panels(state={ isFetching:false, error:false, panels:[] }, action) {
    switch(action.type) {
        // case ADD_NEW_PANEL:
        //     return panels(state, action);
        // case DELETE_PANEL:
        //     return panels(state, action);
        // case REQUEST_DB_PANELS:
        //     return panels(state, action);
        // case RECEIVE_DB_PANELS:
        //     return panels(state, action);
        case REQUEST_ALL_PANELS:
            return Object.assign({}, state, {isFetching:true, error:false});
        case RECEIVE_ALL_PANELS:
            const result = action.result;
            if(result.isValid) {
                return Object.assign({}, state, {
                    isFetching: false,
                    error: false,
                    panels: result.returnResult
                })
            }
            return Object.assign({}, state, {isFetching:false, error:true});
        default: 
            return state
    }
}

// filter action nereiks, nes keis state, tai atfiltruosiu componente,

export default function panelsReducer (state='', action) {
    switch(action.type) {
        case ADD_NEW_PANEL:
            return panels(state, action);
        case DELETE_PANEL:
            return panels(state, action);
        case REQUEST_DB_PANELS:
            return panels(state, action);
        case RECEIVE_DB_PANELS:
            return panels(state, action);
        case FILTER_DB_PANELS:
            return panels(state, action);
        case REQUEST_ALL_PANELS:
            return panels(state, action);
        case RECEIVE_ALL_PANELS:
            return panels(state, action);
        default: 
            return state;
    }
}
