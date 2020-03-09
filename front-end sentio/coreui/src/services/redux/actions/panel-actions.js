import { AddNewMetricAPI, DatabaseMetricsAPI, DeleteMetricAPI } from '../../backend-urls';
export const ADD_NEW_METRIC = 'metrics:add_new_metric';
export const REQUEST_DB_METRICS = 'metrics:request_db_metrics';
export const RECEIVE_DB_METRICS = 'metrics:receive_db_metrics';
export const DELETE_METRIC_IN_STORE = 'metrics:delete_in_store';
export const DELETE_METRIC_IN_DB = 'metrics:delete_in_database';

// GET metrics
function requestPanelAction(databaseId) {
    debugger;
    return {
        type: REQUEST_DB_METRICS,
        databaseId
    }
}

function receivePanelsAction(databaseId, json) {
    return {
        type: RECEIVE_DB_METRICS,
        databaseId,
        result: json
    }
}

export function fetchDbPanels(databaseId) {
    return dispatch => {
        dispatch(requestPanelAction(databaseId))
        return fetch(DatabaseMetricsAPI + databaseId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(receivePanelsAction(databaseId, json)))
    }
}

// POST metric
function AddNewMetricAction(json) {
    return {
        type: ADD_NEW_METRIC,
        json
    }
}

export function AddNewPanel(json) {
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

// DELETE metric
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
    debugger;
    return dispatch => {
        // issisaugoti metric ir jei is api gautas ats kad nesitryne, prideti atgal
        dispatch(DeleteMetricInStoreAction(metricId))
        //dispatch(DeleteMetricInDBAction(metricId))
        return fetch(DeleteMetricAPI+metricId, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(json => // if response blogas
                 dispatch(DeleteMetricInDbResultAction(json)))
    }
}