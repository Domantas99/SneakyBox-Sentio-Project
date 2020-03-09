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
    }
}
