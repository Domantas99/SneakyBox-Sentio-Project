using Sentio.Entities.Visualizations;
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
        public string PanelType { get; set; }
        //[ForeignKey("GraphId")]
        //public Graph Graph { get; set; }
        //public Guid GraphId { get; set; }

        [ForeignKey("StatId")]
        public virtual Stat Stat { get; set; }
        public Guid? StatId { get; set; }

        //[ForeignKey("GaugeId")]
        //public Gauge Gauge { get; set; }
        //public Guid GaugeId { get; set; }

        public Guid Id { get; set; } = Guid.NewGuid();
        public string Legend { get; set; }
        public virtual ICollection<PanelQuery> PanelQueries { get; set; }
        [ForeignKey("DatabaseId")]
        public virtual Database Database { get; set; }
        public Guid DatabaseId { get; set; }
        public virtual ICollection<DashboardPanel> DashboardPanels { get; set; }

    }
}
