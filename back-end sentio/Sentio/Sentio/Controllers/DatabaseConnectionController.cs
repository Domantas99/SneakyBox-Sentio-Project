using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Context;
using Sentio.DatabaseConnectors;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
using Sentio.Services;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseConnectionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly Dictionary<DatabaseType, IDatabaseProvider> providers;
        private readonly DatabaseDataService _dbDataService;
        private readonly TableDataService _tableDataService;    

        public DatabaseConnectionController(IMapper mapper, DatabaseDataService dbDataService, TableDataService tableDataService) {
            _mapper = mapper;
            _dbDataService = dbDataService;
            _tableDataService = tableDataService;
            providers = new Dictionary<DatabaseType, IDatabaseProvider>();
            providers.Add(DatabaseType.MSSQL, new MSSQLDatabaseProvider());
        }

        // GET: api/DatabaseConnection
        [HttpPost][Route("validate")]
        public async Task<ActionResult> Validate([FromBody]DatabaseConnection data)
        {
            if (providers.ContainsKey(data.DatabaseType))
            {
                ConnectionValidationResult validation = providers[data.DatabaseType].Validate(data);                    
                if (validation.IsValid)
                {
                    DatabaseViewModel dbModel = providers[data.DatabaseType].GetDatabaseData(data);
                    var tableList = providers[data.DatabaseType].GetAllTablesData(data);          
                    var id = await _dbDataService.AddDatabase(dbModel);
                    await _tableDataService.AddTables(tableList, id);

                    var aa=  await _tableDataService.GetTables(id);
                    return Ok(validation);
                }
                else {
                    return NotFound(validation);
                }
            }
            return NotFound(data);
        }

        [HttpPost][Route("tables")]
        public ActionResult<IEnumerable<TableModel>> GetAllTables([FromBody]DatabaseConnection data)
        {
            if (providers.ContainsKey(data.DatabaseType))
            {
                return Ok(providers[data.DatabaseType].GetAllTablesData(data));
            }

            return NotFound(data);
        }
    }
}