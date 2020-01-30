using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace Sentio.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DatabaseController: ControllerBase
    {

        [HttpGet]
        public IHttpActionResult Validate()
        {

            return Content(HttpStatusCode.BadRequest, "Any object");
        }








    }
}
