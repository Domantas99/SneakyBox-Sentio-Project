import { SET_TEMP_PANEL_OPTIONS, RESET_TEMP_PANEL_OPTIONS } from '../actions/tempPanelOptions-actions';

export default function tempPanelOptionsReducer(state ={}, action) {
    switch(action.type) {
        case SET_TEMP_PANEL_OPTIONS:
            return action.options;    
        case RESET_TEMP_PANEL_OPTIONS:
            return action.options; 
        default:
            return state;
    }
}