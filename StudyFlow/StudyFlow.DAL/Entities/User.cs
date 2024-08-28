using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace StudyFlow.DAL.Entities
{
    public class User
    {
        public User()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        [MaxLength(100)]
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$",
        ErrorMessage = "The password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter, and one number. Special characters are not allowed.")]
        public string Password { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Address { get; set; }
        public string? ProfilePicture { get; set; }
        public Profile Profile { get; set; } = new();
        public int InstitutionID { get; set; }
        public Institution Institution { get; set; } = new();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}