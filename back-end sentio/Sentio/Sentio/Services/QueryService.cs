using AutoMapper;
using Sentio.Context;
using Sentio.Entities;
using Sentio.Models;
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

        public async Task SaveQueryPropertiesToDb(TableQueryConditions queryConditions) {
          
            ICollection<QueryCondition> conditionsList = new List<QueryCondition>();
            Guid trackableQueryId = Guid.NewGuid();
            for (int i = 0; i < queryConditions.Conditions.Count; i++)
            {
                var conditions = queryConditions.Conditions.ElementAt(i);
                QueryCondition queryCondition = new QueryCondition
                {
                    // CollumnProperty = _mapper.Map<CollumnProperty>(cond.TableProperty),
                    Value = conditions.FilterValue,
                    CollumnPropertyId = conditions.TableProperty.Id,
                    ConditionType = conditions.FilterOption,
                    TrackableQueryId = trackableQueryId
                };
                var condResult = _context.QueryConditions.Add(queryCondition);
                conditionsList.Add(queryCondition);
            }

            _context.SaveChangesAsync();
            TrackableQuery trackableQuery = new TrackableQuery
            {
                OperationType = queryConditions.Operation,
                TableId = queryConditions.TableId,
                QueryConditions = conditionsList,
                Id = trackableQueryId
            };

            var qResult = _context.TrackableQueries.Add(trackableQuery);
            await _context.SaveChangesAsync();
            //var queryConditions = conditions.Conditions;
            var a = 1;
            //var trackableQuery = new TrackableQuery { 
            //                        OperationType = conditions.Operation, 
            //                        TableId = conditions.TableId,
                                        
            //    }
            //_context.QueryConditions.ElementAt(0).
        
        
        }



    }
}
