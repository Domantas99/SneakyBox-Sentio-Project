using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.DTO
{
    public class DatabaseConnection
    {
        public string ConnectionString { get; set; }
        public DatabaseType DatabaseType{ get; set; }
    }
}
