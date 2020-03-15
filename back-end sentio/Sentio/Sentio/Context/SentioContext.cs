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
        public DbSet<TrackableCustomQuery> TrackableCustomQueries { get; set; }
        public DbSet<TrackableQuery> TrackableQueries { get; set; }
        public DbSet<QueryCondition> QueryConditions { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<Panel> Panels { get; set; }
        public DbSet<PanelQuery> PanelQueries { get; set; }
        public DbSet<DashboardPanel> DashboardPanels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DashboardPanel>().HasKey(x => new { x.DashboardId, x.PanelId });

            modelBuilder.Entity<DashboardPanel>()
                .HasOne(e => e.Dashboard)
                .WithMany(e => e.DashboardPanels)
                .HasForeignKey(e => e.DashboardId);

            modelBuilder.Entity<DashboardPanel>()
                .HasOne(e => e.Panel)
                .WithMany(e => e.DashboardPanels)
                .HasForeignKey(e => e.PanelId);

            modelBuilder.Entity<Dashboard>()
                .HasOne(i => i.Database)
                .WithMany(b => b.Dashboards)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Panel>().HasMany(dp => dp.DashboardPanels).WithOne(a => a.Panel);
            modelBuilder.Entity<Dashboard>().HasMany(dp => dp.DashboardPanels).WithOne(a => a.Dashboard);

            modelBuilder.Entity<Panel>().HasMany(p => p.PanelQueries).WithOne(q => q.Panel).OnDelete(DeleteBehavior.Cascade);
          


            modelBuilder.Entity<TrackableQuery>();
                //.HasOne(i => i.TableProperty)
                //.WithMany(b => b.TrackableQueries)              
                //.OnDelete(DeleteBehavior.);

            modelBuilder.Entity<TrackableQuery>()
                .HasOne(i => i.Table)
                .WithMany(b => b.TrackableQueries)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}