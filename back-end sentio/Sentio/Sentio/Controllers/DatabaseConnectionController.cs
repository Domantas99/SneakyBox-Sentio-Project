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
        private readonly Dictionary<DatabaseType, IDatabaseProvider> providers;
        private readonly IDatabaseDataService _dbDataService;
        private readonly ITableDataService _tableDataService;

        public DatabaseConnectionController(IDatabaseDataService dbDataService, ITableDataService tableDataService)
        {
            _dbDataService = dbDataService;
            _tableDataService = tableDataService;
            providers = new Dictionary<DatabaseType, IDatabaseProvider>();
            providers.Add(DatabaseType.MSSQL, new MSSQLDatabaseProvider());
        }

        // GET: api/DatabaseConnection
        [HttpPost] [Route("validate")]
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
                    validation.DbId = id;
                    await _tableDataService.AddTables(tableList, id);

                    return Ok(validation);
                }
                else {
                    return NotFound(validation);
                }
            }
            return NotFound(data);
        }

        [HttpGet("databases/{userId}")]
        public async Task<ActionResult<DatabaseViewModelsListResult>> GetDatabaseByDatabaseId(Guid userId) {
            return await _dbDataService.GetAllDatabasesByUserId(userId);
        }

        // api/databaseconnection/dbId
        [HttpDelete("{dbId}")]
        public async Task<ActionResult<DatabaseViewModel>> DeleteDatabase(Guid dbId) {
            return await _dbDataService.RemoveDatabase(dbId);
        }

    }
}