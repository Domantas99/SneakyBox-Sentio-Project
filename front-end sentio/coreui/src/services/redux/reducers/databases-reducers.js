import { REQUEST_DATABASE_BY_UID_RESULT, RECEIVE_DATABASE_BY_UID_RESULT, DELETE_DATABASE, ADD_NEW_DATABASE } from '../actions/databases-actions';

function databases(state = { isFetching: false, user: '',databases:[]}, action,) { 
    switch (action.type) {
        case REQUEST_DATABASE_BY_UID_RESULT:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_DATABASE_BY_UID_RESULT:
            const result = action.db_By_Uid_Result
            if(result.isValid) {   
                return Object.assign({}, state, {
                    isFetching: false,
                    databases: result.databases
                })
            }
            break;
        case DELETE_DATABASE: 
            if(action.json.isValid === true) { 
                const deletedDb = action.json.returnResult
                const filteredState= state.databases.filter(db => db.id !== deletedDb.id)
                return  Object.assign({}, state, {
                    isFetching: false,
                    databases: filteredState
                })
            }
            break;
        case ADD_NEW_DATABASE:
            if(action.json.isValid === true) {
                const newDB = action.json.returnResult
                const temp = state.databases
                temp.push(newDB)
                return Object.assign({}, state, {
                    isFetching: false,
                    databases: temp
                })
            }    
            break;
        default: 
            return state     
    }
}

export default function DatabasesReducer(state ='', action) {
    switch(action.type) {
        case REQUEST_DATABASE_BY_UID_RESULT:
            return Object.assign({}, state, {
                [action.userCrediantials]: databases(state, action)
            })
        case RECEIVE_DATABASE_BY_UID_RESULT:   
            return databases(state,action)    
        case DELETE_DATABASE:
            return databases(state, action)
        case ADD_NEW_DATABASE:
            return databases(state, action)
        default:
            return state;
    }
}