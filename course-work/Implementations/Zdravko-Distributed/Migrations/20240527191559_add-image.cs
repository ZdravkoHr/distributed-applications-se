using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zdravko_Distributed.Migrations
{
    /// <inheritdoc />
    public partial class addimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imgUrl",
                table: "drugs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "imgUrl",
                table: "customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "imgUrl",
                table: "apothecaries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imgUrl",
                table: "drugs");

            migrationBuilder.DropColumn(
                name: "imgUrl",
                table: "customers");

            migrationBuilder.DropColumn(
                name: "imgUrl",
                table: "apothecaries");
        }
    }
}
