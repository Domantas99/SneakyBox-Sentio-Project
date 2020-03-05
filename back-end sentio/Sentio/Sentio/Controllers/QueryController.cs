using Microsoft.AspNetCore.Mvc;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Generators;
using Sentio.Models;
using Sentio.RequestResults;
using Sentio.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueryController : ControllerBase
    {
        private readonly Dictionary<DatabaseType, IQueryGenerator> _generators;
        private readonly IQueryService _queryService;

        public QueryController(IQueryService queryService) {
            _queryService = queryService;
            _generators = new Dictionary<DatabaseType, IQueryGenerator>();
            _generators.Add(DatabaseType.MSSQL, new MSSQLQueryGenerator());
            
        }


        [HttpPost]
        [Route("CreateNewQuery")]
        public async Task<ActionResult<ResponseResult<TableQueryConditions>>> CreateNewQuery([FromBody] TableQueryConditions conditions)
        {
            if (conditions != null)
            {
                var result = await _queryService.SaveQueryPropertiesToDb(conditions);
                //saugoti i duombaze sugenruota query
                return result;
            }
            return new ResponseResult<TableQueryConditions> { IsValid = false, Message = "Cannot add null objects", ReturnResult = null };
        }

        [HttpDelete("delete/{queryId}")]
        public async Task<ActionResult<ResponseResult<TrackableQuery>>> DeleteQuery(Guid queryId) {
            var result = await _queryService.DeleteQuery(queryId);
            return result;
        }


        [HttpGet("{databasebId}")]
        public async Task<ActionResult<ResponseResult<ICollection<TrackableQuery>>>> GetDatabaseQueries(Guid databasebId)
        {
            var result = await _queryService.GetDatabaseQueries(databasebId);
            return result;
        }



    }
}
