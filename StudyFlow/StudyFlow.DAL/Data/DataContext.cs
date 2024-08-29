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
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region Country

            modelBuilder.Entity<Country>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);
            modelBuilder.Entity<Country>()
                .Property(c => c.IsoCode)
                .IsRequired()
                .HasMaxLength(3);

            #endregion Country

            #region Institution

            modelBuilder.Entity<Institution>()
                .HasIndex(x => x.Name)
                .IsUnique();
            modelBuilder.Entity<Institution>()
                .HasOne(i => i.Country)
                .WithMany()
                .HasForeignKey(i => i.CountryID);

            modelBuilder.Entity<Institution>()
                .Property(i => i.Name)
                .IsRequired()
                .HasMaxLength(200);

            modelBuilder.Entity<Institution>()
                .Property(i => i.Address)
                .IsRequired()
                .HasMaxLength(300);

            modelBuilder.Entity<Institution>()
                .Property(i => i.Description)
                .HasMaxLength(1000);

            modelBuilder.Entity<Institution>()
                .Property(i => i.Website)
                .HasMaxLength(100);

            modelBuilder.Entity<Institution>()
                .Property(i => i.Email)
                .HasMaxLength(100);

            modelBuilder.Entity<Institution>()
                .Property(i => i.PhoneNumber)
                .HasMaxLength(20);

            #endregion Institution


            #region Notification

            //modelBuilder.Entity<Institution>()
            //.HasOne(i => i.User)
            //.WithMany()
            //.HasForeignKey(i => i.UserID);

            modelBuilder.Entity<Notification>()
                .Property(x => x.Message)
                .IsRequired()
                .HasMaxLength(500);
            modelBuilder.Entity<Notification>()
                .Property(i => i.DateSent)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Notification>()
                .Property(i => i.DateCreated)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Notification>()
                .Property(i => i.DateUpdated)
                .IsRequired()
                .HasMaxLength(100);

            #endregion Notification

            #region Users

            modelBuilder.Entity<User>()
                .HasOne(i => i.Institution)
                .WithMany(u => u.users)
                .HasForeignKey(i => i.InstitutionID);
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            #endregion Users

            #region Profile

            modelBuilder.Entity<Profile>()
                .HasData(
                    new Profile { Id = 1, Name = "Admin", Description = "Administrador" },
                    new Profile { Id = 2, Name = "Teacher", Description = "Profesor" },
                    new Profile { Id = 3, Name = "Student", Description = "Estudiante" }
                );

            modelBuilder.Entity<Profile>()
                .HasMany(p => p.Users)
                .WithOne(u => u.Profile)
                .HasForeignKey(p => p.ProfileId);

            #endregion Profile

        }
    }
}