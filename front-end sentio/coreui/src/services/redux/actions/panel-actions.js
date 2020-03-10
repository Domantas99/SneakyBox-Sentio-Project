import { AddNewMetricAPI, pane, DeleteMetricAPI, AllPanelsAPI } from '../../backend-urls';
export const ADD_NEW_PANEL = 'panels:add_new_panel';
export const REQUEST_DB_PANELS = 'panels:request_db_panels';
export const RECEIVE_DB_PANELS = 'panels:receive_db_panels';
export const FILTER_DB_PANELS = 'panels:filter_db_panels';
export const REQUEST_ALL_PANELS = 'panels:request_all_panels';
export const RECEIVE_ALL_PANELS = 'panels:receive_all_panels';
export const DELETE_PANEL = 'panels:delete_panels';


// GET panels
function requestPanelsAction() {
    debugger;
    return {
        type: REQUEST_ALL_PANELS
    }
}

function receivePanelsAction(json) {
    debugger;
    return {
        type: RECEIVE_ALL_PANELS,
        result: json
    }
}

export function fetchAllPanels(userId) {
    debugger;
    return dispatch => {
        dispatch(requestPanelsAction())
        return fetch(AllPanelsAPI + userId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(receivePanelsAction(json)))
    }
}

// // POST Panel
// function AddNewPanelAction(json) {
//     return {
//         type: ADD_NEW_METRIC,
//         json
//     }
// }

// export function AddNewPanel(json) {
//     debugger
//     return dispatch => {
//         return fetch(AddNewMetricAPI, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: json
//             }).then(res => res.json())
//                 .then(jsonRes => dispatch(AddNewPanelAction(jsonRes)))
//     }
// }

// // DELETE metric
// function DeleteMetricInStoreAction(metricId){
//     return {
//         type: DELETE_METRIC_IN_STORE,
//         metricId
//     }
// }
// function DeleteMetricInDbResultAction(jsonResult){
//     return {
//         type: DELETE_METRIC_IN_DB,
//         jsonResult
//     }
// }

// export function DeleteMetric(metricId) {
//     debugger;
//     return dispatch => {
//         // issisaugoti metric ir jei is api gautas ats kad nesitryne, prideti atgal
//         dispatch(DeleteMetricInStoreAction(metricId))
//         //dispatch(DeleteMetricInDBAction(metricId))
//         return fetch(DeleteMetricAPI+metricId, {
//             method: 'DELETE'
//         }).then(res => res.json())
//             .then(json => // if response blogas
//                  dispatch(DeleteMetricInDbResultAction(json)))
//     }
// }