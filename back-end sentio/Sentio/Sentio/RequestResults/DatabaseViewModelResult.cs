using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class DatabaseViewModelResult
    {
        public bool IsValid { get; set; }
        public string Message { get; set; }
        public DatabaseViewModel Database { get; set; }
    }
}
