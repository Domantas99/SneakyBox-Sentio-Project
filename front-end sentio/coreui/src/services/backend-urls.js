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
export const AllMetricsAPI = `${RootApiUrl}/Query/getAll/`;                 // + userId
export const DatabaseMetricsAPI = `${RootApiUrl}/Query/`;                   // + DatabaseId
export const DeleteMetricAPI = `${RootApiUrl}/Query/delete/`;               // + QueryId

// Panels
export const AddNewPanelAPI = `${RootApiUrl}/Panel/Add`;                    // POST         
export const AllPanelsAPI = `${RootApiUrl}/Panel/all-panels/`;              // + userId            
export const DatabasePanelsApi = `${RootApiUrl}/Panel/db-panels/`;          // + dbid            
export const PanelDeleteApi = `${RootApiUrl}/Panel/delete/`;                // + panelId


// Dashboard
export const AddNewDashboardAPI = `${RootApiUrl}/Dashboards/Add`;           // Post
export const GetUserDashboardsAPI = `${RootApiUrl}/Dashboards/all/`;        // + userId
export const DeleteDashboardAPI = `${RootApiUrl}/Dashboards/delete/`;       // + dashboardId
export const UpdateDashboardAPI = `${RootApiUrl}/Dashboards/update`;        // PUT + jsonObj
