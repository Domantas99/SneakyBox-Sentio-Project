import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import userReducer from '../reducers/user-reducer';
import databasesReducer from '../reducers/databases-reducers'; //'./services/redux/reducers/databases-reducer';
import dbTablesReducer from '../reducers/dbTables-reducers';
import queryDataReducer from '../reducers/queryData-reducer';
import tempPropertiesReducer from '../reducers/tempProperties-reducer';
import metricsReducer from '../reducers/metrics-reducer';
import tempPanelOptionsReducer from '../reducers/tempPanelOptions-reducer';
import panelsReducer from '../reducers/panels-reducer';

import thunk from 'redux-thunk';

const allReducers = combineReducers({
    user: userReducer,
    databases: databasesReducer,
    dbTables: dbTablesReducer,
    queryData: queryDataReducer,
    tempProperties: tempPropertiesReducer,
    tempPanelOptions: tempPanelOptionsReducer,
    metrics: metricsReducer,
    panels: panelsReducer
})

export const store = createStore(allReducers, {
    user: {firstName:'Lalal'},//{FirstName:"Domantas", id: "13244"},
    queryData: [ 5 , 4, 44],
    dbTables: {},
    databases: {},
    tempProperties: {},
    tempPanelOptions: {},
    metrics: {},
    panels: {}
},
    compose(applyMiddleware(thunk)),
    window.devToolsExtension && window.devToolsExtension()
);