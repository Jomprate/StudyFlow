using StudyFlow.DAL.Entities.Helper;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class EnrollmentFromStudentDTORequest
    {
        [Required]
        public Guid StudentId { get; set; }

        [Required]
        public Guid CourseId { get; set; }

        public Pagination Pagination { get; set; } = null!;
    }
}