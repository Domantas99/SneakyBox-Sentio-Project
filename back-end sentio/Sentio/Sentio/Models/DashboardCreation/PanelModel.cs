
using Sentio.Entities.Visualizations;
using Sentio.Models.DashboardCreation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class PanelModel
    {
        public Guid PanelId { get; set; } = Guid.NewGuid();
        public string PanelType { get; set; } // graph/ single stat
        public Stat Stat { get; set; } 
        // public Guid Id { get; set; }
        public string Legend { get; set; }
        public ICollection<PanelQueryModel> PanelQueries { get; set; }
        //public Guid DashboardId { get; set; }
        public Guid DatabaseId { get; set; }

    }
}
