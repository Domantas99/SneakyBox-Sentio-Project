﻿using Sentio.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Models
{
    public class TableProperty
    {
        public Guid Id { get; set; }
        public string CollumnName { get; set; }
        public string CollumnType { get; set; }
    }
}
