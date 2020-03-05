using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class addedgeneratequeryprop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GeneratedQuery",
                table: "TrackableQueries",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GeneratedQuery",
                table: "TrackableQueries");
        }
    }
}
