using StudyFlow.DAL.Entities.Helper;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnboardingStudent.Request
{
    public class GetCourseStudentDTORequest
    {
        [Required]
        public Guid StudentId { get; set; }

        public Pagination Pagination { get; set; } = new Pagination();
    }
}