using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddLogoToCourses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Courses");
        }
    }
}
