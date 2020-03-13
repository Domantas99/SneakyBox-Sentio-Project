using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Models.DashboardCreation;
using Sentio.RequestResults;
using Sentio.Services.ServiceInterfaces;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardsController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardsController(IDashboardService dashboardService) {
            _dashboardService = dashboardService;
        }


        [HttpPost][Route("add")]
        public async Task<ResponseResult<ReceivedDashboardModel>> AddDashboardToDb([FromBody]ReceivedDashboardModel dashboardModel) {
            var result = await _dashboardService.AddDashboardToDb(dashboardModel);
            return result;
        }


    }
}