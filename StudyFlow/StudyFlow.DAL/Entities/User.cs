using Microsoft.AspNetCore.Identity;
using StudyFlow.DAL.Enumeration;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.DAL.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        [EmailAddress]
        [ProtectedPersonalData]
        [Required]
        public override string Email
        {
            get => base.Email ?? string.Empty;
            set => base.Email = value ?? string.Empty;
        }

        public bool HaveProfilePicture { get; set; }
        public UserTypeEnum UserType { get; set; }
        public bool IsOnline { get; set; }
        public int CountryId { get; set; }
        public Country Country { get; set; } = null!;
        public Guid? NotificationId { get; set; }
        public IEnumerable<Notification>? ListNotifications { get; set; }
        public Guid? CourseId { get; set; }
        public IEnumerable<Course>? ListCourses { get; set; }
        public IEnumerable<Enrollment>? ListEnrollments { get; set; }
    }
}