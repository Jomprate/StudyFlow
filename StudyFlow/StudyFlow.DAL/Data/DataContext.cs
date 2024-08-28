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

            #region Users

            modelBuilder.Entity<User>()
                .HasOne(x => x.Profile)
                .WithOne(x => x.User)
                .HasForeignKey<Profile>(x => x.UserId);
            modelBuilder.Entity<User>()
                .HasOne(i => i.Institution)
                .WithMany(u => u.users)
                .HasForeignKey(i => i.InstitutionID);
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            #endregion Users
        }
    }
}