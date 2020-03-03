using Microsoft.AspNetCore.Mvc;
using Sentio.DTO;
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
            await _queryService.SaveQueryPropertiesToDb(conditions);
            var x = conditions;
            var a = 2 + 2;

            return null;
        }

    }
}
