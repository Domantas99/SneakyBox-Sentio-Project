export const UPDATE_DB_CONNECTION = 'DbConnections:updateDbConn';

export function updateDbConnection(db) {
    return {
        type: UPDATE_DB_CONNECTION,
        payload: {
            DatabaseId: db.DatabaseId,
            DatabaseType: db.type
        }
    }
}