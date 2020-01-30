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
        ConnectionValidationResult Validate(DatabaseConnection database);
        IEnumerable<string> GetAllTables(DatabaseConnection database);
        IEnumerable<TableProperty> GetAllTableProperties(DatabaseConnection database);
    }
}
