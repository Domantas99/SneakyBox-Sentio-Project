using Sentio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.DTO
{
    public class GrafanaProps
    {
        public FileProps Dashboard { get; set; }
        public FileProps DbMetrics { get; set; }
    }
}
