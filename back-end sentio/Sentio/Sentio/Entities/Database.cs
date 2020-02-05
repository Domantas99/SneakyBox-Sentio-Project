using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class Database
    {
        [Key]
        public Guid Id { get; set; }
        public string DatabaseName { get; set; }
        public DatabaseType DatabaseType { get; set; }
        public string ConnectionString { get; set; }
        
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public Guid UserId { get; set; }
        public virtual ICollection<Table> Tables { get; set; }
        public virtual ICollection<TrackableQuery> TrackableQueries { get; set; }
        public virtual ICollection<TrackableCustomProperty> TrackableCustomProperties { get; set; }
    }
}
