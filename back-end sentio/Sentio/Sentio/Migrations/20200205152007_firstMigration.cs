using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class firstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Databases",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DatabaseName = table.Column<string>(nullable: true),
                    DatabaseType = table.Column<int>(nullable: false),
                    ConnectionString = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Databases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Databases_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tables",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    DatabaseId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tables_Databases_DatabaseId",
                        column: x => x.DatabaseId,
                        principalTable: "Databases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TrackableCustomProperties",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Query = table.Column<string>(nullable: true),
                    DbId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackableCustomProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackableCustomProperties_Databases_DbId",
                        column: x => x.DbId,
                        principalTable: "Databases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TableProperties",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CollumnType = table.Column<int>(nullable: false),
                    TableId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TableProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TableProperties_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TrackableQueries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OperationType = table.Column<int>(nullable: false),
                    TableId = table.Column<Guid>(nullable: false),
                    DbId = table.Column<Guid>(nullable: false),
                    TablePropertyId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackableQueries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackableQueries_Databases_DbId",
                        column: x => x.DbId,
                        principalTable: "Databases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrackableQueries_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrackableQueries_TableProperties_TablePropertyId",
                        column: x => x.TablePropertyId,
                        principalTable: "TableProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Databases_UserId",
                table: "Databases",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TableProperties_TableId",
                table: "TableProperties",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_Tables_DatabaseId",
                table: "Tables",
                column: "DatabaseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableCustomProperties_DbId",
                table: "TrackableCustomProperties",
                column: "DbId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_DbId",
                table: "TrackableQueries",
                column: "DbId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_TableId",
                table: "TrackableQueries",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_TablePropertyId",
                table: "TrackableQueries",
                column: "TablePropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackableCustomProperties");

            migrationBuilder.DropTable(
                name: "TrackableQueries");

            migrationBuilder.DropTable(
                name: "TableProperties");

            migrationBuilder.DropTable(
                name: "Tables");

            migrationBuilder.DropTable(
                name: "Databases");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
