using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sentio.Entities;
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

        [HttpGet("all-panels/{userId}")]
        public async Task<ActionResult<ResponseResult<ICollection<Panel>>>> GetAllUserPanels(Guid userId) {
            var result = await _panelService.GetAllUserPanels(userId);
            return result;
        }

        [HttpGet]
        [Route("db-panels")]
        public async Task<ActionResult<ResponseResult<ICollection<Panel>>>> GetAllDbPanels(Guid databaseId) {
            var result = await _panelService.GetAllDbPanels(databaseId);
            return result;
        }

        [HttpDelete("delete/{panelId}")]
        public async Task<ActionResult<ResponseResult<Panel>>> DeletePanel(Guid panelId) {
            var result = await _panelService.DeletePanel(panelId);
            return result;
        } 



    }
}