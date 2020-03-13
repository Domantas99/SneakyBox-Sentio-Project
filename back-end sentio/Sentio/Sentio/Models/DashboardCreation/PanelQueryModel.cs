using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models.DashboardCreation
{
    public class PanelQueryModel
    {
        public Guid Id { get; set; }
        public Guid TrackableQueryId { get; set; }   // trackablequeryid in db
        public Guid PanelId { get; set; } // PanelId in db
        public string Legend { get; set; }

        //public  TableQueryConditions TrackableQuery { get; set; }
        
        //public Guid PanelId { get; set; }
    }
}
