using Microsoft.AspNetCore.Mvc;
using Sentio.DTO;
using Sentio.Models;
using Sentio.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public interface IUserService
    {
        Task<UserValidationResult> RegisterNewUser(UserRegistrationForm userViewModel);
        Task<UserValidationResult> LoginUser(UserLoginModel userLoginModel);
    }
}
