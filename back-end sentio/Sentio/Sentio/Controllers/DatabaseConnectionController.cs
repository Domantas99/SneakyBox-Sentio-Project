using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Context;
//using Microsoft.EntityFrameworkCore.Storage;
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
        private readonly DatabaseDataService _dbDataService;
        private readonly TableDataService _tableDataService;
        private readonly IMapper _mapper;

        public DatabaseConnectionController(IMapper mapper, DatabaseDataService dbDataService, TableDataService tableDataService) {
            _mapper = mapper;
            _dbDataService = dbDataService;
            _tableDataService = tableDataService;
            providers = new Dictionary<DatabaseType, IDatabaseProvider>();
            providers.Add(DatabaseType.MSSQL, new MSSQLDatabaseProvider());
        }

        // GET: api/DatabaseConnection
        [HttpPost][Route("validate")]
        public ActionResult Validate([FromBody]DatabaseConnection data)
        {
            if (providers.ContainsKey(data.DatabaseType))
            {
                ConnectionValidationResult validation = providers[data.DatabaseType].Validate(data);
                Database db = providers[data.DatabaseType].GetDatabaseData(data);
                if (validation.IsValid)
                {
                    
                    var tableList = _mapper.Map<IEnumerable<Table>>(providers[data.DatabaseType].GetAllTablesData(data));
                    _dbDataService.AddDatabase(db);
                  
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


        // GET: api/DatabaseConnection/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        //// POST: api/DatabaseConnection
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT: api/DatabaseConnection/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
