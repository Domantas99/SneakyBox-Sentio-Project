﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{   // Prideti Id ir frontende naudoti vietoj connectionStr
    public class ConnectionValidationResult
    {
        public bool IsValid { get; set; }
        public string Message { get; set; }
        public string ConnectionString { get; set; }
    }
}
