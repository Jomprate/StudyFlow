using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddSubjectLists : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AlternateLinks",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "GoogleDriveLinks",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "YouTubeVideos",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlternateLinks",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "GoogleDriveLinks",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "YouTubeVideos",
                table: "Subjects");
        }
    }
}
