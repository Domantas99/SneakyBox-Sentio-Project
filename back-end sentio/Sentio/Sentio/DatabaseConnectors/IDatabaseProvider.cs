using Sentio.DTO;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.DatabaseConnectors
{
    public interface IDatabaseProvider
    {
        IEnumerable<TableModel> GetAllTablesData(DatabaseConnection data);
        ConnectionValidationResult Validate(DatabaseConnection data);
        IEnumerable<string> GetAllTables(DatabaseConnection data);
        IEnumerable<TableProperty> GetAllTableProperties(DatabaseConnection data, string tableName);
    }
}
