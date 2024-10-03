using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class addSeedAnnounces : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}