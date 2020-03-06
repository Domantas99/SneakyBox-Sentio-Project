using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class addedNewModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dashboards",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dashboards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Panels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Legend = table.Column<string>(nullable: true),
                    DashboardId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Panels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Panels_Dashboards_DashboardId",
                        column: x => x.DashboardId,
                        principalTable: "Dashboards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PanelQueries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Legend = table.Column<string>(nullable: true),
                    TrackableQueryId = table.Column<Guid>(nullable: false),
                    PanelId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PanelQueries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PanelQueries_Panels_PanelId",
                        column: x => x.PanelId,
                        principalTable: "Panels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PanelQueries_TrackableQueries_TrackableQueryId",
                        column: x => x.TrackableQueryId,
                        principalTable: "TrackableQueries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PanelQueries_PanelId",
                table: "PanelQueries",
                column: "PanelId");

            migrationBuilder.CreateIndex(
                name: "IX_PanelQueries_TrackableQueryId",
                table: "PanelQueries",
                column: "TrackableQueryId");

            migrationBuilder.CreateIndex(
                name: "IX_Panels_DashboardId",
                table: "Panels",
                column: "DashboardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PanelQueries");

            migrationBuilder.DropTable(
                name: "Panels");

            migrationBuilder.DropTable(
                name: "Dashboards");
        }
    }
}
