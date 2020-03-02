export const tempUserID= "72c50eeb-bb66-47fa-ae1d-63eacbeb74fe";    // later implement redux
export const tempDatabaseId = "a5662e5a-b048-4618-b1dd-f188d5fff625";

export const RootApiUrl = "https://localhost:44351/api";

export const DatabaseValidationAPI = `${RootApiUrl}/Databases/validate` // POST

export const UserDatabasesAPI = `${RootApiUrl}/Databases/`;// + userId


export const UserLogin = `${RootApiUrl}/user/login`;

export const DatabaseDeleteAPI = `${RootApiUrl}/Databases/delete/` // + db id

export const AddNewDatabaseAPI = `${RootApiUrl}/Databases/validate`;

export const DatabaseTablesAPI = `${RootApiUrl}/Databasetables/`; // + dbId 6c4b4806-0a26-48a0-ab66-14cd8a2af622


export const AddNewMetricAPI = `${RootApiUrl}/Query/CreateNewQuery`;