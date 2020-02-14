import { LOGIN_USER } from '../actions/user-actions';

export default function UserDataReducer(state='', { type, payload }) {
    switch(type) {
        case LOGIN_USER: return payload;
        default:
            return state;
    }
}