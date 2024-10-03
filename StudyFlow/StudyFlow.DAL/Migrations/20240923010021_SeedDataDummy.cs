using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudyFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataDummy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                table: "Countries",
                columns: new[] { "Id", "IsoCode", "Name" },
                values: new object[,]
                {
                    { 1, "AFG", "Afghanistan" },
                    { 2, "ALB", "Albania" },
                    { 3, "DZA", "Algeria" },
                    { 4, "AND", "Andorra" },
                    { 5, "AGO", "Angola" },
                    { 6, "ATG", "Antigua and Barbuda" },
                    { 7, "ARG", "Argentina" },
                    { 8, "ARM", "Armenia" },
                    { 9, "AUS", "Australia" },
                    { 10, "AUT", "Austria" },
                    { 11, "AZE", "Azerbaijan" },
                    { 12, "BHS", "Bahamas" },
                    { 13, "BHR", "Bahrain" },
                    { 14, "BGD", "Bangladesh" },
                    { 15, "BRB", "Barbados" },
                    { 16, "BLR", "Belarus" },
                    { 17, "BEL", "Belgium" },
                    { 18, "BLZ", "Belize" },
                    { 19, "BEN", "Benin" },
                    { 20, "BTN", "Bhutan" },
                    { 21, "BOL", "Bolivia" },
                    { 22, "BIH", "Bosnia and Herzegovina" },
                    { 23, "BWA", "Botswana" },
                    { 24, "BRA", "Brazil" },
                    { 25, "BRN", "Brunei" },
                    { 26, "BGR", "Bulgaria" },
                    { 27, "BFA", "Burkina Faso" },
                    { 28, "BDI", "Burundi" },
                    { 29, "CPV", "Cabo Verde" },
                    { 30, "KHM", "Cambodia" },
                    { 31, "CMR", "Cameroon" },
                    { 32, "CAN", "Canada" },
                    { 33, "CAF", "Central African Republic" },
                    { 34, "TCD", "Chad" },
                    { 35, "CHL", "Chile" },
                    { 36, "CHN", "China" },
                    { 37, "COL", "Colombia" },
                    { 38, "COM", "Comoros" },
                    { 39, "COG", "Congo" },
                    { 40, "COD", "Congo, Democratic Republic of the" },
                    { 41, "CRI", "Costa Rica" },
                    { 42, "HRV", "Croatia" },
                    { 43, "CUB", "Cuba" },
                    { 44, "CYP", "Cyprus" },
                    { 45, "CZE", "Czech Republic" },
                    { 46, "DNK", "Denmark" },
                    { 47, "DJI", "Djibouti" },
                    { 48, "DMA", "Dominica" },
                    { 49, "DOM", "Dominican Republic" },
                    { 50, "ECU", "Ecuador" },
                    { 51, "EGY", "Egypt" },
                    { 52, "SLV", "El Salvador" },
                    { 53, "GNQ", "Equatorial Guinea" },
                    { 54, "ERI", "Eritrea" },
                    { 55, "EST", "Estonia" },
                    { 56, "SWZ", "Eswatini" },
                    { 57, "ETH", "Ethiopia" },
                    { 58, "FJI", "Fiji" },
                    { 59, "FIN", "Finland" },
                    { 60, "FRA", "France" },
                    { 61, "GAB", "Gabon" },
                    { 62, "GMB", "Gambia" },
                    { 63, "GEO", "Georgia" },
                    { 64, "DEU", "Germany" },
                    { 65, "GHA", "Ghana" },
                    { 66, "GRC", "Greece" },
                    { 67, "GRD", "Grenada" },
                    { 68, "GTM", "Guatemala" },
                    { 69, "GIN", "Guinea" },
                    { 70, "GNB", "Guinea-Bissau" },
                    { 71, "GUY", "Guyana" },
                    { 72, "HTI", "Haiti" },
                    { 73, "HND", "Honduras" },
                    { 74, "HUN", "Hungary" },
                    { 75, "ISL", "Iceland" },
                    { 76, "IND", "India" },
                    { 77, "IDN", "Indonesia" },
                    { 78, "IRN", "Iran" },
                    { 79, "IRQ", "Iraq" },
                    { 80, "IRL", "Ireland" },
                    { 81, "ISR", "Israel" },
                    { 82, "ITA", "Italy" },
                    { 83, "JAM", "Jamaica" },
                    { 84, "JPN", "Japan" },
                    { 85, "JOR", "Jordan" },
                    { 86, "KAZ", "Kazakhstan" },
                    { 87, "KEN", "Kenya" },
                    { 88, "KIR", "Kiribati" },
                    { 89, "PRK", "Korea, North" },
                    { 90, "KOR", "Korea, South" },
                    { 91, "KWT", "Kuwait" },
                    { 92, "KGZ", "Kyrgyzstan" },
                    { 93, "LAO", "Laos" },
                    { 94, "LVA", "Latvia" },
                    { 95, "LBN", "Lebanon" },
                    { 96, "LSO", "Lesotho" },
                    { 97, "LBR", "Liberia" },
                    { 98, "LBY", "Libya" },
                    { 99, "LIE", "Liechtenstein" },
                    { 100, "LTU", "Lithuania" },
                    { 101, "LUX", "Luxembourg" },
                    { 102, "MDG", "Madagascar" },
                    { 103, "MWI", "Malawi" },
                    { 104, "MYS", "Malaysia" },
                    { 105, "MDV", "Maldives" },
                    { 106, "MLI", "Mali" },
                    { 107, "MLT", "Malta" },
                    { 108, "MHL", "Marshall Islands" },
                    { 109, "MRT", "Mauritania" },
                    { 110, "MUS", "Mauritius" },
                    { 111, "MEX", "Mexico" },
                    { 112, "FSM", "Micronesia" },
                    { 113, "MDA", "Moldova" },
                    { 114, "MCO", "Monaco" },
                    { 115, "MNG", "Mongolia" },
                    { 116, "MNE", "Montenegro" },
                    { 117, "MAR", "Morocco" },
                    { 118, "MOZ", "Mozambique" },
                    { 119, "MMR", "Myanmar" },
                    { 120, "NAM", "Namibia" },
                    { 121, "NRU", "Nauru" },
                    { 122, "NPL", "Nepal" },
                    { 123, "NLD", "Netherlands" },
                    { 124, "NZL", "New Zealand" },
                    { 125, "NIC", "Nicaragua" },
                    { 126, "NER", "Niger" },
                    { 127, "NGA", "Nigeria" },
                    { 128, "MKD", "North Macedonia" },
                    { 129, "NOR", "Norway" },
                    { 130, "OMN", "Oman" },
                    { 131, "PAK", "Pakistan" },
                    { 132, "PLW", "Palau" },
                    { 133, "PAN", "Panama" },
                    { 134, "PNG", "Papua New Guinea" },
                    { 135, "PRY", "Paraguay" },
                    { 136, "PER", "Peru" },
                    { 137, "PHL", "Philippines" },
                    { 138, "POL", "Poland" },
                    { 139, "PRT", "Portugal" },
                    { 140, "QAT", "Qatar" },
                    { 141, "ROU", "Romania" },
                    { 142, "RUS", "Russia" },
                    { 143, "RWA", "Rwanda" },
                    { 144, "KNA", "Saint Kitts and Nevis" },
                    { 145, "LCA", "Saint Lucia" },
                    { 146, "VCT", "Saint Vincent and the Grenadines" },
                    { 147, "WSM", "Samoa" },
                    { 148, "SMR", "San Marino" },
                    { 149, "STP", "Sao Tome and Principe" },
                    { 150, "SAU", "Saudi Arabia" },
                    { 151, "SEN", "Senegal" },
                    { 152, "SRB", "Serbia" },
                    { 153, "SYC", "Seychelles" },
                    { 154, "SLE", "Sierra Leone" },
                    { 155, "SGP", "Singapore" },
                    { 156, "SVK", "Slovakia" },
                    { 157, "SVN", "Slovenia" },
                    { 158, "SLB", "Solomon Islands" },
                    { 159, "SOM", "Somalia" },
                    { 160, "ZAF", "South Africa" },
                    { 161, "SSD", "South Sudan" },
                    { 162, "ESP", "Spain" },
                    { 163, "LKA", "Sri Lanka" },
                    { 164, "SDN", "Sudan" },
                    { 165, "SUR", "Suriname" },
                    { 166, "SWE", "Sweden" },
                    { 167, "CHE", "Switzerland" },
                    { 168, "SYR", "Syria" },
                    { 169, "TWN", "Taiwan" },
                    { 170, "TJK", "Tajikistan" },
                    { 171, "TZA", "Tanzania" },
                    { 172, "THA", "Thailand" },
                    { 173, "TLS", "Timor-Leste" },
                    { 174, "TGO", "Togo" },
                    { 175, "TON", "Tonga" },
                    { 176, "TTO", "Trinidad and Tobago" },
                    { 177, "TUN", "Tunisia" },
                    { 178, "TUR", "Turkey" },
                    { 179, "TKM", "Turkmenistan" },
                    { 180, "TUV", "Tuvalu" },
                    { 181, "UGA", "Uganda" },
                    { 182, "UKR", "Ukraine" },
                    { 183, "ARE", "United Arab Emirates" },
                    { 184, "GBR", "United Kingdom" },
                    { 185, "USA", "United States" },
                    { 186, "URY", "Uruguay" },
                    { 187, "UZB", "Uzbekistan" },
                    { 188, "VUT", "Vanuatu" },
                    { 189, "VAT", "Vatican City" },
                    { 190, "VEN", "Venezuela" },
                    { 191, "VNM", "Vietnam" },
                    { 192, "YEM", "Yemen" },
                    { 193, "ZMB", "Zambia" },
                    { 194, "ZWE", "Zimbabwe" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CountryId", "CourseId", "Email", "EmailConfirmed", "FirstName", "HaveProfilePicture", "IsEnabled", "IsOnline", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "NotificationId", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "UserType" },
                values: new object[,]
                {
                    { new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), 0, "0683d624-740c-47fc-b7fe-b07611c466c5", 43, null, "teacheruser@example.com", true, "Teacher", false, false, false, "User", true, null, "TEACHERUSER@EXAMPLE.COM", "TEACHERUSER", null, "AQAAAAIAAYagAAAAEIZ+zidWYHZTzmFbgcf1e4ecbwYq0B1loHoo6vSWZwvGuzotIIS8c7FC0yE1yf0c8A==", null, false, "8d04f9fb-7fd7-470e-a9c2-0a75c7089c16", false, null, 0 },
                    { new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511"), 0, "be50d84c-97e5-46cc-9616-75960435b626", 35, null, "studentuser@example.com", true, "Student", false, false, false, "User", true, null, "STUDENTUSER@EXAMPLE.COM", "STUDENTUSER", null, "AQAAAAIAAYagAAAAEBEsk28JVcNbNYQTwlRHwQU8qBQoYDlihbBk1l6IlZ0CnvMM01f3Do0l6PN8E70w2g==", null, false, "064bd6bb-f112-4422-8aac-c3525cf12fdc", false, null, 0 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { new Guid("aa6b38d7-4157-43d3-b5d5-df1d9b821763"), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0") },
                    { new Guid("d6899615-c40a-47f3-ad83-1e5cdc6d7174"), new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511") }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "CreatedAt", "Description", "HaveLogo", "IsEnabled", "Name", "TeacherId", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("13452618-04f6-45e5-80e3-887df0df10a3"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2013), "German is the study of the German language.", false, false, "German", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2014) },
                    { new Guid("216cb810-6d9f-4ed8-a776-6b42cec0abbd"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1983), "History is the study of the past.", false, false, "History", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1983) },
                    { new Guid("25aa75fe-3291-43e7-88b7-656c114147ce"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2060), "Portuguese is the study of the Portuguese language.", false, false, "Portuguese", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2061) },
                    { new Guid("3c8825f3-f903-45c9-8dac-0a87a51ef37e"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2034), "Arabic is the study of the Arabic language.", false, false, "Arabic", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2034) },
                    { new Guid("e70b6d49-1025-4cdb-b25d-f9c5dbe8d8ec"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1980), "Computer science is the study of algorithmic processes, computational machines, and computation itself.", false, false, "Computer Science", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1980) },
                    { new Guid("51bd0dab-acb3-41b8-8617-4e93cb88f2f0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2063), "Dutch is the study of the Dutch language.", false, false, "Dutch", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2063) },
                    { new Guid("5431d737-dc2c-4a1c-910b-b21244e0a692"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1964), "Science is the study of the natural world.", false, false, "Science", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1965) },
                    { new Guid("55442da2-0d0d-4991-95c5-a1ebb2b168ab"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2009), "Spanish is the study of the Spanish language.", false, false, "Spanish", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2009) },
                    { new Guid("59370662-91e2-4eae-a2cd-1b6ae5e3aa20"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2011), "French is the study of the French language.", false, false, "French", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2012) },
                    { new Guid("68454ecb-d7f3-4bc0-aad0-7d40085593eb"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2022), "Korean is the study of the Korean language.", false, false, "Korean", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2022) },
                    { new Guid("74c7276a-8bf8-4242-a198-79b19546a73b"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2065), "Swedish is the study of the Swedish language.", false, false, "Swedish", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2065) },
                    { new Guid("941c35d9-b87b-452d-b13a-5a0eb517f30d"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2015), "Italian is the study of the Italian language.", false, false, "Italian", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2016) },
                    { new Guid("aa72e3ff-69e4-4c0a-8cca-ef1f74930734"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1940), "Mathematics is the study of numbers, quantities, and shapes.", false, false, "Mathematics", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1961) },
                    { new Guid("abec027a-b94f-4644-9528-2cfee456b8f3"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2036), "Russian is the study of the Russian language.", false, false, "Russian", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2045) },
                    { new Guid("b0c215b2-bd80-463a-8a45-72ca6faae0c1"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2018), "Chinese is the study of the Chinese language.", false, false, "Chinese", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2018) },
                    { new Guid("c248da0a-7ffd-4ff8-8080-4094f708046d"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2007), "English is the study of the English language.", false, false, "English", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2007) },
                    { new Guid("d18fc20f-aa72-4d93-ba31-7ee2cd2aa508"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2020), "Japanese is the study of the Japanese language.", false, false, "Japanese", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2020) },
                    { new Guid("ef2c9e05-5e92-482f-91bb-fea420b639b7"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1985), "Geography is the study of places and the relationships between people and their environments.", false, false, "Geography", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(1985) },
                    { new Guid("f38bea0b-d0b7-40da-a8ed-925567940f02"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2067), "Norwegian is the study of the Norwegian language.", false, false, "Norwegian", new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"), new DateTime(2024, 9, 22, 20, 0, 20, 546, DateTimeKind.Local).AddTicks(2068) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("91fea7e1-6e8c-4fb1-bd9b-dec8c967bea5"));

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("aa6b38d7-4157-43d3-b5d5-df1d9b821763"), new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0") });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("d6899615-c40a-47f3-ad83-1e5cdc6d7174"), new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511") });

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 121);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 122);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 123);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 126);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 127);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 131);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 132);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 136);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 139);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 143);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 144);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 146);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 148);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 149);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 150);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 151);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 152);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 153);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 154);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 155);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 156);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 157);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 158);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 159);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 160);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 161);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 162);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 163);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 164);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 165);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 166);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 167);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 168);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 169);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 170);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 171);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 172);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 173);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 174);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 175);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 176);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 177);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 178);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 179);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 180);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 181);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 182);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 183);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 184);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 185);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 186);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 187);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 188);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 189);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 190);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 191);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 192);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 193);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 194);

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
                keyValue: new Guid("6fe44fdc-cac4-4d08-82d6-8a672b6960c0"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb51ed40-41f5-4c46-8de1-5075e28db511"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 43);
        }
    }
}