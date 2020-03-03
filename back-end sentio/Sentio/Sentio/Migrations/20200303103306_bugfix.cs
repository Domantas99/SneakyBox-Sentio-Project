using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class bugfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrackableQueries_CollumnProperties_CollumnPropertyId",
                table: "TrackableQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_TrackableQueries_Databases_DatabaseId",
                table: "TrackableQueries");

            migrationBuilder.DropIndex(
                name: "IX_TrackableQueries_CollumnPropertyId",
                table: "TrackableQueries");

            migrationBuilder.DropIndex(
                name: "IX_TrackableQueries_DatabaseId",
                table: "TrackableQueries");

            migrationBuilder.DropColumn(
                name: "CollumnPropertyId",
                table: "TrackableQueries");

            migrationBuilder.DropColumn(
                name: "DatabaseId",
                table: "TrackableQueries");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CollumnPropertyId",
                table: "TrackableQueries",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DatabaseId",
                table: "TrackableQueries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_CollumnPropertyId",
                table: "TrackableQueries",
                column: "CollumnPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_DatabaseId",
                table: "TrackableQueries",
                column: "DatabaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrackableQueries_CollumnProperties_CollumnPropertyId",
                table: "TrackableQueries",
                column: "CollumnPropertyId",
                principalTable: "CollumnProperties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrackableQueries_Databases_DatabaseId",
                table: "TrackableQueries",
                column: "DatabaseId",
                principalTable: "Databases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
