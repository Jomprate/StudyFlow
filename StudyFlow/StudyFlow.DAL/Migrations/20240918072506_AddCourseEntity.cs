using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollment_Courses_CourseId",
                table: "Enrollment");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollment_Users_StudentId",
                table: "Enrollment");

            migrationBuilder.DropForeignKey(
                name: "FK_Scheduled_Subject_SubjectId",
                table: "Scheduled");

            migrationBuilder.DropForeignKey(
                name: "FK_Subject_Courses_CourseId",
                table: "Subject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subject",
                table: "Subject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Scheduled",
                table: "Scheduled");

            migrationBuilder.DropIndex(
                name: "IX_Scheduled_SubjectId",
                table: "Scheduled");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enrollment",
                table: "Enrollment");

            migrationBuilder.RenameTable(
                name: "Subject",
                newName: "Subjects");

            migrationBuilder.RenameTable(
                name: "Scheduled",
                newName: "Scheduleds");

            migrationBuilder.RenameTable(
                name: "Enrollment",
                newName: "Enrollments");

            migrationBuilder.RenameColumn(
                name: "Logo",
                table: "Courses",
                newName: "Description");

            migrationBuilder.RenameIndex(
                name: "IX_Subject_CourseId",
                table: "Subjects",
                newName: "IX_Subjects_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Enrollment_CourseId",
                table: "Enrollments",
                newName: "IX_Enrollments_CourseId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HaveLogo",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subjects",
                table: "Subjects",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Scheduleds_SubjectId_ScheduledDate",
                table: "Scheduleds",
                columns: new[] { "SubjectId", "ScheduledDate" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Scheduleds",
                table: "Scheduleds",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enrollments",
                table: "Enrollments",
                columns: new[] { "StudentId", "CourseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Courses_CourseId",
                table: "Enrollments",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_Users_StudentId",
                table: "Enrollments",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Scheduleds_Subjects_SubjectId",
                table: "Scheduleds",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subjects_Courses_CourseId",
                table: "Subjects",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Courses_CourseId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_Users_StudentId",
                table: "Enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Scheduleds_Subjects_SubjectId",
                table: "Scheduleds");

            migrationBuilder.DropForeignKey(
                name: "FK_Subjects_Courses_CourseId",
                table: "Subjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subjects",
                table: "Subjects");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Scheduleds_SubjectId_ScheduledDate",
                table: "Scheduleds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Scheduleds",
                table: "Scheduleds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enrollments",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "HaveLogo",
                table: "Courses");

            migrationBuilder.RenameTable(
                name: "Subjects",
                newName: "Subject");

            migrationBuilder.RenameTable(
                name: "Scheduleds",
                newName: "Scheduled");

            migrationBuilder.RenameTable(
                name: "Enrollments",
                newName: "Enrollment");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Courses",
                newName: "Logo");

            migrationBuilder.RenameIndex(
                name: "IX_Subjects_CourseId",
                table: "Subject",
                newName: "IX_Subject_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Enrollments_CourseId",
                table: "Enrollment",
                newName: "IX_Enrollment_CourseId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subject",
                table: "Subject",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Scheduled",
                table: "Scheduled",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enrollment",
                table: "Enrollment",
                columns: new[] { "StudentId", "CourseId" });

            migrationBuilder.CreateIndex(
                name: "IX_Scheduled_SubjectId",
                table: "Scheduled",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollment_Courses_CourseId",
                table: "Enrollment",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollment_Users_StudentId",
                table: "Enrollment",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Scheduled_Subject_SubjectId",
                table: "Scheduled",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subject_Courses_CourseId",
                table: "Subject",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
