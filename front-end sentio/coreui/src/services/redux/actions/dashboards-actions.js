import { AddNewDashboardAPI, GetUserDashboardsAPI, DeleteDashboardAPI } from '../../backend-urls';
export const REQUEST_DASHBOARDS = 'dashboards:request_dashboard';
export const RECEIVE_DASHBOARDS = 'dashboards:receive_dashboard';
export const DELETE_DASHBOARD_IN_STORE = 'dashboards:delete_dashboard_in_store';
export const DELETE_DASHBOARD_IN_DATABASE = 'dashboards:delete_dashboard_in_database';
export const ADD_NEW_DASHBOARD = 'dashboards:add_new_dashboard';

// Add dashboard
export function AddNewDashboardAction(json) {
    return {
        type: ADD_NEW_DASHBOARD,
        json
    }
}

export  function  addDashboard(json){
    return dispatch => {
        return  fetch(AddNewDashboardAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
            }).then(res => res.json())
                .then(jsonRes => dispatch(AddNewDashboardAction(jsonRes)))
    }
}

// Delete dashboard
function DeleteDashboardInStore(dashboardId) {
    debugger;
    return {
        type: DELETE_DASHBOARD_IN_STORE,
        dashboardId
    }
}
function DeleteDashboardInDatabase(dashboardId, json) {
    debugger
    return {
        type: DELETE_DASHBOARD_IN_DATABASE,
        dashboardId, 
        json
    }
}

export function deleteDashboard(dashboardId) {
    debugger;
    return dispatch => {
        dispatch(DeleteDashboardInStore(dashboardId))
        debugger;
        return fetch(DeleteDashboardAPI + dashboardId, {
            method: 'DELETE'
        }).then((response) => response.json())
            .then(json => dispatch(DeleteDashboardInDatabase(dashboardId, json)))
    }
}

// Get dashboards
function RequestDashboards(userId) {
    return {
        type: REQUEST_DASHBOARDS,
        userId
    }
}

function ReceiveDashboards(json) {
    return {
        type: RECEIVE_DASHBOARDS,
        result: json
    }
}

export function fetchDashboards(userId) {
    return dispatch => {
        dispatch(RequestDashboards(userId))
        return fetch(GetUserDashboardsAPI + userId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(ReceiveDashboards(json)))
    }
}