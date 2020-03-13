using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class DashboardPanel
    {

        //Turi turet dar savo guid nes gali kartotis
        public Guid Id { get; set; }
        //[ForeignKey("DashboardId")]
        public virtual Dashboard Dashboard { get; set; }
        public Guid DashboardId { get; set; }
        
        //[ForeignKey("PanelId")]
        public virtual Panel Panel { get; set; }
        public Guid PanelId { get; set; }


    }
}
