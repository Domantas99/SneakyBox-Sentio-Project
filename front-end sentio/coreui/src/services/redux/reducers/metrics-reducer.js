import { ADD_NEW_METRIC, REQUEST_DB_METRICS, RECEIVE_DB_METRICS, DELETE_METRIC_IN_STORE, DELETE_METRIC_IN_DB } from '../actions/metrics-actions';
import { DELETE_DATABASE } from '../actions/databases-actions';

function metrics(state = { isFetching:false, error: false,metrics:[] }, action) {
    switch(action.type) {
        case ADD_NEW_METRIC:
            return state
        case REQUEST_DB_METRICS:
            return Object.assign({}, state, { isFetching: true, error: false });
        case RECEIVE_DB_METRICS:
            const result = action.result   // reiktu padaryti, kad pridetu prie praeitu [...praeitos, naujos] ir paskui atfiltruotu
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
        case DELETE_METRIC_IN_STORE:
            const filteredMetrics = state.metrics.filter(m => m.id !== action.metricId)
            return Object.assign({}, state, {
                metrics: filteredMetrics
            })
        case DELETE_METRIC_IN_DB:
            return state
        default: 
            return state;
            }
}

export default function metricsReducer(state='', action) {
    switch(action.type) {
        case ADD_NEW_METRIC:
            return metrics(state, action)
        case REQUEST_DB_METRICS:
            return metrics(state, action)
        case RECEIVE_DB_METRICS:
            return metrics(state, action)   
        case DELETE_METRIC_IN_STORE:
            return metrics(state, action)
        case DELETE_METRIC_IN_DB:
            return metrics(state, action)
        default:
            return state;
    }
}