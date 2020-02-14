import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
//import rootReducer from './services/redux/reducers';
import { Provider } from 'react-redux';
import DbConnectionReducer from './services/redux/reducers/DatabaseConnection-reducer';
import CreatedOptionsReducer from './services/redux/reducers/CreatedOptions-reducer';




const AllReducers = combineReducers({CreatedOptions: CreatedOptionsReducer, DbConnection: DbConnectionReducer});
// Store - object that holds the applications state data
// Reducer - a function that return new state data(triggered by an action type)
// actions yra funkcijos per kuriuos perduodami duomenys

export const store = createStore(
    AllReducers, 
    {
    CreatedOptions:[
        { TableName: "Badges", options: ["Rows count"] }
    
    ],
    DbConnection: { DatabaseId: '86bc6815-6c32-4418-ba97-a94cc4a1dc51', DatabaseType: 'MSSQL'}
    },
    //window.devToolsExtension && window.devToolsExtension()
    );
console.log(store.getState(), 'cia store');


//console.log(store.getState())
ReactDOM.render(
     <Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
