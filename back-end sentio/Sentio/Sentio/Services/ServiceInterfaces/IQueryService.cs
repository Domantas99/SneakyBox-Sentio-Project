using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services.ServiceInterfaces
{
    public interface IQueryService
    {
        Task SaveQueryPropertiesToDb(TableQueryConditions conditions);
    }
}
