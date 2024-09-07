using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Entities;

namespace StudyFlow.DAL.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region Country

            modelBuilder.Entity<Country>().HasData(
                new Country { Id = 1, Name = "Afghanistan", IsoCode = "AFG" },
                new Country { Id = 2, Name = "Albania", IsoCode = "ALB" },
                new Country { Id = 3, Name = "Algeria", IsoCode = "DZA" },
                new Country { Id = 4, Name = "Andorra", IsoCode = "AND" },
                new Country { Id = 5, Name = "Angola", IsoCode = "AGO" },
                new Country { Id = 6, Name = "Antigua and Barbuda", IsoCode = "ATG" },
                new Country { Id = 7, Name = "Argentina", IsoCode = "ARG" },
                new Country { Id = 8, Name = "Armenia", IsoCode = "ARM" },
                new Country { Id = 9, Name = "Australia", IsoCode = "AUS" },
                new Country { Id = 10, Name = "Austria", IsoCode = "AUT" },
                new Country { Id = 11, Name = "Azerbaijan", IsoCode = "AZE" },
                new Country { Id = 12, Name = "Bahamas", IsoCode = "BHS" },
                new Country { Id = 13, Name = "Bahrain", IsoCode = "BHR" },
                new Country { Id = 14, Name = "Bangladesh", IsoCode = "BGD" },
                new Country { Id = 15, Name = "Barbados", IsoCode = "BRB" },
                new Country { Id = 16, Name = "Belarus", IsoCode = "BLR" },
                new Country { Id = 17, Name = "Belgium", IsoCode = "BEL" },
                new Country { Id = 18, Name = "Belize", IsoCode = "BLZ" },
                new Country { Id = 19, Name = "Benin", IsoCode = "BEN" },
                new Country { Id = 20, Name = "Bhutan", IsoCode = "BTN" },
                new Country { Id = 21, Name = "Bolivia", IsoCode = "BOL" },
                new Country { Id = 22, Name = "Bosnia and Herzegovina", IsoCode = "BIH" },
                new Country { Id = 23, Name = "Botswana", IsoCode = "BWA" },
                new Country { Id = 24, Name = "Brazil", IsoCode = "BRA" },
                new Country { Id = 25, Name = "Brunei", IsoCode = "BRN" },
                new Country { Id = 26, Name = "Bulgaria", IsoCode = "BGR" },
                new Country { Id = 27, Name = "Burkina Faso", IsoCode = "BFA" },
                new Country { Id = 28, Name = "Burundi", IsoCode = "BDI" },
                new Country { Id = 29, Name = "Cabo Verde", IsoCode = "CPV" },
                new Country { Id = 30, Name = "Cambodia", IsoCode = "KHM" },
                new Country { Id = 31, Name = "Cameroon", IsoCode = "CMR" },
                new Country { Id = 32, Name = "Canada", IsoCode = "CAN" },
                new Country { Id = 33, Name = "Central African Republic", IsoCode = "CAF" },
                new Country { Id = 34, Name = "Chad", IsoCode = "TCD" },
                new Country { Id = 35, Name = "Chile", IsoCode = "CHL" },
                new Country { Id = 36, Name = "China", IsoCode = "CHN" },
                new Country { Id = 37, Name = "Colombia", IsoCode = "COL" },
                new Country { Id = 38, Name = "Comoros", IsoCode = "COM" },
                new Country { Id = 39, Name = "Congo", IsoCode = "COG" },
                new Country { Id = 40, Name = "Congo, Democratic Republic of the", IsoCode = "COD" },
                new Country { Id = 41, Name = "Costa Rica", IsoCode = "CRI" },
                new Country { Id = 42, Name = "Croatia", IsoCode = "HRV" },
                new Country { Id = 43, Name = "Cuba", IsoCode = "CUB" },
                new Country { Id = 44, Name = "Cyprus", IsoCode = "CYP" },
                new Country { Id = 45, Name = "Czech Republic", IsoCode = "CZE" },
                new Country { Id = 46, Name = "Denmark", IsoCode = "DNK" },
                new Country { Id = 47, Name = "Djibouti", IsoCode = "DJI" },
                new Country { Id = 48, Name = "Dominica", IsoCode = "DMA" },
                new Country { Id = 49, Name = "Dominican Republic", IsoCode = "DOM" },
                new Country { Id = 50, Name = "Ecuador", IsoCode = "ECU" },
                new Country { Id = 51, Name = "Egypt", IsoCode = "EGY" },
                new Country { Id = 52, Name = "El Salvador", IsoCode = "SLV" },
                new Country { Id = 53, Name = "Equatorial Guinea", IsoCode = "GNQ" },
                new Country { Id = 54, Name = "Eritrea", IsoCode = "ERI" },
                new Country { Id = 55, Name = "Estonia", IsoCode = "EST" },
                new Country { Id = 56, Name = "Eswatini", IsoCode = "SWZ" },
                new Country { Id = 57, Name = "Ethiopia", IsoCode = "ETH" },
                new Country { Id = 58, Name = "Fiji", IsoCode = "FJI" },
                new Country { Id = 59, Name = "Finland", IsoCode = "FIN" },
                new Country { Id = 60, Name = "France", IsoCode = "FRA" },
                new Country { Id = 61, Name = "Gabon", IsoCode = "GAB" },
                new Country { Id = 62, Name = "Gambia", IsoCode = "GMB" },
                new Country { Id = 63, Name = "Georgia", IsoCode = "GEO" },
                new Country { Id = 64, Name = "Germany", IsoCode = "DEU" },
                new Country { Id = 65, Name = "Ghana", IsoCode = "GHA" },
                new Country { Id = 66, Name = "Greece", IsoCode = "GRC" },
                new Country { Id = 67, Name = "Grenada", IsoCode = "GRD" },
                new Country { Id = 68, Name = "Guatemala", IsoCode = "GTM" },
                new Country { Id = 69, Name = "Guinea", IsoCode = "GIN" },
                new Country { Id = 70, Name = "Guinea-Bissau", IsoCode = "GNB" },
                new Country { Id = 71, Name = "Guyana", IsoCode = "GUY" },
                new Country { Id = 72, Name = "Haiti", IsoCode = "HTI" },
                new Country { Id = 73, Name = "Honduras", IsoCode = "HND" },
                new Country { Id = 74, Name = "Hungary", IsoCode = "HUN" },
                new Country { Id = 75, Name = "Iceland", IsoCode = "ISL" },
                new Country { Id = 76, Name = "India", IsoCode = "IND" },
                new Country { Id = 77, Name = "Indonesia", IsoCode = "IDN" },
                new Country { Id = 78, Name = "Iran", IsoCode = "IRN" },
                new Country { Id = 79, Name = "Iraq", IsoCode = "IRQ" },
                new Country { Id = 80, Name = "Ireland", IsoCode = "IRL" },
                new Country { Id = 81, Name = "Israel", IsoCode = "ISR" },
                new Country { Id = 82, Name = "Italy", IsoCode = "ITA" },
                new Country { Id = 83, Name = "Jamaica", IsoCode = "JAM" },
                new Country { Id = 84, Name = "Japan", IsoCode = "JPN" },
                new Country { Id = 85, Name = "Jordan", IsoCode = "JOR" },
                new Country { Id = 86, Name = "Kazakhstan", IsoCode = "KAZ" },
                new Country { Id = 87, Name = "Kenya", IsoCode = "KEN" },
                new Country { Id = 88, Name = "Kiribati", IsoCode = "KIR" },
                new Country { Id = 89, Name = "Korea, North", IsoCode = "PRK" },
                new Country { Id = 90, Name = "Korea, South", IsoCode = "KOR" },
                new Country { Id = 91, Name = "Kuwait", IsoCode = "KWT" },
                new Country { Id = 92, Name = "Kyrgyzstan", IsoCode = "KGZ" },
                new Country { Id = 93, Name = "Laos", IsoCode = "LAO" },
                new Country { Id = 94, Name = "Latvia", IsoCode = "LVA" },
                new Country { Id = 95, Name = "Lebanon", IsoCode = "LBN" },
                new Country { Id = 96, Name = "Lesotho", IsoCode = "LSO" },
                new Country { Id = 97, Name = "Liberia", IsoCode = "LBR" },
                new Country { Id = 98, Name = "Libya", IsoCode = "LBY" },
                new Country { Id = 99, Name = "Liechtenstein", IsoCode = "LIE" },
                new Country { Id = 100, Name = "Lithuania", IsoCode = "LTU" },
                new Country { Id = 101, Name = "Luxembourg", IsoCode = "LUX" },
                new Country { Id = 102, Name = "Madagascar", IsoCode = "MDG" },
                new Country { Id = 103, Name = "Malawi", IsoCode = "MWI" },
                new Country { Id = 104, Name = "Malaysia", IsoCode = "MYS" },
                new Country { Id = 105, Name = "Maldives", IsoCode = "MDV" },
                new Country { Id = 106, Name = "Mali", IsoCode = "MLI" },
                new Country { Id = 107, Name = "Malta", IsoCode = "MLT" },
                new Country { Id = 108, Name = "Marshall Islands", IsoCode = "MHL" },
                new Country { Id = 109, Name = "Mauritania", IsoCode = "MRT" },
                new Country { Id = 110, Name = "Mauritius", IsoCode = "MUS" },
                new Country { Id = 111, Name = "Mexico", IsoCode = "MEX" },
                new Country { Id = 112, Name = "Micronesia", IsoCode = "FSM" },
                new Country { Id = 113, Name = "Moldova", IsoCode = "MDA" },
                new Country { Id = 114, Name = "Monaco", IsoCode = "MCO" },
                new Country { Id = 115, Name = "Mongolia", IsoCode = "MNG" },
                new Country { Id = 116, Name = "Montenegro", IsoCode = "MNE" },
                new Country { Id = 117, Name = "Morocco", IsoCode = "MAR" },
                new Country { Id = 118, Name = "Mozambique", IsoCode = "MOZ" },
                new Country { Id = 119, Name = "Myanmar", IsoCode = "MMR" },
                new Country { Id = 120, Name = "Namibia", IsoCode = "NAM" },
                new Country { Id = 121, Name = "Nauru", IsoCode = "NRU" },
                new Country { Id = 122, Name = "Nepal", IsoCode = "NPL" },
                new Country { Id = 123, Name = "Netherlands", IsoCode = "NLD" },
                new Country { Id = 124, Name = "New Zealand", IsoCode = "NZL" },
                new Country { Id = 125, Name = "Nicaragua", IsoCode = "NIC" },
                new Country { Id = 126, Name = "Niger", IsoCode = "NER" },
                new Country { Id = 127, Name = "Nigeria", IsoCode = "NGA" },
                new Country { Id = 128, Name = "North Macedonia", IsoCode = "MKD" },
                new Country { Id = 129, Name = "Norway", IsoCode = "NOR" },
                new Country { Id = 130, Name = "Oman", IsoCode = "OMN" },
                new Country { Id = 131, Name = "Pakistan", IsoCode = "PAK" },
                new Country { Id = 132, Name = "Palau", IsoCode = "PLW" },
                new Country { Id = 133, Name = "Panama", IsoCode = "PAN" },
                new Country { Id = 134, Name = "Papua New Guinea", IsoCode = "PNG" },
                new Country { Id = 135, Name = "Paraguay", IsoCode = "PRY" },
                new Country { Id = 136, Name = "Peru", IsoCode = "PER" },
                new Country { Id = 137, Name = "Philippines", IsoCode = "PHL" },
                new Country { Id = 138, Name = "Poland", IsoCode = "POL" },
                new Country { Id = 139, Name = "Portugal", IsoCode = "PRT" },
                new Country { Id = 140, Name = "Qatar", IsoCode = "QAT" },
                new Country { Id = 141, Name = "Romania", IsoCode = "ROU" },
                new Country { Id = 142, Name = "Russia", IsoCode = "RUS" },
                new Country { Id = 143, Name = "Rwanda", IsoCode = "RWA" },
                new Country { Id = 144, Name = "Saint Kitts and Nevis", IsoCode = "KNA" },
                new Country { Id = 145, Name = "Saint Lucia", IsoCode = "LCA" },
                new Country { Id = 146, Name = "Saint Vincent and the Grenadines", IsoCode = "VCT" },
                new Country { Id = 147, Name = "Samoa", IsoCode = "WSM" },
                new Country { Id = 148, Name = "San Marino", IsoCode = "SMR" },
                new Country { Id = 149, Name = "Sao Tome and Principe", IsoCode = "STP" },
                new Country { Id = 150, Name = "Saudi Arabia", IsoCode = "SAU" },
                new Country { Id = 151, Name = "Senegal", IsoCode = "SEN" },
                new Country { Id = 152, Name = "Serbia", IsoCode = "SRB" },
                new Country { Id = 153, Name = "Seychelles", IsoCode = "SYC" },
                new Country { Id = 154, Name = "Sierra Leone", IsoCode = "SLE" },
                new Country { Id = 155, Name = "Singapore", IsoCode = "SGP" },
                new Country { Id = 156, Name = "Slovakia", IsoCode = "SVK" },
                new Country { Id = 157, Name = "Slovenia", IsoCode = "SVN" },
                new Country { Id = 158, Name = "Solomon Islands", IsoCode = "SLB" },
                new Country { Id = 159, Name = "Somalia", IsoCode = "SOM" },
                new Country { Id = 160, Name = "South Africa", IsoCode = "ZAF" },
                new Country { Id = 161, Name = "South Sudan", IsoCode = "SSD" },
                new Country { Id = 162, Name = "Spain", IsoCode = "ESP" },
                new Country { Id = 163, Name = "Sri Lanka", IsoCode = "LKA" },
                new Country { Id = 164, Name = "Sudan", IsoCode = "SDN" },
                new Country { Id = 165, Name = "Suriname", IsoCode = "SUR" },
                new Country { Id = 166, Name = "Sweden", IsoCode = "SWE" },
                new Country { Id = 167, Name = "Switzerland", IsoCode = "CHE" },
                new Country { Id = 168, Name = "Syria", IsoCode = "SYR" },
                new Country { Id = 169, Name = "Taiwan", IsoCode = "TWN" },
                new Country { Id = 170, Name = "Tajikistan", IsoCode = "TJK" },
                new Country { Id = 171, Name = "Tanzania", IsoCode = "TZA" },
                new Country { Id = 172, Name = "Thailand", IsoCode = "THA" },
                new Country { Id = 173, Name = "Timor-Leste", IsoCode = "TLS" },
                new Country { Id = 174, Name = "Togo", IsoCode = "TGO" },
                new Country { Id = 175, Name = "Tonga", IsoCode = "TON" },
                new Country { Id = 176, Name = "Trinidad and Tobago", IsoCode = "TTO" },
                new Country { Id = 177, Name = "Tunisia", IsoCode = "TUN" },
                new Country { Id = 178, Name = "Turkey", IsoCode = "TUR" },
                new Country { Id = 179, Name = "Turkmenistan", IsoCode = "TKM" },
                new Country { Id = 180, Name = "Tuvalu", IsoCode = "TUV" },
                new Country { Id = 181, Name = "Uganda", IsoCode = "UGA" },
                new Country { Id = 182, Name = "Ukraine", IsoCode = "UKR" },
                new Country { Id = 183, Name = "United Arab Emirates", IsoCode = "ARE" },
                new Country { Id = 184, Name = "United Kingdom", IsoCode = "GBR" },
                new Country { Id = 185, Name = "United States", IsoCode = "USA" },
                new Country { Id = 186, Name = "Uruguay", IsoCode = "URY" },
                new Country { Id = 187, Name = "Uzbekistan", IsoCode = "UZB" },
                new Country { Id = 188, Name = "Vanuatu", IsoCode = "VUT" },
                new Country { Id = 189, Name = "Vatican City", IsoCode = "VAT" },
                new Country { Id = 190, Name = "Venezuela", IsoCode = "VEN" },
                new Country { Id = 191, Name = "Vietnam", IsoCode = "VNM" },
                new Country { Id = 192, Name = "Yemen", IsoCode = "YEM" },
                new Country { Id = 193, Name = "Zambia", IsoCode = "ZMB" },
                new Country { Id = 194, Name = "Zimbabwe", IsoCode = "ZWE" });

            #endregion Country

            #region Notification

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.ListNotification)
                .HasForeignKey(n => n.UserId);

            #endregion Notification

            #region Users

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasMany(u => u.ListProfile)
                .WithMany(p => p.ListUser);
            modelBuilder.Entity<User>()
                .HasOne(u => u.Country)
                .WithMany()
                .HasForeignKey(u => u.CountryId);

            #endregion Users

            #region Profile

            modelBuilder.Entity<Profile>()
                .HasData(
                    new Profile { Id = 1, Name = "Admin", Description = "Administrador" },
                    new Profile { Id = 2, Name = "Teacher", Description = "Profesor" },
                    new Profile { Id = 3, Name = "Student", Description = "Estudiante" }
                );

            #endregion Profile

            #region Enrollment

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Student)
                .WithMany(u => u.ListEnrollment)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Course)
                .WithMany(c => c.ListEnrollment)
                .HasForeignKey(e => e.CourseId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Enrollment>()
                .HasKey(e => new { e.StudentId, e.CourseId });

            #endregion Enrollment
        }
    }
}