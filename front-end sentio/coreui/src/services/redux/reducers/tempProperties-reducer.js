import {RESET_TEMP_PROPERTIES, SET_TEMP_PROPERTIES} from '../actions/tempProperties-actions';

export default function tempPropertiesReducer(state ={}, action) {
    debugger;
    switch(action.type) {
        case SET_TEMP_PROPERTIES:
            return action.propObj;    
        case RESET_TEMP_PROPERTIES:
            return action.propObj; 
        default:
            return state;
    }
}