import { UserDatabasesAPI, DatabaseDeleteAPI ,tempUserID, AddNewDatabaseAPI } from '../../backend-urls';
export const REQUEST_DATABASE_BY_UID_RESULT = 'databases:request_Db_By_Uid_Result';
export const RECEIVE_DATABASE_BY_UID_RESULT = 'databases:receive_Db_By_Uid_Result';
export const DELETE_DATABASE = 'databases:delete_database_by_dbId';
export const ADD_NEW_DATABASE = 'databases:add_new_database';


function requestDatabasesByUserIdResult(userId) {   
    return {
        type: REQUEST_DATABASE_BY_UID_RESULT,
        userId
    }
}

function receiveDatabasesByUserIdResult(userId, json) { 
    //console.log(json, 'cia db tas json');  
    return {
        type: RECEIVE_DATABASE_BY_UID_RESULT,
        userId,
        db_By_Uid_Result: json,
        receivedAt: Date.now()
    }
}



export function fetchUserDatabases(userId) {
    return dispatch => {
        dispatch(requestDatabasesByUserIdResult(userId))
        return fetch(UserDatabasesAPI + userId, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => dispatch(receiveDatabasesByUserIdResult(userId, json)))
    }
}


export function deleteDatabase(dbId) {
    return dispatch => {
        return fetch(DatabaseDeleteAPI + dbId, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(json => dispatch(deleteDBAction(json)))
    }
}

function deleteDBAction(json) {
    return {
        type: DELETE_DATABASE,
        json
    }
} 

function AddNewDBAction(json) {
    return {
        type: ADD_NEW_DATABASE,
        json
    }
}

export function AddNewDatabaseToDB(json) {
    debugger
    return dispatch => {
        return fetch(AddNewDatabaseAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
            }).then(res => res.json())
                .then(jsonRes => dispatch(AddNewDBAction(jsonRes)))
    }
}