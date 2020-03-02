import { ADD_NEW_METRIC } from '../actions/metrics-actions';

function metrics(state, action) {
    switch(action.type) {
    case ADD_NEW_METRIC:
            debugger;
            console.log(state, 'cia state')
            console.log(action, 'cia action')
            // if(action.json.isValid === true) {
            //     const newDB = action.json.returnResult
            //     const temp = state.databases
            //     temp.push(newDB)
            //     return Object.assign({}, state, {
                    
            //     })
            // }    
            break;
        default: 
        return state;
        }
}

export default function metricsReducer(state ='', action) {
    debugger;
    switch(action.type) {
        case ADD_NEW_METRIC:
            return state    
        default:
            return state;
    }
}