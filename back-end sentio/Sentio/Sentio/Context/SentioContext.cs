using Microsoft.EntityFrameworkCore;
using Sentio.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sentio.Context
{
    public class SentioContext : DbContext
    {
        public SentioContext(DbContextOptions<SentioContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet <Database> Databases { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<CollumnProperty> TableProperties { get; set; }
        public DbSet<TrackableCustomProperty> TrackableCustomProperties { get; set; }
        public DbSet<TrackableQuery> TrackableQueries { get; set; }
    }
}
