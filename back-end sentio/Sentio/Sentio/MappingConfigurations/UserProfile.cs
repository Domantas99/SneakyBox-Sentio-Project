using AutoMapper;
using Sentio.Entities;
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
            CreateMap<User, UserProfile>();
            CreateMap<UserProfile, User>();
        }

    }
}
