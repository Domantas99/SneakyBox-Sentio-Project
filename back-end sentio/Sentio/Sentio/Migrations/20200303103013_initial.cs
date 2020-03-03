using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class initial : Migration
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
                    DatabaseId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tables_Databases_DatabaseId",
                        column: x => x.DatabaseId,
                        principalTable: "Databases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrackableCustomQueries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Query = table.Column<string>(nullable: true),
                    DbId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackableCustomQueries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackableCustomQueries_Databases_DbId",
                        column: x => x.DbId,
                        principalTable: "Databases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CollumnProperties",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    TableId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollumnProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CollumnProperties_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrackableQueries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OperationType = table.Column<string>(nullable: true),
                    TableId = table.Column<Guid>(nullable: false),
                    CollumnPropertyId = table.Column<Guid>(nullable: true),
                    DatabaseId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackableQueries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackableQueries_CollumnProperties_CollumnPropertyId",
                        column: x => x.CollumnPropertyId,
                        principalTable: "CollumnProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TrackableQueries_Databases_DatabaseId",
                        column: x => x.DatabaseId,
                        principalTable: "Databases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TrackableQueries_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QueryConditions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ConditionType = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    TrackableQueryId = table.Column<Guid>(nullable: false),
                    CollumnPropertyId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QueryConditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QueryConditions_CollumnProperties_CollumnPropertyId",
                        column: x => x.CollumnPropertyId,
                        principalTable: "CollumnProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QueryConditions_TrackableQueries_TrackableQueryId",
                        column: x => x.TrackableQueryId,
                        principalTable: "TrackableQueries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CollumnProperties_TableId",
                table: "CollumnProperties",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_Databases_UserId",
                table: "Databases",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QueryConditions_CollumnPropertyId",
                table: "QueryConditions",
                column: "CollumnPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_QueryConditions_TrackableQueryId",
                table: "QueryConditions",
                column: "TrackableQueryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tables_DatabaseId",
                table: "Tables",
                column: "DatabaseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableCustomQueries_DbId",
                table: "TrackableCustomQueries",
                column: "DbId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_CollumnPropertyId",
                table: "TrackableQueries",
                column: "CollumnPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_DatabaseId",
                table: "TrackableQueries",
                column: "DatabaseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_TableId",
                table: "TrackableQueries",
                column: "TableId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QueryConditions");

            migrationBuilder.DropTable(
                name: "TrackableCustomQueries");

            migrationBuilder.DropTable(
                name: "TrackableQueries");

            migrationBuilder.DropTable(
                name: "CollumnProperties");

            migrationBuilder.DropTable(
                name: "Tables");

            migrationBuilder.DropTable(
                name: "Databases");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
