import { AddNewMetricAPI, DatabaseMetricsAPI, DeleteMetricAPI } from '../../backend-urls';
export const ADD_NEW_METRIC = 'metrics:add_new_metric';
export const REQUEST_DB_METRICS = 'metrics:request_db_metrics';
export const RECEIVE_DB_METRICS = 'metrics:receive_db_metrics';
export const DELETE_METRIC_IN_STORE = 'metrics:delete_in_store';
export const DELETE_METRIC_IN_DB = 'metrics:delete_in_database';

// GET metrics
function requestMetricsAction(databaseId) {
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

// Add metric
function AddNewMetricAction(json) {
    return {
        type: ADD_NEW_METRIC,
        json
    }
}

export function AddNewMetric(json) {
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

// Delete metric
function DeleteMetricInStoreAction(metricId){
    return {
        type: DELETE_METRIC_IN_STORE,
        metricId
    }
}
function DeleteMetricInDbResultAction(jsonResult){
    return {
        type: DELETE_METRIC_IN_DB,
        jsonResult
    }
}

export function DeleteMetric(metricId) {
    return dispatch => {
        dispatch(DeleteMetricInStoreAction(metricId))
        return fetch(DeleteMetricAPI+metricId, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(json => 
                 dispatch(DeleteMetricInDbResultAction(json)))
    }
}