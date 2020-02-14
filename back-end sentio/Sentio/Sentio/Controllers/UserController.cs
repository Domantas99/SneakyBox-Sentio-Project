using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.DTO;
using Sentio.Models;
using Sentio.RequestResults;
using Sentio.Services;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) {
            _userService = userService;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<UserValidationResult>> LoginUser([FromBody] UserLoginModel user)
        {
            return await _userService.LoginUser(user);
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<ActionResult<UserValidationResult>> RegisterNewUser([FromBody] UserRegistrationForm user)
        {
            return await _userService.RegisterNewUser(user);
        }

    }
}