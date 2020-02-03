export const UPDATE_CONNECTION_STRING = 'connectionStr:updateConnStr';

export function updateConnectionStr(newStr) {
    return {
        type: UPDATE_CONNECTION_STRING,
        payload: {
            connectionStr: newStr
        }
    }

}