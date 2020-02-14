using AutoMapper;
using Sentio.Context;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
using Sentio.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class UserService: IUserService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;

        public UserService(SentioContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserValidationResult> RegisterNewUser(UserRegistrationForm userRegistrationForm) {
            try
            {
               
                var user = _context.Users.FirstOrDefault(u => u.Email == userRegistrationForm.Email);
                if (user != null)
                {
                    return new UserValidationResult {  Message = "User with that email already exists", IsValid = true };
                }
                else
                {
                    var newUser = _mapper.Map<User>(userRegistrationForm);
                    _context.Users.Add(newUser);
                    await _context.SaveChangesAsync();
                    return new UserValidationResult { Id = newUser.Id, IsValid = true, Message = "User registered successfully" };
                }
            }
            catch (Exception ex)
            {
                return new UserValidationResult { Message = "There was an error: " + ex.Message, IsValid = false };
            }
        }

        public async Task<UserValidationResult> LoginUser(UserLoginModel userLoginModel) {
            var user = _context.Users.FirstOrDefault(u => u.Email == userLoginModel.Email && u.Password == userLoginModel.Password);
            if (user != null)
            {
                return new UserValidationResult { IsValid = true, Message = "Logged in successfully", Id = user.Id };
            }

            return new UserValidationResult { IsValid = false, Message = "User not found" };            
        }
    }
}
