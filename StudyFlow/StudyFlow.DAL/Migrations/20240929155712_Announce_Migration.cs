using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Announce_Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("91fea7e1-6e8c-4fb1-bd9b-dec8c967bea5"));

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("aa6b38d7-4157-43d3-b5d5-df1d9b821763"), new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52") });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("d6899615-c40a-47f3-ad83-1e5cdc6d7174"), new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511") });

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("13452618-04f6-45e5-80e3-887df0df10a3"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("216cb810-6d9f-4ed8-a776-6b42cec0abbd"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("25aa75fe-3291-43e7-88b7-656c114147ce"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("3c8825f3-f903-45c9-8dac-0a87a51ef37e"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("3c97699a-50dd-42fd-958e-9a85af102f1b"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("51bd0dab-acb3-41b8-8617-4e93cb88f2f0"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("5431d737-dc2c-4a1c-910b-b21244e0a692"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("55442da2-0d0d-4991-95c5-a1ebb2b168ab"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("59370662-91e2-4eae-a2cd-1b6ae5e3aa20"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("68454ecb-d7f3-4bc0-aad0-7d40085593eb"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("74c7276a-8bf8-4242-a198-79b19546a73b"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("941c35d9-b87b-452d-b13a-5a0eb517f30d"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("aa72e3ff-69e4-4c0a-8cca-ef1f74930734"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("abec027a-b94f-4644-9528-2cfee456b8f3"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("b0c215b2-bd80-463a-8a45-72ca6faae0c1"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("c248da0a-7ffd-4ff8-8080-4094f708046d"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("d18fc20f-aa72-4d93-ba31-7ee2cd2aa508"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("ef2c9e05-5e92-482f-91bb-fea420b639b7"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("f38bea0b-d0b7-40da-a8ed-925567940f02"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("aa6b38d7-4157-43d3-b5d5-df1d9b821763"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("d6899615-c40a-47f3-ad83-1e5cdc6d7174"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511"));

            migrationBuilder.CreateTable(
                name: "Announces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HtmlContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YouTubeVideos = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GoogleDriveLinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AlternateLinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Announces_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Announces_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("5cb70ef4-779c-4319-821d-454a98925235"), null, "Student", "STUDENT" },
                    { new Guid("9b288068-e7ad-4a2f-b305-b6312a4fd66b"), null, "Teacher", "TEACHER" },
                    { new Guid("c7611d35-c6b1-463e-901c-20ce35bd7c5b"), null, "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CountryId", "CourseId", "Email", "EmailConfirmed", "FirstName", "HaveProfilePicture", "IsEnabled", "IsOnline", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "NotificationId", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserType" },
                values: new object[,]
                {
                    { new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), 0, "7738932e-54b9-4604-b079-8d964875543f", 43, null, "teacheruser@example.com", true, "Teacher", false, false, false, "User", true, null, "TEACHERUSER@EXAMPLE.COM", "TEACHERUSER", null, "AQAAAAIAAYagAAAAEDlLRg9XqVhUFC5XDI+3p3k/jiRj0D3G2yG2QeK7JlcCzOXHRVfo9EeQDlycYdEMLw==", null, false, "a91f7b2f-f791-484d-967b-72b278666305", false, null, 0 },
                    { new Guid("8be09a78-e10f-45cf-b031-60e14e10d83c"), 0, "29d96ad7-ac8f-4298-bc8a-1e4351af8bbd", 35, null, "studentuser@example.com", true, "Student", false, false, false, "User", true, null, "STUDENTUSER@EXAMPLE.COM", "STUDENTUSER", null, "AQAAAAIAAYagAAAAECYYtZ1UQsxYMaoLAVwDnqoVp2+HnG9gaWolVxBa4rptautXrp/NaCsMOOtgAak7oQ==", null, false, "086743c7-20b2-4c3f-ac56-37cfa8c98229", false, null, 0 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { new Guid("9b288068-e7ad-4a2f-b305-b6312a4fd66b"), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0") },
                    { new Guid("5cb70ef4-779c-4319-821d-454a98925235"), new Guid("8be09a78-e10f-45cf-b031-60e14e10d83c") }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "CreatedAt", "Description", "HaveLogo", "IsEnabled", "Name", "TeacherId", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("0a9a40f4-7e15-40d0-a798-a9c08ae33fcb"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5941), "Italian is the study of the Italian language.", false, false, "Italian", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5941) },
                    { new Guid("242aab9f-b5d9-4b7e-ac9e-fba7d7a172f1"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5915), "Science is the study of the natural world.", false, false, "Science", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5915) },
                    { new Guid("2aac2a5b-9291-4d37-ac59-52e5e7983d5e"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5953), "Russian is the study of the Russian language.", false, false, "Russian", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5954) },
                    { new Guid("437edf61-3f16-4845-a76a-e00d38de68a3"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5955), "Portuguese is the study of the Portuguese language.", false, false, "Portuguese", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5956) },
                    { new Guid("4bd16844-643b-4943-a9bc-b328f0119dd1"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5957), "Dutch is the study of the Dutch language.", false, false, "Dutch", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5958) },
                    { new Guid("5439508d-1b2d-4bbe-921c-14046888d0d6"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5920), "History is the study of the past.", false, false, "History", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5920) },
                    { new Guid("62ca54c9-e326-4c29-b671-dbd907d572a0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5959), "Swedish is the study of the Swedish language.", false, false, "Swedish", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5960) },
                    { new Guid("7c88d7ff-2f14-49ff-8fe6-6461046731fb"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5899), "Mathematics is the study of numbers, quantities, and shapes.", false, false, "Mathematics", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5912) },
                    { new Guid("829b7e39-d74c-4f64-8fbd-c426755e4962"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5951), "Arabic is the study of the Arabic language.", false, false, "Arabic", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5952) },
                    { new Guid("8a6d46a5-22a8-4886-903f-74292fc2c897"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5937), "French is the study of the French language.", false, false, "French", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5937) },
                    { new Guid("98b17fa1-1db2-40b3-b10a-0b1cef6cc8f1"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5945), "Japanese is the study of the Japanese language.", false, false, "Japanese", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5945) },
                    { new Guid("ad7b8dcc-4e6d-44ec-8fa3-e3ca82e14bd6"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5943), "Chinese is the study of the Chinese language.", false, false, "Chinese", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5943) },
                    { new Guid("b1d4bb80-7244-44f0-98ea-a5668d55ae58"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5949), "Korean is the study of the Korean language.", false, false, "Korean", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5950) },
                    { new Guid("ccf7284f-1e9a-45c2-abe9-390c929039e5"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5961), "Norwegian is the study of the Norwegian language.", false, false, "Norwegian", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5962) },
                    { new Guid("cd2e49ca-dd4e-41a0-890e-5b39222f4a12"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5933), "English is the study of the English language.", false, false, "English", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5933) },
                    { new Guid("cf06bed3-c100-4943-a03a-bca2196f4bd5"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5935), "Spanish is the study of the Spanish language.", false, false, "Spanish", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5935) },
                    { new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5917), "Computer science is the study of algorithmic processes, computational machines, and computation itself.", false, false, "Computer Science", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5918) },
                    { new Guid("f412e15c-7959-4680-9f82-180a5460b3f0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5930), "Geography is the study of places and the relationships between people and their environments.", false, false, "Geography", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5931) },
                    { new Guid("fab2314e-fd3d-4f55-aedf-fad6701cc9e2"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5939), "German is the study of the German language.", false, false, "German", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 29, 10, 57, 12, 375, DateTimeKind.Local).AddTicks(5939) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Announces_CourseId",
                table: "Announces",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Announces_UserId",
                table: "Announces",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Announces");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c7611d35-c6b1-463e-901c-20ce35bd7c5b"));

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("9b288068-e7ad-4a2f-b305-b6312a4fd66b"), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0") });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("5cb70ef4-779c-4319-821d-454a98925235"), new Guid("8be09a78-e10f-45cf-b031-60e14e10d83c") });

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("0a9a40f4-7e15-40d0-a798-a9c08ae33fcb"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("242aab9f-b5d9-4b7e-ac9e-fba7d7a172f1"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("2aac2a5b-9291-4d37-ac59-52e5e7983d5e"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("437edf61-3f16-4845-a76a-e00d38de68a3"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("4bd16844-643b-4943-a9bc-b328f0119dd1"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("5439508d-1b2d-4bbe-921c-14046888d0d6"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("62ca54c9-e326-4c29-b671-dbd907d572a0"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("7c88d7ff-2f14-49ff-8fe6-6461046731fb"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("829b7e39-d74c-4f64-8fbd-c426755e4962"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("8a6d46a5-22a8-4886-903f-74292fc2c897"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("98b17fa1-1db2-40b3-b10a-0b1cef6cc8f1"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("ad7b8dcc-4e6d-44ec-8fa3-e3ca82e14bd6"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("b1d4bb80-7244-44f0-98ea-a5668d55ae58"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("ccf7284f-1e9a-45c2-abe9-390c929039e5"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("cd2e49ca-dd4e-41a0-890e-5b39222f4a12"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("cf06bed3-c100-4943-a03a-bca2196f4bd5"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("f412e15c-7959-4680-9f82-180a5460b3f0"));

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: new Guid("fab2314e-fd3d-4f55-aedf-fad6701cc9e2"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("5cb70ef4-779c-4319-821d-454a98925235"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("9b288068-e7ad-4a2f-b305-b6312a4fd66b"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8be09a78-e10f-45cf-b031-60e14e10d83c"));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("91fea7e1-6e8c-4fb1-bd9b-dec8c967bea5"), null, "Admin", "ADMIN" },
                    { new Guid("aa6b38d7-4157-43d3-b5d5-df1d9b821763"), null, "Teacher", "TEACHER" },
                    { new Guid("d6899615-c40a-47f3-ad83-1e5cdc6d7174"), null, "Student", "STUDENT" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CountryId", "CourseId", "Email", "EmailConfirmed", "FirstName", "HaveProfilePicture", "IsEnabled", "IsOnline", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "NotificationId", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserType" },
                values: new object[,]
                {
                    { new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), 0, "0683d624-740c-47fc-b7fe-b07611c466c5", 43, null, "teacheruser@example.com", true, "Teacher", false, false, false, "User", true, null, "TEACHERUSER@EXAMPLE.COM", "TEACHERUSER", null, "AQAAAAIAAYagAAAAEIZ+zidWYHZTzmFbgcf1e4ecbwYq0B1loHoo6vSWZwvGuzotIIS8c7FC0yE1yf0c8A==", null, false, "8d04f9fb-7fd7-470e-a9c2-0a75c7089c16", false, null, 0 },
                    { new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511"), 0, "be50d84c-97e5-46cc-9616-75960435b626", 35, null, "studentuser@example.com", true, "Student", false, false, false, "User", true, null, "STUDENTUSER@EXAMPLE.COM", "STUDENTUSER", null, "AQAAAAIAAYagAAAAEBEsk28JVcNbNYQTwlRHwQU8qBQoYDlihbBk1l6IlZ0CnvMM01f3Do0l6PN8E70w2g==", null, false, "064bd6bb-f112-4422-8aac-c3525cf12fdc", false, null, 0 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { new Guid("aa6b38d7-4157-43d3-b5d5-df1d9b821763"), new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52") },
                    { new Guid("d6899615-c40a-47f3-ad83-1e5cdc6d7174"), new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511") }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "CreatedAt", "Description", "HaveLogo", "IsEnabled", "Name", "TeacherId", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("13452618-04f6-45e5-80e3-887df0df10a3"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2013), "German is the study of the German language.", false, false, "German", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2014) },
                    { new Guid("216cb810-6d9f-4ed8-a776-6b42cec0abbd"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1983), "History is the study of the past.", false, false, "History", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1983) },
                    { new Guid("25aa75fe-3291-43e7-88b7-656c114147ce"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2060), "Portuguese is the study of the Portuguese language.", false, false, "Portuguese", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2061) },
                    { new Guid("3c8825f3-f903-45c9-8dac-0a87a51ef37e"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2034), "Arabic is the study of the Arabic language.", false, false, "Arabic", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2034) },
                    { new Guid("3c97699a-50dd-42fd-958e-9a85af102f1b"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1980), "Computer science is the study of algorithmic processes, computational machines, and computation itself.", false, false, "Computer Science", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1980) },
                    { new Guid("51bd0dab-acb3-41b8-8617-4e93cb88f2f0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2063), "Dutch is the study of the Dutch language.", false, false, "Dutch", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2063) },
                    { new Guid("5431d737-dc2c-4a1c-910b-b21244e0a692"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1964), "Science is the study of the natural world.", false, false, "Science", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1965) },
                    { new Guid("55442da2-0d0d-4991-95c5-a1ebb2b168ab"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2009), "Spanish is the study of the Spanish language.", false, false, "Spanish", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2009) },
                    { new Guid("59370662-91e2-4eae-a2cd-1b6ae5e3aa20"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2011), "French is the study of the French language.", false, false, "French", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2012) },
                    { new Guid("68454ecb-d7f3-4bc0-aad0-7d40085593eb"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2022), "Korean is the study of the Korean language.", false, false, "Korean", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2022) },
                    { new Guid("74c7276a-8bf8-4242-a198-79b19546a73b"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2065), "Swedish is the study of the Swedish language.", false, false, "Swedish", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2065) },
                    { new Guid("941c35d9-b87b-452d-b13a-5a0eb517f30d"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2015), "Italian is the study of the Italian language.", false, false, "Italian", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2016) },
                    { new Guid("aa72e3ff-69e4-4c0a-8cca-ef1f74930734"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1940), "Mathematics is the study of numbers, quantities, and shapes.", false, false, "Mathematics", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1961) },
                    { new Guid("abec027a-b94f-4644-9528-2cfee456b8f3"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2036), "Russian is the study of the Russian language.", false, false, "Russian", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2045) },
                    { new Guid("b0c215b2-bd80-463a-8a45-72ca6faae0c1"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2018), "Chinese is the study of the Chinese language.", false, false, "Chinese", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2018) },
                    { new Guid("c248da0a-7ffd-4ff8-8080-4094f708046d"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2007), "English is the study of the English language.", false, false, "English", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2007) },
                    { new Guid("d18fc20f-aa72-4d93-ba31-7ee2cd2aa508"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2020), "Japanese is the study of the Japanese language.", false, false, "Japanese", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2020) },
                    { new Guid("ef2c9e05-5e92-482f-91bb-fea420b639b7"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1985), "Geography is the study of places and the relationships between people and their environments.", false, false, "Geography", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1985) },
                    { new Guid("f38bea0b-d0b7-40da-a8ed-925567940f02"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2067), "Norwegian is the study of the Norwegian language.", false, false, "Norwegian", new Guid("b0a2064f-6a0a-499e-a686-7671b07b5a52"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2068) }
                });
        }
    }
}
