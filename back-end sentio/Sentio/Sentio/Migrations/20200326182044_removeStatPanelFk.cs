using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class removeStatPanelFk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StatVisualizations_Panels_PanelId",
                table: "StatVisualizations");

            migrationBuilder.DropIndex(
                name: "IX_StatVisualizations_PanelId",
                table: "StatVisualizations");

            migrationBuilder.DropColumn(
                name: "PanelId",
                table: "StatVisualizations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PanelId",
                table: "StatVisualizations",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_StatVisualizations_PanelId",
                table: "StatVisualizations",
                column: "PanelId");

            migrationBuilder.AddForeignKey(
                name: "FK_StatVisualizations_Panels_PanelId",
                table: "StatVisualizations",
                column: "PanelId",
                principalTable: "Panels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
