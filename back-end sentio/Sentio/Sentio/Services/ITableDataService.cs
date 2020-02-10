using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    interface ITableDataService
    {
        Task<TableDataResult> GetTables(Guid databaseId);
        Task<Guid> AddTables(ICollection<TableModel> tableModels, Guid dbGuid);
        void AddCollumnProperties(ICollection<CollumnProperty> properties);

    }
}
