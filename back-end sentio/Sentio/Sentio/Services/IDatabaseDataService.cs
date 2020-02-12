﻿using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public interface IDatabaseDataService
    {
        Task<Guid> AddDatabase(DatabaseViewModel database);
    }
}