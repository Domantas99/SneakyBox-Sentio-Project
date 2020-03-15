using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class TableQueryConditions
    {
        public string Name { get; set; }
        public Guid TableId { get; set; }
        public string TableName { get; set; }  // to generate table from
        public ICollection<QueryConditionModel> Conditions { get; set; }
        public string Operation { get; set; }
        public Guid DatabaseId { get; set; }
    }
}
