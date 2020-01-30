using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore.Storage;
using Sentio.DatabaseConnectors;
using Sentio.DTO;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseConnectionController : ControllerBase
    {

        private readonly Dictionary<DatabaseType, IDatabaseProvider> providers;
        public DatabaseConnectionController() {
            providers = new Dictionary<DatabaseType, IDatabaseProvider>();
            providers.Add(DatabaseType.MSSQL, new MSSQLDatabaseProvider());
        }


        // GET: api/DatabaseConnection
        [HttpGet]
        public ActionResult Validate([FromBody]DatabaseConnection data)
        {
            if (providers.ContainsKey(data.DatabaseType))
            {
                var validation = providers[data.DatabaseType].Validate(data);
                return Ok(validation);
            }
            return NotFound(data.DatabaseType);
        }

        // GET: api/DatabaseConnection/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DatabaseConnection
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

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
