using Sentio.Entities;
using Sentio.Models;
using Sentio.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services.ServiceInterfaces
{
    public interface IQueryService
    {
        Task<ResponseResult<TableQueryConditions>> AddNewQuery(TableQueryConditions queryConditions);
        Task<ResponseResult<ICollection<TrackableQuery>>> GetDatabaseQueries(Guid databaseId);
        Task CreateMetricsJson(MetricFileProps props);
        Task<ResponseResult<TrackableQuery>> DeleteQuery(Guid queryId);
        Task<ResponseResult<ICollection<TrackableQuery>>> GetAllQueries(); //reikes padaryt kad pagal UID
       

    }
}
