using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class DatabaseViewModel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string DatabaseName { get; set; }
        public DatabaseType DatabaseType { get; set; }
        public string ConnectionString { get; set; }
        public Guid UserId { get; set; }
    }
}
