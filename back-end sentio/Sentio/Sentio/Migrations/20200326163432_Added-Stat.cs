using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class AddedStat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StatId",
                table: "Panels",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StatVisualizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Formula = table.Column<string>(nullable: true),
                    Query = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatVisualizations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Panels_StatId",
                table: "Panels",
                column: "StatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Panels_StatVisualizations_StatId",
                table: "Panels",
                column: "StatId",
                principalTable: "StatVisualizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Panels_StatVisualizations_StatId",
                table: "Panels");

            migrationBuilder.DropTable(
                name: "StatVisualizations");

            migrationBuilder.DropIndex(
                name: "IX_Panels_StatId",
                table: "Panels");

            migrationBuilder.DropColumn(
                name: "StatId",
                table: "Panels");
        }
    }
}
