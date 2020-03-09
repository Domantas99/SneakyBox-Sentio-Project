using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class QueryConditionModel
    {
        public TableProperty TableProperty { get; set; }
        public string FilterOption { get; set; }
        public string FilterValue { get; set; }

    }
}
