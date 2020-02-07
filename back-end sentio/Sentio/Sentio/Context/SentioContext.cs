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
        public DbSet<CollumnProperty> CollumnProperties { get; set; }
        public DbSet<TrackableCustomProperty> TrackableCustomProperties { get; set; }
        public DbSet<TrackableQuery> TrackableQueries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrackableQuery>()
                .HasOne(i => i.TableProperty)
                .WithMany(b => b.TrackableQueries)              
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TrackableQuery>()
                .HasOne(i => i.Table)
                .WithMany(b => b.TrackableQueries)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}