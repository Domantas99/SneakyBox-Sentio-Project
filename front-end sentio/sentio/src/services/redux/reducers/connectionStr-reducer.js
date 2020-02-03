import { UPDATE_CONNECTION_STRING } from '../actions/connectionStr-actions';

export default function ConnectionStringReducer(state='', { type, payload }) {
    switch(type) {
        case UPDATE_CONNECTION_STRING: return payload.connectionStr;
        default:
            return state;
    }
}