export const tempUserID= "72c50eeb-bb66-47fa-ae1d-63eacbeb74fe";    // later implement redux
export const tempDatabaseId = "a5662e5a-b048-4618-b1dd-f188d5fff625";

export const RootApiUrl = "https://localhost:44351/api";                    // Root Url

// User 
export const UserLogin = `${RootApiUrl}/user/login`;                        //

// Databases
export const DatabaseValidationAPI = `${RootApiUrl}/Databases/validate`;    // 
export const UserDatabasesAPI = `${RootApiUrl}/Databases/`;                 // + UserId
export const DatabaseDeleteAPI = `${RootApiUrl}/Databases/delete/`;         // + DatabaseId
export const AddNewDatabaseAPI = `${RootApiUrl}/Databases/validate`;        //

// Tables
export const DatabaseTablesAPI = `${RootApiUrl}/Databasetables/`;           // + DatabaseId

// Metrics
export const AddNewMetricAPI = `${RootApiUrl}/Query/CreateNewQuery`;        //
export const DatabaseMetricsAPI = `${RootApiUrl}/Query/`;     // + DatabaseId