import { UPDATE_DASHBOARD_IN_STORE, UPDATE_DASHBOARD_IN_DATABASE, RECEIVE_DASHBOARDS,REQUEST_DASHBOARDS, ADD_NEW_DASHBOARD, DELETE_DASHBOARD_IN_STORE, DELETE_DASHBOARD_IN_DATABASE} from '../actions/dashboards-actions';
import { object } from 'prop-types';

function dashboards(state = { isFetching: false, error: false, user: '',dashboards:[]}, action,) { 
    switch (action.type) {
        case UPDATE_DASHBOARD_IN_STORE:
            const dbToReplace = state.dashboards.find(d => d.id === action.dashboard.id)
            const index = state.dashboards.indexOf(dbToReplace);      
            if(index >= 0 ) {
                let arr = state.dashboards;
                arr[index] = action.dashboard;
                return Object.assign({}, state, {
                    dashboards: arr,
                    error: false,
                    isFetching: true
                })
            }
            return Object.assign({}, state, {
                message: "dashboard not found",
                error: true,
                isFetching: true
            })
            
        case UPDATE_DASHBOARD_IN_DATABASE:
            if (action.json.isValid) {
                return Object.assign({}, state, {
                    message: "dashboard update",
                    error: false,
                    isFetching: false
                })
            }   
            return Object.assign({}, state, {
                message: action.json.message,
                error: true,
                isFetching: false
            })
        case REQUEST_DASHBOARDS:
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            })
        case RECEIVE_DASHBOARDS:
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
        case DELETE_DASHBOARD_IN_STORE: 
            const filteredDashboards = state.dashboards.filter(x => x.id !== action.dashboardId);
            return Object.assign({}, state, { 
                isFetching:true, 
                error:false, 
                message: "Dashboard is deleted in store and request to server is sent",
                dashboards: filteredDashboards
            });
        case DELETE_DASHBOARD_IN_DATABASE: 
            const res = action.json;
            if(res.isValid) {
                return Object.assign({}, state, { 
                    isFetching:false, 
                    error:false, 
                    message: "Dashboard is deleted in database succesfully",
                });
            }
            else {
                return Object.assign({}, state, { 
                    isFetching:false, 
                    error:true, 
                    message: "There was an error deleting dashboard in database",
                });
            }
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
    switch(action.type) {
        case UPDATE_DASHBOARD_IN_STORE:
            return  dashboards(state, action)
        case UPDATE_DASHBOARD_IN_DATABASE:   
            return dashboards(state,action)    
        case REQUEST_DASHBOARDS:
            return  dashboards(state, action)
        case RECEIVE_DASHBOARDS:   
            return dashboards(state,action)    
        case DELETE_DASHBOARD_IN_STORE:
            return dashboards(state, action)
        case DELETE_DASHBOARD_IN_DATABASE:
            return dashboards(state, action)
        case ADD_NEW_DASHBOARD:
            return dashboards(state, action)
        default:
            return state;
    }
}