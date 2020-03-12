using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class Dashboard
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Panel> Panels { get; set; }
        [ForeignKey("DatabaseId")]
        public virtual Database Database { get; set; }
        public Guid DatabaseId { get; set; }
    }
}
