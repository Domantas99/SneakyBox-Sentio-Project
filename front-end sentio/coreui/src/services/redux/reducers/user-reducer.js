import { RECEIVE_VALIDATION_RESULT, REQUEST_VALIDATION_RESULT } from '../actions/user-actions';

function user(state = { isFetching: false,
                        didInvalidate: false,
                        user: ''},
                        action){
    debugger;
     
    switch (action.type) {
        case REQUEST_VALIDATION_RESULT:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_VALIDATION_RESULT:
            debugger
            let user;
            let didInv;
            if(!action.validationResult.isValid) {
               didInv = true;
                user = null;
            } else {
                didInv=false;    
                user = action.validationResult.user
            }
            const obj = { 
                status:{
                    isFetching: false, 
                    didInvalidate: didInv}, 
                    ...user 
                }
            return obj
        default: 
            return state     
    }
}


export default function userReducer(state ='', action) {
    switch(action.type) {
        case REQUEST_VALIDATION_RESULT:
            return Object.assign({}, state, {
                [action.userCrediantials]: user(state, action)
            })
        case RECEIVE_VALIDATION_RESULT:   
            return user(state,action)    
        default:
            return state;
    }
}