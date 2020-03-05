import { AddNewMetricAPI, DatabaseMetricsAPI } from '../../backend-urls';
export const ADD_NEW_METRIC = 'metrics:add_new_metric';
export const REQUEST_DB_METRICS = 'metrics:request_db_metrics';
export const RECEIVE_DB_METRICS = 'metrics:receive_db_metrics';


function requestMetricsAction(databaseId) {
    debugger;
    return {
        type: REQUEST_DB_METRICS,
        databaseId
    }
}

function receiveMetricsAction(databaseId, json) {
    return {
        type: RECEIVE_DB_METRICS,
        databaseId,
        result: json
    }
}

export function fetchDbMetrics(databaseId) {
    return dispatch => {
        dispatch(requestMetricsAction(databaseId))
        return fetch(DatabaseMetricsAPI + databaseId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(receiveMetricsAction(databaseId, json)))
    }
}


function AddNewMetricAction(json) {
    return {
        type: ADD_NEW_METRIC,
        json
    }
}

export function AddNewMetric(json) {
    debugger
    return dispatch => {
        return fetch(AddNewMetricAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
            }).then(res => res.json())
                .then(jsonRes => dispatch(AddNewMetricAction(jsonRes)))
    }
}