using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.DAL.Data
{
    public static class DbContextExtensions
    {
        private static Guid teacherId;
        private static Guid studentId;
        private static Guid roleAdminId;
        private static Guid roleTeacherId;
        private static Guid roleStudentId;
        private static Guid courseId;
        private static Guid userId;

        public static void Seed(this DataContext context)
        {
            SeedCountry(context);
            SeedUser(context);
            SeedRole(context);
            SeedUserRole(context);
            SeedDataForStudyFlow(context);
            SeedAnnounces(context);
        }

        public static void SeedCountry(DataContext context)
        {
            var countries = new List<Country>
            {
                new Country { Name = "Afghanistan", IsoCode = "AFG" },
                new Country { Name = "Albania", IsoCode = "ALB" },
                new Country { Name = "Algeria", IsoCode = "DZA" },
                new Country { Name = "Andorra", IsoCode = "AND" },
                new Country { Name = "Angola", IsoCode = "AGO" },
                new Country { Name = "Antigua and Barbuda", IsoCode = "ATG" },
                new Country { Name = "Argentina", IsoCode = "ARG" },
                new Country { Name = "Armenia", IsoCode = "ARM" },
                new Country { Name = "Australia", IsoCode = "AUS" },
                new Country { Name = "Austria", IsoCode = "AUT" },
                new Country { Name = "Azerbaijan", IsoCode = "AZE" },
                new Country { Name = "Bahamas", IsoCode = "BHS" },
                new Country { Name = "Bahrain", IsoCode = "BHR" },
                new Country { Name = "Bangladesh", IsoCode = "BGD" },
                new Country { Name = "Barbados", IsoCode = "BRB" },
                new Country { Name = "Belarus", IsoCode = "BLR" },
                new Country { Name = "Belgium", IsoCode = "BEL" },
                new Country { Name = "Belize", IsoCode = "BLZ" },
                new Country { Name = "Benin", IsoCode = "BEN" },
                new Country { Name = "Bhutan", IsoCode = "BTN" },
                new Country { Name = "Bolivia", IsoCode = "BOL" },
                new Country { Name = "Bosnia and Herzegovina", IsoCode = "BIH" },
                new Country { Name = "Botswana", IsoCode = "BWA" },
                new Country { Name = "Brazil", IsoCode = "BRA" },
                new Country { Name = "Brunei", IsoCode = "BRN" },
                new Country { Name = "Bulgaria", IsoCode = "BGR" },
                new Country { Name = "Burkina Faso", IsoCode = "BFA" },
                new Country { Name = "Burundi", IsoCode = "BDI" },
                new Country { Name = "Cabo Verde", IsoCode = "CPV" },
                new Country { Name = "Cambodia", IsoCode = "KHM" },
                new Country { Name = "Cameroon", IsoCode = "CMR" },
                new Country { Name = "Canada", IsoCode = "CAN" },
                new Country { Name = "Central African Republic", IsoCode = "CAF" },
                new Country { Name = "Chad", IsoCode = "TCD" },
                new Country { Name = "Chile", IsoCode = "CHL" },
                new Country { Name = "China", IsoCode = "CHN" },
                new Country { Name = "Colombia", IsoCode = "COL" },
                new Country { Name = "Comoros", IsoCode = "COM" },
                new Country { Name = "Congo", IsoCode = "COG" },
                new Country { Name = "Congo, Democratic Republic of the", IsoCode = "COD" },
                new Country { Name = "Costa Rica", IsoCode = "CRI" },
                new Country { Name = "Croatia", IsoCode = "HRV" },
                new Country { Name = "Cuba", IsoCode = "CUB" },
                new Country { Name = "Cyprus", IsoCode = "CYP" },
                new Country { Name = "Czech Republic", IsoCode = "CZE" },
                new Country { Name = "Denmark", IsoCode = "DNK" },
                new Country { Name = "Djibouti", IsoCode = "DJI" },
                new Country { Name = "Dominica", IsoCode = "DMA" },
                new Country { Name = "Dominican Republic", IsoCode = "DOM" },
                new Country { Name = "Ecuador", IsoCode = "ECU" },
                new Country { Name = "Egypt", IsoCode = "EGY" },
                new Country { Name = "El Salvador", IsoCode = "SLV" },
                new Country { Name = "Equatorial Guinea", IsoCode = "GNQ" },
                new Country { Name = "Eritrea", IsoCode = "ERI" },
                new Country { Name = "Estonia", IsoCode = "EST" },
                new Country { Name = "Eswatini", IsoCode = "SWZ" },
                new Country { Name = "Ethiopia", IsoCode = "ETH" },
                new Country { Name = "Fiji", IsoCode = "FJI" },
                new Country { Name = "Finland", IsoCode = "FIN" },
                new Country { Name = "France", IsoCode = "FRA" },
                new Country { Name = "Gabon", IsoCode = "GAB" },
                new Country { Name = "Gambia", IsoCode = "GMB" },
                new Country { Name = "Georgia", IsoCode = "GEO" },
                new Country { Name = "Germany", IsoCode = "DEU" },
                new Country { Name = "Ghana", IsoCode = "GHA" },
                new Country { Name = "Greece", IsoCode = "GRC" },
                new Country { Name = "Grenada", IsoCode = "GRD" },
                new Country { Name = "Guatemala", IsoCode = "GTM" },
                new Country { Name = "Guinea", IsoCode = "GIN" },
                new Country { Name = "Guinea-Bissau", IsoCode = "GNB" },
                new Country { Name = "Guyana", IsoCode = "GUY" },
                new Country { Name = "Haiti", IsoCode = "HTI" },
                new Country { Name = "Honduras", IsoCode = "HND" },
                new Country { Name = "Hungary", IsoCode = "HUN" },
                new Country { Name = "Iceland", IsoCode = "ISL" },
                new Country { Name = "India", IsoCode = "IND" },
                new Country { Name = "Indonesia", IsoCode = "IDN" },
                new Country { Name = "Iran", IsoCode = "IRN" },
                new Country { Name = "Iraq", IsoCode = "IRQ" },
                new Country { Name = "Ireland", IsoCode = "IRL" },
                new Country { Name = "Israel", IsoCode = "ISR" },
                new Country { Name = "Italy", IsoCode = "ITA" },
                new Country { Name = "Jamaica", IsoCode = "JAM" },
                new Country { Name = "Japan", IsoCode = "JPN" },
                new Country { Name = "Jordan", IsoCode = "JOR" },
                new Country { Name = "Kazakhstan", IsoCode = "KAZ" },
                new Country { Name = "Kenya", IsoCode = "KEN" },
                new Country { Name = "Kiribati", IsoCode = "KIR" },
                new Country { Name = "Korea, North", IsoCode = "PRK" },
                new Country { Name = "Korea, South", IsoCode = "KOR" },
                new Country { Name = "Kuwait", IsoCode = "KWT" },
                new Country { Name = "Kyrgyzstan", IsoCode = "KGZ" },
                new Country { Name = "Laos", IsoCode = "LAO" },
                new Country { Name = "Latvia", IsoCode = "LVA" },
                new Country { Name = "Lebanon", IsoCode = "LBN" },
                new Country { Name = "Lesotho", IsoCode = "LSO" },
                new Country { Name = "Liberia", IsoCode = "LBR" },
                new Country { Name = "Libya", IsoCode = "LBY" },
                new Country { Name = "Liechtenstein", IsoCode = "LIE" },
                new Country { Name = "Lithuania", IsoCode = "LTU" },
                new Country { Name = "Luxembourg", IsoCode = "LUX" },
                new Country { Name = "Madagascar", IsoCode = "MDG" },
                new Country { Name = "Malawi", IsoCode = "MWI" },
                new Country { Name = "Malaysia", IsoCode = "MYS" },
                new Country { Name = "Maldives", IsoCode = "MDV" },
                new Country { Name = "Mali", IsoCode = "MLI" },
                new Country { Name = "Malta", IsoCode = "MLT" },
                new Country { Name = "Marshall Islands", IsoCode = "MHL" },
                new Country { Name = "Mauritania", IsoCode = "MRT" },
                new Country { Name = "Mauritius", IsoCode = "MUS" },
                new Country { Name = "Mexico", IsoCode = "MEX" },
                new Country { Name = "Micronesia", IsoCode = "FSM" },
                new Country { Name = "Moldova", IsoCode = "MDA" },
                new Country { Name = "Monaco", IsoCode = "MCO" },
                new Country { Name = "Mongolia", IsoCode = "MNG" },
                new Country { Name = "Montenegro", IsoCode = "MNE" },
                new Country { Name = "Morocco", IsoCode = "MAR" },
                new Country { Name = "Mozambique", IsoCode = "MOZ" },
                new Country { Name = "Myanmar", IsoCode = "MMR" },
                new Country { Name = "Namibia", IsoCode = "NAM" },
                new Country { Name = "Nauru", IsoCode = "NRU" },
                new Country { Name = "Nepal", IsoCode = "NPL" },
                new Country { Name = "Netherlands", IsoCode = "NLD" },
                new Country { Name = "New Zealand", IsoCode = "NZL" },
                new Country { Name = "Nicaragua", IsoCode = "NIC" },
                new Country { Name = "Niger", IsoCode = "NER" },
                new Country { Name = "Nigeria", IsoCode = "NGA" },
                new Country { Name = "North Macedonia", IsoCode = "MKD" },
                new Country { Name = "Norway", IsoCode = "NOR" },
                new Country { Name = "Oman", IsoCode = "OMN" },
                new Country { Name = "Pakistan", IsoCode = "PAK" },
                new Country { Name = "Palau", IsoCode = "PLW" },
                new Country { Name = "Panama", IsoCode = "PAN" },
                new Country { Name = "Papua New Guinea", IsoCode = "PNG" },
                new Country { Name = "Paraguay", IsoCode = "PRY" },
                new Country { Name = "Peru", IsoCode = "PER" },
                new Country { Name = "Philippines", IsoCode = "PHL" },
                new Country { Name = "Poland", IsoCode = "POL" },
                new Country { Name = "Portugal", IsoCode = "PRT" },
                new Country { Name = "Qatar", IsoCode = "QAT" },
                new Country { Name = "Romania", IsoCode = "ROU" },
                new Country { Name = "Russia", IsoCode = "RUS" },
                new Country { Name = "Rwanda", IsoCode = "RWA" },
                new Country { Name = "Saint Kitts and Nevis", IsoCode = "KNA" },
                new Country { Name = "Saint Lucia", IsoCode = "LCA" },
                new Country { Name = "Saint Vincent and the Grenadines", IsoCode = "VCT" },
                new Country { Name = "Samoa", IsoCode = "WSM" },
                new Country { Name = "San Marino", IsoCode = "SMR" },
                new Country { Name = "Sao Tome and Principe", IsoCode = "STP" },
                new Country { Name = "Saudi Arabia", IsoCode = "SAU" },
                new Country { Name = "Senegal", IsoCode = "SEN" },
                new Country { Name = "Serbia", IsoCode = "SRB" },
                new Country { Name = "Seychelles", IsoCode = "SYC" },
                new Country { Name = "Sierra Leone", IsoCode = "SLE" },
                new Country { Name = "Singapore", IsoCode = "SGP" },
                new Country { Name = "Slovakia", IsoCode = "SVK" },
                new Country { Name = "Slovenia", IsoCode = "SVN" },
                new Country { Name = "Solomon Islands", IsoCode = "SLB" },
                new Country { Name = "Somalia", IsoCode = "SOM" },
                new Country { Name = "South Africa", IsoCode = "ZAF" },
                new Country { Name = "South Sudan", IsoCode = "SSD" },
                new Country { Name = "Spain", IsoCode = "ESP" },
                new Country { Name = "Sri Lanka", IsoCode = "LKA" },
                new Country { Name = "Sudan", IsoCode = "SDN" },
                new Country { Name = "Suriname", IsoCode = "SUR" },
                new Country { Name = "Sweden", IsoCode = "SWE" },
                new Country { Name = "Switzerland", IsoCode = "CHE" },
                new Country { Name = "Syria", IsoCode = "SYR" },
                new Country { Name = "Taiwan", IsoCode = "TWN" },
                new Country { Name = "Tajikistan", IsoCode = "TJK" },
                new Country { Name = "Tanzania", IsoCode = "TZA" },
                new Country { Name = "Thailand", IsoCode = "THA" },
                new Country { Name = "Timor-Leste", IsoCode = "TLS" },
                new Country { Name = "Togo", IsoCode = "TGO" },
                new Country { Name = "Tonga", IsoCode = "TON" },
                new Country { Name = "Trinidad and Tobago", IsoCode = "TTO" },
                new Country { Name = "Tunisia", IsoCode = "TUN" },
                new Country { Name = "Turkey", IsoCode = "TUR" },
                new Country { Name = "Turkmenistan", IsoCode = "TKM" },
                new Country { Name = "Tuvalu", IsoCode = "TUV" },
                new Country { Name = "Uganda", IsoCode = "UGA" },
                new Country { Name = "Ukraine", IsoCode = "UKR" },
                new Country { Name = "United Arab Emirates", IsoCode = "ARE" },
                new Country { Name = "United Kingdom", IsoCode = "GBR" },
                new Country { Name = "United States", IsoCode = "USA" },
                new Country { Name = "Uruguay", IsoCode = "URY" },
                new Country { Name = "Uzbekistan", IsoCode = "UZB" },
                new Country { Name = "Vanuatu", IsoCode = "VUT" },
                new Country { Name = "Vatican City", IsoCode = "VAT" },
                new Country { Name = "Venezuela", IsoCode = "VEN" },
                new Country { Name = "Vietnam", IsoCode = "VNM" },
                new Country { Name = "Yemen", IsoCode = "YEM" },
                new Country { Name = "Zambia", IsoCode = "ZMB" },
                new Country { Name = "Zimbabwe", IsoCode = "ZWE" } };

            if (!context.Countries.Any())
            {
                context.Countries.AddRangeAsync(countries);
                context.SaveChanges();
            }
        }

        public static void SeedUser(DataContext context)
        {
            var hasher = new PasswordHasher<User>();

            var user = new User()
            {
                Id = Guid.NewGuid(),
                FirstName = "Teacher",
                LastName = "User",
                CountryId = 43,
                NormalizedUserName = "TEACHERUSER",
                Email = "teacheruser@example.com",
                NormalizedEmail = "TEACHERUSER@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D"),
                ConcurrencyStamp = Guid.NewGuid().ToString("D"),
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true,
                AccessFailedCount = 0
            };

            // Hashear la contraseña
            user.PasswordHash = hasher.HashPassword(user, "Test@123");

            var user2 = new User()
            {
                Id = Guid.NewGuid(),
                NormalizedUserName = "STUDENTUSER",
                FirstName = "Student",
                LastName = "User",
                CountryId = 35,
                Email = "studentuser@example.com",
                NormalizedEmail = "STUDENTUSER@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D"),
                ConcurrencyStamp = Guid.NewGuid().ToString("D"),
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true,
                AccessFailedCount = 0
            };

            // Hashear la contraseña
            user2.PasswordHash = hasher.HashPassword(user2, "Test@123");

            teacherId = user.Id;
            studentId = user2.Id;

            // Insertar el usuario con el seed data
            if (!context.Users.Any())
            {
                context.Users.AddRangeAsync(
                    new List<User>
                    {
                        user,
                        user2
                    });
                context.SaveChanges();
            }
        }

        public static void SeedRole(DataContext context)
        {
            roleAdminId = Guid.NewGuid();
            roleTeacherId = Guid.NewGuid();
            roleStudentId = Guid.NewGuid();

            if (!context.Roles.Any())
            {
                context.Roles.AddRangeAsync(
                    new List<IdentityRole<Guid>>
                    {
                        new IdentityRole<Guid>
                        {
                            Id = roleAdminId,
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new IdentityRole<Guid>
                        {
                            Id = roleTeacherId,
                            Name = "Teacher",
                            NormalizedName = "TEACHER"
                        },
                        new IdentityRole<Guid>
                        {
                            Id = roleStudentId,
                            Name = "Student",
                            NormalizedName = "STUDENT"
                        }
                    });
                context.SaveChanges();
            }
        }

        public static void SeedUserRole(DataContext context)
        {
            if (!context.UserRoles.Any())
            {
                context.UserRoles.AddRange(
                new IdentityUserRole<Guid>
                {
                    RoleId = roleTeacherId,
                    UserId = teacherId
                },
                new IdentityUserRole<Guid>
                {
                    RoleId = roleStudentId,
                    UserId = studentId
                }
                );
                context.SaveChanges();
            }
        }

        public static void SeedDataForStudyFlow(DataContext context)
        {
            if (!context.Courses.Any())
            {
                context.Courses.AddRange(
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Mathematics",
                    TeacherId = teacherId,
                    Description = "Mathematics is the study of numbers, quantities, and shapes.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Science",
                    TeacherId = teacherId,
                    Description = "Science is the study of the natural world.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = courseId = Guid.NewGuid(),
                    Name = "Computer Science",
                    TeacherId = teacherId,
                    Description = "Computer science is the study of algorithmic processes, computational machines, and computation itself.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "History",
                    TeacherId = teacherId,
                    Description = "History is the study of the past.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Geography",
                    TeacherId = teacherId,
                    Description = "Geography is the study of places and the relationships between people and their environments.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "English",
                    TeacherId = teacherId,
                    Description = "English is the study of the English language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Spanish",
                    TeacherId = teacherId,
                    Description = "Spanish is the study of the Spanish language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "French",
                    TeacherId = teacherId,
                    Description = "French is the study of the French language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "German",
                    TeacherId = teacherId,
                    Description = "German is the study of the German language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Italian",
                    TeacherId = teacherId,
                    Description = "Italian is the study of the Italian language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Chinese",
                    TeacherId = teacherId,
                    Description = "Chinese is the study of the Chinese language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Japanese",
                    TeacherId = teacherId,
                    Description = "Japanese is the study of the Japanese language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Korean",
                    TeacherId = teacherId,
                    Description = "Korean is the study of the Korean language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Arabic",
                    TeacherId = teacherId,
                    Description = "Arabic is the study of the Arabic language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Russian",
                    TeacherId = teacherId,
                    Description = "Russian is the study of the Russian language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Portuguese",
                    TeacherId = teacherId,
                    Description = "Portuguese is the study of the Portuguese language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Dutch",
                    TeacherId = teacherId,
                    Description = "Dutch is the study of the Dutch language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Swedish",
                    TeacherId = teacherId,
                    Description = "Swedish is the study of the Swedish language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                },
                new Course
                {
                    Id = Guid.NewGuid(),
                    Name = "Norwegian",
                    TeacherId = teacherId,
                    Description = "Norwegian is the study of the Norwegian language.",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                });
                context.SaveChanges();
            }
        }

        public static void SeedAnnounces(DataContext context)
        {
            if (!context.Announces.Any())
            {
                context.Announces.AddRange(
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Introducción a la Construcción de Software",
                    HtmlContent = "Vamos a discutir los conceptos básicos de construcción de software y su importancia en el desarrollo de sistemas robustos.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Pruebas Unitarias en Construcción de Software",
                    HtmlContent = "En esta sesión aprenderemos sobre la importancia de las pruebas unitarias y cómo aplicarlas efectivamente.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Refactorización y Buenas Prácticas",
                    HtmlContent = "Exploraremos cómo la refactorización puede mejorar el código sin modificar su funcionalidad y las buenas prácticas para mantenerlo limpio.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Integración Continua (CI) en Proyectos de Software",
                    HtmlContent = "Hablaremos sobre cómo implementar integración continua para detectar problemas antes de que lleguen a producción.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Entorno de Desarrollo Local y DevOps",
                    HtmlContent = "Aprenderemos cómo configurar un entorno de desarrollo local y la importancia de prácticas DevOps en el ciclo de desarrollo.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Gestión de Dependencias y Control de Versiones",
                    HtmlContent = "Analizaremos cómo gestionar dependencias del proyecto y las mejores prácticas para el control de versiones con Git.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Metodologías Ágiles en la Construcción de Software",
                    HtmlContent = "Exploraremos cómo aplicar metodologías ágiles, como Scrum y Kanban, durante el desarrollo de software.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Documentación del Código y del Proyecto",
                    HtmlContent = "La documentación es esencial para la construcción de software de calidad. Discutiremos cómo documentar adecuadamente el proyecto.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Arquitectura y Patrones de Diseño",
                    HtmlContent = "Aprenderemos sobre los patrones de diseño y cómo aplicarlos para construir una arquitectura robusta.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                },
                new Announce
                {
                    Id = Guid.NewGuid(),
                    Title = "Herramientas para la Construcción de Software",
                    HtmlContent = "Veremos herramientas como Visual Studio, Docker y Jenkins, que facilitan el proceso de construcción de software.",
                    ProfilePicture = null,
                    CourseId = courseId,
                    UserId = teacherId,
                    IsDeleted = false
                });
                context.SaveChanges();
            }
        }
    }
}