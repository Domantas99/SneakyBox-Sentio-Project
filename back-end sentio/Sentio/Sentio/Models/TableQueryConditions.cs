using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class TableQueryConditions
    {
        public Guid TableId { get; set; }
        public ICollection<QueryConditionModel> Conditions { get; set; }
        public string Operation { get; set; }
    }
}
