using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace StudyFlow.DAL.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Address { get; set; }
        public string? ProfilePicture { get; set; }
        public int ProfileId { get; set; }
        public Profile Profile { get; set; } = new();
        public int InstitutionID { get; set; }
        public Institution Institution { get; set; } = new();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}