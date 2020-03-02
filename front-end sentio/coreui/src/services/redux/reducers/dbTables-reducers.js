import { REQUEST_DATABASE_TABLES, RECEIVE_DATABASE_TABLES } from '../actions/dbTables-actions';

function dbTables(state = { isFetching: false, dbTables:[]}, action,) { 
    
    debugger;
    switch (action.type) {
        case REQUEST_DATABASE_TABLES:
            debugger
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_DATABASE_TABLES:
            debugger
            const result = action.tablesResult
            if(result.isValid) {   
                return Object.assign({}, state, {
                    isFetching: false,
                    // [databases ..result.databases]
                    Tables: result.tableModels
                })
            }
            break;         
        default: 
            return state     
    }
}

export default function dbTablesReducer(state ='', action) {
    debugger;
    switch(action.type) {
        case REQUEST_DATABASE_TABLES:
            return Object.assign({}, state, {
                [action.userCrediantials]: dbTables(state, action)
            })
        case RECEIVE_DATABASE_TABLES:   
            return dbTables(state,action)    
        default:
            return state;
    }
}