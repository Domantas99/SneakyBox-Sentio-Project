import { AddNewDashboardAPI, GetUserDashboardsAPI } from '../../backend-urls';
export const REQUEST_DASHBOARDS = 'dashboards:request_dashboard';
export const RECEIVE_DASHBOARDS = 'dashboards:receive_dashboard';
export const DELETE_DASHBOARD = 'dashboards:delete_dashboard';
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
export function DeleteDashboard(dashboardId) {
    return {
        type: DELETE_DASHBOARD,
        dashboardId
    }
}

// Get dashboards
function RequestDashboards(userId) {
    debugger
    return {
        type: REQUEST_DASHBOARDS,
        userId
    }
}

function ReceiveDashboards(json) {
    debugger
    return {
        type: RECEIVE_DASHBOARDS,
        result: json
    }
}

export function fetchDashboards(userId) {
    debugger;
    return dispatch => {
        dispatch(RequestDashboards(userId))
        return fetch(GetUserDashboardsAPI + userId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(ReceiveDashboards(json)))
    }
}