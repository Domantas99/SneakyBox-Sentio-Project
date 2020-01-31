using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        private readonly Dictionary<DatabaseType, IDatabaseProvider> providers;
        public DatabaseConnectionController() {
            providers = new Dictionary<DatabaseType, IDatabaseProvider>();
            providers.Add(DatabaseType.MSSQL, new MSSQLDatabaseProvider());
        }


        // GET: api/DatabaseConnection
        [HttpPost]
        public ActionResult Validate([FromBody]DatabaseConnection data)
        {
            if (providers.ContainsKey(data.DatabaseType))
            {
                ConnectionValidationResult validation = providers[data.DatabaseType].Validate(data);
                //providers[data.DatabaseType].GetAllTables(data);
                //providers[data.DatabaseType].GetAllTableProperties("Students");
                IEnumerable<TableModel> tm =  providers[data.DatabaseType].GetAllTablesData();


                if (validation.IsValid)
                {
                    return Ok(validation);
                }
                else {
                    return NotFound(validation);
                }

                //return validation.IsValid ? Ok(validation) : NotFound(validation);             
            }
            return NotFound(data.DatabaseType);
        }

        [HttpGet]
        public ActionResult<IEnumerable<TableModel>> GetAllTables( )
        {


            return null;
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
