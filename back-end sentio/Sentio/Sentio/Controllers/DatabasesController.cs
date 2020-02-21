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
using Sentio.RequestResults;
using Sentio.Services;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabasesController : ControllerBase
    {
        private readonly Dictionary<DatabaseType, IDatabaseProvider> providers;
        private readonly IDatabaseDataService _dbDataService;
        private readonly ITableDataService _tableDataService;

        public DatabasesController(IDatabaseDataService dbDataService, ITableDataService tableDataService)
        {
            _dbDataService = dbDataService;
            _tableDataService = tableDataService;
            providers = new Dictionary<DatabaseType, IDatabaseProvider>();
            providers.Add(DatabaseType.MSSQL, new MSSQLDatabaseProvider());
        }

        // GET: api/DatabaseConnection
        [HttpPost] [Route("validate")]
        public async Task<ActionResult<ResponseResult<DatabaseViewModel>>> Validate([FromBody]DatabaseConnection data)
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

                    return (new ResponseResult<DatabaseViewModel> { IsValid = true, Message = "Success", ReturnResult = dbModel });
                }
                else {
                    return (new ResponseResult<DatabaseViewModel> { IsValid = false, Message = "Not Found" });
                }
            }
            return (new ResponseResult<DatabaseViewModel> { IsValid = false, Message = "Error" });
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<DatabaseViewModelsListResult>> GetDatabaseByUserId(Guid userId) {
            return await _dbDataService.GetAllDatabasesByUserId(userId);
        }

        

        // api/databaseconnection/dbId
        [HttpDelete("delete/{dbId}")]
        public async Task<ActionResult<ResponseResult<DatabaseViewModel>>> DeleteDatabase(Guid dbId) {
            return await _dbDataService.RemoveDatabase(dbId);
        }

    }
}