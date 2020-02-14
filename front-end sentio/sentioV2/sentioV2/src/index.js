//import 'react-app-polyfill/ie9'; // For IE 9-11 support
//import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import  UserDataReducer  from './services/redux/reducers/user-reducer';
import { Provider } from 'react-redux';

const allReducers = combineReducers({UserData: UserDataReducer});
export const store = createStore(
    allReducers, {
    UserData: {FirstName:'', LastName:'', Email: '', Id:''}
    }
);
console.log(store.getState(), 'cia store');

ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
