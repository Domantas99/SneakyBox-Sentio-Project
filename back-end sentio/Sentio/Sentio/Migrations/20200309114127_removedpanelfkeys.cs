using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class removedpanelfkeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanelQueries_Panels_PanelId",
                table: "PanelQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_Panels_Dashboards_DashboardId",
                table: "Panels");

            migrationBuilder.AlterColumn<Guid>(
                name: "DashboardId",
                table: "Panels",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<string>(
                name: "PanelType",
                table: "Panels",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Panels_Dashboards_DashboardId",
                table: "Panels",
                column: "DashboardId",
                principalTable: "Dashboards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PanelQueries_Panels_PanelId",
                table: "PanelQueries");

            migrationBuilder.DropForeignKey(
                name: "FK_Panels_Dashboards_DashboardId",
                table: "Panels");

            migrationBuilder.DropColumn(
                name: "PanelType",
                table: "Panels");

            migrationBuilder.AlterColumn<Guid>(
                name: "DashboardId",
                table: "Panels",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Panels_Dashboards_DashboardId",
                table: "Panels",
                column: "DashboardId",
                principalTable: "Dashboards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
