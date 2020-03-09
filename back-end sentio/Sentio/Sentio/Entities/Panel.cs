using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    // reikia nustatyt ar tai graph'as ar singlestat
    public class Panel
    {
        public string PanelType { get; set; } // graph/ single stat
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Legend { get; set; }
        public virtual ICollection<PanelQuery> PanelQueries { get; set; }
        // Later add size and other options
        
        
        // 
        //[ForeignKey("DashboardId")]
        //public virtual Dashboard Dashboard { get; set; }
        //public Guid DashboardId { get; set; }
    }
}
