﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Sentio.Context;
using Sentio.Entities;
using Sentio.Models;
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

        public async Task<ResponseResult<PanelModel>> AddPanel(PanelModel panelModel) {
            //var pq = _mapper.Map<PanelQuery>(panelModel.PanelQueries);
            var panelQueryList = new List<PanelQuery>();
            var panelQueryModelList = panelModel.PanelQueries;
            for (int i = 0; i < panelQueryModelList.Count; i++)
            {
                var panelQuery = new PanelQuery 
                { 
                    Id = Guid.NewGuid(),
                    Legend = panelQueryModelList.ElementAt(i).Legend,
                    TrackableQueryId = panelQueryModelList.ElementAt(i).TrackableQueryId
                };
                panelQueryList.Add(panelQuery);
            }
            var panel = new Panel
            {
                Id = Guid.NewGuid(),
                Legend = panelModel.Legend,
                PanelType = panelModel.PanelType,
                PanelQueries = panelQueryList,
                DatabaseId = panelModel.DatabaseId
            };
            var res = _context.Panels.Add(panel);
            // res = res.Entity();
            await _context.SaveChangesAsync();
            //var o = 2;

            //var panel = _mapper.Map<Panel>(panelModel);
            // neveikia mapping
            //var o = panel;
            //_context.Panels
            
            return new ResponseResult<PanelModel> { IsValid=true, Message="Added successfully", ReturnResult = panelModel};
        }

        // irgi nebutina nes pagal filtra atrinks
        public async Task<ResponseResult<ICollection<Panel>>> GetAllDbPanels(Guid databaseId)
        {
            var panels = await _context.Panels.Where(p => p.DatabaseId == databaseId).ToListAsync();
            return new ResponseResult<ICollection<Panel>> { IsValid = true, Message = "Success", ReturnResult = panels };
        }

        public async Task<ResponseResult<ICollection<Panel>>> GetAllUserPanels(Guid userId)
        {
            var panels = await _context.Panels.Include(p => p.Database).Where(p => p.Database.UserId == userId).ToListAsync();
            return new ResponseResult<ICollection<Panel>> { IsValid = true, Message = "Success", ReturnResult = panels };       
        }
    }
}
