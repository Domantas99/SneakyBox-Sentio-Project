using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class Table
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public virtual ICollection<CollumnProperty> CollumnProperties { get; set; }
        // public virtual ICollection<CollumnProperty> CollumnProperties { get; set; }  Query
        //  public virtual ICollection<CollumnProperty> CollumnProperties { get; set; } CustomQuery
        [ForeignKey("DatabaseId")]
        public virtual Database Database { get; set; }
        public Guid DatabaseId { get; set; }
        //public virtual ICollection<TrackableQuery> TrackableQueries { get; set; }
    }
}
