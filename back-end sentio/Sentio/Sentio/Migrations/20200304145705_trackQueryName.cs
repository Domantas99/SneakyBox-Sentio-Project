using Microsoft.EntityFrameworkCore.Migrations;

namespace Sentio.Migrations
{
    public partial class trackQueryName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "TrackableQueries",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "TrackableQueries");
        }
    }
}
