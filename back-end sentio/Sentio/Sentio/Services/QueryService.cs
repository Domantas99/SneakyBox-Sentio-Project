using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sentio.Context;
using Sentio.Entities;
using Sentio.Models;
using Sentio.RequestResults;
using Sentio.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class QueryService : IQueryService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;

        public QueryService(SentioContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResponseResult<TrackableQuery>> DeleteQuery(Guid queryId)
        {
            var queryToRemove = await _context.TrackableQueries.Include(q=> q.QueryConditions).FirstOrDefaultAsync(q => q.Id == queryId);
            if (queryToRemove != null)
            {
                _context.QueryConditions.RemoveRange(_context.QueryConditions.Where(x => x.TrackableQueryId == queryId));
                _context.TrackableQueries.Remove(queryToRemove);
                return new ResponseResult<TrackableQuery> { IsValid = true, Message = "Query removed successfully", ReturnResult = queryToRemove };
            }
            return new ResponseResult<TrackableQuery> { IsValid = true, Message = "Query not found", ReturnResult = null };
        }

        public async Task<ResponseResult<ICollection<TrackableQuery>>> GetDatabaseQueries(Guid databaseId)
        {
            var tableIds = _context.Tables.Where(table => table.DatabaseId == databaseId).Select(table=> table.Id).ToArray();
            //List<TableQueryConditions> metricsList = new List<TableQueryConditions>();
            var metricsList = new List<TrackableQuery>();
         
            for (int i = 0; i < tableIds.Count(); i++)
            {
                var queries = await (_context.TrackableQueries.Where(query => query.TableId == tableIds[i]).Include(q => q.QueryConditions)).ToListAsync();        
                metricsList.AddRange(queries);
            }
            return new ResponseResult<ICollection<TrackableQuery>> { IsValid = true, Message = "Success", ReturnResult = metricsList };

            
        }

        public async Task<ResponseResult<TableQueryConditions>> SaveQueryPropertiesToDb(TableQueryConditions queryConditions) {  
            var conditionsList = new List<QueryCondition>();
            Guid trackableQueryId = Guid.NewGuid();
            for (int i = 0; i < queryConditions.Conditions.Count; i++)
            {
                var conditions = queryConditions.Conditions.ElementAt(i);
                var queryCondition = new QueryCondition
                {
                    Value = conditions.FilterValue,
                    CollumnPropertyId = conditions.TableProperty.Id,
                    ConditionType = conditions.FilterOption,
                    TrackableQueryId = trackableQueryId
                };
                conditionsList.Add(queryCondition);
            }

            var trackableQuery = new TrackableQuery
            {
                Name = queryConditions.Name,
                OperationType = queryConditions.Operation,
                TableId = queryConditions.TableId,
                QueryConditions = conditionsList,
                Id = trackableQueryId
            };
            _context.TrackableQueries.Add(trackableQuery);
            await _context.SaveChangesAsync();
            return new ResponseResult<TableQueryConditions> { IsValid = true, Message = "Success", ReturnResult = queryConditions };
        }
    }
}
