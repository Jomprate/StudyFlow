using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Entities;

namespace StudyFlow.DAL.Data
{
    public class DataContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Scheduled> Scheduleds { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region Notification

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.ListNotifications)
                .HasForeignKey(n => n.UserId);

            #endregion Notification

            #region Users

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .HasOne(u => u.Country)
                .WithMany()
                .HasForeignKey(f => f.CountryId);

            #endregion Users

            #region Enrollment

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Student)
                .WithMany(u => u.ListEnrollments)
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

            #region Courses

            modelBuilder.Entity<Course>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Teacher)
                .WithMany(u => u.ListCourses)
                .HasForeignKey(c => c.TeacherId);
            modelBuilder.Entity<Course>()
                .HasMany(c => c.ListSubject)
                .WithOne(s => s.Course)
                .HasForeignKey(s => s.CourseId);
            modelBuilder.Entity<Course>()
                .HasMany(c => c.ListEnrollment)
                .WithOne(e => e.Course)
                .HasForeignKey(e => e.CourseId);

            #endregion Courses

            #region Subjects

            modelBuilder.Entity<Subject>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<Subject>()
                .HasMany(c => c.ListScheduled)
                .WithOne(s => s.Subject)
                .HasForeignKey(s => s.SubjectId);

            #endregion Subjects

            #region Scheduleds

            modelBuilder.Entity<Scheduled>()
                .HasKey(u => u.Id);
            modelBuilder.Entity<Scheduled>()
                .HasOne(s => s.Subject)
                .WithMany(s => s.ListScheduled)
                .HasForeignKey(s => s.SubjectId);
            modelBuilder.Entity<Scheduled>()
                .HasAlternateKey(s => new { s.SubjectId, s.ScheduledDate });

            #endregion Scheduleds

            SeedData.Seed(modelBuilder);

            DisableCascadingDelete(modelBuilder);
        }

        private void DisableCascadingDelete(ModelBuilder modelBuilder)
        {
            var relationships = modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys());
            foreach (var relationship in relationships)
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}