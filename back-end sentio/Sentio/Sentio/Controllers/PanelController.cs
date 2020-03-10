using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Models;
using Sentio.RequestResults;
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


        [HttpPost][Route("Add")]
        public async Task<ActionResult<ResponseResult<PanelModel>>> AddNewPanel([FromBody] PanelModel panel) {
            var result = await _panelService.AddPanel(panel);
            return result;
        }

        public async Task<ActionResult<ResponseResult<ICollection<PanelModel>>>> GetAllUserPanels(Guid userId) {
            var result = await _panelService.GetAllUserPanels(userId);
            return result;
        }

        public async Task<ActionResult<ResponseResult<ICollection<PanelModel>>>> GetAllDbPanels(Guid databaseId) {
            var result = await _panelService.GetAllDbPanels(databaseId);
            return result;
        }



    }
}