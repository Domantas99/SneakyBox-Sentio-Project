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
                Guid newDashboardId = Guid.NewGuid();
                var panels = dashboardModel.Panels;
                var dashboardPanelList = new List<DashboardPanel>();
                
                for (int i = 0; i < panels.Count; i++)
                {
                    var dbPanel = new DashboardPanel { DashboardId = newDashboardId, PanelId = panels.ElementAt(i).Id };
                    //_context.DashboardPanels.Add(dbPanel);
                    dashboardPanelList.Add(dbPanel);
                }
                // _context.SaveChanges();
                var dashboard = new Dashboard { Id = newDashboardId, DatabaseId = newDashboardId, Name = dashboardModel.Name, DashboardPanels = dashboardPanelList };
                _context.Dashboards.Add(dashboard);
                //var a = _context.SaveChanges();
                var x = await _context.SaveChangesAsync();

                return new ResponseResult<ReceivedDashboardModel> { IsValid = true, Message = "Successfully added", ReturnResult = dashboardModel };
            }

            return new ResponseResult<ReceivedDashboardModel> { IsValid = false, Message = "Object is null", ReturnResult = null };
        }
        


    }
}
