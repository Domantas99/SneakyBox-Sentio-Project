import { LOGIN_USER } from '../actions/User-actions';

export default function UserReducer(state='', { type, payload }) {
    switch(type) {
        case LOGIN_USER: return payload;
        default:
            return state;
    }
}