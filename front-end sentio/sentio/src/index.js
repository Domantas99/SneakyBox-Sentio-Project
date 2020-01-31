import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
//import rootReducer from './services/redux/reducers';
import { Provider } from 'react-redux';



function TablesReducer(state = [], action) {
    // switch(action.type) {
    //     case 'ADD': ret
    // }

    return state;
}

function ConnectionStringReducer(state='', action) {
    switch(action.type) {
        case 'updateUser': return action.payload;
    }
    
    // if(action.type===  'changeState') {
    //     return action.payload.newState;
    // }

    // console.log(action, 'cia action')
    return state;
}

const AllReducers = combineReducers({tables: TablesReducer, connectionString: ConnectionStringReducer});


const store = createStore(
    AllReducers, 
    {
    tables:[{ name: 'Studnets'}, {name:'Teachers'}],
    connectionString:'qwertyusda'
    },
    window.devToolsExtension && window.devToolsExtension()
    );

//https://www.youtube.com/watch?v=OSSpVLpuVWA
console.log(store.getState());

const updateConnStrAction = {
    type: 'updateUser',
    payload: {
        connectionString:'aaaaa'
    }
}

store.dispatch(updateConnStrAction);

//console.log(store.getState())
ReactDOM.render(
     <Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
