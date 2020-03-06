﻿using System;
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
        public virtual TrackableQuery TrackableQuery { get; set; }
        public Guid TrackableQueryId { get; set; }

        [ForeignKey("PanelId")]
        public virtual Panel Panel { get; set; }
        public Guid PanelId { get; set; }

    }
}
