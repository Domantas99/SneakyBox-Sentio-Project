import {RECEIVE_DASHBOARDS,REQUEST_DASHBOARDS, ADD_NEW_DASHBOARD, DELETE_DASHBOARD} from '../actions/dashboards-actions';
import { AddNewDashboardAPI } from '../../backend-urls';

function dashboards(state = { isFetching: false, error: false, user: '',databases:[]}, action,) { 
    switch (action.type) {
        case REQUEST_DASHBOARDS:
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            })// replacing su dashboards
        case RECEIVE_DASHBOARDS:
            const result = action.db_By_Uid_Result
            if(result.isValid) {   
                return Object.assign({}, state, {
                    isFetching: false,
                    databases: result.databases
                })
            }
            break;
        case DELETE_DASHBOARD: 
            if(action.json.isValid === true) { 
                const deletedDb = action.json.returnResult
                const filteredState= state.databases.filter(db => db.id !== deletedDb.id)
                return  Object.assign({}, state, {
                    isFetching: false,
                    databases: filteredState
                })
            }
            break;
        case ADD_NEW_DASHBOARD:
            debugger;
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

export default function dashboardsReducer(state ='', action) {
    debugger;
    switch(action.type) {
        case REQUEST_DASHBOARDS:
            return  dashboards(state, action)
        case RECEIVE_DASHBOARDS:   
            return dashboards(state,action)    
        case DELETE_DASHBOARD:
            return dashboards(state, action)
        case ADD_NEW_DASHBOARD:
            return dashboards(state, action)
        default:
            return state;
    }
}