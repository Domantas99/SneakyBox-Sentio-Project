export const LOGIN_USER = 'users:Login';

export function updateDbConnection(id) {
    return {
        type: LOGIN_USER,
        payload: {
            userId: id
        }
    }
}