import { DatabaseTablesAPI } from '../../backend-urls';
export const REQUEST_DATABASE_TABLES = 'databases:request_Db_Tables';
export const RECEIVE_DATABASE_TABLES = 'databases:receive_Db_Tables';
//export const DELETE_DATABASE = 'databases:delete_database_by_dbId';
//export const ADD_NEW_DATABASE = 'databases:add_new_database';


function requestDbTablesAction(dbId) {
    debugger
    return {
        type: REQUEST_DATABASE_TABLES,
        dbId
    }
}

function receiveDbTablesAction(dbId, json) {
    debugger;
    console.log(json, 'cia tas table json');  
    return {
        type: RECEIVE_DATABASE_TABLES,
        dbId,
        tablesResult: json,
        receivedAt: Date.now()
    }
}



export function fetchTables(dbId) {
    debugger;
    return dispatch => {
        dispatch(requestDbTablesAction(dbId))
        return fetch(DatabaseTablesAPI + dbId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(receiveDbTablesAction(dbId, json)))
    }
}