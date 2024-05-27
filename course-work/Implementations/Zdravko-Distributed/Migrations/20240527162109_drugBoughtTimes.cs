using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zdravko_Distributed.Migrations
{
    /// <inheritdoc />
    public partial class drugBoughtTimes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "boughtTimes",
                table: "drugs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "boughtTimes",
                table: "drugs");
        }
    }
}
