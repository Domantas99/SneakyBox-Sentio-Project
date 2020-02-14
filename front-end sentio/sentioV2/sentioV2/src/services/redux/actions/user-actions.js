export const LOGIN_USER = 'users:Login';

export function setUserId(id) {
    return {
        type: LOGIN_USER,
        payload: {
            userId: id
        }
    }
}