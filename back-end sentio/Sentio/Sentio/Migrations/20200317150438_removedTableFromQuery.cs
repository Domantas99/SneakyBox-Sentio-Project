using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class removedTableFromQuery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrackableQueries_Tables_TableId",
                table: "TrackableQueries");

            migrationBuilder.DropIndex(
                name: "IX_TrackableQueries_TableId",
                table: "TrackableQueries");

            migrationBuilder.DropColumn(
                name: "TableId",
                table: "TrackableQueries");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TableId",
                table: "TrackableQueries",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TrackableQueries_TableId",
                table: "TrackableQueries",
                column: "TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrackableQueries_Tables_TableId",
                table: "TrackableQueries",
                column: "TableId",
                principalTable: "Tables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
