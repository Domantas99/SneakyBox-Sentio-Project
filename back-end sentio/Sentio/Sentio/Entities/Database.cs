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
        public Guid Id { get; set; } = Guid.Parse("a5662e5a-b048-4618-b1dd-f188d5fff625");//Guid.NewGuid();
        public string DatabaseName { get; set; }
        public DatabaseType DatabaseType { get; set; }
        public string ConnectionString { get; set; }
        
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public Guid UserId { get; set; } = Guid.Parse("72c50eeb-bb66-47fa-ae1d-63eacbeb74fe");
        public virtual ICollection<Table> Tables { get; set; }
        public virtual ICollection<TrackableQuery> TrackableQueries { get; set; }
        public virtual ICollection<TrackableCustomProperty> TrackableCustomProperties { get; set; }
    }
}
