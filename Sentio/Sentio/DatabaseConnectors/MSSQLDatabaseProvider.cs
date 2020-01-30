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
        public IEnumerable<TableProperty> GetAllTableProperties(string tableName)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetAllTables()
        {
            throw new NotImplementedException();
        }

        public ConnectionValidationResult Validate(DatabaseConnection data)
        {
            try 
            {
                SqlConnection connection = new SqlConnection(data.ConnectionString);
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }
                return new ConnectionValidationResult { IsValid = true, Message = "Success" };
            } 
            catch (Exception e) 
            {
                return new ConnectionValidationResult { IsValid = false, Message = e.Message };
            }
        }
    }
}
