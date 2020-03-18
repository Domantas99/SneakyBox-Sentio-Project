using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sentio.Context;
using Sentio.Entities;
using Sentio.Models;
using Sentio.Models.DashboardCreation;
using Sentio.RequestResults;
using Sentio.Services.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task<ResponseResult<Dashboard>> UpdateDashboard(Dashboard newDashboard)
        {
            bool flag = false;
            string msg = "Dashboard not found";
            var currentDashboard = await _context.Dashboards.FirstOrDefaultAsync(d => d.Id == newDashboard.Id);
            if (currentDashboard != null)
            {
                try
                {
                    var dpToReplace = _context.DashboardPanels.Where(a => a.DashboardId == currentDashboard.Id);
                    _context.DashboardPanels.RemoveRange(dpToReplace);
                    await _context.SaveChangesAsync();
                    currentDashboard.Name = newDashboard.Name;
                    currentDashboard.DashboardPanels = newDashboard.DashboardPanels;
                    await _context.SaveChangesAsync();
                    flag = true;
                    msg = "Dashboard updated successfully";
                }
                catch (Exception e) {
                    msg = e.Message;
                }
            }
            return new ResponseResult<Dashboard> { IsValid = flag, Message = msg, ReturnResult = currentDashboard };
        }

        public async Task<ResponseResult<ReceivedDashboardModel>> AddDashboardToDb(ReceivedDashboardModel dashboardModel) {
            string msg = "Object is null";
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
                        var dbPanel = new DashboardPanel { Id = Guid.NewGuid(), DashboardId = newDashboardId, PanelId = panels.ElementAt(i).Id };
                       
                        dashboardPanelList.Add(dbPanel);
                    }
                    _context.DashboardPanels.AddRange(dashboardPanelList);
                    // bug neleidzia sukurti panel su dviem tokiais paciais prop
                    // _context.SaveChanges();

                    //var a = _context.SaveChanges();
                    var x = await _context.SaveChangesAsync();

                    return new ResponseResult<ReceivedDashboardModel> { IsValid = true, Message = "Successfully added", ReturnResult = dashboardModel };
                }
                catch (Exception e) {
                    msg = e.Message;
                    }
                }

            return new ResponseResult<ReceivedDashboardModel> { IsValid = false, Message = msg, ReturnResult = null };
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

        public async Task GenerateDashboardGrafanaJson(FileProps props)
        {
            var dashboard = await _context.Dashboards.Include(d => d.DashboardPanels).FirstOrDefaultAsync(d => d.Id == props.ObjectId);
            // Panel query id values(it is important to be letters)
            string IdValues = "ABCDEFGHIYJKLMNOPRSTUVZ";
            var panels = _context.DashboardPanels.Where(d => d.DashboardId == props.ObjectId)
                                                    .Select(d => d.Panel)
                                                    .Include(p => p.PanelQueries)
                                                    .ToList();     
            if (File.Exists(props.FileName))
            {
                File.Delete(props.FileName);
            }

            using (StreamWriter sr = new StreamWriter(props.FileName, true))
            {
                // Dashboard creation
                sr.WriteLine("{");
                sr.WriteLine("  \"annotations\": {");
                sr.WriteLine("    \"list\": [");
                sr.WriteLine("      {");
                sr.WriteLine("        \"builtIn\": 1,");
                sr.WriteLine("        \"datasource\": \"-- Grafana --\",");
                sr.WriteLine("        \"enable\": true,");
                sr.WriteLine("        \"hide\": true,");
                sr.WriteLine("        \"iconColor\": \"rgba(0, 211, 255, 1)\",");
                sr.WriteLine("        \"name\": \"Annotations & Alerts\",");
                sr.WriteLine("        \"type\": \"dashboard\"");
                sr.WriteLine("      }");
                sr.WriteLine("    ]");
                sr.WriteLine("  },");
                sr.WriteLine("  \"editable\": true,");
                sr.WriteLine("  \"gnetId\": null,");
                sr.WriteLine("  \"graphTooltip\": 0,");
                sr.WriteLine("  \"id\": 1,");
                sr.WriteLine("  \"links\": [],");
                sr.WriteLine("  \"panels\": [");

                // Adding panels to dashboard
                int defHeigth = 8;
                int defWidth = 12;
                const int dashboardWidth = 24;
                int xPosition = 0;
                int yPosition = 0;
                int panelsCount = dashboard.DashboardPanels.Count;

                for (int i = 0; i < panelsCount; i++)
                {
                    sr.WriteLine("    {");
                    sr.WriteLine("      \"aliasColors\": {},");
                    sr.WriteLine("      \"bars\": false,");
                    sr.WriteLine("      \"dashLength\": 10,");
                    sr.WriteLine("      \"dashes\": false,");
                    sr.WriteLine("      \"datasource\": null,");
                    sr.WriteLine("      \"fill\": 1,");
                    sr.WriteLine("      \"fillGradient\": 0,");
                    sr.WriteLine("      \"gridPos\": {");
                    sr.WriteLine($"        \"h\": {defHeigth},");
                    sr.WriteLine($"        \"w\": {defWidth},");
                    sr.WriteLine($"        \"x\": {xPosition},");
                    sr.WriteLine($"        \"y\": {yPosition}");
                    xPosition += defWidth;
                    if (xPosition >= dashboardWidth)
                    {
                        xPosition = 0;
                        yPosition += defHeigth;
                    }
                    sr.WriteLine("      },");
                    sr.WriteLine("      \"hiddenSeries\": false,");
                    sr.WriteLine($"      \"id\": {i},");
                    sr.WriteLine("      \"legend\": {");
                    sr.WriteLine("        \"avg\": false,");
                    sr.WriteLine("        \"current\": false,");
                    sr.WriteLine("        \"max\": false,");
                    sr.WriteLine("        \"min\": false,");
                    sr.WriteLine("        \"show\": true,");
                    sr.WriteLine("        \"total\": false,");
                    sr.WriteLine("        \"values\": false");
                    sr.WriteLine("      },");
                    sr.WriteLine("      \"lines\": true,");
                    sr.WriteLine("      \"linewidth\": 1,");
                    sr.WriteLine("      \"nullPointMode\": \"null\",");
                    sr.WriteLine("      \"options\": {");
                    sr.WriteLine("        \"dataLinks\": []");
                    sr.WriteLine("      },");
                    sr.WriteLine("      \"percentage\": false,");
                    sr.WriteLine("      \"pointradius\": 2,");
                    sr.WriteLine("      \"points\": false,");
                    sr.WriteLine("      \"renderer\": \"flot\",");
                    sr.WriteLine("      \"seriesOverrides\": [],");
                    sr.WriteLine("      \"spaceLength\": 10,");
                    sr.WriteLine("      \"stack\": false,");
                    sr.WriteLine("      \"steppedLine\": false,");
                    sr.WriteLine("      \"targets\": [");

                    // Adding queries to panel
                    int idPointer = 0;
                    int queryCount = panels.ElementAt(i).PanelQueries.Count;
                    var queries = _context.PanelQueries.Where(x => x.PanelId == panels.ElementAt(i).Id).Include(a=>a.TrackableQuery).ToList();
                    for (int j = 0; j < queryCount; j++)
                    {

                        var panelQuery = queries.ElementAt(j);//panels.ElementAt(j).PanelQueries.ElementAt(j);
                        sr.WriteLine("        {");
                        string expression = string.Join('_', panelQuery.TrackableQuery.Name.Split(' '));
                        sr.WriteLine($"          \"expr\": \"{expression}\",");
                        sr.WriteLine($"          \"legendFormat\": \"{panelQuery.Legend}\",");
                        sr.WriteLine($"          \"refId\": \"{IdValues[idPointer]}\"");
                        idPointer++;
                        if (j == queryCount - 1)
                        {
                            sr.WriteLine("        }");
                        }
                        else
                        {
                            sr.WriteLine("        },");
                        }
                    }
                    sr.WriteLine("      ],");
                    sr.WriteLine("      \"thresholds\": [],");
                    sr.WriteLine("      \"timeFrom\": null,");
                    sr.WriteLine("      \"timeRegions\": [],");
                    sr.WriteLine("      \"timeShift\": null,");
                    sr.WriteLine($"      \"title\": \"{panels.ElementAt(i).Legend}\",");
                    sr.WriteLine("      \"tooltip\": {");
                    sr.WriteLine("        \"shared\": true,");
                    sr.WriteLine("        \"sort\": 0,");
                    sr.WriteLine("        \"value_type\": \"individual\"");
                    sr.WriteLine("      },");
                    sr.WriteLine("      \"type\": \"graph\",");
                    sr.WriteLine("      \"xaxis\": {");
                    sr.WriteLine("        \"buckets\": null,");
                    sr.WriteLine("        \"mode\": \"time\",");
                    sr.WriteLine("        \"name\": null,");
                    sr.WriteLine("        \"show\": true,");
                    sr.WriteLine("        \"values\": []");
                    sr.WriteLine("      },");
                    sr.WriteLine("      \"yaxes\": [");
                    sr.WriteLine("        {");
                    sr.WriteLine("          \"format\": \"short\",");
                    sr.WriteLine("          \"label\": null,");
                    sr.WriteLine("          \"logBase\": 1,");
                    sr.WriteLine("          \"max\": null,");
                    sr.WriteLine("          \"min\": null,");
                    sr.WriteLine("          \"show\": true");
                    sr.WriteLine("        },");
                    sr.WriteLine("        {");
                    sr.WriteLine("          \"format\": \"short\",");
                    sr.WriteLine("          \"label\": null,");
                    sr.WriteLine("          \"logBase\": 1,");
                    sr.WriteLine("          \"max\": null,");
                    sr.WriteLine("          \"min\": null,");
                    sr.WriteLine("          \"show\": true");
                    sr.WriteLine("        }");
                    sr.WriteLine("      ],");
                    sr.WriteLine("      \"yaxis\": {");
                    sr.WriteLine("        \"align\": false,");
                    sr.WriteLine("        \"alignLevel\": null");
                    sr.WriteLine("      }");
                    if (i == panelsCount - 1)
                    {
                        sr.WriteLine("    }");
                    }
                    else
                    {
                        sr.WriteLine("    },");
                    }
                }
              
                sr.WriteLine("  ],");
                sr.WriteLine("  \"schemaVersion\": 22,");
                sr.WriteLine("  \"style\": \"dark\",");
                sr.WriteLine("  \"tags\": [],");
                sr.WriteLine("  \"templating\": {");
                sr.WriteLine("    \"list\": []");
                sr.WriteLine("  },");
                sr.WriteLine("  \"time\": {");
                sr.WriteLine("    \"from\": \"now-6h\",");
                sr.WriteLine("    \"to\": \"now\"");
                sr.WriteLine("  },");
                sr.WriteLine("  \"timepicker\": {");
                sr.WriteLine("    \"refresh_intervals\": [");
                sr.WriteLine("      \"5s\",");
                sr.WriteLine("      \"10s\",");
                sr.WriteLine("      \"30s\",");
                sr.WriteLine("      \"1m\",");
                sr.WriteLine("      \"5m\",");
                sr.WriteLine("      \"15m\",");
                sr.WriteLine("      \"30m\",");
                sr.WriteLine("      \"1h\",");
                sr.WriteLine("      \"2h\",");
                sr.WriteLine("      \"1d\"");
                sr.WriteLine("    ]");
                sr.WriteLine("  },");
                sr.WriteLine("  \"timezone\": \"\",");
                sr.WriteLine($"  \"title\": \"{dashboard.Name}\",");
                sr.WriteLine("  \"uid\": \"IOoq2fuWz\",");
                sr.WriteLine("  \"version\": 7");
                sr.WriteLine("}");
            }
        }

        
    }
}
