﻿using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sentio.Entities
{
    public class TrackableQuery
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string OperationType { get; set; }
        //[ForeignKey("TableId")][JsonIgnore]
        //public virtual Table Table { get; set; }
        //public Guid TableId { get; set; }
        public virtual ICollection<QueryCondition> QueryConditions { get; set; }
        public string GeneratedQuery { get; set; }
        public virtual ICollection<PanelQuery> PanelQueries { get; set; }
        [ForeignKey("DatabaseId")]
        public virtual Database Database { get; set; }
        public Guid DatabaseId { get; set; }

    }
}