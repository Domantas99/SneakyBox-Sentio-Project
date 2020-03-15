using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class dbToQuery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DatabaseId",
                table: "TrackableQueries",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "DashboardPanels",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_DatabaseId",
                table: "TrackableQueries",
                column: "DatabaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrackableQueries_Databases_DatabaseId",
                table: "TrackableQueries",
                column: "DatabaseId",
                principalTable: "Databases",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrackableQueries_Databases_DatabaseId",
                table: "TrackableQueries");

            migrationBuilder.DropIndex(
                name: "IX_TrackableQueries_DatabaseId",
                table: "TrackableQueries");

            migrationBuilder.DropColumn(
                name: "DatabaseId",
                table: "TrackableQueries");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "DashboardPanels");
        }
    }
}
