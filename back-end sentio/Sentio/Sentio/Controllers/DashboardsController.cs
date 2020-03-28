using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.DTO;
using Sentio.Entities;
using Sentio.Models;
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
        private readonly IQueryService _queryService;

        public DashboardsController(IDashboardService dashboardService, IQueryService queryService) {
            _dashboardService = dashboardService;
            _queryService = queryService;
        }

        [HttpPost] [Route("add")]
        public async Task<ActionResult<ResponseResult<ReceivedDashboardModel>>> AddDashboardToDb([FromBody]ReceivedDashboardModel dashboardModel) {
            var result = await _dashboardService.AddDashboardToDb(dashboardModel);
            return result;
        }

        [HttpPost]
        [Route("Generate-Dashboard-Json-To-Grafana")]
        public async Task GenerateDashboardJsonToGrafana([FromBody]FileProps props)
        {
            await _dashboardService.GenerateDashboardGrafanaJson(props);
        }

        [HttpGet("all/{userId}")]
        public async Task<ActionResult<ResponseResult<ICollection<Dashboard>>>> GetUserDashboard(Guid userId) {
            var result = await _dashboardService.GetUserDashboards(userId);
            return result;
        }

        [HttpDelete("delete/{dashboardId}")]
        public async Task<ActionResult<ResponseResult<Dashboard>>> DeleteDashboard(Guid dashboardId)
        {
            var result = await _dashboardService.DeleteDashboard(dashboardId);
            return result;
        }

        [HttpPut("update")]
        public async Task<ActionResult<ResponseResult<Dashboard>>> UpdateDashboard([FromBody] Dashboard dashboard) {
            var result = await _dashboardService.UpdateDashboard(dashboard);
            return result;
        }

        [HttpPost("createGrafanaFiles")]
        public async Task<ActionResult<ResponseResult<GrafanaProps>>> CreateGrafanaView([FromBody]GrafanaProps grafanaProps) {
            bool flag = true;
            string message;
            try
            {
                await _queryService.CreateMetricsJson(grafanaProps.DbMetrics);
                await _dashboardService.GenerateDashboardGrafanaJson(grafanaProps.Dashboard);
                message = "Files created successfully";
            }
            catch (Exception ex)
            {
                flag = false;
                message = ex.Message;
            }

            return new ResponseResult<GrafanaProps> { IsValid = flag, Message = message, ReturnResult = grafanaProps };
        } 

    }
}