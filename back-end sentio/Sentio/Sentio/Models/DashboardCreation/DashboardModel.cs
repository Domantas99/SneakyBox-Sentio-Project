using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sentio.Entities;

namespace Sentio.Models.DashboardCreation
{
    // Received DashboardModel
    public class ReceivedDashboardModel
    {
        public string Name { get; set; }
        public Guid DatabaseId { get; set; }
        public ICollection<Panel> Panels { get; set; }
    }
}
