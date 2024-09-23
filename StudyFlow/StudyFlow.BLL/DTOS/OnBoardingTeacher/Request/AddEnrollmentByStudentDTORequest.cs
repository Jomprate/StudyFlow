using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher.Request
{
    public class AddEnrollmentByStudentDTORequest
    {
        [Required]
        public Guid CourseId { get; set; }

        [EmailAddress]
        [Required]
        public string EmailStudent { get; set; } = null!;
    }
}