
using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class TrackableQuery
    {
        [Key]
        public Guid Id { get; set; }
        public OperationType OperationType { get; set; }

        [ForeignKey("TableId")]        
        public virtual Table Table { get; set; }
        public Guid TableId { get; set; }
        
        [ForeignKey("DbId")]
        public virtual Database Database { get; set; }
        public Guid DbId { get; set; }

        // public virtual ICollection<QueryCondition> QueryConditions { get; set; }
        [ForeignKey("TablePropertyId")]
        public virtual TableProperty TableProperty { get; set; }
        public Guid TablePropertyId { get; set; } 
    }
}
