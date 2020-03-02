import { AddNewMetricAPI } from '../../backend-urls';
export const ADD_NEW_METRIC = 'metrics:add_new_metric';

function AddNewMetricAction(json) {
    return {
        type: ADD_NEW_METRIC,
        json
    }
}

export function AddNewMetric(json) {
    debugger
    return dispatch => {
        return fetch(AddNewMetricAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
            }).then(res => res.json())
                .then(jsonRes => dispatch(AddNewMetricAction(jsonRes)))
    }
}