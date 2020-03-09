using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Models;
using Sentio.Services;
using Sentio.Services.ServiceInterfaces;

namespace Sentio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PanelController : ControllerBase
    {
        private readonly IPanelService _panelService;

        public PanelController(IPanelService panelService) {
            _panelService = panelService;
        }


        [HttpPost]
        [Route("Add")]
        public async Task AddNewPanel([FromBody] PanelModel panel) {
            var result = await _panelService.AddPanel(panel);
        }

    }
}