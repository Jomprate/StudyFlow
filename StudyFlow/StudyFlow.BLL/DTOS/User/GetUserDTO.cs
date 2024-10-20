using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.User
{
    public class GetUserDTO
    {
        public Guid? Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string? Email { get; set; }

        [RegularExpression(@"^\d{7}(\d{3})?$",
            ErrorMessage = "The PhoneNumber must be 7 or 10 digits.")]
        public string? PhoneNumber { get; set; }

        public int Country { get; set; }
        public string? ProfilePicture { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsOnline { get; set; }
        public ProfileDTO Profile { get; set; } = null!;
    }
}