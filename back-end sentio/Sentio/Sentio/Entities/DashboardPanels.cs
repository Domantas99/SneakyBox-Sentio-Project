using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class DashboardPanels
    {
        [ForeignKey("DashboardId")]
        public virtual Dashboard Dashboard { get; set; }
        public Guid DashboardId { get; set; }
        
        [ForeignKey("PanelId")]
        public virtual Panel Panel { get; set; }
        public Guid PanelId { get; set; }
    }
}
