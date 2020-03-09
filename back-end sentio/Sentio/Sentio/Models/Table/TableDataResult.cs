using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class TableDataResult
    {
        public bool IsValid { get; set; }
        public string Message { get; set; }
        public ICollection<TableModel> TableModels { get; set; }
    }
}
