using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class penelFKedit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanelQueries_Panels_PanelId",
                table: "PanelQueries");

            migrationBuilder.AlterColumn<Guid>(
                name: "PanelId",
                table: "PanelQueries",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PanelQueries_Panels_PanelId",
                table: "PanelQueries",
                column: "PanelId",
                principalTable: "Panels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanelQueries_Panels_PanelId",
                table: "PanelQueries");

            migrationBuilder.AlterColumn<Guid>(
                name: "PanelId",
                table: "PanelQueries",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_PanelQueries_Panels_PanelId",
                table: "PanelQueries",
                column: "PanelId",
                principalTable: "Panels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
