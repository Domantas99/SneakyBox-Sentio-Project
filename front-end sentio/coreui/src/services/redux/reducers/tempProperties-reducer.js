import {RESET_TEMP_PROPERTIES, 
        SET_ALL_OPTIONS, 
        HANDLE_CHECKBOX_CHANGE, 
        HANDLE_SELECTED_OPTION_CHANGE,
        HANDLE_FILTER_CHANGE, 
        SET_TABLE_ID } from '../actions/tempProperties-actions';

function tempProperties(state={tableId: '', options: []}, action) {
    switch(action.type) {
        case RESET_TEMP_PROPERTIES:
            return Object.assign({}, state, {
                tableId:'',
                options:[]
            });    
        case SET_ALL_OPTIONS:
            let tempOpt=[];
            action.options.forEach(o => {
                tempOpt.push({ include: false, property: o, filterOption: 'No Option', filter: 'No filter' })
            })
            return Object.assign({}, state, {
                tableId: action.tableId,
                options: tempOpt
            }); 
        case HANDLE_CHECKBOX_CHANGE: {
            const index =  state.options.findIndex(val => val.property === action.property);
            if(index < 0) {
                return Object.assign({}, state, {
                    ...state,
                    options: [...state.options, { include: true, property: action.property, filterOption: 'No Option', filter: 'No filter' }]
                })
            } else {
                let arr  = state.options;
                arr[index].include = !arr[index].include;
                return Object.assign({}, state, {
                    ...state,
                    options: arr
                })
            }
            }
        case HANDLE_SELECTED_OPTION_CHANGE: {
            const index = state.options.findIndex(val => val.property === action.property);
            if(index < 0) {
                return Object.assign({}, state, {
                    ...state,
                    options: [...state.options, { include: false, property: action.property, filterOption: action.value, filter: 'No filter' }]
                })
            } else {
                let arr  = state.options;
                arr[index].filterOption = action.value;
                return Object.assign({}, state, {
                    ...state,
                    options: arr
                })
            }
            }
        case HANDLE_FILTER_CHANGE: {
            const index = state.options.findIndex(val => val.property === action.property);
            if(index < 0) {
                return Object.assign({}, state, {
                    ...state,
                    options: [...state.options, { include: false, property: action.property, filterOption: 'No Option', filter: action.value }]
            })
            } else {
                let arr  = state.options;
                arr[index].filter = action.value;
                return Object.assign({}, state, {
                    ...state,
                    options: arr
                })
            }
        }
        case SET_TABLE_ID:
            return Object.assign({}, state, { ...state, tableId: action.tableId})
            
        default:
            return state;
    }
}

export default function tempPropertiesReducer(state={tableId: '', options: []}, action) {
    switch(action.type) {
        case RESET_TEMP_PROPERTIES:
            return tempProperties(state, action);    
        case SET_ALL_OPTIONS:
            return tempProperties(state, action); 
        case HANDLE_CHECKBOX_CHANGE:
            return tempProperties(state, action); 
        case HANDLE_SELECTED_OPTION_CHANGE:
            return tempProperties(state, action); 
        case HANDLE_FILTER_CHANGE:
            return tempProperties(state, action); 
        case SET_TABLE_ID:
            return tempProperties(state, action); 
        default:
            return state;
    }
}