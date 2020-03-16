using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                try
                {
                    Guid newDashboardId = Guid.NewGuid();
                    var panels = dashboardModel.Panels;
                    var dashboardPanelList = new List<DashboardPanel>();
                    var dashboard = new Dashboard { Id = newDashboardId, DatabaseId = dashboardModel.DatabaseId, Name = dashboardModel.Name };
                    //DashboardPanels = dashboardPanelList };
                    _context.Dashboards.Add(dashboard);
                    for (int i = 0; i < panels.Count; i++)
                    {
                        var dbPanel = new DashboardPanel { DashboardId = newDashboardId, PanelId = panels.ElementAt(i).Id };
                        _context.DashboardPanels.Add(dbPanel);
                        dashboardPanelList.Add(dbPanel);
                    }
                    // _context.SaveChanges();

                    //var a = _context.SaveChanges();
                    var x = await _context.SaveChangesAsync();

                    return new ResponseResult<ReceivedDashboardModel> { IsValid = true, Message = "Successfully added", ReturnResult = dashboardModel };
                }
                catch (Exception e) {
                    var x = e;
                
                }
                }

            return new ResponseResult<ReceivedDashboardModel> { IsValid = false, Message = "Object is null", ReturnResult = null };
        }

        public async Task<ResponseResult<ICollection<Dashboard>>> GetUserDashboards(Guid userId)
        {
            var result =_context.Dashboards.Include(d=>d.Database).Where(d => d.Database.UserId == userId).Include(d => d.DashboardPanels).ToList();
            return new ResponseResult<ICollection<Dashboard>> { IsValid = true, Message = "Success", ReturnResult = result };
        }

        public async Task<ResponseResult<Dashboard>> DeleteDashboard(Guid dashboardId)
        {
            var dashboardToDelete = await _context.Dashboards.FirstOrDefaultAsync(d => d.Id == dashboardId);
            string message;
            bool flag = true;
            if (dashboardToDelete != null)
            {
                _context.Dashboards.Remove(dashboardToDelete);
                message = "Deleted successfully";
                await _context.SaveChangesAsync();
            }
            else {
                message = "Dashboard not found";
                flag = false;
            }
            return new ResponseResult<Dashboard> { IsValid = true, Message = message, ReturnResult = dashboardToDelete };
        }
    }
}
