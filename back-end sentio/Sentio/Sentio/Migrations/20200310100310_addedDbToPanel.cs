using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class addedDbToPanel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DatabaseId",
                table: "Panels",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Panels_DatabaseId",
                table: "Panels",
                column: "DatabaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Panels_Databases_DatabaseId",
                table: "Panels",
                column: "DatabaseId",
                principalTable: "Databases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Panels_Databases_DatabaseId",
                table: "Panels");

            migrationBuilder.DropIndex(
                name: "IX_Panels_DatabaseId",
                table: "Panels");

            migrationBuilder.DropColumn(
                name: "DatabaseId",
                table: "Panels");
        }
    }
}
