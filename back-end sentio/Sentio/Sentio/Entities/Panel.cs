using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class Panel
    {
        public Guid Id { get; set; }
        public string Legend { get; set; }
        public virtual ICollection<PanelQuery> PanelQueries { get; set; }
        // Later add size and other options
        [ForeignKey("DashboardId")]
        public virtual Dashboard Dashboard { get; set; }
        public Guid DashboardId { get; set; }
    }
}
