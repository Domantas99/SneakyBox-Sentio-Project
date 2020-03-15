import { ADD_NEW_PANEL, DELETE_PANEL_IN_STORE, DELETE_PANEL_IN_DB, REQUEST_ALL_PANELS, RECEIVE_ALL_PANELS } from '../actions/panel-actions';

function panels(state={ isFetching:false, error:false, panels:[] }, action) {
    switch(action.type) {
        case ADD_NEW_PANEL:  /// padaryt kad duotu api
            if(action.json.isValid) {
                return Object.assign({}, state, { isFetching:false, error:false, message: "New Panel added successfully"});
            }
            return Object.assign({}, state, { isFetching:false, error:true, message: "An error occur while adding new panel"});
        case DELETE_PANEL_IN_STORE:
            const filteredPanels = state.panels.filter(x => x.id !== action.panelId);
            return Object.assign({}, state, { 
                isFetching:true, 
                error:false, 
                message: "Panel is deleted in store and request to server is sent",
                panels: filteredPanels
            });
        case DELETE_PANEL_IN_DB:
            const res = action.jsonResult;
            if(res.isValid) 
            {
                return Object.assign({}, state, { 
                    isFetching:false, 
                    error:false, 
                    message: "Panel is deleted in database succesfully",
                });
            }
            else {
                return Object.assign({}, state, { 
                    isFetching:false, 
                    error:true, 
                    message: "There was an error deleting panel in database",
                });
            }
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
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                panels: []
            })
        default: 
            return state
    }
}

// filter action nereiks, nes keis state, tai atfiltruosiu componente,

export default function panelsReducer (state='', action) {
    switch(action.type) {
        case ADD_NEW_PANEL:
            return panels(state, action);
        case DELETE_PANEL_IN_STORE:
            return panels(state, action);
        case DELETE_PANEL_IN_DB:
            return panels(state, action);
        case REQUEST_ALL_PANELS:
            return panels(state, action);
        case RECEIVE_ALL_PANELS:
            return panels(state, action);
        default: 
            return state;
    }
}
