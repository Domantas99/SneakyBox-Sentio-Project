using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services.ServiceInterfaces
{
    public interface IDashboardService
    {
        Task<ResponseResult<ReceivedDashboardModel>> AddDashboardToDb(ReceivedDashboardModel dashboardModel)

    }
}
