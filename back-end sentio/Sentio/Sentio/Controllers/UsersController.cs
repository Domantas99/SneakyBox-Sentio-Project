using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.DTO;
using Sentio.RequestResults;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<UserValidationResult>> ValidateUser([FromBody] UserRegistrationForm user) {

            return null;
        }

    }
}