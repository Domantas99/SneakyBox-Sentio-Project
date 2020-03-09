using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class PanelQuery
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Legend { get; set; }
        [ForeignKey("TrackableQueryId")]
        public virtual TrackableQuery TrackableQuery { get; set; }
        public Guid TrackableQueryId { get; set; }

        // Nereikia nes gali turet ir kelias panel
        //[ForeignKey("PanelId")]
        //public virtual Panel Panel { get; set; }
        //public Guid PanelId { get; set; }

    }
}
