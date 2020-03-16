import {RECEIVE_DASHBOARDS,REQUEST_DASHBOARDS, ADD_NEW_DASHBOARD, DELETE_DASHBOARD} from '../actions/dashboards-actions';
import { AddNewDashboardAPI } from '../../backend-urls';
import { object } from 'prop-types';

function dashboards(state = { isFetching: false, error: false, user: '',databases:[]}, action,) { 
    debugger;
    switch (action.type) {
        case REQUEST_DASHBOARDS:
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            })
        case RECEIVE_DASHBOARDS:
            debugger
            if(action.result.isValid) {   
                return Object.assign({}, state, {
                    isFetching: false,
                    dashboards: action.result.returnResult
                })
            }
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                dashboards: []
            })
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
            if(action.json.isValid) {
                return  Object.assign({}, state, {
                    error: false,
                    message: "Dashboard added successfully"
                })
            }
             return Object.assign({}, state, {
                error: true,
                message: "There was an error adding dashboard"
            })             
            
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