using Sentio.Entities;
using Sentio.Models;
using Sentio.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Services.ServiceInterfaces
{
    public interface IPanelService
    {
        Task<ResponseResult<PanelModel>> AddPanel(PanelModel panelModel);
        Task<ResponseResult<ICollection<Panel>>> GetAllUserPanels(Guid userId);
        Task<ResponseResult<ICollection<Panel>>> GetAllDbPanels(Guid databaseId);
    }
}
