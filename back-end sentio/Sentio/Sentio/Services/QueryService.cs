using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sentio.Context;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Generators;
using Sentio.Models;
using Sentio.RequestResults;
using Sentio.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class QueryService : IQueryService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;
        private readonly Dictionary<DatabaseType, IQueryGenerator> _generators;
        public QueryService(SentioContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
            _generators = new Dictionary<DatabaseType, IQueryGenerator>();
            _generators.Add(DatabaseType.MSSQL, new MSSQLQueryGenerator());
            //_generators[DatabaseType.MSSQL].GenerateQuery(null);
        }

        public async Task<ResponseResult<TrackableQuery>> DeleteQuery(Guid queryId)
        {
            var queryToRemove = await _context.TrackableQueries.Include(q=> q.QueryConditions).FirstOrDefaultAsync(q => q.Id == queryId);
            if (queryToRemove != null)
            {
                _context.QueryConditions.RemoveRange(_context.QueryConditions.Where(x => x.TrackableQueryId == queryId));
                await _context.SaveChangesAsync();
                _context.TrackableQueries.Remove(queryToRemove);
                await _context.SaveChangesAsync();
                return new ResponseResult<TrackableQuery> { IsValid = true, Message = "Query removed successfully", ReturnResult = queryToRemove };
            }
            return new ResponseResult<TrackableQuery> { IsValid = true, Message = "Query not found", ReturnResult = null };
        }

        public async Task<ResponseResult<ICollection<TrackableQuery>>> GetAllQueries(Guid userId) {
            var queryList = await _context.TrackableQueries.Include(q=> q.Database).Where(q => q.Database.UserId == userId).ToListAsync();
            return new ResponseResult<ICollection<TrackableQuery>> { IsValid = true, Message = "Success", ReturnResult = queryList };
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

        public async Task<ResponseResult<TableQueryConditions>> AddNewQuery(TableQueryConditions queryConditions) {  
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
            //queryConditions
            string tableName = _context.Tables.FirstOrDefaultAsync(table => table.Id == queryConditions.TableId).Result.Name;
            queryConditions.TableName = tableName;
            string generatedQuery = await GetGeneratedQuery(queryConditions);

            var trackableQuery = new TrackableQuery
            {
                Name = queryConditions.Name,
                OperationType = queryConditions.Operation,
                TableId = queryConditions.TableId,
                QueryConditions = conditionsList,
                Id = trackableQueryId,
                GeneratedQuery = generatedQuery,
                DatabaseId = queryConditions.DatabaseId
            };

            _context.TrackableQueries.Add(trackableQuery);
            await _context.SaveChangesAsync();
            return new ResponseResult<TableQueryConditions> { IsValid = true, Message = "Success", ReturnResult = queryConditions };
        }

        private async Task<string> GetGeneratedQuery(TableQueryConditions tableQueryConditions) {
            var table = await _context.Tables.Include(t => t.Database).FirstOrDefaultAsync(t => t.Id == tableQueryConditions.TableId);
            var databaseId =  table.Database.DatabaseType;//_context..FirstOrDefaultAsync(db => db.Id == tableQueryConditions.)
            string queryString;
            switch (databaseId) {
                case DatabaseType.MSSQL:
                    queryString = _generators[DatabaseType.MSSQL].GenerateQuery(tableQueryConditions);
                    break;
                default:
                    queryString = "Database type not found";
                    break;
            }
            return queryString;
        }
     

        public async Task CreateMetricsJson(MetricFileProps props)
        {
            if (File.Exists(props.FileName))
            {
                File.Delete(props.FileName);
            }
            var queries = await _context.TrackableQueries.Include(q => q.Table)
                            .Where(q => q.Table.DatabaseId == props.DatabaseId).ToListAsync();
            using (StreamWriter sr = new StreamWriter(props.FileName, true))
            {
                sr.WriteLine("{");
                sr.WriteLine("  \"Queries\":[");

                for (int i = 0; i < queries.Count; i++)
                {
                    var query = queries[i];
                    sr.WriteLine("              {");
                    sr.WriteLine("          \"Name\": \"" + query.Name + "\",");
                    sr.WriteLine("          \"Query\": \"" + query.GeneratedQuery + "\",");
                    sr.WriteLine("          \"Name\": \"" + query.Name + "\",");
                    sr.WriteLine("          \"Columns\": [");
                    sr.WriteLine("              {");
                    sr.WriteLine("                  \"Name\": \"" + query.OperationType + "\",");
                    sr.WriteLine("                  \"Label\": \"" + query.Name + "_" + query.OperationType + "\",");
                    sr.WriteLine("                  \"Usage\": \"Gauge\",");
                    sr.WriteLine("                  \"DefaultValue\": 0");
                    sr.WriteLine("              }");
                    sr.WriteLine("          ]");
                    if (i != queries.Count - 1)
                    {
                        sr.WriteLine("      },");
                    }
                    else {
                        sr.WriteLine("      }");
                    }          
                }
                sr.WriteLine("  ],");
                sr.WriteLine("  \"MillisecondTimeout\": 4000");
                sr.WriteLine("}");
            }
        }

    }
}
