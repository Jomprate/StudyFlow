using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudyFlow.DAL.Entities
{
    public interface IInstitution
    {
        int InstitutionID { get; }
        string Name { get; }
        string Address { get; }
        int CountryID { get; }
        string? Website { get; }
        string? Email { get; }
        string? PhoneNumber { get; }
        DateTime EstablishedDate { get; }
        InstitutionType Type { get; }
        string? Description { get; }

        Country Country { get; }
        // ICollection<Course> Courses { get; }
        // ICollection<Admin> Admins { get; }

        void AddCourse(/* Course course */);

        void RemoveCourse(int courseID);

        void AssignAdmin(/* Admin admin */);

        void UpdateAdmin(/* Admin admin */);

        void RemoveAdmin(int adminID);
    }

    public class Institution : IInstitution
    {
        [Key]
        public int InstitutionID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(300)]
        public string Address { get; set; } = null!;

        [Required]
        public int CountryID { get; set; }

        [MaxLength(100)]
        [Url]
        public string? Website { get; set; }

        [MaxLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        [MaxLength(20)]
        [Phone]
        public string? PhoneNumber { get; set; }

        [Required]
        public DateTime EstablishedDate { get; set; }

        [Required]
        public InstitutionType Type { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; } // Agregada la propiedad Description

        // Navigation Property
        [ForeignKey("CountryID")]
        public Country Country { get; set; } = null!;

        // Collection of Courses offered by the Institution
        // public ICollection<Course> Courses { get; set; } = new List<Course>();

        // Collection of Admins associated with the Institution
        // public ICollection<Admin> Admins { get; set; } = new List<Admin>();

        // Method to add a course
        public void AddCourse(/* Course course */)
        {
            // if (course == null)
            //    throw new ArgumentNullException(nameof(course));

            // if (!Courses.Contains(course))
            // {
            //     Courses.Add(course);
            // }
        }

        // Method to remove a course by ID
        public void RemoveCourse(int courseID)
        {
            // var course = Courses.FirstOrDefault(c => c.CourseID == courseID);
            // if (course != null)
            //    Courses.Remove(course);
        }

        // Method to assign an admin
        public void AssignAdmin(/* Admin admin */)
        {
            // if (admin == null)
            //    throw new ArgumentNullException(nameof(admin));

            // if (!Admins.Contains(admin))
            // {
            //     Admins.Add(admin);
            // }
        }

        // Method to update an admin's details
        public void UpdateAdmin(/* Admin admin */)
        {
            // if (admin == null)
            //    throw new ArgumentNullException(nameof(admin));

            // var existingAdmin = Admins.FirstOrDefault(a => a.AdminID == admin.AdminID);
            // if (existingAdmin != null)
            // {
            //     existingAdmin.Name = admin.Name;
            //     existingAdmin.Email = admin.Email;
            //     existingAdmin.PhoneNumber = admin.PhoneNumber;
            //     // Actualizar cualquier otra propiedad relevante
            // }
        }

        // Method to remove an admin by ID
        public void RemoveAdmin(int adminID)
        {
            // var admin = Admins.FirstOrDefault(a => a.AdminID == adminID);
            // if (admin != null)
            //    Admins.Remove(admin);
        }
    }

    public enum InstitutionType
    {
        University,
        College,
        HighSchool,
        VocationalSchool,
        OnlinePlatform,
        Other
    }
}