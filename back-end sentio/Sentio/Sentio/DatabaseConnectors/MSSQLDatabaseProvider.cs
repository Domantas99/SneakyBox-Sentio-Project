using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.DatabaseConnectors
{
    public class MSSQLDatabaseProvider : IDatabaseProvider
    {
        public SqlConnection ConnectToDataBase(DatabaseConnection data) {
            SqlConnection connection = new SqlConnection(data.ConnectionString);
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            return connection;
        }
        
        public DatabaseViewModel GetDatabaseData(DatabaseConnection data) { 
            SqlConnection connection = ConnectToDataBase(data);
            string query = "SELECT DB_NAME() AS [Current Database];";

            SqlCommand command = new SqlCommand(query, connection);
            SqlDataReader reader = command.ExecuteReader();
            reader.Read();
            string dbName = reader[0].ToString();
  
            DatabaseViewModel db = new DatabaseViewModel { DatabaseName = dbName, 
                                                           DatabaseType = data.DatabaseType,
                                                           ConnectionString = data.ConnectionString };

            return db;
        }

        public ICollection<TableModel> GetAllTablesData(DatabaseConnection data)
        { // AllTableResult
            try
            {
                SqlConnection Connection = ConnectToDataBase(data);

                string query = $"SELECT c.TABLE_NAME, c.COLUMN_NAME, c.DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS c;";

                Dictionary<string, TableModel> tableDictionary = new Dictionary<string, TableModel>();
                List<TableModel> tableList = new List<TableModel>();
                TableModel tableModel;

                SqlCommand command = new SqlCommand(query, Connection);
                SqlDataReader reader = command.ExecuteReader();
                
                string tableName;
                string collumnName;
                string collumnType;
                TableProperty prop;
                while (reader.Read())
                {
                    tableName = reader[0].ToString();
                    collumnName = reader[1].ToString();
                    collumnType = reader[2].ToString();
                    prop = new TableProperty
                    {
                        CollumnName = collumnName,
                        CollumnType = collumnType
                    };
                    if (tableDictionary.ContainsKey(tableName))
                    {
                        tableDictionary[tableName].Properties.Add(prop);
                    }
                    else
                    {
                        tableModel = new TableModel(tableName);
                        tableModel.AddProperty(prop);
                        tableDictionary.Add(tableName, tableModel);
                    }
                }
                reader.Close();

                foreach (KeyValuePair<string, TableModel> entry in tableDictionary)
                {
                    tableList.Add(entry.Value);
                }

                return tableList;
            }
            catch (Exception e) {
                throw e;
            }
        }

        public IEnumerable<TableProperty> GetAllTableProperties(DatabaseConnection data, string tableName)
        {
            try
            {
                SqlConnection Connection = ConnectToDataBase(data);

                string query = $"SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{tableName}' ORDER BY ORDINAL_POSITION;";
                List<TableProperty> list = new List<TableProperty>();
                TableProperty props;

                SqlCommand command = new SqlCommand(query, Connection);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    props = new TableProperty
                    {
                        CollumnName = reader[0].ToString(),
                        CollumnType = reader[1].ToString()
                    };
                    list.Add(props);
                }
                reader.Close();

                return list;
            }
            catch (Exception e) {
                return null;
            }
        }

        public IEnumerable<string> GetAllTables(DatabaseConnection data)
        {
            try
            {
                SqlConnection Connection = ConnectToDataBase(data);

                string query = "SELECT NAME FROM sys.tables;";
                string tableName;
                List<string> list = new List<string>();

                SqlCommand command = new SqlCommand(query, Connection);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    tableName = reader[0].ToString();
                    list.Add(tableName);
                }
                reader.Close();

                return list;
            }
            catch (Exception e) {
                 return null;
            }
        }

        public ConnectionValidationResult Validate(DatabaseConnection data)
        {
            try 
            {
                SqlConnection Connection = ConnectToDataBase(data);
                
                return new ConnectionValidationResult { IsValid = true, Message = "Success", ConnectionString = data.ConnectionString  };
            } 
            catch (Exception e) 
            {
                return new ConnectionValidationResult { IsValid = false, Message = "Error: " + e.Message, ConnectionString = data.ConnectionString };
            }
        }
    }
}
