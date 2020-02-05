using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Context;
//using Microsoft.EntityFrameworkCore.Storage;
using Sentio.DatabaseConnectors;
using Sentio.DTO;
using Sentio.Models;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseConnectionController : ControllerBase
    {
        private readonly SentioContext _context;
        private readonly Dictionary<DatabaseType, IDatabaseProvider> providers;
        public DatabaseConnectionController(SentioContext context) {
            _context = context;
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

                if (validation.IsValid)
                {
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
