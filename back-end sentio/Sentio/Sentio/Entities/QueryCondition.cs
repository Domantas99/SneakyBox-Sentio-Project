using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class QueryCondition
    {
       [Key]
       public Guid Id { get; set; } = Guid.NewGuid();
       public string ConditionType { get; set; }    // <, <=, == ....
       public string Value { get; set; }        // value
                                                //[ForeignKey("CollumnPropertyId")]
                                                //public CollumnProperty CollumnProperty { get; set; }
                                                //public Guid CollumnPropertyId { get; set; }
       [ForeignKey("TrackableQueryId")]
       public TrackableQuery TrackableQuery { get; set; }
       public Guid TrackableQueryId { get; set; }
    }
}
