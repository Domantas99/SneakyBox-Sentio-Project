using Sentio.DTO;
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
        private SqlConnection Connection { get; set; }
        

        public MSSQLDatabaseProvider(DatabaseConnection data) {
            SqlConnection connection = new SqlConnection(data.ConnectionString);
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }

        }
        public MSSQLDatabaseProvider() { }

        public IEnumerable<TableModel> GetAllTablesData()
        {
            string query = $"SELECT c.TABLE_NAME, c.COLUMN_NAME, c.DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS c;";

            Dictionary<string, TableModel> dict = new Dictionary<string, TableModel>();
            List<TableModel> list = new List<TableModel>();
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
                prop = new TableProperty { 
                    CollumnName = collumnName, 
                    CollumnType = collumnType 
                };
                if (dict.ContainsKey(tableName))
                {
                    dict[tableName].Properties.Add(prop);
                }
                else {
                    tableModel = new TableModel(tableName);                                 
                    tableModel.AddProperty(prop);
                    dict.Add(tableName, tableModel);
                }

            }
            reader.Close();

            foreach (KeyValuePair<string, TableModel> entry in dict)
            {
                list.Add(entry.Value);
            }


            return list;
        }


        public IEnumerable<TableProperty> GetAllTableProperties(string tableName)
        {
            string query = $"SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{tableName}' ORDER BY ORDINAL_POSITION;";
            List<TableProperty> list = new List<TableProperty>();
            TableProperty props;
           
            SqlCommand command = new SqlCommand(query, Connection);
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read()) {
                props = new TableProperty { 
                    CollumnName = reader[0].ToString(), 
                    CollumnType = reader[1].ToString() 
                };
                list.Add(props);
            }
            reader.Close();

            return list;
        }

        public IEnumerable<string> GetAllTables(DatabaseConnection data)
        {           
            string query = "SELECT NAME FROM sys.tables;";
            string tableName;
            List<string> list = new List<string>();

            SqlCommand command = new SqlCommand(query, Connection);
            SqlDataReader reader = command.ExecuteReader();    
            
            while (reader.Read()) {
                tableName = reader[0].ToString();
                list.Add(tableName);
            }
            reader.Close();

            return list;       
        }

        public ConnectionValidationResult Validate(DatabaseConnection data)
        {
            try 
            {
                Connection = new SqlConnection(data.ConnectionString);
                if (Connection.State != ConnectionState.Open)
                {
                    Connection.Open();
                }
                return new ConnectionValidationResult { IsValid = true, Message = "Success", ConnectionString=data.ConnectionString };
            } 
            catch (Exception e) 
            {
                return new ConnectionValidationResult { IsValid = false, Message = "Error: " + e.Message, ConnectionString = data.ConnectionString };
            }
        }

   
    }
}
