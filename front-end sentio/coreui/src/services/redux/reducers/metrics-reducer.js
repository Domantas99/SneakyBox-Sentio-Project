import { ADD_NEW_METRIC, REQUEST_DB_METRICS, RECEIVE_DB_METRICS } from '../actions/metrics-actions';

function metrics(state = { isFetching:false, error: false,metrics:[] }, action) {
    switch(action.type) {
    case ADD_NEW_METRIC:
            debugger;
            console.log(state, 'cia state')
            console.log(action, 'cia action')
            // pagal viska metrics.push() 
            return state
    case REQUEST_DB_METRICS:
        debugger;
        return Object.assign({}, state, { isFetching: true, error: false });
    case RECEIVE_DB_METRICS:
        debugger;
        const result = action.result
        if(result.isValid) {
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                metrics: result.returnResult
            })
        }
        return Object.assign({}, state, {
            isFetching: false,
            error: true
        })
        default: 
        return state;
        }
}

export default function metricsReducer(state='', action) {
    debugger;
    switch(action.type) {
        case ADD_NEW_METRIC:
            return metrics(state, action)
        case REQUEST_DB_METRICS:
            return metrics(state, action)
        case RECEIVE_DB_METRICS:
            return metrics(state, action)   
        default:
            return state;
    }
}