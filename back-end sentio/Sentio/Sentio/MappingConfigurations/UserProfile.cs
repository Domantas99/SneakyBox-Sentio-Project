using AutoMapper;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.MappingConfigurations
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserRegistrationForm>();
            CreateMap<UserRegistrationForm, User>();

            CreateMap<UserViewModel, UserRegistrationForm>();
            CreateMap<UserRegistrationForm, UserViewModel>();

            CreateMap<User, UserViewModel>();
            CreateMap<UserViewModel, User>();
        }

    }
}
