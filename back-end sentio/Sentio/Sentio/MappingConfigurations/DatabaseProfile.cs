using AutoMapper;
using Sentio.Entities;
using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.MappingConfigurations
{
    public class DatabaseProfile: Profile
    {
        public DatabaseProfile() {
            CreateMap<Database, DatabaseViewModel>();
            CreateMap<DatabaseViewModel, Database>();
        }
    }
}
