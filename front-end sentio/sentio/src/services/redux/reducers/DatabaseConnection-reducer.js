import { UPDATE_DB_CONNECTION } from '../actions/DatabaseConnection-actions';

export default function DbConnectionReducer(state='', { type, payload }) {
    switch(type) {
        case UPDATE_DB_CONNECTION: return payload;//payload.ConnectionString && payload.DatabaseType;
        default:
            return state;
    }
}