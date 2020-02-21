using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.RequestResults
{
    public class ResponseResult<T>
    {
        public bool IsValid { get; set; }
        public string Message { get; set; }
        public T ReturnResult { get; set; }
    }
}
