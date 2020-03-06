﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Sentio.Context;

namespace Sentio.Migrations
{
    [DbContext(typeof(SentioContext))]
    partial class SentioContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Sentio.Entities.CollumnProperty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<Guid>("TableId");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("TableId");

                    b.ToTable("CollumnProperties");
                });

            modelBuilder.Entity("Sentio.Entities.Dashboard", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Dashboards");
                });

            modelBuilder.Entity("Sentio.Entities.Database", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConnectionString");

                    b.Property<string>("DatabaseName");

                    b.Property<int>("DatabaseType");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Databases");
                });

            modelBuilder.Entity("Sentio.Entities.Panel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("DashboardId");

                    b.Property<string>("Legend");

                    b.HasKey("Id");

                    b.HasIndex("DashboardId");

                    b.ToTable("Panels");
                });

            modelBuilder.Entity("Sentio.Entities.PanelQuery", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Legend");

                    b.Property<Guid>("PanelId");

                    b.Property<Guid>("TrackableQueryId");

                    b.HasKey("Id");

                    b.HasIndex("PanelId");

                    b.HasIndex("TrackableQueryId");

                    b.ToTable("PanelQueries");
                });

            modelBuilder.Entity("Sentio.Entities.QueryCondition", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CollumnPropertyId");

                    b.Property<string>("ConditionType");

                    b.Property<Guid>("TrackableQueryId");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.HasIndex("CollumnPropertyId");

                    b.HasIndex("TrackableQueryId");

                    b.ToTable("QueryConditions");
                });

            modelBuilder.Entity("Sentio.Entities.Table", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("DatabaseId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("DatabaseId");

                    b.ToTable("Tables");
                });

            modelBuilder.Entity("Sentio.Entities.TrackableCustomQuery", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("DbId");

                    b.Property<string>("Query");

                    b.HasKey("Id");

                    b.HasIndex("DbId");

                    b.ToTable("TrackableCustomQueries");
                });

            modelBuilder.Entity("Sentio.Entities.TrackableQuery", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("GeneratedQuery");

                    b.Property<string>("Name");

                    b.Property<string>("OperationType");

                    b.Property<Guid>("TableId");

                    b.HasKey("Id");

                    b.HasIndex("TableId");

                    b.ToTable("TrackableQueries");
                });

            modelBuilder.Entity("Sentio.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Sentio.Entities.CollumnProperty", b =>
                {
                    b.HasOne("Sentio.Entities.Table", "Table")
                        .WithMany("CollumnProperties")
                        .HasForeignKey("TableId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.Database", b =>
                {
                    b.HasOne("Sentio.Entities.User", "User")
                        .WithMany("Databases")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.Panel", b =>
                {
                    b.HasOne("Sentio.Entities.Dashboard", "Dashboard")
                        .WithMany("Panels")
                        .HasForeignKey("DashboardId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.PanelQuery", b =>
                {
                    b.HasOne("Sentio.Entities.Panel", "Panel")
                        .WithMany("PanelQueries")
                        .HasForeignKey("PanelId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sentio.Entities.TrackableQuery", "TrackableQuery")
                        .WithMany("PanelQueries")
                        .HasForeignKey("TrackableQueryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.QueryCondition", b =>
                {
                    b.HasOne("Sentio.Entities.CollumnProperty", "CollumnProperty")
                        .WithMany()
                        .HasForeignKey("CollumnPropertyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sentio.Entities.TrackableQuery", "TrackableQuery")
                        .WithMany("QueryConditions")
                        .HasForeignKey("TrackableQueryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.Table", b =>
                {
                    b.HasOne("Sentio.Entities.Database", "Database")
                        .WithMany("Tables")
                        .HasForeignKey("DatabaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.TrackableCustomQuery", b =>
                {
                    b.HasOne("Sentio.Entities.Database", "Database")
                        .WithMany("TrackableCustomProperties")
                        .HasForeignKey("DbId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.TrackableQuery", b =>
                {
                    b.HasOne("Sentio.Entities.Table", "Table")
                        .WithMany("TrackableQueries")
                        .HasForeignKey("TableId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
