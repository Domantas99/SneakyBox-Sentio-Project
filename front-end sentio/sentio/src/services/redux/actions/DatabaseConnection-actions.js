export const UPDATE_DB_CONNECTION = 'DbConnections:updateDbConn';

export function updateDbConnection(db) {
    debugger;
    return {
        type: UPDATE_DB_CONNECTION,
        payload: {
            ConnectionString: db.connStr,
            DatabaseType: db.type
        }
    }
}