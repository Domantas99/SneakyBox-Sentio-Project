using Sentio.Entities;
using Sentio.Models.DashboardCreation;
using Sentio.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services.ServiceInterfaces
{
    public interface IDashboardService
    {
        Task<ResponseResult<ReceivedDashboardModel>> AddDashboardToDb(ReceivedDashboardModel dashboardModel);
        Task<ResponseResult<ICollection<Dashboard>>> GetUserDashboards(Guid userId);
        Task<ResponseResult<Dashboard>> DeleteDashboard(Guid dashboardId);

    }
}
