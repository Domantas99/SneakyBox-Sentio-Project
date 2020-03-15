import { AddNewPanelAPI, PanelDeleteApi, AllPanelsAPI } from '../../backend-urls';
export const ADD_NEW_PANEL = 'panels:add_new_panel';
export const REQUEST_ALL_PANELS = 'panels:request_all_panels';
export const RECEIVE_ALL_PANELS = 'panels:receive_all_panels';
export const DELETE_PANEL_IN_STORE = 'panels:delete_panels_in_store';
export const DELETE_PANEL_IN_DB = 'panels:delete_panels_in_db';

// GET panels
function requestPanelsAction() {
    return {
        type: REQUEST_ALL_PANELS
    }
}

function receivePanelsAction(json) {
    return {
        type: RECEIVE_ALL_PANELS,
        result: json
    }
}

export function fetchAllPanels(userId) {
    return dispatch => {
        dispatch(requestPanelsAction())
        return fetch(AllPanelsAPI + userId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(receivePanelsAction(json)))
    }
}

// Add Panel
function AddNewPanelAction(json) {
    return {
        type: ADD_NEW_PANEL,
        json
    }
}

export function AddNewPanel(json) {
    return dispatch => {
        return fetch(AddNewPanelAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
            }).then(res => res.json())
                .then(jsonRes => dispatch(AddNewPanelAction(jsonRes)))
    }
}

// DELETE Panel
function DeletePanelInStore(panelId){
    return {
        type: DELETE_PANEL_IN_STORE,
        panelId
    }
}
function DeletePanelInDb(jsonResult){
    return {
        type: DELETE_PANEL_IN_DB,
        jsonResult
    }
}

export function DeletePanel(panelId) {
    return dispatch => {
        dispatch(DeletePanelInStore(panelId))
        return fetch(PanelDeleteApi + panelId, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(json =>
                 dispatch(DeletePanelInDb(json)))
    }
}