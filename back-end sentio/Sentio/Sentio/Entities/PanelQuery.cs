using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class PanelQuery
    {
        public Guid Id { get; set; }
        public string Legend { get; set; }
        [ForeignKey("TrackableQueryId")]
        public TrackableQuery TrackableQuery { get; set; }
        public Guid TrackableQueryId { get; set; }
    }
}
