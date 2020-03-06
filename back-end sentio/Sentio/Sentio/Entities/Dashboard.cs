using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class Dashboard
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Panel> Panels { get; set; }
    }
}
