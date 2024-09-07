using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace StudyFlow.DAL.Entities
{
    public class User : EntityAuditBase
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int CountryId { get; set; }
        public Country Country { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? ProfilePicture { get; set; }
        public bool IsOnline { get; set; }
        public bool IsEnabled { get; set; }
        public ICollection<Profile> ListProfile { get; set; } = new List<Profile>();
        public ICollection<Enrollment> ListEnrollment { get; set; } = new List<Enrollment>();
        public ICollection<Course> ListCourse { get; set; } = new List<Course>();
        public ICollection<Notification> ListNotification { get; set; } = new List<Notification>();
    }
}