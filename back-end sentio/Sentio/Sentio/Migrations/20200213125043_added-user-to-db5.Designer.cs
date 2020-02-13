﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Sentio.Context;

namespace Sentio.Migrations
{
    [DbContext(typeof(SentioContext))]
    [Migration("20200213125043_added-user-to-db5")]
    partial class addedusertodb5
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("Sentio.Entities.TrackableCustomProperty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("DbId");

                    b.Property<string>("Query");

                    b.HasKey("Id");

                    b.HasIndex("DbId");

                    b.ToTable("TrackableCustomProperties");
                });

            modelBuilder.Entity("Sentio.Entities.TrackableQuery", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("DbId");

                    b.Property<int>("OperationType");

                    b.Property<Guid>("TableId");

                    b.Property<Guid>("TablePropertyId");

                    b.HasKey("Id");

                    b.HasIndex("DbId");

                    b.HasIndex("TableId");

                    b.HasIndex("TablePropertyId");

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

            modelBuilder.Entity("Sentio.Entities.Table", b =>
                {
                    b.HasOne("Sentio.Entities.Database", "Database")
                        .WithMany("Tables")
                        .HasForeignKey("DatabaseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.TrackableCustomProperty", b =>
                {
                    b.HasOne("Sentio.Entities.Database", "Database")
                        .WithMany("TrackableCustomProperties")
                        .HasForeignKey("DbId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sentio.Entities.TrackableQuery", b =>
                {
                    b.HasOne("Sentio.Entities.Database", "Database")
                        .WithMany("TrackableQueries")
                        .HasForeignKey("DbId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sentio.Entities.Table", "Table")
                        .WithMany("TrackableQueries")
                        .HasForeignKey("TableId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Sentio.Entities.CollumnProperty", "TableProperty")
                        .WithMany("TrackableQueries")
                        .HasForeignKey("TablePropertyId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
