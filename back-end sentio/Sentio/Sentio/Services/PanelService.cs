using AutoMapper;
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
            var panel = _mapper.Map<Panel>(panelModel);
            // neveikia mapping
            var o = panel;
            //_context.Panels
            
            return null;
        }



    }
}
