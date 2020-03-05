﻿using Sentio.Entities;
using Sentio.Models;
using Sentio.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services.ServiceInterfaces
{
    public interface IQueryService
    {
        Task<ResponseResult<TableQueryConditions>> SaveQueryPropertiesToDb(TableQueryConditions queryConditions);
        Task<ResponseResult<ICollection<TrackableQuery>>> GetDatabaseQueries(Guid databaseId);

    }
}