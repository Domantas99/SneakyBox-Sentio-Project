﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class TrackableCustomProperty
    {
        [Key]
        public Guid Id { get; set; }
        public string Query { get; set; }
        [ForeignKey("DbId")]
        public virtual Database Database { get; set; }
        public Guid DbId { get; set; }
    }
}
