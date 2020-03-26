using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities.Visualizations
{
    public class Stat
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Formula { get; set; }
        public string Query { get; set; } 
        //[ForeignKey("PanelId")]
        //public Panel Panel { get; set; }
        //public Guid PanelId { get; set; }
    }
}
