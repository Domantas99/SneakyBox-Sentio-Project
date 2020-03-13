using AutoMapper;
using Sentio.Context;
using Sentio.Entities;
using Sentio.Models.DashboardCreation;
using Sentio.RequestResults;
using Sentio.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;
        public DashboardService(SentioContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResponseResult<ReceivedDashboardModel>> AddDashboardToDb(ReceivedDashboardModel dashboardModel) {
            if (dashboardModel != null)
            {
                var panels = dashboardModel.Panels;
                for (int i = 0; i < panels.Count; i++)
                {
                    var dbPanel = new DashboardPanel { DashboardId = dashboardModel.DatabaseId, PanelId = panels.ElementAt(i).Id };
                    _context.DashboardPanels.Add(dbPanel);
                }
                await _context.SaveChangesAsync();
                var dashboard = new Dashboard { DatabaseId = dashboardModel.DatabaseId, Name = dashboardModel.Name };
                _context.Dashboards.Add(dashboard);
                await _context.SaveChangesAsync();

                return new ResponseResult<ReceivedDashboardModel> { IsValid = true, Message = "Successfully added", ReturnResult = dashboardModel };
            }

            return new ResponseResult<ReceivedDashboardModel> { IsValid = false, Message = "Object is null", ReturnResult = null };
        }
        


    }
}
