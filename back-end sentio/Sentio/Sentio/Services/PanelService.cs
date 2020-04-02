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
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services
{
    public class PanelService : IPanelService
    {
        private readonly SentioContext _context;
        private readonly IMapper _mapper;

        public PanelService(SentioContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResponseResult<Panel>> UpdatePanel(PanelModel panelModel) {
            bool flag = false;
            string msg = "Panel not found";
            var currentPanel = await _context.Panels.Include(a=>a.Stat).FirstOrDefaultAsync(p => p.Id == panelModel.PanelId);
            if (currentPanel != null)
            {
                try
                {

                    var panelQueryList = CreatePanelQueries(panelModel.PanelQueries);
                    currentPanel.Legend = panelModel.Legend;
                    currentPanel.PanelType = panelModel.PanelType;
                    var pqToRemove = _context.PanelQueries.Where(p => p.PanelId == currentPanel.Id);
                    _context.PanelQueries.RemoveRange(pqToRemove);
                    await _context.SaveChangesAsync();
                    currentPanel.PanelQueries = panelQueryList;
                    await _context.SaveChangesAsync();
                    if (panelModel.Stat != null)
                    {
                      //  panelModel.Stat.Id = currentPanel.Stat.Id;
                        currentPanel.Stat.Formula = panelModel.Stat.Formula;
                        currentPanel.Stat.Query = GenerateQueryFromFormula(panelModel.Stat.Formula, panelQueryList);
                       // currentPanel.Stat.Query;
                    }

                    await _context.SaveChangesAsync();

                    flag = true;
                    msg = "Panel updated successfully";
                }
                catch (Exception e) {
                    var a = e;

                }
            }
            return new ResponseResult<Panel> { IsValid = flag, Message = msg, ReturnResult = currentPanel };
        }

        private string GenerateQueryFromFormula(string formula, ICollection<PanelQuery> panelQueries) {
            string query = "";
            string alphabet = "ABCDEFGHIY";
            var letterByQueryNameDictionary = new Dictionary<char, string>();
            for (int i = 0; i < panelQueries.Count; i++)
            {
                //string name = _context.PanelQueries.Include(x => x.TrackableQuery).FirstOrDefault(x => x.Id == panelQueries.ElementAt(i).Id).TrackableQuery.Name;
                var p = _context.PanelQueries.Include(x => x.TrackableQuery);
                var tracQ = p.FirstOrDefault(x => x.TrackableQueryId == panelQueries.ElementAt(i).TrackableQueryId);//.TrackableQuery.Name;
                string name = tracQ.TrackableQuery.Name;
                letterByQueryNameDictionary.Add(alphabet[i], name);
            }
            for (int i = 0; i < formula.Length; i++)
            {
                if (letterByQueryNameDictionary.ContainsKey(formula[i]))
                {
                    query += letterByQueryNameDictionary[formula[i]];
                } else
                {
                    query += formula[i];
                }

            }

            return query;
        }

        private List<PanelQuery> CreatePanelQueries(ICollection<PanelQueryModel> panelQueryModelList) {
            List<PanelQuery> list = new List<PanelQuery>();
            for (int i = 0; i < panelQueryModelList.Count; i++)
            {
                var panelQuery = new PanelQuery
                {
                    Id = Guid.NewGuid(),
                    Legend = panelQueryModelList.ElementAt(i).Legend,
                    TrackableQueryId = panelQueryModelList.ElementAt(i).TrackableQueryId
                };
                list.Add(panelQuery);
            }
            return list;
        }

        public async Task<ResponseResult<PanelModel>> AddPanel(PanelModel panelModel) {
            try
            {
                var panelQueryModelList = panelModel.PanelQueries;
                var panelQueryList = CreatePanelQueries(panelQueryModelList);


                var panel = new Panel
                {
                    Id = Guid.NewGuid(),
                    Legend = panelModel.Legend,
                    PanelType = panelModel.PanelType,
                    PanelQueries = panelQueryList,
                    DatabaseId = panelModel.DatabaseId
                };
                if (panelModel.Stat != null)
                {
                    panelModel.Stat.Query = GenerateQueryFromFormula(panelModel.Stat.Formula, panelQueryList);
                    var id = Guid.NewGuid();
                    panelModel.Stat.Id = id;
                    //panelModel.Stat.PanelId = panel.Id;
                    panel.Stat = panelModel.Stat;
                    panel.StatId = id;
                }
                var res = _context.Panels.Add(panel);
                int x = await _context.SaveChangesAsync();


                return new ResponseResult<PanelModel> { IsValid = true, Message = "Added successfully", ReturnResult = panelModel };
            }
            catch (Exception e) {
                var a = e;
                return null;
            }

            }

        public async Task<ResponseResult<Panel>> DeletePanel(Guid panelId)
        {
            var panel = await _context.Panels.FirstOrDefaultAsync(p => p.Id == panelId);
            string message;
            bool flag = true;
            if (panel != null)
            {
                _context.Panels.Remove(panel);
                _context.SaveChanges();
                message = "Panel removed successfully";
            }
            else {
                message = "Panel not found";
                flag = false;
            } 
            return new ResponseResult<Panel> { IsValid = flag, Message = message, ReturnResult = panel };
        }

        // Unnecessary(but maybe be needed later on) because there is filtering by dbId in frontend.
        public async Task<ResponseResult<ICollection<Panel>>> GetAllDbPanels(Guid databaseId)
        {
            var panels = await _context.Panels.Where(p => p.DatabaseId == databaseId).ToListAsync();
            return new ResponseResult<ICollection<Panel>> { IsValid = true, Message = "Success", ReturnResult = panels };
        }

        public async Task<ResponseResult<ICollection<Panel>>> GetAllUserPanels(Guid userId)
        {
            //var panels = await _context.Panels.Include(p => p.Database).Where(p => p.Database.UserId == userId).ToListAsync();
            var panels = await _context.Panels.Include(p => p.PanelQueries).Include(p => p.Database).Where(p => p.Database.UserId == userId).ToListAsync();
            return new ResponseResult<ICollection<Panel>> { IsValid = true, Message = "Success", ReturnResult = panels };       
        }
    }
}