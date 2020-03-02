using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Models;
using Sentio.Services;

// Task - Represents an asynchronous operation.
// ActionResult methods return models to views, file streams, redirect to other controllers

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseTablesController : ControllerBase
    {
        private readonly ITableDataService _tableDataService;
        public DatabaseTablesController(ITableDataService tableDataService) {
            _tableDataService = tableDataService;
        }

        [HttpGet("{databasebId}")]
        public async Task<ActionResult<TableDataResult>> GetAllTablesFromDb(Guid databasebId)
        {
            var result = await _tableDataService.GetTables(databasebId);
            if (result.IsValid)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(result);
            }
        }

    }
}