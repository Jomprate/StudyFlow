using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.User
{
    public class UpdatePasswordDTO
    {
        [Required]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "Current password is required.")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm new password is required.")]
        [Compare("NewPassword", ErrorMessage = "The confirmation password does not match.")]
        public string ConfirmNewPassword { get; set; }
    }
}