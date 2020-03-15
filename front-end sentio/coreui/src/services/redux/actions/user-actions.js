
import {UserLogin} from '../../backend-urls';
export const REQUEST_VALIDATION_RESULT = 'user:request_Validation_Result';
export const RECEIVE_VALIDATION_RESULT = 'user:receive_Validation_Result';

// User validation
function requestValidationResult(userCredentials) {
    return {
        type: REQUEST_VALIDATION_RESULT,
        userCredentials
    }
}

function receiveValidationResult(userCredentials, json) {
    console.log(json, 'cia tas json');  
    return {
        type: RECEIVE_VALIDATION_RESULT,
        userCredentials,
        validationResult: json,
        receivedAt: Date.now()
    }
}

export function fetchUser(userCredentials) {
    return dispatch => {
        dispatch(requestValidationResult(userCredentials))
        return fetch(UserLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userCredentials
        }).then(response => response.json())
            .then(json => dispatch(receiveValidationResult(userCredentials, json)))
    }
}
