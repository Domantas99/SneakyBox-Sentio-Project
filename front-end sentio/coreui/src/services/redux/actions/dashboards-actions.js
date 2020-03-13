import { AddNewDashboardAPI } from '../../backend-urls';
export const REQUEST_DASHBOARDS = 'dashboards:request_dashboard';
export const RECEIVE_DASHBOARDS = 'dashboards:receive_dashboard';
export const DELETE_DASHBOARD = 'dashboards:delete_dashboard';
export const ADD_NEW_DASHBOARD = 'dashboards:add_new_dashboard';


export function AddNewDashboardAction(json) {
    debugger;
    return {
        type: ADD_NEW_DASHBOARD,
        json
    }
}

export  function  addDashboard(json){
    debugger
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

export function DeleteDashboard(dashboardId) {
    return {
        type: REQUEST_DASHBOARDS,
        dashboardId
    }
}

function RequestDashboards(userId) {
    return {
        type: REQUEST_DASHBOARDS,
        userId
    }
}

function ReceiveDashboards(json) {
    return {
        type: REQUEST_DASHBOARDS,
        result: json
    }
}

export function fetchDashboards(userId) {
    return dispatch => {
        dispatch(RequestDashboards(userId))
        return fetch('url' + userId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(ReceiveDashboards(json)))
    }
}

