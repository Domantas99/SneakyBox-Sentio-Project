using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class TableProperty
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public CollumnType CollumnType { get; set; }       
    }
}
