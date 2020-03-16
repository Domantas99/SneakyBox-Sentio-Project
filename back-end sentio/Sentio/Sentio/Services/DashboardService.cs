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

        public async Task GenerateDashboard(Guid dashboardId) {
            var dashboard = await _context.Dashboards.Include(d => d.DashboardPanels).ThenInclude(d => d.)//FirstOrDefaultAsync(d => d.Id == dashboardId);
            
            string text = "";
            text += "{";
            text += "  \"annotations\": {";
            text += "    \"list\": [";
            text += "      {";
            text += "        \"builtIn\": 1,";
            text += "        \"datasource\": \"-- Grafana --\",";
            text += "        \"enable\": true,";
            text += "        \"hide\": true,";
            text += "        \"iconColor\": \"rgba(0, 211, 255, 1)\",";
            text += "        \"name\": \"Annotations & Alerts\",";
            text += "        \"type\": \"dashboard\"";
            text += "      }";
            text += "    ]";
            text += "  },";
            text += "  \"editable\": true,";
            text += "  \"gnetId\": null,";
            text += "  \"graphTooltip\": 0,";
            text += "  \"id\": 1,";
            text += "  \"links\": [],";
            text += "  \"panels\": [";
            // cia prasides cikliukas
            text += "    {";
            text += "      \"aliasColors\": {},";
            text += "      \"bars\": false,";
            text += "      \"dashLength\": 10,";
            text += "      \"dashes\": false,";
            text += "      \"datasource\": null,";
            text += "      \"fill\": 1,";
            text += "      \"fillGradient\": 0,";
            text += "      \"gridPos\": {";
            text += "        \"h\": 8,";
            text += "        \"w\": 12,";
            text += "        \"x\": 0,";
            text += "        \"y\": 0";
            text += "      },";
            text += "      \"hiddenSeries\": false,";
            text += "      \"id\": 4,";
            text += "      \"legend\": {";
            text += "        \"avg\": false,";
            text += "        \"current\": false,";
            text += "        \"max\": false,";
            text += "        \"min\": false,";
            text += "        \"show\": true,";
            text += "        \"total\": false,";
            text += "        \"values\": false";
            text += "      },";
            text += "      \"lines\": true,";
            text += "      \"linewidth\": 1,";
            text += "      \"nullPointMode\": \"null\",";
            text += "      \"options\": {";
            text += "        \"dataLinks\": []";
            text += "      },";
            text += "      \"percentage\": false,";
            text += "      \"pointradius\": 2,";
            text += "      \"points\": false,";
            text += "      \"renderer\": \"flot\",";
            text += "      \"seriesOverrides\": [],";
            text += "      \"spaceLength\": 10,";
            text += "      \"stack\": false,";
            text += "      \"steppedLine\": false,";
            text += "      \"targets\": [";
            text += "        {";
            text += "          \"expr\": \"Teacher_COUNT_COUNT\",";
            text += "          \"legendFormat\": \"cia teacher count label\",";
            text += "          \"refId\": \"A\"";
            text += "        }";
            text += "      ],";
            text += "      \"thresholds\": [],";
            text += "      \"timeFrom\": null,";
            text += "      \"timeRegions\": [],";
            text += "      \"timeShift\": null,";
            text += "      \"title\": \"aa Panel Title cia tile pa\",";
            text += "      \"tooltip\": {";
            text += "        \"shared\": true,";
            text += "        \"sort\": 0,";
            text += "        \"value_type\": \"individual\"";
            text += "      },";
            text += "      \"type\": \"graph\",";
            text += "      \"xaxis\": {";
            text += "        \"buckets\": null,";
            text += "        \"mode\": \"time\",";
            text += "        \"name\": null,";
            text += "        \"show\": true,";
            text += "        \"values\": []";
            text += "      },";
            text += "      \"yaxes\": [";
            text += "        {";
            text += "          \"format\": \"short\",";
            text += "          \"label\": null,";
            text += "          \"logBase\": 1,";
            text += "          \"max\": null,";
            text += "          \"min\": null,";
            text += "          \"show\": true";
            text += "        },";
            text += "        {";
            text += "          \"format\": \"short\",";
            text += "          \"label\": null,";
            text += "          \"logBase\": 1,";
            text += "          \"max\": null,";
            text += "          \"min\": null,";
            text += "          \"show\": true";
            text += "        }";
            text += "      ],";
            text += "      \"yaxis\": {";
            text += "        \"align\": false,";
            text += "        \"alignLevel\": null";
            text += "      }";
            text += "    },";
            // cia baigiasi cikliukas y+8 kiekviena karta

            text += "    {";
            text += "      \"aliasColors\": {},";
            text += "      \"bars\": false,";
            text += "      \"dashLength\": 10,";
            text += "      \"dashes\": false,";
            text += "      \"datasource\": null,";
            text += "      \"fill\": 1,";
            text += "      \"fillGradient\": 0,";
            text += "      \"gridPos\": {";
            text += "        \"h\": 8,";
            text += "        \"w\": 12,";
            text += "        \"x\": 0,";
            text += "        \"y\": 8";
            text += "      },";
            text += "      \"hiddenSeries\": false,";
            text += "      \"id\": 2,";
            text += "      \"legend\": {";
            text += "        \"avg\": false,";
            text += "        \"current\": false,";
            text += "        \"max\": false,";
            text += "        \"min\": false,";
            text += "        \"show\": true,";
            text += "        \"total\": false,";
            text += "        \"values\": false";
            text += "      },";
            text += "      \"lines\": true,";
            text += "      \"linewidth\": 1,";
            text += "      \"nullPointMode\": \"null\",";
            text += "      \"options\": {";
            text += "        \"dataLinks\": []";
            text += "      },";
            text += "      \"percentage\": false,";
            text += "      \"pointradius\": 2,";
            text += "      \"points\": false,";
            text += "      \"renderer\": \"flot\",";
            text += "      \"seriesOverrides\": [],";
            text += "      \"spaceLength\": 10,";
            text += "      \"stack\": false,";
            text += "      \"steppedLine\": false,";
            text += "      \"targets\": [";
            text += "        {";
            text += "          \"expr\": \"Prizu_kuriu_taskai_maziau_uz__56_kiekis_COUNT\",";
            text += "          \"legendFormat\": \"cia prizu legenda\",";
            text += "          \"refId\": \"A\"";
            text += "        },";
            text += "        {";
            text += "          \"expr\": \"Point_Price_vidurkis_AVERAGE\",";
            text += "          \"legendFormat\": \"cia vidurkis\",";
            text += "          \"refId\": \"B\"";
            text += "        }";
            text += "      ],";
            text += "      \"thresholds\": [],";
            text += "      \"timeFrom\": null,";
            text += "      \"timeRegions\": [],";
            text += "      \"timeShift\": null,";
            text += "      \"title\": \"CIA YRA PANELELS PAVADINIMAS\",";
            text += "      \"tooltip\": {";
            text += "        \"shared\": true,";
            text += "        \"sort\": 0,";
            text += "        \"value_type\": \"individual\"";
            text += "      },";
            text += "      \"type\": \"graph\",";
            text += "      \"xaxis\": {";
            text += "        \"buckets\": null,";
            text += "        \"mode\": \"time\",";
            text += "        \"name\": null,";
            text += "        \"show\": true,";
            text += "        \"values\": []";
            text += "      },";
            text += "      \"yaxes\": [";
            text += "        {";
            text += "          \"format\": \"short\",";
            text += "          \"label\": null,";
            text += "          \"logBase\": 1,";
            text += "          \"max\": null,";
            text += "          \"min\": null,";
            text += "          \"show\": true";
            text += "        },";
            text += "        {";
            text += "          \"format\": \"short\",";
            text += "          \"label\": null,";
            text += "          \"logBase\": 1,";
            text += "          \"max\": null,";
            text += "          \"min\": null,";
            text += "          \"show\": true";
            text += "        }";
            text += "      ],";
            text += "      \"yaxis\": {";
            text += "        \"align\": false,";
            text += "        \"alignLevel\": null";
            text += "      }";
            text += "    }";
            text += "  ],";
            text += "  \"schemaVersion\": 22,";
            text += "  \"style\": \"dark\",";
            text += "  \"tags\": [],";
            text += "  \"templating\": {";
            text += "    \"list\": []";
            text += "  },";
            text += "  \"time\": {";
            text += "    \"from\": \"now-6h\",";
            text += "    \"to\": \"now\"";
            text += "  },";
            text += "  \"timepicker\": {";
            text += "    \"refresh_intervals\": [";
            text += "      \"5s\",";
            text += "      \"10s\",";
            text += "      \"30s\",";
            text += "      \"1m\",";
            text += "      \"5m\",";
            text += "      \"15m\",";
            text += "      \"30m\",";
            text += "      \"1h\",";
            text += "      \"2h\",";
            text += "      \"1d\"";
            text += "    ]";
            text += "  },";
            text += "  \"timezone\": \"\",";
            text += "  \"title\": \"Mano naujas dashboard\",";
            text += "  \"uid\": \"IOoq2fuWz\",";
            text += "  \"version\": 3";
            text += "}";
            
            //return null;
        }


    }
}
