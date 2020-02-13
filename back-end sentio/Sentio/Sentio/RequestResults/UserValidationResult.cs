using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.RequestResults
{
    public class UserValidationResult
    {
        public bool IsValid { get; set; } 
        public string Message { get; set; }
        public Guid Id { get; set; }
    }
}
