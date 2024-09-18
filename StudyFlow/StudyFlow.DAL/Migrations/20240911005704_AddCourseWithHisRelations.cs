using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseWithHisRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scheduled_Course_CourseId",
                table: "Scheduled");

            migrationBuilder.DropIndex(
                name: "IX_Scheduled_CourseId",
                table: "Scheduled");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Scheduled");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CourseId",
                table: "Scheduled",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Scheduled_CourseId",
                table: "Scheduled",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Scheduled_Course_CourseId",
                table: "Scheduled",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id");
        }
    }
}
