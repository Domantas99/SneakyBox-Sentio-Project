import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
//import rootReducer from './services/redux/reducers';
import { Provider } from 'react-redux';
import DbConnectionReducer from './services/redux/reducers/DatabaseConnection-reducer';
import TablesReducer from './services/redux/reducers/tables-reducer';




const AllReducers = combineReducers({tables: TablesReducer, DbConnection: DbConnectionReducer});


export const store = createStore(
    AllReducers, 
    {
    tables:[{ name: 'Studnets'}, {name:'Teachers'}],
    DbConnection: { ConnectionString:'Server=tcp:e-learning-tasks.database.windows.net,1433;Initial Catalog=e-learning-dev;Persist Security Info=False;User ID=e-learning;Password=2k0uU9CQcq%P5R%G@k7^R476FE6;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;', DatabaseType: 'MSSQL'}
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
