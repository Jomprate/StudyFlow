using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedEntityAnnounceToUseDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("05d444f6-9931-4361-98a4-28857e0631af"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("1991f0bf-b873-4be4-8d88-63bf192b83f0"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("566c05dd-0c3f-4c27-a170-a796fb4d3e4e"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("5b9a2887-1feb-4f08-924e-7eed04d9d2ad"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("8f83ac1d-3169-41a9-bcf1-47870ab88e50"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("9beffd8b-aa73-4277-b58c-ae5d0541c57b"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("a4bfbed2-eef2-4661-825b-463cb3867f53"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("af6177e3-fb46-4236-9197-2625e053cd3b"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("e82fe4ff-8335-439b-911b-d83309f87367"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("f27bf5df-6255-44dc-a7db-b7888901b17f"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Announces",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Announces",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "Announces",
                columns: new[] { "Id", "AlternateLinks", "CourseId", "CreatedAt", "GoogleDriveLinks", "HtmlContent", "IsDeleted", "ProfilePicture", "Title", "UpdatedAt", "UserId", "YouTubeVideos" },
                values: new object[,]
                {
                    { new Guid("37109139-b083-49d9-8827-db0015acbcc9"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Exploraremos cómo la refactorización puede mejorar el código sin modificar su funcionalidad y las buenas prácticas para mantenerlo limpio.", false, null, "Refactorización y Buenas Prácticas", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("48ef382f-1e19-4cd3-9a71-12162bd854a1"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Exploraremos cómo aplicar metodologías ágiles, como Scrum y Kanban, durante el desarrollo de software.", false, null, "Metodologías Ágiles en la Construcción de Software", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("73f4d0ca-7b92-432a-9a98-c34c2cd08051"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Aprenderemos sobre los patrones de diseño y cómo aplicarlos para construir una arquitectura robusta.", false, null, "Arquitectura y Patrones de Diseño", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("777c8691-03b0-407f-9b80-5f857096a2a9"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Analizaremos cómo gestionar dependencias del proyecto y las mejores prácticas para el control de versiones con Git.", false, null, "Gestión de Dependencias y Control de Versiones", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("7bc449cc-b16e-4682-9b49-4ed86260a1d2"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Veremos herramientas como Visual Studio, Docker y Jenkins, que facilitan el proceso de construcción de software.", false, null, "Herramientas para la Construcción de Software", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("9df4ac53-8965-451c-a7ec-c4a7804f39d8"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Aprenderemos cómo configurar un entorno de desarrollo local y la importancia de prácticas DevOps en el ciclo de desarrollo.", false, null, "Entorno de Desarrollo Local y DevOps", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("a59a2ac1-719a-45b6-bf88-7b555b2bf3c1"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "La documentación es esencial para la construcción de software de calidad. Discutiremos cómo documentar adecuadamente el proyecto.", false, null, "Documentación del Código y del Proyecto", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("c5f68b30-29b7-4bf9-bb74-84676049d76a"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "En esta sesión aprenderemos sobre la importancia de las pruebas unitarias y cómo aplicarlas efectivamente.", false, null, "Pruebas Unitarias en Construcción de Software", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("e38fe8f1-a6b4-4cbf-aafa-fb0c9ff9169f"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Vamos a discutir los conceptos básicos de construcción de software y su importancia en el desarrollo de sistemas robustos.", false, null, "Introducción a la Construcción de Software", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("fad2ef4a-b4e0-4636-be44-b63a085cd644"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "[]", "Hablaremos sobre cómo implementar integración continua para detectar problemas antes de que lleguen a producción.", false, null, "Integración Continua (CI) en Proyectos de Software", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("37109139-b083-49d9-8827-db0015acbcc9"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("48ef382f-1e19-4cd3-9a71-12162bd854a1"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("73f4d0ca-7b92-432a-9a98-c34c2cd08051"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("777c8691-03b0-407f-9b80-5f857096a2a9"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("7bc449cc-b16e-4682-9b49-4ed86260a1d2"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("9df4ac53-8965-451c-a7ec-c4a7804f39d8"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("a59a2ac1-719a-45b6-bf88-7b555b2bf3c1"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("c5f68b30-29b7-4bf9-bb74-84676049d76a"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("e38fe8f1-a6b4-4cbf-aafa-fb0c9ff9169f"));

            migrationBuilder.DeleteData(
                table: "Announces",
                keyColumn: "Id",
                keyValue: new Guid("fad2ef4a-b4e0-4636-be44-b63a085cd644"));

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Announces");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Announces");

            migrationBuilder.InsertData(
                table: "Announces",
                columns: new[] { "Id", "AlternateLinks", "CourseId", "GoogleDriveLinks", "HtmlContent", "IsDeleted", "ProfilePicture", "Title", "UserId", "YouTubeVideos" },
                values: new object[,]
                {
                    { new Guid("05d444f6-9931-4361-98a4-28857e0631af"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Vamos a discutir los conceptos básicos de construcción de software y su importancia en el desarrollo de sistemas robustos.", false, null, "Introducción a la Construcción de Software", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("1991f0bf-b873-4be4-8d88-63bf192b83f0"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "En esta sesión aprenderemos sobre la importancia de las pruebas unitarias y cómo aplicarlas efectivamente.", false, null, "Pruebas Unitarias en Construcción de Software", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("566c05dd-0c3f-4c27-a170-a796fb4d3e4e"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Exploraremos cómo aplicar metodologías ágiles, como Scrum y Kanban, durante el desarrollo de software.", false, null, "Metodologías Ágiles en la Construcción de Software", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("5b9a2887-1feb-4f08-924e-7eed04d9d2ad"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Aprenderemos sobre los patrones de diseño y cómo aplicarlos para construir una arquitectura robusta.", false, null, "Arquitectura y Patrones de Diseño", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("8f83ac1d-3169-41a9-bcf1-47870ab88e50"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Analizaremos cómo gestionar dependencias del proyecto y las mejores prácticas para el control de versiones con Git.", false, null, "Gestión de Dependencias y Control de Versiones", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("9beffd8b-aa73-4277-b58c-ae5d0541c57b"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Hablaremos sobre cómo implementar integración continua para detectar problemas antes de que lleguen a producción.", false, null, "Integración Continua (CI) en Proyectos de Software", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("a4bfbed2-eef2-4661-825b-463cb3867f53"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Aprenderemos cómo configurar un entorno de desarrollo local y la importancia de prácticas DevOps en el ciclo de desarrollo.", false, null, "Entorno de Desarrollo Local y DevOps", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("af6177e3-fb46-4236-9197-2625e053cd3b"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "La documentación es esencial para la construcción de software de calidad. Discutiremos cómo documentar adecuadamente el proyecto.", false, null, "Documentación del Código y del Proyecto", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("e82fe4ff-8335-439b-911b-d83309f87367"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Exploraremos cómo la refactorización puede mejorar el código sin modificar su funcionalidad y las buenas prácticas para mantenerlo limpio.", false, null, "Refactorización y Buenas Prácticas", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" },
                    { new Guid("f27bf5df-6255-44dc-a7db-b7888901b17f"), "[]", new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), "[]", "Veremos herramientas como Visual Studio, Docker y Jenkins, que facilitan el proceso de construcción de software.", false, null, "Herramientas para la Construcción de Software", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), "[]" }
                });
        }
    }
}